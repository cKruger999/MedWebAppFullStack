using MedWebApp.Models.Entities;
using MedWebApp.Models.SignUp;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;
namespace MedWebApp.Data
{
    public class MedAppDbContext : IdentityDbContext
    {
        public MedAppDbContext(DbContextOptions<MedAppDbContext> options) : base(options)
        {
            
        }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<VisitRecord> VisitRecords { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            SeedRoles(builder);
        }
        private static void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>().HasData
                (
                    new IdentityRole() { Id = "admin-id-1234", Name = "Admin", ConcurrencyStamp = "1", NormalizedName = "Admin" },
                    new IdentityRole() { Id = "assistant-id-5678", Name = "Doctor's Assistant", ConcurrencyStamp = "2", NormalizedName = "Doctor's Assistant" },
                    new IdentityRole() { Id = "doctor-id-9012", Name = "Doctor", ConcurrencyStamp = "3", NormalizedName = "Doctor" }
                );
        }
    }
}
