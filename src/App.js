import React from 'react'
import Styled from 'styled-components'
import DropDown from './components/DropDown'

const StyledApp = Styled.main`
  .drop-down {
    position: absolute;
    top: 5em;
    left: 5em;
  }
`

export default () => (
	<StyledApp>
		<DropDown></DropDown>
	</StyledApp>
)
