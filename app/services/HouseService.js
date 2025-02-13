import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { api } from "./AxiosService.js"

class HouseService{
  
  async fetchHomes() {
    const response = await api.get('api/houses')
    console.log('response: ',response)
    const homes = response.data.map(homeData => new House(homeData))
    AppState.homes = homes
  }


}

export const houseService = new HouseService()