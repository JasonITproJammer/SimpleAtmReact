This is a simple cash machine (ATM) application use to demonstrate and explore new tech skills.

The cash machine is pre-stocked with the following denominations:
 • $100 - 10 Bills
 • $50 - 10 Bills
 • $20 - 10 Bills
 • $10 - 10 Bills
 • $5 - 10 Bills
 • $1 - 10 Bills

The application performs 4 basic functions: 
 • R - Restocks the cash machine to the original pre-stock levels defined above 
 • W - Withdraws that amount from the cash machine (e.g. "W $145") 
 • I - Displays the number of bills in that denomination present in the cash machine (e.g. I $20 $10 $1) 
 • B - Return the current number of each denomination

 The withdrawals from the cash machine will dispense cash in the most efficient manner possible, with the least amount of bills.
 After each action the balance of each denomination will be returned, with the exception of the denomination inquiry.

 Sample input/output.  Note that the ‘> ‘ are only in the sample to denote input and would not actually be a part of the problem as no additional prompts should be displayed.
> W $208
Success: Dispensed $208
Machine balance:
$100 - 8
$50 - 10
$20 – 10
$10 - 10
$5 - 9
$1 - 7

> W $9
Success: Dispensed $9
Machine balance:
$100 - 8
$50 - 10
$20 - 10
$10 - 10
$5 - 8
$1 - 3

> I $20 $1 $100
$20 - 10
$1 - 3
$100 – 8

> R
Machine balance:
$100 - 10
$50 - 10
$20 - 10
$10 - 10
$5 - 10
$1 - 10
