import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";

// This is the Signup component. It's a functional component that uses React hooks.
export const Signup = () => {
  // Use the useState hook to create state variables for firstName, lastName, username, and password.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Use the useNavigate hook to get the navigate function.
  const navigate = useNavigate();

  // Render the Signup component.
  return (
    // Use a div to set the background color and layout.
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        {/* Use a div to style the form container. */}
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          {/* Render the Heading component with the label "Sign Up". */}
          <Heading label={"Sign Up"} />
          {/* Render the SubHeading component with the label "Enter your details to sign up". */}
          <SubHeading label={"Enter your details to sign up"} />
          {/* Render the InputBox component for the first name input. */}
          <InputBox
            label={"First Name"}
            placeholder={"First Name"}
            onChange={(event) => setFirstName(event.target.value)}
          />
          {/* Render the InputBox component for the last name input. */}
          <InputBox
            label={"Last Name"}
            placeholder={"Last Name"}
            onChange={(event) => setLastName(event.target.value)}
          />
          {/* Render the InputBox component for the email input. */}
          <InputBox
            label={"Email"}
            placeholder={"Email"}
            onChange={(event) => setUsername(event.target.value)}
          />
          {/* Render the InputBox component for the password input. */}
          <InputBox
            label={"Password"}
            placeholder={"Password"}
            onChange={(event) => setPassword(event.target.value)}
          />
          {/* Render the Button component for the signup button. */}
          <div className="pt-4">
            <Button
              onClick={async () => {
                // Send a POST request to the server to sign up a new user.
                const response = await axios.post(
                  "http://localhost:8080/api/v1/user/signup",
                  {
                    username,
                    firstName,
                    lastName,
                    password,
                  }
                );
                // Store the JWT token in local storage.
                localStorage.setItem("token", response.data.token);
                // Navigate to the dashboard page.
                navigate("/dashboard");
              }}
              label={"Sign Up"}
            />
          </div>
          {/* Render the BottomWarning component with a sign in button. */}
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
