/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';

import { SponsorMediaComponent } from './sponsor-media.component';

describe('SponsorMediaComponent', () => {
  let component: SponsorMediaComponent;
  let fixture: ComponentFixture<SponsorMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorMediaComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
    });
    // this is a temporary workaround, as fixture.detectChanges() isn't working
    // for components with ChangeDetectionStrategy.OnPush
    TestBed.overrideComponent(SponsorMediaComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh input changes without homepage', async(() => {

    component.sponsor = {
      name: 'Changed-Sponsorname',
      image: 'images/changed-sponsor.png',
      slogan: 'Changed Slogan of sponsor',
      homepage: undefined,
    };
    fixture.detectChanges();
    const sloganParagraph = fixture.debugElement.query(By.css('.slogan')).nativeElement.textContent;
    const image = fixture.debugElement.query(By.css('img')).nativeElement.src;
    const name = fixture.debugElement.query(By.css('.media-heading')).nativeElement.textContent;
    const homepage = fixture.debugElement.query(By.css('cite'));
    const buttons = fixture.debugElement.queryAll(By.css('button'));

    // console.log(sloganParagraph);
    // console.log(image);
    // console.log(name);
    // console.log(homepage);
    expect(buttons.length).toEqual(0);
    expect(sloganParagraph).toEqual('Changed Slogan of sponsor');
    expect(image).toContain('/assets/images/changed-sponsor.png');
    expect(name).toEqual('Changed-Sponsorname');
    expect(homepage).toBeFalsy();
  }));

  it('should refresh input changes', async(() => {

    component.sponsor = {
      name: 'Changed-Sponsorname',
      image: 'images/changed-sponsor.png',
      slogan: 'Changed Slogan of sponsor',
      homepage: 'https://www.changed-sponsor.com',
    };

    fixture.detectChanges();
    const sloganParagraph = fixture.debugElement.query(By.css('.slogan')).nativeElement.textContent;
    const image = fixture.debugElement.query(By.css('img')).nativeElement.src;
    const name = fixture.debugElement.query(By.css('.media-heading')).nativeElement.textContent;
    const homepage = fixture.debugElement.query(By.css('cite')).nativeElement.textContent;
    const buttons = fixture.debugElement.queryAll(By.css('button'));

    // console.log(sloganParagraph);
    // console.log(image);
    // console.log(name);
    // console.log(homepage);
    expect(buttons.length).toEqual(0);
    expect(sloganParagraph).toEqual('Changed Slogan of sponsor');
    expect(image).toContain('/assets/images/changed-sponsor.png');
    expect(name).toEqual('Changed-Sponsorname');
    expect(homepage).toEqual('https://www.changed-sponsor.com');
  }));

  it('should emit delete clickevent', async(() => {
    component.sponsor = {
      _id: 'testid',
      name: 'Changed-Sponsorname',
      image: 'images/changed-sponsor.png',
      slogan: 'Changed Slogan of sponsor',
      homepage: 'https://www.changed-sponsor.com',
    };
    component.editable = true;

    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toEqual(2);

    // example to bind the event listener
    // e.g. @Output() onClick = new EventEmitter()
    let buttonWasClicked = undefined;
    const sub = component.onDelete.subscribe((id) => buttonWasClicked = id);

    const button = buttons[0];
    // fire the event emitter. null is equivalent to event
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    // example as the button was clicked
    expect(buttonWasClicked).toEqual('testid');
    sub.unsubscribe();
  }));


  it('should emit edit clickevent', async(() => {
    component.sponsor = {
      _id: 'testid',
      name: 'Changed-Sponsorname',
      image: 'images/changed-sponsor.png',
      slogan: 'Changed Slogan of sponsor',
      homepage: 'https://www.changed-sponsor.com',
    };
    component.editable = true;

    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toEqual(2);

    // example to bind the event listener
    // e.g. @Output() onClick = new EventEmitter()
    let buttonWasClicked = undefined;
    const sub = component.onEdit.subscribe((id) => buttonWasClicked = id);

    const button = buttons[1];
    // fire the event emitter. null is equivalent to event
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    // example as the button was clicked
    expect(buttonWasClicked).toEqual('testid');
    sub.unsubscribe();
  }));

});
