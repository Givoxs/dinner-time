import React, { useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import './../assets/banana-evil-smile.gif';


function Questions() {

    // const[servings, setServings] = useState(0)
    // const [maxPrepTime, setMaxPrepTime] = useState(0)
    // const [quisine, setQuisine] = useState("")
    // const [diet, setDiet] = useState("")
    // const [intolerances, setIntolerances] = useState("")
    // const [typeOfMeal, setTypeOfMeal] = useState("")
    const apiKey = "01b598e057b844afb0dcfe60776b9e98"
    // const apiKey = "6b56f72d5d774a46a125d409be241027"
    const [results, setResults] = useState(null)
    const {
        register,
        handleSubmit
    } = useForm();

//eerst buttons gemaakt voor elke optie om fouten op te vangen, aangepast naar dropdown. is ook minder code

        async function fetchData(data) {
console.log(data)
            try {
                const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&maxReadyTime=${data.preptime}&cuisine=${data.typequisine}&diet=${data.typediet}&intolerances=${data.typeintolerance}&type=${data.typemeal}&number=9&apiKey=${apiKey}`)
                setResults(result.data)
                // console.log(results)
            } catch (e) {
                console.log(e)
            }
        }


    return (
        <>
            <h1>Ok, so you want to answer some questions and let us do the thinking? We got you!</h1>
            <h2>Below you'll find questions which need to be fed appetizing answers! Afterwards we will reward you with
                some mouth-dripping recipes. Yummy!</h2>

            <form onSubmit={handleSubmit(fetchData)}><p>
               How lazy are you really today? Come on.. dont be shy! If don't feel like spending too much time in the kitchen give us the amount of minutes we can take off your life.</p>
                <img className="evil-banana"/>



            <label className="label-dropdown" htmlFor="preptime"></label>
            <select className="dropdown-questions" name="preptime" {...register("preptime")}>
                <option value="">Choose preptime</option>
                <option value="45">10-45</option>
                <option value="120">10-120</option>
            </select>

            <p>Do you feel French today monsieur/madame? Or perhaps any of the other options?:

                <label className="label-dropdown" htmlFor="typequisine"></label>
                <select className="dropdown-questions" name="typequisine" {...register("typequisine")}>
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

            </p>

            <p>Do you feel like dieting today? If so, pick your diet below</p>

                <label className="label-dropdown" htmlFor="typediet"></label>
                <select className="dropdown-questions" name="typediet" {...register("typediet")}>
                    <option value="">Choose diet</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten-free">Gluten free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegetarian">Vegetarian</option>

                </select>

            <p>I get it, sometimes you just feel intolerant. Come on don't be shy and tell us what it is:

                <label className="label-dropdown" htmlFor="typeintolerance"></label>
                <select className="dropdown-questions" name="typeintolerance" {...register("typeintolerance")}>
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

            </p>

            <p>If you were to be a type of meal today, what would you be? Would you be the full package a la main
                course, or perhaps you feel like being the sweetest thing on earth as a dessert. Tell us what you want:


                <label className="label-dropdown" htmlFor="typemeal"></label>
                <select className="dropdown-questions" name="typemeal" {...register("typemeal")}>
                    <option value="">Choose type meal</option>
                    <option value="main-course">Main Course</option>
                    <option value="appetizer">Appetizer</option>
                    <option value="dessert">Dessert</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="salad">Salad</option>
                    <option value="snack">Snack</option>
                    <option value="fingerfood">Fingerfood</option>
                </select>
            </p>
                <button type="submit">testen</button>
            </form>

            {results && results.results.map((result) => {
                return (

                    <div key={result.id}>
                        <Link to={`/results/${result.id}`}><h1 className="title-result" >{result.title}</h1>
                            <img className="image-result" src={result.image} alt={result.name}/> </Link>

                    </div>


                )

            })}


            {/*einde endpunt*/}

        </>
    )
}

export default Questions