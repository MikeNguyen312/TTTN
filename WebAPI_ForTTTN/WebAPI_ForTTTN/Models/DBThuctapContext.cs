using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebAPI_ForTTTN.Models
{
    public partial class DBThuctapContext : DbContext
    {
        public DBThuctapContext()
        {
        }

        public DBThuctapContext(DbContextOptions<DBThuctapContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ChiTietDonHang> ChiTietDonHangs { get; set; } = null!;
        public virtual DbSet<DonHang> DonHangs { get; set; } = null!;
        public virtual DbSet<KhachHang> KhachHangs { get; set; } = null!;
        public virtual DbSet<PhieuKho> PhieuKhos { get; set; } = null!;
        public virtual DbSet<SanPham> SanPhams { get; set; } = null!;
        public virtual DbSet<SanPhamPhieuKho> SanPhamPhieuKhos { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=SQLVM,1433;Database=DBThuctap;User Id=admin;Password=1;TrustServerCertificate=True;Encrypt=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChiTietDonHang>(entity =>
            {
                entity.HasKey(e => new { e.IdDonHang, e.IdSanPham })
                    .HasName("PK__ChiTietD__AFA0CC00483FE7BD");

                entity.ToTable("ChiTietDonHang", "dbo");

                entity.Property(e => e.IdDonHang)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("ID_DonHang");

                entity.Property(e => e.IdSanPham)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("ID_SanPham");

                entity.HasOne(d => d.IdDonHangNavigation)
                    .WithMany(p => p.ChiTietDonHangs)
                    .HasForeignKey(d => d.IdDonHang)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ChiTietDo__ID_Do__5070F446");

                entity.HasOne(d => d.IdSanPhamNavigation)
                    .WithMany(p => p.ChiTietDonHangs)
                    .HasForeignKey(d => d.IdSanPham)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ChiTietDo__ID_Sa__5165187F");
            });

            modelBuilder.Entity<DonHang>(entity =>
            {
                entity.HasKey(e => e.IdDonHang)
                    .HasName("PK__DonHang__99B72639199FE2CC");

                entity.ToTable("DonHang", "dbo");

                entity.Property(e => e.IdDonHang)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("ID_DonHang");

                entity.Property(e => e.IdKhachHang)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("ID_KhachHang");

                entity.Property(e => e.NgayDatHang).HasColumnType("date");

                entity.Property(e => e.TongTien).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.IdKhachHangNavigation)
                    .WithMany(p => p.DonHangs)
                    .HasForeignKey(d => d.IdKhachHang)
                    .HasConstraintName("FK__DonHang__ID_Khac__4BAC3F29");
            });

            modelBuilder.Entity<KhachHang>(entity =>
            {
                entity.HasKey(e => e.IdKhachHang)
                    .HasName("PK__KhachHan__263C4E85F8109121");

                entity.ToTable("KhachHang", "dbo");

                entity.Property(e => e.IdKhachHang)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("ID_KhachHang");

                entity.Property(e => e.DiaChi).HasMaxLength(255);

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.HoTen).HasMaxLength(255);

                entity.Property(e => e.Passwords)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.SoDienThoai).HasMaxLength(20);
            });

            modelBuilder.Entity<PhieuKho>(entity =>
            {
                entity.HasKey(e => e.IdPhieuKho)
                    .HasName("PK__PhieuKho__FEBF2F1A5E1C4AB2");

                entity.ToTable("PhieuKho", "dbo");

                entity.Property(e => e.IdPhieuKho)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("ID_PhieuKho");

                entity.Property(e => e.NgayLap).HasColumnType("date");
            });

            modelBuilder.Entity<SanPham>(entity =>
            {
                entity.HasKey(e => e.IdSanPham)
                    .HasName("PK__SanPham__617EA39217EF6E76");

                entity.ToTable("SanPham", "dbo");

                entity.Property(e => e.IdSanPham)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("ID_SanPham");

                entity.Property(e => e.Hang).HasMaxLength(255);

                entity.Property(e => e.Size).HasMaxLength(255);

                entity.Property(e => e.Ten).HasMaxLength(255);

                entity.Property(e => e.ThongTin).HasMaxLength(500);
            });

            modelBuilder.Entity<SanPhamPhieuKho>(entity =>
            {
                entity.HasKey(e => new { e.IdPhieuKho, e.IdSanPham })
                    .HasName("PK__SanPham___C8A8C523DE6185F2");

                entity.ToTable("SanPham_PhieuKho", "dbo");

                entity.Property(e => e.IdPhieuKho)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("ID_PhieuKho");

                entity.Property(e => e.IdSanPham)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("ID_SanPham");

                entity.HasOne(d => d.IdPhieuKhoNavigation)
                    .WithMany(p => p.SanPhamPhieuKhos)
                    .HasForeignKey(d => d.IdPhieuKho)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__SanPham_P__ID_Ph__5629CD9C");

                entity.HasOne(d => d.IdSanPhamNavigation)
                    .WithMany(p => p.SanPhamPhieuKhos)
                    .HasForeignKey(d => d.IdSanPham)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__SanPham_P__ID_Sa__571DF1D5");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
