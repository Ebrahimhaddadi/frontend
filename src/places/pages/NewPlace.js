import React, {useCallback,useReducer} from "react";
import "./NewPlace.css";
import {VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH} from "../../shared/util/validators"
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {useForm} from "../../shared/hooks/form-hook";


const NewPlace=(props)=>{

  const [formState,inputHandler]=useForm({
    title:{
        value:"",
        isValid:false,

    },
    description:{
        value:"",
        isValid: false
    }
},false)

    const placeSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState)
    }
return(
<form className="place-form" onSubmit={placeSubmitHandler}>
<Input
    id={"title"}
    element={"input"}
    type={"text"}
    label={"Title"}
    validators={[VALIDATOR_REQUIRE()]}
    errorText="Please enter a valid title."
    onInput={inputHandler}
/>
    <Input
    id={"description"}
    element={"textarea"}
    type={"text"}
    label={"Description"}
    validators={[VALIDATOR_MINLENGTH(5)]}
    errorText="Please enter a valid description."
    onInput={inputHandler}
/>
    <Input
    id={"address"}
    element={"input"}
    type={"text"}
    label={"Address"}
    validators={[VALIDATOR_REQUIRE()]}
    errorText="Please enter a valid Address."
    onInput={inputHandler}
/>
    <Button type={"submit"}  disabled={!formState.isValid} > ADD PLACE</Button>
</form>
)
}
export default NewPlace;