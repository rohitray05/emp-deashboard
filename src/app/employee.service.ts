import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';


export interface Employee {
  name:{
    firstName:string,
    middleName:string,
    lastName:string
  },
  id:number,
  designation:string,
  experience:string,
  doj:string,
  currentTeam:string,
  reportingMangaer:{
    firstName:string,
    middleName:string,
    lastName:string
  },
  mobile:number,
  email:string
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private URL = "http://localhost:3000"
  constructor(private http: HttpClient) { }

  getListOfEmployees():Observable<any> {
    return this.http.get(this.URL + '/data');
  }

  addAnEmployee(post: any): Observable<any> {
    return this.http.post<any>(this.URL+'/data', post);
  }

  getAnEmployee(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/data/${id}`);
  }

  updateAnEmployee(id: number, emp: Employee): Observable<any> {
    return this.http.put<any>(`${this.URL}/data/${id}`, emp);
  }

  deleteAnEmployee(id: string): Observable<any> {
    return this.http.delete<any>(`${this.URL}/data/${id}`);
  }
}
