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
  getSanPhamsByPhieuKho(idPhieuKho: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${idPhieuKho}`);
  }

  xoaSanPhamTrongPhieuKho(idPhieuKho: string, idSanPham: string) {
    return this.http.delete(`https://localhost:7141/api/Kho/XoaID?idPhieuKho=${idPhieuKho}&idSanPham=${idSanPham}`);
  }

  xoaPhieuKho(idPhieuKho: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}?id=${idPhieuKho}`);
  }
}
