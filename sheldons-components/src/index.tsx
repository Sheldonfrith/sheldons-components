import * as React from 'react';

interface ButtonProps {
  content: any,
}
// Delete me
export const Button: React.FunctionComponent<ButtonProps> = ({
  content
}) => {
  return <button>{content}</button>;
};
