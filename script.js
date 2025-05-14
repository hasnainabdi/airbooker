// Initialize all interactive elements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCouponCopy();
    initializeFlightUpdates();
    initializeCurrencyConverter();
    initializeFAQToggles();
    initializeSearchForm();
    initializeSpecialOffers();
    initializeDestinationCards();
});

// Coupon code copy functionality
function initializeCouponCopy() {
    document.querySelectorAll('.copy-code').forEach(button => {
        button.addEventListener('click', function() {
            const code = this.getAttribute('data-code');
            navigator.clipboard.writeText(code)
                .then(() => {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check mr-2"></i> Copied!';
                    this.classList.add('bg-green-500');
                    this.classList.remove('bg-blue-500', 'hover:bg-blue-600');
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.classList.remove('bg-green-500');
                        this.classList.add('bg-blue-500', 'hover:bg-blue-600');
                    }, 2000);
                })
                .catch(() => {
                    alert('Failed to copy code. Please try again.');
                });
        });
    });
}

// Live flight updates configuration
const flightConfig = {
    statuses: ['On Time', 'Delayed', 'Boarding', 'Departed', 'Arrived'],
    destinations: ['London', 'Dubai', 'New York', 'Tokyo', 'Paris', 'Singapore', 'Istanbul', 'Sydney', 'Toronto'],
    airlines: ['Emirates', 'Qatar Airways', 'Turkish Airlines', 'Etihad Airways'],
    statusStyles: {
        'On Time': { bg: 'bg-green-100', text: 'text-green-800', icon: 'fas fa-check-circle' },
        'Delayed': { bg: 'bg-red-100', text: 'text-red-800', icon: 'fas fa-exclamation-circle' },
        'Boarding': { bg: 'bg-blue-100', text: 'text-blue-800', icon: 'fas fa-walking' },
        'Departed': { bg: 'bg-purple-100', text: 'text-purple-800', icon: 'fas fa-plane-departure' },
        'Arrived': { bg: 'bg-teal-100', text: 'text-teal-800', icon: 'fas fa-plane-arrival' }
    }
};

function initializeFlightUpdates() {
    const internationalFlights = [
        { flight: 'PK-203', from: 'Karachi', to: 'Tehran', time: '10:30', status: 'On Time' },
        { flight: 'PK-721', from: 'Islamabad', to: 'Mashhad', time: '12:45', status: 'Delayed' },
        { flight: 'PK-419', from: 'Lahore', to: 'Najaf', time: '14:15', status: 'Boarding' },
        { flight: 'PK-853', from: 'Karachi', to: 'Baghdad', time: '16:00', status: 'On Time' },
        { flight: 'PK-301', from: 'Islamabad', to: 'Moscow', time: '18:30', status: 'Scheduled' },
        { flight: 'PK-502', from: 'Lahore', to: 'Damascus', time: '20:15', status: 'On Time' },
        { flight: 'PK-607', from: 'Karachi', to: 'Dhaka', time: '22:00', status: 'Delayed' },
        { flight: 'PK-801', from: 'Islamabad', to: 'Medina', time: '23:45', status: 'On Time' },
        { flight: 'PK-905', from: 'Lahore', to: 'Berlin', time: '01:30', status: 'Scheduled' },
        { flight: 'PK-123', from: 'Karachi', to: 'Frankfurt', time: '03:15', status: 'On Time' },
        { flight: 'PK-456', from: 'Islamabad', to: 'Mecca', time: '05:00', status: 'Boarding' },
        { flight: 'PK-789', from: 'Lahore', to: 'Munich', time: '06:45', status: 'Scheduled' }
    ];

    const localFlights = [
        { flight: 'PK-101', from: 'Karachi', to: 'Islamabad', time: '09:00', status: 'On Time' },
        { flight: 'PK-102', from: 'Islamabad', to: 'Quetta', time: '10:30', status: 'Delayed' },
        { flight: 'PK-103', from: 'Lahore', to: 'Karachi', time: '11:45', status: 'Boarding' },
        { flight: 'PK-104', from: 'Quetta', to: 'Lahore', time: '13:15', status: 'On Time' },
        { flight: 'PK-105', from: 'Karachi', to: 'Sukkur', time: '14:30', status: 'Scheduled' },
        { flight: 'PK-106', from: 'Islamabad', to: 'Baltistan', time: '15:45', status: 'On Time' },
        { flight: 'PK-107', from: 'Lahore', to: 'Parachinar', time: '17:00', status: 'Delayed' },
        { flight: 'PK-108', from: 'Peshawar', to: 'Karachi', time: '18:15', status: 'On Time' }
    ];

    function updateFlightTable(flights, tableId) {
        const tableBody = document.getElementById(tableId);
        if (!tableBody) return;

        // Sort flights by status priority
        flights.sort((a, b) => getStatusPriority(a.status) - getStatusPriority(b.status));

        // Fade out effect
        tableBody.style.opacity = '0';
        
        setTimeout(() => {
            tableBody.innerHTML = '';
            flights.forEach(flight => {
                const row = document.createElement('tr');
                row.className = 'hover:bg-gray-50 transition-all duration-300';
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <i class="fas fa-plane ${flight.status === 'Delayed' ? 'text-red-500' : 'text-blue-500'} mr-2"></i>
                            ${flight.flight}
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">${flight.from}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${flight.to}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(flight.status)}">
                            ${flight.status}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">${flight.time}</td>
                `;
                tableBody.appendChild(row);
            });

            // Fade in effect
            setTimeout(() => {
                tableBody.style.opacity = '1';
            }, 50);
        }, 200);
    }

    function getStatusStyle(status) {
        switch (status) {
            case 'Delayed': return 'bg-red-100 text-red-800';
            case 'Boarding': return 'bg-green-100 text-green-800';
            case 'On Time': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    function getStatusPriority(status) {
        const priorities = {
            'Boarding': 1,
            'On Time': 2,
            'Scheduled': 3,
            'Delayed': 4
        };
        return priorities[status] || 5;
    }

    // Initialize tables
    updateFlightTable(internationalFlights, 'international-flights-body');
    updateFlightTable(localFlights, 'local-flights-body');

    // Tab switching functionality
    const tabs = document.querySelectorAll('.flight-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            
            // Update active tab
            tabs.forEach(t => {
                if (t === tab) {
                    t.classList.add('bg-blue-600', 'text-white');
                    t.classList.remove('bg-gray-200', 'text-gray-700');
                } else {
                    t.classList.remove('bg-blue-600', 'text-white');
                    t.classList.add('bg-gray-200', 'text-gray-700');
                }
            });

            // Show/hide tables
            document.getElementById('international-flights').classList.toggle('hidden', category !== 'international');
            document.getElementById('local-flights').classList.toggle('hidden', category !== 'local');
        });
    });

    setInterval(() => {
        updateFlightTable(internationalFlights, 'international-flights-body');
        updateFlightTable(localFlights, 'local-flights-body');
    }, 15000);
}

function generateFlightData() {
    const airline = flightConfig.airlines[Math.floor(Math.random() * flightConfig.airlines.length)];
    const number = `${airline.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 1000 + 100)}`;
    const destination = flightConfig.destinations[Math.floor(Math.random() * flightConfig.destinations.length)];
    const hour = Math.floor(Math.random() * 23);
    const minute = Math.floor(Math.random() * 60);
    const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    const status = flightConfig.statuses[Math.floor(Math.random() * flightConfig.statuses.length)];
    const gate = `G${Math.floor(Math.random() * 20 + 1)}`;

    return { airline, number, destination, time, status, gate };
}

function getStatusPriority(status) {
    const priorities = {
        'Boarding': 1,
        'On Time': 2,
        'Delayed': 3,
        'Departed': 4,
        'Arrived': 5
    };
    return priorities[status] || 99;
}

// Currency converter functionality
function initializeCurrencyConverter() {
    const currencyRates = {
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
        PKR: 280.5,
        AED: 3.67,
        SAR: 3.75,
        CAD: 1.35,
        AUD: 1.52
    };

    const converter = document.getElementById('currency-converter');
    if (!converter) return;

    converter.addEventListener('input', function(e) {
        if (e.target.matches('input[type="number"]') || e.target.matches('select')) {
            updateConversion();
        }
    });

    function updateConversion() {
        const amount = parseFloat(document.getElementById('currency-amount').value) || 0;
        const fromCurrency = document.getElementById('currency-from').value;
        const toCurrency = document.getElementById('currency-to').value;

        const result = (amount / currencyRates[fromCurrency]) * currencyRates[toCurrency];
        
        const resultElement = document.getElementById('conversion-result');
        resultElement.innerHTML = `
            <div class="text-2xl font-bold text-blue-600">
                ${result.toFixed(2)} ${toCurrency}
            </div>
            <div class="text-sm text-gray-500">
                1 ${fromCurrency} = ${(currencyRates[toCurrency] / currencyRates[fromCurrency]).toFixed(4)} ${toCurrency}
            </div>
        `;

        // Animate the result
        resultElement.classList.add('scale-110');
        setTimeout(() => resultElement.classList.remove('scale-110'), 200);
    }
}

function convertCurrency(amount, from, to) {
    const fromRate = currencyRates[from];
    const toRate = currencyRates[to];
    return (amount / fromRate * toRate).toFixed(2);
}

// FAQ Toggle functionality
function initializeFAQToggles() {
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            const content = item.querySelector('p');
            const chevron = item.querySelector('.fa-chevron-down');

            // Close other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    const otherContent = otherItem.querySelector('p');
                    const otherChevron = otherItem.querySelector('.fa-chevron-down');
                    otherContent.classList.add('hidden');
                    if (otherChevron) {
                        otherChevron.style.transform = 'rotate(0deg)';
                    }
                }
            });

            // Toggle current item
            content.classList.toggle('hidden');
            if (chevron) {
                chevron.style.transform = content.classList.contains('hidden') 
                    ? 'rotate(0deg)' 
                    : 'rotate(180deg)';
                chevron.style.transition = 'transform 0.3s ease';
            }

            // Add hover effect
            item.classList.toggle('shadow-xl');
        });
    });
}

// Flight Search Form functionality
function initializeSearchForm() {
    const searchForm = document.getElementById('flight-search-form');
    if (!searchForm) return;

    const popularDestinations = {
        'Dubai': { image: 'dubai.jpg', price: '75,000' },
        'London': { image: 'london.jpg', price: '150,000' },
        'New York': { image: 'newyork.jpg', price: '180,000' },
        'Tokyo': { image: 'tokyo.jpg', price: '160,000' },
        'Paris': { image: 'paris.jpg', price: '140,000' },
        'Istanbul': { image: 'istanbul.jpg', price: '90,000' }
    };

    // Populate destination dropdowns
    const fromCity = document.getElementById('from-city');
    const toCity = document.getElementById('to-city');

    if (fromCity && toCity) {
        Object.keys(popularDestinations).forEach(city => {
            fromCity.innerHTML += `<option value="${city}">${city}</option>`;
            toCity.innerHTML += `<option value="${city}">${city}</option>`;
        });
    }

    // Handle form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(searchForm);
        const searchDetails = {
            from: formData.get('from'),
            to: formData.get('to'),
            departDate: formData.get('depart-date'),
            returnDate: formData.get('return-date'),
            passengers: formData.get('passengers'),
            class: formData.get('class')
        };

        // Show loading state
        const submitButton = searchForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Searching...';
        submitButton.disabled = true;

        // Simulate search delay
        setTimeout(() => {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;

            // Redirect to booking page with search parameters
            const params = new URLSearchParams(searchDetails);
            window.location.href = `booking.html?${params.toString()}`;
        }, 1500);
    });

    // Update price preview on destination change
    toCity.addEventListener('change', function() {
        const destination = this.value;
        const pricePreview = document.getElementById('price-preview');
        if (pricePreview && popularDestinations[destination]) {
            pricePreview.innerHTML = `
                <div class="text-sm text-gray-600">Starting from</div>
                <div class="text-2xl font-bold text-blue-600">PKR ${popularDestinations[destination].price}</div>
            `;
            pricePreview.classList.remove('hidden');
        }
    });
}

// Live Chat Widget
document.querySelector('#live-chat button').addEventListener('click', () => {
    alert('Live chat support will be available soon!');
});

// Flight Status Check
const flightStatusForm = document.querySelector('form:has(input[placeholder="Flight Number"])');
const flightStatusResult = document.createElement('div');
flightStatusResult.className = 'mt-4 p-4 rounded hidden';
flightStatusForm.parentNode.appendChild(flightStatusResult);

flightStatusForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const flightNumber = e.target.querySelector('input').value;
    
    if (!flightNumber.match(/^[A-Z]{2}\d{3,4}$/)) {
        showFlightStatus('error', 'Invalid flight number format. Please use format: XX123 or XX1234');
        return;
    }
    
    // Simulate flight status check
    showFlightStatus('loading', 'Checking flight status...');
    
    setTimeout(() => {
        const mockFlightData = generateMockFlightStatus(flightNumber);
        showFlightStatus('success', '', mockFlightData);
    }, 1500);
});

function showFlightStatus(type, message, data = null) {
    flightStatusResult.classList.remove('hidden', 'bg-red-100', 'bg-blue-100', 'bg-green-100');
    
    switch(type) {
        case 'error':
            flightStatusResult.className = 'mt-4 p-4 rounded bg-red-100 text-red-700';
            flightStatusResult.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
            break;
        case 'loading':
            flightStatusResult.className = 'mt-4 p-4 rounded bg-blue-100 text-blue-700';
            flightStatusResult.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${message}`;
            break;
        case 'success':
            flightStatusResult.className = 'mt-4 p-4 rounded bg-green-100 text-gray-700';
            flightStatusResult.innerHTML = `
                <div class="flex items-center justify-between mb-2">
                    <span class="font-semibold">Flight ${data.flightNumber}</span>
                    <span class="${data.statusColor} px-2 py-1 rounded text-sm">${data.status}</span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <div class="font-semibold">From</div>
                        <div>${data.origin}</div>
                        <div>${data.departureTime}</div>
                    </div>
                    <div>
                        <div class="font-semibold">To</div>
                        <div>${data.destination}</div>
                        <div>${data.arrivalTime}</div>
                    </div>
                </div>
                ${data.remarks ? `<div class="mt-2 text-sm font-semibold">${data.remarks}</div>` : ''}
            `;
            break;
    }
}

function generateMockFlightStatus(flightNumber) {
    const cities = ['London', 'Dubai', 'New York', 'Tokyo', 'Paris', 'Singapore', 'Istanbul'];
    const statuses = [
        { text: 'On Time', color: 'bg-green-500 text-white' },
        { text: 'Delayed', color: 'bg-yellow-500 text-white' },
        { text: 'Boarding', color: 'bg-blue-500 text-white' },
        { text: 'Departed', color: 'bg-purple-500 text-white' },
        { text: 'Arrived', color: 'bg-gray-500 text-white' }
    ];
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const origin = cities[Math.floor(Math.random() * cities.length)];
    let destination;
    do {
        destination = cities[Math.floor(Math.random() * cities.length)];
    } while (destination === origin);
    
    const now = new Date();
    const departureTime = new Date(now.getTime() - Math.random() * 3600000);
    const arrivalTime = new Date(departureTime.getTime() + Math.random() * 7200000);
    
    let remarks = '';
    if (status.text === 'Delayed') {
        const delayMinutes = Math.floor(Math.random() * 120) + 30;
        remarks = `Flight delayed by ${delayMinutes} minutes`;
    }
    
    return {
        flightNumber,
        status: status.text,
        statusColor: status.color,
        origin,
        destination,
        departureTime: departureTime.toLocaleTimeString(),
        arrivalTime: arrivalTime.toLocaleTimeString(),
        remarks
    };
}

// Web Check-in
document.querySelector('form:has(input[placeholder="Booking Reference"])').addEventListener('submit', (e) => {
    e.preventDefault();
    const reference = e.target.querySelector('input').value;
    alert(`Initiating web check-in for booking ${reference}...\nThis feature will be connected to the check-in system soon.`);
});

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
    }
}
document.getElementById('menu-toggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Flight search and booking functionality
let selectedSeats = [];
let totalPassengers = 0;
let flightPrice = 299; // Base price

// Initialize booking form
function initializeBookingForm() {
    const form = document.getElementById('booking-form');
    const packageSelect = document.getElementById('package');
    const packageFeatures = document.getElementById('package-features');
    if (!form || !packageSelect || !packageFeatures) return;

    // Get package type from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const packageType = urlParams.get('package');

    // Set initial package selection if provided in URL
    if (packageType) {
        packageSelect.value = packageType;
        showPackageFeatures(packageType);
    }

    // Handle package selection change
    packageSelect.addEventListener('change', (e) => {
        const selectedPackage = e.target.value;
        showPackageFeatures(selectedPackage);
    });

    function showPackageFeatures(packageType) {
        // Hide all feature sections
        document.querySelectorAll('#family-features, #business-features, #student-features')
            .forEach(el => el.classList.add('hidden'));

        if (!packageType) {
            packageFeatures.classList.add('hidden');
            return;
        }

        // Show selected package features
        const featuresSection = document.getElementById(`${packageType}-features`);
        if (featuresSection) {
            packageFeatures.classList.remove('hidden');
            featuresSection.classList.remove('hidden');
        }

        // Update price calculation based on package discount
        updateTotalPrice();
    }

    function updateTotalPrice() {
        const basePrice = 299; // Base ticket price
        const selectedPackage = packageSelect.value;
        let discount = 0;

        // Apply package discounts
        switch (selectedPackage) {
            case 'family':
                discount = 20;
                break;
            case 'business':
                discount = 30;
                break;
            case 'student':
                discount = 15;
                break;
        }

        const finalPrice = basePrice * (1 - discount / 100);
        const priceElement = document.getElementById('total-price');
        if (priceElement) {
            priceElement.textContent = `$${finalPrice.toFixed(2)}`;
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedPackage = packageSelect.value;
        const message = selectedPackage ? 
            `Booking submitted successfully with ${selectedPackage} package!` :
            'Booking submitted successfully!';
        alert(message);
    });
}

// Flight search form handling
const searchForm = document.getElementById('flight-search-form');
const searchButton = document.getElementById('search-flight-btn');

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading animation
    const originalText = searchButton.innerText;
    searchButton.innerHTML = '<div class="loading mx-auto"></div>';
    searchButton.disabled = true;
    
    // Get form data
    const from = this.querySelector('input[placeholder="Departure City"]').value;
    const to = this.querySelector('input[placeholder="Arrival City"]').value;
    const departDate = this.querySelector('input[type="date"]:first-of-type').value;
    const adults = parseInt(this.querySelector('select:nth-of-type(1)').value);
    const children = parseInt(this.querySelector('select:nth-of-type(2)').value);
    const flightClass = this.querySelector('select:nth-of-type(3)').value;

    totalPassengers = adults + children;
    
    // Simulate search delay
    setTimeout(() => {
        searchButton.innerHTML = originalText;
        searchButton.disabled = false;
        showBookingModal({
            from,
            to,
            departDate,
            adults,
            children,
            flightClass
        });
    }, 1000);
});

// Booking Modal Functions
function showBookingModal(flightDetails) {
    const modal = document.getElementById('booking-modal');
    modal.classList.remove('hidden');

    // Update flight summary
    updateFlightSummary(flightDetails);

    // Generate passenger forms
    generatePassengerForms(flightDetails.adults, flightDetails.children);

    // Generate seat map
    generateSeatMap();

    // Update price summary
    updatePriceSummary();
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    modal.classList.add('hidden');
    selectedSeats = [];
}

function updateFlightSummary(details) {
    const summary = document.getElementById('flight-summary');
    summary.innerHTML = `
        <div class="flex justify-between items-center">
            <div>
                <div class="text-lg font-bold">${details.from} → ${details.to}</div>
                <div class="text-gray-600">${formatDate(details.departDate)} | ${details.flightClass}</div>
            </div>
            <div class="text-right">
                <div class="text-sm text-gray-600">Passengers</div>
                <div>${details.adults} Adult${details.adults > 1 ? 's' : ''}
                    ${details.children ? ` + ${details.children} Child${details.children > 1 ? 'ren' : ''}` : ''}</div>
            </div>
        </div>
    `;
}

function generatePassengerForms(adults, children) {
    const container = document.getElementById('passengers-container');
    let html = '';

    // Adult passengers
    for (let i = 0; i < adults; i++) {
        html += `
            <div class="border rounded p-4">
                <h4 class="font-semibold mb-4">Adult Passenger ${i + 1}</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-gray-700 mb-2">First Name</label>
                        <input type="text" required class="w-full p-2 border rounded">
                    </div>
                    <div>
                        <label class="block text-gray-700 mb-2">Last Name</label>
                        <input type="text" required class="w-full p-2 border rounded">
                    </div>
                    <div>
                        <label class="block text-gray-700 mb-2">Date of Birth</label>
                        <input type="date" required class="w-full p-2 border rounded">
                    </div>
                </div>
            </div>
        `;
    }

    // Child passengers
    for (let i = 0; i < children; i++) {
        html += `
            <div class="border rounded p-4">
                <h4 class="font-semibold mb-4">Child Passenger ${i + 1}</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-gray-700 mb-2">First Name</label>
                        <input type="text" required class="w-full p-2 border rounded">
                    </div>
                    <div>
                        <label class="block text-gray-700 mb-2">Last Name</label>
                        <input type="text" required class="w-full p-2 border rounded">
                    </div>
                    <div>
                        <label class="block text-gray-700 mb-2">Date of Birth</label>
                        <input type="date" required class="w-full p-2 border rounded">
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function generateSeatMap() {
    const seatMap = document.getElementById('seat-map');
    const rows = 10;
    const seatsPerRow = 6;
    let html = '';

    for (let row = 1; row <= rows; row++) {
        for (let seat = 0; seat < seatsPerRow; seat++) {
            const seatNumber = `${row}${String.fromCharCode(65 + seat)}`;
            const isOccupied = Math.random() < 0.3; // 30% chance seat is occupied
            const isSelected = selectedSeats.includes(seatNumber);
            
            html += `
                <button type="button" 
                    class="p-2 text-center rounded ${isOccupied ? 'bg-gray-400 cursor-not-allowed' : 
                                                    isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}"
                    ${isOccupied ? 'disabled' : ''}
                    onclick="toggleSeat('${seatNumber}')"
                    data-seat="${seatNumber}">
                    ${seatNumber}
                </button>
            `;
        }
    }

    seatMap.innerHTML = html;
}

function toggleSeat(seatNumber) {
    const index = selectedSeats.indexOf(seatNumber);
    if (index === -1 && selectedSeats.length < totalPassengers) {
        selectedSeats.push(seatNumber);
    } else if (index !== -1) {
        selectedSeats.splice(index, 1);
    }
    generateSeatMap();
    updatePriceSummary();
}

function updatePriceSummary() {
    const summary = document.getElementById('price-summary');
    const total = document.getElementById('total-price');
    const basePrice = flightPrice * totalPassengers;
    const seatPrice = selectedSeats.length * 10; // $10 per seat
    
    summary.innerHTML = `
        <div class="flex justify-between">
            <span>Base Fare (${totalPassengers} passengers)</span>
            <span>$${basePrice}</span>
        </div>
        <div class="flex justify-between">
            <span>Seat Selection (${selectedSeats.length} seats)</span>
            <span>$${seatPrice}</span>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
            <span>Taxes & Fees</span>
            <span>$${Math.round(basePrice * 0.1)}</span>
        </div>
    `;

    const totalAmount = basePrice + seatPrice + Math.round(basePrice * 0.1);
    total.textContent = `$${totalAmount}`;
}

function formatDate(dateStr) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
}

// Handle detailed booking form submission
document.getElementById('detailed-booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (selectedSeats.length < totalPassengers) {
        alert('Please select seats for all passengers');
        return;
    }
    alert('Processing payment... This feature will be connected to a payment gateway.');
});

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            document.getElementById('mobile-menu').classList.add('hidden');
        }
    });
});

// Add animation class to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.bg-white');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('animate-fade-in');
        }
    });
};

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Show button after scrolling 300px
        backToTopButton.classList.remove('opacity-0', 'translate-y-10');
        backToTopButton.classList.add('opacity-100', 'translate-y-0');
    } else {
        backToTopButton.classList.remove('opacity-100', 'translate-y-0');
        backToTopButton.classList.add('opacity-0', 'translate-y-10');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initial check for scroll position
if (window.scrollY > 300) {
    backToTopButton.classList.remove('opacity-0', 'translate-y-10');
    backToTopButton.classList.add('opacity-100', 'translate-y-0');
}

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Initial check on page load
