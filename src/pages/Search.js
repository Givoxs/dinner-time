import React, {useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

function Search() {

    const [generalRecipeInfo, setGeneralRecipeInfo] = useState(null);
    const [show, setShow] = useState(false);
    const [noResults, setNoResults] = useState(null);
    const [offset, setOffset] = useState(0);
    const apiKey = "6b56f72d5d774a46a125d409be241027";

    const {
        register,
        handleSubmit
    } = useForm();

    async function searchRecipes(data) {
        try {
            const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${data.search}&number=9&offset=${offset}&apiKey=${apiKey}`);
            setGeneralRecipeInfo(result.data);
            setNoResults(result.data.results.length);
            console.log(result);

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className="search-background">
                <div className="search-explanation-box">
                    <section className="search-explanation">
                        <h2>Below you can search for a recipe by entering the name of the desired dish</h2>
                    </section>
                </div>

                <div className="enter-search-box">
                    <form onSubmit={handleSubmit(searchRecipes)}>
                        <div className="search-recipe">
                            <label htmlFor="search">
                                <h3>Recipe name:</h3>
                                <input
                                    type="text"
                                    placeholder="write recipe name.."
                                    {...register("search")}
                                />
                            </label>
                        </div>
                        <div className="search-button-recipe-box">

                            {show && noResults !== 0 &&
                            <button className="search-button-recipe" type="submit" disabled={offset === -1}
                                    onClick={() => setOffset(offset - 1)}>
                                ⬅️
                            </button>}
                            {offset === -1 && setOffset(0)}

                            <button className="search-button-recipe" type="submit" onClick={() => setShow(true)}>
                                Show Results
                            </button>

                            {show && noResults !== 0 &&
                            <button className="search-button-recipe" type="submit"
                                    onClick={() => setOffset(offset + 1)}>
                                ➡️
                            </button>}
                        </div>
                    </form>
                </div>

                {show && noResults === 0 &&
                <p className="error-message">No recipes are found. Please make changes to your query</p>}

                <div className="show-results-box">
                    <section className="show-results">

                        {generalRecipeInfo && generalRecipeInfo.results.map((result) => {
                            return (
                                <div className="one-result" key={result.id}>
                                    <Link to={`/results/${result.id}`}><h1
                                        className="title-result">{result.title}</h1>
                                        <img className="image-result" src={result.image} alt={result.name}/>
                                    </Link>
                                </div>
                            );
                        })}
                    </section>
                </div>
            </div>
        </>
    );
}

export default Search;