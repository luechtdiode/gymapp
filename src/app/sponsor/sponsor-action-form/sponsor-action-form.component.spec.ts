import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, ViewChild, OnInit } from '@angular/core';
import { SponsorActionFormComponent } from './sponsor-action-form.component';
import { FormBuilder } from '@angular/forms';
import { SponsorAction } from '../../model/backend-typings';
import { By } from '@angular/platform-browser';

/* In the host component's template we will pass the inputs to the actual
 * component to test, that is TestComponent in this case
 * see http://stackoverflow.com/questions/37408801/testing-ngonchanges-lifecycle-hook-in-angular-2
 */
@Component({
    selector :  `gymapp-test-host-component`,
    template :  `<div>
                    <gymapp-sponsor-action-form 
                      [action]="actionFromHost"
                      [isSelected]="selectedFromHost">
                    </gymapp-sponsor-action-form>
                </div>`,
})
export class TestHostComponent implements OnInit {
    @ViewChild(SponsorActionFormComponent) /* using viewChild we get access to the TestComponent which is a child of TestHostComponent */
    public testComponent: SponsorActionFormComponent;
    public actionFromHost: SponsorAction; /* this is the variable which is passed as input to the TestComponent */
    public selectedFromHost: boolean;

    ngOnInit(): void {
      this.testComponent.ngOnInit();
    }
}

describe('SponsorActionFormComponent', () => {
  let hostComp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let comp: SponsorActionFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorActionFormComponent, TestHostComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder
      ],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    hostComp = fixture.componentInstance;
    comp = hostComp.testComponent;
    hostComp.actionFromHost = <SponsorAction>{
      action: {
        _id: 'testid',
        name: 'testaction',
      },
      bidperaction: 10,
      maxcnt: 100,
      kinds: [],
    };
    hostComp.selectedFromHost = true;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  it('should take actionid as qualifier on widget-ids', () => {
    expect(fixture.debugElement.query(By.css('#selected_testid')).nativeElement).toBeDefined();
    expect(fixture.debugElement.query(By.css('#bid_testid')).nativeElement).toBeDefined();
    expect(fixture.debugElement.query(By.css('#max_testid')).nativeElement).toBeDefined();
    expect(fixture.debugElement.query(By.css('#kinds_testid')).nativeElement).toBeDefined();
  });

  it('should take action-name as checkbox-caption', () => {
    const chckbox = fixture.debugElement.query(By.css('#selected_testid'));
    const chckboxCaption = chckbox.parent.nativeElement.textContent.trim();
    expect(chckboxCaption).toEqual('testaction');
  });

  it('should set checkbox selected to true', () => {
    const chckbox = fixture.debugElement.query(By.css('#selected_testid'));
    const chckboxValue = chckbox.nativeElement.checked;
    expect(chckboxValue).toEqual(true);
  });

  it('should hide bid-widget when action is deselected', () => {
    hostComp.selectedFromHost = false;
    fixture.detectChanges();
    const chckbox = fixture.debugElement.query(By.css('#bid_testid'));
    expect(chckbox).toBeNull();
  });

});
