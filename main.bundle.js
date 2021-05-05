/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common/assetLoader.ts":
/*!***********************************!*\
  !*** ./src/common/assetLoader.ts ***!
  \***********************************/
/*! exports provided: assetLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assetLoader", function() { return assetLoader; });
/* harmony import */ var _tileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tileLoader */ "./src/common/tileLoader.ts");

function getPathsOfType(paths, type) {
    var pathsOfType = {};
    for (var name_1 in paths) {
        var path = paths[name_1];
        if (path.endsWith(type)) {
            pathsOfType[name_1] = path;
        }
    }
    return pathsOfType;
}
/**
 * media and json files are not parallelized... &shrug;
 */
function assetLoader(mediaPlayer, paths, onComplete) {
    function mediaComplete() {
        Object(_tileLoader__WEBPACK_IMPORTED_MODULE_0__["tileLoader"])(getPathsOfType(paths, '.json'), tilesComplete);
    }
    function tilesComplete(tiles) {
        onComplete(tiles);
    }
    mediaPlayer.load(getPathsOfType(paths, '.mp3'), mediaComplete);
}


/***/ }),

/***/ "./src/common/canvas.ts":
/*!******************************!*\
  !*** ./src/common/canvas.ts ***!
  \******************************/
/*! exports provided: createCanvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCanvas", function() { return createCanvas; });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * @description
 * @param {Partial<CanvasConfig>} [config={}]
 * @returns {Canvas}
 */
function createCanvas(userConfig) {
    if (userConfig === void 0) { userConfig = {}; }
    var config = __assign({ ppp: 1, 
        // nes: 256x240
        width: 320, height: 240 }, userConfig);
    function canvasFactory(id) {
        var element = document.createElement('canvas');
        element.id = id;
        element.width = config.width;
        element.height = config.height;
        element.style.position = 'absolute';
        var context = element.getContext('2d');
        context.imageSmoothingEnabled = false; // *cwispy*
        return {
            element: element,
            context: context
        };
    }
    var staticular = canvasFactory('static');
    var dynamic = canvasFactory('dynamic');
    document.body.style.margin = '0';
    document.body.style.backgroundColor = '#000';
    document.body.appendChild(staticular.element);
    document.body.appendChild(dynamic.element);
    return {
        element: {
            static: staticular.element,
            dynamic: dynamic.element
        },
        context: {
            static: staticular.context,
            dynamic: dynamic.context
        },
        config: config,
        onResize: null,
        clear: function (type, colour) {
            var width = this.config.width;
            var height = this.config.height;
            var ppp = this.config.ppp;
            if (colour) {
                this.context[type].fillStyle = colour;
                this.context[type].fillRect(0, 0, width * ppp, height * ppp);
            }
            else {
                this.context[type].clearRect(0, 0, width * ppp, height * ppp);
            }
        },
        getScaleFactor: function (viewportWidth, viewportHeight) {
            var viewportIsLandscape = viewportWidth > viewportHeight;
            var canvasIsLandscape = this.config.width > this.config.height;
            var pixelsPerPixel;
            if (viewportIsLandscape) {
                if (canvasIsLandscape && this.config.height * (viewportWidth / this.config.width) <= viewportHeight) {
                    pixelsPerPixel = viewportWidth / this.config.width;
                }
                else {
                    pixelsPerPixel = viewportHeight / this.config.height;
                }
            }
            else {
                if (!canvasIsLandscape && this.config.width * (viewportHeight / this.config.height) <= viewportWidth) {
                    pixelsPerPixel = viewportHeight / this.config.height;
                }
                else {
                    pixelsPerPixel = viewportWidth / this.config.width;
                }
            }
            return pixelsPerPixel < 2 ? pixelsPerPixel : Math.floor(pixelsPerPixel);
        },
        fitToViewport: function () {
            var viewportWidth = window.innerWidth;
            var viewportHeight = window.innerHeight;
            var scaleFactor = this.getScaleFactor(viewportWidth, viewportHeight);
            this.config.ppp = scaleFactor;
            for (var type in this.element) {
                var element = this.element[type];
                element.width = this.config.width * scaleFactor;
                element.height = this.config.height * scaleFactor;
                element.style.top = viewportHeight / 2 - element.height / 2 + "px";
                element.style.left = viewportWidth / 2 - element.width / 2 + "px";
            }
            if (typeof this.onResize === 'function') {
                this.onResize();
            }
        },
        requestFullscreen: function () {
            document.documentElement.requestFullscreen();
        }
    };
}


/***/ }),

/***/ "./src/common/config.ts":
/*!******************************!*\
  !*** ./src/common/config.ts ***!
  \******************************/
/*! exports provided: config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
var config = {
    debug: false
};


/***/ }),

/***/ "./src/common/controls.ts":
/*!********************************!*\
  !*** ./src/common/controls.ts ***!
  \********************************/
/*! exports provided: controls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controls", function() { return controls; });
var noop = function () { };
var eventQueue = [];
var controls = {
    upPress: noop,
    leftPress: noop,
    downPress: noop,
    rightPress: noop,
    aPress: noop,
    bPress: noop,
    selectPress: noop,
    startPress: noop,
    upRelease: noop,
    leftRelease: noop,
    downRelease: noop,
    rightRelease: noop,
    aRelease: noop,
    bRelease: noop,
    selectRelease: noop,
    startRelease: noop,
    keyDown: noop,
    keyUp: noop,
    reset: function () {
        controls.upPress = noop;
        controls.leftPress = noop;
        controls.downPress = noop;
        controls.rightPress = noop;
        controls.aPress = noop;
        controls.bPress = noop;
        controls.selectPress = noop;
        controls.startPress = noop;
        controls.upRelease = noop;
        controls.leftRelease = noop;
        controls.downRelease = noop;
        controls.rightRelease = noop;
        controls.aRelease = noop;
        controls.bRelease = noop;
        controls.selectRelease = noop;
        controls.startRelease = noop;
        controls.keyDown = noop;
        controls.keyUp = noop;
    },
    update: function () {
        for (var _i = 0, eventQueue_1 = eventQueue; _i < eventQueue_1.length; _i++) {
            var eventName = eventQueue_1[_i];
            controls[eventName]();
        }
        eventQueue = [];
    }
};
document.onkeydown = function (e) {
    e.preventDefault();
    switch (e.key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
            eventQueue.push('upPress');
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            eventQueue.push('rightPress');
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            eventQueue.push('downPress');
            break;
        case 'a':
        case 'A':
        case 'ArrowLeft':
            eventQueue.push('leftPress');
            break;
        case 'j':
        case 'J':
        case 'z':
        case 'Z':
            eventQueue.push('aPress');
            break;
        case 'k':
        case 'K':
        case 'x':
        case 'X':
            eventQueue.push('bPress');
            break;
        case ' ':
            eventQueue.push('selectPress');
            break;
        case 'Enter':
            eventQueue.push('startPress');
            break;
    }
    if (!e.metaKey) {
        eventQueue.push('keyDown');
    }
};
document.onkeyup = function (e) {
    e.preventDefault();
    switch (e.key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
            eventQueue.push('upRelease');
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            eventQueue.push('rightRelease');
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            eventQueue.push('downRelease');
            break;
        case 'a':
        case 'A':
        case 'ArrowLeft':
            eventQueue.push('leftRelease');
            break;
        case 'j':
        case 'J':
        case 'z':
        case 'Z':
            eventQueue.push('aRelease');
            break;
        case 'k':
        case 'K':
        case 'x':
        case 'X':
            eventQueue.push('bRelease');
            break;
        case ' ':
            eventQueue.push('selectRelease');
            break;
        case 'Enter':
            eventQueue.push('startRelease');
            break;
    }
    if (!e.metaKey) {
        eventQueue.push('keyUp');
    }
};


/***/ }),

/***/ "./src/common/hitBox.ts":
/*!******************************!*\
  !*** ./src/common/hitBox.ts ***!
  \******************************/
/*! exports provided: createHitBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createHitBox", function() { return createHitBox; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/common/config.ts");
/* harmony import */ var _rectangle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rectangle */ "./src/common/rectangle.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


function createHitBox(params) {
    if (params === void 0) { params = {}; }
    return __assign({ color: '#06f', rectangle: Object(_rectangle__WEBPACK_IMPORTED_MODULE_1__["createRectangle"])(params.rectangle), draw: function (type, canvas) {
            if (_config__WEBPACK_IMPORTED_MODULE_0__["config"].debug) {
                console.log("hitBox.draw()");
            }
            else {
                return;
            }
            var ppp = canvas.config.ppp;
            canvas.context[type].globalAlpha = 0.4;
            canvas.context[type].fillStyle = this.color;
            canvas.context[type].fillRect((this.rectangle.x) * ppp, (this.rectangle.y) * ppp, (this.rectangle.width) * ppp, (this.rectangle.height) * ppp);
        }, hit: function (hitBox) {
            // TODO
            return false;
        } }, params);
}


/***/ }),

/***/ "./src/common/loop.ts":
/*!****************************!*\
  !*** ./src/common/loop.ts ***!
  \****************************/
/*! exports provided: init, start, stop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return start; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stop", function() { return stop; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/common/config.ts");

var fps = 24;
var then;
var elapsed;
var now;
var canUpdate = false;
var tickCount = 0;
var callback;
function update() {
    if (!canUpdate) {
        return;
    }
    requestAnimationFrame(update);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fps) {
        then = now - (elapsed % fps);
        if (_config__WEBPACK_IMPORTED_MODULE_0__["config"].debug) {
            console.log(tickCount);
        }
        callback();
        tickCount++;
    }
}
;
function init(cb) {
    callback = cb;
    then = Date.now();
    start();
}
function start() {
    canUpdate = true;
    update();
}
function stop() {
    canUpdate = false;
}


/***/ }),

/***/ "./src/common/mediaPlayer.ts":
/*!***********************************!*\
  !*** ./src/common/mediaPlayer.ts ***!
  \***********************************/
/*! exports provided: mediaPlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mediaPlayer", function() { return mediaPlayer; });
var mediaPlayer = {
    tracks: {},
    load: function (paths, onComplete) {
        var trackCount = Object.keys(paths).length;
        var loadedCount = 0;
        if (!trackCount) {
            onComplete();
        }
        function onLoaded() {
            loadedCount++;
            if (loadedCount === trackCount) {
                onComplete();
            }
        }
        for (var name_1 in paths) {
            var audio = new Audio();
            this.tracks[name_1] = audio;
            audio.src = paths[name_1];
            audio.oncanplaythrough = onLoaded;
        }
    },
    play: function (name, loop, onComplete) {
        var _this = this;
        if (loop === void 0) { loop = false; }
        if (onComplete) {
            this.tracks[name].onended = function () {
                onComplete();
                _this.tracks[name].onended = null;
            };
        }
        this.tracks[name].loop = loop;
        this.tracks[name].play();
    },
    pause: function (name) {
        this.tracks[name].pause();
    },
    pauseAll: function () {
        for (var name_2 in this.tracks) {
            this.tracks[name_2].pause();
        }
    }
};


/***/ }),

/***/ "./src/common/metaTile.ts":
/*!********************************!*\
  !*** ./src/common/metaTile.ts ***!
  \********************************/
/*! exports provided: drawTile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawTile", function() { return drawTile; });
/**
 *
 * @param canvas
 * @param tileX
 * @param tileY
 * @param metaTile
 */
function drawTile(type, canvas, tileX, tileY, metaTile) {
    var x = 0;
    var y = 0;
    var ppp = canvas.config.ppp;
    var tile = metaTile.tiles[metaTile.frame];
    canvas.context[type].globalAlpha = 1;
    for (var i = 0; i < tile.length; i++) {
        var hex = tile[i];
        if (hex) {
            canvas.context[type].fillStyle = hex;
            canvas.context[type].fillRect((tileX + x) * ppp, (tileY + y) * ppp, ppp, ppp);
        }
        if (x === metaTile.width - 1) {
            x = 0;
            y++;
        }
        else {
            x++;
        }
    }
}


/***/ }),

/***/ "./src/common/pool.ts":
/*!****************************!*\
  !*** ./src/common/pool.ts ***!
  \****************************/
/*! exports provided: createPool */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPool", function() { return createPool; });
;
function createPool() {
    return {
        items: [],
        addItems: function (groupName) {
            var items = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                items[_i - 1] = arguments[_i];
            }
            var group = this.items.find(function (group) { return group.name === groupName; });
            if (!group) {
                group = {
                    name: groupName,
                    items: []
                };
                this.items.push(group);
            }
            for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
                var item = items_1[_a];
                group.items.push(item);
            }
        },
        getItem: function (name) {
            var requestedItem;
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var group = _a[_i];
                for (var _b = 0, _c = group.items; _b < _c.length; _b++) {
                    var item = _c[_b];
                    if (item.name === name) {
                        requestedItem = item.sprite;
                        break;
                    }
                }
                if (requestedItem) {
                    break;
                }
            }
            return requestedItem;
        },
        getGroup: function (groupName) {
            return this.items.find(function (group) { return group.name === groupName; });
        },
        removeItem: function (groupName, itemName) {
            this.items.find(function (group) { return (group.name === groupName); }).items.find(function (item, index, items) {
                if (item.name === itemName) {
                    items.splice(index, 1);
                }
            });
        },
        draw: function (type, canvas) {
            this.items.forEach(function (group) {
                group.items.forEach(function (item) {
                    item.sprite.draw(type, canvas);
                });
            });
        },
        empty: function () {
            this.items = [];
        }
    };
}
;


/***/ }),

/***/ "./src/common/rectangle.ts":
/*!*********************************!*\
  !*** ./src/common/rectangle.ts ***!
  \*********************************/
/*! exports provided: createRectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRectangle", function() { return createRectangle; });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function createRectangle(params) {
    if (params === void 0) { params = {}; }
    return __assign({ x: 0, y: 0, width: 0, height: 0, centerX: function (base) {
            var relativeCenter = base.x + base.width / 2;
            this.x = relativeCenter - this.width / 2;
        } }, params);
}


/***/ }),

/***/ "./src/common/scene.ts":
/*!*****************************!*\
  !*** ./src/common/scene.ts ***!
  \*****************************/
/*! exports provided: init, update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony import */ var _assetLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assetLoader */ "./src/common/assetLoader.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./src/common/config.ts");
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls */ "./src/common/controls.ts");
/* harmony import */ var _mediaPlayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mediaPlayer */ "./src/common/mediaPlayer.ts");
/* harmony import */ var _pool__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pool */ "./src/common/pool.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};





var currentScene;
var scenes = {};
var isLoading = false;
function drawStaticItems(scene) {
    scene.canvas.clear('static', scene.bgColor);
    scene.staticPool.draw('static', scene.canvas);
}
function drawDynamicItems(scene) {
    scene.canvas.clear('dynamic');
    scene.dynamicPool.draw('dynamic', scene.canvas);
}
function sceneReady(metaTiles) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    currentScene.metaTiles = metaTiles;
    currentScene.init.apply(currentScene, args);
    drawStaticItems(currentScene);
    currentScene.canvas.onResize = function () {
        currentScene.onResize();
        drawStaticItems(currentScene);
    };
    isLoading = false;
}
function loadScene(name) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (!scenes[name]) {
        throw new Error("scene \"" + name + "\" does not exist");
    }
    isLoading = true;
    if (currentScene) {
        currentScene.metaTiles = {};
        currentScene.staticPool.empty();
        currentScene.dynamicPool.empty();
        currentScene.controls.reset();
        if (typeof currentScene.destroy === 'function') {
            currentScene.destroy();
        }
    }
    currentScene = scenes[name];
    currentScene.changeScene = loadScene;
    if (currentScene.preload && Object.keys(currentScene.preload).length) {
        if (_config__WEBPACK_IMPORTED_MODULE_1__["config"].debug) {
            console.log("waiting for " + name + " preload...");
        }
        Object(_assetLoader__WEBPACK_IMPORTED_MODULE_0__["assetLoader"])(currentScene.mediaPlayer, currentScene.preload, function (metaTiles) {
            sceneReady.apply(void 0, __spreadArray([metaTiles], args));
        });
    }
    else {
        sceneReady.apply(void 0, __spreadArray([{}], args));
        if (_config__WEBPACK_IMPORTED_MODULE_1__["config"].debug) {
            console.log("loaded scene: " + name);
        }
    }
}
/**
 *
 * @param sceneObj
 * @param initialSceneName
 * @param canvas
 * @param initialArgs
 */
function init(sceneObj, initialSceneName, canvas) {
    var _a;
    var initialArgs = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        initialArgs[_i - 3] = arguments[_i];
    }
    for (var name_1 in sceneObj) {
        var scene = sceneObj[name_1];
        scene = __assign(__assign({}, scene), { canvas: canvas, config: _config__WEBPACK_IMPORTED_MODULE_1__["config"], controls: _controls__WEBPACK_IMPORTED_MODULE_2__["controls"], dynamicPool: Object(_pool__WEBPACK_IMPORTED_MODULE_4__["createPool"])(), metaTiles: {}, mediaPlayer: _mediaPlayer__WEBPACK_IMPORTED_MODULE_3__["mediaPlayer"], staticPool: Object(_pool__WEBPACK_IMPORTED_MODULE_4__["createPool"])() });
        scenes[name_1] = scene;
    }
    if (scenes.loading) {
        (_a = scenes.loading).init.apply(_a, initialArgs);
    }
    loadScene.apply(void 0, __spreadArray([initialSceneName], initialArgs));
}
/**
 *
 * @param canvas
 */
function update(canvas) {
    if (isLoading) {
        drawStaticItems(scenes.loading);
        drawDynamicItems(scenes.loading);
    }
    else {
        if (typeof currentScene.update === 'function') {
            currentScene.update(canvas);
        }
        currentScene.controls.update();
        drawDynamicItems(currentScene);
    }
}


/***/ }),

/***/ "./src/common/shapes.ts":
/*!******************************!*\
  !*** ./src/common/shapes.ts ***!
  \******************************/
/*! exports provided: drawRectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawRectangle", function() { return drawRectangle; });
function drawRectangle(type, canvas, fill, strokeColor, strokeWidth, rectangle) {
    var ppp = canvas.config.ppp;
    if (fill) {
        canvas.context[type].fillStyle = fill;
        canvas.context[type].fillRect(rectangle.x * ppp, rectangle.y * ppp, rectangle.width * ppp, rectangle.height * ppp);
    }
    if (strokeColor) {
        canvas.context[type].strokeStyle = strokeColor;
        canvas.context[type].lineWidth = strokeWidth;
        canvas.context[type].strokeRect(rectangle.x * ppp, rectangle.y * ppp, rectangle.width * ppp, rectangle.height * ppp);
    }
}


/***/ }),

/***/ "./src/common/sprite.ts":
/*!******************************!*\
  !*** ./src/common/sprite.ts ***!
  \******************************/
/*! exports provided: createMetaTileSprite, createTextSprite, createRectangleSprite */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMetaTileSprite", function() { return createMetaTileSprite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTextSprite", function() { return createTextSprite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRectangleSprite", function() { return createRectangleSprite; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/common/config.ts");
/* harmony import */ var _hitBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hitBox */ "./src/common/hitBox.ts");
/* harmony import */ var _metaTile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metaTile */ "./src/common/metaTile.ts");
/* harmony import */ var _rectangle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rectangle */ "./src/common/rectangle.ts");
/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shapes */ "./src/common/shapes.ts");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./text */ "./src/common/text.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};






/**
 *
 * @param params
 * @returns
 */
function createMetaTileSprite(params) {
    if (params === void 0) { params = {}; }
    var rectangle = Object(_rectangle__WEBPACK_IMPORTED_MODULE_3__["createRectangle"])({
        width: params.metaTile.width,
        height: params.metaTile.height
    });
    var hitBox = Object(_hitBox__WEBPACK_IMPORTED_MODULE_1__["createHitBox"])({
        rectangle: rectangle
    });
    function updateHitBox(type, canvas) {
        hitBox.rectangle.x = rectangle.x;
        hitBox.rectangle.x = rectangle.x;
        hitBox.draw(type, canvas);
    }
    return __assign({ animations: {}, hitBox: hitBox, metaTile: null, playingAnimation: null, rectangle: rectangle, visible: true, draw: function (type, canvas) {
            if (!this.visible) {
                return;
            }
            if (_config__WEBPACK_IMPORTED_MODULE_0__["config"].debug) {
                console.log("metaTileSprite.draw()");
            }
            updateHitBox(type, canvas);
            if (this.playingAnimation) {
                this.animations[this.playingAnimation].draw(type, canvas);
            }
            else {
                Object(_metaTile__WEBPACK_IMPORTED_MODULE_2__["drawTile"])(type, canvas, this.rectangle.x, this.rectangle.y, this.metaTile);
            }
        }, addAnimation: function (name, startFrame, endFrame, tickInterval, onComplete) {
            var sprite = this;
            var canAdvance = true;
            var willHandleComplete = false;
            var currentFrame = startFrame;
            var tickCount = 0;
            sprite.animations[name] = {
                start: function () {
                    canAdvance = true;
                },
                stop: function (gotoFrame) {
                    if (gotoFrame) {
                        if (gotoFrame > 0) {
                            currentFrame = gotoFrame;
                        }
                        else {
                            currentFrame = endFrame;
                        }
                    }
                    canAdvance = false;
                },
                draw: function (type, canvas) {
                    if (tickCount < tickInterval) {
                        tickCount++;
                    }
                    else {
                        if (canAdvance) {
                            currentFrame = Math.min(endFrame, ++currentFrame);
                        }
                        if (willHandleComplete) {
                            if (onComplete === 'loop') {
                                currentFrame = startFrame;
                            }
                            else if (typeof onComplete === 'function') {
                                onComplete();
                            }
                            willHandleComplete = false;
                        }
                        tickCount = 0;
                    }
                    if (canAdvance && currentFrame === endFrame) {
                        // allow the final interval to run before handling complete
                        willHandleComplete = true;
                    }
                    if (_config__WEBPACK_IMPORTED_MODULE_0__["config"].debug) {
                        console.log("metaTileSprite.draw()");
                    }
                    sprite.metaTile.frame = currentFrame;
                    Object(_metaTile__WEBPACK_IMPORTED_MODULE_2__["drawTile"])(type, canvas, sprite.rectangle.x, sprite.rectangle.y, sprite.metaTile);
                }
            };
        }, startAnimation: function (name) {
            this.animations[name].start();
            this.playingAnimation = name;
        }, stopAnimation: function () {
            this.animations[this.playingAnimation].stop();
            this.playingAnimation = null;
        } }, params);
}
/**
 *
 * @param params
 * @returns
 */
function createTextSprite(
// value must be passed in for initial, automatic rectangle calculation
params) {
    if (params === void 0) { params = {}; }
    var width = params.maxWidth || Object(_text__WEBPACK_IMPORTED_MODULE_5__["getLineLength"])(params.value, params.options);
    var rectangle = Object(_rectangle__WEBPACK_IMPORTED_MODULE_3__["createRectangle"])({ width: width });
    return __assign({ animations: {}, color: '#c59', maxWidth: null, options: Object(_text__WEBPACK_IMPORTED_MODULE_5__["createTextOptions"])(), playingAnimation: null, rectangle: rectangle, value: '', visible: true, draw: function (type, canvas) {
            if (!this.visible) {
                return;
            }
            if (_config__WEBPACK_IMPORTED_MODULE_0__["config"].debug) {
                console.log("textSprite.draw()");
            }
            canvas.context[type].fillStyle = this.color;
            if (this.playingAnimation) {
                this.animations[this.playingAnimation].draw(type, canvas);
            }
            else {
                if (this.maxWidth) {
                    var lines = Object(_text__WEBPACK_IMPORTED_MODULE_5__["getLines"])(this.value, this.options, this.maxWidth);
                    var y = this.rectangle.y;
                    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                        var line = lines_1[_i];
                        Object(_text__WEBPACK_IMPORTED_MODULE_5__["drawTextLine"])(type, canvas, this.rectangle.x, y, line, this.options);
                        y += this.options.lineHeight;
                    }
                }
                else {
                    Object(_text__WEBPACK_IMPORTED_MODULE_5__["drawTextLine"])(type, canvas, this.rectangle.x, this.rectangle.y, this.value, this.options);
                }
            }
        }, 
        /**
         *
         * @param {number} startChar
         * @param {number} endChar use 1-n for a specific end character; or -1 for the character length
         * @param {number} interval how many ticks per frame
         * @param {OnComplete} onComplete
         * @returns {Animation}
         */
        addAnimation: function (name, startChar, endChar, tickInterval, onComplete) {
            var sprite = this;
            var charLen = sprite.value.split('').length;
            var tickCount = 0;
            var drawableCharLen = startChar;
            var willHandleComplete = false;
            var canAdvance = true;
            endChar = endChar > 0 ? endChar : charLen;
            sprite.animations[name] = {
                start: function () {
                    canAdvance = true;
                },
                stop: function (gotoChar) {
                    if (gotoChar) {
                        if (gotoChar > 0) {
                            drawableCharLen = gotoChar;
                        }
                        else {
                            drawableCharLen = charLen;
                        }
                    }
                    canAdvance = false;
                },
                draw: function (type, canvas) {
                    if (!sprite.visible) {
                        return;
                    }
                    if (tickCount < tickInterval) {
                        tickCount++;
                    }
                    else {
                        if (canAdvance) {
                            drawableCharLen = Math.min(endChar, ++drawableCharLen);
                        }
                        if (willHandleComplete) {
                            if (onComplete === 'loop') {
                                drawableCharLen = startChar;
                            }
                            else if (typeof onComplete === 'function') {
                                onComplete();
                            }
                            willHandleComplete = false;
                        }
                        tickCount = 0;
                    }
                    if (canAdvance && drawableCharLen === endChar) {
                        // allow the final interval to run before handling complete
                        willHandleComplete = true;
                    }
                    if (_config__WEBPACK_IMPORTED_MODULE_0__["config"].debug) {
                        console.log("textSprite.draw()");
                    }
                    if (sprite.maxWidth) {
                        var lines = Object(_text__WEBPACK_IMPORTED_MODULE_5__["getLines"])(sprite.value, sprite.options, sprite.maxWidth);
                        var y = sprite.rectangle.y;
                        var drawnCharLen = 0;
                        for (var _i = 0, lines_2 = lines; _i < lines_2.length; _i++) {
                            var line = lines_2[_i];
                            if (drawnCharLen + line.length < drawableCharLen) {
                                Object(_text__WEBPACK_IMPORTED_MODULE_5__["drawTextLine"])(type, canvas, sprite.rectangle.x, y, line, sprite.options);
                                drawnCharLen += line.length;
                            }
                            else {
                                Object(_text__WEBPACK_IMPORTED_MODULE_5__["drawTextLine"])(type, canvas, sprite.rectangle.x, y, line.slice(0, drawableCharLen - drawnCharLen), sprite.options);
                                drawnCharLen += drawableCharLen - drawnCharLen;
                                break;
                            }
                            y += sprite.options.lineHeight;
                        }
                    }
                    else {
                        Object(_text__WEBPACK_IMPORTED_MODULE_5__["drawTextLine"])(type, canvas, sprite.rectangle.x, sprite.rectangle.y, sprite.value.slice(0, drawableCharLen), sprite.options);
                    }
                }
            };
        }, startAnimation: function (name) {
            this.animations[name].start();
            this.playingAnimation = name;
        }, stopAnimation: function () {
            this.animations[this.playingAnimation].stop();
            this.playingAnimation = null;
        } }, params);
}
function createRectangleSprite(params) {
    if (params === void 0) { params = {}; }
    return __assign({ fill: null, strokeColor: null, strokeWidth: 1, visible: true, rectangle: Object(_rectangle__WEBPACK_IMPORTED_MODULE_3__["createRectangle"])(), draw: function (type, canvas) {
            if (!this.visible) {
                return;
            }
            if (_config__WEBPACK_IMPORTED_MODULE_0__["config"].debug) {
                console.log("rectangleSprite.draw()");
            }
            Object(_shapes__WEBPACK_IMPORTED_MODULE_4__["drawRectangle"])(type, canvas, this.fill, this.strokeColor, this.strokeWidth, this.rectangle);
        } }, params);
}


/***/ }),

/***/ "./src/common/text.ts":
/*!****************************!*\
  !*** ./src/common/text.ts ***!
  \****************************/
/*! exports provided: createTextOptions, characterDoesExist, drawCharacter, drawTextLine, getLines, getLineLength */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTextOptions", function() { return createTextOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "characterDoesExist", function() { return characterDoesExist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawCharacter", function() { return drawCharacter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawTextLine", function() { return drawTextLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLines", function() { return getLines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLineLength", function() { return getLineLength; });
/* harmony import */ var _scenes_common_textOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scenes/common/textOptions */ "./src/scenes/common/textOptions.ts");

;
/**
 *
 * @returns {TextOptions}
 */
function createTextOptions() {
    return {
        font: null,
        tracking: 0,
        lineHeight: 0
    };
}
/**
 *
 * @param font
 * @param char
 * @returns {boolean}
 */
function characterDoesExist(font, char) {
    if (font[char]) {
        return true;
    }
    else {
        throw new Error("Font does not contain the character \"" + char + "\"");
    }
}
/**
 *
 * @param canvas
 * @param charX
 * @param charY
 * @param char
 */
function drawCharacter(type, canvas, charX, charY, char) {
    var x = 0;
    var y = 0;
    var ppp = canvas.config.ppp;
    for (var i = 0; i < char.tile.length; i++) {
        if (char.tile[i] === 1) {
            canvas.context[type].fillRect((charX + x + char.offsetX) * ppp, (charY + y + char.offsetY) * ppp, ppp, ppp);
        }
        if (x === char.width - 1) {
            x = 0;
            y++;
        }
        else {
            x++;
        }
    }
}
/**
 *
 * @param canvas
 * @param text
 * @param options
 * @param color
 */
function drawTextLine(type, canvas, lineX, lineY, text, options) {
    var characters = text.split('');
    var x = lineX;
    var y = lineY;
    for (var i = 0; i < characters.length; i++) {
        var char = characters[i];
        if (characterDoesExist(options.font, char)) {
            drawCharacter(type, canvas, x, y, options.font[char]);
            x += options.font[char].width;
        }
        x += options.tracking;
    }
}
/**
 * @description get array of lines confined to a max width
 * @param {string} text
 * @param {number} maxWidth
 * @returns {string[]}
 */
function getLines(text, options, maxWidth) {
    var lines = [];
    var words = text.split(' ');
    var spaceCharacter = _scenes_common_textOptions__WEBPACK_IMPORTED_MODULE_0__["textOptions"].font[' '];
    var spaceWidth = spaceCharacter.width + spaceCharacter.offsetX + options.tracking;
    var line = '';
    var lineWidth = 0;
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var wordChars = word.split('');
        var wordWidth = 0;
        for (var _i = 0, wordChars_1 = wordChars; _i < wordChars_1.length; _i++) {
            var wordChar = wordChars_1[_i];
            if (characterDoesExist(options.font, wordChar)) {
                var char = options.font[wordChar];
                wordWidth += (char.width + char.offsetX + options.tracking);
            }
        }
        wordWidth += spaceWidth;
        lineWidth += wordWidth;
        if (lineWidth <= maxWidth) {
            line += word + ' ';
        }
        else {
            lines.push(line);
            line = word + ' ';
            lineWidth = wordWidth;
        }
    }
    lines.push(line.trimEnd());
    return lines;
}
/**
 * @description for calculating pixel length of text with no maxWidth
 * @param {string} line
 * @param {textOptions} options
 * @returns {number}
 */
function getLineLength(line, options) {
    var wordChars = line.split('');
    var width = 0;
    for (var _i = 0, wordChars_2 = wordChars; _i < wordChars_2.length; _i++) {
        var wordChar = wordChars_2[_i];
        if (characterDoesExist(options.font, wordChar)) {
            var char = options.font[wordChar];
            width += (char.width + char.offsetX + options.tracking);
        }
    }
    return width;
}


/***/ }),

/***/ "./src/common/tileLoader.ts":
/*!**********************************!*\
  !*** ./src/common/tileLoader.ts ***!
  \**********************************/
/*! exports provided: tileLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tileLoader", function() { return tileLoader; });
function tileLoader(paths, onComplete) {
    var trackCount = Object.keys(paths).length;
    var tiles = {};
    var loadedCount = 0;
    if (!trackCount) {
        onComplete({});
    }
    function onLoaded() {
        loadedCount++;
        if (loadedCount === trackCount) {
            onComplete(tiles);
        }
    }
    var _loop_1 = function (name_1) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                tiles[name_1] = JSON.parse(xhr.responseText);
                onLoaded();
            }
            else {
                console.error(xhr.responseText);
                throw new Error("Tile \"" + name_1 + "\" was not found");
            }
        };
        xhr.open('GET', paths[name_1]);
        xhr.send();
    };
    // TODO switch to async/await fetch()
    for (var name_1 in paths) {
        _loop_1(name_1);
    }
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/canvas */ "./src/common/canvas.ts");
/* harmony import */ var _common_loop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/loop */ "./src/common/loop.ts");
/* harmony import */ var _common_scene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/scene */ "./src/common/scene.ts");
/* harmony import */ var _scenes_about_about__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/about/about */ "./src/scenes/about/about.ts");
/* harmony import */ var _scenes_splash_splash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scenes/splash/splash */ "./src/scenes/splash/splash.ts");
/* harmony import */ var _scenes_loading_loading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scenes/loading/loading */ "./src/scenes/loading/loading.ts");
/* harmony import */ var _scenes_title_title__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scenes/title/title */ "./src/scenes/title/title.ts");







var canvas = Object(_common_canvas__WEBPACK_IMPORTED_MODULE_0__["createCanvas"])();
canvas.fitToViewport();
window.onresize = function () { return canvas.fitToViewport(); };
window.ondeviceorientation = function () { return canvas.fitToViewport(); };
_common_scene__WEBPACK_IMPORTED_MODULE_2__["init"]({
    about: _scenes_about_about__WEBPACK_IMPORTED_MODULE_3__["about"],
    loading: _scenes_loading_loading__WEBPACK_IMPORTED_MODULE_5__["loading"],
    splash: _scenes_splash_splash__WEBPACK_IMPORTED_MODULE_4__["splash"],
    title: _scenes_title_title__WEBPACK_IMPORTED_MODULE_6__["title"]
}, 'splash', canvas);
_common_loop__WEBPACK_IMPORTED_MODULE_1__["init"](function () {
    _common_scene__WEBPACK_IMPORTED_MODULE_2__["update"](canvas);
});


/***/ }),

/***/ "./src/scenes/about/about.ts":
/*!***********************************!*\
  !*** ./src/scenes/about/about.ts ***!
  \***********************************/
/*! exports provided: about */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "about", function() { return about; });
/* harmony import */ var _common_rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/rectangle */ "./src/common/rectangle.ts");
/* harmony import */ var _common_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/sprite */ "./src/common/sprite.ts");
/* harmony import */ var _common_textOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/textOptions */ "./src/scenes/common/textOptions.ts");
/* harmony import */ var _common_cursor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/cursor */ "./src/scenes/common/cursor.ts");




var margin = 12;
function placeItems(scene) {
    var canvasRectangle = Object(_common_rectangle__WEBPACK_IMPORTED_MODULE_0__["createRectangle"])({
        width: scene.canvas.config.width,
        height: scene.canvas.config.height
    });
    scene.sprites.title.rectangle.centerX(canvasRectangle);
    scene.sprites.title.rectangle.y = margin;
    scene.sprites.about.rectangle.x = margin;
    scene.sprites.about.rectangle.y = scene.sprites.title.rectangle.y + _common_textOptions__WEBPACK_IMPORTED_MODULE_2__["textOptions"].lineHeight * 2;
    scene.sprites.learnMore.rectangle.x = margin;
    scene.sprites.learnMore.rectangle.y = scene.sprites.title.rectangle.y + _common_textOptions__WEBPACK_IMPORTED_MODULE_2__["textOptions"].lineHeight * 8;
    scene.sprites.hftmt.rectangle.x = margin;
    scene.sprites.hftmt.rectangle.y = scene.sprites.title.rectangle.y + _common_textOptions__WEBPACK_IMPORTED_MODULE_2__["textOptions"].lineHeight * 10;
    scene.sprites.thanks.rectangle.x = margin;
    scene.sprites.thanks.rectangle.y = scene.sprites.title.rectangle.y + _common_textOptions__WEBPACK_IMPORTED_MODULE_2__["textOptions"].lineHeight * 12;
    scene.sprites.makers.rectangle.x = margin;
    scene.sprites.makers.rectangle.y = scene.sprites.title.rectangle.y + _common_textOptions__WEBPACK_IMPORTED_MODULE_2__["textOptions"].lineHeight * 13;
    scene.sprites.back.rectangle.centerX(canvasRectangle);
    scene.sprites.back.rectangle.y = canvasRectangle.height - _common_textOptions__WEBPACK_IMPORTED_MODULE_2__["textOptions"].lineHeight - margin;
}
var about = {
    name: 'about',
    bgColor: '#000',
    preload: {
        'cursor': 'src/scenes/assets/title/cursor.json'
    },
    init: function () {
        var _this = this;
        _common_cursor__WEBPACK_IMPORTED_MODULE_3__["cursor"].tickCount = 0;
        this.sprites.title = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_1__["createTextSprite"])({
            color: '#eee',
            options: _common_textOptions__WEBPACK_IMPORTED_MODULE_2__["textOptions"],
            value: 'ABOUT'
        });
        this.sprites.about = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_1__["createTextSprite"])({
            color: '#eee',
            options: _common_textOptions__WEBPACK_IMPORTED_MODULE_2__["textOptions"],
            maxWidth: this.canvas.config.width - (margin * 2),
            value: "THIS PROJECT IS AN ODE TO ONE OF MY FAVORITE PODCASTS: HELLO FROM THE MAGIC TAVERN. IT IS NOT AFFILIATED WITH THE SHOW IN ANY WAY. (NOT THAT I'M AGAINST THAT HAPPENING - JUST SAYING)"
        });
        this.sprites.learnMore = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_1__["createTextSprite"])({
            color: '#eee',
            options: _common_textOptions__WEBPACK_IMPORTED_MODULE_2__["textOptions"],
            maxWidth: this.canvas.config.width - (margin * 2),
            value: "TO LEARN MORE ABOUT THE SHOW, AND HOW IT'S TOTALLY REAL, GO TO:"
        });
        this.sprites.hftmt = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_1__["createTextSprite"])({
            color: '#04d',
            options: _common_textOptions__WEBPACK_IMPORTED_MODULE_2__["textOptions"],
            value: 'HELLOFROMTHEMAGICTAVERN.COM'
        });
        this.sprites.thanks = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_1__["createTextSprite"])({
            color: '#eee',
            options: _common_textOptions__WEBPACK_IMPORTED_MODULE_2__["textOptions"],
            value: "SPECIAL THANKS TO THE MAKERS OF:"
        });
        this.sprites.makers = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_1__["createTextSprite"])({
            color: '#04d',
            options: _common_textOptions__WEBPACK_IMPORTED_MODULE_2__["textOptions"],
            maxWidth: 128,
            value: 'PISKELAPP.COM YMCK.NET/APP/MAGICAL-8BIT-PLUG'
        });
        this.sprites.back = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_1__["createTextSprite"])({
            color: '#eee',
            options: _common_textOptions__WEBPACK_IMPORTED_MODULE_2__["textOptions"],
            value: 'BACK TO TITLE SCREEN'
        });
        placeItems(this);
        this.sprites.cursor = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_1__["createMetaTileSprite"])({
            metaTile: this.metaTiles.cursor
        });
        var handleBack = function () {
            _this.changeScene('title');
        };
        this.controls.aPress = function () {
            handleBack();
        };
        this.controls.startPress = function () {
            handleBack();
        };
    },
    update: function () {
        _common_cursor__WEBPACK_IMPORTED_MODULE_3__["cursor"].update(this, this.sprites.back.rectangle);
    },
    onResize: function () {
        placeItems(this);
    }
};


/***/ }),

/***/ "./src/scenes/assets/common/nes-font.json":
/*!************************************************!*\
  !*** ./src/scenes/assets/common/nes-font.json ***!
  \************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,  , ., :, ;, ', ", ,, !, ?, _, -, +, =, *, (, ), /, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"0\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,1,1,1,0,0,0,1,0,0,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,0,0,1,0,0,0,1,1,1,0,0]},\"1\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1]},\"2\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,1,0,1,1,0,0,0,1,1,0,0,0,0,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,0,0,0,0,1,1,1,1,1,1,1]},\"3\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,1,1,1,0]},\"4\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,1,1,0,1,1,0,1,1,0,0,1,1,0,1,1,1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,0]},\"5\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,1,0,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,1,1,1,0]},\"6\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,1,1,1,1,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,1,1,1,0]},\"7\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0]},\"8\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,0,0,1,1,0,0,0,1,0,1,1,1,0,0,1,0,0,1,1,1,1,0,0,1,0,0,0,0,1,1,1,0,0,0,0,1,1,0,1,1,1,1,1,0]},\"9\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,1,1,1,1,0,0]},\" \":{\"offsetX\":-2,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},\".\":{\"offsetX\":0,\"offsetY\":0,\"width\":2,\"height\":7,\"tile\":[0,0,0,0,0,0,0,0,0,0,1,1,1,1]},\":\":{\"offsetX\":0,\"offsetY\":0,\"width\":2,\"height\":7,\"tile\":[0,0,1,1,1,1,0,0,0,0,1,1,1,1]},\";\":{\"offsetX\":0,\"offsetY\":2,\"width\":2,\"height\":7,\"tile\":[1,1,1,1,0,0,0,0,1,1,0,1,1,0]},\"'\":{\"offsetX\":0,\"offsetY\":0,\"width\":2,\"height\":7,\"tile\":[1,1,1,1,0,1,0,0,0,0,0,0,0,0]},\"\\\"\":{\"offsetX\":0,\"offsetY\":0,\"width\":5,\"height\":7,\"tile\":[1,1,0,1,1,1,1,0,1,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},\",\":{\"offsetX\":0,\"offsetY\":2,\"width\":2,\"height\":7,\"tile\":[0,0,0,0,0,0,0,0,1,1,0,1,1,0]},\"!\":{\"offsetX\":1,\"offsetY\":0,\"width\":2,\"height\":7,\"tile\":[1,1,1,1,1,1,1,1,1,1,0,0,1,1]},\"?\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,0,1,1,0,0,1,1,1,1,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0]},\"_\":{\"offsetX\":0,\"offsetY\":0,\"width\":5,\"height\":7,\"tile\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1]},\"-\":{\"offsetX\":0,\"offsetY\":0,\"width\":5,\"height\":7,\"tile\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},\"+\":{\"offsetX\":0,\"offsetY\":0,\"width\":5,\"height\":7,\"tile\":[0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0]},\"=\":{\"offsetX\":0,\"offsetY\":0,\"width\":5,\"height\":7,\"tile\":[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0]},\"*\":{\"offsetX\":0,\"offsetY\":0,\"width\":5,\"height\":7,\"tile\":[1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0]},\"(\":{\"offsetX\":0,\"offsetY\":-1,\"width\":3,\"height\":9,\"tile\":[0,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,1,1]},\")\":{\"offsetX\":0,\"offsetY\":-1,\"width\":3,\"height\":9,\"tile\":[1,1,0,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,1,0]},\"/\":{\"offsetX\":0,\"offsetY\":0,\"width\":5,\"height\":7,\"tile\":[0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0]},\"A\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,1,1,1,0,0,0,1,1,0,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1]},\"B\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0]},\"C\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,1,1,1,1,0,0,1,1,0,0,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,1,1,0]},\"D\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,0,0,1,1,0,0,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,1,1,0,1,1,1,1,1,0,0]},\"E\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1]},\"F\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0]},\"G\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,1,1,1,1,0,0,1,1,0,0,1,1,1,1,0,0,0,0,0,1,1,0,0,1,1,1,1,1,0,0,0,1,1,0,1,1,0,0,1,1,0,0,1,1,1,1,1]},\"H\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1]},\"I\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1]},\"J\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,0,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,1,1,1,0]},\"K\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,0,0,0,1,1,1,1,0,0,1,1,0,1,1,0,1,1,0,0,1,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,0,1,1,1,0,1,1,0,0,1,1,1]},\"L\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1]},\"M\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1]},\"N\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,1,1]},\"O\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,1,1,1,0]},\"P\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0]},\"Q\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,0,0,1,1,1,1,0,1]},\"R\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,1,1,0,1,1,1,1,1,0,0,1,1,0,1,1,1,0,1,1,0,0,1,1,1]},\"S\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,1,1,1,0]},\"T\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0]},\"U\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,1,1,1,0]},\"V\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0]},\"W\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,1,1]},\"X\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,0,0,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,0,0,1,1]},\"Y\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,0,0,1,1,0,1,1,0,0,1,1,0,1,1,0,0,1,1,0,0,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0]},\"Z\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0,1,1,1,1,1,1,1]}}");

/***/ }),

/***/ "./src/scenes/common/cursor.ts":
/*!*************************************!*\
  !*** ./src/scenes/common/cursor.ts ***!
  \*************************************/
/*! exports provided: cursor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cursor", function() { return cursor; });
var cursor = {
    offsetX: 7,
    offsetY: 1,
    ticksPerBlink: 16,
    tickCount: 0,
    update: function (scene, selectedRectangle) {
        var sprite = scene.dynamicPool.getItem('cursor');
        if (this.tickCount < this.ticksPerBlink) {
            this.tickCount++;
        }
        else {
            sprite.visible = !sprite.visible;
            this.tickCount = 0;
        }
        sprite.rectangle.x = selectedRectangle.x - sprite.rectangle.width - this.offsetX;
        sprite.rectangle.y = selectedRectangle.y - this.offsetY;
    }
};


/***/ }),

/***/ "./src/scenes/common/textOptions.ts":
/*!******************************************!*\
  !*** ./src/scenes/common/textOptions.ts ***!
  \******************************************/
/*! exports provided: textOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "textOptions", function() { return textOptions; });
/* harmony import */ var _assets_common_nes_font_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/common/nes-font.json */ "./src/scenes/assets/common/nes-font.json");
var _assets_common_nes_font_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../assets/common/nes-font.json */ "./src/scenes/assets/common/nes-font.json", 1);

var font = _assets_common_nes_font_json__WEBPACK_IMPORTED_MODULE_0__;
var textOptions = {
    font: font,
    tracking: 1,
    lineHeight: 10
};


/***/ }),

/***/ "./src/scenes/loading/loading.ts":
/*!***************************************!*\
  !*** ./src/scenes/loading/loading.ts ***!
  \***************************************/
/*! exports provided: loading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loading", function() { return loading; });
/* harmony import */ var _common_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/sprite */ "./src/common/sprite.ts");
/* harmony import */ var _common_textOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/textOptions */ "./src/scenes/common/textOptions.ts");


var loading = {
    name: 'loading',
    bgColor: '#000',
    init: function () {
        var loadingText = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_0__["createTextSprite"])({
            color: '#eee',
            options: _common_textOptions__WEBPACK_IMPORTED_MODULE_1__["textOptions"],
            value: 'LOADING'
        });
        this.staticPool.addItems('main', {
            name: 'main',
            sprite: loadingText
        });
        var ellipsis = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_0__["createTextSprite"])({
            color: '#eee',
            options: _common_textOptions__WEBPACK_IMPORTED_MODULE_1__["textOptions"],
            value: '...'
        });
        ellipsis.addAnimation('cycle', 0, null, 16, 'loop');
        ellipsis.startAnimation('cycle');
        this.dynamicPool.addItems('main', {
            name: 'ellipsis',
            sprite: ellipsis
        });
        var textY = this.canvas.config.height - (loadingText.rectangle.height + 16);
        loadingText.rectangle.x = (this.canvas.config.width - (loadingText.rectangle.width + ellipsis.rectangle.width + 8));
        loadingText.rectangle.y = textY;
        ellipsis.rectangle.x = (loadingText.rectangle.x + loadingText.rectangle.width);
        ellipsis.rectangle.y = textY;
    }
};


/***/ }),

/***/ "./src/scenes/splash/splash.ts":
/*!*************************************!*\
  !*** ./src/scenes/splash/splash.ts ***!
  \*************************************/
/*! exports provided: splash */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splash", function() { return splash; });
/* harmony import */ var _common_rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/rectangle */ "./src/common/rectangle.ts");
/* harmony import */ var _common_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/sprite */ "./src/common/sprite.ts");
/* harmony import */ var _common_textOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/textOptions */ "./src/scenes/common/textOptions.ts");



function positionItems(scene) {
    var canvasRectangle = Object(_common_rectangle__WEBPACK_IMPORTED_MODULE_0__["createRectangle"])({ width: scene.canvas.config.width });
    var controls = scene.staticPool.getItem('controls');
    var anyKey = scene.dynamicPool.getItem('anyKey');
    controls.rectangle.centerX(canvasRectangle);
    controls.rectangle.y = 18;
    anyKey.rectangle.centerX(canvasRectangle);
    anyKey.rectangle.y = 206;
}
var anyKey = {
    ticksPerBlink: 16,
    tickCount: 0,
    update: function (scene) {
        var anyKey = scene.dynamicPool.getItem('anyKey');
        if (this.tickCount < this.ticksPerBlink) {
            this.tickCount++;
        }
        else {
            anyKey.visible = !anyKey.visible;
            this.tickCount = 0;
        }
    }
};
var splash = {
    name: 'splash',
    bgColor: '#000',
    preload: {
        controls: 'src/scenes/assets/splash/controls.json'
    },
    init: function () {
        var _this = this;
        anyKey.tickCount = 0;
        this.controls.keyDown = function () {
            _this.changeScene('title');
        };
        this.staticPool.addItems('main', {
            name: 'controls',
            sprite: Object(_common_sprite__WEBPACK_IMPORTED_MODULE_1__["createMetaTileSprite"])({
                metaTile: this.metaTiles.controls
            })
        });
        this.dynamicPool.addItems('main', {
            name: 'anyKey',
            sprite: Object(_common_sprite__WEBPACK_IMPORTED_MODULE_1__["createTextSprite"])({
                color: '#eee',
                options: _common_textOptions__WEBPACK_IMPORTED_MODULE_2__["textOptions"],
                value: 'PRESS ANY BUTTON TO CONTINUE'
            })
        });
        positionItems(this);
    },
    update: function () {
        anyKey.update(this);
    },
    onResize: function () {
        positionItems(this);
    }
};


/***/ }),

/***/ "./src/scenes/title/title.ts":
/*!***********************************!*\
  !*** ./src/scenes/title/title.ts ***!
  \***********************************/
/*! exports provided: title */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "title", function() { return title; });
/* harmony import */ var _common_mediaPlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/mediaPlayer */ "./src/common/mediaPlayer.ts");
/* harmony import */ var _common_rectangle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/rectangle */ "./src/common/rectangle.ts");
/* harmony import */ var _common_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/sprite */ "./src/common/sprite.ts");
/* harmony import */ var _common_textOptions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/textOptions */ "./src/scenes/common/textOptions.ts");
/* harmony import */ var _common_cursor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/cursor */ "./src/scenes/common/cursor.ts");





function positionStaticItems(scene) {
    var canvasRectangle = Object(_common_rectangle__WEBPACK_IMPORTED_MODULE_1__["createRectangle"])({
        width: scene.canvas.config.width,
        height: scene.canvas.config.height
    });
    var titleText = scene.staticPool.getItem('titleText');
    var startGame = scene.staticPool.getItem('startGame');
    var about = scene.staticPool.getItem('about');
    var copyright = scene.staticPool.getItem('copyright');
    titleText.rectangle.centerX(canvasRectangle);
    startGame.rectangle.centerX(canvasRectangle);
    about.rectangle.centerX(canvasRectangle);
    copyright.rectangle.centerX(canvasRectangle);
    titleText.rectangle.y = 18;
    startGame.rectangle.y = 154;
    about.rectangle.y = startGame.rectangle.y + 19;
    copyright.rectangle.y = canvasRectangle.height - 16;
}
var selection = {
    index: 0,
    items: [
        'startGame',
        'about'
    ]
};
var title = {
    name: 'title',
    bgColor: '#000',
    preload: {
        'theme': 'src/scenes/assets/title/theme.mp3',
        'select': 'src/scenes/assets/title/select.mp3',
        'titleText': 'src/scenes/assets/title/title-text.json',
        'cursor': 'src/scenes/assets/title/cursor.json'
    },
    init: function () {
        var _this = this;
        selection.index = 0;
        _common_cursor__WEBPACK_IMPORTED_MODULE_4__["cursor"].tickCount = 0;
        this.staticPool.addItems('main', {
            name: 'titleText',
            sprite: Object(_common_sprite__WEBPACK_IMPORTED_MODULE_2__["createMetaTileSprite"])({
                metaTile: this.metaTiles.titleText
            })
        });
        this.staticPool.addItems('main', {
            name: 'copyright',
            sprite: Object(_common_sprite__WEBPACK_IMPORTED_MODULE_2__["createTextSprite"])({
                color: '#eee',
                options: _common_textOptions__WEBPACK_IMPORTED_MODULE_3__["textOptions"],
                value: '2021 COSMIC POLYGON'
            })
        });
        this.staticPool.addItems('selection', {
            name: 'startGame',
            sprite: Object(_common_sprite__WEBPACK_IMPORTED_MODULE_2__["createTextSprite"])({
                color: '#eee',
                options: _common_textOptions__WEBPACK_IMPORTED_MODULE_3__["textOptions"],
                value: 'START GAME'
            })
        });
        this.staticPool.addItems('selection', {
            name: 'about',
            sprite: Object(_common_sprite__WEBPACK_IMPORTED_MODULE_2__["createTextSprite"])({
                color: '#eee',
                options: _common_textOptions__WEBPACK_IMPORTED_MODULE_3__["textOptions"],
                value: 'ABOUT'
            })
        });
        positionStaticItems(this);
        this.dynamicPool.addItems('main', {
            name: 'cursor',
            sprite: Object(_common_sprite__WEBPACK_IMPORTED_MODULE_2__["createMetaTileSprite"])({
                metaTile: this.metaTiles.cursor
            })
        });
        var handleSelection = function () {
            _common_mediaPlayer__WEBPACK_IMPORTED_MODULE_0__["mediaPlayer"].pauseAll();
            _common_mediaPlayer__WEBPACK_IMPORTED_MODULE_0__["mediaPlayer"].play('select', false, function () {
                switch (selection.index) {
                    case 0:
                        _this.changeScene('intro');
                        break;
                    case 1:
                        _this.changeScene('about');
                        break;
                }
            });
        };
        this.controls.upPress = function () {
            if (selection.index > 0) {
                selection.index--;
            }
        };
        this.controls.downPress = function () {
            if (selection.index < selection.items.length - 1) {
                selection.index++;
            }
        };
        this.controls.aPress = function () {
            handleSelection();
        };
        this.controls.startPress = function () {
            handleSelection();
        };
        _common_mediaPlayer__WEBPACK_IMPORTED_MODULE_0__["mediaPlayer"].play('theme', true);
    },
    update: function () {
        var itemsGroup = this.staticPool.getGroup('selection');
        _common_cursor__WEBPACK_IMPORTED_MODULE_4__["cursor"].update(this, itemsGroup.items[selection.index].sprite.rectangle);
    },
    onResize: function () {
        positionStaticItems(this);
    }
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9hc3NldExvYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2NhbnZhcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2NvbmZpZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2NvbnRyb2xzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vaGl0Qm94LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vbG9vcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL21lZGlhUGxheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vbWV0YVRpbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9wb29sLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vcmVjdGFuZ2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vc2NlbmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9zaGFwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9zcHJpdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi90ZXh0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vdGlsZUxvYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjZW5lcy9hYm91dC9hYm91dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NlbmVzL2NvbW1vbi9jdXJzb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjZW5lcy9jb21tb24vdGV4dE9wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjZW5lcy9sb2FkaW5nL2xvYWRpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjZW5lcy9zcGxhc2gvc3BsYXNoLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2VuZXMvdGl0bGUvdGl0bGUudHMiXSwi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LFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNoRCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDbkI7UUFDSCxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRztZQUNyQixlQUFlLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRztZQUN6QixlQUFlLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUM7UUFFRiwrREFBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELE1BQU0sRUFBRTtRQUNOLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pELHFEQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELFFBQVEsRUFBRTtRQUNSLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDRixDQUFDIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBNZWRpYVBsYXllciB9IGZyb20gJy4vbWVkaWFQbGF5ZXInO1xuaW1wb3J0IHsgTWV0YVRpbGUgfSBmcm9tICcuL21ldGFUaWxlJztcbmltcG9ydCB7IHRpbGVMb2FkZXIgfSBmcm9tICcuL3RpbGVMb2FkZXInO1xuXG5mdW5jdGlvbiBnZXRQYXRoc09mVHlwZSAoXG4gIHBhdGhzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9LCB0eXBlOiAnLm1wMycgfCAnLmpzb24nXG4pOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHtcbiAgY29uc3QgcGF0aHNPZlR5cGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblxuICBmb3IgKGNvbnN0IG5hbWUgaW4gcGF0aHMpIHtcbiAgICBjb25zdCBwYXRoID0gcGF0aHNbbmFtZV07XG5cbiAgICBpZiAocGF0aC5lbmRzV2l0aCh0eXBlKSkge1xuICAgICAgcGF0aHNPZlR5cGVbbmFtZV0gPSBwYXRoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXRoc09mVHlwZTtcbn1cblxuLyoqXG4gKiBtZWRpYSBhbmQganNvbiBmaWxlcyBhcmUgbm90IHBhcmFsbGVsaXplZC4uLiAmc2hydWc7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NldExvYWRlciAoXG4gIG1lZGlhUGxheWVyOiBNZWRpYVBsYXllcixcbiAgcGF0aHM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0sXG4gIG9uQ29tcGxldGU6ICh0aWxlczogeyBba2V5OiBzdHJpbmddOiBNZXRhVGlsZSB9KSA9PiBhbnlcbik6IHZvaWQge1xuICBmdW5jdGlvbiBtZWRpYUNvbXBsZXRlICgpOiB2b2lkIHtcbiAgICB0aWxlTG9hZGVyKGdldFBhdGhzT2ZUeXBlKHBhdGhzLCAnLmpzb24nKSwgdGlsZXNDb21wbGV0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aWxlc0NvbXBsZXRlICh0aWxlczogeyBba2V5OiBzdHJpbmddOiBNZXRhVGlsZSB9KTogdm9pZCB7XG4gICAgb25Db21wbGV0ZSh0aWxlcyk7XG4gIH1cblxuICBtZWRpYVBsYXllci5sb2FkKGdldFBhdGhzT2ZUeXBlKHBhdGhzLCAnLm1wMycpLCBtZWRpYUNvbXBsZXRlKTtcbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgQ2FudmFzQ29uZmlnIHtcbiAgcHBwOiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBDYW52YXNUeXBlID0gJ3N0YXRpYycgfCAnZHluYW1pYyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FudmFzIHtcbiAgZWxlbWVudDogUmVjb3JkPENhbnZhc1R5cGUsIEhUTUxDYW52YXNFbGVtZW50PjtcbiAgY29udGV4dDogUmVjb3JkPENhbnZhc1R5cGUsIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRD47XG4gIGNvbmZpZzogQ2FudmFzQ29uZmlnO1xuXG4gIGNsZWFyOiAoY2FudmFzVHlwZTogQ2FudmFzVHlwZSwgY29sb3VyPzogc3RyaW5nKSA9PiB2b2lkO1xuICBmaXRUb1ZpZXdwb3J0OiAoKSA9PiB2b2lkO1xuICBnZXRTY2FsZUZhY3RvcjogKHZpZXdwb3J0V2lkdGg6IG51bWJlciwgdmlld3BvcnRIZWlnaHQ6IG51bWJlcikgPT4gbnVtYmVyO1xuICBvblJlc2l6ZTogKCkgPT4gYW55O1xuICByZXF1ZXN0RnVsbHNjcmVlbjogKCkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEBwYXJhbSB7UGFydGlhbDxDYW52YXNDb25maWc+fSBbY29uZmlnPXt9XVxuICogQHJldHVybnMge0NhbnZhc31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNhbnZhcyAodXNlckNvbmZpZzogUGFydGlhbDxDYW52YXNDb25maWc+ID0ge30pOiBDYW52YXMge1xuICBjb25zdCBjb25maWc6IENhbnZhc0NvbmZpZyA9IHtcbiAgICBwcHA6IDEsXG4gICAgLy8gbmVzOiAyNTZ4MjQwXG4gICAgd2lkdGg6IDMyMCxcbiAgICBoZWlnaHQ6IDI0MCxcbiAgICAuLi51c2VyQ29uZmlnXG4gIH07XG5cbiAgZnVuY3Rpb24gY2FudmFzRmFjdG9yeSAoaWQ6IHN0cmluZyk6IHsgZWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnQsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB9IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgICBlbGVtZW50LmlkID0gaWQ7XG4gICAgZWxlbWVudC53aWR0aCA9IGNvbmZpZy53aWR0aDtcbiAgICBlbGVtZW50LmhlaWdodCA9IGNvbmZpZy5oZWlnaHQ7XG4gICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cbiAgICBjb25zdCBjb250ZXh0ID0gZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGNvbnRleHQhLmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlOyAvLyAqY3dpc3B5KlxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGVsZW1lbnQsXG4gICAgICBjb250ZXh0XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHN0YXRpY3VsYXIgPSBjYW52YXNGYWN0b3J5KCdzdGF0aWMnKTtcbiAgY29uc3QgZHluYW1pYyA9IGNhbnZhc0ZhY3RvcnkoJ2R5bmFtaWMnKTtcblxuICBkb2N1bWVudC5ib2R5LnN0eWxlLm1hcmdpbiA9ICcwJztcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3RhdGljdWxhci5lbGVtZW50KTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkeW5hbWljLmVsZW1lbnQpO1xuXG4gIHJldHVybiB7XG4gICAgZWxlbWVudDoge1xuICAgICAgc3RhdGljOiBzdGF0aWN1bGFyLmVsZW1lbnQsXG4gICAgICBkeW5hbWljOiBkeW5hbWljLmVsZW1lbnRcbiAgICB9LFxuICAgIGNvbnRleHQ6IHtcbiAgICAgIHN0YXRpYzogc3RhdGljdWxhci5jb250ZXh0LFxuICAgICAgZHluYW1pYzogZHluYW1pYy5jb250ZXh0XG4gICAgfSxcbiAgICBjb25maWcsXG4gICAgb25SZXNpemU6IG51bGwsXG5cbiAgICBjbGVhcjogZnVuY3Rpb24gKHR5cGU6IENhbnZhc1R5cGUsIGNvbG91cj86IHN0cmluZyk6IHZvaWQge1xuICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLmNvbmZpZy53aWR0aDtcbiAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY29uZmlnLmhlaWdodDtcbiAgICAgIGNvbnN0IHBwcCA9IHRoaXMuY29uZmlnLnBwcDtcbiAgICBcbiAgICAgIGlmIChjb2xvdXIpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0W3R5cGVdLmZpbGxTdHlsZSA9IGNvbG91cjtcbiAgICAgICAgdGhpcy5jb250ZXh0W3R5cGVdLmZpbGxSZWN0KDAsIDAsIHdpZHRoICogcHBwLCBoZWlnaHQgKiBwcHApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb250ZXh0W3R5cGVdLmNsZWFyUmVjdCgwLCAwLCB3aWR0aCAqIHBwcCwgaGVpZ2h0ICogcHBwKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0U2NhbGVGYWN0b3I6IGZ1bmN0aW9uICh2aWV3cG9ydFdpZHRoOiBudW1iZXIsIHZpZXdwb3J0SGVpZ2h0OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgY29uc3Qgdmlld3BvcnRJc0xhbmRzY2FwZSA9IHZpZXdwb3J0V2lkdGggPiB2aWV3cG9ydEhlaWdodDtcbiAgICAgIGNvbnN0IGNhbnZhc0lzTGFuZHNjYXBlID0gdGhpcy5jb25maWcud2lkdGggPiB0aGlzLmNvbmZpZy5oZWlnaHQ7XG4gICAgICBsZXQgcGl4ZWxzUGVyUGl4ZWw6IG51bWJlcjtcbiAgICBcbiAgICAgIGlmICh2aWV3cG9ydElzTGFuZHNjYXBlKSB7XG4gICAgICAgIGlmIChjYW52YXNJc0xhbmRzY2FwZSAmJiB0aGlzLmNvbmZpZy5oZWlnaHQgKiAodmlld3BvcnRXaWR0aCAvIHRoaXMuY29uZmlnLndpZHRoKSA8PSB2aWV3cG9ydEhlaWdodCkge1xuICAgICAgICAgIHBpeGVsc1BlclBpeGVsID0gdmlld3BvcnRXaWR0aCAvIHRoaXMuY29uZmlnLndpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBpeGVsc1BlclBpeGVsID0gdmlld3BvcnRIZWlnaHQgLyB0aGlzLmNvbmZpZy5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghY2FudmFzSXNMYW5kc2NhcGUgJiYgdGhpcy5jb25maWcud2lkdGggKiAodmlld3BvcnRIZWlnaHQgLyB0aGlzLmNvbmZpZy5oZWlnaHQpIDw9IHZpZXdwb3J0V2lkdGgpIHtcbiAgICAgICAgICBwaXhlbHNQZXJQaXhlbCA9IHZpZXdwb3J0SGVpZ2h0IC8gdGhpcy5jb25maWcuaGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBpeGVsc1BlclBpeGVsID0gdmlld3BvcnRXaWR0aCAvIHRoaXMuY29uZmlnLndpZHRoO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwaXhlbHNQZXJQaXhlbCA8IDIgPyBwaXhlbHNQZXJQaXhlbCA6IE1hdGguZmxvb3IocGl4ZWxzUGVyUGl4ZWwpO1xuICAgIH0sXG5cbiAgICBmaXRUb1ZpZXdwb3J0OiBmdW5jdGlvbiAoKTogdm9pZCB7XG4gICAgICBjb25zdCB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGNvbnN0IHNjYWxlRmFjdG9yID0gdGhpcy5nZXRTY2FsZUZhY3Rvcih2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCk7XG5cbiAgICAgIHRoaXMuY29uZmlnLnBwcCA9IHNjYWxlRmFjdG9yO1xuXG4gICAgICBmb3IgKGNvbnN0IHR5cGUgaW4gdGhpcy5lbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRbdHlwZSBhcyBDYW52YXNUeXBlXTtcblxuICAgICAgICBlbGVtZW50LndpZHRoID0gdGhpcy5jb25maWcud2lkdGggKiBzY2FsZUZhY3RvcjtcbiAgICAgICAgZWxlbWVudC5oZWlnaHQgPSB0aGlzLmNvbmZpZy5oZWlnaHQgKiBzY2FsZUZhY3RvcjtcblxuICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IGAke3ZpZXdwb3J0SGVpZ2h0IC8gMiAtIGVsZW1lbnQuaGVpZ2h0IC8gMn1weGA7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IGAke3ZpZXdwb3J0V2lkdGggLyAyIC0gZWxlbWVudC53aWR0aCAvIDJ9cHhgO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRoaXMub25SZXNpemUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByZXF1ZXN0RnVsbHNjcmVlbjogZnVuY3Rpb24gKCk6IHZvaWQge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgfVxuICB9O1xufVxuIiwiZXhwb3J0IGludGVyZmFjZSBDb25maWcge1xuICBkZWJ1ZzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGNvbmZpZzogQ29uZmlnID0ge1xuICBkZWJ1ZzogZmFsc2Vcbn07XG4iLCJleHBvcnQgaW50ZXJmYWNlIENvbnRyb2xzIHtcbiAgdXBQcmVzczogKGU/OiBLZXlib2FyZEV2ZW50KSA9PiBhbnk7XG4gIHJpZ2h0UHJlc3M6IChlPzogS2V5Ym9hcmRFdmVudCkgPT4gYW55O1xuICBkb3duUHJlc3M6IChlPzogS2V5Ym9hcmRFdmVudCkgPT4gYW55O1xuICBsZWZ0UHJlc3M6IChlPzogS2V5Ym9hcmRFdmVudCkgPT4gYW55O1xuICBhUHJlc3M6IChlPzogS2V5Ym9hcmRFdmVudCkgPT4gYW55O1xuICBiUHJlc3M6IChlPzogS2V5Ym9hcmRFdmVudCkgPT4gYW55O1xuICBzZWxlY3RQcmVzczogKGU/OiBLZXlib2FyZEV2ZW50KSA9PiBhbnk7XG4gIHN0YXJ0UHJlc3M6IChlPzogS2V5Ym9hcmRFdmVudCkgPT4gYW55O1xuXG4gIHVwUmVsZWFzZTogKGU/OiBLZXlib2FyZEV2ZW50KSA9PiBhbnk7XG4gIHJpZ2h0UmVsZWFzZTogKGU/OiBLZXlib2FyZEV2ZW50KSA9PiBhbnk7XG4gIGRvd25SZWxlYXNlOiAoZT86IEtleWJvYXJkRXZlbnQpID0+IGFueTtcbiAgbGVmdFJlbGVhc2U6IChlPzogS2V5Ym9hcmRFdmVudCkgPT4gYW55O1xuICBhUmVsZWFzZTogKGU/OiBLZXlib2FyZEV2ZW50KSA9PiBhbnk7XG4gIGJSZWxlYXNlOiAoZT86IEtleWJvYXJkRXZlbnQpID0+IGFueTtcbiAgc2VsZWN0UmVsZWFzZTogKGU/OiBLZXlib2FyZEV2ZW50KSA9PiBhbnk7XG4gIHN0YXJ0UmVsZWFzZTogKGU/OiBLZXlib2FyZEV2ZW50KSA9PiBhbnk7XG5cbiAga2V5RG93bjogKGU/OiBLZXlib2FyZEV2ZW50KSA9PiBhbnk7XG4gIGtleVVwOiAoZT86IEtleWJvYXJkRXZlbnQpID0+IGFueTtcblxuICByZXNldDogKCkgPT4gdm9pZDtcbiAgdXBkYXRlOiAoKSA9PiB2b2lkO1xufVxuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5sZXQgZXZlbnRRdWV1ZTogKGtleW9mIE9taXQ8Q29udHJvbHMsICdyZXNldCcgfCAndXBkYXRlJz4pW10gPSBbXTtcblxuZXhwb3J0IGNvbnN0IGNvbnRyb2xzOiBDb250cm9scyA9IHtcbiAgdXBQcmVzczogbm9vcCxcbiAgbGVmdFByZXNzOiBub29wLFxuICBkb3duUHJlc3M6IG5vb3AsXG4gIHJpZ2h0UHJlc3M6IG5vb3AsXG4gIGFQcmVzczogbm9vcCxcbiAgYlByZXNzOiBub29wLFxuICBzZWxlY3RQcmVzczogbm9vcCxcbiAgc3RhcnRQcmVzczogbm9vcCxcblxuICB1cFJlbGVhc2U6IG5vb3AsXG4gIGxlZnRSZWxlYXNlOiBub29wLFxuICBkb3duUmVsZWFzZTogbm9vcCxcbiAgcmlnaHRSZWxlYXNlOiBub29wLFxuICBhUmVsZWFzZTogbm9vcCxcbiAgYlJlbGVhc2U6IG5vb3AsXG4gIHNlbGVjdFJlbGVhc2U6IG5vb3AsXG4gIHN0YXJ0UmVsZWFzZTogbm9vcCxcblxuICBrZXlEb3duOiBub29wLFxuICBrZXlVcDogbm9vcCxcblxuICByZXNldDogZnVuY3Rpb24gKCk6IHZvaWQge1xuICAgIGNvbnRyb2xzLnVwUHJlc3MgPSBub29wO1xuICAgIGNvbnRyb2xzLmxlZnRQcmVzcyA9IG5vb3A7XG4gICAgY29udHJvbHMuZG93blByZXNzID0gbm9vcDtcbiAgICBjb250cm9scy5yaWdodFByZXNzID0gbm9vcDtcbiAgICBjb250cm9scy5hUHJlc3MgPSBub29wO1xuICAgIGNvbnRyb2xzLmJQcmVzcyA9IG5vb3A7XG4gICAgY29udHJvbHMuc2VsZWN0UHJlc3MgPSBub29wO1xuICAgIGNvbnRyb2xzLnN0YXJ0UHJlc3MgPSBub29wO1xuICBcbiAgICBjb250cm9scy51cFJlbGVhc2UgPSBub29wO1xuICAgIGNvbnRyb2xzLmxlZnRSZWxlYXNlID0gbm9vcDtcbiAgICBjb250cm9scy5kb3duUmVsZWFzZSA9IG5vb3A7XG4gICAgY29udHJvbHMucmlnaHRSZWxlYXNlID0gbm9vcDtcbiAgICBjb250cm9scy5hUmVsZWFzZSA9IG5vb3A7XG4gICAgY29udHJvbHMuYlJlbGVhc2UgPSBub29wO1xuICAgIGNvbnRyb2xzLnNlbGVjdFJlbGVhc2UgPSBub29wO1xuICAgIGNvbnRyb2xzLnN0YXJ0UmVsZWFzZSA9IG5vb3A7XG4gIFxuICAgIGNvbnRyb2xzLmtleURvd24gPSBub29wO1xuICAgIGNvbnRyb2xzLmtleVVwID0gbm9vcDtcbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uICgpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGV2ZW50TmFtZSBvZiBldmVudFF1ZXVlKSB7XG4gICAgICBjb250cm9sc1tldmVudE5hbWVdKCk7XG4gICAgfVxuICBcbiAgICBldmVudFF1ZXVlID0gW107XG4gIH1cbn1cblxuZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24gKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHN3aXRjaChlLmtleSkge1xuICAgIGNhc2UgJ3cnOlxuICAgIGNhc2UgJ1cnOlxuICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgZXZlbnRRdWV1ZS5wdXNoKCd1cFByZXNzJyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdkJzpcbiAgICBjYXNlICdEJzpcbiAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgIGV2ZW50UXVldWUucHVzaCgncmlnaHRQcmVzcycpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncyc6XG4gICAgY2FzZSAnUyc6XG4gICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgIGV2ZW50UXVldWUucHVzaCgnZG93blByZXNzJyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdhJzpcbiAgICBjYXNlICdBJzpcbiAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgZXZlbnRRdWV1ZS5wdXNoKCdsZWZ0UHJlc3MnKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnaic6XG4gICAgY2FzZSAnSic6XG4gICAgY2FzZSAneic6XG4gICAgY2FzZSAnWic6XG4gICAgICBldmVudFF1ZXVlLnB1c2goJ2FQcmVzcycpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnayc6XG4gICAgY2FzZSAnSyc6XG4gICAgY2FzZSAneCc6XG4gICAgY2FzZSAnWCc6XG4gICAgICBldmVudFF1ZXVlLnB1c2goJ2JQcmVzcycpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICcgJzpcbiAgICAgIGV2ZW50UXVldWUucHVzaCgnc2VsZWN0UHJlc3MnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgIGV2ZW50UXVldWUucHVzaCgnc3RhcnRQcmVzcycpO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBpZiAoIWUubWV0YUtleSkge1xuICAgIGV2ZW50UXVldWUucHVzaCgna2V5RG93bicpO1xuICB9XG59O1xuXG5kb2N1bWVudC5vbmtleXVwID0gZnVuY3Rpb24gKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHN3aXRjaChlLmtleSkge1xuICAgIGNhc2UgJ3cnOlxuICAgIGNhc2UgJ1cnOlxuICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgZXZlbnRRdWV1ZS5wdXNoKCd1cFJlbGVhc2UnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2QnOlxuICAgIGNhc2UgJ0QnOlxuICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgZXZlbnRRdWV1ZS5wdXNoKCdyaWdodFJlbGVhc2UnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3MnOlxuICAgIGNhc2UgJ1MnOlxuICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICBldmVudFF1ZXVlLnB1c2goJ2Rvd25SZWxlYXNlJyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdhJzpcbiAgICBjYXNlICdBJzpcbiAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgZXZlbnRRdWV1ZS5wdXNoKCdsZWZ0UmVsZWFzZScpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdqJzpcbiAgICBjYXNlICdKJzpcbiAgICBjYXNlICd6JzpcbiAgICBjYXNlICdaJzpcbiAgICAgIGV2ZW50UXVldWUucHVzaCgnYVJlbGVhc2UnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2snOlxuICAgIGNhc2UgJ0snOlxuICAgIGNhc2UgJ3gnOlxuICAgIGNhc2UgJ1gnOlxuICAgICAgZXZlbnRRdWV1ZS5wdXNoKCdiUmVsZWFzZScpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICcgJzpcbiAgICAgIGV2ZW50UXVldWUucHVzaCgnc2VsZWN0UmVsZWFzZScpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnRW50ZXInOlxuICAgICAgZXZlbnRRdWV1ZS5wdXNoKCdzdGFydFJlbGVhc2UnKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgaWYgKCFlLm1ldGFLZXkpIHtcbiAgICBldmVudFF1ZXVlLnB1c2goJ2tleVVwJyk7ICBcbiAgfVxufTtcbiIsImltcG9ydCB7IENhbnZhcywgQ2FudmFzVHlwZSB9IGZyb20gXCIuL2NhbnZhc1wiO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyBjcmVhdGVSZWN0YW5nbGUsIFJlY3RhbmdsZSB9IGZyb20gXCIuL3JlY3RhbmdsZVwiO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSGl0Qm94IHtcbiAgY29sb3I6IHN0cmluZzsgLy8gbW92ZSB0byBkZWJ1ZyBvYmplY3RcbiAgcmVjdGFuZ2xlOiBSZWN0YW5nbGU7XG4gIGRyYXc6ICh0eXBlOiBDYW52YXNUeXBlLCBjYW52YXM6IENhbnZhcykgPT4gdm9pZDtcbiAgaGl0OiAoaGl0Qm94OiBIaXRCb3gpID0+IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIaXRCb3ggKFxuICBwYXJhbXM6IFBhcnRpYWw8UGljazxIaXRCb3gsICdjb2xvcicgfCAncmVjdGFuZ2xlJz4+ID0ge31cbik6IEhpdEJveCB7XG4gIHJldHVybiB7XG4gICAgY29sb3I6ICcjMDZmJyxcbiAgICByZWN0YW5nbGU6IGNyZWF0ZVJlY3RhbmdsZShwYXJhbXMucmVjdGFuZ2xlKSxcblxuICAgIGRyYXc6IGZ1bmN0aW9uICh0eXBlOiBDYW52YXNUeXBlLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgaWYgKGNvbmZpZy5kZWJ1Zykge1xuICAgICAgICBjb25zb2xlLmxvZyhgaGl0Qm94LmRyYXcoKWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcHAgPSBjYW52YXMuY29uZmlnLnBwcDtcbiAgICAgIGNhbnZhcy5jb250ZXh0W3R5cGVdLmdsb2JhbEFscGhhID0gMC40O1xuICAgICAgY2FudmFzLmNvbnRleHRbdHlwZV0uZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgIGNhbnZhcy5jb250ZXh0W3R5cGVdLmZpbGxSZWN0KFxuICAgICAgICAodGhpcy5yZWN0YW5nbGUueCkgKiBwcHAsXG4gICAgICAgICh0aGlzLnJlY3RhbmdsZS55KSAqIHBwcCwgXG4gICAgICAgICh0aGlzLnJlY3RhbmdsZS53aWR0aCkgKiBwcHAsXG4gICAgICAgICh0aGlzLnJlY3RhbmdsZS5oZWlnaHQpICogcHBwXG4gICAgICApO1xuICAgIH0sXG5cbiAgICBoaXQ6IGZ1bmN0aW9uIChoaXRCb3g6IEhpdEJveCk6IGJvb2xlYW4ge1xuICAgICAgLy8gVE9ET1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgLi4ucGFyYW1zXG4gIH1cbn1cbiIsImltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvb3Age1xuICBzdGFydDogKCkgPT4gdm9pZDtcbiAgc3RvcDogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgZnBzID0gMjQ7XG5sZXQgdGhlbjogbnVtYmVyO1xubGV0IGVsYXBzZWQ6IG51bWJlcjtcbmxldCBub3c6IG51bWJlcjtcbmxldCBjYW5VcGRhdGUgPSBmYWxzZTtcbmxldCB0aWNrQ291bnQgPSAwO1xubGV0IGNhbGxiYWNrOiAoKSA9PiB2b2lkO1xuXG5mdW5jdGlvbiB1cGRhdGUgKCk6IHZvaWQge1xuICBpZiAoIWNhblVwZGF0ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuXG4gIG5vdyA9IERhdGUubm93KCk7XG4gIGVsYXBzZWQgPSBub3cgLSB0aGVuO1xuXG4gIGlmIChlbGFwc2VkID4gZnBzKSB7XG4gICAgdGhlbiA9IG5vdyAtIChlbGFwc2VkICUgZnBzKTtcbiAgICBcbiAgICBpZiAoY29uZmlnLmRlYnVnKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aWNrQ291bnQpO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgICB0aWNrQ291bnQrKztcbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQgKGNiOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gIGNhbGxiYWNrID0gY2I7XG4gIHRoZW4gPSBEYXRlLm5vdygpO1xuICBzdGFydCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnQgKCk6IHZvaWQge1xuICBjYW5VcGRhdGUgPSB0cnVlO1xuICB1cGRhdGUoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3AgKCk6IHZvaWQge1xuICBjYW5VcGRhdGUgPSBmYWxzZTtcbn1cbiIsInR5cGUgVHJhY2tzID0geyBbbmFtZTogc3RyaW5nXTogSFRNTEF1ZGlvRWxlbWVudCB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIE1lZGlhUGxheWVyIHtcbiAgdHJhY2tzOiBUcmFja3MsXG5cbiAgbG9hZDogKHBhdGhzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9LCBvbkNvbXBsZXRlOiAoKSA9PiBhbnkpID0+IHZvaWQ7XG4gIHBsYXk6IChuYW1lOiBzdHJpbmcsIGxvb3A/OiBib29sZWFuLCBvbkNvbXBsZXRlPzogKCkgPT4gYW55KSA9PiB2b2lkO1xuICBwYXVzZTogKG5hbWU6IHN0cmluZykgPT4gdm9pZDtcbiAgcGF1c2VBbGw6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBtZWRpYVBsYXllcjogTWVkaWFQbGF5ZXIgPSB7XG4gIHRyYWNrczoge30sXG5cbiAgbG9hZDogZnVuY3Rpb24gKHBhdGhzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9LCBvbkNvbXBsZXRlOiAoKSA9PiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCB0cmFja0NvdW50ID0gT2JqZWN0LmtleXMocGF0aHMpLmxlbmd0aDtcbiAgICBsZXQgbG9hZGVkQ291bnQgPSAwO1xuXG4gICAgaWYgKCF0cmFja0NvdW50KSB7XG4gICAgICBvbkNvbXBsZXRlKCk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIG9uTG9hZGVkICgpOiB2b2lkIHtcbiAgICAgIGxvYWRlZENvdW50Kys7XG5cbiAgICAgIGlmIChsb2FkZWRDb3VudCA9PT0gdHJhY2tDb3VudCkge1xuICAgICAgICBvbkNvbXBsZXRlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBuYW1lIGluIHBhdGhzKSB7XG4gICAgICBjb25zdCBhdWRpbyA9IG5ldyBBdWRpbygpO1xuICAgICAgdGhpcy50cmFja3NbbmFtZV0gPSBhdWRpbztcblxuICAgICAgYXVkaW8uc3JjID0gcGF0aHNbbmFtZV07XG4gICAgICBhdWRpby5vbmNhbnBsYXl0aHJvdWdoID0gb25Mb2FkZWQ7XG4gICAgfVxuICB9LFxuXG4gIHBsYXk6IGZ1bmN0aW9uIChuYW1lOiBzdHJpbmcsIGxvb3A6IGJvb2xlYW4gPSBmYWxzZSwgb25Db21wbGV0ZT86ICgpID0+IGFueSk6IHZvaWQge1xuICAgIGlmIChvbkNvbXBsZXRlKSB7XG4gICAgICB0aGlzLnRyYWNrc1tuYW1lXS5vbmVuZGVkID0gKCkgPT4ge1xuICAgICAgICBvbkNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMudHJhY2tzW25hbWVdLm9uZW5kZWQgPSBudWxsO1xuICAgICAgfTtcbiAgICB9XG4gICAgdGhpcy50cmFja3NbbmFtZV0ubG9vcCA9IGxvb3A7XG4gICAgdGhpcy50cmFja3NbbmFtZV0ucGxheSgpO1xuICB9LFxuXG4gIHBhdXNlOiBmdW5jdGlvbiAobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy50cmFja3NbbmFtZV0ucGF1c2UoKTtcbiAgfSxcblxuICBwYXVzZUFsbDogZnVuY3Rpb24gKCk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgbmFtZSBpbiB0aGlzLnRyYWNrcykge1xuICAgICAgdGhpcy50cmFja3NbbmFtZV0ucGF1c2UoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENhbnZhcywgQ2FudmFzVHlwZSB9IGZyb20gXCIuL2NhbnZhc1wiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiLi9wYWxldHRlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWV0YVRpbGUge1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgZnJhbWU6IG51bWJlcjtcbiAgdGlsZXM6IENvbG9yW11bXTtcbn1cblxuLyoqXG4gKiBcbiAqIEBwYXJhbSBjYW52YXMgXG4gKiBAcGFyYW0gdGlsZVggXG4gKiBAcGFyYW0gdGlsZVkgXG4gKiBAcGFyYW0gbWV0YVRpbGUgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkcmF3VGlsZSAodHlwZTogQ2FudmFzVHlwZSwgY2FudmFzOiBDYW52YXMsIHRpbGVYOiBudW1iZXIsIHRpbGVZOiBudW1iZXIsIG1ldGFUaWxlOiBNZXRhVGlsZSk6IHZvaWQge1xuICBsZXQgeCA9IDA7XG4gIGxldCB5ID0gMDtcbiAgY29uc3QgcHBwID0gY2FudmFzLmNvbmZpZy5wcHA7XG4gIGNvbnN0IHRpbGUgPSBtZXRhVGlsZS50aWxlc1ttZXRhVGlsZS5mcmFtZV07XG5cbiAgY2FudmFzLmNvbnRleHRbdHlwZV0uZ2xvYmFsQWxwaGEgPSAxO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGlsZS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGhleCA9IHRpbGVbaV07XG5cbiAgICBpZiAoaGV4KSB7XG4gICAgICBjYW52YXMuY29udGV4dFt0eXBlXS5maWxsU3R5bGUgPSBoZXg7XG4gICAgICBjYW52YXMuY29udGV4dFt0eXBlXS5maWxsUmVjdChcbiAgICAgICAgKHRpbGVYICsgeCkgKiBwcHAsXG4gICAgICAgICh0aWxlWSArIHkpICogcHBwLFxuICAgICAgICBwcHAsIHBwcFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoeCA9PT0gbWV0YVRpbGUud2lkdGggLSAxKSB7XG4gICAgICB4ID0gMDtcbiAgICAgIHkrKztcbiAgICB9IGVsc2Uge1xuICAgICAgeCsrO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2FudmFzLCBDYW52YXNUeXBlIH0gZnJvbSAnLi9jYW52YXMnO1xuaW1wb3J0IHsgTWV0YVRpbGVTcHJpdGUsIFRleHRTcHJpdGUgfSBmcm9tIFwiLi9zcHJpdGVcIjtcblxuZXhwb3J0IHR5cGUgU3ByaXRlSXRlbSA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICBzcHJpdGU6IE1ldGFUaWxlU3ByaXRlIHwgVGV4dFNwcml0ZTtcbn1cblxuLy8gVE9ETyBjb25zaWRlciBzdGF0aWMvZHluYW1pYyBncm91cHMgaW5zdGVhZCBvZiBzZXBhcmF0ZSBjYW52YXMgZWxlbWVudHNcbmV4cG9ydCB0eXBlIFNwcml0ZUl0ZW1Hcm91cCA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICBpdGVtczogU3ByaXRlSXRlbVtdO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBQb29sIHtcbiAgaXRlbXM6IFNwcml0ZUl0ZW1Hcm91cFtdO1xuXG4gIGFkZEl0ZW1zOiAoZ3JvdXBOYW1lOiBzdHJpbmcsIC4uLml0ZW1zOiBTcHJpdGVJdGVtW10pID0+IHZvaWQ7XG4gIGdldEl0ZW06IChuYW1lOiBzdHJpbmcpID0+IE1ldGFUaWxlU3ByaXRlIHwgVGV4dFNwcml0ZTtcbiAgZ2V0R3JvdXA6IChuYW1lOiBzdHJpbmcpID0+IFNwcml0ZUl0ZW1Hcm91cDtcbiAgcmVtb3ZlSXRlbTogKGdyb3VwTmFtZTogc3RyaW5nLCBpdGVtTmFtZTogc3RyaW5nKSA9PiB2b2lkO1xuICBkcmF3OiAodHlwZTogQ2FudmFzVHlwZSwgY2FudmFzOiBDYW52YXMpID0+IHZvaWQ7XG4gIGVtcHR5OiAoKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBvb2wgKCk6IFBvb2wge1xuICByZXR1cm4ge1xuICAgIGl0ZW1zOiBbXSxcblxuICAgIGFkZEl0ZW1zOiBmdW5jdGlvbiAoZ3JvdXBOYW1lOiBzdHJpbmcsIC4uLml0ZW1zOiBTcHJpdGVJdGVtW10pOiB2b2lkIHtcbiAgICAgIGxldCBncm91cCA9IHRoaXMuaXRlbXMuZmluZCgoZ3JvdXA6IFNwcml0ZUl0ZW1Hcm91cCkgPT4gZ3JvdXAubmFtZSA9PT0gZ3JvdXBOYW1lKTtcblxuICAgICAgaWYgKCFncm91cCkge1xuICAgICAgICBncm91cCA9IHtcbiAgICAgICAgICBuYW1lOiBncm91cE5hbWUsXG4gICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGdyb3VwKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGdyb3VwLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGdldEl0ZW06IGZ1bmN0aW9uIChuYW1lOiBzdHJpbmcpOiBNZXRhVGlsZVNwcml0ZSB8IFRleHRTcHJpdGUge1xuICAgICAgbGV0IHJlcXVlc3RlZEl0ZW06IE1ldGFUaWxlU3ByaXRlIHwgVGV4dFNwcml0ZTtcblxuICAgICAgZm9yIChjb25zdCBncm91cCBvZiB0aGlzLml0ZW1zKSB7XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBncm91cC5pdGVtcykge1xuICAgICAgICAgIGlmIChpdGVtLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICAgIHJlcXVlc3RlZEl0ZW0gPSBpdGVtLnNwcml0ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmVxdWVzdGVkSXRlbSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXF1ZXN0ZWRJdGVtO1xuICAgIH0sXG5cbiAgICBnZXRHcm91cDogZnVuY3Rpb24gKGdyb3VwTmFtZTogc3RyaW5nKTogU3ByaXRlSXRlbUdyb3VwIHtcbiAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbmQoKGdyb3VwOiBTcHJpdGVJdGVtR3JvdXApID0+IGdyb3VwLm5hbWUgPT09IGdyb3VwTmFtZSk7IFxuICAgIH0sXG5cbiAgICByZW1vdmVJdGVtOiBmdW5jdGlvbiAoZ3JvdXBOYW1lOiBzdHJpbmcsIGl0ZW1OYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgIHRoaXMuaXRlbXMuZmluZCgoZ3JvdXA6IFNwcml0ZUl0ZW1Hcm91cCkgPT4gKFxuICAgICAgICBncm91cC5uYW1lID09PSBncm91cE5hbWVcbiAgICAgICkpLml0ZW1zLmZpbmQoKGl0ZW06IFNwcml0ZUl0ZW0sIGluZGV4OiBudW1iZXIsIGl0ZW1zOiBTcHJpdGVJdGVtW10pID0+IHtcbiAgICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gaXRlbU5hbWUpIHtcbiAgICAgICAgICBpdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgZHJhdzogZnVuY3Rpb24gKHR5cGU6IENhbnZhc1R5cGUsIGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGdyb3VwOiBTcHJpdGVJdGVtR3JvdXApID0+IHtcbiAgICAgICAgZ3JvdXAuaXRlbXMuZm9yRWFjaCgoaXRlbTogU3ByaXRlSXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uc3ByaXRlLmRyYXcodHlwZSwgY2FudmFzKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgZW1wdHk6IGZ1bmN0aW9uICgpOiB2b2lkIHtcbiAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICB9XG4gIH07XG59O1xuIiwiZXhwb3J0IGludGVyZmFjZSBSZWN0YW5nbGUge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIGNlbnRlclg6IChyZWN0YW5nbGU6IFJlY3RhbmdsZSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlY3RhbmdsZSAocGFyYW1zOiBQYXJ0aWFsPFJlY3RhbmdsZT4gPSB7fSk6IFJlY3RhbmdsZSB7XG4gIHJldHVybiB7XG4gICAgeDogMCxcbiAgICB5OiAwLFxuICAgIHdpZHRoOiAwLFxuICAgIGhlaWdodDogMCxcbiAgICBjZW50ZXJYOiBmdW5jdGlvbiAoYmFzZTogUmVjdGFuZ2xlKTogdm9pZCB7XG4gICAgICBjb25zdCByZWxhdGl2ZUNlbnRlciA9IGJhc2UueCArIGJhc2Uud2lkdGggLyAyO1xuICAgICAgdGhpcy54ID0gcmVsYXRpdmVDZW50ZXIgLSB0aGlzLndpZHRoIC8gMjtcbiAgICB9LFxuICAgIC4uLnBhcmFtc1xuICB9O1xufVxuIiwiaW1wb3J0IHsgYXNzZXRMb2FkZXIgfSBmcm9tIFwiLi9hc3NldExvYWRlclwiO1xuaW1wb3J0IHsgQ2FudmFzIH0gZnJvbSBcIi4vY2FudmFzXCI7XG5pbXBvcnQgeyBDb25maWcsIGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgY29udHJvbHMsIENvbnRyb2xzIH0gZnJvbSBcIi4vY29udHJvbHNcIjtcbmltcG9ydCB7IG1lZGlhUGxheWVyLCBNZWRpYVBsYXllciB9IGZyb20gXCIuL21lZGlhUGxheWVyXCI7XG5pbXBvcnQgeyBNZXRhVGlsZSB9IGZyb20gXCIuL21ldGFUaWxlXCI7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCIuL3BhbGV0dGVcIjtcbmltcG9ydCB7IGNyZWF0ZVBvb2wsIFBvb2wgfSBmcm9tIFwiLi9wb29sXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2NlbmUge1xuICBiZ0NvbG9yPzogQ29sb3I7XG4gIGNhbnZhcz86IENhbnZhcztcbiAgY29uZmlnPzogQ29uZmlnO1xuICBjb250cm9scz86IENvbnRyb2xzO1xuICBkeW5hbWljUG9vbD86IFBvb2w7XG4gIG1ldGFUaWxlcz86IHsgW2tleTogc3RyaW5nXTogTWV0YVRpbGUgfTtcbiAgbWVkaWFQbGF5ZXI/OiBNZWRpYVBsYXllcjtcbiAgcHJlbG9hZD86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG4gIHN0YXRpY1Bvb2w/OiBQb29sO1xuXG4gIG5hbWU6IHN0cmluZztcblxuICBpbml0OiAoLi4uYXJnczogYW55KSA9PiB2b2lkO1xuICBjaGFuZ2VTY2VuZT86IChuYW1lOiBzdHJpbmcsIC4uLmFyZ3M6IGFueSkgPT4gdm9pZDtcbiAgZGVzdHJveT86ICgpID0+IHZvaWQ7XG4gIG9uUmVzaXplPzogKCkgPT4gdm9pZDtcbiAgdXBkYXRlPzogKGNhbnZhczogQ2FudmFzKSA9PiB2b2lkO1xufVxuXG5sZXQgY3VycmVudFNjZW5lOiBTY2VuZTtcbmxldCBzY2VuZXM6IHsgW25hbWU6IHN0cmluZ106IFNjZW5lIH0gPSB7fTtcbmxldCBpc0xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuZnVuY3Rpb24gZHJhd1N0YXRpY0l0ZW1zIChzY2VuZTogU2NlbmUpOiB2b2lkIHtcbiAgc2NlbmUuY2FudmFzLmNsZWFyKCdzdGF0aWMnLCBzY2VuZS5iZ0NvbG9yKTtcbiAgc2NlbmUuc3RhdGljUG9vbC5kcmF3KCdzdGF0aWMnLCBzY2VuZS5jYW52YXMpO1xufVxuXG5mdW5jdGlvbiBkcmF3RHluYW1pY0l0ZW1zIChzY2VuZTogU2NlbmUpOiB2b2lkIHtcbiAgc2NlbmUuY2FudmFzLmNsZWFyKCdkeW5hbWljJyk7XG4gIHNjZW5lLmR5bmFtaWNQb29sLmRyYXcoJ2R5bmFtaWMnLCBzY2VuZS5jYW52YXMpO1xufVxuXG5mdW5jdGlvbiBzY2VuZVJlYWR5IChtZXRhVGlsZXM/OiB7IFtrZXk6IHN0cmluZ106IE1ldGFUaWxlIH0sIC4uLmFyZ3M6IGFueSk6IHZvaWQge1xuICBjdXJyZW50U2NlbmUubWV0YVRpbGVzID0gbWV0YVRpbGVzO1xuXG4gIGN1cnJlbnRTY2VuZS5pbml0KC4uLmFyZ3MpO1xuICBkcmF3U3RhdGljSXRlbXMoY3VycmVudFNjZW5lKTtcbiAgY3VycmVudFNjZW5lLmNhbnZhcy5vblJlc2l6ZSA9ICgpID0+IHtcbiAgICBjdXJyZW50U2NlbmUub25SZXNpemUoKTtcbiAgICBkcmF3U3RhdGljSXRlbXMoY3VycmVudFNjZW5lKTtcbiAgfVxuXG4gIGlzTG9hZGluZyA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBsb2FkU2NlbmUobmFtZTogc3RyaW5nLCAuLi5hcmdzOiBhbnkpOiB2b2lkIHtcbiAgaWYgKCFzY2VuZXNbbmFtZV0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYHNjZW5lIFwiJHtuYW1lfVwiIGRvZXMgbm90IGV4aXN0YCk7XG4gIH1cblxuICBpc0xvYWRpbmcgPSB0cnVlO1xuXG4gIGlmIChjdXJyZW50U2NlbmUpIHtcbiAgICBjdXJyZW50U2NlbmUubWV0YVRpbGVzID0ge307XG4gICAgY3VycmVudFNjZW5lLnN0YXRpY1Bvb2wuZW1wdHkoKTtcbiAgICBjdXJyZW50U2NlbmUuZHluYW1pY1Bvb2wuZW1wdHkoKTtcblxuICAgIGN1cnJlbnRTY2VuZS5jb250cm9scy5yZXNldCgpO1xuXG4gICAgaWYgKHR5cGVvZiBjdXJyZW50U2NlbmUuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY3VycmVudFNjZW5lLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBjdXJyZW50U2NlbmUgPSBzY2VuZXNbbmFtZV07XG4gIGN1cnJlbnRTY2VuZS5jaGFuZ2VTY2VuZSA9IGxvYWRTY2VuZTtcblxuICBpZiAoY3VycmVudFNjZW5lLnByZWxvYWQgJiYgT2JqZWN0LmtleXMoY3VycmVudFNjZW5lLnByZWxvYWQpLmxlbmd0aCkge1xuICAgIGlmIChjb25maWcuZGVidWcpIHtcbiAgICAgIGNvbnNvbGUubG9nKGB3YWl0aW5nIGZvciAke25hbWV9IHByZWxvYWQuLi5gKTtcbiAgICB9XG5cbiAgICBhc3NldExvYWRlcihjdXJyZW50U2NlbmUubWVkaWFQbGF5ZXIsIGN1cnJlbnRTY2VuZS5wcmVsb2FkLCAobWV0YVRpbGVzPzogeyBba2V5OiBzdHJpbmddOiBNZXRhVGlsZSB9KSA9PiB7XG4gICAgICBzY2VuZVJlYWR5KG1ldGFUaWxlcywgLi4uYXJncyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgc2NlbmVSZWFkeSh7fSwgLi4uYXJncyk7XG5cbiAgICBpZiAoY29uZmlnLmRlYnVnKSB7XG4gICAgICBjb25zb2xlLmxvZyhgbG9hZGVkIHNjZW5lOiAke25hbWV9YCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogXG4gKiBAcGFyYW0gc2NlbmVPYmogXG4gKiBAcGFyYW0gaW5pdGlhbFNjZW5lTmFtZSBcbiAqIEBwYXJhbSBjYW52YXMgXG4gKiBAcGFyYW0gaW5pdGlhbEFyZ3MgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0IChcbiAgc2NlbmVPYmo6IHsgW25hbWU6IHN0cmluZ106IFNjZW5lIH0sXG4gIGluaXRpYWxTY2VuZU5hbWU6IHN0cmluZyxcbiAgY2FudmFzOiBDYW52YXMsXG4gIC4uLmluaXRpYWxBcmdzOiBhbnkpOiB2b2lkIHtcbiAgZm9yIChjb25zdCBuYW1lIGluIHNjZW5lT2JqKSB7XG4gICAgbGV0IHNjZW5lOiBTY2VuZSA9IHNjZW5lT2JqW25hbWVdO1xuXG4gICAgc2NlbmUgPSB7XG4gICAgICAuLi5zY2VuZSxcbiAgICAgIGNhbnZhczogY2FudmFzLFxuICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICBjb250cm9sczogY29udHJvbHMsXG4gICAgICBkeW5hbWljUG9vbDogY3JlYXRlUG9vbCgpLFxuICAgICAgbWV0YVRpbGVzOiB7fSxcbiAgICAgIG1lZGlhUGxheWVyOiBtZWRpYVBsYXllcixcbiAgICAgIHN0YXRpY1Bvb2w6IGNyZWF0ZVBvb2woKVxuICAgIH07XG5cbiAgICBzY2VuZXNbbmFtZV0gPSBzY2VuZTtcbiAgfVxuXG4gIGlmIChzY2VuZXMubG9hZGluZykge1xuICAgIHNjZW5lcy5sb2FkaW5nLmluaXQoLi4uaW5pdGlhbEFyZ3MpO1xuICB9XG5cbiAgbG9hZFNjZW5lKGluaXRpYWxTY2VuZU5hbWUsIC4uLmluaXRpYWxBcmdzKTtcbn1cblxuLyoqXG4gKiBcbiAqIEBwYXJhbSBjYW52YXMgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUgKGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gIGlmIChpc0xvYWRpbmcpIHtcbiAgICBkcmF3U3RhdGljSXRlbXMoc2NlbmVzLmxvYWRpbmcpO1xuICAgIGRyYXdEeW5hbWljSXRlbXMoc2NlbmVzLmxvYWRpbmcpO1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgY3VycmVudFNjZW5lLnVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY3VycmVudFNjZW5lLnVwZGF0ZShjYW52YXMpO1xuICAgIH1cblxuICAgIGN1cnJlbnRTY2VuZS5jb250cm9scy51cGRhdGUoKTtcbiAgICBkcmF3RHluYW1pY0l0ZW1zKGN1cnJlbnRTY2VuZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENhbnZhcywgQ2FudmFzVHlwZSB9IGZyb20gXCIuL2NhbnZhc1wiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiLi9wYWxldHRlXCI7XG5pbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tIFwiLi9yZWN0YW5nbGVcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdSZWN0YW5nbGUgKFxuICB0eXBlOiBDYW52YXNUeXBlLFxuICBjYW52YXM6IENhbnZhcyxcbiAgZmlsbDogQ29sb3IsXG4gIHN0cm9rZUNvbG9yOiBDb2xvcixcbiAgc3Ryb2tlV2lkdGg6IG51bWJlcixcbiAgcmVjdGFuZ2xlOiBSZWN0YW5nbGVcbik6IHZvaWQge1xuICBjb25zdCBwcHAgPSBjYW52YXMuY29uZmlnLnBwcDtcblxuICBpZiAoZmlsbCkge1xuICAgIGNhbnZhcy5jb250ZXh0W3R5cGVdLmZpbGxTdHlsZSA9IGZpbGw7XG4gICAgY2FudmFzLmNvbnRleHRbdHlwZV0uZmlsbFJlY3QoXG4gICAgICByZWN0YW5nbGUueCAqIHBwcCxcbiAgICAgIHJlY3RhbmdsZS55ICogcHBwLFxuICAgICAgcmVjdGFuZ2xlLndpZHRoICogcHBwLFxuICAgICAgcmVjdGFuZ2xlLmhlaWdodCAqIHBwcFxuICAgICk7XG4gIH1cblxuICBpZiAoc3Ryb2tlQ29sb3IpIHtcbiAgICBjYW52YXMuY29udGV4dFt0eXBlXS5zdHJva2VTdHlsZSA9IHN0cm9rZUNvbG9yO1xuICAgIGNhbnZhcy5jb250ZXh0W3R5cGVdLmxpbmVXaWR0aCA9IHN0cm9rZVdpZHRoO1xuICAgIGNhbnZhcy5jb250ZXh0W3R5cGVdLnN0cm9rZVJlY3QoXG4gICAgICByZWN0YW5nbGUueCAqIHBwcCxcbiAgICAgIHJlY3RhbmdsZS55ICogcHBwLFxuICAgICAgcmVjdGFuZ2xlLndpZHRoICogcHBwLFxuICAgICAgcmVjdGFuZ2xlLmhlaWdodCAqIHBwcFxuICAgICk7XG4gIH1cbn0iLCJpbXBvcnQgeyBBbmltYXRpb24sIE9uQ29tcGxldGUgfSBmcm9tIFwiLi9hbmltYXRpb25cIjtcbmltcG9ydCB7IENhbnZhcywgQ2FudmFzVHlwZSB9IGZyb20gXCIuL2NhbnZhc1wiO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyBjcmVhdGVIaXRCb3gsIEhpdEJveCB9IGZyb20gXCIuL2hpdEJveFwiO1xuaW1wb3J0IHsgZHJhd1RpbGUsIE1ldGFUaWxlIH0gZnJvbSBcIi4vbWV0YVRpbGVcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4vcGFsZXR0ZVwiO1xuaW1wb3J0IHsgY3JlYXRlUmVjdGFuZ2xlLCBSZWN0YW5nbGUgfSBmcm9tIFwiLi9yZWN0YW5nbGVcIjtcbmltcG9ydCB7IGRyYXdSZWN0YW5nbGUgfSBmcm9tIFwiLi9zaGFwZXNcIjtcbmltcG9ydCB7IGNyZWF0ZVRleHRPcHRpb25zLCBkcmF3VGV4dExpbmUsIGdldExpbmVMZW5ndGgsIGdldExpbmVzLCBUZXh0T3B0aW9ucyB9IGZyb20gXCIuL3RleHRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTcHJpdGUge1xuICByZWN0YW5nbGU6IFJlY3RhbmdsZTtcbiAgdmlzaWJsZTogYm9vbGVhbjtcblxuICBkcmF3OiAodHlwZTogQ2FudmFzVHlwZSwgY2FudmFzOiBDYW52YXMpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGV4dFNwcml0ZSBleHRlbmRzIFNwcml0ZSB7XG4gIGFuaW1hdGlvbnM6IHsgW2tleTogc3RyaW5nXTogQW5pbWF0aW9uIH07XG4gIGNvbG9yOiBDb2xvcjtcbiAgbWF4V2lkdGg6IG51bWJlcjtcbiAgb3B0aW9uczogVGV4dE9wdGlvbnM7XG4gIHBsYXlpbmdBbmltYXRpb246IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgYWRkQW5pbWF0aW9uOiAobmFtZTogc3RyaW5nLCBzdGFydENoYXI6IG51bWJlciwgZW5kQ2hhcjogbnVtYmVyLCBpbnRlcnZhbDogbnVtYmVyLCBvbkNvbXBsZXRlPzogT25Db21wbGV0ZSkgPT4gdm9pZDtcbiAgc3RhcnRBbmltYXRpb246IChuYW1lOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHN0b3BBbmltYXRpb246ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWV0YVRpbGVTcHJpdGUgZXh0ZW5kcyBTcHJpdGUge1xuICBhbmltYXRpb25zOiB7IFtrZXk6IHN0cmluZ106IEFuaW1hdGlvbiB9O1xuICBoaXRCb3g6IEhpdEJveDtcbiAgbWV0YVRpbGU6IE1ldGFUaWxlO1xuICBwbGF5aW5nQW5pbWF0aW9uOiBzdHJpbmc7XG4gIGFkZEFuaW1hdGlvbjogKG5hbWU6IHN0cmluZywgc3RhcnRDaGFyOiBudW1iZXIsIGVuZENoYXI6IG51bWJlciwgaW50ZXJ2YWw6IG51bWJlciwgb25Db21wbGV0ZT86IE9uQ29tcGxldGUpID0+IHZvaWQ7XG4gIHN0YXJ0QW5pbWF0aW9uOiAobmFtZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzdG9wQW5pbWF0aW9uOiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlY3RhbmdsZVNwcml0ZSBleHRlbmRzIFNwcml0ZSB7XG4gIGZpbGw6IENvbG9yO1xuICBzdHJva2VDb2xvcjogQ29sb3I7XG4gIHN0cm9rZVdpZHRoOiBudW1iZXI7XG4gIHJlY3RhbmdsZTogUmVjdGFuZ2xlLFxufVxuXG4vKipcbiAqIFxuICogQHBhcmFtIHBhcmFtcyBcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWV0YVRpbGVTcHJpdGUgKFxuICBwYXJhbXM6IFBhcnRpYWw8UGljazxNZXRhVGlsZVNwcml0ZSwgJ21ldGFUaWxlJyB8ICd2aXNpYmxlJz4+ID0ge31cbik6IE1ldGFUaWxlU3ByaXRlIHtcbiAgY29uc3QgcmVjdGFuZ2xlID0gY3JlYXRlUmVjdGFuZ2xlKHtcbiAgICB3aWR0aDogcGFyYW1zLm1ldGFUaWxlLndpZHRoLFxuICAgIGhlaWdodDogcGFyYW1zLm1ldGFUaWxlLmhlaWdodFxuICB9KTtcbiAgY29uc3QgaGl0Qm94ID0gY3JlYXRlSGl0Qm94KHtcbiAgICByZWN0YW5nbGVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gdXBkYXRlSGl0Qm94ICh0eXBlOiBDYW52YXNUeXBlLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgIGhpdEJveC5yZWN0YW5nbGUueCA9IHJlY3RhbmdsZS54O1xuICAgIGhpdEJveC5yZWN0YW5nbGUueCA9IHJlY3RhbmdsZS54O1xuXG4gICAgaGl0Qm94LmRyYXcodHlwZSwgY2FudmFzKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYW5pbWF0aW9uczoge30sXG4gICAgaGl0Qm94LFxuICAgIG1ldGFUaWxlOiBudWxsLFxuICAgIHBsYXlpbmdBbmltYXRpb246IG51bGwsXG4gICAgcmVjdGFuZ2xlLFxuICAgIHZpc2libGU6IHRydWUsXG5cbiAgICBkcmF3OiBmdW5jdGlvbiAodHlwZTogQ2FudmFzVHlwZSwgY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgIGlmICghdGhpcy52aXNpYmxlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbmZpZy5kZWJ1Zykge1xuICAgICAgICBjb25zb2xlLmxvZyhgbWV0YVRpbGVTcHJpdGUuZHJhdygpYCk7XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZUhpdEJveCh0eXBlLCBjYW52YXMpO1xuXG4gICAgICBpZiAodGhpcy5wbGF5aW5nQW5pbWF0aW9uKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uc1t0aGlzLnBsYXlpbmdBbmltYXRpb25dLmRyYXcodHlwZSwgY2FudmFzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRyYXdUaWxlKHR5cGUsIGNhbnZhcywgdGhpcy5yZWN0YW5nbGUueCwgdGhpcy5yZWN0YW5nbGUueSwgdGhpcy5tZXRhVGlsZSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFkZEFuaW1hdGlvbjogZnVuY3Rpb24gKG5hbWU6IHN0cmluZywgc3RhcnRGcmFtZTogbnVtYmVyLCBlbmRGcmFtZTogbnVtYmVyLCB0aWNrSW50ZXJ2YWw6IG51bWJlciwgb25Db21wbGV0ZT86IE9uQ29tcGxldGUpOiB2b2lkIHtcbiAgICAgIGNvbnN0IHNwcml0ZSA9IHRoaXM7XG5cbiAgICAgIGxldCBjYW5BZHZhbmNlID0gdHJ1ZTtcbiAgICAgIGxldCB3aWxsSGFuZGxlQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgIGxldCBjdXJyZW50RnJhbWUgPSBzdGFydEZyYW1lO1xuICAgICAgbGV0IHRpY2tDb3VudCA9IDA7XG5cbiAgICAgIHNwcml0ZS5hbmltYXRpb25zW25hbWVdID0ge1xuICAgICAgICBzdGFydDogZnVuY3Rpb24gKCk6IHZvaWQge1xuICAgICAgICAgIGNhbkFkdmFuY2UgPSB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHN0b3A6IGZ1bmN0aW9uIChnb3RvRnJhbWU/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICBpZiAoZ290b0ZyYW1lKSB7XG4gICAgICAgICAgICBpZiAoZ290b0ZyYW1lID4gMCkge1xuICAgICAgICAgICAgICBjdXJyZW50RnJhbWUgPSBnb3RvRnJhbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjdXJyZW50RnJhbWUgPSBlbmRGcmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYW5BZHZhbmNlID0gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZHJhdzogZnVuY3Rpb24gKHR5cGU6IENhbnZhc1R5cGUsIGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgaWYgKHRpY2tDb3VudCA8IHRpY2tJbnRlcnZhbCkge1xuICAgICAgICAgICAgdGlja0NvdW50Kys7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjYW5BZHZhbmNlKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRGcmFtZSA9IE1hdGgubWluKGVuZEZyYW1lLCArK2N1cnJlbnRGcmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh3aWxsSGFuZGxlQ29tcGxldGUpIHtcbiAgICAgICAgICAgICAgaWYgKG9uQ29tcGxldGUgPT09ICdsb29wJykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRGcmFtZSA9IHN0YXJ0RnJhbWU7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9uQ29tcGxldGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgd2lsbEhhbmRsZUNvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRpY2tDb3VudCA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNhbkFkdmFuY2UgJiYgY3VycmVudEZyYW1lID09PSBlbmRGcmFtZSkge1xuICAgICAgICAgICAgLy8gYWxsb3cgdGhlIGZpbmFsIGludGVydmFsIHRvIHJ1biBiZWZvcmUgaGFuZGxpbmcgY29tcGxldGVcbiAgICAgICAgICAgIHdpbGxIYW5kbGVDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNvbmZpZy5kZWJ1Zykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYG1ldGFUaWxlU3ByaXRlLmRyYXcoKWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNwcml0ZS5tZXRhVGlsZS5mcmFtZSA9IGN1cnJlbnRGcmFtZTtcbiAgICAgICAgICBkcmF3VGlsZSh0eXBlLCBjYW52YXMsIHNwcml0ZS5yZWN0YW5nbGUueCwgc3ByaXRlLnJlY3RhbmdsZS55LCBzcHJpdGUubWV0YVRpbGUpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICBzdGFydEFuaW1hdGlvbjogZnVuY3Rpb24gKG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgdGhpcy5hbmltYXRpb25zW25hbWVdLnN0YXJ0KCk7XG4gICAgICB0aGlzLnBsYXlpbmdBbmltYXRpb24gPSBuYW1lO1xuICAgIH0sXG5cbiAgICBzdG9wQW5pbWF0aW9uOiBmdW5jdGlvbiAoKTogdm9pZCB7XG4gICAgICB0aGlzLmFuaW1hdGlvbnNbdGhpcy5wbGF5aW5nQW5pbWF0aW9uXS5zdG9wKCk7XG4gICAgICB0aGlzLnBsYXlpbmdBbmltYXRpb24gPSBudWxsO1xuICAgIH0sXG5cbiAgICAuLi5wYXJhbXNcbiAgfTtcbn1cblxuLyoqXG4gKiBcbiAqIEBwYXJhbSBwYXJhbXMgXG4gKiBAcmV0dXJucyBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRleHRTcHJpdGUgKFxuICAvLyB2YWx1ZSBtdXN0IGJlIHBhc3NlZCBpbiBmb3IgaW5pdGlhbCwgYXV0b21hdGljIHJlY3RhbmdsZSBjYWxjdWxhdGlvblxuICBwYXJhbXM6IFBhcnRpYWw8UGljazxUZXh0U3ByaXRlLCAnY29sb3InIHwgJ3ZhbHVlJyB8ICdtYXhXaWR0aCcgfCAnb3B0aW9ucycgfCAndmlzaWJsZSc+PiA9IHt9XG4pOiBUZXh0U3ByaXRlIHtcbiAgY29uc3Qgd2lkdGggPSBwYXJhbXMubWF4V2lkdGggfHwgZ2V0TGluZUxlbmd0aChwYXJhbXMudmFsdWUsIHBhcmFtcy5vcHRpb25zKTtcbiAgY29uc3QgcmVjdGFuZ2xlID0gY3JlYXRlUmVjdGFuZ2xlKHsgd2lkdGggfSlcblxuICByZXR1cm4ge1xuICAgIGFuaW1hdGlvbnM6IHt9LFxuICAgIGNvbG9yOiAnI2M1OScsXG4gICAgbWF4V2lkdGg6IG51bGwsXG4gICAgb3B0aW9uczogY3JlYXRlVGV4dE9wdGlvbnMoKSxcbiAgICBwbGF5aW5nQW5pbWF0aW9uOiBudWxsLFxuICAgIHJlY3RhbmdsZSxcbiAgICB2YWx1ZTogJycsXG4gICAgdmlzaWJsZTogdHJ1ZSxcblxuICAgIGRyYXc6IGZ1bmN0aW9uICh0eXBlOiBDYW52YXNUeXBlLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgaWYgKCF0aGlzLnZpc2libGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29uZmlnLmRlYnVnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGB0ZXh0U3ByaXRlLmRyYXcoKWApO1xuICAgICAgfVxuXG4gICAgICBjYW52YXMuY29udGV4dFt0eXBlXS5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuXG4gICAgICBpZiAodGhpcy5wbGF5aW5nQW5pbWF0aW9uKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uc1t0aGlzLnBsYXlpbmdBbmltYXRpb25dLmRyYXcodHlwZSwgY2FudmFzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLm1heFdpZHRoKSB7XG4gICAgICAgICAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gZ2V0TGluZXModGhpcy52YWx1ZSwgdGhpcy5vcHRpb25zLCB0aGlzLm1heFdpZHRoKTtcbiAgICAgICAgICBsZXQgeSA9IHRoaXMucmVjdGFuZ2xlLnk7XG4gIFxuICAgICAgICAgIGZvciAoY29uc3QgbGluZSBvZiBsaW5lcykge1xuICAgICAgICAgICAgZHJhd1RleHRMaW5lKHR5cGUsIGNhbnZhcywgdGhpcy5yZWN0YW5nbGUueCwgeSwgbGluZSwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgICAgIHkgKz0gdGhpcy5vcHRpb25zLmxpbmVIZWlnaHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRyYXdUZXh0TGluZSh0eXBlLCBjYW52YXMsIHRoaXMucmVjdGFuZ2xlLngsIHRoaXMucmVjdGFuZ2xlLnksIHRoaXMudmFsdWUsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0Q2hhciBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZW5kQ2hhciB1c2UgMS1uIGZvciBhIHNwZWNpZmljIGVuZCBjaGFyYWN0ZXI7IG9yIC0xIGZvciB0aGUgY2hhcmFjdGVyIGxlbmd0aFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbnRlcnZhbCBob3cgbWFueSB0aWNrcyBwZXIgZnJhbWVcbiAgICAgKiBAcGFyYW0ge09uQ29tcGxldGV9IG9uQ29tcGxldGUgXG4gICAgICogQHJldHVybnMge0FuaW1hdGlvbn1cbiAgICAgKi9cbiAgICBhZGRBbmltYXRpb246IGZ1bmN0aW9uIChuYW1lOiBzdHJpbmcsIHN0YXJ0Q2hhcjogbnVtYmVyLCBlbmRDaGFyOiBudW1iZXIsIHRpY2tJbnRlcnZhbDogbnVtYmVyLCBvbkNvbXBsZXRlPzogT25Db21wbGV0ZSk6IHZvaWQge1xuICAgICAgY29uc3Qgc3ByaXRlID0gdGhpcztcbiAgICAgIGNvbnN0IGNoYXJMZW4gPSBzcHJpdGUudmFsdWUuc3BsaXQoJycpLmxlbmd0aDtcblxuICAgICAgbGV0IHRpY2tDb3VudCA9IDA7XG4gICAgICBsZXQgZHJhd2FibGVDaGFyTGVuID0gc3RhcnRDaGFyO1xuICAgICAgbGV0IHdpbGxIYW5kbGVDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgbGV0IGNhbkFkdmFuY2UgPSB0cnVlO1xuXG4gICAgICBlbmRDaGFyID0gZW5kQ2hhciA+IDAgPyBlbmRDaGFyIDogY2hhckxlbjtcblxuICAgICAgc3ByaXRlLmFuaW1hdGlvbnNbbmFtZV0gPSB7XG4gICAgICAgIHN0YXJ0OiBmdW5jdGlvbiAoKTogdm9pZCB7XG4gICAgICAgICAgY2FuQWR2YW5jZSA9IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RvcDogZnVuY3Rpb24gKGdvdG9DaGFyPzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgICAgaWYgKGdvdG9DaGFyKSB7XG4gICAgICAgICAgICBpZiAoZ290b0NoYXIgPiAwKSB7XG4gICAgICAgICAgICAgIGRyYXdhYmxlQ2hhckxlbiA9IGdvdG9DaGFyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZHJhd2FibGVDaGFyTGVuID0gY2hhckxlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYW5BZHZhbmNlID0gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZHJhdzogZnVuY3Rpb24gKHR5cGU6IENhbnZhc1R5cGUsIGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgaWYgKCFzcHJpdGUudmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aWNrQ291bnQgPCB0aWNrSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRpY2tDb3VudCsrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY2FuQWR2YW5jZSkge1xuICAgICAgICAgICAgICBkcmF3YWJsZUNoYXJMZW4gPSBNYXRoLm1pbihlbmRDaGFyLCArK2RyYXdhYmxlQ2hhckxlbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh3aWxsSGFuZGxlQ29tcGxldGUpIHtcbiAgICAgICAgICAgICAgaWYgKG9uQ29tcGxldGUgPT09ICdsb29wJykge1xuICAgICAgICAgICAgICAgIGRyYXdhYmxlQ2hhckxlbiA9IHN0YXJ0Q2hhcjtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb25Db21wbGV0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB3aWxsSGFuZGxlQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGlja0NvdW50ID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY2FuQWR2YW5jZSAmJiBkcmF3YWJsZUNoYXJMZW4gPT09IGVuZENoYXIpIHtcbiAgICAgICAgICAgIC8vIGFsbG93IHRoZSBmaW5hbCBpbnRlcnZhbCB0byBydW4gYmVmb3JlIGhhbmRsaW5nIGNvbXBsZXRlXG4gICAgICAgICAgICB3aWxsSGFuZGxlQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb25maWcuZGVidWcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGB0ZXh0U3ByaXRlLmRyYXcoKWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzcHJpdGUubWF4V2lkdGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVzOiBzdHJpbmdbXSA9IGdldExpbmVzKHNwcml0ZS52YWx1ZSwgc3ByaXRlLm9wdGlvbnMsIHNwcml0ZS5tYXhXaWR0aCk7XG4gICAgICAgICAgICBsZXQgeSA9IHNwcml0ZS5yZWN0YW5nbGUueTtcbiAgICAgICAgICAgIGxldCBkcmF3bkNoYXJMZW4gPSAwO1xuICAgICAgXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxpbmUgb2YgbGluZXMpIHtcbiAgICAgICAgICAgICAgaWYgKGRyYXduQ2hhckxlbiArIGxpbmUubGVuZ3RoIDwgZHJhd2FibGVDaGFyTGVuKSB7XG4gICAgICAgICAgICAgICAgZHJhd1RleHRMaW5lKHR5cGUsIGNhbnZhcywgc3ByaXRlLnJlY3RhbmdsZS54LCB5LCBsaW5lLCBzcHJpdGUub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgZHJhd25DaGFyTGVuICs9IGxpbmUubGVuZ3RoO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRyYXdUZXh0TGluZSh0eXBlLCBjYW52YXMsIHNwcml0ZS5yZWN0YW5nbGUueCwgeSwgbGluZS5zbGljZSgwLCBkcmF3YWJsZUNoYXJMZW4gLSBkcmF3bkNoYXJMZW4pLCBzcHJpdGUub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgZHJhd25DaGFyTGVuICs9IGRyYXdhYmxlQ2hhckxlbiAtIGRyYXduQ2hhckxlbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHkgKz0gc3ByaXRlLm9wdGlvbnMubGluZUhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZHJhd1RleHRMaW5lKHR5cGUsIGNhbnZhcywgc3ByaXRlLnJlY3RhbmdsZS54LCBzcHJpdGUucmVjdGFuZ2xlLnksIHNwcml0ZS52YWx1ZS5zbGljZSgwLCBkcmF3YWJsZUNoYXJMZW4pLCBzcHJpdGUub3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0YXJ0QW5pbWF0aW9uOiBmdW5jdGlvbiAobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICB0aGlzLmFuaW1hdGlvbnNbbmFtZV0uc3RhcnQoKTtcbiAgICAgIHRoaXMucGxheWluZ0FuaW1hdGlvbiA9IG5hbWU7XG4gICAgfSxcblxuICAgIHN0b3BBbmltYXRpb246IGZ1bmN0aW9uICgpOiB2b2lkIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uc1t0aGlzLnBsYXlpbmdBbmltYXRpb25dLnN0b3AoKTtcbiAgICAgIHRoaXMucGxheWluZ0FuaW1hdGlvbiA9IG51bGw7XG4gICAgfSxcblxuICAgIC4uLnBhcmFtc1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVjdGFuZ2xlU3ByaXRlIChcbiAgcGFyYW1zOiBQYXJ0aWFsPFBpY2s8UmVjdGFuZ2xlU3ByaXRlLCAnZmlsbCcgfCAnc3Ryb2tlQ29sb3InIHwgJ3N0cm9rZVdpZHRoJyB8ICdyZWN0YW5nbGUnIHwgJ3Zpc2libGUnPj4gPSB7fVxuKTogUmVjdGFuZ2xlU3ByaXRlIHtcbiAgcmV0dXJuIHtcbiAgICBmaWxsOiBudWxsLFxuICAgIHN0cm9rZUNvbG9yOiBudWxsLFxuICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgcmVjdGFuZ2xlOiBjcmVhdGVSZWN0YW5nbGUoKSxcblxuICAgIGRyYXc6IGZ1bmN0aW9uICh0eXBlOiBDYW52YXNUeXBlLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgaWYgKCF0aGlzLnZpc2libGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29uZmlnLmRlYnVnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGByZWN0YW5nbGVTcHJpdGUuZHJhdygpYCk7XG4gICAgICB9XG5cbiAgICAgIGRyYXdSZWN0YW5nbGUodHlwZSwgY2FudmFzLCB0aGlzLmZpbGwsIHRoaXMuc3Ryb2tlQ29sb3IsIHRoaXMuc3Ryb2tlV2lkdGgsIHRoaXMucmVjdGFuZ2xlKTtcbiAgICB9LFxuXG4gICAgLi4ucGFyYW1zXG4gIH07XG59XG4iLCJpbXBvcnQgeyB0ZXh0T3B0aW9ucyB9IGZyb20gJy4uL3NjZW5lcy9jb21tb24vdGV4dE9wdGlvbnMnO1xuaW1wb3J0IHsgQ2FudmFzLCBDYW52YXNUeXBlIH0gZnJvbSAnLi9jYW52YXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENoYXJhY3RlciB7XG4gIG9mZnNldFg6IG51bWJlcjtcbiAgb2Zmc2V0WTogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgdGlsZTogbnVtYmVyW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9udCB7XG4gIFsga2V5OnN0cmluZyBdOiBDaGFyYWN0ZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUZXh0T3B0aW9ucyB7XG4gIGZvbnQ6IEZvbnQ7XG4gIHRyYWNraW5nOiBudW1iZXI7XG4gIGxpbmVIZWlnaHQ6IG51bWJlclxufTtcblxuLyoqXG4gKiBcbiAqIEByZXR1cm5zIHtUZXh0T3B0aW9uc31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRleHRPcHRpb25zICgpOiBUZXh0T3B0aW9ucyB7XG4gIHJldHVybiB7XG4gICAgZm9udDogbnVsbCxcbiAgICB0cmFja2luZzogMCxcbiAgICBsaW5lSGVpZ2h0OiAwXG4gIH07XG59XG5cbi8qKlxuICogXG4gKiBAcGFyYW0gZm9udCBcbiAqIEBwYXJhbSBjaGFyIFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaGFyYWN0ZXJEb2VzRXhpc3QgKGZvbnQ6IEZvbnQsIGNoYXI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBpZiAoZm9udFtjaGFyXSkge1xuICAgIHJldHVybiB0cnVlXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBGb250IGRvZXMgbm90IGNvbnRhaW4gdGhlIGNoYXJhY3RlciBcIiR7Y2hhcn1cImApO1xuICB9XG59XG5cbi8qKlxuICogXG4gKiBAcGFyYW0gY2FudmFzIFxuICogQHBhcmFtIGNoYXJYIFxuICogQHBhcmFtIGNoYXJZIFxuICogQHBhcmFtIGNoYXIgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkcmF3Q2hhcmFjdGVyICh0eXBlOiBDYW52YXNUeXBlLCBjYW52YXM6IENhbnZhcywgY2hhclg6IG51bWJlciwgY2hhclk6IG51bWJlciwgY2hhcjogQ2hhcmFjdGVyKTogdm9pZCB7XG4gIGxldCB4ID0gMDtcbiAgbGV0IHkgPSAwO1xuICBjb25zdCBwcHAgPSBjYW52YXMuY29uZmlnLnBwcDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXIudGlsZS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChjaGFyLnRpbGVbaV0gPT09IDEpIHtcbiAgICAgIGNhbnZhcy5jb250ZXh0W3R5cGVdLmZpbGxSZWN0KFxuICAgICAgICAoY2hhclggKyB4ICsgY2hhci5vZmZzZXRYKSAqIHBwcCxcbiAgICAgICAgKGNoYXJZICsgeSArIGNoYXIub2Zmc2V0WSkgKiBwcHAsXG4gICAgICAgIHBwcCxcbiAgICAgICAgcHBwXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh4ID09PSBjaGFyLndpZHRoIC0gMSkge1xuICAgICAgeCA9IDA7XG4gICAgICB5Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHgrKztcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBcbiAqIEBwYXJhbSBjYW52YXMgXG4gKiBAcGFyYW0gdGV4dCBcbiAqIEBwYXJhbSBvcHRpb25zIFxuICogQHBhcmFtIGNvbG9yIFxuICovXG5leHBvcnQgZnVuY3Rpb24gZHJhd1RleHRMaW5lICh0eXBlOiBDYW52YXNUeXBlLCBjYW52YXM6IENhbnZhcywgbGluZVg6IG51bWJlciwgbGluZVk6IG51bWJlciwgdGV4dDogc3RyaW5nLCBvcHRpb25zOiBUZXh0T3B0aW9ucyk6IHZvaWQge1xuICBjb25zdCBjaGFyYWN0ZXJzOiBzdHJpbmdbXSA9IHRleHQuc3BsaXQoJycpO1xuICBsZXQgeCA9IGxpbmVYO1xuICBsZXQgeSA9IGxpbmVZO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcmFjdGVycy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoYXIgPSBjaGFyYWN0ZXJzW2ldO1xuXG4gICAgaWYgKGNoYXJhY3RlckRvZXNFeGlzdChvcHRpb25zLmZvbnQsIGNoYXIpKSB7XG4gICAgICBkcmF3Q2hhcmFjdGVyKHR5cGUsIGNhbnZhcywgeCwgeSwgb3B0aW9ucy5mb250W2NoYXJdKTtcbiAgICAgIHggKz0gb3B0aW9ucy5mb250W2NoYXJdLndpZHRoO1xuICAgIH1cblxuICAgIHggKz0gb3B0aW9ucy50cmFja2luZztcbiAgfVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBnZXQgYXJyYXkgb2YgbGluZXMgY29uZmluZWQgdG8gYSBtYXggd2lkdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFxuICogQHBhcmFtIHtudW1iZXJ9IG1heFdpZHRoIFxuICogQHJldHVybnMge3N0cmluZ1tdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGluZXMgKHRleHQ6IHN0cmluZywgb3B0aW9uczogVGV4dE9wdGlvbnMsIG1heFdpZHRoOiBudW1iZXIpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGxpbmVzOiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdCB3b3Jkczogc3RyaW5nW10gPSB0ZXh0LnNwbGl0KCcgJyk7XG4gIGNvbnN0IHNwYWNlQ2hhcmFjdGVyID0gdGV4dE9wdGlvbnMuZm9udFsnICddOyBcbiAgY29uc3Qgc3BhY2VXaWR0aCA9IHNwYWNlQ2hhcmFjdGVyLndpZHRoICsgc3BhY2VDaGFyYWN0ZXIub2Zmc2V0WCArIG9wdGlvbnMudHJhY2tpbmc7XG4gIGxldCBsaW5lID0gJyc7XG4gIGxldCBsaW5lV2lkdGggPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB3b3JkID0gd29yZHNbaV07XG4gICAgY29uc3Qgd29yZENoYXJzID0gd29yZC5zcGxpdCgnJyk7XG5cbiAgICBsZXQgd29yZFdpZHRoID0gMDtcblxuICAgIGZvciAoY29uc3Qgd29yZENoYXIgb2Ygd29yZENoYXJzKSB7XG4gICAgICBpZiAoY2hhcmFjdGVyRG9lc0V4aXN0KG9wdGlvbnMuZm9udCwgd29yZENoYXIpKSB7XG4gICAgICAgIGNvbnN0IGNoYXIgPSBvcHRpb25zLmZvbnRbd29yZENoYXJdO1xuICAgICAgICB3b3JkV2lkdGggKz0gKGNoYXIud2lkdGggKyBjaGFyLm9mZnNldFggKyBvcHRpb25zLnRyYWNraW5nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3b3JkV2lkdGggKz0gc3BhY2VXaWR0aDtcbiAgICBsaW5lV2lkdGggKz0gd29yZFdpZHRoO1xuXG4gICAgaWYgKGxpbmVXaWR0aCA8PSBtYXhXaWR0aCkge1xuICAgICAgbGluZSArPSB3b3JkICsgJyAnO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaW5lcy5wdXNoKGxpbmUpO1xuICAgICAgbGluZSA9IHdvcmQgKyAnICc7XG4gICAgICBsaW5lV2lkdGggPSB3b3JkV2lkdGg7XG4gICAgfVxuICB9XG5cbiAgbGluZXMucHVzaChsaW5lLnRyaW1FbmQoKSk7XG5cbiAgcmV0dXJuIGxpbmVzO1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBmb3IgY2FsY3VsYXRpbmcgcGl4ZWwgbGVuZ3RoIG9mIHRleHQgd2l0aCBubyBtYXhXaWR0aFxuICogQHBhcmFtIHtzdHJpbmd9IGxpbmUgXG4gKiBAcGFyYW0ge3RleHRPcHRpb25zfSBvcHRpb25zIFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExpbmVMZW5ndGggKGxpbmU6IHN0cmluZywgb3B0aW9uczogVGV4dE9wdGlvbnMpOiBudW1iZXIge1xuICBjb25zdCB3b3JkQ2hhcnMgPSBsaW5lLnNwbGl0KCcnKTtcbiAgbGV0IHdpZHRoID0gMDtcbiAgXG4gIGZvciAoY29uc3Qgd29yZENoYXIgb2Ygd29yZENoYXJzKSB7XG4gICAgaWYgKGNoYXJhY3RlckRvZXNFeGlzdChvcHRpb25zLmZvbnQsIHdvcmRDaGFyKSkge1xuICAgICAgY29uc3QgY2hhciA9IG9wdGlvbnMuZm9udFt3b3JkQ2hhcl07XG4gICAgICB3aWR0aCArPSAoY2hhci53aWR0aCArIGNoYXIub2Zmc2V0WCArIG9wdGlvbnMudHJhY2tpbmcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB3aWR0aDtcbn1cbiIsImltcG9ydCB7IE1ldGFUaWxlIH0gZnJvbSBcIi4vbWV0YVRpbGVcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHRpbGVMb2FkZXIgKFxuICBwYXRoczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSxcbiAgb25Db21wbGV0ZTogKHRpbGVzOiB7IFtrZXk6IHN0cmluZ106IE1ldGFUaWxlIH0pID0+IGFueVxuKTogdm9pZCB7XG4gIGNvbnN0IHRyYWNrQ291bnQgPSBPYmplY3Qua2V5cyhwYXRocykubGVuZ3RoO1xuICBjb25zdCB0aWxlczogeyBba2V5OiBzdHJpbmddOiBNZXRhVGlsZSB9ID0ge307XG4gIGxldCBsb2FkZWRDb3VudCA9IDA7XG5cbiAgaWYgKCF0cmFja0NvdW50KSB7XG4gICAgb25Db21wbGV0ZSh7fSk7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIG9uTG9hZGVkICgpOiB2b2lkIHtcbiAgICBsb2FkZWRDb3VudCsrO1xuXG4gICAgaWYgKGxvYWRlZENvdW50ID09PSB0cmFja0NvdW50KSB7XG4gICAgICBvbkNvbXBsZXRlKHRpbGVzKTtcbiAgICB9XG4gIH1cblxuICAvLyBUT0RPIHN3aXRjaCB0byBhc3luYy9hd2FpdCBmZXRjaCgpXG4gIGZvciAoY29uc3QgbmFtZSBpbiBwYXRocykge1xuICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgIHRpbGVzW25hbWVdID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgb25Mb2FkZWQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGlsZSBcIiR7bmFtZX1cIiB3YXMgbm90IGZvdW5kYCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHhoci5vcGVuKCdHRVQnLCBwYXRoc1tuYW1lXSk7XG4gICAgeGhyLnNlbmQoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlQ2FudmFzIH0gZnJvbSAnLi9jb21tb24vY2FudmFzJztcbmltcG9ydCAqIGFzIGxvb3AgZnJvbSAnLi9jb21tb24vbG9vcCc7XG5pbXBvcnQgKiBhcyBzY2VuZSBmcm9tICcuL2NvbW1vbi9zY2VuZSc7XG5cbmltcG9ydCB7IGFib3V0IH0gZnJvbSAnLi9zY2VuZXMvYWJvdXQvYWJvdXQnO1xuaW1wb3J0IHsgc3BsYXNoIH0gZnJvbSAnLi9zY2VuZXMvc3BsYXNoL3NwbGFzaCc7XG5pbXBvcnQgeyBsb2FkaW5nIH0gZnJvbSAnLi9zY2VuZXMvbG9hZGluZy9sb2FkaW5nJztcbmltcG9ydCB7IHRpdGxlIH0gZnJvbSAnLi9zY2VuZXMvdGl0bGUvdGl0bGUnO1xuXG5jb25zdCBjYW52YXMgPSBjcmVhdGVDYW52YXMoKTtcbmNhbnZhcy5maXRUb1ZpZXdwb3J0KCk7XG53aW5kb3cub25yZXNpemUgPSAoKSA9PiBjYW52YXMuZml0VG9WaWV3cG9ydCgpO1xud2luZG93Lm9uZGV2aWNlb3JpZW50YXRpb24gPSAoKSA9PiBjYW52YXMuZml0VG9WaWV3cG9ydCgpO1xuXG5zY2VuZS5pbml0KHtcbiAgYWJvdXQsXG4gIGxvYWRpbmcsXG4gIHNwbGFzaCxcbiAgdGl0bGVcbn0sICdzcGxhc2gnLCBjYW52YXMpO1xuXG5sb29wLmluaXQoKCkgPT4ge1xuICBzY2VuZS51cGRhdGUoY2FudmFzKTtcbn0pO1xuIiwiaW1wb3J0IHsgY3JlYXRlUmVjdGFuZ2xlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9yZWN0YW5nbGVcIjtcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zY2VuZVwiO1xuaW1wb3J0IHsgY3JlYXRlTWV0YVRpbGVTcHJpdGUsIGNyZWF0ZVRleHRTcHJpdGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Nwcml0ZVwiO1xuXG5pbXBvcnQgeyB0ZXh0T3B0aW9ucyB9IGZyb20gXCIuLi9jb21tb24vdGV4dE9wdGlvbnNcIjtcbmltcG9ydCB7IGN1cnNvciB9IGZyb20gXCIuLi9jb21tb24vY3Vyc29yXCI7XG5cbmNvbnN0IG1hcmdpbiA9IDEyO1xuXG5mdW5jdGlvbiBwbGFjZUl0ZW1zIChzY2VuZTogU2NlbmUpOiB2b2lkIHsgIFxuICBjb25zdCBjYW52YXNSZWN0YW5nbGUgPSBjcmVhdGVSZWN0YW5nbGUoe1xuICAgIHdpZHRoOiBzY2VuZS5jYW52YXMuY29uZmlnLndpZHRoLFxuICAgIGhlaWdodDogc2NlbmUuY2FudmFzLmNvbmZpZy5oZWlnaHRcbiAgfSk7XG5cbiAgc2NlbmUuc3ByaXRlcy50aXRsZS5yZWN0YW5nbGUuY2VudGVyWChjYW52YXNSZWN0YW5nbGUpO1xuICBzY2VuZS5zcHJpdGVzLnRpdGxlLnJlY3RhbmdsZS55ID0gbWFyZ2luO1xuXG4gIHNjZW5lLnNwcml0ZXMuYWJvdXQucmVjdGFuZ2xlLnggPSBtYXJnaW47XG4gIHNjZW5lLnNwcml0ZXMuYWJvdXQucmVjdGFuZ2xlLnkgPSBzY2VuZS5zcHJpdGVzLnRpdGxlLnJlY3RhbmdsZS55ICsgdGV4dE9wdGlvbnMubGluZUhlaWdodCAqIDI7XG5cbiAgc2NlbmUuc3ByaXRlcy5sZWFybk1vcmUucmVjdGFuZ2xlLnggPSBtYXJnaW47XG4gIHNjZW5lLnNwcml0ZXMubGVhcm5Nb3JlLnJlY3RhbmdsZS55ID0gc2NlbmUuc3ByaXRlcy50aXRsZS5yZWN0YW5nbGUueSArIHRleHRPcHRpb25zLmxpbmVIZWlnaHQgKiA4O1xuXG4gIHNjZW5lLnNwcml0ZXMuaGZ0bXQucmVjdGFuZ2xlLnggPSBtYXJnaW47XG4gIHNjZW5lLnNwcml0ZXMuaGZ0bXQucmVjdGFuZ2xlLnkgPSBzY2VuZS5zcHJpdGVzLnRpdGxlLnJlY3RhbmdsZS55ICsgdGV4dE9wdGlvbnMubGluZUhlaWdodCAqIDEwO1xuXG4gIHNjZW5lLnNwcml0ZXMudGhhbmtzLnJlY3RhbmdsZS54ID0gbWFyZ2luO1xuICBzY2VuZS5zcHJpdGVzLnRoYW5rcy5yZWN0YW5nbGUueSA9IHNjZW5lLnNwcml0ZXMudGl0bGUucmVjdGFuZ2xlLnkgKyB0ZXh0T3B0aW9ucy5saW5lSGVpZ2h0ICogMTI7XG5cbiAgc2NlbmUuc3ByaXRlcy5tYWtlcnMucmVjdGFuZ2xlLnggPSBtYXJnaW47XG4gIHNjZW5lLnNwcml0ZXMubWFrZXJzLnJlY3RhbmdsZS55ID0gc2NlbmUuc3ByaXRlcy50aXRsZS5yZWN0YW5nbGUueSArIHRleHRPcHRpb25zLmxpbmVIZWlnaHQgKiAxMztcblxuICBzY2VuZS5zcHJpdGVzLmJhY2sucmVjdGFuZ2xlLmNlbnRlclgoY2FudmFzUmVjdGFuZ2xlKTtcbiAgc2NlbmUuc3ByaXRlcy5iYWNrLnJlY3RhbmdsZS55ID0gY2FudmFzUmVjdGFuZ2xlLmhlaWdodCAtIHRleHRPcHRpb25zLmxpbmVIZWlnaHQgLSBtYXJnaW47XG59XG5cbmV4cG9ydCBjb25zdCBhYm91dDogU2NlbmUgPSB7XG4gIG5hbWU6ICdhYm91dCcsXG4gIGJnQ29sb3I6ICcjMDAwJyxcbiAgcHJlbG9hZDoge1xuICAgICdjdXJzb3InOiAnc3JjL3NjZW5lcy9hc3NldHMvdGl0bGUvY3Vyc29yLmpzb24nXG4gIH0sXG5cbiAgaW5pdDogZnVuY3Rpb24gKCk6IHZvaWQge1xuICAgIGN1cnNvci50aWNrQ291bnQgPSAwO1xuXG4gICAgdGhpcy5zcHJpdGVzLnRpdGxlID0gY3JlYXRlVGV4dFNwcml0ZSh7XG4gICAgICBjb2xvcjogJyNlZWUnLFxuICAgICAgb3B0aW9uczogdGV4dE9wdGlvbnMsXG4gICAgICB2YWx1ZTogJ0FCT1VUJ1xuICAgIH0pO1xuICAgIHRoaXMuc3ByaXRlcy5hYm91dCA9IGNyZWF0ZVRleHRTcHJpdGUoe1xuICAgICAgY29sb3I6ICcjZWVlJyxcbiAgICAgIG9wdGlvbnM6IHRleHRPcHRpb25zLFxuICAgICAgbWF4V2lkdGg6IHRoaXMuY2FudmFzLmNvbmZpZy53aWR0aCAtIChtYXJnaW4gKiAyKSxcbiAgICAgIHZhbHVlOiBgVEhJUyBQUk9KRUNUIElTIEFOIE9ERSBUTyBPTkUgT0YgTVkgRkFWT1JJVEUgUE9EQ0FTVFM6IEhFTExPIEZST00gVEhFIE1BR0lDIFRBVkVSTi4gSVQgSVMgTk9UIEFGRklMSUFURUQgV0lUSCBUSEUgU0hPVyBJTiBBTlkgV0FZLiAoTk9UIFRIQVQgSSdNIEFHQUlOU1QgVEhBVCBIQVBQRU5JTkcgLSBKVVNUIFNBWUlORylgXG4gICAgfSk7XG4gICAgdGhpcy5zcHJpdGVzLmxlYXJuTW9yZSA9IGNyZWF0ZVRleHRTcHJpdGUoe1xuICAgICAgY29sb3I6ICcjZWVlJyxcbiAgICAgIG9wdGlvbnM6IHRleHRPcHRpb25zLFxuICAgICAgbWF4V2lkdGg6IHRoaXMuY2FudmFzLmNvbmZpZy53aWR0aCAtIChtYXJnaW4gKiAyKSxcbiAgICAgIHZhbHVlOiBgVE8gTEVBUk4gTU9SRSBBQk9VVCBUSEUgU0hPVywgQU5EIEhPVyBJVCdTIFRPVEFMTFkgUkVBTCwgR08gVE86YFxuICAgIH0pO1xuICAgIHRoaXMuc3ByaXRlcy5oZnRtdCA9IGNyZWF0ZVRleHRTcHJpdGUoe1xuICAgICAgY29sb3I6ICcjMDRkJyxcbiAgICAgIG9wdGlvbnM6IHRleHRPcHRpb25zLFxuICAgICAgdmFsdWU6ICdIRUxMT0ZST01USEVNQUdJQ1RBVkVSTi5DT00nXG4gICAgfSk7XG4gICAgdGhpcy5zcHJpdGVzLnRoYW5rcyA9IGNyZWF0ZVRleHRTcHJpdGUoe1xuICAgICAgY29sb3I6ICcjZWVlJyxcbiAgICAgIG9wdGlvbnM6IHRleHRPcHRpb25zLFxuICAgICAgdmFsdWU6IGBTUEVDSUFMIFRIQU5LUyBUTyBUSEUgTUFLRVJTIE9GOmBcbiAgICB9KTtcbiAgICB0aGlzLnNwcml0ZXMubWFrZXJzID0gY3JlYXRlVGV4dFNwcml0ZSh7XG4gICAgICBjb2xvcjogJyMwNGQnLFxuICAgICAgb3B0aW9uczogdGV4dE9wdGlvbnMsXG4gICAgICBtYXhXaWR0aDogMTI4LFxuICAgICAgdmFsdWU6ICdQSVNLRUxBUFAuQ09NIFlNQ0suTkVUL0FQUC9NQUdJQ0FMLThCSVQtUExVRydcbiAgICB9KTtcbiAgICB0aGlzLnNwcml0ZXMuYmFjayA9IGNyZWF0ZVRleHRTcHJpdGUoe1xuICAgICAgY29sb3I6ICcjZWVlJyxcbiAgICAgIG9wdGlvbnM6IHRleHRPcHRpb25zLFxuICAgICAgdmFsdWU6ICdCQUNLIFRPIFRJVExFIFNDUkVFTidcbiAgICB9KTtcblxuICAgIHBsYWNlSXRlbXModGhpcyk7XG5cbiAgICB0aGlzLnNwcml0ZXMuY3Vyc29yID0gY3JlYXRlTWV0YVRpbGVTcHJpdGUoe1xuICAgICAgbWV0YVRpbGU6IHRoaXMubWV0YVRpbGVzLmN1cnNvclxuICAgIH0pO1xuXG4gICAgY29uc3QgaGFuZGxlQmFjayA9ICgpOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlU2NlbmUoJ3RpdGxlJyk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250cm9scy5hUHJlc3MgPSAoKSA9PiB7XG4gICAgICBoYW5kbGVCYWNrKCk7XG4gICAgfTtcbiAgICB0aGlzLmNvbnRyb2xzLnN0YXJ0UHJlc3MgPSAoKSA9PiB7XG4gICAgICBoYW5kbGVCYWNrKCk7XG4gICAgfTtcbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uICgpOiB2b2lkIHtcbiAgICBjdXJzb3IudXBkYXRlKHRoaXMsIHRoaXMuc3ByaXRlcy5iYWNrLnJlY3RhbmdsZSk7XG4gIH0sXG5cbiAgb25SZXNpemU6IGZ1bmN0aW9uICgpOiB2b2lkIHtcbiAgICBwbGFjZUl0ZW1zKHRoaXMpO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9yZWN0YW5nbGVcIjtcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zY2VuZVwiO1xuXG5leHBvcnQgY29uc3QgY3Vyc29yID0ge1xuICBvZmZzZXRYOiA3LFxuICBvZmZzZXRZOiAxLFxuICB0aWNrc1BlckJsaW5rOiAxNixcbiAgdGlja0NvdW50OiAwLFxuXG4gIHVwZGF0ZTogZnVuY3Rpb24gKHNjZW5lOiBTY2VuZSwgc2VsZWN0ZWRSZWN0YW5nbGU6IFJlY3RhbmdsZSk6IHZvaWQge1xuICAgIGNvbnN0IHNwcml0ZSA9IHNjZW5lLmR5bmFtaWNQb29sLmdldEl0ZW0oJ2N1cnNvcicpO1xuXG4gICAgaWYgKHRoaXMudGlja0NvdW50IDwgdGhpcy50aWNrc1BlckJsaW5rKSB7XG4gICAgICB0aGlzLnRpY2tDb3VudCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcHJpdGUudmlzaWJsZSA9ICFzcHJpdGUudmlzaWJsZTtcbiAgICAgIHRoaXMudGlja0NvdW50ID0gMDtcbiAgICB9XG5cbiAgICBzcHJpdGUucmVjdGFuZ2xlLnggPSBzZWxlY3RlZFJlY3RhbmdsZS54IC0gc3ByaXRlLnJlY3RhbmdsZS53aWR0aCAtIHRoaXMub2Zmc2V0WFxuICAgIHNwcml0ZS5yZWN0YW5nbGUueSA9IHNlbGVjdGVkUmVjdGFuZ2xlLnkgLSB0aGlzLm9mZnNldFk7XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBGb250LCBUZXh0T3B0aW9ucyB9IGZyb20gJy4uLy4uL2NvbW1vbi90ZXh0JztcblxuaW1wb3J0IGZvbnREYXRhIGZyb20gJy4uL2Fzc2V0cy9jb21tb24vbmVzLWZvbnQuanNvbic7XG5cbmNvbnN0IGZvbnQgPSBmb250RGF0YSBhcyBGb250O1xuXG5leHBvcnQgY29uc3QgdGV4dE9wdGlvbnM6IFRleHRPcHRpb25zID0ge1xuICBmb250LFxuICB0cmFja2luZzogMSxcbiAgbGluZUhlaWdodDogMTBcbn07XG4iLCJpbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc2NlbmVcIjtcbmltcG9ydCB7IGNyZWF0ZVRleHRTcHJpdGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Nwcml0ZVwiO1xuXG5pbXBvcnQgeyB0ZXh0T3B0aW9ucyB9IGZyb20gXCIuLi9jb21tb24vdGV4dE9wdGlvbnNcIjtcblxuZXhwb3J0IGNvbnN0IGxvYWRpbmc6IFNjZW5lID0ge1xuICBuYW1lOiAnbG9hZGluZycsXG4gIGJnQ29sb3I6ICcjMDAwJyxcblxuICBpbml0OiBmdW5jdGlvbiAoKTogdm9pZCB7XG4gICAgY29uc3QgbG9hZGluZ1RleHQgPSBjcmVhdGVUZXh0U3ByaXRlKHtcbiAgICAgIGNvbG9yOiAnI2VlZScsXG4gICAgICBvcHRpb25zOiB0ZXh0T3B0aW9ucyxcbiAgICAgIHZhbHVlOiAnTE9BRElORydcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdGljUG9vbC5hZGRJdGVtcygnbWFpbicsIHtcbiAgICAgIG5hbWU6ICdtYWluJyxcbiAgICAgIHNwcml0ZTogbG9hZGluZ1RleHRcbiAgICB9KTtcblxuICAgIGNvbnN0IGVsbGlwc2lzID0gY3JlYXRlVGV4dFNwcml0ZSh7XG4gICAgICBjb2xvcjogJyNlZWUnLFxuICAgICAgb3B0aW9uczogdGV4dE9wdGlvbnMsXG4gICAgICB2YWx1ZTogJy4uLidcbiAgICB9KTtcbiAgICBlbGxpcHNpcy5hZGRBbmltYXRpb24oJ2N5Y2xlJywgMCwgbnVsbCwgMTYsICdsb29wJyk7XG4gICAgZWxsaXBzaXMuc3RhcnRBbmltYXRpb24oJ2N5Y2xlJyk7XG5cbiAgICB0aGlzLmR5bmFtaWNQb29sLmFkZEl0ZW1zKCdtYWluJywge1xuICAgICAgbmFtZTogJ2VsbGlwc2lzJyxcbiAgICAgIHNwcml0ZTogZWxsaXBzaXNcbiAgICB9KTtcblxuICAgIGNvbnN0IHRleHRZID0gdGhpcy5jYW52YXMuY29uZmlnLmhlaWdodCAtIChsb2FkaW5nVGV4dC5yZWN0YW5nbGUuaGVpZ2h0ICsgMTYpO1xuXG4gICAgbG9hZGluZ1RleHQucmVjdGFuZ2xlLnggPSAoXG4gICAgICB0aGlzLmNhbnZhcy5jb25maWcud2lkdGggLSAobG9hZGluZ1RleHQucmVjdGFuZ2xlLndpZHRoICsgZWxsaXBzaXMucmVjdGFuZ2xlLndpZHRoICsgOClcbiAgICApO1xuICAgIGxvYWRpbmdUZXh0LnJlY3RhbmdsZS55ID0gdGV4dFk7XG5cbiAgICBlbGxpcHNpcy5yZWN0YW5nbGUueCA9IChcbiAgICAgIGxvYWRpbmdUZXh0LnJlY3RhbmdsZS54ICsgbG9hZGluZ1RleHQucmVjdGFuZ2xlLndpZHRoXG4gICAgKTtcbiAgICBlbGxpcHNpcy5yZWN0YW5nbGUueSA9IHRleHRZO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlUmVjdGFuZ2xlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9yZWN0YW5nbGVcIjtcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zY2VuZVwiO1xuaW1wb3J0IHsgY3JlYXRlTWV0YVRpbGVTcHJpdGUsIGNyZWF0ZVRleHRTcHJpdGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Nwcml0ZVwiO1xuXG5pbXBvcnQgeyB0ZXh0T3B0aW9ucyB9IGZyb20gXCIuLi9jb21tb24vdGV4dE9wdGlvbnNcIjtcblxuZnVuY3Rpb24gcG9zaXRpb25JdGVtcyAoc2NlbmU6IFNjZW5lKTogdm9pZCB7XG4gIGNvbnN0IGNhbnZhc1JlY3RhbmdsZSA9IGNyZWF0ZVJlY3RhbmdsZSh7IHdpZHRoOiBzY2VuZS5jYW52YXMuY29uZmlnLndpZHRoIH0pO1xuICBjb25zdCBjb250cm9scyA9IHNjZW5lLnN0YXRpY1Bvb2wuZ2V0SXRlbSgnY29udHJvbHMnKTtcbiAgY29uc3QgYW55S2V5ID0gc2NlbmUuZHluYW1pY1Bvb2wuZ2V0SXRlbSgnYW55S2V5Jyk7XG5cbiAgY29udHJvbHMucmVjdGFuZ2xlLmNlbnRlclgoY2FudmFzUmVjdGFuZ2xlKTtcbiAgY29udHJvbHMucmVjdGFuZ2xlLnkgPSAxODtcblxuICBhbnlLZXkucmVjdGFuZ2xlLmNlbnRlclgoY2FudmFzUmVjdGFuZ2xlKTtcbiAgYW55S2V5LnJlY3RhbmdsZS55ID0gMjA2O1xufVxuXG5jb25zdCBhbnlLZXkgPSB7XG4gIHRpY2tzUGVyQmxpbms6IDE2LFxuICB0aWNrQ291bnQ6IDAsXG5cbiAgdXBkYXRlOiBmdW5jdGlvbiAoc2NlbmU6IFNjZW5lKTogdm9pZCB7XG4gICAgY29uc3QgYW55S2V5ID0gc2NlbmUuZHluYW1pY1Bvb2wuZ2V0SXRlbSgnYW55S2V5Jyk7XG5cbiAgICBpZiAodGhpcy50aWNrQ291bnQgPCB0aGlzLnRpY2tzUGVyQmxpbmspIHtcbiAgICAgIHRoaXMudGlja0NvdW50Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFueUtleS52aXNpYmxlID0gIWFueUtleS52aXNpYmxlO1xuICAgICAgdGhpcy50aWNrQ291bnQgPSAwO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgc3BsYXNoOiBTY2VuZSA9IHtcbiAgbmFtZTogJ3NwbGFzaCcsXG4gIGJnQ29sb3I6ICcjMDAwJyxcbiAgcHJlbG9hZDoge1xuICAgIGNvbnRyb2xzOiAnc3JjL3NjZW5lcy9hc3NldHMvc3BsYXNoL2NvbnRyb2xzLmpzb24nXG4gIH0sXG5cbiAgaW5pdDogZnVuY3Rpb24gKCk6IHZvaWQge1xuICAgIGFueUtleS50aWNrQ291bnQgPSAwO1xuXG4gICAgdGhpcy5jb250cm9scy5rZXlEb3duID0gKCkgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2VTY2VuZSgndGl0bGUnKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRpY1Bvb2wuYWRkSXRlbXMoJ21haW4nLCB7XG4gICAgICBuYW1lOiAnY29udHJvbHMnLFxuICAgICAgc3ByaXRlOiBjcmVhdGVNZXRhVGlsZVNwcml0ZSh7XG4gICAgICAgIG1ldGFUaWxlOiB0aGlzLm1ldGFUaWxlcy5jb250cm9sc1xuICAgICAgfSlcbiAgICB9KTtcblxuICAgIHRoaXMuZHluYW1pY1Bvb2wuYWRkSXRlbXMoJ21haW4nLCB7XG4gICAgICBuYW1lOiAnYW55S2V5JyxcbiAgICAgIHNwcml0ZTogY3JlYXRlVGV4dFNwcml0ZSh7XG4gICAgICAgIGNvbG9yOiAnI2VlZScsXG4gICAgICAgIG9wdGlvbnM6IHRleHRPcHRpb25zLFxuICAgICAgICB2YWx1ZTogJ1BSRVNTIEFOWSBCVVRUT04gVE8gQ09OVElOVUUnXG4gICAgICB9KVxuICAgIH0pO1xuXG4gICAgcG9zaXRpb25JdGVtcyh0aGlzKTtcbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uICgpOiB2b2lkIHtcbiAgICBhbnlLZXkudXBkYXRlKHRoaXMpO1xuICB9LFxuXG4gIG9uUmVzaXplOiBmdW5jdGlvbiAoKTogdm9pZCB7XG4gICAgcG9zaXRpb25JdGVtcyh0aGlzKTtcbiAgfVxufTtcbiIsImltcG9ydCB7IG1lZGlhUGxheWVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tZWRpYVBsYXllclwiO1xuaW1wb3J0IHsgY3JlYXRlUmVjdGFuZ2xlLCBSZWN0YW5nbGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3JlY3RhbmdsZVwiO1xuaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NjZW5lXCI7XG5pbXBvcnQgeyBjcmVhdGVNZXRhVGlsZVNwcml0ZSwgY3JlYXRlVGV4dFNwcml0ZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc3ByaXRlXCI7XG5cbmltcG9ydCB7IHRleHRPcHRpb25zIH0gZnJvbSBcIi4uL2NvbW1vbi90ZXh0T3B0aW9uc1wiO1xuaW1wb3J0IHsgY3Vyc29yIH0gZnJvbSBcIi4uL2NvbW1vbi9jdXJzb3JcIjtcblxuZnVuY3Rpb24gcG9zaXRpb25TdGF0aWNJdGVtcyAoc2NlbmU6IFNjZW5lKTogdm9pZCB7XG4gIGNvbnN0IGNhbnZhc1JlY3RhbmdsZSA9IGNyZWF0ZVJlY3RhbmdsZSh7XG4gICAgd2lkdGg6IHNjZW5lLmNhbnZhcy5jb25maWcud2lkdGgsXG4gICAgaGVpZ2h0OiBzY2VuZS5jYW52YXMuY29uZmlnLmhlaWdodFxuICB9KTtcbiAgY29uc3QgdGl0bGVUZXh0ID0gc2NlbmUuc3RhdGljUG9vbC5nZXRJdGVtKCd0aXRsZVRleHQnKTtcbiAgY29uc3Qgc3RhcnRHYW1lID0gc2NlbmUuc3RhdGljUG9vbC5nZXRJdGVtKCdzdGFydEdhbWUnKTtcbiAgY29uc3QgYWJvdXQgPSBzY2VuZS5zdGF0aWNQb29sLmdldEl0ZW0oJ2Fib3V0Jyk7XG4gIGNvbnN0IGNvcHlyaWdodCA9IHNjZW5lLnN0YXRpY1Bvb2wuZ2V0SXRlbSgnY29weXJpZ2h0Jyk7XG5cbiAgdGl0bGVUZXh0LnJlY3RhbmdsZS5jZW50ZXJYKGNhbnZhc1JlY3RhbmdsZSk7XG4gIHN0YXJ0R2FtZS5yZWN0YW5nbGUuY2VudGVyWChjYW52YXNSZWN0YW5nbGUpO1xuICBhYm91dC5yZWN0YW5nbGUuY2VudGVyWChjYW52YXNSZWN0YW5nbGUpO1xuICBjb3B5cmlnaHQucmVjdGFuZ2xlLmNlbnRlclgoY2FudmFzUmVjdGFuZ2xlKTtcblxuICB0aXRsZVRleHQucmVjdGFuZ2xlLnkgPSAxODtcbiAgc3RhcnRHYW1lLnJlY3RhbmdsZS55ID0gMTU0O1xuICBhYm91dC5yZWN0YW5nbGUueSA9IHN0YXJ0R2FtZS5yZWN0YW5nbGUueSArIDE5O1xuICBjb3B5cmlnaHQucmVjdGFuZ2xlLnkgPSBjYW52YXNSZWN0YW5nbGUuaGVpZ2h0IC0gMTY7XG59XG5cbmNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgaW5kZXg6IDAsXG4gIGl0ZW1zOiBbXG4gICAgJ3N0YXJ0R2FtZScsXG4gICAgJ2Fib3V0J1xuICBdXG59O1xuXG5leHBvcnQgY29uc3QgdGl0bGU6IFNjZW5lID0ge1xuICBuYW1lOiAndGl0bGUnLFxuICBiZ0NvbG9yOiAnIzAwMCcsXG4gIHByZWxvYWQ6IHtcbiAgICAndGhlbWUnOiAnc3JjL3NjZW5lcy9hc3NldHMvdGl0bGUvdGhlbWUubXAzJyxcbiAgICAnc2VsZWN0JzogJ3NyYy9zY2VuZXMvYXNzZXRzL3RpdGxlL3NlbGVjdC5tcDMnLFxuICAgICd0aXRsZVRleHQnOiAnc3JjL3NjZW5lcy9hc3NldHMvdGl0bGUvdGl0bGUtdGV4dC5qc29uJyxcbiAgICAnY3Vyc29yJzogJ3NyYy9zY2VuZXMvYXNzZXRzL3RpdGxlL2N1cnNvci5qc29uJ1xuICB9LFxuXG4gIGluaXQ6IGZ1bmN0aW9uICgpOiB2b2lkIHtcbiAgICBzZWxlY3Rpb24uaW5kZXggPSAwO1xuICAgIGN1cnNvci50aWNrQ291bnQgPSAwO1xuXG4gICAgdGhpcy5zdGF0aWNQb29sLmFkZEl0ZW1zKCdtYWluJywge1xuICAgICAgbmFtZTogJ3RpdGxlVGV4dCcsXG4gICAgICBzcHJpdGU6IGNyZWF0ZU1ldGFUaWxlU3ByaXRlKHtcbiAgICAgICAgbWV0YVRpbGU6IHRoaXMubWV0YVRpbGVzLnRpdGxlVGV4dFxuICAgICAgfSlcbiAgICB9KTtcbiAgICB0aGlzLnN0YXRpY1Bvb2wuYWRkSXRlbXMoJ21haW4nLCB7XG4gICAgICBuYW1lOiAnY29weXJpZ2h0JyxcbiAgICAgIHNwcml0ZTogY3JlYXRlVGV4dFNwcml0ZSh7XG4gICAgICAgIGNvbG9yOiAnI2VlZScsXG4gICAgICAgIG9wdGlvbnM6IHRleHRPcHRpb25zLFxuICAgICAgICB2YWx1ZTogJzIwMjEgQ09TTUlDIFBPTFlHT04nXG4gICAgICB9KVxuICAgIH0pO1xuXG4gICAgdGhpcy5zdGF0aWNQb29sLmFkZEl0ZW1zKCdzZWxlY3Rpb24nLCB7XG4gICAgICBuYW1lOiAnc3RhcnRHYW1lJyxcbiAgICAgIHNwcml0ZTogY3JlYXRlVGV4dFNwcml0ZSh7XG4gICAgICAgIGNvbG9yOiAnI2VlZScsXG4gICAgICAgIG9wdGlvbnM6IHRleHRPcHRpb25zLFxuICAgICAgICB2YWx1ZTogJ1NUQVJUIEdBTUUnXG4gICAgICB9KVxuICAgIH0pO1xuICAgIHRoaXMuc3RhdGljUG9vbC5hZGRJdGVtcygnc2VsZWN0aW9uJywge1xuICAgICAgbmFtZTogJ2Fib3V0JyxcbiAgICAgIHNwcml0ZTogY3JlYXRlVGV4dFNwcml0ZSh7XG4gICAgICAgIGNvbG9yOiAnI2VlZScsXG4gICAgICAgIG9wdGlvbnM6IHRleHRPcHRpb25zLFxuICAgICAgICB2YWx1ZTogJ0FCT1VUJ1xuICAgICAgfSlcbiAgICB9KTtcblxuICAgIHBvc2l0aW9uU3RhdGljSXRlbXModGhpcyk7XG5cbiAgICB0aGlzLmR5bmFtaWNQb29sLmFkZEl0ZW1zKCdtYWluJywge1xuICAgICAgbmFtZTogJ2N1cnNvcicsXG4gICAgICBzcHJpdGU6IGNyZWF0ZU1ldGFUaWxlU3ByaXRlKHtcbiAgICAgICAgbWV0YVRpbGU6IHRoaXMubWV0YVRpbGVzLmN1cnNvclxuICAgICAgfSlcbiAgICB9KTtcblxuICAgIGNvbnN0IGhhbmRsZVNlbGVjdGlvbiA9ICgpOiB2b2lkID0+IHtcbiAgICAgIG1lZGlhUGxheWVyLnBhdXNlQWxsKCk7XG4gICAgICBtZWRpYVBsYXllci5wbGF5KCdzZWxlY3QnLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHNlbGVjdGlvbi5pbmRleCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU2NlbmUoJ2ludHJvJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVNjZW5lKCdhYm91dCcpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250cm9scy51cFByZXNzID0gKCkgPT4ge1xuICAgICAgaWYgKHNlbGVjdGlvbi5pbmRleCA+IDApIHtcbiAgICAgICAgc2VsZWN0aW9uLmluZGV4LS07XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLmNvbnRyb2xzLmRvd25QcmVzcyA9ICgpID0+IHtcbiAgICAgIGlmIChzZWxlY3Rpb24uaW5kZXggPCBzZWxlY3Rpb24uaXRlbXMubGVuZ3RoIC0gMSkge1xuICAgICAgICBzZWxlY3Rpb24uaW5kZXgrKztcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuY29udHJvbHMuYVByZXNzID0gKCkgPT4ge1xuICAgICAgaGFuZGxlU2VsZWN0aW9uKCk7XG4gICAgfTtcbiAgICB0aGlzLmNvbnRyb2xzLnN0YXJ0UHJlc3MgPSAoKSA9PiB7XG4gICAgICBoYW5kbGVTZWxlY3Rpb24oKTtcbiAgICB9O1xuXG4gICAgbWVkaWFQbGF5ZXIucGxheSgndGhlbWUnLCB0cnVlKTtcbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uICgpOiB2b2lkIHtcbiAgICBjb25zdCBpdGVtc0dyb3VwID0gdGhpcy5zdGF0aWNQb29sLmdldEdyb3VwKCdzZWxlY3Rpb24nKTtcbiAgICBjdXJzb3IudXBkYXRlKHRoaXMsIGl0ZW1zR3JvdXAuaXRlbXNbc2VsZWN0aW9uLmluZGV4XS5zcHJpdGUucmVjdGFuZ2xlKTtcbiAgfSxcblxuICBvblJlc2l6ZTogZnVuY3Rpb24gKCk6IHZvaWQge1xuICAgIHBvc2l0aW9uU3RhdGljSXRlbXModGhpcyk7XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9