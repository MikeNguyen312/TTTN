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
  getChiTietDonHang(id: string) {
    return this.http.get(`${this.apiUrl}/ChitietDonHang?id=${id}`);
  }

  taoDonhang(donHang: any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/TaoDonHang`,donHang);
  }
  capNhatDonHang(idDonHang: string, donHang: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/capnhatDH/${idDonHang}`, donHang);
  }

  deleteDonHang(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/XoaDonHang?id=${id}`);
  }
  
}
