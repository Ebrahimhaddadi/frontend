import {Route, Router,Routes,Navigate,Outlet} from "react-router-dom";
import {useState,useCallback} from "react";
import './App.css';

import Users from "./users/pages/Users"
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces"
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";
import {AuthContext} from "./shared/context/auth-context";
function Layout() {
    return (
        <div style={{}}>
            <MainNavigation/>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const login=useCallback(()=>{
        setIsLoggedIn(true)
    },[])
    const logout=useCallback(()=>{
        setIsLoggedIn(false)
    },[]);



    return (
      <>
          <AuthContext.Provider value={{isLoggedIn: isLoggedIn,logout:logout,login:login}}>
       <Routes>
        <Route path={"/"}  element={<Layout/>}>
            {isLoggedIn ? (
               <>
                   <Route path={"/"} element={<Users/>}/>
                   <Route path={"/places/new"} element={<NewPlace/>}/>
                   <Route path="/:userId/places" element={<UserPlaces/>}/>
                   <Route path={"/places/:placeId"} element={<UpdatePlace/>}/>
                   <Route path={"/*"} element={<Navigate to={"/"} replace />}/>
               </>
            ):(
                <>
                    <Route path={"/auth"} element={<Auth/>}/>
                    <Route path={"/places/:placeId"} element={<UpdatePlace/>}/>
                    <Route path={"/*"} element={<Navigate to={"/auth"} replace />}/>
                </>
            )}





    </Route>
  </Routes>
          </AuthContext.Provider>

      </>
  );
}

export default App;
