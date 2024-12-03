import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setRefreshing } from '../redux/auth/slice';
import { setContacts } from '../redux/contacts/actions'; // Redux action'ı ekleyelim
import Layout from './Layout.jsx';
import { Routes, Route } from 'react-router-dom';
import { selectIsRefreshing } from '../redux/auth/selectors';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute.jsx';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Registration from '../pages/Registration.jsx';
import Contacts from '../pages/Contacts.jsx';
// import { selectIsLoggedIn, fetchUser } from '../redux/auth/selectors';
import axios from 'axios';

const App = () => {
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        dispatch(setRefreshing(true));
        axios.defaults.baseURL = 'https://connections-api.goit.global/';
        const response = await axios.get('{{url}}/contacts', {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Token'ı yerel depodan al
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }

        const data = await response.json();

        // Veriyi Redux'a gönder
        dispatch(setContacts(data)); // Redux'a veriyi gönderiyoruz
        console.log('Contacts data:', data);
      } catch (error) {
        console.error('Error fetching contacts:', error.message);
      } finally {
        dispatch(setRefreshing(false));
      }
    };

    fetchContacts();
  }, [dispatch]);

  return isRefreshing ? (
    <p>Loading...</p>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Routes>
      <Route
        path="/login"
        element={<PublicRoute element={<Login />} restricted={false} redirectTo="/" />}
      />
      <Route
        path="/register"
        element={<PublicRoute element={<Registration />} restricted={false} redirectTo="/" />}
      />
    </Routes>

        <Route
          path="/contacts"
          element={<PrivateRoute redirectTo="/login" component={<Contacts />} />}
        />
      </Routes>
    </Layout>
  );
};

export default App;
