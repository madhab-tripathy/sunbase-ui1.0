import './App.css';
import Login from './components/Login';
import UserDetailsForm from './components/UserDetailsForm';
import SunbaseData from './components/SunbaseData';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/add-user" element={<UserDetailsForm />}></Route>
        <Route path="/users-info" element={<SunbaseData />}></Route>
      </Routes>
    </>
  );
}

export default App;
