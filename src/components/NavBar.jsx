import React, { useEffect, useState } from "react";
import SignIn from "./SignIn";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const navigate = useNavigate();
  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, [localStorage.getItem("email")]);

  function handlelogout() {
    localStorage.removeItem("customerId");
    localStorage.removeItem("email");

    navigate("/");
  }
  return (
    <div>
      <nav class="Navbar_root__QgVqp">
        <a href="#skip" class="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <div class="max-w-6xl px-6 mx-auto">
          <div class="relative flex flex-row justify-between py-4 align-center md:py-6">
            <div class="flex items-center flex-1">
              <a class="Navbar_logo__INhgK" aria-label="Logo" href="/">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="100%" height="100%" rx="16" fill="white"></rect>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                    fill="black"
                  ></path>
                </svg>
              </a>
              <nav class="ml-6 space-x-2 lg:block">
                <a class="Navbar_link__teYe1" href="/">
                  Pricing
                </a>
              </nav>
            </div>
            <div class="flex justify-end space-x-8">
              {email ? (
                <p>{email}</p>
              ) : (
                <Link class="Navbar_link__teYe1" to="/signin">
                  SignIn{" "}
                </Link>
              )}
            </div>
            <div className="ml-2">
              {email && (
                <button
                  className=" bg-zinc-900 hover:bg-green-500 text-white p-1"
                  onClick={handlelogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
