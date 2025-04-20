using System;
using System.Collections.Generic;

namespace WebAPI_ForTTTN.Models
{
    public partial class KhuyenMai
    {
        public string IdKhuyenMai { get; set; } = null!;
        public double? PhanTramKm { get; set; }
        public string? IdSanPham { get; set; }

        public virtual SanPham? IdSanPhamNavigation { get; set; }
    }
}
