//these pages uses different components so we need to make components differently
import { Heading } from "../components/HeadingComp";
import { SubHeading } from "../components/SubHeadingComp";
import { InputBox } from "../components/InputBoxComp";
import { Button } from "../components/ButtonComp";
import { BottomComp } from "../components/BottomComp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
          <Heading label={"Sign up"}></Heading>
          <SubHeading
            label={"Enter your information to create an account"}
          ></SubHeading>
          <InputBox
            label={"First Name"}
            placeholder="John"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></InputBox>
          <InputBox
            label={"Last Name"}
            placeholder="Doe"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          ></InputBox>
          <InputBox
            label={"Email"}
            placeholder="bhallaJi@gmail.com"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></InputBox>
          <InputBox
            label={"Password"}
            placeholder="123456"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></InputBox>
          <div className="pt-4">
            <Button
              label={"Sign up"}
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
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
            ></Button>
          </div>
          <BottomComp
            label={"Already have an account?"}
            BottomText={"Sign In"}
            to={"/signin"}
          ></BottomComp>
        </div>
      </div>
    </div>
  );
};
