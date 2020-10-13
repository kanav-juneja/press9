import React, { useState, useEffect } from 'react'
import Styled from 'styled-components'
import {
	CaretDown,
	CaretUp,
	CaretRight,
	CaretLeft,
} from '@styled-icons/boxicons-regular'

const getData = () => {
	const data = {
		level_name: 'site',
		entries: [
			{
				id: '1',
				name: 'SNN Greenbay',
			},
			{
				id: '2',
				name: 'SMM Yellowbay',
				children: {
					level_name: 'Zone',
					entries: [
						{
							id: '4',
							name: 'Zone 1',
						},
						{
							id: '5',
							name: 'Zone 2',
							children: {
								level_name: 'Building',
								entries: [
									{
										id: '6',
										name: 'Building 1',
									},
									{
										id: '7',
										name: 'Building 2',
									},
								],
							},
						},
					],
				},
			},
			{
				id: '3',
				name: 'SLL Orangebay',
			},
		],
	}
	return new Promise((resolve) => setTimeout(resolve(data), 500))
}

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
        &.caret {
            width: 1.8em;
        }
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
            display: flex;
            justify-content: space-between;
            padding-right: 0.4em;

            &.back {
                flex-direction: row-reverse;
                justify-content: flex-end;
                padding-right: 1em;
                padding-left: 0.4em;
                .icon {
                }
            }

            &:hover {
                background: #5d5e5d;
                color: #FFF;
                .icon {
                    color: #FFF;
                }
            }

            &:last-child {
                border: none;
            }
        }
    }
`

export default () => {
	const [data, setData] = useState(undefined)

	const [active, setActive] = useState(false)
	const [activeItems, setActiveItems] = useState({
		level1: { level_name: undefined, active: undefined, children: [] },
	})
    const [activeLevel, setActiveLevel] = useState(1)
    const [activeName, setActiveName] = useState(undefined)

	useEffect(() => {
        const _getData = async() => {
            setData(await getData())
        }
        _getData()
		document.addEventListener('click', () => closeDropDown())
		return document.removeEventListener('click', () => closeDropDown())
	}, [])

	useEffect(() => {
		if (!data) return
		const { level_name, entries } = data
		setActiveItems({ level1: { level_name, children: entries } })
    }, [data])
    
    useEffect(() => {
        if (!activeItems?.[`level${activeLevel}`].active && activeLevel > 1) {
            return setActiveName(activeItems?.[`level${activeLevel - 1}`].active.name)
        }
        setActiveName(activeItems?.[`level${activeLevel}`]?.active?.name)
    }, [activeItems, activeLevel])

	const closeDropDown = () => setActive(false)

	const handleDropdownClick = (level, entry) => {
		const { name, id } = entry

		if (!entry.children) {
			const { level_name, entries } = level
			closeDropDown()
			setActiveItems({
				...activeItems,
				[`level${activeLevel}`]: {
					...activeItems[`level${activeLevel}`],
					level_name,
                    active: { name, id, children: entry.children ? true : false }
				},
			})
		} else {
			setActiveLevel(activeLevel + 1)
			const { level_name, entries } = entry.children
			setActiveItems({
				...activeItems,
				[`level${activeLevel}`]: {
					...activeItems[`level${activeLevel}`],
					active: { name, id, children: entry.children ? true : false },
				},
				[`level${activeLevel + 1}`]: { level_name, children: entries },
			})
		}
	}

	const levelBack = () => {
		setActiveItems({
			...activeItems,
			[`level${activeLevel}`]: { children: undefined, active: undefined, level_name: undefined },
		})
		setActiveLevel(activeLevel - 1)
	}

	const DropDown = (_level) => {
		const level = activeItems[`level${activeLevel}`]
		if (!level?.children || !active) return <span />
		const { level_name, entries } = level
		return (
			<ul className='DropDown'>
				{activeLevel > 1 && (
					<li className='back' onClick={() => levelBack()}>
						Back <CaretLeft className='icon caret' />
					</li>
				)}
				{level.children.map((e) => (
					<li
						key={e.id}
						onClick={() => handleDropdownClick(level, e)}
						className={''}
					>
						{e.name}
						{e.children && <CaretRight className='icon caret' />}
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
				<h6>{activeName || 'Select Input'}</h6>
				{activeItems.level1?.level_name && (
					<>
						{!active && <CaretDown className='icon caret' />}
						{active && <CaretUp className='icon caret' />}
					</>
				)}
			</div>
			{activeItems.level1?.level_name && <DropDown />}
		</StyledDropDown>
	)
}
