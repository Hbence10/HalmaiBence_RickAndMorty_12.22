interface origin {name : string, url : string}
interface location {name : string, url : string}

export class Character{
    constructor(
        public id : number,
        public name : string,
        public status : string,
        public species : string,
        public type: string,
        public gender : string,
        public origin : origin,
        public location : location,
        public imageLink : string,
        public episodeList : string[]
    ){}
}