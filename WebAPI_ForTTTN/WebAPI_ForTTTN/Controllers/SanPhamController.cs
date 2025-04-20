using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI_ForTTTN.Models;

namespace WebAPI_ForTTTN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamController : ControllerBase
    {
        [HttpGet]
        public IActionResult getDSSanPham()
        {
            try
            {
                DBThuctapContext db = new DBThuctapContext();
                return Ok(
                    db.SanPhams.Select(t => new
                    {
                        IdSanPham = t.IdSanPham,
                        Ten = t.Ten,
                        Gia = t.Gia,
                        Hang = t.Hang,
                        Size = t.Size,
                        Thongtin =t.ThongTin,
                        Anh = t.Anh != null ? Convert.ToBase64String(t.Anh) : null
                    }).ToList()
                    );
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("{id}")]
        public IActionResult GetSanPhamById(string id)
        {
            try
            {
                DBThuctapContext db = new DBThuctapContext();
                var sanPham = db.SanPhams.FirstOrDefault(sp => sp.IdSanPham == id);

                if (sanPham == null)
                {
                    return NotFound();
                }

                return Ok(new
                {
                    IdSanPham = sanPham.IdSanPham,
                    Ten = sanPham.Ten,
                    Gia = sanPham.Gia,
                    Hang = sanPham.Hang,
                    Size = sanPham.Size,
                    ThongTin = sanPham.ThongTin,
                    Loai = sanPham.Loai,
                    Anh = sanPham.Anh != null ? Convert.ToBase64String(sanPham.Anh) : null
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
