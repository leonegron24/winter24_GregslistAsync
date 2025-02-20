import { AppState } from "../AppState.js"
import { Job } from "../models/Job.js"
import { api } from "./AxiosService.js"

class JobsService {
    async fetchJobs() {
        console.log('fetching jobs...')
        const response = await api.get('api/jobs')
        console.log('reponse :', response)
        const jobs = response.data.map(jobData => new Job(jobData))
        AppState.jobs = jobs
    }

    async postJob(formData){
        console.log('posting job!')
        const response = await api.post('api/jobs',formData)
        console.log('response', response.data)
        const createdJob = new Job(response.data)
        AppState.jobs.push(createdJob)
    }

    async deleteJob(jobId){
        console.log('service deleting...')
        const response = await api.delete(`api/jobs/${jobId}`)
        const jobToDelete = AppState.jobs.find(job=>job.id == jobId)
        if(!jobToDelete){return}
        const indexToRemove = AppState.jobs.indexOf(jobToDelete)
        AppState.jobs.splice(indexToRemove,1)
    }

    async updateJob(jobId,formData){
        const response = await api.put(`api/jobs/${jobId}`, formData)
            console.log('📅', response.data);
            const jobToUpdate = AppState.jobs.find(job=> job.id == jobId)
            if(!jobToUpdate){return}
            const indexToRemove = AppState.jobs.indexOf(jobToUpdate)
            AppState.jobs.splice(indexToRemove,1,new Job(response.data))
          }

}
export const jobsService = new JobsService