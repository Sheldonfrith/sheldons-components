import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, Card, Header, Popup, TextInput} from '../src';


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

interface StoryProps {

}

const Template: Story<StoryProps> = args => (
    <>
    {/* <AppContainer> */}
        <Header>
            <h1>This is the header section</h1>
            <Button onClick={()=>{}}>These</Button>
            <Button onClick={()=>{}}>Are Some</Button>
            <Button onClick={()=>{}}>Buttons</Button>
        </Header>
        <Popup></Popup>
        <Card>
            <form>
                <h2>Show Popup With Content...</h2>
                {/* <TextInput id={} name={}></TextInput> */}
                {/* <Button submit></Button> */}
            </form>
        </Card>
        <Card>
            <form>
                <h2>Advanced Form</h2>
                <Card>
                {/* <TextInput></TextInput> */}
                {/* <Silder></Silder> */}
                {/* <MultiSelect></MultiSelect> */}
                {/* <SingleSelect></SingleSelect> */}
                {/* <Radio></Radio> */}
                {/* <Checkboxes></Checkboxes> */}

                </Card>
                <Card>
                {/* <Table></Table> */}
                </Card>
                {/* <Button submit></Button> */}
            </form>
        </Card>
        <Card>
            <h1>Prose, H1</h1>
            <p>
                This 
                is some 
                p text, <span>with a span.</span>
                and a <a>Link</a>.
                Here is <b>some bold text</b>.
                Here is <del>some deleted text</del>.
                Here is <em>some em text</em>.
                Here is <i>some italic text</i>.
            </p>
            <h3>Heading 3</h3> 
            <p> more 
                p text</p>
            <h4> Heading 4 </h4>
            <code>This is a code 
                section</code>
            <q> Inline quotation</q>
            <h5> Heading 5</h5>
            <blockquote>This 
                is a
                long 
                quote
            </blockquote>
            <h6> Heading 6 </h6>
            <details>This is a details section.</details> 
            <ol>
                <li>this is an </li>
                <li> ordered</li>
                <li>List</li>
            </ol>

        </Card>

    {/* </AppContainer> */}
    </>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
