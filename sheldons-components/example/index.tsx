import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Select, Button, Card, TextInput } from '../src/index';
import { ThemeProvider } from 'styled-components';
import theme from '../src/lib/theme';
import { SelectTypes } from '../src/components/inputs/Select';
const App = () => {

  const [selectedOptions, setSelectedOptions] = React.useState<any>(null);
  function handleChange(option){
    setSelectedOptions(option);
  }
  return (
    <ThemeProvider theme={theme}>
    <div>
      <h2> Testing out theme</h2>
      <Button >Text here</Button>
    </div>
    <Card>
      <h3> second section: </h3>
      <TextInput></TextInput>
      <Select
        options={[
          {id: 1, value: 1, content: "Option 1"},
          {id: 2, value: 2, content: "Option 2"}
        ]}
        onChange={handleChange}
        selectedOptions={selectedOptions}
        type={SelectTypes.Multi}
      ></Select>
    </Card>

    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
