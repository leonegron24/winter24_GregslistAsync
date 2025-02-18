import { AppState } from "../AppState.js"


export class House {
    constructor(data) {
        this.id = data.id
        this.bedrooms = data.bedrooms
        this.bathrooms = data.bathrooms
        this.levels = data.levels
        this.imgUrl = data.imgUrl ||'https://images.unsplash.com/photo-1497514440240-3b870f7341f0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlzc2luZ3xlbnwwfHwwfHx8MA%3D%3D'
        this.year = data.year
        this.price = data.price
        this.description = data.description
        this.creatorId = data.creatorId
        this.creator = data.creator
    }

    get houseCard(){
        return /*html*/ `
        <div class='col-md-4 shadow' id='select-house'>
            <div class='row'>
                <img id='house-imgURL' class='house-pic' src="${this.imgUrl}"/> 
                <div id='house-price' class='text-success'>$${this.price}</div>
            </div>

            <div class='row fw-bold p-3'>
                <div class='col mt-4'>
                    <div id='house-bedrooms' class='row'>Bedrooms: ${this.bedrooms}</div> 
                    <div id='house-bathrooms' class='row'> Bathrooms: ${this.bathrooms}</div>
                </div>      
                <div class='col mt-4 mb-4'>
                    <div id='house-levels' class='row'> Levels: ${this.levels}</div>
                    <div id='house-year' class='row'> Year: ${this.year} </div>
                </div>
            </div>
            
            <p id='house-description' class='row fw-bold p-3'>Description: ${this.description}</p>

            <div class='row text-center align-items-center'>
                <span id='house-creator' class='col-md-6'>${this.creator.name}</span>
                <img id='house-profile' class="col-md-4 profile-picture profile-picture-sm mb-2" src="${this.creator.picture}" alt="A beautiful picture of ${this.creator.name}"/>
            </div>
            <div>
                <div class='text-center'>${this.DeleteButton}</div>
                <div class='text-center mb-4'>${this.updateHouse}</div>
            </div>
        </div>
        `
    }

    get DeleteButton() {
        // NOTE is the user logged in? AND is the user the creator of this car?
        if (AppState.account != null && AppState.account.id == this.creatorId) {
          return /*html*/ `
          <button onclick="app.HouseController.deleteHouse('${this.id}')" class="btn btn-danger w-50 mt-2" title="Delete House">Delete Listing<i class="mdi mdi-delete-forever"></i></button>`
        }
        return ''
      }
    get updateHouse(){
        if (AppState.account !=null && AppState.account.id == this.creatorId){
            return /*html*/ `
            <button onclick="app.HouseController.updateHouse('${this.id}')" class= "btn btn-success w-50 mt-2" title="Update House">Update Listing <i class="mdi mdi-update"></i> </button>
            `
        }
    }  
}