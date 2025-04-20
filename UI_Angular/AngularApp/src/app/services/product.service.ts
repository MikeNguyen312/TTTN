import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7141/api/SanPham'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getSanPhams(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getSanPhamById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
