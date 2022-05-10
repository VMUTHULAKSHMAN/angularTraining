import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserData } from "./user.model";


@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private http: HttpClient) {}

    getUserDetails(page: number): Observable<UserData> {
        console.log(page,'new page number')
        return this.http.get<UserData>(`https://randomuser.me/api/?page=${page}&results=10&seed=abc`)
    }
}
