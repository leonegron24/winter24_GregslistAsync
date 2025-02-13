import { houseService } from "../services/HouseService.js"
import { Pop } from "../utils/Pop.js"

export class HouseController {
  constructor() {
    console.log('This is the House Controller')

  }

  async fetchHomes(){
    try{
      await houseService.fetchHomes()
    } 
    catch(error){
      console.error(error)
    }
  }

}