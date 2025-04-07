using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI_ForTTTN.Models;

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
    }
}
