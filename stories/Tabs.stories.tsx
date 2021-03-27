import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, Card, Tabs} from '../src';



const meta: Meta = {
  title: 'Tabs',
  component: Tabs,
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

const testOptions = [
    {
        id: "option1",
        navTabContent: "Option 1",
        tabContent: <Card><Button  onClick={()=>{}}>Tab content 1</Button></Card>
    },
    {
        id: "option2",
        navTabContent: "Option 2",
        tabContent: <div>This is <div>the content section</div> of the component</div>
    }];

const Template: Story<React.ComponentProps<typeof Tabs>> = args => <Tabs {...args} tabs={testOptions} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
