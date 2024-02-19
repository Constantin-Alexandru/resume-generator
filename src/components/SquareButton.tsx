import { Button, SxProps } from '@mui/material';
import { ReactNode } from 'react';

interface SquareButtonProps {
  variant?: 'text' | 'outlined' | 'contained';
  color?:
    | 'inherit'
    | 'error'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning';
  size?: string;
  onClick?: () => void;
  sx?: SxProps;
  children: ReactNode;
}

export default function SquareButton(props: SquareButtonProps) {
  const { variant, color, size, onClick, sx, children } = props;
  return (
    <Button
      variant={variant ?? 'text'}
      color={color ?? 'primary'}
      onClick={onClick}
      sx={{
        ...sx,
        minWidth: size ?? '32px',
        aspectRatio: '1 / 1',
      }}
    >
      {children}
    </Button>
  );
}
