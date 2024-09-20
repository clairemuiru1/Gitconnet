import React, { useState } from "react";
import './styles/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Account } from 'appwrite';
import { client } from './appwriteConfig';
// import { useRouter } from 'next/router';

const account = new Account(client);

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSignUpActive, setIsSignUpActive] = useState(false); 

  // const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await account.create('unique()', email, password);
      setSuccess('Account created successfully!');
      console.log('User signed up:', response);
      // router.push('/my-account');
    } catch (err) {
      setError('Failed to sign up. Please try again.');
      console.error('Error signing up:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await account.createSession(email, password);
      setSuccess('Logged in successfully!');
      console.log('User logged in:', response);
      // router.push('/my-account');
    } catch (err) {
      setError('Failed to log in. Please try again.');
      console.error('Error logging in:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsSignUpActive(!isSignUpActive); // Toggle between sign-up and sign-in
  };

  return (
    <div className={`container ${isSignUpActive ? "active" : ""}`}>
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#"><FontAwesomeIcon icon={faGoogle} /></a>
            <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="#"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
          </div>
          <span>or use your account</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <p>Don't have an account? <a href="#" onClick={toggleForm}>Sign Up</a></p>
        </form>
      </div>

      <div className="form-container sign-up">
        <form onSubmit={handleSignup}>
          <h1>Sign Up</h1>
          <div className="social-icons">
            <a href="#"><FontAwesomeIcon icon={faGoogle} /></a>
            <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="#"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <p>Already have an account? <a href="#" onClick={toggleForm}>Sign In</a></p>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us, please login with your personal info.</p>
            <button onClick={toggleForm}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us.</p>
            <button onClick={toggleForm}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
