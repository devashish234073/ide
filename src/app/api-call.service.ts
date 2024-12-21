import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) { }

  makePostCall(url:any,body:any) {
    return new Promise((resolve,reject)=>{
      this.http.post(url, body).subscribe(
        (response: any) => {
          resolve(response);
        },
        (error) => {
          resolve({"error":error});
        }
      );
    });
  }

  makeGetCall(url:any) {
    return new Promise((resolve,reject)=>{
      this.http.get(url).subscribe(
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
