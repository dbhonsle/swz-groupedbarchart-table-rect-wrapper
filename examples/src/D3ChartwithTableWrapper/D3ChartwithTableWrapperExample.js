import * as React from 'react';
import D3ChartwithTableWrapper from '../../../src/components/D3ChartwithTableWrapper/D3ChartwithTableWrapper';
import withConfig from '../withConfig';
import './D3ChartwithTableWrapperExample.css';

const D3ChartwithTableWrapperExample = (props) => (
    <D3ChartwithTableWrapper
        {...props}
    />
);

export default withConfig(D3ChartwithTableWrapperExample);