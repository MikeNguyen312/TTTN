using System;
using System.Collections.Generic;

namespace WebAPI_ForTTTN.Models
{
    public partial class SanPham
    {
        public SanPham()
        {
            ChiTietDonHangs = new HashSet<ChiTietDonHang>();
            SanPhamPhieuKhos = new HashSet<SanPhamPhieuKho>();
        }

        public string IdSanPham { get; set; } = null!;
        public string? Ten { get; set; }
        public double? Gia { get; set; }
        public string? Hang { get; set; }
        public string? Size { get; set; }
        public string? ThongTin { get; set; }

        public virtual ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; }
        public virtual ICollection<SanPhamPhieuKho> SanPhamPhieuKhos { get; set; }
    }
}
