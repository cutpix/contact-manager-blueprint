import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  public post<T>(url: string, body: any): Observable<T> {
    const path = `${this.baseUrl}/${url}`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.auth.getToken()}`)
      .set('Audience', 'Any');

    const options = { headers };

    return this.httpClient.post<T>(path, body, options)
      .pipe(
        map((res: HttpResponse<T>) => res),
        catchError((res: HttpErrorResponse) => this.onRequestError(res))
      );
  }

  onRequestError(res: HttpErrorResponse) {
    const statusCode = res.status;
    const body = res.error;

    const error = {
      statusCode: statusCode,
      error: body.error,
      description: body.error_description
    };

    return throwError(error);
  }

}
