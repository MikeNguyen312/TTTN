import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class KhoService {
  private apiUrl = 'https://localhost:7141/api/Kho'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getPhieuKho(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
