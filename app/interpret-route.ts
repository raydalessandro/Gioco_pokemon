import { NextRequest, NextResponse } from "next/server";
import { BATTLE_RULES } from "@/lib/rules";
import { INTERPRET_PROMPT } from "@/lib/prompts";

export async function POST(req: NextRequest) {
  try {
    const { userInput, battleState } = await req.json();

    const prompt = INTERPRET_PROMPT.replace("{RULES}", BATTLE_RULES)
      .replace("{INPUT}", userInput)
      .replace("{STATE}", JSON.stringify(battleState, null, 2));

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "Sei un interprete di comandi per un gioco Pokémon. Restituisci SOLO JSON valido.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse the JSON response
    const parsedCommand = JSON.parse(content);

    return NextResponse.json(parsedCommand);
  } catch (error) {
    console.error("Error interpreting command:", error);
    return NextResponse.json(
      {
        action: "attack",
        target: "opponent",
        move: "tackle",
        reasoning: "Fallback to basic attack due to error",
      },
      { status: 500 }
    );
  }
}
