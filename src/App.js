import React, { useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import Login from './Login.js';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';
import Users from './Users';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // The user is logged in
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.isAnonymous ? loginAsGuest()  : authUser.displayName,
          })
        );
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch]);

  function loginAsGuest() {
    while (true) {
      let input = prompt("Please choose a username")
      if (input !== '' && input.length >= 4) {
        return input
      } else if (input.length < 4) {
        alert("Name is to short!")
      }
    }
  }

  return (
    <div className="App">
      {user ? (
        <>
          <Sidebar />
          <Chat />
          <Users usr={user} /> 
        </>
      ) : (
          <Login />
        )}
    </div>
  );
}

export default App;
