import { AppState } from "../AppState.js"


export class House {
    constructor(data) {
        this.id = data.id
        this.bedrooms = data.bedrooms
        this.bathrooms = data.bathrooms
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
        <div class='col-md-3 border shadow card-pad'>
            <div class='row'>
                <img class='house-pic' src="${this.imgUrl}"/> 
                <div class='text-success'>$${this.price}</div>
            </div>

            <div class='row fw-bold p-3'>
                <div class='col mt-4'>
                    <div class='row'>Bedrooms: ${this.bedrooms}</div> 
                    <div class='row'> Bathrooms: ${this.bathrooms}</div>
                </div>      
                <div class='col mt-4 mb-4'>
                    <div class='row'> Levels: ${this.levels}</div>
                    <div class='row'> Year: ${this.year} </div>
                </div>
            </div>
            
            <p class='row fw-bold p-3'>Description: ${this.description}</p>

            <div class='row text-center align-items-center'>
                <span class='col-md-6'>${this.creator.name}</span>
                <img class="col-md-4 profile-picture profile-picture-sm" src="${this.creator.picture}" alt="A beautiful picture of ${this.creator.name}"/>
            </div>
        </div>
        `
    }
}