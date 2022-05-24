import React, {useEffect, useState} from 'react';
import ButtonPrevNext from "../components/ButtonPrevNext";
import axios from "axios";
import {useParams} from "react-router-dom";



function Results() {

//recepiID moet nog in axios verwerkt worden en vervangt het nummer "531751"


    const [recipeSteps, setRecipeSteps] = useState(null)
    // const apiKey = "01b598e057b844afb0dcfe60776b9e98"
    const apiKey = "6b56f72d5d774a46a125d409be241027"
    const {id}= useParams();

useEffect(()=> {
    async function openRecipe() {
        try {
            const result = await axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey}&stepBreakdown=true`);
            console.log(result.data[0]);
            console.log(result.data);
            console.log(result.data[0].step)
            setRecipeSteps(result.data[0]);

        } catch (e) {
            console.log(e);
        }
    }
    openRecipe();
}, [id])


    return (
        <>
            <article>

                <h2>Here are all the steps to internal bliss</h2>
                {recipeSteps && recipeSteps.steps.map((step)=>{
                return(
                    <li>{step.step}</li>)

                })
                }


                <div className="recepibox">
                    <div className="buttonalign"><ButtonPrevNext
                        text="⬅️"/></div>

                    <div className="buttonalign">
                        <ButtonPrevNext className="buttonalign"
                                        text="➡️"/>


                    </div>

                </div>
             </article>

        </>
    );
}

export default Results;