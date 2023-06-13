import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Appointments from "./components/Appointments";
import LandingPage from "./components/LandingPage";
import Barbers from "./components/Barbers";
import Clients from "./components/Clients";
import BarberById from "./components/Barber:id";
import CreateAppointmentAsClient from "./components/CreateAppointmentAsClient";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <LandingPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/barbers">
            <Barbers />
          </Route>
          <Route exact path="/barbers/:id">
            <BarberById />
          </Route>
          <Route path="/clients">
            <Clients />
          </Route>
          <Route path="/appointments">
            <Appointments />
            <CreateAppointmentAsClient />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
