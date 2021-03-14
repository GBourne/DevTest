using System;
using Microsoft.AspNetCore.Mvc;
using DeveloperTest.Business.Interfaces;
using DeveloperTest.Models;
using Microsoft.Extensions.Logging;

namespace DeveloperTest.Controllers
{
    [ApiController, Route("[controller]")]
    public class JobController : ControllerBase
    {
        private readonly IJobService jobService;
        private readonly ILogger<JobController> _logger;

        public JobController(IJobService jobService, ILogger<JobController> logger)
        {
            this.jobService = jobService;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(jobService.GetJobs());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var job = jobService.GetJob(id);

                if (job == null)
                {
                    return NotFound();
                }

                return Ok(job);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Create(BaseJobModel model)
        {
            if (model.When.Date < DateTime.Now.Date)
            {
                return BadRequest("Date cannot be in the past");
            }

            try
            {
                var job = jobService.CreateJob(model);

                return Created($"job/{job.JobId}", job);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
    }
}