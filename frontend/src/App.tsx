import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const App: React.FC = () => {
  return (
    <div>
      <LoginForm />
      <SignupForm/>
    </div>
  );
}

export default App;
