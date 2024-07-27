import React from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
// import { useNavigate } from "react-router-dom";

// This is a functional component that represents the Signin page of the application.
// It is exported as a constant named Signin.
export const Signin = () => {
  // The component returns a JSX element that represents the content of the Signin page.
  return (
    // The JSX element is a div with a background color of slate-300 and a height of the full screen.
    // It has a flex display with the items centered horizontally and vertically.
    <div className="bg-slate-300 h-screen flex justify-center">
      {/* The div contains a nested flex container with a column direction. */}
      <div className="flex flex-col justify-center">
        {/* The nested div has rounded corners, a white background, a width of 80%, and a maximum height. */}
        {/* The padding is set to 2 units and the horizontal padding is set to 4 units. */}
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          {/* The Heading component displays a heading with the text "Sign In". */}
          <Heading label={"Sign In"}></Heading>
          {/* The SubHeading component displays a subheading with the text "Enter your details to sign in". */}
          <SubHeading label={"Enter your details to sign in"}></SubHeading>
          {/* The InputBox component displays an input box with the label "Email" and a placeholder "Email". */}
          <InputBox label={"Email"} placeholder={"Email"}></InputBox>
          {/* The InputBox component displays an input box with the label "Password" and a placeholder "Password". */}
          <InputBox label={"Password"} placeholder={"Password"}></InputBox>
          {/* The Button component displays a button with the label "Sign In". */}
          <div>
            <Button label={"Sign In"}></Button>
          </div>
          {/* The BottomWarning component displays a warning message at the bottom of the page. */}
          {/* The warning message prompts the user to sign up if they don't have an account. */}
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          ></BottomWarning>
        </div>
      </div>
    </div>
  );
};
