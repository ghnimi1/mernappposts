import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Accueil from './pages/Accueil';
import { useEffect } from 'react';
import { fetchUsers } from './redux/actions/userActions/fetchUsers';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <ProtectedRoute exact path='/accueil' component={Accueil} />
        <ProtectedRoute exact path='/:id/profile' component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
