import * as React from 'react';

import { useFormContext } from 'react-hook-form';

import { Text, TextField as RadixTextField } from '@radix-ui/themes';

import Label from '../label';
import ErrorMessage from '../error-message';

export default function TextField({ label, name, placeholder }) {
  const { register, formState } = useFormContext();
  const error = formState.errors[name];
  return (
    <Text as="label" className="block w-100">
      <Label as="div" mb="1" error={error}>
        {label}
      </Label>
      <RadixTextField.Input
        autoComplete="off"
        placeholder={placeholder}
        {...register(name)}
        {...(error && { color: 'red' })}
      />
      {error && <ErrorMessage mt="1">{error.message}</ErrorMessage>}
    </Text>
  );
}
