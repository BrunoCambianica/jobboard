import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Rx'
import { Observable } from "rxjs/Observable";

@Injectable()
export class JobService {

  jobs = [];
  initialJobs = [];
  jobsSubject = new Subject();

  BASE_URL = 'http://localhost:3000/';

  constructor(private http:Http) { }

  getJobs(){
    return this.http.get(this.BASE_URL + 'api/jobs')
      .map(res => res.json())
  }

  getJob(id){
    return this.http.get(this.BASE_URL + `api/jobs/${id}`)
    .map(res => res.json())
  }

  addJob(jobData){
    jobData.id = Date.now();
    // this.jobs = [jobData, ...this.jobs];
    // return this.jobsSubject.next(jobData);

    return this.http.post(this.BASE_URL + 'api/jobs', jobData)
      .map(res => {
        console.log(res);
        this.jobsSubject.next(jobData);
      })
  }

}
