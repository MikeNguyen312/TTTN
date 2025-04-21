using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace WebAPI_ForTTTN.Models
{
    public partial class SanPhamPhieuKho
    {
        public string IdPhieuKho { get; set; } = null!;
        public string IdSanPham { get; set; } = null!;
        public int? SoLuong { get; set; }
        public int? SoLuongXuat { get; set; }
        public int? SoLuongNhap { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual PhieuKho IdPhieuKhoNavigation { get; set; } = null!;
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual SanPham IdSanPhamNavigation { get; set; } = null!;
    }
}
