import React from 'react';

interface CardProps{

}
const Card: React.FunctionComponent<CardProps> =({
    children
})=> {

return (
<div>
    {children}
</div>
);
}
export default Card;
