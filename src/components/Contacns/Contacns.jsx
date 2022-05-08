import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useGetError, useGetStatus } from '../../redux/phonebookSlice';
import { StyledContacts } from './Contacns.styled';

const Contacts = ({ contacts, onDelete }) => {
  const status = useSelector(useGetStatus);
  const error = useSelector(useGetError);

  return (
    <StyledContacts>
      {status === 'pending' && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {status === 'fulfilled' && !error && <ul>
        {contacts?.map(({ name, phone, id }) => (
          <li key={id} id={id}>
            <span>
              <b>{name}</b> : {phone}
            </span>
            <button type="button" onClick={onDelete}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      }
    </StyledContacts>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
};

export default Contacts;
