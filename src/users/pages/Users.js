import React from "react";

import UserList from "../components/UserList";

const Users=()=>{
    const USERS=[
        {id:"u1",name:"Ebrahim Hadadi",image:"https://picsum.photos/seed/picsum/750/1260",places:3}
    ]
return(
<UserList items={USERS} />
)
}
export default Users