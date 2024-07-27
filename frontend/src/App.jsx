import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";

// Define a functional component called App.
// This component is the main component of our React application.
// It will render the routes for our application.

// The BrowserRouter component from react-router-dom is a higher-order component that provides
// a way for us to navigate between different pages of our application. It wraps our routes
// and provides a context object that we can use to navigate between pages.

// The Routes component from react-router-dom is a wrapper for our Route components.
// It renders the first child Route that matches the current URL.

// The Route component from react-router-dom defines a route for our application.
// It takes a `path` prop which specifies the URL path that the route should match against,
// and an `element` prop which specifies the component that should be rendered when the route is matched.

// The `element` prop is a React element that represents the component that should be rendered when the route is matched.
// In this case, we are importing the `Signup`, `Signin`, `Dashboard`, and `SendMoney` components from our `pages` directory,
// and passing them in as elements to the `Route` components.

function App() {

  return (
    // Render a fragment that contains the BrowserRouter component and the Routes component.
    <>
      <BrowserRouter>
        <Routes>
          {/* Render a Route component that matches the "/signup" URL path.
          When this route is matched, the Signup component will be rendered. */}
          <Route path="/signup" element={<Signup />}></Route>

          {/* Render a Route component that matches the "/signin" URL path.
          When this route is matched, the Signin component will be rendered. */}
          <Route path="/signin" element={<Signin />}></Route>

          {/* Render a Route component that matches the "/dashboard" URL path.
          When this route is matched, the Dashboard component will be rendered. */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Render a Route component that matches the "/send" URL path.
          When this route is matched, the SendMoney component will be rendered. */}
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App