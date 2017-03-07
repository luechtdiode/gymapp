import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSponsorPageComponent } from './edit-sponsor-page.component';

describe('EditSponsorPageComponent', () => {
  let component: EditSponsorPageComponent;
  let fixture: ComponentFixture<EditSponsorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSponsorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSponsorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
