import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  host:string = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  makePostCall(path:any,body:any) {
    return new Promise((resolve,reject)=>{
      this.http.post(this.host+path, body).subscribe(
        (response: any) => {
          resolve(response);
        },
        (error) => {
          resolve({"error":error});
        }
      );
    });
  }

  makeGetCall(path:any) {
    return new Promise((resolve,reject)=>{
      this.http.get(this.host+path).subscribe(
        (response: any) => {
          resolve(response);
        },
        (error) => {
          resolve({"error":error});
        }
      );
    });
  }
}
