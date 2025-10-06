document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginScreen = document.getElementById('loginScreen');
    const chatDashboard = document.getElementById('chatDashboard');
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const messagesContainer = document.getElementById('messagesContainer');
    const logoutBtn = document.getElementById('logoutBtn');
    const userNameSpan = document.getElementById('userName');

    // Mock credentials
    const validUsername = 'admin';
    const validPassword = 'password123';

    // Mock responses
    const botResponses = [
        "I'm just a demo chatbot!",
        "Thanks for your message!",
        "That's interesting, tell me more.",
        "I'm here to help with any questions.",
        "I'm a simple frontend demo without real AI.",
        "How can I assist you today?",
        "That's a good point!",
        "Let me know if you need anything else."
    ];

    // Handle login
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === validUsername && password === validPassword) {
            // Successful login
            userNameSpan.textContent = username;
            loginScreen.classList.add('hidden');
            chatDashboard.classList.remove('hidden');
            chatDashboard.classList.add('fade-in');
        } else {
            alert('Invalid username or password. Try admin/password123');
        }
    });

    // Handle sending messages
    function sendMessage() {
        const message = messageInput.value.trim();

        if (message) {
            // Add user message
            addMessage(message, 'user');
            messageInput.value = '';

            // Auto response after a short delay
            setTimeout(() => {
                const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                addMessage(randomResponse, 'bot');
            }, 800);
        }
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex items-start gap-2 fade-in ${sender === 'user' ? 'flex-row-reverse' : ''}`;

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.innerHTML = `
                    <div class="w-8 h-8 rounded-full ${sender === 'user' ? 'bg-indigo-600' : 'bg-indigo-100'} flex items-center justify-center flex-shrink-0">
                        <i class="${sender === 'user' ? 'fas fa-user text-white' : 'fas fa-robot text-indigo-600'}"></i>
                    </div>
                    <div class="${sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100'} px-4 py-2 rounded-lg max-w-xs">
                        <p>${text}</p>
                        <span class="text-xs ${sender === 'user' ? 'text-indigo-200' : 'text-gray-500'} block mt-1">${time}</span>
                    </div>
                `;

        messagesContainer.appendChild(messageDiv);

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);

    // Send message on Enter key (but allow Shift+Enter for new line)
    messageInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Handle logout
    logoutBtn.addEventListener('click', function () {
        chatDashboard.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        loginScreen.classList.add('fade-in');
        usernameInput.value = '';
        passwordInput.value = '';

        // Clear chat except the first welcome message
        const messages = messagesContainer.querySelectorAll('.flex.items-start.gap-2');
        for (let i = 1; i < messages.length; i++) {
            messages[i].remove();
        }
    });

    // Auto-resize textarea
    messageInput.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
});