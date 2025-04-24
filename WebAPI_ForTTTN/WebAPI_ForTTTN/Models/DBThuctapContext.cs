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

        public virtual DbSet<KhuyenMai> KhuyenMais { get; set; } = null!;
        public virtual DbSet<SanPham> SanPhams { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost;Database=DBThuctap;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<KhuyenMai>(entity =>
            {
                entity.HasKey(e => e.IdKhuyenMai)
                    .HasName("PK__KhuyenMa__E93749B42FE79697");

                entity.ToTable("KhuyenMai");

                entity.Property(e => e.IdKhuyenMai)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("ID_KhuyenMai");

                entity.Property(e => e.PhanTramKm).HasColumnName("PhanTramKM");

                entity.HasMany(d => d.IdSanPhams)
                    .WithMany(p => p.IdKhuyenMais)
                    .UsingEntity<Dictionary<string, object>>(
                        "KhuyenMaiSanPham",
                        l => l.HasOne<SanPham>().WithMany().HasForeignKey("IdSanPham").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__KhuyenMai__ID_Sa__17036CC0"),
                        r => r.HasOne<KhuyenMai>().WithMany().HasForeignKey("IdKhuyenMai").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__KhuyenMai__ID_Kh__160F4887"),
                        j =>
                        {
                            j.HasKey("IdKhuyenMai", "IdSanPham").HasName("PK__KhuyenMa__DF20A38DC26909DC");

                            j.ToTable("KhuyenMaiSanPham");

                            j.IndexerProperty<string>("IdKhuyenMai").HasMaxLength(255).IsUnicode(false).HasColumnName("ID_KhuyenMai");

                            j.IndexerProperty<string>("IdSanPham").HasMaxLength(150).IsUnicode(false).HasColumnName("ID_SanPham");
                        });
            });

            modelBuilder.Entity<SanPham>(entity =>
            {
                entity.HasKey(e => e.IdSanPham);

                entity.ToTable("SanPham");

                entity.Property(e => e.IdSanPham)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("ID_SanPham");

                entity.Property(e => e.Hang).HasMaxLength(255);

                entity.Property(e => e.Loai).HasMaxLength(100);

                entity.Property(e => e.Size).HasMaxLength(255);

                entity.Property(e => e.Ten).HasMaxLength(255);

                entity.Property(e => e.ThongTin).HasMaxLength(500);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
