import * as React from 'react';

import { Button as RadixButton } from '@radix-ui/themes';

export default function Button({ children }) {
  return (
    <RadixButton type="submit" variant="solid">
      {children}
    </RadixButton>
  );
}
