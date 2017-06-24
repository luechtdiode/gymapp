/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';

import { CompetitionMediaComponent } from './competition-media.component';
import { Competition } from '../../model/backend-typings';

describe('CompetitionMediaComponent', () => {
  let component: CompetitionMediaComponent;
  let fixture: ComponentFixture<CompetitionMediaComponent>;

 beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompetitionMediaComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
    });
    // this is a temporary workaround, as fixture.detectChanges() isn't working
    // for components with ChangeDetectionStrategy.OnPush
    TestBed.overrideComponent(CompetitionMediaComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh input changes', async(() => {

    component.competition = <Competition>{
      name: 'Testwettkampf',
      image: 'images/wettkampf.png',
      kind: 'KuTu',
      description: 'testdescription',
      dates: [new Date('2017-02-15T00:00:00.0Z')],
      location: 'Basel',
      club: 'BTV Basel',
    };

    fixture.detectChanges();

    const descriptionParagraph = fixture.debugElement.query(By.css('p')).nativeElement.textContent;
    const image = fixture.debugElement.query(By.css('img')).nativeElement.src;
    const name = fixture.debugElement.query(By.css('.media-heading')).nativeElement.textContent;
    const label = fixture.debugElement.query(By.css('.label')).nativeElement.textContent;
    // const span = fixture.debugElement.queryAll(By.css('span')); //.nativeElement.textContent;
    const locationAndClub = fixture.debugElement.query(By.css('cite')).nativeElement.textContent;
    const buttons = fixture.debugElement.queryAll(By.css('button'));

    expect(descriptionParagraph).toEqual('testdescription');
    expect(image).toContain('/assets/images/wettkampf.png');
    expect(name).toContain('Testwettkampf');
    expect(label).toContain('KuTu');
    // expect(span[0].nativeElement.textContent).toContain('2017-02-15');
    expect(locationAndClub).toEqual('Basel, BTV Basel');
    expect(buttons.length).toEqual(0);
  }));

  it('should emit delete clickevent', async(() => {
    component.competition = <Competition>{
      _id: 'testid',
      name: 'Testwettkampf',
      image: 'images/wettkampf.png',
      kind: 'KuTu',
      description: 'testdescription',
      dates: [new Date('2017-02-15T00:00:00.0Z')],
      location: 'Basel',
      club: 'BTV Basel',
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
    component.competition = <Competition>{
      _id: 'testid',
      name: 'Testwettkampf',
      image: 'images/wettkampf.png',
      kind: 'KuTu',
      description: 'testdescription',
      dates: [new Date('2017-02-15T00:00:00.0Z')],
      location: 'Basel',
      club: 'BTV Basel',
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
