document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject Style Deck for Design
    const style = document.createElement('style');
    style.textContent = `
        .ai-chat-btn { position: fixed; bottom: 30px; right: 30px; background: #d1ff27; color: #000; border: none; width: 60px; height: 60px; border-radius: 50%; cursor: pointer; font-size: 1.5rem; z-index: 9999; box-shadow: 0 0 20px rgba(209, 255, 39, 0.4); display: flex; align-items: center; justify-content: center; }
        .ai-terminal { display: none; position: fixed; bottom: 105px; right: 30px; width: 360px; height: 500px; background: #0a0a0a; border: 1px solid #222; border-radius: 24px; z-index: 9999; flex-direction: column; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.7); font-family: sans-serif; }
        .ai-header { background: #111; padding: 20px; border-bottom: 1px solid #222; font-weight: 900; font-size: 0.9rem; display: flex; justify-content: space-between; align-items: center; color: #fff; }
        .ai-stream { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; font-size: 0.85rem; color: #e4e4e7; }
        .ai-input-deck { padding: 20px; border-top: 1px solid #222; background: #060606; display: flex; gap: 10px; }
        .ai-input { flex: 1; background: #000; border: 1px solid #222; padding: 12px 16px; color: #fff; border-radius: 12px; font-size: 0.85rem; outline: none; }
        .ai-send-btn { background: #d1ff27; color: #000; border: none; width: 42px; height: 42px; border-radius: 12px; cursor: pointer; font-weight: bold; }
        .msg-user { background: #d1ff27; color: #000; padding: 12px 16px; border-radius: 14px; align-self: flex-end; max-width: 85%; font-weight: 700; }
        .msg-system { background: rgba(255,255,255,0.05); color: #fff; padding: 12px 16px; border-radius: 14px; align-self: flex-start; max-width: 85%; border: 1px solid #222; }
    `;
    document.head.appendChild(style);

    // 2. Inject HTML Matrix Layout
    const chatContainer = document.createElement('div');
    chatContainer.innerHTML = `
        <button class="ai-chat-btn" id="ai-btn">🤖</button>
        <div class="ai-terminal" id="ai-box">
            <div class="ai-header">
                <span><span style="color: #d1ff27;">●</span> AITRACE COGNITIVE ENGINE</span>
                <span id="ai-close" style="cursor: pointer; opacity: 0.5;">✕</span>
            </div>
            <div class="ai-stream" id="ai-stream">
                <div class="msg-system">Core online. Ask me anything about AITrace Security or our apparel drops.</div>
            </div>
            <div class="ai-input-deck">
                <input type="text" class="ai-input" id="ai-input" placeholder="Ask about drops, security, details...">
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

    // 3. The Smart Logic connecting to the free AI Network
    async function processResponse() {
        const text = input.value.trim();
        if (!text) return;

        appendBubble(text, "msg-user");
        input.value = "";

        const placeholderId = "loading-" + Date.now();
        appendBubble("Analyzing query syntax...", "msg-system", placeholderId);

        // This is the prompt that hardwires your brand's identity directly into the AI's memory
        const brandPrompt = `You are the ultimate official AI assistant for the premium streetwear brand "AITrace Security". 
        Your personality is hyper-modern, confident, elite, and rooted deeply in street culture. Keep responses sharp and short.
        Here are the official facts you must use to guide the user:
        - We create elite, heavyweight oversized street apparel.
        - Our designs fuse security concepts and digital aesthetics with raw street fashion.
        - T-shirts cost 600 EGP. Hoodies are premium, thick, and cost between 900 and 950 EGP.
        - If someone asks how to buy or order, guide them to use our layout grid or reach out to our team.
        Answer the following question perfectly based on this identity: "${text}"`;

        try {
            // Reaching out to a completely free, open-access public AI processing endpoint
            const res = await fetch("https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    inputs: brandPrompt,
                    parameters: { max_new_tokens: 150, return_full_text: false, temperature: 0.7 }
                })
            });

            const data = await res.json();
            const bubblePlaceholder = document.getElementById(placeholderId);
            
            if (bubblePlaceholder) {
                let cleanReply = data[0]?.generated_text || data.generated_text || "System loop complete.";
                // Trim trailing prompt residue if the engine adds it
                bubblePlaceholder.textContent = cleanReply.trim();
            }
        } catch (err) {
            const bubblePlaceholder = document.getElementById(placeholderId);
            if (bubblePlaceholder) {
                bubblePlaceholder.textContent = "Error: Terminal connection dropped.";
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
