import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KhuyenmaiService {
  private apiUrl = 'https://localhost:7141/api/KhuyenMai';
  constructor(private http: HttpClient) {}
  getDSKhuyenMai(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // Lấy danh sách sản phẩm áp dụng khuyến mãi theo idKhuyenMai
  getSanPhamKhuyenMai(idKhuyenMai: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/LayDSKM/${idKhuyenMai}`);
  }

  xoaSanPhamKhoiKhuyenMai(idKhuyenMai: string, idSanPham: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/XoaSanPhamKM?idKhuyenMai=${idKhuyenMai}&idSanPham=${idSanPham}`, { responseType: 'text' });
  }

  xoaKhuyenMai(idKhuyenMai: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/XoaKMID?id=${idKhuyenMai}`);
  }

  taoKhuyenMai(khuyenMai: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/TaoKM`, khuyenMai);
  }
}
