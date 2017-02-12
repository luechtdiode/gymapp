import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UrlProvider } from '../shared/urlProvider';
import { FooterComponent } from './footer.component';
import { RouterPath } from '../app.routing';

describe('FooterComponent', () => {
  let comp: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let urlProviderStub: any;

  beforeEach(() => {
    urlProviderStub = {
      originHRef: {}
  };
  TestBed.configureTestingModule({
    declarations: [FooterComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: UrlProvider, useValue: urlProviderStub }
      ]
    });
    fixture = TestBed.createComponent(FooterComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  it('homeLink defaults to: RouterPath.HOME', () => {
    expect(comp.homeLink).toEqual(RouterPath.HOME);
  });

  it('aboutLink defaults to: RouterPath.ABOUT', () => {
    expect(comp.aboutLink).toEqual(RouterPath.ABOUT);
  });

  it('competitionsLink defaults to: RouterPath.COMPETITIONS', () => {
    expect(comp.competitionsLink).toEqual(RouterPath.COMPETITIONS);
  });

  it('clubsLink defaults to: RouterPath.CLUBS', () => {
    expect(comp.clubsLink).toEqual(RouterPath.CLUBS);

  });

  it('sponsorsLink defaults to: RouterPath.SPONSORS', () => {
    expect(comp.sponsorsLink).toEqual(RouterPath.SPONSORS);
  });

  it('contactLink defaults to: RouterPath.CONTACT', () => {
    expect(comp.contactLink).toEqual(RouterPath.CONTACT);
  });

  it('editClubProfileLink defaults to: RouterPath.CLUBPROFILE', () => {
    expect(comp.editClubProfileLink).toEqual(RouterPath.CLUBPROFILE);
  });

  it('editSponsorProfileLink defaults to: RouterPath.SPONSORPROFILE', () => {
    expect(comp.editSponsorProfileLink).toEqual(RouterPath.SPONSORPROFILE);
  });

});
