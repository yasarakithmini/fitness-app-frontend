


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
// import Emotions from './components/Emotions';
// import Game from './components/game';
// import Puzzle from './components/Snakepuzzle';
// import Hangman from './components/HamngmanMain';
import Home from './pages/Main Home';
import About from './pages/Main About';
import Work from './pages/How we work'
function App() {
    return (
        <Router>
            <div>
                <Routes>
                <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    {/*<Route path="/emotions" element={<Emotions />} />*/}
                    {/*<Route path="/game" element={<Game />} />*/}
                    {/*<Route path="/puzzle" element={<Puzzle />} />*/}
                    {/*<Route path="/hangman" element={<Hangman />} />*/}
                    <Route path="/about" element={<About />} />
                    <Route path="/help" element={<Work />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
