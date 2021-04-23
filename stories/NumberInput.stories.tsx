import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { NumberInput} from '../src';
import { useCallback } from '@storybook/client-api';


const meta: Meta = {
  title: 'NumberInput',
  component: NumberInput,
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


const Template: Story<React.ComponentProps<typeof NumberInput>> = args => {
    const [val, setVal] = useState<number|undefined>();
    const getVal = useCallback(()=>{
        return val;
    },[val]);
return (

    <NumberInput
          label="label"
          value={getVal()}
          max={2000}
          min={0}
          decimals={6}
        //   outputUnit={subObj.unit ? subObj.unit : undefined}
        //   allowedUnits={
            // subObj.unit ? getAllowedUnitsFromBaseUnit(subObj.unit) : undefined
        //   }
          onChange={(e: any) => {
              console.log('change detected', e.target.value)
              setVal(e.target.value)
            }}
          {...args}
        />
);

};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
