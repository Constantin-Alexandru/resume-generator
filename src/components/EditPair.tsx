import { Button, Paper, Typography } from '@mui/material';
import Pair, { createPair } from '../data/interfaces/Pair';
import FlexContainer from './FlexContainer';
import InputField from './InputField';
import { useState } from 'react';
import { emptyFieldError } from '../data/globals';

interface EditPairProps {
  pair: Pair;
  onChange?: (value: Pair) => void;
  onSubmit?: (value: Pair) => void;
  onClose?: () => void;
}

export default function EditPair(props: EditPairProps) {
  const { pair, onChange, onSubmit, onClose } = props;

  const [item, setItem] = useState<Pair>(pair);
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
            label="Key"
            value={item.key}
            onChange={(value: string) => {
              setItem(createPair(value, item.value));

              if (onChange) onChange(createPair(value, pair.value));
            }}
            error={error}
            errorText={emptyFieldError}
            required
          />
          <InputField
            label="Value"
            value={item.value}
            onChange={(value: string) => {
              setItem(createPair(item.key, value));

              if (onChange) onChange(createPair(pair.key, value));
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

              if (item.key === '' || item.value === '') {
                setError(true);
                return;
              }
              onSubmit(item);
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
