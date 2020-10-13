import React, { useState, useEffect } from 'react'
import Styled from 'styled-components'
import { CaretDown, CaretUp } from '@styled-icons/boxicons-regular'

const StyledDropDown = Styled.div`
    width: 14em;
    height: 2.5em;
    border: solid 1px #bfbfbf;
    border-radius: 4px;
    display: flex;
    align-items: center;
    user-select: none;
    position: relative;
    box-sizing: border-box;

    .icon {
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
            width: 1.8em;
            position: relative;
            right: -0.5em
        }
    }

    .DropDown {
        width: calc(100% + 2px);
        height: fit-content;
        list-style: none;
        box-sizing: border-box;
        padding: 0;
        border: solid 1px #bfbfbf;
        display: flex;
        flex-direction: column;
        border-radius: 4px;
        position: absolute;
        top: 2em;
        left: -1px;

        li {
            border-bottom: solid 1px #bfbfbf;
            padding-left: 1em;
            box-sizing: border-box;
            line-height: 2.5em;
            cursor: pointer;

            &:hover {
                background: #5d5e5d;
                color: #FFF;
            }

            &:last-child {
                border: none;
            }
        }
    }
`

export default () => {
	const [data, setData] = useState({
		level_name: 'site',
		entries: [
			{
				id: '1',
				name: 'SNN Greenbay',
			},
			{
				id: '2',
				name: 'SMM Yellowbay',
			},
			{
				id: '3',
				name: 'SLL Orangebay',
			},
		],
	})

	const [active, setActive] = useState(false)
	const [activeItem, setActiveItem] = useState({
		level: undefined,
		entry: undefined,
	})

	useEffect(() => {
        document.addEventListener('click', () => closeDropDown())
        return document.removeEventListener('click', () => closeDropDown())
	})

	const closeDropDown = () => setActive(false)

	const handleDropdownClick = (level, entry) => {
        closeDropDown()
        setActiveItem({ level, entry })
	}

	const DropDown = ({ list }) => {
		if (!list?.entries || !active) return <span />
		const { level_name, entries } = list
		return (
			<ul className='DropDown'>
				{list.entries.map((e) => (
					<li key={e.id} onClick={() => handleDropdownClick(level_name, e)}>
						{e.name}
					</li>
				))}
			</ul>
		)
	}

	const noBubbling = (event) => {
		if (!event) return
		event.preventDefault && event.preventDefault()
		event.stopPropagation && event.stopPropagation()
		event.nativeEvent &&
			event.nativeEvent.stopImmediatePropagation &&
			event.nativeEvent.stopImmediatePropagation()
	}

	return (
		<StyledDropDown className='drop-down' onClick={(e) => noBubbling(e)}>
			<div className='placeholder' onClick={() => setActive(!active)}>
                <h6>{!activeItem?.entry?.id ? 'Select Input' : activeItem?.entry?.name}</h6>
				{!active && <CaretDown className='icon' />}
				{active && <CaretUp className='icon' />}
			</div>
			<DropDown list={data} />
		</StyledDropDown>
	)
}
