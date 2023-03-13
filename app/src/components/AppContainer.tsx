import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Breakpoint, useMediaQuery } from '@mui/material';
import { AppHeader } from 'src/components/AppHeader';
import { AppFooter } from 'src/components/AppFooter';

export const AppContainer = ({
  children,
  maxWidth,
}: {
  children: React.ReactNode;
  maxWidth?: Breakpoint;
}) => {
  const isWeb = useMediaQuery('(min-width:600px)');

  return (
    <Container style={{padding: 0}} maxWidth={maxWidth ?? false}>
      <Box sx={{padding: 0}}>
        <AppHeader title='Hacker News' />
          {children}
        {isWeb && <AppFooter />}
      </Box>
    </Container>
  );
};
