import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate=useNavigate();

  const validateEmail = (value) => {
    if (!value) {
      return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      return "Email is invalid";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value) {
      return "Password is required";
    } else if (value.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value),
      }));
    } else if (name === "password") {
      setPassword(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: validatePassword(value),
      }));
    }
  };

  const apiUrl = import.meta.env.VITE_API_URL;
  const handleSignUp = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        email,
        password,
      });
      if (response.data.status) {
        navigate("/signin");
      }
      console.log("User created:", response.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <div>
        <div className="w-[500px] max-w-3xl m-auto my-8 border rounded-md p border-zinc-700">
          <div className="px-5 py-4">
            <h3 className="mb-1 text-2xl font-medium">Sign Up</h3>
            <div className="my-8">
              <form noValidate className="mb-4" onSubmit={handleSignUp}>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      placeholder="name@example.com"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      className={`w-full p-3 text-white rounded-md bg-zinc-800 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}

                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      className={`w-full p-3 text-white rounded-md bg-zinc-800 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                  </div>
                  <button
                    data-variant="slim"
                    className="Button_root__3fIL8 Button_slim__eaYER block w-full py-2 mt-8 text-sm font-semibold text-center rounded-md hover:bg-zinc-900 hover:text-white"
                    type="submit"
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <p>
                <Link className="font-light text-sm" to="/signin">
                  Already Have an Account? Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
