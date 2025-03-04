import { NextResponse } from "next/server";

export async function POST(request: Request) {

  const { ingredients, dietaryPreference } = await request.json();

  const dietPart = dietaryPreference !== "none" ? ` and suitable for a ${dietaryPreference} diet` : "";
  const prompt = `Generate a recipe using the following ingredients: ${ingredients}${dietPart}.`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-pro-exp-02-05:free",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
            ],
          },
        ],
      }),
    }
  );
  const data = await response.json();
  const recipe = data.choices[0].message.content; 
  return NextResponse.json(recipe);
}