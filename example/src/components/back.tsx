import * as React from 'react';

import { Button } from '@radix-ui/themes';

export default function Back({ children, onBack }) {
  return (
    <Button type="button" variant="outline" onClick={onBack}>
      {children}
    </Button>
  );
}
