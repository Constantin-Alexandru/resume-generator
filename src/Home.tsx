import { Button, Link, Typography } from '@mui/material';
import 'normalize.css';
import useData from './data/useData';
import { useNavigate } from 'react-router-dom';
import FlexContainer from './components/FlexContainer';
import Title from './components/Title';

export default function Home() {
  const navigate = useNavigate();

  const { completed } = useData();

  if (completed) navigate('/resume-generator');

  return (
    <FlexContainer top={10}>
      <FlexContainer>
        <Title>Resume Generator</Title>
        <Typography
          variant="h5"
          sx={{
            alignSelf: 'flex-end',
          }}
        >
          Made by{' '}
          <Link
            href="https://constantin-alexandru.github.io/Portfolio-Website/"
            target="_blank"
          >
            Alex Constantin
          </Link>
        </Typography>
      </FlexContainer>

      <FlexContainer top={20} gap={5}>
        <Typography sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
          No data found on the browser to generate your resume. You can either:
        </Typography>

        <Button sx={{ fontWeight: 'bold' }} variant="contained">
          Load from file
        </Button>
        <Typography variant="h5">OR</Typography>
        <Button
          sx={{ fontWeight: 'bold' }}
          variant="contained"
          onClick={() => {
            navigate('/personal-details');
          }}
        >
          Create Resume
        </Button>
      </FlexContainer>
    </FlexContainer>
  );
}
