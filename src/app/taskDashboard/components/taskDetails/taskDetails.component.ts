import {
  Component,
  Input,
  Output,
  EventEmitter,
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
  constructor(private Ref: ChangeDetectorRef) {}

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
  editForm = new FormGroup(
    {
      description: new FormControl(),
    },
    { updateOn: 'submit' }
  );

  ngOnInit() {
    this.editForm.setValue({
      description: this.task.description,
    });
  }

  toggleEditing() {
    this.editing = !this.editing
  }

  handleSubmit() {
    this.task.description = this.editForm.get('description')?.value;
    this.Ref.detectChanges();
    this.edit.emit(this.task);
  }

  handleStatusChange() {
    this.task.active = !this.task.active;
    this.edit.emit(this.task);
  }

  handleDelete() {
    this.delete.emit(this.task);
  }
}
