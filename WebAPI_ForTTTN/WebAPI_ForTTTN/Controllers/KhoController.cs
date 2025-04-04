using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI_ForTTTN.Models;

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
    }
}
