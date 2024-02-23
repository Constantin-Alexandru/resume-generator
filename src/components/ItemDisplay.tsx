import { SxProps, Typography } from '@mui/material';
import FlexContainer from './FlexContainer';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SquareButton from './SquareButton';

interface ItemDisplayProps {
  index?: number;
  item: string;
  sx?: SxProps;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ItemDisplay(props: ItemDisplayProps) {
  const { index, item, onEdit, onDelete, sx } = props;

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
        <Typography>{item}</Typography>
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
