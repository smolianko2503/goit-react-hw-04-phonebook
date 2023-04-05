import { useState, useEffect } from 'react';
import { Section } from './Section/Section';
import { Phonebook } from './Phonebook/Phonebook';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { GlobalStyle } from './GlobalStyle';
import { Container } from './App.styled';

export const App = () => {
  const getInitialRecipes = () => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      return parsedContacts;
    }
    return [];
  };

  const [contacts, setContacts] = useState(getInitialRecipes);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      setContacts(prevContacts => {
        return [...prevContacts, newContact];
      });
    }
  };

  const searchContact = evt => {
    setFilter(evt.target.value);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== contactId);
    });
  };

  return (
    <Container>
      <Section title={'Phonebook'} />
      <Phonebook onAddContact={addContact} filter={filter} />
      <Section title={'Contacts'} />
      <Filter filter={filter} onSearch={searchContact} />
      <ContactsList
        contacts={contacts}
        filter={filter}
        onDelete={deleteContact}
      />
      <GlobalStyle />
    </Container>
  );
};
