import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class SanPhamService {
<<<<<<< HEAD
  private apiUrl = 'https://localhost:7141/api/SanPham'; // Replace with your actual API URL
=======
  private apiUrl = 'https://localhost:7141/api/SanPham';
>>>>>>> fe

  constructor(private http: HttpClient) { }

  getSanPhams(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
<<<<<<< HEAD
=======
  getSanPhamById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
>>>>>>> fe
}
