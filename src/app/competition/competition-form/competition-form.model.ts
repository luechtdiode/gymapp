import { Validators } from '@angular/forms';

export const CompetitionFormModel = {
    name: [, [Validators.required, Validators.minLength(2)]],
    kind: [, [Validators.required, Validators.minLength(2)]],
    location: [, [Validators.required, Validators.minLength(2)]],
    date1: [, [Validators.required]],
    date2: [],
    sponsoractions: [],
    googleplushandle: [''],
    facebookhandle: [''],
    twitterhandle: [''],
    youtubehandle: [''],
    description: [''],
    latitude: [0],
    longitude: [0],
    street: [''],
    streetNumber: [''],
    website: [''],
    zipCode: [''],
    countryCode: [''],
};
