// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './SignupPage.css';
// import { auth, db } from '../firebase';
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

// const SignupPage = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [userType, setUserType] = useState('business');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError('');
//     // Signup with Firebase
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Update display name
//       await updateProfile(user, { displayName: name });

//       // Save additional user info to Firestore
//       await setDoc(doc(db, 'users', user.uid), {
//         name,
//         email,
//         userType,
//         createdAt: serverTimestamp(),
//       });

//       // Navigate to the appropriate dashboard
//       if (userType === 'business') {
//         navigate('/business-dashboard');
//       } else {
//         navigate('/trucker-dashboard');
//       }
//     } catch (err) {
//       console.error('Signup error', err);
//       setError(err.message || 'Failed to create account');
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-card">
//         <div className="signup-header">
//           <h1>Create Your Account</h1>
//           <p>Join SmartLogix Today</p>
//         </div>
//         <form onSubmit={handleSignup} className="signup-form">
//           {error && <p className="error-message">{error}</p>}
//           <div className="input-group">
//             <label htmlFor="name">Full Name</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label>I am a:</label>
//             <div className="radio-group">
//               <label>
//                 <input
//                   type="radio"
//                   value="business"
//                   checked={userType === 'business'}
//                   onChange={(e) => setUserType(e.target.value)}
//                 />
//                 Business
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   value="trucker"
//                   checked={userType === 'trucker'}
//                   onChange={(e) => setUserType(e.target.value)}
//                 />
//                 Trucker
//               </label>
//             </div>
//           </div>
//           <button type="submit" className="btn-signup">Create Account</button>
//         </form>
//         <div className="login-link">
//           <p>Already have an account? <Link to="/login">Log In</Link></p>
//         </div>
//         <div className="home-link">
//           <p>Back to <Link to="/">Home</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './SignupPage.css';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Read ?type=trucker or ?type=business from URL
  const queryParams = new URLSearchParams(location.search);
  const userTypeFromURL = queryParams.get('type');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('business'); // default
  const [error, setError] = useState('');

  useEffect(() => {
    if (userTypeFromURL) {
      setUserType(userTypeFromURL);
    }
  }, [userTypeFromURL]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        userType,
        createdAt: serverTimestamp(),
      });

      // Navigate to dashboard based on role
      navigate(userType === 'business' ? '/business-dashboard' : '/trucker-dashboard');
    } catch (err) {
      console.error('Signup error', err);
      setError(err.message || 'Failed to create account');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Create Your Account</h1>
          <p>Join SmartLogix Today</p>
        </div>
        <form onSubmit={handleSignup} className="signup-form">
          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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

          <button type="submit" className="btn-signup">Create Account</button>
        </form>

        <div className="login-link">
          <p>Already have an account? <Link to="/login">Log In</Link></p>
        </div>
        <div className="home-link">
          <p>Back to <Link to="/">Home</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
