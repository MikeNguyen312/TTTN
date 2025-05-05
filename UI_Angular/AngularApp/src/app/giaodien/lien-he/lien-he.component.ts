import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-lien-he',
  imports:[FormsModule],
  templateUrl: './lien-he.component.html',
  styleUrls: ['./lien-he.component.css']
})
export class LienHeComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('https://your-backend-api.com/api/contact', this.contact)
      .subscribe({
        next: () => alert('Đã gửi liên hệ thành công!'),
        error: err => alert('Lỗi khi gửi liên hệ: ' + err.message)
      });
  }
}
