'use client';

import React, { useState } from 'react';
import SignupForm from '../../components/SignupForm';
import LoginForm from '../../components/LoginForm';

const SignupPage: React.FC = () => {
  const [isSignup, setIsSignup] = useState(true);

  const toggleForm = () => setIsSignup(!isSignup);

  return (
    <div className="page-container">
      <h2>Signup Page</h2>
      {isSignup ? (
        <SignupForm toggleForm={toggleForm} />
      ) : (
        <LoginForm toggleForm={toggleForm} />
      )}
    </div>
  );
};

export default SignupPage;
