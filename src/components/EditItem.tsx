import { Button, Paper, Typography } from '@mui/material';
import FlexContainer from './FlexContainer';
import InputField from './InputField';
import { useState } from 'react';
import { emptyFieldError } from '../data/globals';

interface EditItemProps {
  item: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClose?: () => void;
}

export default function EditItem(props: EditItemProps) {
  const { item, onChange, onSubmit, onClose } = props;

  const [_item, setItem] = useState<string>(item);
  const [error, setError] = useState<boolean>(false);

  return (
    <Paper
      sx={{
        position: 'absolute',
        width: '50%',
        height: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '25px',
      }}
    >
      <FlexContainer>
        <FlexContainer top={5}>
          <Typography variant="h4">Edit Field</Typography>
        </FlexContainer>
        <FlexContainer top={5} gap={5}>
          <InputField
            label="Value"
            value={_item}
            onChange={(value: string) => {
              setItem(value);

              if (onChange) onChange(value);
            }}
            error={error}
            errorText={emptyFieldError}
            required
          />
        </FlexContainer>

        <FlexContainer
          top={10}
          flow="row"
          sx={{
            justifyContent: onClose ? 'space-around' : 'flex-end',
            width: '30%',
          }}
        >
          {onClose && <Button onClick={() => onClose()}>Close</Button>}
          <Button
            onClick={() => {
              if (!onSubmit) return;

              if (_item === '') {
                setError(true);
                return;
              }
              onSubmit(_item);
              onClose && onClose();
            }}
          >
            Save
          </Button>
        </FlexContainer>
      </FlexContainer>
    </Paper>
  );
}
