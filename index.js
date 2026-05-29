const express = require("express");

const app = express();
app.use(express.json());

// Tu API KEY segura desde Render
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/chat", async (req, res) => {
    const message = req.body.message;

    try {
        const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-4.1-mini",
                    messages: [
                        {
                            role: "system",
                            content: "Eres un robot NPC amigable dentro de Roblox."
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        res.json({
            reply: data.choices?.[0]?.message?.content || "No pude responder."
        });

    } catch (error) {
        res.json({
            reply: "Error con la IA."
        });
    }
});

app.get("/", (req, res) => {
    res.send("Robot IA funcionando 🤖");
});

app.listen(3000, () => {
    console.log("Servidor iniciado");
});
