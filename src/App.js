import {Route, Router,Routes,Navigate,Outlet} from "react-router-dom";
import './App.css';

import Users from "./users/pages/Users"
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces"
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
  return (
      <>
  <Routes>
    <Route path={"/"}  element={<Layout/>}>
            <Route path={"/"} element={<Users/>}/>
            <Route path={"/*"} element={<Navigate to={"/"} replace />}/>
           <Route path={"/places/new"} element={<NewPlace/>}/>
        <Route path={"/:userId/places"} element={<UserPlaces/>}/>
    </Route>
  </Routes>
      </>
  );
}

export default App;
