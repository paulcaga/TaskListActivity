import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})

export class taskService {
  constructor(private http: HttpClient) {}
  private TASK_API = 'http://localhost:3000/tasks'

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.TASK_API)
  }

  addTask(Task: Task):Observable<Task[]> {
    return this.http.post<Task[]>(`${this.TASK_API}`, Task)
  }

  deleteTask(Task: Task):Observable<Task[]> {
    return this.http.delete<Task[]>(`${this.TASK_API}/${Task.id}`)
  }

  editTask(Task: Task):Observable<Task[]> {
    return this.http.put<Task[]>(`${this.TASK_API}/${Task.id}`, Task);
  }
}