import { Observable } from 'rxjs';
import { RestDataSource } from './rest.datasource';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {
    constructor(private datasource: RestDataSource) { }

    autheticate(username: string, password: string): Observable<boolean> {
        return this.datasource.authenticate(username, password);
    }

    // tslint:disable-next-line: typedef
    clear() {
        this.datasource.auth_token = null;
    }
}
