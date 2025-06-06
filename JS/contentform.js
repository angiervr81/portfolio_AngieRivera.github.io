// JavaScript code to handle the flight cost calculation
        function calculateFlightCost() {
            var passengers = document.getElementById('passengers').value;
            var ticketClass = document.getElementById('ticketClass').value;
            var carryOn = document.getElementById('carryOn').checked;
            var checkedBag = document.getElementById('checkedBag').checked;
            var discountCode = document.getElementById('discountCode').value.trim();
            // Validate input
            if (!passengers || passengers <= 0) {
                alert('Please enter a valid number of passengers');
                return;
            }

            // Base prices per class
            var basePrices = {
                'economy': 200,
                'business': 500,
                'first': 1000
            };

            // Additional baggage fees
            var baggageFees = {
                'carryOn': 25,
                'checkedBag': 50
            };

            // Calculate total ticket price based on the class
            var totalTicketCost = basePrices[ticketClass] * passengers;

            // Calculate baggage fees
            var totalBaggageCost = 0;
            if (carryOn) {
                totalBaggageCost += baggageFees['carryOn'] * passengers;  // One carry-on per passenger
            }
            if (checkedBag) {
                totalBaggageCost += baggageFees['checkedBag'] * passengers;  // One checked bag per passenger
            }

            //Discount
            var discount = 0;
            if (discountCode === 'SAVE10') {
                discount = 0.10 * (totalTicketCost + totalBaggageCost); // 10% discount
            } else if (discountCode === 'SAVE20') {
                discount = 0.20 * (totalTicketCost + totalBaggageCost); // 20% discount
            }
             
            // Total cost calculation
            var totalCost = totalTicketCost + totalBaggageCost - discount;

            // Display result
            document.getElementById('result').innerHTML = `
                <strong>Total Cost: $${totalCost.toFixed(2)}</strong><br>
                (Ticket Cost: $${totalTicketCost.toFixed(2)}, Baggage Cost: $${totalBaggageCost.toFixed(2)}, Discount: $${discount.toFixed(2)})
    `       ;
        }