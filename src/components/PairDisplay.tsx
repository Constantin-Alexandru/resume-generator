import { SxProps, Typography } from '@mui/material';
import Pair from '../data/interfaces/Pair';
import FlexContainer from './FlexContainer';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SquareButton from './SquareButton';

interface PairDisplayProps {
  index?: number;
  pair: Pair;
  sx?: SxProps;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PairDisplay(props: PairDisplayProps) {
  const { index, pair, onEdit, onDelete, sx } = props;

  return (
    <FlexContainer
      flow="row"
      sx={{
        ...sx,
        justifyContent: 'space-between',
        backgroundColor: 'grey.900',
        padding: 2,
        borderRadius: 2.5,
      }}
    >
      <FlexContainer flow="row">
        {index && <Typography>{index}.&nbsp;</Typography>}
        <Typography sx={{ fontWeight: 'bold' }}>{pair.key}:&nbsp;</Typography>
        <Typography>{pair.value}</Typography>
      </FlexContainer>
      <FlexContainer flow="row">
        <SquareButton
          onClick={() => {
            onEdit();
          }}
        >
          <EditIcon />
        </SquareButton>
        <SquareButton
          onClick={() => {
            onDelete();
          }}
          color="error"
        >
          <CloseIcon />
        </SquareButton>
      </FlexContainer>
    </FlexContainer>
  );
}
