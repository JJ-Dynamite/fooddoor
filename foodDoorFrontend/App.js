import React from 'react'
import Navigators from './src/navigator'
import { Store } from './Store'
import { Provider } from 'react-redux'
export default () => (
	<Provider store={Store}>
	<Navigators />
	</Provider>
	)
