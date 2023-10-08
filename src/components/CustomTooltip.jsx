import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

/* eslint-disable react/prop-types */
function CustomTooltip({ children, title }) {
  return (
    <Tooltip  
      title={title}
      position="bottom"
      arrow={true}
      delay={200}
      animation="scale"
      hideDelay={0}
      tag="span">
      {children}
    </Tooltip>
  );
}

export default CustomTooltip;
