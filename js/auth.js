// Simple auth functions without Firebase
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function login(email, password) {
    // Simple validation
    if (email && password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        // Check for return URL
        const returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
            localStorage.removeItem('returnUrl');
            window.location.href = returnUrl;
        } else {
            window.location.href = 'index.html';
        }
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = 'index.html';
}

function checkLoginAndBook(packageType = '') {
    if (isLoggedIn()) {
        // User is logged in, redirect to booking page
        if (packageType) {
            window.location.href = `step1_package.html?package=${packageType}`;
        } else {
            window.location.href = 'step1_package.html';
        }
    } else {
        // Save the return URL with package type if specified
        const returnUrl = packageType ? 
            `step1_package.html?package=${packageType}` : 
            'step1_package.html';
        localStorage.setItem('returnUrl', returnUrl);
        // Redirect to login
        window.location.href = 'login.html';
    }
}

// Show message function
function showMessage(type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `fixed top-4 right-4 p-4 rounded-lg ${
        type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    }`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            login(email, password);
        });
    }

    // Handle chatbot access
    const chatbot = document.querySelector('.chatbot');
    const chatbotInput = document.querySelector('.chatbot-input');
    if (chatbot && chatbotInput) {
        if (!isLoggedIn()) {
            chatbotInput.innerHTML = `
                <div class="text-center p-4">
                    <p class="text-gray-600 mb-2">Please login to use the chatbot</p>
                    <button onclick="window.location.href='login.html?return=' + encodeURIComponent(window.location.href)" 
                            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                        Login to Chat
                    </button>
                </div>
            `;
        }
    }
});

