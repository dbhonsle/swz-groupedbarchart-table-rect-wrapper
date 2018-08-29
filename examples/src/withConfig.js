import * as React from 'react';

const CONTAINER = __CONTAINER__ || 'chart'; // eslint-disable-line
const DATA = __DATA__ || generateData();

function withConfig(WrappedComponent) {
    return class extends React.PureComponent {
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    container={CONTAINER} 
                    data={DATA}
                />
            );
        }
    };
}

function generateData() {
            let uBounds = Math.round((Math.random() * 10));
            if (uBounds === 0) {uBounds = 1}
            let products = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].slice(0, uBounds);
            let gdata = [];
            let Quantity1 = 0;
            let numValues = Math.round(Math.random() * 5);
            if (numValues === 0) {numValues = 1}
            for (let i = 0; i < products.length; i++) {
              Quantity1 = Math.floor(Math.random() * 10000);
              gdata.push(
                {
                  index: products[i],
                  id: Math.round(Math.random() * 16000),
                  values: [
                    {
                      name: 'Product1',
                      value: Quantity1,
                      leftAxis: true
                    },
                    {
                      name: 'Product2',
                      value: Math.round((Quantity1 * 1.1)),
                      leftAxis: true
                    },
                    {
                      name: 'Product3',
                      value: Math.round((Quantity1 * 1.2)),
                      leftAxis: true
                    },
                    {
                      name: 'Product4',
                      value: Math.round((Quantity1 * 1.3)),
                      leftAxis: true
                    },
                    {
                      name: 'Product5',
                      value: Math.round((Quantity1 * 1.1)),
                      leftAxis: true
                    }
                  ].slice(0, numValues)
                }
              );
            }
            return gdata;
          }

export default withConfig;