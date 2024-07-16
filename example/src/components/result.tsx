import * as React from 'react';

export default function Result({ result }) {
  return <pre>{JSON.stringify(result, null, 2)}</pre>;
}
