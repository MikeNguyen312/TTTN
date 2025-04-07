import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { SanPhamService } from '../../services/product.service';

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
      image: 'assets/slide/anh1.jpg', // Replace with your sneaker image path
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


  // Navigate to the previous slide
  prevSlide(): void {
    this.currentSlide = (this.currentSlide === 0) ? this.slides.length - 1 : this.currentSlide - 1;
  }

  // Navigate to the next slide
  nextSlide(): void {
    this.currentSlide = (this.currentSlide === this.slides.length - 1) ? 0 : this.currentSlide + 1;
  }

  // Go to a specific slide
  goToSlide(index: number): void {
    this.currentSlide = index;
  }
    // Inject the service in the constructor
    constructor(private sanphamService: SanPhamService) {}
    sanPhams: any[] = [];
    ngOnInit(): void {
      // Load products when the component initializes
      this.loadSanPhams();
    }
  
    loadSanPhams(): void {
      this.sanphamService.getSanPhams().subscribe({
        next: (data) => {
          console.log('Fetched data:', data); 
          this.sanPhams = Array.isArray(data) ? data : []; // Ensure data is an array
        },
        error: (err) => {
          console.error('Error fetching SanPhams:', err);
        }
      });
    }
}

