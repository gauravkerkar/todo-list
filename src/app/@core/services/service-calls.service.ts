import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceCallsService {
  private api = environment.api;

  constructor(private http: HttpClient) { }

  getDetails(){
    return this.http.get(`${this.api}/taskLists`);
  }

  deleteTask(id:any){
    return this.http.delete(`${this.api}/taskLists/${id}`,{});
  }
  editTask(id:any,data:{}){
    return this.http.put(`${this.api}/taskLists/${id}`,data);
  }

  addTask(data:any){
    return this.http.post(`${this.api}/taskLists`,data);
  }



}
