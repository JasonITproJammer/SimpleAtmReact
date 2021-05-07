﻿using System.Linq;
using SimpleAtmReact.Domain;

namespace SimpleAtmReact.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AtmContext context)
        {
            context.Database.EnsureCreated();

            // Look for any records
            if (context.Inventories.Any())
            {
                return;   // DB has been seeded
            }

            var inventories = new Inventory[]
            {
                new Inventory{Denomination=100,BillQuantity=10},
                new Inventory{Denomination=50,BillQuantity=10},
                new Inventory{Denomination=20,BillQuantity=10},
                new Inventory{Denomination=10,BillQuantity=10},
                new Inventory{Denomination=5,BillQuantity=10},
                new Inventory{Denomination=1,BillQuantity=10}
            };
            foreach (Inventory i in inventories)
            {
                context.Inventories.Add(i);
            }
            context.SaveChanges();

        }
    }
}
