import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import "./App.css"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ExerciseDetail from "./pages/ExerciseDetail.jsx";

import { ClerkProvider, SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


const clerkPubKey = "pk_test_YmVjb21pbmctc3RpbmtidWctNzkuY2xlcmsuYWNjb3VudHMuZGV2JA";

const ClerkWithRoutes = () => {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to)=> navigate(to)}
    >
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/sign-in/*"
          element={<SignIn redirectUrl='/' routing="path" path="/sign-in" /> }
        />
        <Route
          path="/sign-up/*"
          element={<SignUp redirectUrl='/' routing="path" path="/sign-up" /> }
        />
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Home/>
              </SignedIn>
              <SignedOut>
                <Home/>
              </SignedOut>

            </>
          }
        />

      </Routes>
    </ClerkProvider>
  )
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkWithRoutes/>
    </BrowserRouter>
  </React.StrictMode>
);
