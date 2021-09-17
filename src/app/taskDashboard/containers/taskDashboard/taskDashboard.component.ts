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
  currentlyHovered: number = -999;
  startItem: number = 0;
  endItem: number = 7;

  //get tasks from task.service.ts on init
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.loadTasks();
    });
  }

  //task:Task = task object to be edited
  //calls a put request to update the passed task object
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

  //desc:string = description of new task, user input
  //creates a new task object then calls a post request to add the new task
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
    });
  }

  //generates a new id for new tasks (highest id number + 1). return 1 if tasklist is empty
  generateID():number {
    if (!this.tasks.length) return 1;
    return this.tasks.reduce((a, b) => (a.id > b.id ? a : b)).id + 1;
  }

  //task:Task = task object to be deleted
  //calls a delete request to delete the passed task object
  handleDelete(task: Task) {
    this.taskService.deleteTask(task).subscribe((data) => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
      this.loadTasks();
    });
  }

  //pagination handler for changing pages
  pageChanged(event: PageChangedEvent): void {
    this.startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.loadTasks()
  }

  //handler for when mouse hovers over a task
  //index:number = index of currently hovered task
  mouseEnter(index: number) {
    this.currentlyHovered = index;
  }

  //handler for when mouse stops hovering over a task
  mouseLeave() {
    this.currentlyHovered = -999;
  }

  //get items of current page for pagination
  loadTasks() {
    this.returnedTasks = this.tasks.slice(this.startItem, this.endItem);
  }
}
