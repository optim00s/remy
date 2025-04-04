import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { ingredients, dietaryPreference } = await request.json();

    const dietPart = dietaryPreference !== "none" ? ` and suitable for a ${dietaryPreference} diet` : "";
    const prompt = `Create a recipe using these ingredients: ${ingredients}${dietPart}. 
    DO NOT HALLUCINATION ON RECIPE 
    Format the response in this structure:
    
    Recipe Name:
    [A creative name for the recipe]

    Ingredients:
    - [List each ingredient with quantity]

    Instructions:
    1. [Step-by-step instructions]
    2. [Each step should be clear and concise]
    
    Cooking Time:
    [Preparation and cooking time]

    Difficulty Level:
    [Easy/Medium/Hard]

    Tips:
    [Optional cooking tips or variations]`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "${process.env.SITE_URL}",
          "X-Title": "Remy Recipe Generator"
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro-exp-03-25:free",
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

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return NextResponse.json(
        { error: "Failed to generate recipe from API" },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Check if the response has the expected structure
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Unexpected API response structure:", data);
      return NextResponse.json(
        { error: "Unexpected response format from API" },
        { status: 500 }
      );
    }
    
    // Extract the recipe content
    const recipe = data.choices[0].message.content;
    
    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error generating recipe:", error);
    return NextResponse.json(
      { error: "An error occurred while generating the recipe" },
      { status: 500 }
    );
  }
}