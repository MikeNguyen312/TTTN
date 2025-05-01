import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7141/api/SanPham';

  constructor(private http: HttpClient) { }

  getSanPhams(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getSanPhamById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  addSanPham(sanPham: any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/TaoSanPham`,sanPham);
  }
  deleteSanPham(id: string):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/XoaSanPham?id=${id}`);
  }
  updateSanPham(id: string, sp: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/SuaSanPham/${id}`, sp);
  }
  
}
