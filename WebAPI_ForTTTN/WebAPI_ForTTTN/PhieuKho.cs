using System;
using System.Collections.Generic;

namespace WebAPI_ForTTTN
{
    public partial class PhieuKho
    {
        public PhieuKho()
        {
            SanPhamPhieuKhos = new HashSet<SanPhamPhieuKho>();
        }

        public string IdPhieuKho { get; set; } = null!;
        public DateTime? NgayLap { get; set; }

        public virtual ICollection<SanPhamPhieuKho> SanPhamPhieuKhos { get; set; }
    }
}
