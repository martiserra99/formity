import * as React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { Flex, Text, Slider as RadixSlider } from '@radix-ui/themes';

import Label from '../label';
import ErrorMessage from '../error-message';

export default function Range({
  label,
  name,
  min = 0,
  max = 100,
  step = 1,
  minStepsBetweenThumbs = 1,
}) {
  const { control, formState } = useFormContext();
  const error = formState.errors[name];
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Text as="label" className="block w-100">
          <Flex justify="between">
            <Label as="div" mb="1" error={error}>
              {label}
            </Label>
            <Text size="2">{field.value.join(' - ')}</Text>
          </Flex>
          <RadixSlider
            value={field.value}
            onValueChange={value => field.onChange(value)}
            onBlur={field.onBlur}
            ref={field.ref}
            min={min}
            max={max}
            step={step}
            minStepsBetweenThumbs={minStepsBetweenThumbs}
            {...(error && { color: 'red' })}
          />
          {error && <ErrorMessage mt="1">{error.message}</ErrorMessage>}
        </Text>
      )}
    />
  );
}
