import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Dashboard from './components/dashboard/dashboard';
import { loadAllComments } from './store/comments';
import { loadAllPosts } from './store/posts';
import UserProfile from './components/UserProfile/UserProfile'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate()).then(() => setLoaded(true))
      await dispatch(loadAllPosts());
      await dispatch(loadAllComments());
    })();
  }, [dispatch, loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <NavBar />
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path='/user/:id' exact={true} >
          <NavBar />
          <UserProfile />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
