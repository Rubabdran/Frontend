
// IMPORTS
import { useState } from "react";
import { useNavigate } from "react-router";
import "./signup.css";

// APIs
import * as usersAPI from "../../utilities/api.js";


export default function SignupPage({ setUser }) {
    const navigate = useNavigate();
    const initialState = { username: "", password: "", confirmPassword: "", email: "" };
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({ username: '', password: '', email: '', confirmPassword: '' });

    const disabled = !(
        Object.values(errors).every(val => val === "") &&
        Object.values(formData).every(val => val !== "")
    );

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
        validateField(evt);
    }

    function validateField({ target }) {
        const newErrors = { ...errors };
        if (target.name === 'username') {
            newErrors.username = target.value.length < 3 ? 'Username must be at least 3 characters' : '';
        }
        if (target.name === 'email') {
            newErrors.email = !target.value.includes('@') ? 'Email must include @' : '';
        }
        if (target.name === 'password') {
            newErrors.password = target.value.length < 3 ? 'Password must be at least 3 characters' : '';
        }
        if (target.name === 'confirmPassword') {
            newErrors.confirmPassword = target.value !== formData.password ? 'Passwords must match' : '';
        }
        setErrors(newErrors);
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const newUser = await usersAPI.signup(formData);
            setUser(newUser);
            setFormData(initialState);
            navigate("/login");
        } catch (err) {
            console.log(err);
            setUser(null);
        }
    }

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh' 
        }}>
            <div className="container active">
                {/* SIGN UP FORM */}
                <div className="form-container sign-up">
                    <form onSubmit={handleSubmit}>
                        <h2 color="black">Create Account</h2>

                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p>{errors.username}</p>}

                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p>{errors.email}</p>}

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p>{errors.password}</p>}

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

                        <button type="submit" disabled={disabled}>Sign Up</button>
                    </form>
                </div>

                {/* TOGGLE PANEL — Optional if Login is on same page */}
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Already have an account? Sign in now!</p>
                            <button className="hidden" onClick={() => navigate("/login")}>
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}