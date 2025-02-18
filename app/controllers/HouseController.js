import { AppState } from "../AppState.js"
import { houseService } from "../services/HouseService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"

export class HouseController {
  constructor() {
    console.log('This is the House Controller')
    this.fetchHomes()
    AppState.on('homes', this.drawHomes)
    AppState.on('account', this.showForm) // listen for the user, when they "log in" show the create form
    AppState.on('account', this.drawHomes) // listen for the user, when they "log in", re-draw the cars (the template will re-evaluate if it should include the delete button)
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

  async postHome(){
    try{
      if (!event){return}
      event.preventDefault()
      const formElm = event.target
      console.log('post data elm', formElm)
      const formData = getFormData(formElm)
      console.log('form Data: ', formData)
      await houseService.postHome(formData)
      Pop.toast("Home Listing Created", 'success', 'top')
      if (!formElm){return}
      formElm.reset()

      }catch (error) { // IF an error occurs, abandon the try code, and run this instead
      console.error("😱 Oh no!", error)
      const errorMessage = `😱Oh no! ${error.message} \n ${error.response.data.error}`
      Pop.toast(errorMessage, 'error', 'top', 8000, true)
      // alert(error.response.data.error)
      console.error(error)
      } 
  }
  async updateHouse(houseId){
    try{
      if (!event){return}
      event.preventDefault
      const formElm = event.target
      console.log('whats the event target?', formElm)
      const formData = getFormData(formElm)
      console.log('trial update form data', formData)
      await houseService.updateHouse(houseId, formData)
      Pop.toast('Home Listing Updated', 'success', 'top')
      if (!formElm){return}
      formElm.reset()
    }catch(error){
      const errorMessage = `😱Oh no! ${error.message} \n ${error.response.data.error}`
        Pop.toast(errorMessage, 'error', 'top', 8000, true) // pops a notification on the screen
        console.error(error)
    }
  }

    async deleteHouse(houseId) {
      try {
        if (!event){return}
        event.preventDefault
        const confirmed = await Pop.confirm("Are you sure you want to delete this house?", 'Someone might be interested one day', 'Hell Yeah', 'question'
        )
        if (!confirmed) return
        console.log('🔥🏠', houseId);
        await houseService.deleteHouse(houseId)
        Pop.toast('House deleted', 'info')
      } catch (error) {
        // if something errors in the delete process, we can tell the user with notification
        const errorMessage = `😱Oh no! ${error.message} \n ${error.response.data.error}`
        Pop.toast(errorMessage, 'error', 'top', 8000, true) // pops a notification on the screen
        console.error(error)
      }
    }

  showForm(){
    const houseFormElm = document.getElementById('create-house-form')
    if(!houseFormElm){return}
    houseFormElm.classList.remove('d-none')
    }




}