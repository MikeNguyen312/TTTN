import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductComponent } from './pages/product/product.component';
import { KhoComponent } from './pages/kho/kho.component';
import { DonhangComponent } from './pages/donhang/donhang.component';
import { KhachhangComponent } from './pages/khachhang/khachhang.component';
import { TrangChuComponent } from './giaodien/trang-chu/trang-chu.component';
import { ThanhDieuHuongComponent } from './giaodien/thanh-dieu-huong/thanh-dieu-huong.component';
import { LienHeComponent } from './giaodien/lien-he/lien-he.component';
import { LoginComponent } from './giaodien/login/login.component';
import { RegisterComponent } from './giaodien/register/register.component';
import { GiaynamComponent } from './giaodien/giaynam/giaynam.component';
import { ChiTietSanPhamComponent } from './giaodien/chi-tiet-san-pham/chi-tiet-san-pham.component';
import { GiaynuComponent } from './giaodien/giaynu/giaynu.component';
import { KhuyenmaiComponent } from './giaodien/khuyenmai/khuyenmai.component';
import { ChitietphieukhoComponent } from './pages/kho/chitietphieukho/chitietphieukho.component';
import { GioHangComponent } from './giaodien/gio-hang/gio-hang.component';
import { TaoPhieuKhoComponent } from './pages/kho/taophieukho/taophieukho.component';
import { FormThemSanPhamComponent } from './pages/kho/formthemsanpham/formthemsanpham.component';
import { ThongkeComponent } from './pages/kho/thongke/thongke.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'trang-chu',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    
    {
        path: 'register',
        component: RegisterComponent
    },
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
                path: 'kho/taophieukho',
                component:TaoPhieuKhoComponent
            },
            {
                path: 'kho/thongke',
                component:ThongkeComponent
            },
            {
                path: 'kho/:id',
                component:ChitietphieukhoComponent
            },
            {
                path: 'kho/:id/formthemsanpham',
                component:FormThemSanPhamComponent
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
                path: 'lien-he',
                component: LienHeComponent
            },
            {
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
                path: 'giohang',
                component: GioHangComponent
            },
            { 
                path: 'trang-chu/:id',
                component: TrangChuComponent,
            },
            { path: 'dashboard', component: DashboardComponent },
        ]
    },
];

    // Tạo module để cấu hình RouterModule
    @NgModule({
    imports: [RouterModule.forRoot(routes)], // Import routes vào RouterModule
    exports: [RouterModule]  // Xuất RouterModule để có thể sử dụng trong các component
    })
    export class AppRoutingModule { }
