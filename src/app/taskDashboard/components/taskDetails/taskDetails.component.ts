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
  @ViewChild('btn') btn!: ElementRef;
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
    this.editing = !this.editing;
    this.cd.detectChanges();
    if (this.editing)
      this.input.nativeElement.focus();
  }

  handleSubmit() {
    this.task.description = this.editForm.get('description')?.value;
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
