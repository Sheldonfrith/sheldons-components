import React, {FormEvent, useState} from 'react';
import { Meta, Story } from '@storybook/react';
import {ExamplePage} from '../src/index';

const meta: Meta = {
  title: 'ExamplePage',
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

interface StoryProps {}

const Template: Story<StoryProps> = args => <ExamplePage {...args} />;
// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
