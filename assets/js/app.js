const startScreen = document.getElementById("start-screen");
const chatContainer = document.getElementById("chat-container");
const chatbox = document.getElementById("chatbox");
const apiKey = "AIzaSyDFo3dRATEIkthHSvacGP7AjWbh2bLaSYU";

// if (startScreen && chatContainer) {
//     function startChat() {
//         startScreen.style.display = "none";
//         chatContainer.style.display = "block";
//     }
// }

async function sendMessage() {
    const input = document.getElementById("inputBox");
    const userText = input.value.trim();
    if (!userText) return;

    chatbox.innerHTML += `<div class="user"><b>You:</b> ${userText}</div>`;
    input.value = "";

    try {
        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ role: "user", parts: [{ text: userText }] }]
                })
            }
        );

        const data = await res.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "(no reply)";
        chatbox.innerHTML += `<div class="bot"><b>Bot:</b> ${reply}</div>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    } catch (err) {
        chatbox.innerHTML += `<div class="bot"><b>Bot:</b> (Error talking to Gemini 😢)</div>`;
        console.error(err);
    }
}
