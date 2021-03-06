import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export const Footer: React.FC = () => (
  <Typography variant="body2" color="text.secondary" align="center">
    {'Copyright © '}
    <MuiLink color="inherit" href="https://mui.com/">
      pending
    </MuiLink>{' '}
    {new Date().getFullYear()}.
  </Typography>
);
