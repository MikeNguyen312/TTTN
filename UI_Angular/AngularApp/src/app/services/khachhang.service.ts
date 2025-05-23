import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class KhachhangService {
  private apiUrl = 'https://localhost:7141/api/KhachHang';
  private apiUrlThem = 'https://localhost:7141/api/KhachHang/ThemKhachHang';
  private apiUrlXoa = 'https://localhost:7141/api/KhachHang/XoaKhachHang';
  private apiUrlSua = 'https://localhost:7141/api/KhachHang/SuaKhachHang';
  private apiUrlLogin = 'https://localhost:7141/api/login';
  constructor(private http: HttpClient) { }

  getKhachHangs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addKhachHang(khachHang: any): Observable<any> {
    return this.http.post(this.apiUrlThem, khachHang);
  }

  deleteKhachHang(id: string):Observable<any>{
    return this.http.delete(`${this.apiUrlXoa}?id=${id}`);
  }

  udpateKhachhang(khachHang:any): Observable<any> {
    return this.http.put(this.apiUrlSua,khachHang);
  }
  updateTrangThai(id: string, trangThai: string): Observable<any> {
    return this.http.put(`https://localhost:7141/api/KhachHang/CapNhatTrangThai?id=${id}&trangThai=${trangThai}`, {});
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password }; // Không cần model
    return this.http.post(this.apiUrlLogin, body);
  }

  getThongTinKhachHang(): Observable<any> {
    const idKhachHang = localStorage.getItem('userId');
    console.log(`${this.apiUrl}/${idKhachHang}`);
    return this.http.get<any>(`${this.apiUrl}/${idKhachHang}`);
  }

  getDonHang(idKhachHang: string): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7141/api/KhachHang/donhang?idKhachHang=${idKhachHang}`);
  }

  // Lấy chi tiết đơn hàng theo idKhachHang
  getDonHangVaChiTiet(idKhachHang: string): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7141/api/KhachHang/don-hang-chi-tiet/${idKhachHang}`);
  }
}
