import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Ingredients from "./pages/Ingredients";
import Profile from "./pages/Profile";
import Questions from "./pages/Questions";
import Results from "./pages/Results";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";

function App() {
    const { isAuth } = useContext(AuthContext);

    return (
        <>
            <Navbar authenticated={isAuth} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/feedback" element={<Footer />} />
                <Route path="/ingredients" element={<Ingredients />} />
                <Route element={<PrivateRoute authenticated={isAuth} />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/questions" element={<Questions />} />
                <Route path="/results/:id" element={<Results />} />
                <Route path="/search" element={<Search />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
}

export default App;