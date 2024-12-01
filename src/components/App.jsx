import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setRefreshing } from '../redux/auth/slice';
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
    const refreshUserState = async () => {
      try {
        dispatch(setRefreshing(true));
  
        // Kullanıcı verilerini yenilemek için API çağrısı
        const response = await fetch('https://connections-api.goit.global/users/current', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Token'ı yerel depodan al
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const data = await response.json();
  
        // Kullanıcı bilgilerini redux store'a ekleyebilirsin
        console.log('User data:', data);
        // Örneğin: dispatch(yourSetUserAction(data));
      } catch (error) {
        console.error('Error refreshing user:', error.message);
      } finally {
        dispatch(setRefreshing(false));
      }
    };
  
    refreshUserState();
  }, [dispatch]);
  

  return isRefreshing ? (
    <p>Loading...</p>
  ) : (
    // function App() {
    //   const dispatch = useDispatch();
    //   const contacts = useSelector((state) => state.contacts.items);
    //   const searchValue = useSelector((state) => state.filters.nameFilter);
    
    //   const handleAddContact = (newContact) => {
    //     dispatch(addContact(newContact));
    //   };
    
    //   const handleSearchChange = (e) => {
    //     dispatch(changeFilter(e.target.value));
    //   };
    
    //   const filteredContacts = contacts.filter((contact) =>
    //     contact.name.toLowerCase().includes(searchValue.toLowerCase())
    //   );


    // <div>
    //   <h1>Phonebook</h1>
    //   <ContactForm onAddContact={handleAddContact} />
    //   <SearchBox inputValue={searchValue} handleChange={handleSearchChange} />
    //   <ContactList contacts={filteredContacts} />
    // </div>
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
