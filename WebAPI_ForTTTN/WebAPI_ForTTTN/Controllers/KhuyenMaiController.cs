using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI_ForTTTN.Models;

namespace WebAPI_ForTTTN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhuyenMaiController : ControllerBase
    {
        [HttpGet]
        public IActionResult getDSKM() {
            try
            {
                DBThuctapContext db = new DBThuctapContext();
                var a = db.KhuyenMais.ToList();
                return Ok(db);
            }
            catch
            {
                return NotFound();
            }
        
        }
    }
}
