import React, {useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import './../assets/banana-evil-smile.gif';

function Questions() {

    const [show, setShow] = useState(false);
    const [noResults, setNoResults] = useState(null);
    const [offset, setOffset] = useState(0);
    const [results, setResults] = useState(null);
    const apiKey = "6b56f72d5d774a46a125d409be241027";

    const {
        register,
        handleSubmit
    } = useForm();

    async function fetchData(data) {
        console.log(data);
        try {
            const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&maxReadyTime=${data.preptime}&cuisine=${data.typequisine}&diet=${data.typediet}&intolerances=${data.typeintolerance}&type=${data.typemeal}&number=9&offset=${offset}&apiKey=${apiKey}`);
            setResults(result.data);
            console.log(result);
            result && setNoResults(results.results.length);
            console.log(results.results.length);
            // console.log(result.data.results.length);

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className="questions-background">

                <section className="questions-explanation">
                    <h1 className="questions-header">Ok, so you want to answer some questions and let us do the
                        thinking? We got you!</h1>
                    <h2>Below you'll find questions which need to be fed appetizing answers! Afterwards we will reward
                        you with
                        some mouth-dripping recipes. Yummy!</h2>
                </section>

                <form onSubmit={handleSubmit(fetchData)}>
                    <section className="questions-form">
                        <h3 className="questions">How lazy are you really today? Come on.. dont be shy! If don't feel
                            like spending too much time in the kitchen give us the amount of minutes we can take from
                            you.
                        </h3>
                        <img className="evil-banana"/>

                        <label htmlFor="preptime"></label>
                        <select name="preptime" {...register("preptime")}>
                            <option value="">Choose preptime</option>
                            <option value="45">10-45 min</option>
                            <option value="120">10-120 min</option>
                        </select>

                        <h3 className="questions">Do you feel French today monsieur/madame? Or perhaps any of the other
                            options?: </h3>

                        <label htmlFor="typequisine"></label>
                        <select name="typequisine" {...register("typequisine")}>
                            <option value="">Choose quisine</option>
                            <option value="african">African</option>
                            <option value="american">American</option>
                            <option value="british">British</option>
                            <option value="carribean">Carribean</option>
                            <option value="chinese">Chinese</option>
                            <option value="indian">Indian</option>
                            <option value="mediterranean">Mediterranean</option>
                            <option value="japanese">Japanese</option>
                        </select>

                        <h3 className="questions">Do you feel like dieting today? If so, pick your diet below</h3>

                        <label htmlFor="typediet"></label>
                        <select name="typediet" {...register("typediet")}>
                            <option value="">Choose diet</option>
                            <option value="vegan">Vegan</option>
                            <option value="gluten-free">Gluten free</option>
                            <option value="ketogenic">Ketogenic</option>
                            <option value="vegetarian">Vegetarian</option>
                        </select>

                        <h3 className="questions">I get it, sometimes you just feel intolerant. Come on don't be shy and
                            tell us what it is</h3>

                        <label htmlFor="typeintolerance"></label>
                        <select name="typeintolerance" {...register("typeintolerance")}>
                            <option value="">Choose intolerance</option>
                            <option value="egg">Egg</option>
                            <option value="dairy">Dairy</option>
                            <option value="gluten">Gluten</option>
                            <option value="grain">Grain</option>
                            <option value="peanut">Deez Nuts</option>
                            <option value="seafood">Seafood</option>
                            <option value="sesame">Sesame</option>
                            <option value="shellfish">Shellfish</option>
                            <option value="soy">Soy</option>
                            <option value="wheat">Wheat</option>
                        </select>

                        <h3 className="questions">If you were to be a type of meal today, what would you be? Would you
                            be the full package a la main
                            course, or perhaps you feel like being the sweetest dessert on earth</h3>

                        <label htmlFor="typemeal"></label>
                        <select name="typemeal" {...register("typemeal")}>
                            <option value="">Choose type meal</option>
                            <option value="main-course">Main Course</option>
                            <option value="appetizer">Appetizer</option>
                            <option value="dessert">Dessert</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="salad">Salad</option>
                            <option value="snack">Snack</option>
                            <option value="fingerfood">Fingerfood</option>
                        </select>

                        <div className="search-button-questions-box">

                            {show && noResults !== 0 &&
                            <button className="button-questions" type="submit" disabled={offset === -1}
                                    onClick={() => setOffset(offset - 1)}>
                                ⬅️
                            </button>}
                            {offset === -1 && setOffset(0)}

                            <button className="button-questions" type="submit" onClick={() => setShow(true)}>
                                Show Results
                            </button>

                            {show && noResults !== 0 &&
                            <button className="button-questions" type="submit"
                                    onClick={() => setOffset(offset + 1)}>
                                ➡️
                            </button>}

                        </div>
                    </section>
                </form>

                {show && noResults === 0 &&
                <p className="error-message">No recipes found, please make changes to your quiry</p>}

                <div className="show-results-box">
                    <section className="show-results">
                        {results && results.results.map((result) => {
                            return (
                                <div className="one-result" key={result.id}>
                                    <Link to={`/results/${result.id}`}><h1
                                        className="title-result-questions">{result.title}</h1>
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

export default Questions;