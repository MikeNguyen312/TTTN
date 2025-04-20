import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule và Routes
=======
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
>>>>>>> fe
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductComponent } from './pages/product/product.component';
import { KhoComponent } from './pages/kho/kho.component';
import { DonhangComponent } from './pages/donhang/donhang.component';
import { KhachhangComponent } from './pages/khachhang/khachhang.component';
import { TrangChuComponent } from './giaodien/trang-chu/trang-chu.component';
import { ThanhDieuHuongComponent } from './giaodien/thanh-dieu-huong/thanh-dieu-huong.component';
<<<<<<< HEAD
import { LienHeComponent } from './giaodien/lien-he/lien-he.component';
import { LoginComponent } from './giaodien/login/login.component';
import { RegisterComponent } from './giaodien/register/register.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'trang-chu/guest',
=======
import { GiaynamComponent } from './giaodien/giaynam/giaynam.component';
import { GiaynuComponent } from './giaodien/giaynu/giaynu.component';
import { KhuyenmaiComponent } from './giaodien/khuyenmai/khuyenmai.component';
import { LienHeComponent } from './giaodien/lien-he/lien-he.component';
import { ChiTietSanPhamComponent } from './giaodien/chi-tiet-san-pham/chi-tiet-san-pham.component';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'trang-chu',
>>>>>>> fe
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    },
<<<<<<< HEAD
    
    {
        path: 'register',
        component: RegisterComponent
    },
=======
>>>>>>> fe
    {
        path: 'admin',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'product',
                component: ProductComponent
            },
            {
                path: 'kho',
                component: KhoComponent
            },
            {
                path: 'donhang',
                component: DonhangComponent
            },
            {
                path: 'khachhang',
                component: KhachhangComponent
            }
        ]
    },
    {
        path: '',
        component: ThanhDieuHuongComponent,
        children: [
            {
                path: 'trang-chu',
                component: TrangChuComponent
            },
            {
<<<<<<< HEAD
                path: 'lien-he',
                component: LienHeComponent
            },
            { path: 'trang-chu/:id', component: TrangChuComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: '**', redirectTo: 'trang-chu/guest' },
=======
                path: 'giaynam',
                component: GiaynamComponent
            },
            {
                path:'chi-tiet-san-pham/:id',
                component: ChiTietSanPhamComponent
            },
            {
                path: 'giaynu',
                component: GiaynuComponent
            },
            {
                path: 'khuyenmai',
                component: KhuyenmaiComponent
            },
            {
                path: 'lien-he',
                component: LienHeComponent
            },
>>>>>>> fe
        ]
    },
];

<<<<<<< HEAD
// Tạo module để cấu hình RouterModule
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Import routes vào RouterModule
  exports: [RouterModule]  // Xuất RouterModule để có thể sử dụng trong các component
=======
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
>>>>>>> fe
})
export class AppRoutingModule { }
