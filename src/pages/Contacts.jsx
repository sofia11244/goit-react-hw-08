import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../redux/contacts/operations.js';
import ContactForm from '../components/ContactForm.jsx';
import ContactList from '../components/ContactList.jsx';
import Filter from '../components/Filter.jsx';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters.nameFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);


  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase()) // Filtreyi kontaklar üzerinde uyguluyoruz
  );

  
  return (
    <div>
      <h2>Contacts</h2>
      <ContactForm />
      <Filter />
      <ContactList contacts={filteredContacts} />
    </div>
  );
};

export default Contacts;
