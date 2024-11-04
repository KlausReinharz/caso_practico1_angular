import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL="http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  postCustomer(customerDto:any):Observable<any>{
    return this.http.post(BASIC_URL +"person/save", customerDto);
  }

  getCustomer():Observable<any>{
    return this.http.get(BASIC_URL + "person/getAll")
  }


  getCustomerById(id:number):Observable<any>{
    return this.http.get(BASIC_URL + `person/get/${id}`)
  }

  updateCustomer(id:number, customerDto:any):Observable<any>{
    return this.http.put(BASIC_URL + `person/update/${id}`, customerDto)
  }

  deleteCustomer(id: number):Observable<any>{
    return this.http.delete(BASIC_URL +`person/delete/${id}`)
  }

}
