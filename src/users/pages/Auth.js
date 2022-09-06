import React,{useState,useContext} from "react";
import "./Auth.css"
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import {useForm} from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";
import {AuthContext} from "../../shared/context/auth-context";
const Auth=()=>{
    const auth=useContext(AuthContext)

    const [isLoginMode, setIsLoginMode] = useState(true);


    const [formState,inputHandler,setFormData]=useForm({
        email:{
            value:"",
            isValid:false,
        },
        password:{
            value:"",
            isValid: false,
        }
    },false)
const authSubmitHandler =async (event) => {
  event.preventDefault();

    if(isLoginMode){
        console.log(isLoginMode,"if a")
    }else {
        try {
            const response = await fetch('http://localhost:5001/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                })
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            auth.login();
        } catch (err) {

        }
    }

    auth.login()
}
const switchModeHandler = () => {
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name:undefined
            },formState.inputs.isValid && formState.inputs.isValid )
        }else {
           setFormData({
               ...formState.inputs,
               name:{
                   value:"",
                   isValid:false
               }

           },false)
        }
  setIsLoginMode(prevMode=>!prevMode)
}

return <Card className={"authentication"}>
    <h2>Login Required</h2>
    <hr/>
    <form onSubmit={authSubmitHandler}>
        {isLoginMode && <Input element={"input"} id={"name"} type={"text"} label={"Yor name"} validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler} />}
      <Input  id="email"
              element="input"
              type="email"
              label={"E-MAIL"}
              validators={[VALIDATOR_EMAIL()]}
              errorText={"Please enter a valid email address."}
              onInput={inputHandler }
      />
        <Input  id="password"
              element="input"
              type="password"
              label={"Password"}
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText={"Please enter a valid password, at least 5 characters."}
                onInput={inputHandler }
      />
        <Button type={"submit"} disabled={!formState.isValid} >{isLoginMode ? "LOGIN" : "SIGNUP"}</Button>
    </form>
    <Button inverse onClick={switchModeHandler} >SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}</Button>
</Card>
}
export default Auth