import * as React from 'react';

import { Text } from '@radix-ui/themes';

export default function ErrorMessage({ children, ...props }) {
  return (
    <Text as="p" size="2" color="red" {...props}>
      {children}
    </Text>
  );
}
