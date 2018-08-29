import * as React from 'react';
import D3ChartwithTableWrapper from '../../../src/components/D3ChartwithTableWrapper/D3ChartwithTableWrapper';
import withConfig from '../withConfig';

const ContentExplorerExample = (props) => (
    <D3ChartwithTableWrapper
        {...props}
    />
);

export default withConfig(D3ChartwithTableWrapperExample);