import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Account } from 'appwrite';
import { client } from './appwriteConfig';
import './styles/style.css';

const account = new Account(client);

interface Props {
  toggleForm: () => void;
}

const SignupForm: React.FC<Props> = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await account.create('unique()', email, password); 
      setSuccess('Account created successfully!');
      console.log('User signed up:', response);
    } catch (err) {
      setError('Failed to sign up. Please try again.');
      console.error('Error signing up:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container sign-up">
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-300 to-blue-200">
          <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
            <form onSubmit={handleSignup}>
              <h1 className="text-2xl font-bold text-center mb-4">Create Account</h1>

              <div className="social-icons flex justify-center space-x-4 mb-4">
                <a href="#" className="icon text-xl text-gray-500 hover:text-red-500 transition">
                  <FontAwesomeIcon icon={faGoogle} />
                </a>
                <a href="#" className="icon text-xl text-gray-500 hover:text-blue-600 transition">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="#" className="icon text-xl text-gray-500 hover:text-gray-800 transition">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="#" className="icon text-xl text-gray-500 hover:text-blue-500 transition">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>

              <span className="block text-center text-gray-600 mb-4">or use your email to register</span>

              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              {success && <p className="text-green-500 text-center mb-4">{success}</p>}

              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 mb-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mb-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mb-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>

              <p className="text-center text-gray-600 mt-4">
                Already have an account?{' '}
                <a href="#" onClick={toggleForm} className="text-blue-500 hover:text-blue-600">
                  Sign In
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
