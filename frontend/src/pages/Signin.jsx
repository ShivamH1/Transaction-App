import React from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
// import { useNavigate } from "react-router-dom";

export const Signin = () => {
  // const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign In"}></Heading>
          <SubHeading label={"Enter your details to sign in"}></SubHeading>
          <InputBox label={"Email"} placeholder={"Email"}></InputBox>
          <InputBox label={"Password"} placeholder={"Password"}></InputBox>
          <div>
            <Button label={"Sign In"}></Button>
          </div>
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
