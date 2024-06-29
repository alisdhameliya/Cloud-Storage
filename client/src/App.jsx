import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import HomePage from "./HomePage";
import Dashboard from './Dashboard';

function App() {

  return (
    <>    
      <Router>
        <Routes>
          <Route path="/" element={
            <div>
              <SignedOut>
                <HomePage/>
              </SignedOut>
              <SignedIn>
                <Dashboard/>
              </SignedIn>
            </div>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
