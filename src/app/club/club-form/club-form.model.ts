import { Validators } from '@angular/forms';

export const ClubFormModel = {
  name: ['', Validators.required, Validators.minLength(2)],
  label: [''],
  kind: ['', Validators.required, Validators.minLength(2)],
  homepage: [''],
  description: [''],
  googleplushandle: [''],
  facebookhandle: [''],
  linkedinhandle: [''],
  twitterhandle: [''],
  youtubehandle: [''],
};