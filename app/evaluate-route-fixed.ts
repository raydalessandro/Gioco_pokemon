import { NextRequest, NextResponse } from "next/server";
import { BATTLE_RULES } from "@/lib/rules";
import { EVALUATE_PROMPT } from "@/lib/prompts";

export async function POST(req: NextRequest) {
  let battleState;
  
  try {
    const body = await req.json();
    battleState = body.battleState;
    const command = body.command;

    const prompt = EVALUATE_PROMPT.replace("{RULES}", BATTLE_RULES)
      .replace("{COMMAND}", JSON.stringify(command, null, 2))
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
              "Sei un simulatore di battaglia Pokémon. Restituisci SOLO JSON valido con i risultati della battaglia.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse the JSON response
    const result = JSON.parse(content);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error evaluating battle:", error);
    return NextResponse.json(
      {
        damage: 10,
        effectiveness: 1,
        critical: false,
        message: "Un attacco base colpisce l'avversario!",
        newState: battleState,
      },
      { status: 500 }
    );
  }
}
