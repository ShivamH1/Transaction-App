import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your details to sign up"} />
          <InputBox
            label={"First Name"}
            placeholder={"First Name"}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <InputBox
            label={"Last Name"}
            placeholder={"Last Name"}
            onChange={(event) => setLastName(event.target.value)}
          />
          <InputBox
            label={"Email"}
            placeholder={"Email"}
            onChange={(event) => setUsername(event.target.value)}
          />
          <InputBox
            label={"Password"}
            placeholder={"Password"}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:8080/api/v1/user/signup",
                  {
                    username,
                    firstName,
                    lastName,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
              label={"Sign Up"}
            />
          </div>
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
