import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createContact, deleteContact, fetchContacts } from '../redux/api';
import { setFilter, useGetContacts, useGetFilter } from '../redux/phonebookSlice';
import Contacts from './Contacns';
import Filter from './Filter';
import Form from './Form';
import Section from './Section';

const App = () => {
  const contacts = useSelector(useGetContacts);
  const filter = useSelector(useGetFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts())
    
  }, [dispatch]);

  const handleContact = userData => {
    let inputName = userData.name;
    const isIncludesName = contacts.find(
      contact => contact?.name?.toLowerCase() === inputName.toLowerCase()
    );

    if (isIncludesName) {
      return alert(`${inputName} is already is contacts`);
    }

    dispatch(createContact(userData));
  };

  const handleFilterChange = e => {
    const { value } = e.currentTarget;
    dispatch(setFilter(value));
  };

  const handlesFilterOfContacts = () => {
    const value = filter.toLowerCase();
    const searchContact = contacts.filter(contact =>
      contact.name.toLowerCase().includes(value)
    );
    return searchContact;
  };

  const handleDeleteContact = e => {
    const contactId = e.currentTarget.parentNode.id;
    dispatch(deleteContact(contactId));
  };

  const contactsList = handlesFilterOfContacts();

  return (
    <Section title="Phonebook">
      <Form onSubmit={handleContact} />
      <h2>Contacts</h2>
      <Filter value={filter} filterChange={handleFilterChange} />
      <Contacts contacts={contactsList} onDelete={handleDeleteContact} />
    </Section>
  );
};

export default App;
