using System;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using SimpleAtmReact.Models;
using SimpleAtmReact.Domain;

namespace SimpleAtmReact.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly IInventory _atmRepository;

        public HomeController(IInventory atmRepository)
        {
            _atmRepository = atmRepository;
        }

        [HttpGet]
        public IEnumerable<Inventory> CurrentBalance()
        {
            return GetCurrentBalance();
        }

        [HttpGet]
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
        public IEnumerable<Inventory> Withdraw(int withdrawalAmount)
        {
            _atmRepository.Withdraw(withdrawalAmount);
            return GetCurrentBalance();
        }

        [HttpPut]
        public IEnumerable<Inventory> Restock()
        {
            _atmRepository.Restock();
            return GetCurrentBalance();
        }

        private IEnumerable<Inventory> GetCurrentBalance()
        {
            _ = new List<Inventory>();
            IEnumerable<Inventory> list = _atmRepository.Balance;
            return list;
        }
    }
}
