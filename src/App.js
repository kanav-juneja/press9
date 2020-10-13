import React from 'react'
import Styled from 'styled-components'
import DropDown from './components/DropDown'

const StyledApp = Styled.main`
  .drop-down {
    position: absolute;
    top: 5em;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
`

export default () => (
	<StyledApp>
		<DropDown></DropDown>
	</StyledApp>
)
