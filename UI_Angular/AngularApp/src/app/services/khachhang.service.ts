import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class KhachhangService {
  private apiUrl = 'https://localhost:7141/api/KhachHang'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getKhachHangs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
