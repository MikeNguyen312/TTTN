using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI_ForTTTN.Models;
using WebAPI_ForTTTN.MyModels;

namespace WebAPI_ForTTTN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhoController : ControllerBase
    {
        [HttpGet]
        public IActionResult getDSKho()
        {
            try
            {
                DBThuctapContext db = new DBThuctapContext();
                return Ok(
                    db.PhieuKhos.Select(t => new
                    {
                       IdPhieuKho = t.IdPhieuKho,
                       NgayLap = t.NgayLap,
                    }).ToList()
                    );
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("{id}")]
        public IActionResult GetDSKhoID(string id)
        {
            try
            {
                using (DBThuctapContext db = new DBThuctapContext())
                {
                    var phieuKho = db.PhieuKhos.Find(id);
                    if (phieuKho == null)
                    {
                        return NotFound("Không tìm thấy phiếu kho.");
                    }

                    var danhSachSanPham = db.SanPhamPhieuKhos
                        .Where(sp => sp.IdPhieuKho == id)
                        .Select(sp => new CSanPhamPhieuKho
                        {
                            IdPhieuKho = sp.IdPhieuKho,
                            IdSanPham = sp.IdSanPham,
                            SoLuong = sp.SoLuong,
                            SoLuongNhap = sp.SoLuongNhap,
                            SoLuongXuat = sp.SoLuongXuat
                        }).ToList();
                    return Ok(danhSachSanPham);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi server: " + ex.Message);
            }
        }
        [HttpDelete]
        public IActionResult xoaDSKho(string id)
        {
            try
            {
                DBThuctapContext db = new DBThuctapContext();
                var pk = db.PhieuKhos.FirstOrDefault(p => p.IdPhieuKho == id);
                if (pk == null)
                {
                    return NotFound("Khong tim thay Phieu Kho");
                }

                var ktra = db.SanPhamPhieuKhos.Any(sp => sp.IdPhieuKho == id);
                if (ktra)
                {
                    return BadRequest("Con Item");
                }
                db.PhieuKhos.Remove(pk);
                db.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
        
        [HttpDelete("XoaID")]
        public IActionResult xoaItemtrongPK(string idPK, string idSanPham)
        {
            try
            {
                DBThuctapContext db = new DBThuctapContext();
                var a = db.SanPhamPhieuKhos.FirstOrDefault(sp => sp.IdPhieuKho == idPK && sp.IdSanPham == idSanPham);
                if(a == null)
                {
                    return NotFound("Khong tim thay san pham trong PK");
                }
                db.SanPhamPhieuKhos.Remove(a);
                db.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("TaoPhieuKho")]
        public IActionResult TaoPhieuKho(CPhieuKho pk)
        {
            try
            {
                DBThuctapContext db = new DBThuctapContext();
                db.PhieuKhos.Add(CPhieuKho.chuyendoi(pk));
                db.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("{idPhieuKho}/SanPham")]
        public IActionResult ThemItemvaoPK(CSanPhamPhieuKho x, string idPhieuKho)
        {
            try
            {
                DBThuctapContext db = new DBThuctapContext();

                var pk = db.PhieuKhos.Find(idPhieuKho);
                if (pk == null)
                {
                    return NotFound("Phiếu kho không tồn tại.");
                }

                var a = new CSanPhamPhieuKho
                {
                    IdPhieuKho = idPhieuKho,
                    IdSanPham = x.IdSanPham,
                    SoLuong = x.SoLuong,
                    SoLuongNhap = x.SoLuongNhap,
                    SoLuongXuat = x.SoLuongXuat,
                };
                db.SanPhamPhieuKhos.Add(CSanPhamPhieuKho.chuyendoi(a));
                db.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
