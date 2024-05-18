import { Heading } from "../components/HeadingComp";
import { SubHeading } from "../components/SubHeadingComp";
import { InputBox } from "../components/InputBoxComp";
import { Button } from "../components/ButtonComp";
import { BottomComp } from "../components/BottomComp";

export const Signin = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign In"}></Heading>
          <SubHeading
            label={"Enter your information to create an account"}
          ></SubHeading>
          <InputBox label={"Email"} placeholder="bhallaJi@gmail.com"></InputBox>
          <InputBox label={"Password"} placeholder="123456"></InputBox>
          <div className="pt-4">
            <Button label={"Sign In"}></Button>
          </div>
          <BottomComp
            label={"Already have an account?"}
            BottomText={"Sign up"}
            to={"/sign up"}
          ></BottomComp>
        </div>
      </div>
    </div>
  );
};
