import { Button } from '@mui/material';
import FlexContainer from './FlexContainer';
import { useNavigate } from 'react-router-dom';
import { isValidSubmission } from '../scripts/validityChecker';
import { emptyLambda } from '../data/globals';

interface NavigatorProps {
  leftText: string;
  leftURL: string;
  rightText: string;
  rightURL: string;
  validationArr?: Array<string>;
  setError?: (value: boolean) => void;
}

export default function Navigator(props: NavigatorProps) {
  const { leftText, leftURL, rightText, rightURL, validationArr, setError } =
    props;

  const navigate = useNavigate();

  return (
    <FlexContainer
      top={5}
      flow="row"
      sx={{
        width: '20%',
        justifyContent: 'space-between',
      }}
    >
      <Button onClick={() => navigate(leftURL)}>{leftText}</Button>
      <Button
        onClick={() => {
          if (isValidSubmission(validationArr ?? [], setError ?? emptyLambda))
            navigate(rightURL);
        }}
      >
        {rightText}
      </Button>
    </FlexContainer>
  );
}
