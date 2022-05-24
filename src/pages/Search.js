import React, {useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

function Search(){

    const [generalRecipeInfo, setGeneralRecipeInfo] = useState(null)
    const apiKey = "01b598e057b844afb0dcfe60776b9e98"
    const {
        register,
        handleSubmit
    } = useForm();

    async function searchRecipes(data){
        try{
            const result= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${data.search}&number=9&apiKey=${apiKey}`)
            console.log(result)
            setGeneralRecipeInfo(result.data)
            // console.log(generalRecipeInfo)
        }
        catch (e){
            console.log(e)
        }
    }

    return(
        <>
            <div className="search-background">
                <div className="search-explanation-box">
                <section className="search-explanation">
                    Below you can search for a recipe by entering the name of the desired dish
                </section></div>

                <div className="enter-search-box">

                <form onSubmit={handleSubmit(searchRecipes)}>
                    <div className="search-recipe">
                    <label htmlFor="search">
                        Recipe name:
                        <input
                            type="text"
                            placeholder="write recipe name.."
                            {...register("search")}
                        />
                    </label>
                    </div>
                    <div className="search-button-recipe-box">
                        <button className="search-button-recipe" type="submit">Show Results</button>
                        {/*//tweede state aangemaakt voor input van searchfield en state voor zoeken naar juiste recept wordt aangepast door state van searchfield en wordt afgevuurd door button*/}
                    </div>
                </form>
                </div>



                <div className="show-results-box">
                    <section className="show-results">

                        {generalRecipeInfo && generalRecipeInfo.results.map((result)=>{
                            return(

                                    <div className="one-result" key={result.id}>
                                           <Link to={`/results/${result.id}`}><h1 className="title-result" >{result.title}</h1>
                              <img className="image-result" src={result.image} alt={result.name}/>

                                            {/*{console.log(recipeID)}*/}
                                            {/*mogelijke opties:*/}
                                            {/*-als prop id doorgeven naar resultpagina*/}
                                            {/*-resultpagina hier in de return zetten met id als prop?*/}
                                            {/*-?*/}

                                        </Link>
                                    </div>
                        )
                        })}

                    </section>

                </div>
            </div>

        </>
    )
}

export default Search