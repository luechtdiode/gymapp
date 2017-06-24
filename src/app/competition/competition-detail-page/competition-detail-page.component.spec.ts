import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionDetailPageComponent } from './competition-detail-page.component';

describe('CompetitionDetailPageComponent', () => {
  let component: CompetitionDetailPageComponent;
  let fixture: ComponentFixture<CompetitionDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
