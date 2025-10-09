using MedWebApp.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedWebApp.Models.Dtos
{
    public class UpdateVisitRecordDto
    {
        public required DateTime VisitDate { get; set; }

        public required string Diagnosis { get; set; }

        public required string Treatment { get; set; }

        public int PatientId { get; set; }

    }
}
