import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorDetailPageComponent } from './sponsor-detail-page.component';

describe('SponsorDetailPageComponent', () => {
  let component: SponsorDetailPageComponent;
  let fixture: ComponentFixture<SponsorDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
