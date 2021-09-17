import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup,FormControl } from "@angular/forms";
import { Task } from "src/app/models/Task";

@Component({
  selector:'app-task-form',
  templateUrl:'taskForm.component.html',
  styleUrls:['taskForm.component.css']
})
export class taskFormComponent {
  newTaskForm = new FormGroup({
    description: new FormControl('')
  })

  @Output()
  add: EventEmitter<string> = new EventEmitter<string>()

  //emits an add event to add new task then resets input value
  handleSubmit() {
    this.add.emit(this.newTaskForm.value.description)
    this.newTaskForm.reset()
  }
}