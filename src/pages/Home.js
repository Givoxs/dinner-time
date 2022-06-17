import React from 'react';
import Footer from "./Footer";
import {Link} from "react-router-dom";
import MainProcessButton from "../components/MainProcessButton";

function Home() {

    return (
        <div className="home-background">

            <section className="home-intro">
                <h2>Welcome to Cookme, your solution!</h2>
                <p> Don’t know what to cook tonight? Just want to cook something with ingredients that are already in
                    your house or do you just feel like browsing through some recipes? How about answering some
                    questions and let Cookme suggest what to cook? Choose one of three options below and find that one
                    recipe you need today!
                </p>
            </section>

            <div className="box-buttons">
                <Link to="/questions">
                    <MainProcessButton
                        textbutton="Click here to: Answer some questions and let Cookme give you some delicious advice."
                    />
                </Link>

                <Link to="/ingredients">
                    <MainProcessButton
                        textbutton="Click here to: Let Cookme suggest what to prepare based upon the ingredients already in your
                        home"
                    />
                </Link>

                <Link to="/search">
                    <MainProcessButton
                        textbutton="Click here to: Search on recipe names or browse through them all."
                    />
                </Link>
            </div>

            <Footer/>

        </div>
    );
}

export default Home;