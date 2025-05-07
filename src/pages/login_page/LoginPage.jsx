import { useState } from "react";
import { useNavigate } from "react-router";
import * as usersAPI from "../../utilities/api.js";
import "./login.css";

export default function LoginPage({ user, setUser }) {
    const navigate = useNavigate();
    const initialState = { username: "", password: "" };
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState("");

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    }

    async function handleLogin(evt) {
        evt.preventDefault();
        try {
            const loggedInUser = await usersAPI.login(formData);
            setUser(loggedInUser);
            navigate("/generate");
        } catch (err) {
            setUser(null);
            setError("Invalid credentials, please try again.");
            console.error("Login failed:", err);
        }
    }

    return (
    
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh' 
        }}>
            <div className="container">
                {/* SIGN IN FORM */}
                <div className="form-container sign-in">
                    <form onSubmit={handleLogin}>
                        <h2>Sign in</h2>

                        {error && <p className="error-message">{error}</p>}

                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit">Login</button>
                    </form>
                </div>
                {/* TOGGLE PANEL — Optional if Login is on same page */}
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Don't have an account? Sign up now!</p>
                            <button className="hidden" onClick={() => navigate("/signup")}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
