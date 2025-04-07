import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule và Routes
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductComponent } from './pages/product/product.component';
import { KhoComponent } from './pages/kho/kho.component';
import { DonhangComponent } from './pages/donhang/donhang.component';
import { KhachhangComponent } from './pages/khachhang/khachhang.component';
import { TrangChuComponent } from './giaodien/trang-chu/trang-chu.component';
import { ThanhDieuHuongComponent } from './giaodien/thanh-dieu-huong/thanh-dieu-huong.component';
import { LienHeComponent } from './giaodien/lien-he/lien-he.component';

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
                path: 'lien-he',
                component: LienHeComponent
            },
        ]
    },
];

// Tạo module để cấu hình RouterModule
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Import routes vào RouterModule
  exports: [RouterModule]  // Xuất RouterModule để có thể sử dụng trong các component
})
export class AppRoutingModule { }
