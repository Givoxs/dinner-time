import React, {useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";


function Ingredients(){
    const apiKey = "01b598e057b844afb0dcfe60776b9e98";
    const [ingredientName, setIngredientName] = useState("");
    const [recipes, setRecipes] = useState(null);
    // const [searchedIngredients, setSearchedIngredients] = useState("");
    // const [recipeID, setRecipeID] = useState(0)
    const{
        register,
            handleSubmit
    } = useForm();
    //gebruik geen useEffect omdat react hook form er pas een request wordt gedaan bij verzenden en niet bij typen van elke letter
        async function fetchData(data) {
            try {
                const result = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${data.ingredientname}&number=9&apiKey=${apiKey}`);
                setRecipes(result.data);
                console.log(result.data);

            } catch (e) {
                console.log(e);
            }
        }
    return (
        <>
            <div className="ingredient-background">
                <section className="ingredient-explanation">
                    <h2>Here you can tell Cookme what ingredients you have available. </h2>
                    <p>Cookme will then tell you what recipes you can make with them. Try it!</p>
                </section>

                <section className="user-fill-ingredients">
                    <h2>Write down below what you have</h2>
                    <h3>After each ingredient type ",+" to make sure each ingredient is searched</h3>
                    <form onSubmit={handleSubmit(fetchData)}>
                        <label htmlFor="search-ingredients">
                            <input
                                type="text"
                                placeholder="write ingredients.."
                                // name="ingredient-name"
                                id="search"
                                {...register("ingredientname")}
                                value={ingredientName}
                                onChange={(e) => setIngredientName(e.target.value)}
                            />
                        </label>
                        <button type="submit">test</button>

                    </form>
                </section>
                <div><section>
                    <div className="send-button-ingredients-box">
                        <button className="send-button-ingredients" type="button"
                                onClick={() => setIngredientName(ingredientName)}>Show results
                        </button>
                    </div>


                    {recipes && recipes.map((recipe) => {
                        return (

                               <Link to={`/results/${recipe.id}`} key={recipe.id}><h1 className="test">{recipe.title}</h1>
                                    <img src={recipe.image} alt={recipe.name}/>
                        </Link>


                        )})
                    }
                </section>
                </div>
            </div>

        </>)}


    export default Ingredients;