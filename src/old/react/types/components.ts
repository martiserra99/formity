import { Expry } from 'expry';

import Params from './params';

type Components<T extends Params> = {
  [K in keyof T]: (
    values: T[K],
    render: (schema: Expry) => React.ReactElement
  ) => React.ReactElement;
};

export default Components;
