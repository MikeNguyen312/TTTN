<<<<<<< HEAD
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { SanPhamService } from '../../services/product.service';
import { Subscription } from 'rxjs';
=======
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { SanPhamService } from '../../services/product.service';
>>>>>>> fe

@Component({
  selector: 'app-trang-chu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trang-chu.component.html',
  styleUrls: ['./trang-chu.component.css']
})
<<<<<<< HEAD
export class TrangChuComponent implements OnInit, OnDestroy {
=======
export class TrangChuComponent implements OnInit {
>>>>>>> fe
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
<<<<<<< HEAD
  sanPhams: any[] = [];
  slideInterval: any;
  slideDuration: number = 5000; // Change slide every 5 seconds

  // Navigate to the previous slide
=======

>>>>>>> fe
  prevSlide(): void {
    this.currentSlide = (this.currentSlide === 0) ? this.slides.length - 1 : this.currentSlide - 1;
  }

<<<<<<< HEAD
  // Navigate to the next slide
=======
>>>>>>> fe
  nextSlide(): void {
    this.currentSlide = (this.currentSlide === this.slides.length - 1) ? 0 : this.currentSlide + 1;
  }

<<<<<<< HEAD
  // Go to a specific slide
=======
>>>>>>> fe
  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  constructor(private sanphamService: SanPhamService) {}

<<<<<<< HEAD
  ngOnInit(): void {
    // Load products when the component initializes
    this.loadSanPhams();

    // Start auto-sliding
    this.startSlideShow();
  }

  ngOnDestroy(): void {
    // Clean up the interval when the component is destroyed
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
=======
  sanPhams: any[] = [];
  giayNam: any[] = [];
  giayNu: any[] = [];

  ngOnInit(): void {
    this.loadSanPhams();
>>>>>>> fe
  }

  loadSanPhams(): void {
    this.sanphamService.getSanPhams().subscribe({
      next: (data) => {
        console.log('Fetched data:', data); 
<<<<<<< HEAD
        this.sanPhams = Array.isArray(data) ? data : []; // Ensure data is an array
=======
        this.sanPhams = Array.isArray(data) ? data : [];
        this.giayNam = this.sanPhams.filter(sp => sp.loai === 'Nam');
        this.giayNu = this.sanPhams.filter(sp => sp.loai === 'Nữ');
>>>>>>> fe
      },
      error: (err) => {
        console.error('Error fetching SanPhams:', err);
      }
    });
  }
<<<<<<< HEAD

  startSlideShow(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide(); // Change to the next slide every few seconds
    }, this.slideDuration);
  }
=======
>>>>>>> fe
}
