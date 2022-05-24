import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from 'react-router-dom';
import './App.css';
import Feedback from './pages/Feedback';
import Home from './pages/Home';
import Ingredients from './pages/Ingredients';
import Profile from './pages/Profile';
import Questions from './pages/Questions';
import Results from './pages/Results';
import Search from './pages/Search';
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";


function App() {
    // const {isAuth} = useContext(AuthContext);

    return (

        <Router>
            <Navbar/>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path ="/feedback">
                    <Feedback />
                </Route>
                <Route path="/ingredients">
                    <Ingredients />
                </Route>
                <PrivateRoute exact path="/profile">
                     <Profile />
                </PrivateRoute>
                <Route path="/questions">
                    <Questions />
                </Route>
                <Route path="/results/:id">
                    <Results />
                </Route>
                <Route path="/search">
                    <Search />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>


            </Switch>
        </Router>

    );
}

export default App;
