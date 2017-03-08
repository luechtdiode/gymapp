import { Validators } from '@angular/forms';

export const SponsorFormModel = {
  name: [, [Validators.required, Validators.minLength(2)]],
  homepage: [''],
  slogan: [, [Validators.required, Validators.minLength(2)]],
  budget: [0],
  googleplushandle: [''],
  facebookhandle: [''],
  linkedinhandle: [''],
  twitterhandle: [''],
  youtubehandle: [''],
};
