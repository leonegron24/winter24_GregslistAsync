import { House } from "../models/House.js"
import { api } from "./AxiosService.js"

class HouseService{
  async fetchHomes() {
    const response = await api.get('api/houses')
    console.log('response: ',response)
    const homes = response.map(homeData => new House(homeData))
    
  }


}

export const houseService = new HouseService()