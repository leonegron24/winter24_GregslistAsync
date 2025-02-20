import { AppState } from "../AppState.js"
import { jobsService } from "../services/JobsService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"

export class JobsController {
    constructor(){
        this.fetchJobs()
        AppState.on('jobs', this.drawJobs)
        AppState.on('account', this.showForm)
        AppState.on('account', this.drawJobs) // listen for the user, when they "log in", re-draw the cars (the template will re-evaluate if it should include the delete button)

    }

    async fetchJobs(){
        try{
            await jobsService.fetchJobs()
        }catch(error){
            console.error(error)
        }
    }

    drawJobs(){
        const jobsElm = document.getElementById('job-listings')
        let jobContent = ''
        const jobs = AppState.jobs
        jobs.forEach(job => jobContent += job.jobCard)
        if (!jobsElm){return}
        jobsElm.innerHTML = jobContent
    }

    async postJob(){
        try{
            if(!event){return}
            event.preventDefault()
            const formElm = event.target
            const formData = getFormData(formElm)
            await jobsService.postJob(formData)
            Pop.toast("Job Listing Created", 'success', 'top')
            if (!formElm){return}
            formElm.reset()
        }catch(error) {
            console.error("😱 Oh no!", error)
            const errorMessage = `😱Oh no! ${error.message} \n ${error.response.data.error}`
            Pop.toast(errorMessage, 'error', 'top', 8000, true)
            // alert(error.response.data.error)
            console.error(error)
        }
    }

    showForm(){
        const jobFormElm = document.getElementById('create-job-form')
        if(!jobFormElm){return}
        jobFormElm.classList.remove('d-none')
        }
    
    async deleteJob(jobId){
        try{
            console.log('deleting...')
            if(!event){return}
            event.preventDefault()
            const confirmed = await Pop.confirm("Are you sure you want to delete this job?", 'Someone might hire you!', 'Hell Yeah', 'question')
            if (!confirmed) return
            console.log('🔥', jobId);
            await jobsService.deleteJob(jobId)
            Pop.toast('Job deleted', 'info')
        }catch(error){
            console.log('Error Deleting job!!', error)
            const errorMessage = `Oh NOOOoooo ${error.message} \n ${error.response.data.error}`
            Pop.toast(errorMessage, 'error', 'top', 8000, true)
        }
    }

     async updateJob(jobId){
        try{
          if (!event){return}
          event.preventDefault
          const formElm = event.target
          console.log('whats the event target?', formElm)
          const formData = getFormData(formElm)
          console.log('trial update form data', formData)
          await jobsService.updateJob(jobId, formData)
          Pop.toast('Job Listing Updated', 'success', 'top')
          if (!formElm){return}
          formElm.reset()
        }catch(error){
          const errorMessage = `😱Oh no! ${error.message} \n ${error.response.data.error}`
            Pop.toast(errorMessage, 'error', 'top', 8000, true) // pops a notification on the screen
            console.error(error)
        }
      }

}