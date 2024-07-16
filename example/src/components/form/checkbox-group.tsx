import * as React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { Flex, Text, Checkbox as RadixCheckbox, Box } from '@radix-ui/themes';

import Label from '../label';
import ErrorMessage from '../error-message';

export default function CheckboxGroup({ label, name, list }) {
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
          <Flex direction="column" gap="1">
            {list.map(item => {
              return (
                <Text as="label" key={item.value} size="2">
                  <Flex gap="2">
                    <RadixCheckbox
                      size="2"
                      variant="surface"
                      value={item.value}
                      checked={field.value.includes(item.value)}
                      onCheckedChange={() => {
                        if (field.value.includes(item.value)) {
                          const v = field.value.filter(v => v !== item.value);
                          field.onChange(v);
                        } else {
                          const v = [...field.value, item.value];
                          field.onChange(v);
                        }
                      }}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      {...(error && { color: 'red' })}
                    />
                    {item.label}
                  </Flex>
                </Text>
              );
            })}
          </Flex>
          {error && <ErrorMessage mt="1">{error.message}</ErrorMessage>}
        </Box>
      )}
    />
  );
}
