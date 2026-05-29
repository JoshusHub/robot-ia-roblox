const express = require("express");

const app = express();
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/chat", async (req, res) => {
    try {
        const message = req.body.message;

        console.log("Mensaje recibido:", message);
        console.log("API KEY EXISTE:", !!OPENAI_API_KEY);

        const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: "Eres un robot NPC amigable de Roblox."
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

        console.log("RESPUESTA OPENAI:", JSON.stringify(data, null, 2));

        if (data.error) {
            return res.json({
                reply: "ERROR: " + data.error.message
            });
        }

        res.json({
            reply: data.choices[0].message.content
        });

    } catch (err) {
        console.error("ERROR SERVER:", err);

        res.json({
            reply: "ERROR SERVER"
        });
    }
});

app.get("/", (req, res) => {
    res.send("Robot IA funcionando 🤖");
});

app.listen(3000, () => {
    console.log("Servidor iniciado");
});
