import { Box, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createContact } from 'redux/api';
import { useGetContacts } from 'redux/phonebookSlice';

const Form = ({setOpen}) => {
  const dispatch = useDispatch();
  const contacts = useSelector(useGetContacts);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get('name');
    const number = form.get('number');
    const contact = { name, number };

    const isIncludesName = contacts.find(
      contact => contact?.name?.toLowerCase() === name.toLowerCase()
    );

    if (isIncludesName) {
      return alert(`${name} is already is contacts`);
    }
    
    dispatch(createContact(contact));
    setOpen(false);
    e.target.reset()
    // navigate('/phonebook', { replace: true })
  }

  return (
    <>
      <Box
        component='form'
        onSubmit={handleSubmit}
        noValidate
        sx={{
          width: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          m: '10px auto'
        }}
      >
        <TextField
          id='name'
          name='name'
          label='Name'
          fullWidth
          sx={{ marginY: 1 }}
        />
        <TextField
          id='number'
          name='number'
          label='Phone'
          fullWidth
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
        <Button
          type='submit'
          variant='contained'
          fullWidth
          sx={{ marginY: 1 }}
        >
          Send
        </Button>
      </Box>
    </>
  );
};

export default Form;
