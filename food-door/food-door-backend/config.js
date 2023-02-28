const config = require('./package.json').projectConfig

module.exports = {
	mongoConfig: {
		connectionUrl: config.mongoConnectionUrl,
		database: 'foodelivery_db',
		collections: {
			USERS: 'users',
			RESTAURANTS: 'restaurants',
			CARTS: 'carts',
			FOODS: 'foods',
			BOOKMARKS: 'bookmarks',
			ORDERS: 'orders',
			CODES:'codes'
		},
	},
	serverConfig: {
		ip: config.serverIp,
		port: config.serverPort,
	},
	tokenSecret: 'foodelivery_secret',
}
