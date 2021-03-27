import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button} from '../src';
import { BaseStylesProp } from '../src/lib/typeHelpers';



const meta: Meta = {
  title: 'Button',
  component: Button,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const testStyles = {
  main: {
    partial: true,
    tailwind: ['bg-red-400']
  }
}

const Template: Story<React.ComponentProps<typeof Button>> = args => <Button {...args} styles={testStyles}/>;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
