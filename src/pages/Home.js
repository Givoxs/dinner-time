import React from 'react';
import Feedback from "./Feedback";
import {Link} from "react-router-dom";

function Home() {


    return (
        <div className="home-background">


            <section className="home-intro">
                <h2>Welcome to Cookme, your solution!</h2>
                <p> Don’t know what to cook tonight? Just want to cook something with ingredients that are already in
                    your
                    house or do you just feel like browsing through some recipes? How about answering some
                    questions and let Cookme suggest what to cook?
                    Choose one of three options below and find that one recipe you need today!
                </p>
            </section>

            <div className="box-buttons">
                <Link to="/questions">
                    <button
                        type="button"
                        className="buttons-homepage">
                        Click here to: Answer some questions and let Cookme give you some delicious advice.
                    </button>
                </Link>

                <Link to="/ingredients">
                    <button
                        type="button"
                        className="buttons-homepage">
                        Click here to: Let Cookme suggest what to prepare based upon the ingredients already in your
                        home
                    </button>
                </Link>

                <Link to="/search">
                    <button
                        type="button"
                        className="buttons-homepage">
                        Click here to: Search on recipe names or browse through them all.
                    </button>
                </Link>
            </div>

            <Feedback/>

        </div>
    );
}

export default Home;