using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI_ForTTTN.Models;

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
                        DiaChi = t.DiaChi,
                    }).ToList()
                    );
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
