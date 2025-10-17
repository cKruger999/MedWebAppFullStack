using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedWebApp.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Employed",
                table: "User");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Employed",
                table: "User",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
