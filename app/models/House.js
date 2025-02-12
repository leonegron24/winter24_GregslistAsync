import { AppState } from "../AppState.js"


export class House {
    constructor(data) {
        this.id = data.id
        this.bedrooms = data.bedrooms
        this.bathrooms = bathrooms
        this.levels = data.levels
        this.imgUrl = data.imgUrl
        this.year = data.year
        this.price = data.price
        this.description = data.description
        this.creatorId = data.creatorId
        this.creator = data.creator
    }

    get houseCard(){
        return /*html*/ `
        <div>${this.imgUrl} ${this.price}</div>
        <div>Bedrooms: ${this.bedrooms} Bathrooms: ${this.bathrooms} Levels: ${data.levels}</div>
        <div>
        Year: ${this.year}
        <p>${this.description}</p>
        </div>
        <div>${this.creator.name} ${this.creator.picture}</div>    
        `
    }
}