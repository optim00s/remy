"use client";
import styles from "./page.module.scss";
import { ChefHat, CookingPot } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [ingredients, setIngredients] = useState<string>("");
  const [dietaryPreference, setDietaryPreference] = useState<string>("none");
  const [recipe, setRecipe] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] =  useState<string | null>(null);

  const handleGenerateRecipe = async (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const response = await fetch("/api/generate-recipe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients,
          dietaryPreference
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate recipe");
      }

      setRecipe(data);
      // Reset form values after successful recipe generation
      setIngredients("");
      setDietaryPreference("none");
    } catch (err: unknown) {
      const errorMessage = 
        err instanceof Error ? err.message : "An error occurred while fetching the recipe";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.nav__left_section}>
            <ChefHat className={styles.icon} />
            <div className={styles.text}>Remy</div>
          </div>
          <div className={styles.nav__right_section}>
            made by <a href="https://github.com/optim00s" target="_blank" rel="noopener noreferrer">optim00s</a>
          </div>
        </nav>
      </header>
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.form_section}>
            <div className={styles.title}>
              Generate a Recipe 
              <br />
              <span>
                Transform your ingredients into delicious meals
              </span>
            </div>
            <form onSubmit={handleGenerateRecipe}>
              <div className={styles.option_section}>
                <div className={styles.ingredient_choose}>
                  <div>
                    Choose Ingredients
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="eg., tomato, chicken breast, egg, garlic"
                      className={styles.ingredient_input}
                      value={ingredients}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIngredients(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className={styles.dietary_preference}>
                  <div>
                    Dietary Preference
                  </div>
                  <div>
                    <select 
                      name="dietaryPreference" 
                      id="dietaryPreference" 
                      className={styles.dietary_select}
                      value={dietaryPreference}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDietaryPreference(e.target.value)}
                    >
                      <option value="none">None</option>
                      <option value="vegan">Vegan</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="gluten-free">Gluten-Free</option>
                      <option value="dairy-free">Dairy-Free</option>
                    </select>
                  </div>
                </div>
              </div>
              <button type="submit" className={styles.gen_button} disabled={loading}>
                {loading ? "Generating..." : "Generate Recipe"}
              </button>
            </form>
          </div>

          <div className={styles.recipe_section}>
            {loading ? (
              <div>Cooking...</div>
            ) : error ? (
              <div className={styles.error}>{error}</div>
            ) : recipe ? (
              <div className={styles.recipe}>
                <h3>Your Recipe</h3>
                <p>{recipe}</p>
              </div>
            ) : (
              <div className={styles.placeholder}>
                <CookingPot className={styles.placeholder__icon}/>
                <div>AI-generated recipe will appear here</div>
              </div> 
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
