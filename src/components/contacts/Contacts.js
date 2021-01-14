import React, { useContext, useState, useEffect, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItems';
import Loader from '../layout/Loader';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, loading, getContacts } = contactContext;
  const [contactsShown, setContactsShown] = useState([]);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    getContacts();
    setContactsShown(contacts);
  }, []);

  const filterContacts = (e) => {
    setFilter(e.target.value.length > 0 ? true : false);
    let filteredContacts = contacts.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(e.target.value) ||
        contact.email.toLowerCase().includes(e.target.value)
      );
    });
    setContactsShown(filteredContacts);
  };

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h2>Please add a contact</h2>;
  }

  return (
    <Fragment>
      <input
        type="text"
        onChange={(e) => filterContacts(e)}
        placeholder="Search Contacts"
      />
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {(filter ? contactsShown : contacts).map((contact) => (
            <CSSTransition key={contact._id} timeout={500} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default Contacts;
