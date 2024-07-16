// import * as React from 'react';

// import { Formity } from '../../..';

// import components from './components';
// import schema from './schema';

// import Form from './form';

// export default function Example() {
//   const handleSubmit = React.useCallback(() => {}, []);

//   return (
//     <Formity
//       components={components}
//       form={Form}
//       schema={schema}
//       onSubmit={handleSubmit}
//     />
//   );
// }

import * as React from 'react';

import Center from '../components/center';
import Card from '../components/card';
import Result from '../components/result';

export default function Example() {
  return (
    <Center>
      <Card>
        <Result result={[{ a: '1' }]} />
      </Card>
    </Center>
  );
}
