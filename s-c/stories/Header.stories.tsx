import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Header} from '../src';


const meta: Meta = {
  title: 'Header',
  component: Header,
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

const style= {

}

const css2obj = css => {
	
  const r = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g, o = {};
  css.replace(r, (m,p,v) => o[p] = v);
  return o;
	
}

console.log( css2obj("z-index: 4; opacity:1; transition-duration: 0.3s;") )

export default meta;


const Template: Story<React.ComponentProps<typeof Header>> = args => <Header {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
