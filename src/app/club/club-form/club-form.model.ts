import { Validators } from '@angular/forms';

export const ClubFormModel = {
  name: [, [Validators.required, Validators.minLength(2)]],
  label: [, [Validators.required, Validators.minLength(2)]],
  kind: [, [Validators.required, Validators.minLength(2)]],
  homepage: [''],
  description: [, [Validators.required, Validators.minLength(2)]],
  googleplushandle: [''],
  facebookhandle: [''],
  linkedinhandle: [''],
  twitterhandle: [''],
  youtubehandle: [''],
};
