import React, { useState } from 'react'
import Styled from 'styled-components'
import { CaretDown } from '@styled-icons/boxicons-regular'

const StyledDropDown = Styled.div`
    width: 14em;
    height: 2.5em;
    border: solid 1px #bfbfbf;
    border-radius: 4px;
    display: flex;
    align-items: center;
    user-select: none;

    .icon {
        width: 2em;
        color: #5d5d5d;
    }

    .placeholder {
        display: flex;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        align-items: center;
        padding: 0 1em;
        cursor: pointer;

        h6 {
            font-size: 1em;
        }

        .icon {
            position: relative;
            right: -0.5em
        }
    }
`

export default () => {
	const [data, setData] = useState({
		level_name: 'site',
		entries: [{ id: '1', name: 'SNN Greenbay', children: '' }],
	})

	return (
		<StyledDropDown className='drop-down'>
			<div className='placeholder'>
				<h6>Select Input</h6>
				<CaretDown className='icon' />
			</div>
		</StyledDropDown>
	)
}
