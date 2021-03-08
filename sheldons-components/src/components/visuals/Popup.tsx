import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';

interface PopupProps{

}
const Popup: React.FunctionComponent<PopupProps> =({
    children
})=> {

return (
<div>
    {children}
</div>
);
}
export default Popup;
