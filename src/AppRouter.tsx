import Editor from "./pages/Editor"
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";


function AppRouter() {
    return (
        // <Router>
            <Routes>
                <Route path="/editor" element={<Editor />} />
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<div>404</div>} />

            </Routes>
        // </Router>
    );
}

export default AppRouter;