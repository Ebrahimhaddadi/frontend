import React, {useEffect,useState} from "react";

import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users=()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const ebi = async () => {
        setIsLoading(true)
        try{
            const data=await fetch("http://localhost:5001/api/users")
            const responsData=await data.json();
            // if(!responsData.ok){
            //     throw new Error(responsData.message)
            // }
            setUsers(responsData.users)
            setIsLoading(false)
        }catch (e) {

        }

    }
    useEffect(()=>{

    ebi()
},[])
    const errorHandler = () => {
      setError(null)
    }
return(
    <>
        <ErrorModal error={error} onClear={errorHandler}/>
        {isLoading  && (<div className={"center"}><LoadingSpinner/></div>)}
        {(<UserList items={users}/>)}

    </>
)
}
export default Users