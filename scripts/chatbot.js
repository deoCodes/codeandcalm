const chatlog = document.getElementById("chatlog");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

document.addEventListener("DOMContentLoaded", () => {
  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("You", message, "user");
  userInput.value = "";
  appendMessage("Puff", "<em>typing...</em>", "bot");

  try {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBSU0snafJ1jLngAxw4XanBKsWL2JOrmzw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a kind, supportive AI pseudo-therapist named "Puff". Speak with empathy, encourage self-reflection, and give gentle advice for managing stress, anxiety, or life struggles. Avoid giving medical advice or diagnosing anything. and stick to one sentence replies to not confuse ur patient. and try and remember the flow of the conversation as best as u can.`
              },
              {
                text: message  // <- this is the user's actual message
              }
            ]
          }
        ]
      })
    });

    const data = await res.json();
    console.log(data);
    
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Hmm... I don’t have a reply right now.";

    const botMsgs = document.querySelectorAll(".bot");
    botMsgs[botMsgs.length - 1].innerHTML = `<strong>Puff:</strong> ${reply}`;
    chatlog.scrollTop = chatlog.scrollHeight;

  } catch (err) {
    console.error("Error talking to Gemini:", err);
    const botMsgs = document.querySelectorAll(".bot");
    botMsgs[botMsgs.length - 1].innerHTML = `<strong>Puff:</strong> Oops! Something went wrong. 😞`;
  }
}

function smoothScrollToBottom(el, duration = 300) {
  const start = el.scrollTop;
  const end = el.scrollHeight - el.clientHeight;
  const distance = end - start;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const percent = Math.min(progress / duration, 1);
    el.scrollTop = start + distance * percent;

    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}


function isUserAtBottom(el) {
  return el.scrollHeight - el.scrollTop <= el.clientHeight + 50;
}

function appendMessage(name, text, className) {
  const isAtBottom = isUserAtBottom(chatlog);

  const msg = document.createElement("p");
  msg.className = className;
  msg.innerHTML = `<strong>${name}:</strong> ${text}`;
  chatlog.appendChild(msg);

  // Only scroll if user is already near the bottom
  if (isAtBottom) {
    smoothScrollToBottom(chatlog);
  }
}




