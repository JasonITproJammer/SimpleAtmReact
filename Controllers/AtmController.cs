using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SimpleAtmReact.Models;
using SimpleAtmReact.Domain;
using Microsoft.Extensions.Logging;
using System.Net;

namespace SimpleAtmReact.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AtmController : ControllerBase
    {
        private readonly IInventory _atmRepository;
        private readonly ILogger<AtmController> _logger;

        public AtmController(IInventory atmRepository, ILogger<AtmController> logger)
        {
            _atmRepository = atmRepository;
            _logger = logger;
        }

        [HttpGet]
        [Route("CurrentBalance")]
        public IActionResult CurrentBalance()
        {
            try
            {
                return Ok(_atmRepository.Balance.ToList());
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return BadRequest(new Error { ErrMessage = ex.Message });
            }
        }

        [HttpGet]
        [Route("DenominationBalance")]
        public IActionResult DenominationBalance([FromQuery] string denoms = null)
        {
            try
            {
                var list = new List<Inventory>();
                int[] denominations = denoms.Split(',').Select(n => Convert.ToInt32(n)).ToArray();
                foreach (var d in denominations)
                {
                    list.Add(_atmRepository.DenominationBalance(d));
                }
                return Ok(list);
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return BadRequest(new Error { ErrMessage = ex.Message });
            }
        }

        [HttpPost]
        [Route("Withdraw")]
        public IActionResult Withdraw([FromQuery] string withdrawalAmount)
        {
            try
            {
                _atmRepository.Withdraw(Convert.ToInt32(withdrawalAmount));
                return Ok(_atmRepository.Balance.ToList());
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return BadRequest(new Error { ErrMessage = ex.Message });
            }
        }

        [HttpPost]
        [Route("Restock")]
        public IActionResult Restock()
        {
            try
            {
                _atmRepository.Restock();
                return Ok(_atmRepository.Balance.ToList());
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return BadRequest(new Error { ErrMessage = ex.Message });
            }
        }
    }
}
