class Chatbot {
    constructor() {
        // Initialize DOM elements
        this.container = document.querySelector('.chatbot-container');
        this.messages = document.querySelector('.chatbot-messages');
        this.input = document.querySelector('.chatbot-input input');
        this.sendButton = document.querySelector('.chatbot-input button');
        this.minimizeButton = document.querySelector('#minimize-chat');
        this.closeButton = document.querySelector('#close-chat');
        this.openChatButton = document.querySelector('#open-chat');
        
        // Initialize state
        this.isMinimized = false;
        this.isOpen = false;

        // Setup event listeners
        this.setupEventListeners();

        // Initialize context
        this.context = {
            lastQuery: null,
            destination: null,
            bookingStage: null,
            preferredClass: null
        };
        
        this.destinations = {
            'Karachi': { duration: '2.5 hours', timezone: 'GMT+5', visa: 'No visa required for Pakistani citizens' },
            'Dubai': { duration: '3 hours', timezone: 'GMT+4', visa: 'Visa on arrival available' },
            'Jeddah': { duration: '4.5 hours', timezone: 'GMT+3', visa: 'Valid visa required' },
            'Istanbul': { duration: '6 hours', timezone: 'GMT+3', visa: 'e-Visa required' },
            'London': { duration: '9 hours', timezone: 'GMT+0', visa: 'UK visa required' },
            'Toronto': { duration: '15 hours', timezone: 'GMT-5', visa: 'Canadian visa required' },
            'Kuala Lumpur': { duration: '7 hours', timezone: 'GMT+8', visa: 'Visa on arrival available' },
            'Beijing': { duration: '8 hours', timezone: 'GMT+8', visa: 'Chinese visa required' }
        };

        this.faqs = {
            'booking': {
                keywords: ['book', 'reserve', 'booking', 'reservation', 'purchase', 'buy ticket', 'get ticket'],
                response: "<div class='steps'>Here's how to book a flight:<ul><li>Visit our booking page: <a href='booking.html'>Book Now</a></li><li>Use our flight search: <a href='search.html'>Search Flights</a></li><li>Choose your preferred flight</li><li>Enter passenger details</li><li>Make secure payment</li></ul>Would you like me to help you start the booking process?</div>"
            },
            'flight_status': {
                keywords: ['status', 'track', 'flight number', 'delay', 'on time', 'arrival', 'departure'],
                response: "<div class='steps'>To check flight status, you can:<ul><li>Use our <a href='flight-status.html'>Flight Status</a> tool</li><li>Enter your flight number (e.g., AB123)</li><li>Track on our <a href='mobile.html'>Mobile App</a></li></ul>Would you like to check a specific flight?</div>"
            },
            'seats': {
                keywords: ['seat', 'seating', 'window', 'aisle', 'extra leg room', 'emergency exit'],
                response: "<div class='options'>Seat selection options:<ul><li>Standard seats (free)</li><li>Extra legroom (PKR 8,000)</li><li>Emergency exit (PKR 6,000)</li><li>Business class seats</li><li>First class suites</li></ul>Select your seat: <a href='seat-selection.html'>Seat Map</a> or <a href='manage-booking.html'>Manage Booking</a></div>"
            },
            'special_assistance': {
                keywords: ['wheelchair', 'assistance', 'special needs', 'disability', 'medical', 'oxygen'],
                response: 'We provide special assistance for:\n- Wheelchair services\n- Medical equipment\n- Oxygen support\n- Vision/hearing impaired\n- Elderly passengers\n\nPlease request assistance 48 hours before flight.'
            },
            'visa': {
                keywords: ['visa', 'passport', 'travel document', 'immigration'],
                response: 'Visa requirements vary by destination. We can check requirements for your destination.\n\nWould you like to check visa requirements for a specific country?'
            },
            'changes': {
                keywords: ['change flight', 'reschedule', 'modify booking', 'change date'],
                response: 'Flight change policies:\n- Changes allowed up to 24 hours before departure\n- Change fee varies by fare type\n- Fare difference may apply\n- Free changes for flexible tickets\n\nNeed to change your flight?'
            },
            'insurance': {
                keywords: ['insurance', 'travel protection', 'coverage'],
                response: 'Travel insurance options:\n- Trip cancellation coverage\n- Medical emergency coverage\n- Lost baggage protection\n- Flight delay compensation\n\nWould you like to add insurance to your booking?'
            },
            'pets': {
                keywords: ['pet', 'dog', 'cat', 'animal', 'travel with pet'],
                response: 'Pet travel guidelines:\n- Small pets (up to 8kg) in cabin\n- Larger pets in cargo hold\n- Health certificate required\n- Must be booked in advance\n\nNeed specific pet travel information?'
            },
            'groups': {
                keywords: ['group', 'group booking', 'multiple passengers', 'family booking'],
                response: 'Group booking benefits (10+ passengers):\n- Special group rates\n- Flexible payment options\n- Dedicated group coordinator\n- Free name changes\n\nInterested in group booking?'
            },
            'promotions': {
                keywords: ['promotion', 'offer', 'deal', 'discount', 'sale', 'special fare'],
                response: 'Current promotions:\n- Early bird discounts\n- Student fares\n- Senior citizen discounts\n- Weekend special fares\n- Seasonal promotions\n\nWould you like to see all current offers?'
            },
            'baggage': {
                keywords: ['baggage', 'luggage', 'bag', 'suitcase', 'weight', 'carry'],
                response: 'Baggage allowance:\n- Economy: 23kg checked + 7kg cabin\n- Business: 32kg checked + 10kg cabin\n- First: 40kg checked + 10kg cabin\n- Extra baggage available for purchase\n\nNeed specific baggage information?'
            },
            'check_in': {
                keywords: ['check in', 'checkin', 'check-in', 'boarding pass', 'counter'],
                response: "<div class='options'>Check-in options:<ul><li><a href='web-checkin.html'>Online Check-in</a>: 48h to 3h before flight</li><li><a href='mobile.html'>Mobile App</a> check-in</li><li>Airport counter: 3h to 1h before</li><li>Self-service kiosks at airport</li></ul>Would you like to check in now?</div>"
            },
            'payment': {
                keywords: ['pay', 'payment', 'card', 'credit', 'debit'],
                response: "<div class='options'>Payment options:<ul><li>Credit/Debit cards</li><li>Easypaisa</li><li>JazzCash</li><li>Bank transfer</li><li>Digital wallets</li><li><a href='installment.html'>Installment plans</a></li></ul>Make secure payment: <a href='payment.html'>Payment Portal</a>. Need help with payment?</div>"
            }
        }

        this.quickReplies = [
            'Book a flight',
            'Flight status',
            'Check-in options',
            'Seat selection',
            'Baggage info',
            'Special assistance',
            'Current promotions',
            'Payment methods'
        ];

        this.setupEventListeners();
        this.showWelcomeMessage();
    }

    setupEventListeners() {
        // Chat input handlers
        this.sendButton.addEventListener('click', () => this.handleSend());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSend();
        });

        // Chat window control handlers
        this.minimizeButton.addEventListener('click', () => this.toggleMinimize());
        this.closeButton.addEventListener('click', () => this.closeChat());
        this.openChatButton.addEventListener('click', () => this.openChat());
        
        document.querySelector('.chatbot-header').addEventListener('click', (e) => {
            if (!e.target.closest('button')) this.toggleMinimize();
        });
    }

    showWelcomeMessage() {
        this.addMessage('Welcome to AirBooker! How can I help you today?', 'bot');
        this.showQuickReplies();
    }

    handleSend() {
        const message = this.input.value.trim();
        if (message) {
            this.addMessage(message, 'user');
            this.showTypingIndicator();
            setTimeout(() => {
                this.hideTypingIndicator();
                this.respondTo(message);
            }, 1000);
            this.input.value = '';
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = text;
        this.messages.appendChild(messageDiv);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('typing-indicator');
        indicator.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        this.messages.appendChild(indicator);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = this.messages.querySelector('.typing-indicator');
        if (indicator) indicator.remove();
    }

    respondTo(message) {
        const lowerMessage = message.toLowerCase();
        this.context.lastQuery = lowerMessage;

        // Check for thanks/gratitude
        if (this.isThankYou(lowerMessage)) {
            this.addMessage('You\'re welcome! Is there anything else I can help you with?', 'bot');
            this.showQuickReplies();
            return;
        }

        // Check for greetings
        if (this.isGreeting(lowerMessage)) {
            const greeting = this.getTimeBasedGreeting();
            this.addMessage(`${greeting} How can I assist you with your travel plans today?`, 'bot');
            this.showQuickReplies();
            return;
        }

        // Check for timing queries
        if (this.isTimingQuery(lowerMessage)) {
            this.handleTimingQuery(lowerMessage);
            return;
        }

        // Check for destination queries
        if (this.isDestinationQuery(lowerMessage)) {
            this.handleDestinationQuery(lowerMessage);
            return;
        }

        // Check for flight status
        if (this.isFlightStatusQuery(lowerMessage)) {
            this.handleFlightStatusQuery(lowerMessage);
            return;
        }

        // Check for price queries
        if (this.isPriceQuery(lowerMessage)) {
            this.handlePriceQuery(lowerMessage);
            return;
        }

        // Check FAQs
        for (const [category, data] of Object.entries(this.faqs)) {
            if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
                this.addMessage(data.response, 'bot');
                if (this.context.destination && category === 'visa') {
                    const visaInfo = this.destinations[this.context.destination].visa;
                    this.addMessage(`For ${this.context.destination}: ${visaInfo}`, 'bot');
                }
                this.showQuickReplies();
                return;
            }
        }

        // Default response with smart suggestions
        this.handleDefaultResponse(lowerMessage);
    }

    isThankYou(message) {
        const thankWords = ['thank', 'thanks', 'appreciate', 'grateful', 'thx'];
        return thankWords.some(word => message.includes(word));
    }

    getTimeBasedGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning!';
        if (hour < 17) return 'Good afternoon!';
        return 'Good evening!';
    }

    isTimingQuery(message) {
        const timingWords = ['when', 'time', 'long', 'duration', 'hours', 'schedule'];
        return timingWords.some(word => message.includes(word));
    }

    handleTimingQuery(message) {
        if (this.context.destination) {
            const destInfo = this.destinations[this.context.destination];
            this.addMessage(`Flight information for ${this.context.destination}:\n- Flight duration: ${destInfo.duration}\n- Time zone: ${destInfo.timezone}\n- Check-in: Opens 48 hours before departure\n- Boarding: Starts 45 minutes before departure`, 'bot');
        } else if (message.includes('check-in')) {
            this.addMessage(this.faqs.check_in.response, 'bot');
        } else {
            this.addMessage('Flight durations vary by destination. Please specify where you\'d like to fly to, and I\'ll provide specific timing information.', 'bot');
        }
        this.showQuickReplies();
    }

    isPriceQuery(message) {
        const priceWords = ['price', 'cost', 'fare', 'how much', 'rate', 'pricing'];
        return priceWords.some(word => message.includes(word));
    }

    handlePriceQuery(message) {
        if (this.context.destination) {
            const prices = {
                'Karachi': { economy: 25000, business: 45000, firstClass: 75000 },
                'Dubai': { economy: 85000, business: 150000, firstClass: 250000 },
                'Jeddah': { economy: 120000, business: 220000, firstClass: 350000 },
                'Istanbul': { economy: 150000, business: 280000, firstClass: 450000 },
                'London': { economy: 250000, business: 450000, firstClass: 750000 },
                'Toronto': { economy: 300000, business: 550000, firstClass: 900000 },
                'Kuala Lumpur': { economy: 180000, business: 320000, firstClass: 520000 },
                'Beijing': { economy: 200000, business: 380000, firstClass: 600000 }
            };
            const destPrices = prices[this.context.destination];
            this.addMessage(`Fares to ${this.context.destination} start from:
- Economy: PKR ${destPrices.economy.toLocaleString()}
- Business: PKR ${destPrices.business.toLocaleString()}
- First Class: PKR ${destPrices.firstClass.toLocaleString()}

Prices may vary based on season and availability. Would you like to check specific dates?`, 'bot');
        } else {
            this.addMessage('<div class="destinations">Our popular destinations include:<ul><li>Domestic: <a href="destinations/karachi.html">Karachi</a></li><li>Middle East: <a href="destinations/dubai.html">Dubai</a>, <a href="destinations/jeddah.html">Jeddah</a></li><li>Europe: <a href="destinations/istanbul.html">Istanbul</a>, <a href="destinations/london.html">London</a></li><li>Americas: <a href="destinations/toronto.html">Toronto</a></li><li>Asia: <a href="destinations/kuala-lumpur.html">Kuala Lumpur</a>, <a href="destinations/beijing.html">Beijing</a></li></ul>Click on any destination to learn more or let me know your choice to check current fares.</div>', 'bot');
        }
        this.showQuickReplies();
    }

    isGreeting(message) {
        const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
        return greetings.some(greeting => message.includes(greeting));
    }

    isDestinationQuery(message) {
        return message.includes('flight to') || message.includes('travel to') || 
               message.includes('fly to') || message.includes('booking to');
    }

    handleDestinationQuery(message) {
        const destination = Object.keys(this.destinations).find(dest => 
            message.toLowerCase().includes(dest.toLowerCase())
        );

        if (destination) {
            this.context.destination = destination;
            const destInfo = this.destinations[destination];
            this.addMessage(
                `Great choice! Here's what you need to know about flying to ${destination}:\n` +
                `- Flight duration: ${destInfo.duration}\n` +
                `- Time zone: ${destInfo.timezone}\n` +
                `- Visa: ${destInfo.visa}\n\n` +
                `Would you like to:\n` +
                `1. Check available flights\n` +
                `2. See prices\n` +
                `3. Start booking`, 'bot'
            );
        } else {
            const destinations = Object.keys(this.destinations).join(', ');
            this.addMessage(
                `We fly to many exciting destinations including:\n${destinations}\n\n` +
                `Where would you like to go?`, 'bot'
            );
        }
        this.showQuickReplies();
    }

    isFlightStatusQuery(message) {
        return message.includes('status') || message.includes('track') || 
               message.includes('flight number') || message.includes('my flight');
    }

    handleFlightStatusQuery(message) {
        const flightNumber = message.match(/[A-Z]{2}\d{3,4}/i);
        if (flightNumber) {
            this.addMessage(`Let me check the status of flight ${flightNumber[0]}...`, 'bot');
            setTimeout(() => {
                this.addMessage('You can also check flight status anytime using our Flight Status tool above.', 'bot');
                this.showQuickReplies();
            }, 1000);
        } else {
            this.addMessage('Please provide your flight number (e.g., AB123) or use our Flight Status tool above.', 'bot');
            this.showQuickReplies();
        }
    }

    handleDefaultResponse(message) {
        const suggestions = this.getSuggestions(message);
        this.addMessage(`I'm not quite sure about that. Based on your question, you might be interested in:\n\n${suggestions.join('\n')}\n\nCan you please clarify what you're looking for?`, 'bot');
        this.showQuickReplies();
    }

    getSuggestions(message) {
        const suggestions = [];
        if (message.includes('price') || message.includes('cost')) {
            suggestions.push('- Checking flight prices and deals');
        }
        if (message.includes('time') || message.includes('schedule')) {
            suggestions.push('- Viewing flight schedules');
        }
        if (message.includes('bag') || message.includes('luggage')) {
            suggestions.push('- Baggage allowance information');
        }
        if (suggestions.length === 0) {
            suggestions.push('- Booking a flight');
            suggestions.push('- Checking flight status');
            suggestions.push('- Viewing our destinations');
        }
        return suggestions;
    }

    showQuickReplies() {
        const quickRepliesDiv = document.createElement('div');
        quickRepliesDiv.classList.add('quick-replies');
        
        this.quickReplies.forEach(reply => {
            const button = document.createElement('button');
            button.classList.add('quick-reply');
            button.textContent = reply;
            button.addEventListener('click', () => {
                this.input.value = reply;
                this.handleSend();
            });
            quickRepliesDiv.appendChild(button);
        });

        this.messages.appendChild(quickRepliesDiv);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        this.container.classList.toggle('minimized');
        this.minimizeButton.innerHTML = this.isMinimized ? 
            '<i class="fas fa-expand-alt"></i>' : 
            '<i class="fas fa-minus"></i>';
    }

    closeChat() {
        this.container.style.display = 'none';
        this.openChatButton.style.display = 'flex';
        this.isOpen = false;
    }

    openChat() {
        if (!isLoggedIn()) {
            window.location.href = 'login.html?return=' + encodeURIComponent(window.location.href);
            return;
        }
        this.container.style.display = 'flex';
        this.openChatButton.style.display = 'none';
        this.isOpen = true;
        if (!this.hasShownWelcome) {
            this.showWelcomeMessage();
            this.hasShownWelcome = true;
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const chatbot = new Chatbot();
    
    // Show open chat button if logged in
    const openChatButton = document.querySelector('#open-chat');
    if (isLoggedIn()) {
        openChatButton.style.display = 'flex';
    } else {
        openChatButton.style.display = 'none';
    }
});
