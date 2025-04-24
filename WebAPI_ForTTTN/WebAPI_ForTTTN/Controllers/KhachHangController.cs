using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebAPI_ForTTTN.Models;
using WebAPI_ForTTTN.MyModels;

namespace WebAPI_ForTTTN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        [HttpGet]
        public IActionResult getDSKhachHang()
        {
            try
            {
                DBThuctapContext db = new DBThuctapContext();
                return Ok(
                    db.KhachHangs.Select(t => new
                    {
                        IdKhachHang = t.IdKhachHang,
                        HoTen = t.HoTen,
                        SoDienThoai = t.SoDienThoai,
                        Email = t.Email,
                        Passwords = t.Passwords,
                        trangthai = t.Trangthai,
                    }).ToList()
                    );
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("ThemKhachHang")]
        public IActionResult postDSKhachHang(CKhachHang x)
        {

            try
            {
                DBThuctapContext db = new DBThuctapContext();
                var kh = CKhachHang.chuyendoi(x);
                kh.Trangthai = "Chờ xác nhận"; // bắt buộc gán
                kh.RoleWeb = "user";
                db.KhachHangs.Add(kh);
                db.SaveChanges();
                return Ok();

            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("XoaKhachHang")]
        public IActionResult deleteKhachHang(string id)
        {
            try
            {
                DBThuctapContext db = new DBThuctapContext();
                KhachHang kh = db.KhachHangs.Find(id);
                if(kh == null)
                {
                    return NotFound();
                }
                else
                {
                    db.KhachHangs.Remove(kh);
                    db.SaveChanges();
                    return Ok();
                }   
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("SuaKhachHang")]
        public IActionResult EditKhachHang(CKhachHang x)
        {
            try
            {
                DBThuctapContext db = new DBThuctapContext();
                KhachHang mh = db.KhachHangs.Find(x.IdKhachHang);
                if (mh == null) return NotFound();
                mh.HoTen = x.HoTen;
                mh.SoDienThoai = x.SoDienThoai;
                mh.Passwords =x.Passwords;
                mh.Email = x.Email;
                db.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("/api/login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            try
            {
                var db = new DBThuctapContext();

                // Tìm đúng khách hàng theo email + password
                var user = db.KhachHangs
                    .Where(kh => kh.Email == request.Email && kh.Passwords == request.Password )
                    .Select(kh => new
                    {
                        ID_KhachHang = kh.IdKhachHang,
                        HoTen = kh.HoTen,
                        Email = kh.Email,
                        SoDienThoai = kh.SoDienThoai,
                        Trangthai = kh.Trangthai
                    })
                    .FirstOrDefault();

                if (user == null)
                {
                    return Unauthorized(new { message = "Email hoặc mật khẩu không đúng" });
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi server", error = ex.Message });
            }
        }
        [HttpPut("CapNhatTrangThai")]
        public IActionResult CapNhatTrangThai(string id, string trangThai)
        {
            try
            {
                var db = new DBThuctapContext();
                var kh = db.KhachHangs.Find(id);
                if (kh == null) return NotFound();
                kh.Trangthai = trangThai;
                db.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        public class LoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

    }
}
