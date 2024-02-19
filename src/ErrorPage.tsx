import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  ErrorResponse,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: 10,
        }}
      >
        <Typography variant="h1">
          ERROR {error.status} - {error.statusText}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }} variant="h4">
          {error.data}
        </Typography>
        <Button variant="contained">
          <Link
            style={{
              textDecoration: 'none',
              color: 'background',
              fontWeight: 'bold',
            }}
            to="/"
          >
            Go to Home Page
          </Link>
        </Button>
      </Box>
    );
  } else {
    return (
      <Box>
        <Typography variant="h1">ERROR</Typography>
      </Box>
    );
  }
}
