import React from 'react'
import ReactDOM from 'react-dom'

import {Text, Margin, Select} from '@ds.e/react'

import '@ds.e/scss/lib/Utilities.css'
// import '@ds.e/scss/lib/Text.css'
import '@ds.e/scss/lib/Margin.css'
import '@ds.e/scss/lib/global.css'
import '@ds.e/scss/lib/Select.css'

const options = [{
  label: 'Strict Black',
  value: 'strict-black'
}, {
  label: 'Heavenly Green',
  value: 'heavenly-green'
}, {
  label: 'Sweet Pink',
  value: 'pink'
}]

ReactDOM.render(
  <div style={{ padding: '40px' }}>
    {/* <Margin>
      <Text size="xs">This is some text</Text>
    </Margin> */}
    <Select options={options} />
    <p>this is some text</p>
  </div>
  , document.querySelector('#root')
)