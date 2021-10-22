export interface Disease {
    dep: string
    type: string
    name: string
    info: string
    hosptital: string
    date: string
    photos: string[]
}

export class DiseaseModel implements Disease {
    dep: string;
    type: string;
    name: string;
    info: string;
    hosptital: string;
    date: string;
    photos: string[];

    constructor(dp: string, type: string, name: string, info: string, hosp: string, date: string, photos: string[]) {
        this.dep = dp
        this.type = type
        this.name = name
        this.info = info
        this.hosptital = hosp
        this.date = date
        this.photos = photos
    }
}