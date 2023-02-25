import { registerRootComponent } from 'expo'
import Reactotron, { trackGlobalErrors } from 'reactotron-react-native'

import App from './App'

Reactotron.configure({
	name: 'my-project',
	host: '192.168.1.98',
})
	.use(trackGlobalErrors())
	.useReactNative({
		logLevel: 'debug',
		errorsAsExceptions: true,
		editor: true,
		overlay: true,
		networkInspect: true,
		reactotronRedux: true,
		asyncStorage: true,
		storybook: false,
		isFlipper: false,
	})
	.connect()

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
//
