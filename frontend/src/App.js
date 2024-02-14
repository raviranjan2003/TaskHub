import { Route, Routes } from 'react-router';
import Button from '@mui/material/Button';
import HomeNavbar from './components/HomeNavbar';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  return (
    <div>
      <HomeNavbar />
      <Routes>
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/sign-in" element={<SignIn/>} />
      </Routes>
    </div>
  );
}


export default App;
