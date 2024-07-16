import * as React from 'react';

import { Box, Grid, Flex, Heading, Separator } from '@radix-ui/themes';

import './layout-form.css';

export default function LayoutForm({ heading, fields, buttons }) {
  return (
    <Box>
      <Heading size="3" trim="both">
        {heading}
      </Heading>
      <Separator size="4" className="layout-form__separator" />
      <Flex direction="column" gap="4" className="layout-form__fields">
        {fields}
      </Flex>
      <Grid columns={`${buttons.length}`} gap="4">
        {buttons}
      </Grid>
    </Box>
  );
}
