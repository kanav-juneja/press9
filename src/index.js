import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createGlobalStyle } from 'styled-components'
import { Normalize } from 'styled-normalize'

const GlobalStyle = createGlobalStyle`
  html {
    body {
      font-family: 'Open Sans';
      font-size: 300;
      font-size: 16px;
    }
  }
`

ReactDOM.render(
	<React.StrictMode>
		<Normalize />
		<GlobalStyle />
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)
