import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import './index.css';
import Signup from './components/signup/signup';
import ResetPassword from './components/resetPassword/resetPassword';
import ResetEmail from './components/resetEmail/resetEmail';
import Home from './components/home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-email" element={<ResetEmail />} />
          <Route path="/reset-password/:email" element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
