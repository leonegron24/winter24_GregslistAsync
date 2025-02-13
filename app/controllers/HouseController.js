import { AppState } from "../AppState.js"
import { houseService } from "../services/HouseService.js"
import { Pop } from "../utils/Pop.js"

export class HouseController {
  constructor() {
    console.log('This is the House Controller')
    this.fetchHomes()
    AppState.on('homes', this.drawHomes)
  }

  async fetchHomes(){
    try{
      await houseService.fetchHomes()
    } 
    catch(error){
      console.error(error)
    }
  }

  drawHomes(){
    const houseElm = document.getElementById('house-listings')
    let houseContent = ''
    const homes = AppState.homes
    homes.forEach(house => houseContent += house.houseCard)
    if (!houseElm){return}
    houseElm.innerHTML = houseContent
  }

}