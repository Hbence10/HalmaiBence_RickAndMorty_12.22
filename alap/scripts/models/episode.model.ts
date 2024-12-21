export class Episode{
    constructor(
        public id : number,
        public title : string,
        public air_date : string,
        public seasonIndex : number,
        public characterList : string[] = []
    ){}
}