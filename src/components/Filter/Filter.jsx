import { TextField } from '@mui/material';
import PropeTypes from 'prop-types';

const Filter = ({ filterChange, value }) => {
  return (
      <TextField
        label="Find by name"
        variant="outlined"
        value={value}
        onChange={filterChange}
        fullWidth
        sx={{mb: 2}}
      />
  );
};

Filter.propTypes = {
  filterChange: PropeTypes.func,
  value: PropeTypes.string,
};

export default Filter;
