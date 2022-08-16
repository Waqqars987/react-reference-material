const { configureStore } = require('@reduxjs/toolkit');
const { createLogger } = require('redux-logger');

const cakeReducer = require('../features/cake/cakeSlice');
const icecreamReducer = require('../features/icecream/icecreamSlice');
const userReducer = require('../features/user/userSlice');

const logger = createLogger();

const store = configureStore({
	reducer: {
		cake: cakeReducer,
		icecream: icecreamReducer,
		user: userReducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});

module.exports = store;
