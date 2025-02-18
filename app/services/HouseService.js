import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { api } from "./AxiosService.js"

class HouseService{

  async updateHouse(houseId, formData) {
    const response = await api.put(`api/houses/${houseId}`, formData)
    console.log('📅🏠', response.data);
    const houseToUpdate = AppState.homes.find(house=> house.id == houseId)
    const updatedHome = new House(houseToUpdate)
    AppState.homes.push(updatedHome)
  }
  
  async deleteHouse(houseId) {
    const response = await api.delete(`api/houses/${houseId}`)
    console.log('🔥🏠📡', response.data);
    const houseToDelete = AppState.homes.find(house => house.id == houseId)
    const indexToRemove = AppState.homes.indexOf(houseToDelete)
    AppState.homes.splice(indexToRemove,1)
  }
  
  
  async postHome(formData) {
    const response = await api.post('api/houses', formData) // changing the Database through the API
        console.log('house response data: ', response.data);
        const createdHome = new House(response.data) // changing the local state based on the API response
        console.log(createdHome)
        AppState.homes.push(createdHome)
  }
  
  async fetchHomes() {
    const response = await api.get('api/houses')
    console.log('response: ',response)
    const homes = response.data.map(homeData => new House(homeData))
    AppState.homes = homes
  }


}

export const houseService = new HouseService()