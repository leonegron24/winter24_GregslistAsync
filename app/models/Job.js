
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
                    <div class='row'>
                        <p>Description: ${this.description}</p>
                    </div>
                    <div class='row text-center border'>
                        <div class='mb-2'>Created By: ${this.creator.name}</div>
                        <div class='mb-2'>
                            <img class='img-fluid img-box' src="${this.creator.picture}" alt=""></div>
                    </div>
                </div>
            </div>
        `
    }

}