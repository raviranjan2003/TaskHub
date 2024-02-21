import { Route, Routes } from 'react-router';
import HomeNavbar from './components/HomeNavbar';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomeNavbar/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/sign-in" element={<SignIn/>} />
      </Routes>
    </div>
  );
}


export default App;
