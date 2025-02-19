import { AppState } from "../AppState.js"
import { Job } from "../models/Job.js"
import { api } from "./AxiosService.js"

class JobsService {
    async fetchJobs() {
        const response = await api.get('api/jobs')
        console.log('reponse :', response)
        const jobs = response.data.map(jobData => new Job(jobData))
        AppState.jobs = jobs
    }


}
export const jobsService = new JobsService