import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import EyeIcon from '../assets/icons/eye.svg';
import EyeOffIcon from '../assets/icons/eye-off.svg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('business');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    // Login with Firebase
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Try reading stored userType from Firestore; fall back to chosen radio
      const userDocRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userDocRef);
      const storedType = userSnap.exists() ? userSnap.data().userType : null;
      const finalType = storedType || userType;

      if (finalType === 'business') {
        navigate('/business-dashboard');
      } else {
        navigate('/trucker-dashboard');
      }
    } catch (err) {
      console.error('Login error', err);
      setError(err.message || 'Failed to sign in');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please log in to your account</p>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type = "button"
              className='toggle-password'
              onClick={() => setShowPassword((s) => !s)}>
                  <img src={showPassword ? EyeOffIcon : EyeIcon} />
              </button>
            </div>
          </div>
          <div className="input-group">
            <label>I am a:</label>
            <div className="radio-group">
              
              <label>
                <input
                  type="radio"
                  value="trucker"
                  checked={userType === 'trucker'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Trucker
              </label>
              <label>
                <input
                  type="radio"
                  value="business"
                  checked={userType === 'business'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Business
              </label>
            </div>
          </div>
          <button type="submit" className="btn-login">Log In</button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
        <div className="home-link">
          <p>Back to <Link to="/">Home</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
