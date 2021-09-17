import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { Task } from 'src/app/models/Task';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: '[app-task-details]',
  templateUrl: 'taskDetails.component.html',
  styleUrls: ['taskDetails.component.css'],
})
export class taskDetailsComponent {
  constructor(private cd: ChangeDetectorRef) {}
  private input!: ElementRef;
  @ViewChild('input', { static: false }) set content(content: ElementRef) {
    if (content) this.input = content;
  }
  @Input()
  task: any;
  @Input()
  showDeleteButton: boolean = false;

  @Output()
  edit: EventEmitter<Task> = new EventEmitter<Task>();
  @Output()
  delete: EventEmitter<Task> = new EventEmitter<Task>();
  editing: boolean = false;
  tooltip: boolean = false;
  editForm = new FormGroup({description: new FormControl()},{ updateOn: 'submit' });

  //set the value of edit input on init
  ngOnInit() {
    this.editForm.setValue({
      description: this.task.description,
    });
  }

  //toggle value of "editing" variable to show text input
  toggleEditing() {
    this.editing = !this.editing;
    if (this.editing)
      this.input.nativeElement.focus();
  }

  //changes the description of the task and emits an edit event
  handleSubmit() {
    this.task.description = this.editForm.get('description')?.value;
    this.edit.emit(this.task);
  }

  //changes status and emits an edit event
  handleStatusChange() {
    this.task.active = !this.task.active;
    this.edit.emit(this.task);
  }

  //emits a delete event to delete task
  handleDelete() {
    this.delete.emit(this.task);
  }
}
