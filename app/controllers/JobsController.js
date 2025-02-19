import { AppState } from "../AppState.js"
import { jobsService } from "../services/JobsService.js"

export class JobsController {
    constructor(){
        this.fetchJobs()
        AppState.on('jobs', this.drawJobs)
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
}