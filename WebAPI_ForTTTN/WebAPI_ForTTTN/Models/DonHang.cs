using System;
using System.Collections.Generic;

namespace WebAPI_ForTTTN.Models
{
    public partial class DonHang
    {
        public DonHang()
        {
            ChiTietDonHangs = new HashSet<ChiTietDonHang>();
        }
        public string IdDonHang { get; set; } = null!;
        public string? IdKhachHang { get; set; }
        public DateTime? NgayDatHang { get; set; }
        public decimal? TongTien { get; set; }
        public string? DiaChi { get; set; }
        public string? PhuongThuc { get; set; }
        public string? TrangthaiDh { get; set; }

        public virtual KhachHang? IdKhachHangNavigation { get; set; }
        public virtual ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; }
    }
}
