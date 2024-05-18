//these pages uses different components so we need to make components differently
import { Heading } from "../components/HeadingComp";
import { SubHeading } from "../components/SubHeadingComp";
import { InputBox } from "../components/InputBoxComp";
import { Button } from "../components/ButtonComp";
import { BottomComp } from "../components/BottomComp";

export const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"}></Heading>
          <SubHeading
            label={"Enter your information to create an account"}
          ></SubHeading>
          <InputBox label={"First Name"} placeholder="John"></InputBox>
          <InputBox label={"Last Name"} placeholder="Doe"></InputBox>
          <InputBox label={"Email"} placeholder="bhallaJi@gmail.com"></InputBox>
          <InputBox label={"Password"} placeholder="123456"></InputBox>
          <div className="pt-4">
            <Button label={"Sign up"}></Button>
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
