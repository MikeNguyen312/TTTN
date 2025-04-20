import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-trang-chu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trang-chu.component.html',
  styleUrls: ['./trang-chu.component.css']
})
export class TrangChuComponent implements OnInit {
  slides = [
    {
      image: 'assets/slide/anh1.jpg',
      subtitle: 'Sneaker Collection',
      title: 'GOOD SHOES TAKE YOU GOOD PLACES',
      buttonText: 'Shop Now'
    },
    {
      image: 'assets/slide/anh2.jpg',
      subtitle: 'New Arrivals',
      title: 'STEP INTO STYLE',
      buttonText: 'Explore Now'
    },
    {
      image: 'assets/slide/anh3.jpg',
      subtitle: 'Limited Edition',
      title: 'GRAB YOURS TODAY',
      buttonText: 'Buy Now'
    }
  ];

  currentSlide = 0;

  prevSlide(): void {
    this.currentSlide = (this.currentSlide === 0) ? this.slides.length - 1 : this.currentSlide - 1;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide === this.slides.length - 1) ? 0 : this.currentSlide + 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  constructor(private sanphamService: ProductService) {}

  sanPhams: any[] = [];
  giayNam: any[] = [];
  giayNu: any[] = [];

  ngOnInit(): void {
    this.loadSanPhams();
  }

  loadSanPhams(): void {
    this.sanphamService.getSanPhams().subscribe({
      next: (data) => {
        console.log('Fetched data:', data); 
        this.sanPhams = Array.isArray(data) ? data : [];
        this.giayNam = this.sanPhams.filter(sp => sp.loai === 'Nam');
        this.giayNu = this.sanPhams.filter(sp => sp.loai === 'Nữ');
      },
      error: (err) => {
        console.error('Error fetching SanPhams:', err);
      }
    });
  }
}
