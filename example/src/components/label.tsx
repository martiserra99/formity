import * as React from 'react';

import { Text } from '@radix-ui/themes';

export default function Label({ children, error, ...props }) {
  return (
    <Text
      as="label"
      size="2"
      weight="medium"
      {...(error && { color: 'red' })}
      {...props}
    >
      {children}
    </Text>
  );
}
