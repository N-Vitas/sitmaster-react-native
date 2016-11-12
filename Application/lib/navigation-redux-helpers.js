(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory((function webpackLoadOptionalExternalModule() { try { return require("react-native"); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define(["react-native"], factory);
	else {
		var a = typeof exports === 'object' ? factory((function webpackLoadOptionalExternalModule() { try { return require("react-native"); } catch(e) {} }())) : factory(root["react-native"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.tabReducer = exports.cardStackReducer = exports.actions = exports.constants = undefined;
	
	var _constants = __webpack_require__(1);
	
	var _actions = __webpack_require__(2);
	
	var _cardStack = __webpack_require__(3);
	
	var _tabReducer = __webpack_require__(6);
	
	var constants = exports.constants = {
	  JUMP_TO: _constants.JUMP_TO,
	  PUSH_ROUTE: _constants.PUSH_ROUTE,
	  POP_ROUTE: _constants.POP_ROUTE
	};
	
	var actions = exports.actions = {
	  pushRoute: _actions.pushRoute,
	  popRoute: _actions.popRoute,
	  jumpTo: _actions.jumpTo
	};
	
	var cardStackReducer = exports.cardStackReducer = _cardStack.cardStackReducer;
	var tabReducer = exports.tabReducer = _tabReducer.tabReducer;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var JUMP_TO = exports.JUMP_TO = 'react-native-navigation-redux-helpers/JUMP_TO';
	var PUSH_ROUTE = exports.PUSH_ROUTE = 'react-native-navigation-redux-helpers/PUSH_ROUTE';
	var POP_ROUTE = exports.POP_ROUTE = 'react-native-navigation-redux-helpers/POP_ROUTE';

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.pushRoute = pushRoute;
	exports.popRoute = popRoute;
	exports.jumpTo = jumpTo;
	
	var _constants = __webpack_require__(1);
	
	function pushRoute(route, key) {
	  if (!key) {
	    throw new Error('pushRoute requires key argument');
	  }
	
	  return {
	    type: _constants.PUSH_ROUTE,
	    payload: {
	      route: route,
	      key: key
	    }
	  };
	}
	
	function popRoute(key) {
	  if (!key) {
	    throw new Error('popRoute requires key argument');
	  }
	
	  return {
	    type: _constants.POP_ROUTE,
	    payload: {
	      key: key
	    }
	  };
	}
	
	function jumpTo(routeIndex, key) {
	  if (!key) {
	    throw new Error('jumpTo requires key argument');
	  }
	
	  return {
	    type: _constants.JUMP_TO,
	    payload: {
	      routeIndex: routeIndex,
	      key: key
	    }
	  };
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.cardStackReducer = cardStackReducer;
	
	var _constants = __webpack_require__(1);
	
	var _helpers = __webpack_require__(4);
	
	var StateUtils = (0, _helpers.getStateUtils)();
	
	function cardStackReducer(initialState) {
	  (0, _helpers.checkInitialState)(initialState);
	
	  return function cardStackReducerFn() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	    var action = arguments[1];
	
	    if (!(0, _helpers.isActionPotentiallyApplicable)(action, state.key)) {
	      return state;
	    }
	
	    switch (action.type) {
	      case _constants.PUSH_ROUTE:
	      	// проверяем дублирование роута
	      	if(StateUtils.has(state,action.payload.route.key)){
	      		var nextState = state;
	      		nextState.routes.splice(StateUtils.indexOf(nextState,action.payload.route.key),1);
	        	return StateUtils.push(nextState, action.payload.route);
	      	}else{
	        	return StateUtils.push(state, action.payload.route);
	      	}
	      case _constants.POP_ROUTE:
	        return StateUtils.pop(state);
	      case _constants.JUMP_TO:
	      	var jumpState = state;
	      	jumpState.routes.splice(1,Number.MAX_VALUE);
	        return StateUtils.jumpToIndex(jumpState, action.payload.routeIndex);
	      default:
	        return state;
	    }
	  };
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.checkInitialState = checkInitialState;
	exports.isActionPotentiallyApplicable = isActionPotentiallyApplicable;
	exports.getStateUtils = getStateUtils;
	function checkInitialState(initialState) {
	  if (!initialState) {
	    throw Error('initialState arg is required');
	  }
	
	  if (typeof initialState.key !== 'string') {
	    throw Error('initialState must have an attribute **key** which is a string');
	  }
	
	  if (typeof initialState.index !== 'number') {
	    throw Error('initialState must have an attribute **index** which is a number');
	  }
	
	  if (!(initialState.routes instanceof Array)) {
	    throw Error('initialState must have an attribute **route** which is an array');
	  }
	}
	
	function isActionPotentiallyApplicable(action, navigationKey) {
	  return action && action.payload && action.payload.key === navigationKey;
	}
	
	function getStateUtils() {
	  try {
	    var _require = __webpack_require__(5);
	
	    var NavigationExperimental = _require.NavigationExperimental;
	
	    return NavigationExperimental.StateUtils;
	  } catch (e) {
	    // no-op
	  }
	
	  return {};
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	if(typeof __WEBPACK_EXTERNAL_MODULE_5__ === 'undefined') {var e = new Error("Cannot find module \"react-native\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.tabReducer = tabReducer;
	
	var _helpers = __webpack_require__(4);
	
	var _constants = __webpack_require__(1);
	
	var StateUtils = (0, _helpers.getStateUtils)();
	
	function tabReducer(initialState) {
	  (0, _helpers.checkInitialState)(initialState);
	
	  return function tabReducerFn() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	    var action = arguments[1];
	
	    if (!(0, _helpers.isActionPotentiallyApplicable)(action, state.key)) {
	      return state;
	    }
	
	    switch (action.type) {
	      case _constants.JUMP_TO:
	        return StateUtils.jumpToIndex(state, action.payload.routeIndex);
	      default:
	        return state;
	    }
	  };
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map