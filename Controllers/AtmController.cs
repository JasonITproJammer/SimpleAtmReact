using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimpleAtmReact.Models;
using SimpleAtmReact.Domain;

namespace SimpleAtmReact.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AtmController : ControllerBase
    {
        private readonly IInventory _atmRepository;

        public AtmController(IInventory atmRepository)
        {
            _atmRepository = atmRepository;
        }

        [HttpGet]
        [Route("CurrentBalance")]
        public IEnumerable<Inventory> CurrentBalance()
        {
            return _atmRepository.Balance;
        }

        [HttpGet]
        [Route("DenominationBalance/{denominations?}")]
        public IEnumerable<Inventory> DenominationBalance(int[] denominations)
        {
            List<Inventory> list = new List<Inventory>();
            foreach (var d in denominations)
            {
                list.Add(_atmRepository.DenominationBalance(d));
            }
            return list;

        }

        [HttpPut]
        [Route("Withdraw/{withdrawalAmount?}")]
        public IEnumerable<Inventory> Withdraw(int withdrawalAmount)
        {
            _atmRepository.Withdraw(withdrawalAmount);
            return _atmRepository.Balance;
        }

        [HttpPut]
        [Route("Restock")]
        public IEnumerable<Inventory> Restock()
        {
            _atmRepository.Restock();
            return _atmRepository.Balance;
        }
    }
}
