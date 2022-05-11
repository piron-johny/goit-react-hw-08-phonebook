import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { fetchUser } from 'redux/api';
import { useGetIsCurrentUser } from 'redux/authSlice';
import LiginForm from './LiginForm/LiginForm';
import MenuAppBar from './NavBar';
import Phonebook from './Phonebook';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';
import RegisterForm from './RegisterForm';

const App = () => {
  const dispatch = useDispatch();
  const current = useSelector(useGetIsCurrentUser);

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
    <>
      <MenuAppBar />
      {!current && <Routes>
        <Route path='/' element={<PublicRoute><LiginForm /></PublicRoute>} />
        <Route path='/signup' element={<PublicRoute><RegisterForm /></PublicRoute>} />
        <Route path='/phonebook' element={<PrivateRoute><Phonebook /></PrivateRoute>} />
      </Routes>}
    </>
  );
};

export default App;
