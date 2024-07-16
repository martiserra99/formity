import * as React from 'react';

import { Card as RadixCard } from '@radix-ui/themes';

import './card.css';

export default function Card({ children }) {
  return (
    <RadixCard size="3" variant="surface" className="card__card">
      <div className="card__content">{children}</div>
    </RadixCard>
  );
}
