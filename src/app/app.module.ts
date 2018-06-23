import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { JobService } from "./services/job.service";

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobAddFormComponent } from './job-add-form/job-add-form.component';


@NgModule({
  //components / pipes
  declarations: [
    AppComponent,
    SearchComponent,
    JobListComponent,
    JobAddFormComponent
  ],
  //modules
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  //services
  providers: [
    JobService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
