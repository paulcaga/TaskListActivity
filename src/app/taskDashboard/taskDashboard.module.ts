import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { taskDashboardComponent } from "./containers/taskDashboard/taskDashboard.component";
import { taskDetailsComponent } from "./components/taskDetails/taskDetails.component";
import { taskFormComponent } from "./components/taskForm/taskForm.component";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule,PaginationConfig } from 'ngx-bootstrap/pagination';

@NgModule({
    declarations: [
        taskDashboardComponent,
        taskDetailsComponent,
        taskFormComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        TooltipModule.forRoot(),
        PaginationModule
    ],
    exports: [
        taskDashboardComponent
    ],
    providers: [PaginationConfig]
})

export class taskDashboardModule { }