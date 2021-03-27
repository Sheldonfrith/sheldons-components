import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Select} from '../src';
import { SelectTypes } from '../src/components/inputs/Select';
import { useState } from '@storybook/client-api';



const meta: Meta = {
  title: 'Select',
  component: Select,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    options: {
        control:{
            type: 'object'
        }
    }
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const props = {
    type: "styled",
    options: [
        {id: 1, value:1, content: "option 1"},
        {id: 2, value: 2, content: "option 2"},
        {id: 3, value: 3, content: "option 3"},
    ],
}

const Template: Story<React.ComponentProps<typeof Select>> = args => {
    const [selectedOption, setSelectedOption] = useState(null);
    const onChange= (newOption)=>{
        console.log('selected option change');
        setSelectedOption(newOption)
    }
    return (
    <Select {...props} {...args} selected={selectedOption} onChange={onChange}  />
    );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
