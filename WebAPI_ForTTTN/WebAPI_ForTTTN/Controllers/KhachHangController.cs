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
                    }).ToList()
                    );
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost]
        public IActionResult postDSKhachHang(CKhachHang x)
        {

            try
            {
                DBThuctapContext db = new DBThuctapContext();
                db.KhachHangs.Add(CKhachHang.chuyendoi(x));
                db.SaveChanges();
                return Ok();

            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete]
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
        [HttpPut]
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
    }
}
