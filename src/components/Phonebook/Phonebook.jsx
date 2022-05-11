import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createContact, deleteContact, fetchContacts } from '../../redux/api';
import { setFilter, useGetContacts, useGetFilter } from '../../redux/phonebookSlice';
import Contacts from '../Contacns';
import Filter from '../Filter';
import Form from '../Form';
import Section from '../Section';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Phonebook = () => {
  const [open, setOpen] = useState(false);
  const contacts = useSelector(useGetContacts);
  const filter = useSelector(useGetFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts())

  }, [dispatch]);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const contactsList = handlesFilterOfContacts();

  return (
    <>
      <div style={{ position: 'fixed', bottom: 40, right: 40 }}>
        <Button variant='contained' onClick={handleOpen}>ADD</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: 'center' }}
            >
              Add contact
            </Typography>
            <Form setOpen={setOpen}/>
          </Box>
        </Modal>
      </div>
      <Section>
        <Filter value={filter} filterChange={handleFilterChange} />
        <Contacts contacts={contactsList} onDelete={handleDeleteContact} />
      </Section>
    </>
  )
}

export default Phonebook