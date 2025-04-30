using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI_ForTTTN.Models;
using WebAPI_ForTTTN.MyModels;
using static WebAPI_ForTTTN.Models.DonHang;

namespace WebAPI_ForTTTN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonHangController : ControllerBase
    {
        [HttpGet]
        public IActionResult getDSDonHang()
        {
            try
            {
                DBThuctapContext db = new DBThuctapContext();
                return Ok(
                    db.DonHangs.Select(t => new
                    {
                        IdDonHang = t.IdDonHang,
                        IdKhachHang = t.IdKhachHang,
                        NgayDatHang = t.NgayDatHang,
                        TongTien = t.TongTien
                    }).ToList()
                    );
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ChitietDonHang")]
        public IActionResult getCTDH (string id)
        {
            try
            {
                DBThuctapContext db = new DBThuctapContext ();
                var a = db.DonHangs.Find(id);
                if(a == null) { return NotFound("Khong tim thay ID don hang"); }
                var kq = db.ChiTietDonHangs
                    .Where(sp => sp.IdDonHang == id)
                    .Select(sp => new CCTDH
                    {
                        IdDonHang = sp.IdDonHang,
                        IdSanPham = sp.IdSanPham,
                        SoLuong = sp.SoLuong,
                        Gia = sp.Gia,
                        IdKhachHang = sp.IdDonHangNavigation.IdKhachHang
                    }).ToList();
                return Ok( kq );
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("TaoDonHang")]
        public IActionResult taoDonHang(CDonHang x)
        {
            try
            {
                DBThuctapContext db = new DBThuctapContext();
                db.DonHangs.Add(CDonHang.chuyendoi(x));
                db.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("{idDonHang}/SanPham")]
        public IActionResult ThemSPDH(CCTDH x, string idDonHang)
        {
            try
            {
                DBThuctapContext db = new DBThuctapContext();

                // Tìm phiếu kho theo id
                var dh = db.DonHangs.Find(idDonHang);
                if (dh == null)
                {
                    return NotFound("Đơn hàng không tồn tại.");
                }

                // Tìm sản phẩm theo IdSanPham
                var sanPham = db.SanPhams.Find(x.IdSanPham);
                if (sanPham == null)
                {
                    return NotFound("Sản phẩm không tồn tại.");
                }
                db.ChiTietDonHangs.Add(CCTDH.chuyendoi(x));
                sanPham.SoLuong -= x.SoLuong ?? 0;
                db.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                // Log lỗi chi tiết (có thể log trong hệ thống hoặc ghi vào console)
                return BadRequest("Lỗi khi thêm sản phẩm vào phiếu kho: " + ex.Message);
            }
        }
        [HttpDelete("XoaDonHang")]
        public IActionResult xoaDonHang(string id)
        {
            try
            {
                DBThuctapContext db = new DBThuctapContext();
                var a = db.DonHangs.Find(id);
                if(a == null) { return NotFound(); }
                var kt = db.ChiTietDonHangs.Any(sp => sp.IdDonHang == id);
                if (kt) { return BadRequest("Con SanPham"); }
                db.DonHangs.Remove(a);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("XoaID")]
        public IActionResult xoaItemtrongDH(string idDonHang, string idSanPham)
        {
            try
            {
                DBThuctapContext db = new DBThuctapContext();
                var a = db.ChiTietDonHangs.FirstOrDefault(sp => sp.IdDonHang == idDonHang && sp.IdSanPham == idSanPham);
                if (a == null)
                {
                    return NotFound("Khong tim thay san pham trong PK");
                }
                db.ChiTietDonHangs.Remove(a);
                db.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("TaoDonHangVaChiTiet")]
        public IActionResult TaoDonHangVaChiTiet(DonHangVaChiTietModel model)
        {
            try
            {
                DBThuctapContext db = new DBThuctapContext();
                using var tran = db.Database.BeginTransaction();

                var donHang = new DonHang
                {
                    IdDonHang = model.IdDonHang,
                    IdKhachHang = model.IdKhachHang,
                    NgayDatHang = model.NgayDatHang,
                    TongTien = model.TongTien,
                    DiaChi = model.DiaChi,
                    PhuongThuc = model.PhuongThuc,
                    TrangthaiDh = model.TrangthaiDh
                };

                db.DonHangs.Add(donHang);

                foreach (var ct in model.ChiTiet)
                {
                    var sanPham = db.SanPhams.Find(ct.IdSanPham);
                    if (sanPham == null)
                        return NotFound("Sản phẩm không tồn tại: " + ct.IdSanPham);
                    sanPham.SoLuong -= ct.SoLuong ?? 0;

                    db.ChiTietDonHangs.Add(new ChiTietDonHang
                    {
                        IdDonHang = model.IdDonHang,
                        IdSanPham = ct.IdSanPham,
                        SoLuong = ct.SoLuong,
                        Gia = ct.Gia
                    });
                }

                db.SaveChanges();
                tran.Commit();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi khi tạo đơn hàng và chi tiết: " + ex.Message);
            }
        }

    }
}
