import { Typography } from '@mui/material';

interface TitleProps {
  children: string;
}

export default function Title(props: TitleProps) {
  return <Typography variant="h1">{props.children}</Typography>;
}
