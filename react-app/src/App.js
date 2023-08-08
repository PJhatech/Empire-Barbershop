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
import BarberIndex from "./components/BarberIndex";
import Clients from "./components/Clients";
// import AppointmentForm from "./components/AppointmentForm";
import AppointmentIndex from "./components/AppointmentIndex";
import Services from "./components/Services";
import ServiceIndex from "./components/ServiceIndex";
import LocationPage from "./components/LocationPage";
import Locations from "./components/Locations";
import BarberAppointments from "./components/BarberAppointments";
import BarberProfile from "./components/BarberProfile";
import CashRegister from "./components/CashRegister";

// import CreateAppointmentAsClient from "./components/CreateAppointmentAsClient";


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
          <Route exact path="/barberprofile" >
            <BarberProfile />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/barbers">
            <Barbers />
          </Route>
          <Route exact path="/barbers/:id">
            <BarberIndex />
          </Route>
          <Route exact path="/barbers/:id/appointments">
            <BarberAppointments />
          </Route>
          <Route path="/clients">
            <Clients />
          </Route>
          <Route exact path="/appointments">
            <Appointments />
          </Route>
          <Route exact path="/appointments/:id">
            <AppointmentIndex />
          </Route>
          <Route exact path="/services">
            <Services />
          </Route>
          <Route exact path="/services/:id">
            <ServiceIndex />
          </Route>
          <Route exact path="/locations">
            {/* <LocationPage /> */}
            <Locations />
          </Route>
          <Route exact path="/register">
            <CashRegister />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
