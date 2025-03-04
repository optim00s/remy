import styles from "./page.module.scss";
import { ChefHat, CookingPot } from "lucide-react";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.page__title}>
        <div className={styles.logo}>
          <ChefHat />
          <div>Remy</div>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.form_section}>
          <div className={styles.title}>
            Generate a Recipe 
            <br />
            <span>
              For make excellent culinary examples
            </span>
          </div>
          <div className={styles.option_section}>
            <div className={styles.ingredient_choose}>
              <div>
                Choose Ingredients
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Enter Ingredients"
                  className={styles.ingredient_input}
                />
              </div>
            </div>
            <div className={styles.dietary_prefrence}>
              <div>
                Dietary Preference
              </div>
              <div>
                <select name="" id="" className={styles.dietary_select}>
                  <option value="none">None</option>
                  <option value="vegan">Vegan</option>
                  <option value="vegatarian">Vegetarian</option>
                  <option value="gluten-free">Gluten-Free</option>
                  <option value="dietary-free">Dietary-Free</option>
                </select>
              </div>
            </div>
          </div>
          <button className={styles.gen_button}>
            Generate Recipe
          </button>
        </div>
        
        <div className={styles.recipe_section}>
          <div className={styles.placeholder}>
            <CookingPot/>
            <div>AI-generated recipe will appear here</div>
          </div> 
        </div>
      </main>
    </div>
  );
}
