import { AppState } from "../AppState.js"


export class Car {
  constructor(data) {
    this.id = data.id
    this.make = data.make
    this.model = data.model
    this.year = data.year
    this.price = data.price
    this.engineType = data.engineType
    this.color = data.color || '#000000'
    this.imgUrl = data.imgUrl
    this.description = data.description || '<i>no description</i>'
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    // some more things we will add in a minute
    // these properties represent the owner of the "listing"
    this.creatorId = data.creatorId
    this.creator = data.creator
  }

  get Card() {
    return /*html*/ `
         <div class="col-md-4 g-2">
         <div class="card shadow-sm">
           <img class="card-img p-2"
             src="${this.imgUrl}"
             alt="">
           <div>
             <p class="text-center fw-bold">
               ${this.make} ${this.model} ${this.year}
             </p>
             <p class="mb-0">
               ${this.color} | ${this.engineType}
             </p>
             <p>${this.description}</p>
             <div class="d-flex justify-content-between">
              <p>${this.CreatedAtFormatted}</p>
              <div>
                <span>${this.creator.name}</span>
                <img class="profile-picture profile-picture-sm" src="${this.creator.picture}" alt="A beautiful picture of ${this.creator.name}"/>
              </div>
             </div>
              ${this.DeleteButton}
           </div>
         </div>
       </div>
    `
  }

  get CreatedAtFormatted() {
    return this.createdAt.toLocaleDateString('en-us', { month: '2-digit', day: '2-digit', year: 'numeric' })
  }

  get DeleteButton() {
    // NOTE is the user logged in? AND is the user the creator of this car?
    if (AppState.account != null && AppState.account.id == this.creatorId) {
      return `
      <button onclick="app.CarsController.deleteCar('${this.id}')" class="btn btn-danger w-100 mt-2" title="Delete Car"><i class="mdi mdi-delete-forever"></i></button>`
    }
    return ''
  }
}