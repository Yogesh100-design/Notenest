import "./App.css";
import Navbar from "./Components/Navbar";
import LandingPage from "./Components/LandingPage";
import About from "./Components/About";
import NoteState from "./Context/Notes/NoteState"
import Alert from "./Components/Alert"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Notes from "./Components/Notes";
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import {useState} from "react"


function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 3000); 
  };

  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
       <Alert alert={alert} />
         <div className="container">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/notes" element={<Notes showAlert={showAlert} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login  showAlert={showAlert}/>} />
          <Route exact path="/signup" element={<Signup  showAlert={showAlert}/>} />
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
