export class Episode {
    id;
    title;
    air_date;
    seasonIndex;
    characterList;
    constructor(id, title, air_date, seasonIndex, characterList = []) {
        this.id = id;
        this.title = title;
        this.air_date = air_date;
        this.seasonIndex = seasonIndex;
        this.characterList = characterList;
    }
}
