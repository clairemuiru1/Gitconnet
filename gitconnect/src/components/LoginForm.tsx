import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Client, Account } from "appwrite";
import './styles/style.css'


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('66ea9ca0003b2551e1b5'); 

const account = new Account(client);

interface Props {
  toggleForm: () => void;
}

const LoginForm: React.FC<Props> = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true); 
    setError(''); 
    setSuccess(''); 

    try {
      const response = await account.createSession(email, password);
      setSuccess('Logged in successfully!');
      console.log('User logged in:', response);
    } catch (err: any) {
      if (err.code === 400) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="form-container sign-in">
      <form onSubmit={handleLogin}>
        <h1>Sign In</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="social-icons">
          <a href="#" className="icon"><FontAwesomeIcon icon={faGoogle} /></a>
          <a href="#" className="icon"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href="#" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
          <a href="#" className="icon"><FontAwesomeIcon icon={faLinkedin} /></a>
        </div>
        <span>or use your email to sign in</span>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <a href="#">Forgot Your Password?</a>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        <p>
          Don't have an account? <a href="#" onClick={toggleForm}>Create Account</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
