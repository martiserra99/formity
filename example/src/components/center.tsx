import * as React from 'react';

import { Box } from '@radix-ui/themes';

import './center.css';

export default function Center({ children }) {
  return (
    <Box className="center__box" p="4">
      {children}
    </Box>
  );
}
