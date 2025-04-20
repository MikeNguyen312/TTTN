import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class SanPhamService {
  private apiUrl = 'https://localhost:7141/api/SanPham';

  constructor(private http: HttpClient) { }

  getSanPhams(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getSanPhamById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
