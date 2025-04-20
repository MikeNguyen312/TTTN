import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DonhangService {
  private apiUrl = 'https://localhost:7141/api/DonHang'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getDonHangs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
