using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SimpleAtmReact.Models;
using SimpleAtmReact.Domain;
using Microsoft.Extensions.Logging;

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
        public IEnumerable<Inventory> CurrentBalance()
        {
            var list = new List<Inventory>();
            try
            {
                list = _atmRepository.Balance.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
            }
            return list;
        }

        [HttpGet]
        [Route("DenominationBalance")]
        public IEnumerable<Inventory> DenominationBalance([FromQuery] string denoms = null)
        {
            var list = new List<Inventory>();
            try
            {
                int[] denominations = denoms.Split(',').Select(n => Convert.ToInt32(n)).ToArray();
                foreach (var d in denominations)
                {
                    list.Add(_atmRepository.DenominationBalance(d));
                }
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
            }
            return list;
        }

        [HttpPost]
        [Route("Withdraw")]
        public IEnumerable<Inventory> Withdraw([FromQuery] string withdrawalAmount)
        {
            var list = new List<Inventory>();
            try
            {
                _atmRepository.Withdraw(Convert.ToInt32(withdrawalAmount));
                list = _atmRepository.Balance.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
            }
            return list;
        }

        [HttpPost]
        [Route("Restock")]
        public IEnumerable<Inventory> Restock()
        {
            var list = new List<Inventory>();
            try
            {
                _atmRepository.Restock();
                list = _atmRepository.Balance.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
            }
            return list;
        }
    }
}
