import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

function Results() {

    const [recipeSteps, setRecipeSteps] = useState(null);
    const apiKey = "6b56f72d5d774a46a125d409be241027";
    const {id} = useParams();

    useEffect(() => {
        async function openRecipe() {
            try {
                const result = await axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey}&stepBreakdown=true`);
                setRecipeSteps(result.data[0]);

            } catch (e) {
                console.log(e);
            }
        }

        openRecipe();
    }, [id]);

    return (
        <div className="recipe-background">

            <section className="recipe-instructions">
                <div className="recipe-header-box">
                    <h2 className="header-recipe">Here are all the steps to internal bliss</h2>
                </div>
                <div className="box-recipe">

                    <article className="recipe-detailed-instructions">
                        {recipeSteps && recipeSteps.steps.map((step) => {
                            return (
                                <li key={step.step}>{step.step}</li>);
                        })
                        }
                    </article>

                </div>
            </section>
        </div>
    );
}

export default Results;