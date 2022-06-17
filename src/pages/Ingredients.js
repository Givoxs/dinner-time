import React, {useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

function Ingredients() {
    const [recipes, setRecipes] = useState(null);
    const [show, setShow] = useState(false);
    const [noResults, setNoResults] = useState(null);
    const [ingredientDotCheck, toggleIngredientDotCheck] = useState("");
    const [offset, setOffset] = useState(0);
    const apiKey = "6b56f72d5d774a46a125d409be241027";

    const {
        register,
        handleSubmit
    } = useForm();

    async function fetchData(data) {
        try {
            const result = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${data.ingredientname}&number=9&offset=${offset}&apiKey=${apiKey}`);
            setRecipes(result.data);
            setNoResults(result.data.length);
            toggleIngredientDotCheck(data.ingredientname);

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

                <div className="user-fill-ingredients">
                    <form onSubmit={handleSubmit(fetchData)}>
                        <div className="search-ingredients">
                            <label htmlFor="search-ingredients">
                                <h2>Write down below what you have available at home.
                                    Make sure to separate each ingredient with a ","</h2>
                                <input
                                    type="text"
                                    placeholder="write ingredients.."
                                    {...register("ingredientname")}
                                />
                            </label>
                        </div>

                        <div className="search-button-ingredients-box">

                            {show && noResults !== 0 &&
                            <button className="search-button-ingredients" type="submit" disabled={offset === -1}
                                    onClick={() => setOffset(offset - 1)}>
                                ⬅️
                            </button>}
                            {offset === -1 && setOffset(0)}

                            <button className="search-button-ingredients" type="submit"
                                    onClick={() => setShow(true)}>
                                Show Results
                            </button>

                            {show && noResults !== 0 &&
                            <button className="search-button-ingredients" type="submit"
                                    onClick={() => setOffset(offset + 1)}>
                                ➡️
                            </button>}

                        </div>
                    </form>
                </div>

                {show && noResults === 0 &&
                <p className="error-message">One or more ingredients are not recognized. Please make changes to your
                    quiry</p>}
                {show && ingredientDotCheck.includes(".") &&
                <p className="error-message">You accidentally used a ".". Replace it with a ",".</p>}

                <div className="show-results-box">
                    <section className="show-results">

                        {recipes && recipes.map((recipe) => {
                            return (
                                <div className="one-result" key={recipe.id}>
                                    <Link to={`/results/${recipe.id}`}><h1
                                        className="ingredient-result">{recipe.title}</h1>
                                        <img className="image-result" src={recipe.image} alt={recipe.name}/>
                                    </Link>
                                </div>
                            );
                        })
                        }
                    </section>
                </div>
            </div>
        </>);
}

export default Ingredients;