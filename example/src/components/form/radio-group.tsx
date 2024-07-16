import * as React from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Box,
  Flex,
  Text,
  RadioGroup as RadixRadioGroup,
} from '@radix-ui/themes';

import Label from '../label';
import ErrorMessage from '../error-message';

export default function RadioGroup({ label, name, list }) {
  const { control, formState } = useFormContext();
  const error = formState.errors[name];
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Box>
          <Label mb="1" className="block w-100" error={error}>
            {label}
          </Label>
          <RadixRadioGroup.Root
            value={field.value}
            onBlur={field.onBlur}
            onValueChange={value => field.onChange(value)}
            ref={field.ref}
          >
            <Flex direction="column" gap="1">
              {list.map((item, index) => (
                <Text
                  as="label"
                  key={index}
                  size="2"
                  {...(error && { color: 'red' })}
                >
                  <Flex gap="2">
                    <RadixRadioGroup.Item value={item.value} />
                    {item.label}
                  </Flex>
                </Text>
              ))}
            </Flex>
          </RadixRadioGroup.Root>
          {error && <ErrorMessage mt="1">{error.message}</ErrorMessage>}
        </Box>
      )}
    />
  );
}
