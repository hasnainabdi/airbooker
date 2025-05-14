# AirBooker Airlines Website

A modern, responsive airline booking website built with HTML, CSS (Tailwind CSS), and JavaScript. The website offers a complete flight booking experience with user authentication, chatbot support, and various travel packages.

## 🌟 Features

### 1. User Authentication
- User signup with email verification
- Login system with session management
- Forgot password functionality
- Protected routes requiring authentication
- Social login options (Google & Facebook)

### 2. Flight Booking
- Step-by-step booking process
- Package selection (Family, Business, Student)
- Special offers and discounts
- Secure payment integration
- Booking confirmation

### 3. Special Features
- Interactive Chatbot for customer support
- Real-time flight status
- Web check-in functionality
- Manage booking options
- Flight schedule viewer

### 4. Travel Packages
- **Family Package**
  - 20% off for 4+ travelers
  - Free meals for kids
  - Priority boarding

- **Business Class**
  - 30% off on long haul
  - Lounge access
  - Extra baggage allowance

- **Student Discount**
  - 15% off with ID
  - Flexible booking
  - Extra baggage

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/hasnainabdi/airbooker.git
cd airbooker
```

2. Open `index.html` in your browser to view the website.

## 📁 Project Structure

```
airline/
├── index.html              # Home page with SEO meta tags
├── login.html             # Login page
├── signup.html           # Signup page
├── forgot-password.html  # Password recovery
├── step1_package.html   # Booking step 1
├── css/
│   ├── style.css        # Main styles
│   └── chatbot.css      # Chatbot styles
├── js/
│   ├── auth.js          # Authentication logic
│   └── chatbot.js       # Chatbot functionality
├── img/                 # Image assets
├── sitemap.xml          # XML sitemap for search engines
├── robots.txt           # Search engine crawling rules
├── .gitignore           # Git ignore rules
├── LICENSE              # MIT License file
└── README.md           # Project documentation
```

## 🔒 Security Features

1. **Protected Routes**
   - All booking-related pages require authentication
   - Automatic redirect to login page
   - Return URL preservation

2. **User Authentication**
   - Secure password handling
   - Session management
   - Protected API endpoints

## 💻 Technical Stack

### Languages & Technologies Used

```
HTML       ███████████████████░░░░░   80%
CSS        ██████████████████████░░   90%
JavaScript ████████████░░░░░░░░░░░░   50%
Tailwind   ███████████████████████░   95%
```

- **Frontend Framework:** Tailwind CSS
- **Icons:** Font Awesome
- **JavaScript:** Vanilla JS
- **Authentication:** Custom auth system
- **UI Components:** Custom-built responsive components

### Language Distribution

- **HTML (80%)**: Structure and content
  - Semantic markup
  - Accessibility features
  - SEO optimized

- **CSS/Tailwind (90%)**: Styling and design
  - Responsive design
  - Custom animations
  - UI components

- **JavaScript (50%)**: Functionality
  - User authentication
  - Form handling
  - Chatbot integration
  - Dynamic content

## 🔍 SEO Optimization

### Meta Tags
- Comprehensive meta descriptions
- Targeted keywords for flight booking
- Open Graph tags for social media
- Twitter Card integration
- Canonical URLs

### Search Engine Optimization
- XML Sitemap with priority levels
- Robots.txt with crawler rules
- Semantic HTML structure
- Mobile-friendly design
- Performance optimized

### Keywords Coverage
```
flight booking, airline tickets, cheap flights, air travel,
international flights, domestic flights, business class,
family packages, student discounts, flight deals,
online booking, travel packages, air tickets, AirBooker,
airline reservations, flight status, web check-in,
manage booking, flight schedule
```

## 🔧 Configuration

1. **Authentication Setup**
   - Open `js/auth.js`
   - Configure authentication settings:
   ```javascript
   // Example configuration
   const authConfig = {
     apiUrl: 'your-api-url',
     redirectUrl: 'your-redirect-url'
   };
   ```

2. **Chatbot Setup**
   - Open `js/chatbot.js`
   - Configure chatbot settings as needed

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 UI Features

1. **Modern Design**
   - Clean and intuitive interface
   - Smooth animations
   - Consistent color scheme

2. **Interactive Elements**
   - Hover effects
   - Loading animations
   - Form validation feedback

3. **User Experience**
   - Progress indicators
   - Success/error messages
   - Tooltips and hints

## 🛠️ Development

### Prerequisites
- Basic understanding of HTML, CSS, and JavaScript
- Web browser
- Text editor (VS Code recommended)

### Making Changes
1. Modify HTML files for structure changes
2. Use Tailwind classes for styling
3. Update JavaScript files for functionality
4. Test thoroughly before deployment

## 👨‍💻 Author

**Muhammad Hasnain**
- Portfolio: [https://hasnainabdi.github.io/portfolio/](https://hasnainabdi.github.io/portfolio/)
- LinkedIn: [https://www.linkedin.com/in/m-hasnain-abdi/](https://www.linkedin.com/in/m-hasnain-abdi/)
- GitHub: [https://github.com/hasnainabdi](https://github.com/hasnainabdi)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Muhammad Hasnain. All rights reserved.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## 📞 Support

For support, email m.hasnainreactions@gmail.com or use the in-app chatbot.

## 🔄 Updates

The website is regularly updated with:
- New features
- Security patches
- Performance improvements
- Bug fixes

## ✨ Future Enhancements

- [ ] Multi-language support
- [ ] Dark mode
- [ ] PWA support
- [ ] Offline functionality
- [ ] Advanced booking analytics
