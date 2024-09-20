import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setData } from "../redux/Slice/addDataSlice";
// import dotenv from 'dotenv';
// dotenv.config();


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl)
  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${apiUrl}/api/create-customer`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;

      console.log(data);
      setCustomerId(data.customer_id);


      if (data.status) {
        localStorage.setItem("customerId", data.customer_id);
        localStorage.setItem("email", email);
        // localStorage.setItem("status",data.type)
        navigate("/");
      }
    } catch (err) {
      console.error("Error creating customer:", err);
      setError("Failed to create customer. Please try again.");
    }
  };

  return (
    <div>
      <div className="w-[500px] max-w-3xl m-auto my-8 border rounded-md p border-zinc-700">
        <div className="px-5 py-4">
          <h3 className="mb-1 text-2xl font-medium">Sign In</h3>
          <p className="text-zinc-300"></p>
          <div className="my-8">
            <form noValidate className="mb-4" onSubmit={handleSignIn}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    placeholder="name@example.com"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    className="w-full p-3 rounded-md text-white bg-zinc-800"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    className="w-full p-3 rounded-md text-white bg-zinc-800"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  data-variant="slim"
                  className="Button_root__3fIL8 Button_slim__eaYER block w-full py-2 mt-8 text-sm font-semibold text-center  rounded-md hover:bg-zinc-900 hover:text-white"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </form>
            {error && <p className="text-red-500">{error}</p>}{" "}
            {/* Display error message if any */}
            <p>
              <Link className="font-light text-sm" to="/signup">
                Don't have an account? Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
