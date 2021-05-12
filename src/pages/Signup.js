import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constatns/Routes';
import { doesUsernameExist } from '../services/firebase';

const Signup = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  // if password and emailaddress === empty then isInvalid = true
  const isInvalid = password === '' || emailAddress === '';

  const handleSignUp = async (e) => {
    e.preventDefault();
    const usernameExists = await doesUsernameExist(username);
    console.log('usernameExists', usernameExists);
    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        await createdUserResult.user.updateProfile({
          displayName: username,
        });
        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName('');
        setPassword('');
        setEmailAddress('');
        setError(error.message);
      }
    } else {
      setError('this user name is already taken, please try another');
    }
    // try {

    // } catch (error) {

    // }
  };
  useEffect(() => {
    document.title = 'Sign up . Instagram';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iphone-with-login page"
          className="max-w-full"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full">
            <img
              className="mt-2 w-6/12 mb-11"
              src="/images/logo.png"
              alt="instagram logo"
            />
          </h1>
          {error && <p className="text-xs mb-4 text-red-primary">{error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              type="text"
              aria-label="enter your username"
              placeholder="Enter your name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              // destructuring syntax
              onChange={({ target }) => setUsername(target.value)}
              // onChange={({ target }) => console.log(target.value)}
              value={username}
            />
            <input
              type="text"
              aria-label="enter your full name"
              placeholder="Enter your full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              // destructuring syntax
              onChange={({ target }) => setFullName(target.value)}
              // onChange={({ target }) => console.log(target.value)}
              value={fullName}
            />
            <input
              type="text"
              aria-label="Enter your Email address"
              placeholder="Enter your Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              // destructuring syntax
              onChange={({ target }) => setEmailAddress(target.value)}
              // onChange={({ target }) => console.log(target.value)}
              value={emailAddress}
            />
            <input
              type="password"
              aria-label="enter your full name"
              placeholder="password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              // destructuring syntax
              onChange={({ target }) => setPassword(target.value)}
              // onChange={({ target }) => console.log(target.value)}
              value={password}
            />
            <button
              type="submit"
              disabled={isInvalid}
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
            ${isInvalid && 'opacity-50'}`}
            >
              Sign up
            </button>
            <div className="flex flex-row justify-around items-center mt-6">
              <div className="flex h-0.5 w-28 bg-gray-primary"></div>
              <div className="flex font-normal text-gray-base">OR</div>
              <div className="flex h-0.5 w-28 bg-gray-primary"></div>
            </div>
            <div className="flex flex-row justify-center items-center mt-6">
              <button>
                <span>
                  <i className="fab fa-facebook-square text-blue-medium mr-2"></i>
                </span>
                <span className="font-medium text-blue-medium">
                  Login with facebook
                </span>
              </button>
            </div>
            {/* <div className="text-black text-xs flex justify-center items-center mt-6 mb-4">
              <Link to="/forgotpassword" className="font-thin">
                Forgot Password?
              </Link>
            </div> */}
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Have an account?{' '}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
