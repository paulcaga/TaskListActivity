import { Component } from '@angular/core';
import { taskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/Task';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: 'taskDashboard.component.html',
  styleUrls: ['taskDashboard.component.css'],
})
export class taskDashboardComponent {
  constructor(private taskService: taskService) {}
  tasks: Task[] = new Array<Task>();
  returnedTasks: Task[] = new Array<Task>();
  showDeleteButton: boolean = false;
  currentlyHovered: number = -999;
  startItem: number = 0;
  endItem: number = 7;

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.loadTasks();
      return this.tasks;
    });
  }

  handleEdit(task: Task) {
    this.taskService.editTask(task).subscribe((data) => {
      this.tasks = this.tasks.map((t) => {
        if (t.id === task.id) {
          t = Object.assign({}, t, task);
        }
        return t;
      });
      this.returnedTasks = this.tasks.slice(this.startItem, this.endItem)
    });
  }

  handleAdd(desc: string) {
    const newTask: Task = {
      id: this.generateID(),
      description: desc,
      active: true,
      date: new Date(),
    };
    this.taskService.addTask(newTask).subscribe((data) => {
      this.tasks = [...this.tasks, newTask];
      this.loadTasks();
      return this.tasks;
    });
  }

  generateID() {
    if (!this.tasks.length) return 1;
    return this.tasks.reduce((a, b) => (a.id > b.id ? a : b)).id + 1;
  }

  handleDelete(task: Task) {
    this.taskService.deleteTask(task).subscribe((data) => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
      this.loadTasks();
      return this.tasks;
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.loadTasks()
  }

  mouseEnter(event: any) {
    this.currentlyHovered = event;
  }

  mouseLeave(event: any) {
    this.currentlyHovered = -999;
  }

  loadTasks() {
    this.returnedTasks = this.tasks.slice(this.startItem, this.endItem);
  }
}
