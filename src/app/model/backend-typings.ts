export interface User {
    username?: string;
    token?: string;
    password?: string;
    isMemberOfSponsor?: string;
    isMemberOfClub?: string;
}

export interface Club {
    _id?: string;
    __v?: any;
    updatedAt?: Date;
    createdAt?: Date;
    name?: string;
    image?: string;
    label?: string;
    kind: string[];
    googleplushandle?: string;
    facebookhandle?: string;
    twitterhandle?: string;
    youtubehandle?: string;
    description?: string;
}

export interface Action {
    _id?: string;
    __v?: any;
    updatedAt?: Date;
    createdAt?: Date;
    name?: string;
}

/*export interface Currency {
    value?: number;
}*/

export interface CompSponsorAction {
    action: Action;
    costperaction: number | string;
    maxcnt: number;
}

export interface SponsorAction {
    action: Action;
    bidperaction: number | string;
    maxcnt: number;
    kinds: string[];
}

export interface Sponsor {
    _id?: string;
    __v?: any;
    updatedAt?: Date;
    createdAt?: Date;
    name?: string;
    image?: string;
    slogan?: string;
    homepage?: string;
    sponsoractions?: SponsorAction[];
    googleplushandle?: string;
    facebookhandle?: string;
    twitterhandle?: string;
    youtubehandle?: string;
    description?: string;
}
/*
[{"_id":"57b0d744a4b652c447543579",
"updatedAt":"2016-08-14T20:40:37.007Z",
"createdAt":"2016-08-14T20:40:37.007Z",
"clubid":{"_id":"57b0ce3787ecc1c422e90c6b",
    "updatedAt":"2016-08-14T20:25:37.547Z",
    "createdAt":"2016-08-14T20:01:59.359Z",
    "name":"Clubby-Club",
    "__v":0,
    "description":"Clubby fun",
    "youtubehandle":"","twitterhandle":"","facebookhandle":"","googleplushandle":"",
    "kind":["KuTu"],
    "label":"Test",
    "image":"images/verein-flag.png"
},
"club":"Clubby-Club",
"name":"asdf",
"location": "asdf",
"kind":"KuTu",
"description":"asdf",
"__v":0,
"youtubehandle":"","twitterhandle":"","facebookhandle":"","googleplushandle":"",
"sponsoractions":[{"_id":"57b0c87958caa3d036ae05f0","action":"57b0c87958caa3d036ae05f0","maxcnt":100,"costperaction":10},
                  {"_id":"57b0c87958caa3d036ae05f2","action":"57b0c87958caa3d036ae05f2","maxcnt":100,"costperaction":10},
                  {"_id":"57b0c87958caa3d036ae05f1","action":"57b0c87958caa3d036ae05f1","maxcnt":100,"costperaction":10}],
"dates":["2016-08-13T22:00:00.000Z"],
"image":"images/wettkampf.png"}]
*/
export interface Competition {
    _id?: string;
    __v?: any;
    updatedAt?: Date;
    createdAt?: Date;
    name?: string;
    image?: string;
    clubid?: Club;
    club?: string;
    kind?: string;
    location?: string;
    dates: Date[];
    sponsoractions: CompSponsorAction[];
    googleplushandle?: string;
    facebookhandle?: string;
    twitterhandle?: string;
    youtubehandle?: string;
    description?: string;
    latitude?: number;
    longitude?: number;
    street?: string;
    streetNumber?: string;
    website?: string;
    zipCode?: string;
    countryCode?: string;
}
