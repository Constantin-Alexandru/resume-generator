import { Button, SxProps, Typography } from '@mui/material';
import FlexContainer from './FlexContainer';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SquareButton from './SquareButton';

interface ItemButtonDisplayProps {
  index?: number;
  item: string;
  sx?: SxProps;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ItemButtonDisplay(props: ItemButtonDisplayProps) {
  const { index, item, onClick, onEdit, onDelete, sx } = props;

  return (
    <FlexContainer
      flow="row"
      sx={{
        ...sx,

        backgroundColor: 'grey.900',
        borderRadius: 2.5,
        padding: 2,
      }}
    >
      <FlexContainer
        flow="row"
        sx={{
          width: '80%',
        }}
      >
        <Button
          onClick={onClick}
          sx={{
            color: 'text.primary',
            width: '100%',
            justifyContent: 'flex-start',
            textTransform: 'none',
          }}
        >
          {index && <Typography>{index}.&nbsp;</Typography>}
          <Typography>{item}</Typography>
        </Button>
      </FlexContainer>
      <FlexContainer
        flow="row"
        sx={{
          width: '20%',
        }}
      >
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
