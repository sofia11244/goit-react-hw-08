import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setRefreshing } from '../redux/auth/slice';
import { setContacts } from '../redux/contacts/actions'; // Redux action'ı ekleyelim
import Layout from './Layout.jsx';
import { Routes, Route } from 'react-router-dom';
import { selectIsRefreshing } from '../redux/auth/selectors';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Registration from '../pages/Registration.jsx';
import Contacts from '../pages/Contacts.jsx';

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        dispatch(setRefreshing(true));

        const response = await fetch('https://connections-api.goit.global/contacts', {
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
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/contacts" component={<Login />} />}
        />
        <Route
          path="/register"
          element={<RestrictedRoute redirectTo="/contacts" component={<Registration />} />}
        />
        <Route
          path="/contacts"
          element={<PrivateRoute redirectTo="/login" component={<Contacts />} />}
        />
      </Routes>
    </Layout>
  );
};

export default App;
