import { Theme } from '@emotion/react';
import { Box, SxProps } from '@mui/material';
import { ReactNode } from 'react';

interface FlexContainerProps {
  top?: number;
  gap?: number;
  flow?: 'column' | 'row';
  sx?: SxProps<Theme>;
  children?: ReactNode;
}

export default function FlexContainer(props: FlexContainerProps) {
  const { sx, children, flow, top, gap } = props;

  return (
    <Box
      sx={{
        ...sx,
        display: 'flex',
        flexFlow: flow ?? 'column',
        alignItems: 'center',
        marginTop: top ?? 0,
        gap: gap ?? 0,
      }}
    >
      {children}
    </Box>
  );
}
