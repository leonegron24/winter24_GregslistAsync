import { AppState } from "../AppState.js"

export class Job {
    constructor(data){
        this.id = data.id
        this.company = data.company
        this.jobTitle = data.jobTitle
        this.hours = data.hours
        this.rate = data.rate
        this.description = data.description
        this.creatorId = data.creatorId
        this.creatorAt = data.creatorAt
        this.updatedAt = data.updatedAt
        this.creator = data.creator
    }

    get jobCard(){
        return /*html*/ `
            <div class='col-md-3'>
                <div class='shadow card-height p-2'>
                    <div class='row'>
                        <h4 class='text-center'>${this.jobTitle}</h4>
                        <h5>Company: ${this.company}</h5>
                    </div>
                    <div class='row'>
                        <div>Hours: ${this.hours}</div>
                        <div>Rate: ${this.rate}</div>
                    </div>
                    <div class='row text-wrap'>
                        <p>Description: ${this.description}</p>
                    </div>
                    <div class='row text-center border'>
                        <div class='mb-2'>Created By: ${this.creator.name}</div>
                        <div class='mb-2'>
                            <img class='img-fluid img-box' src="${this.creator.picture}" alt="">
                        </div>
                        <div class='text-center'> ${this.updateJob} </div>
                    </div>
                </div>
            </div>
        `
    }

    get updateJob() {
        if (AppState.account != null && AppState.account.id == this.creatorId) {
            return /*html*/ `
            <button class="btn btn-primary mt-2 mb-2" onclick="document.getElementById('job-form-${this.id}').classList.toggle('d-none')">
                Edit Listing <i class="mdi mdi-chevron-down"></i>
            </button>
    
            <div id='job-form-${this.id}' class='d-none'>
                <form class="mt-2 mb-2" onsubmit="app.JobsController.updateJob('${this.id}'); return false;">
                    <input name="jobTitle" placeholder="Job Title" class="form-control my-1" value='${this.jobTitle}' />
                    <input name="company" placeholder="Company" class="form-control my-1" value='${this.company}'/>
                    <input type="number" name="hours" placeholder="Hours" class="form-control my-1" value='${this.hours}'/>
                    <input type="number" name="rate" placeholder="Rate" class="form-control my-1" value='${this.rate}'/>
                    <textarea name="description" placeholder="Description" class="form-control my-1">${this.description}</textarea>
                    <button type='submit' class="btn btn-success w-50 mt-2" title="Update Job">Update Listing <i class="mdi mdi-update"></i></button>
                </form>
                <div class='text-center mb-2'> ${this.DeleteButton} </div>
            </div>
            `;
        } else return "";
        }

    get DeleteButton() {
            // NOTE is the user logged in? AND is the user the creator of this car?
            if (AppState.account != null && AppState.account.id == this.creatorId) {
              return /*html*/ `
              <button type='button' onclick="app.JobsController.deleteJob('${this.id}')" class="btn btn-danger w-50 mt-2" title="Delete Job">Delete Listing<i class="mdi mdi-delete-forever"></i></button>`
            }
            return ''
          }

}