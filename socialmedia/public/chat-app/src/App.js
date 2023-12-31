import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';

import axios from 'axios';
function App() {
  axios.defaults.withCredentials=true;
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/" element={<Home/>}></Route>
     
    </Routes>
    </BrowserRouter>
  );
}

export default App;
