// AITrace Security - Native AI Core Engine
document.addEventListener("DOMContentLoaded", () => {
    // 1. Build and Inject CSS Styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .ai-chat-btn { position: fixed; bottom: 30px; right: 30px; background: #d1ff27; color: #000; border: none; width: 60px; height: 60px; border-radius: 50%; cursor: pointer; font-size: 1.5rem; z-index: 9999; box-shadow: 0 0 20px rgba(209, 255, 39, 0.4); display: flex; align-items: center; justify-content: center; font-weight: bold; }
        .ai-terminal { display: none; position: fixed; bottom: 105px; right: 30px; width: 360px; height: 500px; background: #0a0a0a; border: 1px solid #222; border-radius: 24px; z-index: 9999; flex-direction: column; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.7); font-family: sans-serif; }
        .ai-header { background: #111; padding: 20px; border-bottom: 1px solid #222; font-weight: 900; font-size: 0.9rem; letter-spacing: 1px; display: flex; justify-content: space-between; align-items: center; color: #fff; }
        .ai-stream { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; font-size: 0.85rem; line-height: 1.5; color: #e4e4e7; }
        .ai-input-deck { padding: 20px; border-top: 1px solid #222; background: #060606; display: flex; gap: 10px; align-items: center; }
        .ai-input { flex: 1; background: #000; border: 1px solid #222; padding: 12px 16px; color: #fff; border-radius: 12px; font-size: 0.85rem; outline: none; }
        .ai-send-btn { background: #d1ff27; color: #000; border: none; width: 42px; height: 42px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        .msg-user { background: #d1ff27; color: #000; padding: 12px 16px; border-radius: 14px; align-self: flex-end; max-width: 85%; font-weight: 700; }
        .msg-system { background: rgba(255,255,255,0.05); color: #fff; padding: 12px 16px; border-radius: 14px; align-self: flex-start; max-width: 85%; border: 1px solid #222; }
    `;
    document.head.appendChild(style);

    // 2. Inject HTML UI Interface Matrix
    const chatContainer = document.createElement('div');
    chatContainer.innerHTML = `
        <button class="ai-chat-btn" id="ai-btn">🤖</button>
        <div class="ai-terminal" id="ai-box">
            <div class="ai-header">
                <span><span style="color: #d1ff27;">●</span> AITRACE SYSTEM CORE</span>
                <span id="ai-close" style="cursor: pointer; opacity: 0.5;">✕</span>
            </div>
            <div class="ai-stream" id="ai-stream">
                <div class="msg-system">Terminal connection secure. AITrace Core online. Input query parameter...</div>
            </div>
            <div class="ai-input-deck">
                <input type="text" class="ai-input" id="ai-input" placeholder="Ask about services, security, or drops...">
                <button class="ai-send-btn" id="ai-send">➔</button>
            </div>
        </div>
    `;
    document.body.appendChild(chatContainer);

    // 3. UI Interaction Logic
    const btn = document.getElementById("ai-btn");
    const box = document.getElementById("ai-box");
    const close = document.getElementById("ai-close");
    const input = document.getElementById("ai-input");
    const send = document.getElementById("ai-send");
    const stream = document.getElementById("ai-stream");

    btn.addEventListener("click", () => box.style.display = (box.style.display === "flex") ? "none" : "flex");
    close.addEventListener("click", () => box.style.display = "none");

    // 4. Core Knowledge Brain (Edit answers directly here!)
    const knowledgeBase = {
        "hello": "System core activated. Greetings user. What parameters are we analyzing today?",
        "hi": "System core activated. Greetings user. What parameters are we analyzing today?",
        "yo": "Yo. AITrace system active. What do you need?",
        "help": "Available directory modules: 'services', 'price', 'security', 'contact'. Type any keyword to query database.",
        "services": "AITrace core specializations: Custom brand architecture, secure layout optimization, and system interface logic.",
        "security": "Our grid layouts and mainframe parameters are fully locked down against external script breaks.",
        "price": "Standard drops and system integrations vary by design specifications. Contact terminal operators for custom quotes.",
        "hoodie": "Heavyweight premium cotton blend frameworks. Structural density optimized for maximum comfort.",
        "contact": "Secure line open via standard developer logs. Signal status: Active."
    };

    function processResponse() {
        const text = input.value.trim().toLowerCase();
        if (!text) return;

        // Print user message
        appendBubble(input.value, "msg-user");
        input.value = "";

        // Core processing phase
        setTimeout(() => {
            let reply = "Query syntax unrecognized. Type 'help' to view available system directories.";
            
            // Scan text for keywords matched in our knowledge base
            for (let keyword in knowledgeBase) {
                if (text.includes(keyword)) {
                    reply = knowledgeBase[keyword];
                    break;
                }
            }
            appendBubble(reply, "msg-system");
        }, 400);
    }

    function appendBubble(msg, className) {
        const div = document.createElement("div");
        div.className = className;
        div.textContent = msg;
        stream.appendChild(div);
        stream.scrollTop = stream.scrollHeight;
    }

    send.addEventListener("click", processResponse);
    input.addEventListener("keypress", (e) => { if (e.key === "Enter") processResponse(); });
});
