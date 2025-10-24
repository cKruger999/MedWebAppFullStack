using MedWebApp.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MedWebApp.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using MedWebApp.Models.Dtos;

namespace MedWebApp.Controllers
{
    [Authorize(Roles = "Doctor")]
    [Route("api/[controller]")]
    [ApiController]
    public class VisitController : ControllerBase
    {
        readonly MedAppDbContext _dbContext;

        public VisitController(MedAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("GetHistory/{id}")]
        public IActionResult ViewHistory(int id) 
        {
            var patient = _dbContext.Patients.Find(id);
            if (patient == null)
            {
                return NotFound();
            }

            var visitHistory = _dbContext.VisitRecords
                .Where(v => v.PatientId == id)
                .OrderByDescending(v => v.VisitDate)
                .ToList();
            return Ok(visitHistory);
        }

        [HttpPost]
        [Route("AddVisit")]
        public IActionResult AddVisitRecord(AddVisitRecordDto addVisitRecordDto)
        {
            var visitRecord = new VisitRecord()
            {
                PatientId = addVisitRecordDto.PatientId,
                VisitDate = addVisitRecordDto.VisitDate,
                Diagnosis = addVisitRecordDto.Diagnosis,
                Treatment = addVisitRecordDto.Treatment
            };
            _dbContext.VisitRecords.Add(visitRecord);
            _dbContext.SaveChanges();
            return Ok(visitRecord);
        }

        [HttpPut]
        [Route("UpdateVisit/{id}")]
        public IActionResult UpdateVisitRecord(int id, UpdateVisitRecordDto updateVisitRecordDto)
        {
            var visitRecord = _dbContext.VisitRecords.Find(id);
            if (visitRecord == null) 
            { 
                return NotFound(); 
            }
            visitRecord.PatientId = updateVisitRecordDto.PatientId;
            visitRecord.VisitDate = updateVisitRecordDto.VisitDate;
            visitRecord.Diagnosis = updateVisitRecordDto.Diagnosis;
            visitRecord.Treatment = updateVisitRecordDto.Treatment;
            _dbContext.SaveChanges();
            return Ok(visitRecord);
        }

        [HttpDelete]
        [Route("DeleteVisit/{id}")]
        public IActionResult DeleteVisitRecord(int id)
        {
            var visitRecord = _dbContext.VisitRecords.Find(id);
            if (visitRecord == null)
            {
                return NotFound();
            }
            _dbContext.VisitRecords.Remove(visitRecord);
            _dbContext.SaveChanges();
            return Ok(visitRecord);
        }

    }
}
