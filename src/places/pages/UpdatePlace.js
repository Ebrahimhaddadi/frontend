import React from "react";
import {useParams} from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import {VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceForm.css";
import {useForm} from "../../shared/hooks/form-hook";

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
];
const UpdatePlace=()=>{

    const placeId=useParams().placeId;
    const identifedPlace=DUMMY_PLACES.find(p=>p.id===placeId);

  const [formState,inputHandler]=  useForm({
        title:{
            value:identifedPlace.title,
            isValid:true
        },
        description:{
            value: identifedPlace.description,
            isValid: true
        }
    },true)



    if (!identifedPlace){
        return  <div className={"center"}>
            <h2>Could not find place!</h2>
        </div>
    }

    const placeUpdateSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs)

    }
return <form className={"place-form"} onSubmit={placeUpdateSubmitHandler}>
    <Input
    element={"input"}
    id={"title"}
    type={"text"}
    validators={[VALIDATOR_REQUIRE()]}
    label={"Description"}
    errorText={"Please enter a valid description (min. 5 characters)."}
    onInput={inputHandler}
    value={formState.inputs.title.value}
    valid={formState.inputs.title.isValid}
    />
    <Input
    element={"textarea"}
    id={"description"}
    validators={[VALIDATOR_MINLENGTH(5)]}
    label={"Title"}
    errorText={"Please enter a valid title."}
    onInput={inputHandler}
    value={formState.inputs.description.value}
    valid={formState.inputs.description.isValid}
    />
    <Button type={"submit"} disabled={!formState.isValid}>UPDATE PLACE</Button>
</form>
}
export default UpdatePlace