using System.Collections.Generic;
using SimpleAtmReact.Domain;

namespace SimpleAtmReact.Models
{
    public interface IInventory
    {
        IEnumerable<Inventory> Balance { get; }
        Inventory DenominationBalance(int denom);
        void Restock();
        void Withdraw(int amount);
    }
}
