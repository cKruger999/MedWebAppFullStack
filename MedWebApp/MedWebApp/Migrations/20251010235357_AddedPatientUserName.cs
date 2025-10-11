using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedWebApp.Migrations
{
    /// <inheritdoc />
    public partial class AddedPatientUserName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PatientUsername",
                table: "Patients",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PatientUsername",
                table: "Patients");
        }
    }
}
