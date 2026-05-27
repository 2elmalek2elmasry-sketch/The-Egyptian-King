document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject Custom Aesthetic Theme Layout Styling
    const style = document.createElement('style');
    style.textContent = `
        .ai-chat-btn { position: fixed; bottom: 30px; right: 30px; background: #d1ff27; color: #000; border: none; width: 60px; height: 60px; border-radius: 50%; cursor: pointer; font-size: 1.5rem; z-index: 9999; box-shadow: 0 0 20px rgba(209, 255, 39, 0.4); display: flex; align-items: center; justify-content: center; transition: transform 0.2s ease; }
        .ai-chat-btn:hover { transform: scale(1.05); }
        .ai-terminal { display: none; position: fixed; bottom: 105px; right: 30px; width: 360px; height: 500px; background: #0a0a0a; border: 1px solid #222; border-radius: 24px; z-index: 9999; flex-direction: column; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.7); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .ai-header { background: #111; padding: 20px; border-bottom: 1px solid #222; font-weight: 900; font-size: 0.85rem; letter-spacing: 1px; display: flex; justify-content: space-between; align-items: center; color: #fff; }
        .ai-stream { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; font-size: 0.85rem; line-height: 1.5; color: #e4e4e7; }
        .ai-input-deck { padding: 20px; border-top: 1px solid #222; background: #060606; display: flex; gap: 10px; align-items: center; }
        .ai-input { flex: 1; background: #000; border: 1px solid #222; padding: 12px 16px; color: #fff; border-radius: 12px; font-size: 0.85rem; outline: none; }
        .ai-input:focus { border-color: #d1ff27; }
        .ai-send-btn { background: #d1ff27; color: #000; border: none; width: 42px; height: 42px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        .msg-user { background: #d1ff27; color: #000; padding: 12px 16px; border-radius: 14px; align-self: flex-end; max-width: 85%; font-weight: 600; }
        .msg-system { background: rgba(255,255,255,0.05); color: #fff; padding: 12px 16px; border-radius: 14px; align-self: flex-start; max-width: 85%; border: 1px solid #222; }
    `;
    document.head.appendChild(style);

    // 2. Inject HTML Layout Elements
    const chatContainer = document.createElement('div');
    chatContainer.innerHTML = `
        <button class="ai-chat-btn" id="ai-btn">💬</button>
        <div class="ai-terminal" id="ai-box">
            <div class="ai-header">
                <span><span style="color: #d1ff27;">●</span> SYSTEM CORE INTERFACE</span>
                <span id="ai-close" style="cursor: pointer; opacity: 0.5;">✕</span>
            </div>
            <div class="ai-stream" id="ai-stream">
                <div class="msg-system">Uplink secure. Welcome to THE EGYPTIAN KING database portal. Ask me anything about our apparel drops or your order parameters.</div>
            </div>
            <div class="ai-input-deck">
                <input type="text" class="ai-input" id="ai-input" placeholder="Ask about sizing, drops...">
                <button class="ai-send-btn" id="ai-send">➔</button>
            </div>
        </div>
    `;
    document.body.appendChild(chatContainer);

    const btn = document.getElementById("ai-btn");
    const box = document.getElementById("ai-box");
    const close = document.getElementById("ai-close");
    const input = document.getElementById("ai-input");
    const send = document.getElementById("ai-send");
    const stream = document.getElementById("ai-stream");

    btn.addEventListener("click", () => box.style.display = (box.style.display === "flex") ? "none" : "flex");
    close.addEventListener("click", () => box.style.display = "none");

    // 3. Request logic communicating directly with your Cloudflare Worker URL
    async function processResponse() {
        const userQuery = input.value.trim();
        if (!userQuery) return;

        appendBubble(userQuery, "msg-user");
        input.value = "";

        const placeholderId = "loading-" + Date.now();
        appendBubble("Typing...", "msg-system", placeholderId);

        try {
            // Pointing directly to your clean live Cloudflare backend proxy
            const cloudflareProxyEndpoint = "https://the-egyptian-king-ai.2el-malek-2el-masry.workers.dev"; 

            const response = await fetch(cloudflareProxyEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userQuery })
            });

            const data = await response.json();
            const bubblePlaceholder = document.getElementById(placeholderId);
            
            if (bubblePlaceholder) {
                bubblePlaceholder.textContent = data.reply || "Connection anomaly detected.";
            }
        } catch (err) {
            const bubblePlaceholder = document.getElementById(placeholderId);
            if (bubblePlaceholder) {
                bubblePlaceholder.textContent = "Error: System core connection offline.";
                bubblePlaceholder.style.color = "#ff4444";
            }
        }
    }

    function appendBubble(msg, className, uniqueId = null) {
        const div = document.createElement("div");
        div.className = className;
        if(uniqueId) div.id = uniqueId;
        div.textContent = msg;
        stream.appendChild(div);
        stream.scrollTop = stream.scrollHeight;
    }

    send.addEventListener("click", processResponse);
    input.addEventListener("keypress", (e) => { if (e.key === "Enter") processResponse(); });
});
