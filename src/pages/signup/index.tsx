import ViewModel from "./ViewModel";
import { containerStyles } from "./contants";
import BasicUserForm from "../../components/basicUserForm";
import { initialFormValues } from "../../lib/inital";

const SignUp = () => {
  const { signup: signupUser, AlertComponent, handleRedirect } = ViewModel();
  const submitHandler = (values: typeof initialFormValues) => {
    signupUser(values);
  };

  return (
    <div style={containerStyles}>
      <BasicUserForm submitHandler={submitHandler} buttonText="Create user" secondButtonText="Sign in" redirectTo={handleRedirect}/>
      <AlertComponent />
    </div>
  );
};

export default SignUp;
