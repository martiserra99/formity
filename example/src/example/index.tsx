import * as React from 'react';

import { Formity } from '../../..';

import components from './components';
import schema from './schema';

import Form from './form';

export default function Example() {
  const handleSubmit = React.useCallback(() => {}, []);

  return (
    <Formity
      components={components}
      form={Form}
      schema={schema}
      onSubmit={handleSubmit}
    />
  );
}
