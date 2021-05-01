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
            return Math.floor(pixelsPerPixel);
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
        onResize: null
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
    Object.values(scene.staticSprites).forEach(function (sprite) {
        sprite.draw('static', scene.canvas);
    });
}
function drawDynamicItems(scene, canvas) {
    scene.canvas.clear('dynamic');
    Object.values(scene.animations).forEach(function (animation) {
        animation.update('dynamic', canvas);
    });
    Object.values(scene.sprites).forEach(function (sprite) {
        sprite.draw('dynamic', canvas);
    });
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
        currentScene.animations = {};
        currentScene.metaTiles = {};
        currentScene.sprites = {};
        currentScene.staticSprites = {};
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
        scene = __assign(__assign({}, scene), { animations: {}, canvas: canvas, config: _config__WEBPACK_IMPORTED_MODULE_1__["config"], controls: _controls__WEBPACK_IMPORTED_MODULE_2__["controls"], metaTiles: {}, mediaPlayer: _mediaPlayer__WEBPACK_IMPORTED_MODULE_3__["mediaPlayer"], sprites: {}, staticSprites: {} });
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
        drawDynamicItems(scenes.loading, canvas);
    }
    else {
        if (typeof currentScene.update === 'function') {
            currentScene.update(canvas);
        }
        currentScene.controls.update();
        drawDynamicItems(currentScene, canvas);
    }
}


/***/ }),

/***/ "./src/common/sprite.ts":
/*!******************************!*\
  !*** ./src/common/sprite.ts ***!
  \******************************/
/*! exports provided: createMetaTileSprite, createTextSprite */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMetaTileSprite", function() { return createMetaTileSprite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTextSprite", function() { return createTextSprite; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/common/config.ts");
/* harmony import */ var _hitBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hitBox */ "./src/common/hitBox.ts");
/* harmony import */ var _metaTile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metaTile */ "./src/common/metaTile.ts");
/* harmony import */ var _rectangle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rectangle */ "./src/common/rectangle.ts");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./text */ "./src/common/text.ts");
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
    return __assign({ visible: true, metaTile: null, rectangle: rectangle,
        hitBox: hitBox, draw: function (type, canvas) {
            if (!this.visible) {
                return;
            }
            if (_config__WEBPACK_IMPORTED_MODULE_0__["config"].debug) {
                console.log("metaTileSprite.draw()");
            }
            updateHitBox(type, canvas);
            Object(_metaTile__WEBPACK_IMPORTED_MODULE_2__["drawTile"])(type, canvas, this.rectangle.x, this.rectangle.y, this.metaTile);
        }, createAnimation: function (startFrame, endFrame, tickInterval, onComplete) {
            var sprite = this;
            var canAdvance = true;
            var willHandleComplete = false;
            var currentFrame = startFrame;
            var tickCount = 0;
            return {
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
                update: function (type, canvas) {
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
                    sprite.metaTile.frame = currentFrame;
                    sprite.draw(type, canvas);
                }
            };
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
    var width = params.maxWidth || Object(_text__WEBPACK_IMPORTED_MODULE_4__["getLineLength"])(params.value, params.options);
    var rectangle = Object(_rectangle__WEBPACK_IMPORTED_MODULE_3__["createRectangle"])({ width: width });
    return __assign({ color: '#000', value: '', maxWidth: null, visible: true, options: Object(_text__WEBPACK_IMPORTED_MODULE_4__["createTextOptions"])(), rectangle: rectangle, draw: function (type, canvas) {
            if (!this.visible) {
                return;
            }
            if (_config__WEBPACK_IMPORTED_MODULE_0__["config"].debug) {
                console.log("textSprite.draw()");
            }
            canvas.context[type].fillStyle = this.color;
            if (this.maxWidth) {
                var lines = Object(_text__WEBPACK_IMPORTED_MODULE_4__["getLines"])(this.value, this.options, this.maxWidth);
                var y = this.rectangle.y;
                for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                    var line = lines_1[_i];
                    Object(_text__WEBPACK_IMPORTED_MODULE_4__["drawTextLine"])(type, canvas, this.rectangle.x, y, line, this.options);
                    y += this.options.lineHeight;
                }
            }
            else {
                Object(_text__WEBPACK_IMPORTED_MODULE_4__["drawTextLine"])(type, canvas, this.rectangle.x, this.rectangle.y, this.value, this.options);
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
        createAnimation: function (startChar, endChar, tickInterval, onComplete) {
            var sprite = this;
            var charLen = sprite.value.split('').length;
            var tickCount = 0;
            var drawableCharLen = startChar;
            var willHandleComplete = false;
            var canAdvance = true;
            endChar = endChar > 0 ? endChar : charLen;
            return {
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
                update: function (type, canvas) {
                    if (!sprite.visible) {
                        return;
                    }
                    canvas.context[type].fillStyle = sprite.color;
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
                        console.log("metaTileSprite.draw()");
                    }
                    if (sprite.maxWidth) {
                        var lines = Object(_text__WEBPACK_IMPORTED_MODULE_4__["getLines"])(sprite.value, sprite.options, sprite.maxWidth);
                        var y = sprite.rectangle.y;
                        var drawnCharLen = 0;
                        for (var _i = 0, lines_2 = lines; _i < lines_2.length; _i++) {
                            var line = lines_2[_i];
                            if (drawnCharLen + line.length < drawableCharLen) {
                                Object(_text__WEBPACK_IMPORTED_MODULE_4__["drawTextLine"])(type, canvas, sprite.rectangle.x, y, line, sprite.options);
                                drawnCharLen += line.length;
                            }
                            else {
                                Object(_text__WEBPACK_IMPORTED_MODULE_4__["drawTextLine"])(type, canvas, sprite.rectangle.x, y, line.slice(0, drawableCharLen - drawnCharLen), sprite.options);
                                drawnCharLen += drawableCharLen - drawnCharLen;
                                break;
                            }
                            y += sprite.options.lineHeight;
                        }
                    }
                    else {
                        Object(_text__WEBPACK_IMPORTED_MODULE_4__["drawTextLine"])(type, canvas, sprite.rectangle.x, sprite.rectangle.y, sprite.value.slice(0, drawableCharLen), sprite.options);
                    }
                }
            };
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
    lines.push(line);
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
/* harmony import */ var _scenes_splash_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/splash/index */ "./src/scenes/splash/index.ts");
/* harmony import */ var _scenes_loading_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scenes/loading/index */ "./src/scenes/loading/index.ts");
/* harmony import */ var _scenes_title_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scenes/title/index */ "./src/scenes/title/index.ts");



// import { intro } from './scenes/intro/index';


// import { prologue } from './scenes/play/prologue/index';
// import { test } from './scenes/test/index';

var canvas = Object(_common_canvas__WEBPACK_IMPORTED_MODULE_0__["createCanvas"])();
canvas.fitToViewport();
window.onresize = function () { return canvas.fitToViewport(); };
_common_scene__WEBPACK_IMPORTED_MODULE_2__["init"]({
    loading: _scenes_loading_index__WEBPACK_IMPORTED_MODULE_4__["loading"],
    splash: _scenes_splash_index__WEBPACK_IMPORTED_MODULE_3__["splash"],
    title: _scenes_title_index__WEBPACK_IMPORTED_MODULE_5__["title"]
}, 'splash', canvas);
_common_loop__WEBPACK_IMPORTED_MODULE_1__["init"](function () {
    _common_scene__WEBPACK_IMPORTED_MODULE_2__["update"](canvas);
});


/***/ }),

/***/ "./src/scenes/common/data/nes-font.json":
/*!**********************************************!*\
  !*** ./src/scenes/common/data/nes-font.json ***!
  \**********************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,  , ., :, ;, ', ", ,, !, ?, _, -, +, =, *, (, ), A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"0\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,1,1,1,0,0,0,1,0,0,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,0,0,1,0,0,0,1,1,1,0,0]},\"1\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1]},\"2\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,1,0,1,1,0,0,0,1,1,0,0,0,0,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,0,0,0,0,1,1,1,1,1,1,1]},\"3\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,1,1,1,0]},\"4\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,1,1,0,1,1,0,1,1,0,0,1,1,0,1,1,1,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,0]},\"5\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,1,0,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,1,1,1,0]},\"6\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,1,1,1,1,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,1,1,1,0]},\"7\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0]},\"8\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,0,0,1,1,0,0,0,1,0,1,1,1,0,0,1,0,0,1,1,1,1,0,0,1,0,0,0,0,1,1,1,0,0,0,0,1,1,0,1,1,1,1,1,0]},\"9\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,1,1,1,1,0,0]},\" \":{\"offsetX\":-2,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},\".\":{\"offsetX\":0,\"offsetY\":0,\"width\":2,\"height\":7,\"tile\":[0,0,0,0,0,0,0,0,0,0,1,1,1,1]},\":\":{\"offsetX\":0,\"offsetY\":0,\"width\":2,\"height\":7,\"tile\":[0,0,1,1,1,1,0,0,0,0,1,1,1,1]},\";\":{\"offsetX\":0,\"offsetY\":2,\"width\":2,\"height\":7,\"tile\":[1,1,1,1,0,0,0,0,1,1,0,1,1,0]},\"'\":{\"offsetX\":0,\"offsetY\":0,\"width\":2,\"height\":7,\"tile\":[1,1,1,1,0,1,0,0,0,0,0,0,0,0]},\"\\\"\":{\"offsetX\":0,\"offsetY\":0,\"width\":5,\"height\":7,\"tile\":[1,1,0,1,1,1,1,0,1,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},\",\":{\"offsetX\":0,\"offsetY\":2,\"width\":2,\"height\":7,\"tile\":[0,0,0,0,0,0,0,0,1,1,0,1,1,0]},\"!\":{\"offsetX\":1,\"offsetY\":0,\"width\":2,\"height\":7,\"tile\":[1,1,1,1,1,1,1,1,1,1,0,0,1,1]},\"?\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,0,1,1,0,0,1,1,1,1,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0]},\"_\":{\"offsetX\":0,\"offsetY\":0,\"width\":5,\"height\":7,\"tile\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1]},\"-\":{\"offsetX\":0,\"offsetY\":0,\"width\":5,\"height\":7,\"tile\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},\"+\":{\"offsetX\":0,\"offsetY\":0,\"width\":5,\"height\":7,\"tile\":[0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0]},\"=\":{\"offsetX\":0,\"offsetY\":0,\"width\":5,\"height\":7,\"tile\":[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0]},\"*\":{\"offsetX\":0,\"offsetY\":0,\"width\":5,\"height\":7,\"tile\":[1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0]},\"(\":{\"offsetX\":0,\"offsetY\":-1,\"width\":3,\"height\":9,\"tile\":[0,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,1,1]},\")\":{\"offsetX\":0,\"offsetY\":-1,\"width\":3,\"height\":9,\"tile\":[1,1,0,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,1,0]},\"A\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,1,1,1,0,0,0,1,1,0,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1]},\"B\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0]},\"C\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,1,1,1,1,0,0,1,1,0,0,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,1,1,0]},\"D\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,0,0,1,1,0,0,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,1,1,0,1,1,1,1,1,0,0]},\"E\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1]},\"F\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0]},\"G\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,1,1,1,1,0,0,1,1,0,0,1,1,1,1,0,0,0,0,0,1,1,0,0,1,1,1,1,1,0,0,0,1,1,0,1,1,0,0,1,1,0,0,1,1,1,1,1]},\"H\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1]},\"I\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1]},\"J\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,0,0,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,1,1,1,0]},\"K\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,0,0,0,1,1,1,1,0,0,1,1,0,1,1,0,1,1,0,0,1,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,0,1,1,1,0,1,1,0,0,1,1,1]},\"L\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1]},\"M\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1]},\"N\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,1,1]},\"O\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,1,1,1,0]},\"P\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0]},\"Q\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,0,0,1,1,1,1,0,1]},\"R\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,1,1,0,1,1,1,1,1,0,0,1,1,0,1,1,1,0,1,1,0,0,1,1,1]},\"S\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,1,1,1,0]},\"T\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0]},\"U\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,1,1,1,0]},\"V\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0]},\"W\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,1,1]},\"X\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,0,0,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,0,0,1,1]},\"Y\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[0,1,1,0,0,1,1,0,1,1,0,0,1,1,0,1,1,0,0,1,1,0,0,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0]},\"Z\":{\"offsetX\":0,\"offsetY\":0,\"width\":7,\"height\":7,\"tile\":[1,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0,1,1,1,1,1,1,1]}}");

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
/* harmony import */ var _data_nes_font_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/nes-font.json */ "./src/scenes/common/data/nes-font.json");
var _data_nes_font_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./data/nes-font.json */ "./src/scenes/common/data/nes-font.json", 1);

var font = _data_nes_font_json__WEBPACK_IMPORTED_MODULE_0__;
var textOptions = {
    font: font,
    tracking: 1,
    lineHeight: 10
};


/***/ }),

/***/ "./src/scenes/loading/index.ts":
/*!*************************************!*\
  !*** ./src/scenes/loading/index.ts ***!
  \*************************************/
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
        this.sprites.loadingText = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_0__["createTextSprite"])({
            color: '#fff',
            options: _common_textOptions__WEBPACK_IMPORTED_MODULE_1__["textOptions"],
            value: 'LOADING'
        });
        var ellipsis = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_0__["createTextSprite"])({
            color: '#fff',
            options: _common_textOptions__WEBPACK_IMPORTED_MODULE_1__["textOptions"],
            value: '...'
        });
        this.animations.ellipsis = ellipsis.createAnimation(0, null, 16, 'loop');
        var textY = this.canvas.config.height - (this.sprites.loadingText.rectangle.height + 16);
        this.sprites.loadingText.rectangle.x = (this.canvas.config.width - (this.sprites.loadingText.rectangle.width + ellipsis.rectangle.width + 8));
        this.sprites.loadingText.rectangle.y = textY;
        ellipsis.rectangle.x = (this.sprites.loadingText.rectangle.x + this.sprites.loadingText.rectangle.width);
        ellipsis.rectangle.y = textY;
    }
};


/***/ }),

/***/ "./src/scenes/splash/index.ts":
/*!************************************!*\
  !*** ./src/scenes/splash/index.ts ***!
  \************************************/
/*! exports provided: splash */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splash", function() { return splash; });
/* harmony import */ var _common_rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/rectangle */ "./src/common/rectangle.ts");
/* harmony import */ var _common_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/sprite */ "./src/common/sprite.ts");
/* harmony import */ var _common_textOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/textOptions */ "./src/scenes/common/textOptions.ts");



function placeItems(scene) {
    var canvasRectangle = Object(_common_rectangle__WEBPACK_IMPORTED_MODULE_0__["createRectangle"])({ width: scene.canvas.config.width });
    scene.staticSprites.controls.rectangle.centerX(canvasRectangle);
    scene.staticSprites.controls.rectangle.y = 18;
    scene.sprites.anyKey.rectangle.centerX(canvasRectangle);
    scene.sprites.anyKey.rectangle.y = 206;
}
var anyKey = {
    ticksPerBlink: 16,
    tickCount: 0,
    update: function (scene) {
        if (this.tickCount < this.ticksPerBlink) {
            this.tickCount++;
        }
        else {
            scene.sprites.anyKey.visible = !scene.sprites.anyKey.visible;
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
        this.staticSprites.controls = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_1__["createMetaTileSprite"])({
            metaTile: this.metaTiles.controls
        });
        this.sprites.anyKey = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_1__["createTextSprite"])({
            color: '#fff',
            options: _common_textOptions__WEBPACK_IMPORTED_MODULE_2__["textOptions"],
            value: 'PRESS ANY KEY TO CONTINUE'
        });
        placeItems(this);
    },
    update: function () {
        anyKey.update(this);
    },
    onResize: function () {
        placeItems(this);
    }
};


/***/ }),

/***/ "./src/scenes/title/index.ts":
/*!***********************************!*\
  !*** ./src/scenes/title/index.ts ***!
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




function placeStaticItems(scene) {
    var canvasRectangle = Object(_common_rectangle__WEBPACK_IMPORTED_MODULE_1__["createRectangle"])({
        width: scene.canvas.config.width,
        height: scene.canvas.config.height
    });
    scene.staticSprites.titleText.rectangle.centerX(canvasRectangle);
    scene.staticSprites.startGame.rectangle.centerX(canvasRectangle);
    scene.staticSprites.about.rectangle.centerX(canvasRectangle);
    scene.staticSprites.copyright.rectangle.centerX(canvasRectangle);
    scene.staticSprites.titleText.rectangle.y = 18;
    scene.staticSprites.startGame.rectangle.y = 154;
    scene.staticSprites.about.rectangle.y = scene.staticSprites.startGame.rectangle.y + 19;
    scene.staticSprites.copyright.rectangle.y = canvasRectangle.height - 16;
}
var selection = {
    index: 0,
    items: [
        'startGame',
        'about'
    ]
};
var cursor = {
    offsetX: 7,
    offsetY: 1,
    ticksPerBlink: 16,
    tickCount: 0,
    update: function (scene, selectedRectangle) {
        if (this.tickCount < this.ticksPerBlink) {
            this.tickCount++;
        }
        else {
            scene.sprites.cursor.visible = !scene.sprites.cursor.visible;
            this.tickCount = 0;
        }
        scene.sprites.cursor.rectangle.x = selectedRectangle.x - scene.sprites.cursor.rectangle.width - this.offsetX;
        scene.sprites.cursor.rectangle.y = selectedRectangle.y - this.offsetY;
    }
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
        cursor.tickCount = 0;
        this.staticSprites.titleText = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_2__["createMetaTileSprite"])({
            metaTile: this.metaTiles.titleText
        });
        this.staticSprites.startGame = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_2__["createTextSprite"])({
            color: '#fff',
            options: _common_textOptions__WEBPACK_IMPORTED_MODULE_3__["textOptions"],
            value: 'START GAME'
        });
        this.staticSprites.about = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_2__["createTextSprite"])({
            color: '#fff',
            options: _common_textOptions__WEBPACK_IMPORTED_MODULE_3__["textOptions"],
            value: 'ABOUT'
        });
        this.staticSprites.copyright = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_2__["createTextSprite"])({
            color: '#fff',
            options: _common_textOptions__WEBPACK_IMPORTED_MODULE_3__["textOptions"],
            value: '2021 COSMIC POLYGON'
        });
        placeStaticItems(this);
        this.sprites.cursor = Object(_common_sprite__WEBPACK_IMPORTED_MODULE_2__["createMetaTileSprite"])({
            metaTile: this.metaTiles.cursor
        });
        var handleSelection = function () {
            _common_mediaPlayer__WEBPACK_IMPORTED_MODULE_0__["mediaPlayer"].pauseAll();
            _common_mediaPlayer__WEBPACK_IMPORTED_MODULE_0__["mediaPlayer"].play('select', false, function () {
                switch (selection.index) {
                    case 0:
                        console.log(_this.changeScene('intro'));
                        break;
                    case 1:
                        console.log(_this.changeScene('about'));
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
        cursor.update(this, this.staticSprites[selection.items[selection.index]].rectangle);
    },
    onResize: function () {
        placeStaticItems(this);
    }
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9hc3NldExvYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2NhbnZhcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2NvbmZpZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2NvbnRyb2xzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vaGl0Qm94LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vbG9vcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL21lZGlhUGxheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vbWV0YVRpbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9yZWN0YW5nbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9zY2VuZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3Nwcml0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3RleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi90aWxlTG9hZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NlbmVzL2NvbW1vbi90ZXh0T3B0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NlbmVzL2xvYWRpbmcvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjZW5lcy9zcGxhc2gvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjZW5lcy90aXRsZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7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QyxNQUFNLEdBQUc7WUFDckIsZUFBZSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUc7WUFDekIsZUFBZSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDO1FBRUYsK0RBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxNQUFNLEVBQUU7UUFDTixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVELFFBQVEsRUFBRTtRQUNSLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Q0FDRixDQUFDIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBNZWRpYVBsYXllciB9IGZyb20gJy4vbWVkaWFQbGF5ZXInO1xuaW1wb3J0IHsgTWV0YVRpbGUgfSBmcm9tICcuL21ldGFUaWxlJztcbmltcG9ydCB7IHRpbGVMb2FkZXIgfSBmcm9tICcuL3RpbGVMb2FkZXInO1xuXG5mdW5jdGlvbiBnZXRQYXRoc09mVHlwZSAoXG4gIHBhdGhzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9LCB0eXBlOiAnLm1wMycgfCAnLmpzb24nXG4pOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHtcbiAgY29uc3QgcGF0aHNPZlR5cGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblxuICBmb3IgKGNvbnN0IG5hbWUgaW4gcGF0aHMpIHtcbiAgICBjb25zdCBwYXRoID0gcGF0aHNbbmFtZV07XG5cbiAgICBpZiAocGF0aC5lbmRzV2l0aCh0eXBlKSkge1xuICAgICAgcGF0aHNPZlR5cGVbbmFtZV0gPSBwYXRoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXRoc09mVHlwZTtcbn1cblxuLyoqXG4gKiBtZWRpYSBhbmQganNvbiBmaWxlcyBhcmUgbm90IHBhcmFsbGVsaXplZC4uLiAmc2hydWc7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NldExvYWRlciAoXG4gIG1lZGlhUGxheWVyOiBNZWRpYVBsYXllcixcbiAgcGF0aHM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0sXG4gIG9uQ29tcGxldGU6ICh0aWxlczogeyBba2V5OiBzdHJpbmddOiBNZXRhVGlsZSB9KSA9PiBhbnlcbik6IHZvaWQge1xuICBmdW5jdGlvbiBtZWRpYUNvbXBsZXRlICgpOiB2b2lkIHtcbiAgICB0aWxlTG9hZGVyKGdldFBhdGhzT2ZUeXBlKHBhdGhzLCAnLmpzb24nKSwgdGlsZXNDb21wbGV0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aWxlc0NvbXBsZXRlICh0aWxlczogeyBba2V5OiBzdHJpbmddOiBNZXRhVGlsZSB9KTogdm9pZCB7XG4gICAgb25Db21wbGV0ZSh0aWxlcyk7XG4gIH1cblxuICBtZWRpYVBsYXllci5sb2FkKGdldFBhdGhzT2ZUeXBlKHBhdGhzLCAnLm1wMycpLCBtZWRpYUNvbXBsZXRlKTtcbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgQ2FudmFzQ29uZmlnIHtcbiAgcHBwOiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBDYW52YXNUeXBlID0gJ3N0YXRpYycgfCAnZHluYW1pYyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FudmFzIHtcbiAgZWxlbWVudDogUmVjb3JkPENhbnZhc1R5cGUsIEhUTUxDYW52YXNFbGVtZW50PjtcbiAgY29udGV4dDogUmVjb3JkPENhbnZhc1R5cGUsIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRD47XG4gIGNvbmZpZzogQ2FudmFzQ29uZmlnO1xuXG4gIGNsZWFyOiAoY2FudmFzVHlwZTogQ2FudmFzVHlwZSwgY29sb3VyPzogc3RyaW5nKSA9PiB2b2lkO1xuICBnZXRTY2FsZUZhY3RvcjogKHZpZXdwb3J0V2lkdGg6IG51bWJlciwgdmlld3BvcnRIZWlnaHQ6IG51bWJlcikgPT4gbnVtYmVyO1xuICBmaXRUb1ZpZXdwb3J0OiAoKSA9PiB2b2lkO1xuICBvblJlc2l6ZTogKCkgPT4gYW55O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQHBhcmFtIHtQYXJ0aWFsPENhbnZhc0NvbmZpZz59IFtjb25maWc9e31dXG4gKiBAcmV0dXJucyB7Q2FudmFzfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2FudmFzICh1c2VyQ29uZmlnOiBQYXJ0aWFsPENhbnZhc0NvbmZpZz4gPSB7fSk6IENhbnZhcyB7XG4gIGNvbnN0IGNvbmZpZzogQ2FudmFzQ29uZmlnID0ge1xuICAgIHBwcDogMSxcbiAgICAvLyBuZXM6IDI1NngyNDBcbiAgICB3aWR0aDogMzIwLFxuICAgIGhlaWdodDogMjQwLFxuICAgIC4uLnVzZXJDb25maWdcbiAgfTtcblxuICBmdW5jdGlvbiBjYW52YXNGYWN0b3J5IChpZDogc3RyaW5nKTogeyBlbGVtZW50OiBIVE1MQ2FudmFzRWxlbWVudCwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIH0ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgIGVsZW1lbnQuaWQgPSBpZDtcbiAgICBlbGVtZW50LndpZHRoID0gY29uZmlnLndpZHRoO1xuICAgIGVsZW1lbnQuaGVpZ2h0ID0gY29uZmlnLmhlaWdodDtcbiAgICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblxuICAgIGNvbnN0IGNvbnRleHQgPSBlbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgY29udGV4dCEuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7IC8vICpjd2lzcHkqXG5cbiAgICByZXR1cm4ge1xuICAgICAgZWxlbWVudCxcbiAgICAgIGNvbnRleHRcbiAgICB9O1xuICB9XG5cbiAgY29uc3Qgc3RhdGljdWxhciA9IGNhbnZhc0ZhY3RvcnkoJ3N0YXRpYycpO1xuICBjb25zdCBkeW5hbWljID0gY2FudmFzRmFjdG9yeSgnZHluYW1pYycpO1xuXG4gIGRvY3VtZW50LmJvZHkuc3R5bGUubWFyZ2luID0gJzAnO1xuICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzdGF0aWN1bGFyLmVsZW1lbnQpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGR5bmFtaWMuZWxlbWVudCk7XG5cbiAgcmV0dXJuIHtcbiAgICBlbGVtZW50OiB7XG4gICAgICBzdGF0aWM6IHN0YXRpY3VsYXIuZWxlbWVudCxcbiAgICAgIGR5bmFtaWM6IGR5bmFtaWMuZWxlbWVudFxuICAgIH0sXG4gICAgY29udGV4dDoge1xuICAgICAgc3RhdGljOiBzdGF0aWN1bGFyLmNvbnRleHQsXG4gICAgICBkeW5hbWljOiBkeW5hbWljLmNvbnRleHRcbiAgICB9LFxuICAgIGNvbmZpZyxcblxuICAgIGNsZWFyOiBmdW5jdGlvbiAodHlwZTogQ2FudmFzVHlwZSwgY29sb3VyPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICBjb25zdCB3aWR0aCA9IHRoaXMuY29uZmlnLndpZHRoO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jb25maWcuaGVpZ2h0O1xuICAgICAgY29uc3QgcHBwID0gdGhpcy5jb25maWcucHBwO1xuICAgIFxuICAgICAgaWYgKGNvbG91cikge1xuICAgICAgICB0aGlzLmNvbnRleHRbdHlwZV0uZmlsbFN0eWxlID0gY29sb3VyO1xuICAgICAgICB0aGlzLmNvbnRleHRbdHlwZV0uZmlsbFJlY3QoMCwgMCwgd2lkdGggKiBwcHAsIGhlaWdodCAqIHBwcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbnRleHRbdHlwZV0uY2xlYXJSZWN0KDAsIDAsIHdpZHRoICogcHBwLCBoZWlnaHQgKiBwcHApO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRTY2FsZUZhY3RvcjogZnVuY3Rpb24gKHZpZXdwb3J0V2lkdGg6IG51bWJlciwgdmlld3BvcnRIZWlnaHQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgICBjb25zdCB2aWV3cG9ydElzTGFuZHNjYXBlID0gdmlld3BvcnRXaWR0aCA+IHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgY29uc3QgY2FudmFzSXNMYW5kc2NhcGUgPSB0aGlzLmNvbmZpZy53aWR0aCA+IHRoaXMuY29uZmlnLmhlaWdodDtcbiAgICAgIGxldCBwaXhlbHNQZXJQaXhlbDogbnVtYmVyO1xuICAgIFxuICAgICAgaWYgKHZpZXdwb3J0SXNMYW5kc2NhcGUpIHtcbiAgICAgICAgaWYgKGNhbnZhc0lzTGFuZHNjYXBlICYmIHRoaXMuY29uZmlnLmhlaWdodCAqICh2aWV3cG9ydFdpZHRoIC8gdGhpcy5jb25maWcud2lkdGgpIDw9IHZpZXdwb3J0SGVpZ2h0KSB7XG4gICAgICAgICAgcGl4ZWxzUGVyUGl4ZWwgPSB2aWV3cG9ydFdpZHRoIC8gdGhpcy5jb25maWcud2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGl4ZWxzUGVyUGl4ZWwgPSB2aWV3cG9ydEhlaWdodCAvIHRoaXMuY29uZmlnLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFjYW52YXNJc0xhbmRzY2FwZSAmJiB0aGlzLmNvbmZpZy53aWR0aCAqICh2aWV3cG9ydEhlaWdodCAvIHRoaXMuY29uZmlnLmhlaWdodCkgPD0gdmlld3BvcnRXaWR0aCkge1xuICAgICAgICAgIHBpeGVsc1BlclBpeGVsID0gdmlld3BvcnRIZWlnaHQgLyB0aGlzLmNvbmZpZy5oZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGl4ZWxzUGVyUGl4ZWwgPSB2aWV3cG9ydFdpZHRoIC8gdGhpcy5jb25maWcud2lkdGg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIE1hdGguZmxvb3IocGl4ZWxzUGVyUGl4ZWwpO1xuICAgIH0sXG5cbiAgICBmaXRUb1ZpZXdwb3J0OiBmdW5jdGlvbiAoKTogdm9pZCB7XG4gICAgICBjb25zdCB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGNvbnN0IHNjYWxlRmFjdG9yID0gdGhpcy5nZXRTY2FsZUZhY3Rvcih2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCk7XG5cbiAgICAgIHRoaXMuY29uZmlnLnBwcCA9IHNjYWxlRmFjdG9yO1xuXG4gICAgICBmb3IgKGNvbnN0IHR5cGUgaW4gdGhpcy5lbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRbdHlwZSBhcyBDYW52YXNUeXBlXTtcblxuICAgICAgICBlbGVtZW50LndpZHRoID0gdGhpcy5jb25maWcud2lkdGggKiBzY2FsZUZhY3RvcjtcbiAgICAgICAgZWxlbWVudC5oZWlnaHQgPSB0aGlzLmNvbmZpZy5oZWlnaHQgKiBzY2FsZUZhY3RvcjtcblxuICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IGAke3ZpZXdwb3J0SGVpZ2h0IC8gMiAtIGVsZW1lbnQuaGVpZ2h0IC8gMn1weGA7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IGAke3ZpZXdwb3J0V2lkdGggLyAyIC0gZWxlbWVudC53aWR0aCAvIDJ9cHhgO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRoaXMub25SZXNpemUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBvblJlc2l6ZTogbnVsbFxuICB9O1xufVxuIiwiZXhwb3J0IGludGVyZmFjZSBDb25maWcge1xuICBkZWJ1ZzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGNvbmZpZzogQ29uZmlnID0ge1xuICBkZWJ1ZzogZmFsc2Vcbn07XG4iLCJleHBvcnQgaW50ZXJmYWNlIENvbnRyb2xzIHtcbiAgdXBQcmVzczogKGU/OiBLZXlib2FyZEV2ZW50KSA9PiBhbnk7XG4gIHJpZ2h0UHJlc3M6IChlPzogS2V5Ym9hcmRFdmVudCkgPT4gYW55O1xuICBkb3duUHJlc3M6IChlPzogS2V5Ym9hcmRFdmVudCkgPT4gYW55O1xuICBsZWZ0UHJlc3M6IChlPzogS2V5Ym9hcmRFdmVudCkgPT4gYW55O1xuICBhUHJlc3M6IChlPzogS2V5Ym9hcmRFdmVudCkgPT4gYW55O1xuICBiUHJlc3M6IChlPzogS2V5Ym9hcmRFdmVudCkgPT4gYW55O1xuICBzZWxlY3RQcmVzczogKGU/OiBLZXlib2FyZEV2ZW50KSA9PiBhbnk7XG4gIHN0YXJ0UHJlc3M6IChlPzogS2V5Ym9hcmRFdmVudCkgPT4gYW55O1xuXG4gIHVwUmVsZWFzZTogKGU/OiBLZXlib2FyZEV2ZW50KSA9PiBhbnk7XG4gIHJpZ2h0UmVsZWFzZTogKGU/OiBLZXlib2FyZEV2ZW50KSA9PiBhbnk7XG4gIGRvd25SZWxlYXNlOiAoZT86IEtleWJvYXJkRXZlbnQpID0+IGFueTtcbiAgbGVmdFJlbGVhc2U6IChlPzogS2V5Ym9hcmRFdmVudCkgPT4gYW55O1xuICBhUmVsZWFzZTogKGU/OiBLZXlib2FyZEV2ZW50KSA9PiBhbnk7XG4gIGJSZWxlYXNlOiAoZT86IEtleWJvYXJkRXZlbnQpID0+IGFueTtcbiAgc2VsZWN0UmVsZWFzZTogKGU/OiBLZXlib2FyZEV2ZW50KSA9PiBhbnk7XG4gIHN0YXJ0UmVsZWFzZTogKGU/OiBLZXlib2FyZEV2ZW50KSA9PiBhbnk7XG5cbiAga2V5RG93bjogKGU/OiBLZXlib2FyZEV2ZW50KSA9PiBhbnk7XG4gIGtleVVwOiAoZT86IEtleWJvYXJkRXZlbnQpID0+IGFueTtcblxuICByZXNldDogKCkgPT4gdm9pZDtcbiAgdXBkYXRlOiAoKSA9PiB2b2lkO1xufVxuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5sZXQgZXZlbnRRdWV1ZTogKGtleW9mIE9taXQ8Q29udHJvbHMsICdyZXNldCcgfCAndXBkYXRlJz4pW10gPSBbXTtcblxuZXhwb3J0IGNvbnN0IGNvbnRyb2xzOiBDb250cm9scyA9IHtcbiAgdXBQcmVzczogbm9vcCxcbiAgbGVmdFByZXNzOiBub29wLFxuICBkb3duUHJlc3M6IG5vb3AsXG4gIHJpZ2h0UHJlc3M6IG5vb3AsXG4gIGFQcmVzczogbm9vcCxcbiAgYlByZXNzOiBub29wLFxuICBzZWxlY3RQcmVzczogbm9vcCxcbiAgc3RhcnRQcmVzczogbm9vcCxcblxuICB1cFJlbGVhc2U6IG5vb3AsXG4gIGxlZnRSZWxlYXNlOiBub29wLFxuICBkb3duUmVsZWFzZTogbm9vcCxcbiAgcmlnaHRSZWxlYXNlOiBub29wLFxuICBhUmVsZWFzZTogbm9vcCxcbiAgYlJlbGVhc2U6IG5vb3AsXG4gIHNlbGVjdFJlbGVhc2U6IG5vb3AsXG4gIHN0YXJ0UmVsZWFzZTogbm9vcCxcblxuICBrZXlEb3duOiBub29wLFxuICBrZXlVcDogbm9vcCxcblxuICByZXNldDogZnVuY3Rpb24gKCk6IHZvaWQge1xuICAgIGNvbnRyb2xzLnVwUHJlc3MgPSBub29wO1xuICAgIGNvbnRyb2xzLmxlZnRQcmVzcyA9IG5vb3A7XG4gICAgY29udHJvbHMuZG93blByZXNzID0gbm9vcDtcbiAgICBjb250cm9scy5yaWdodFByZXNzID0gbm9vcDtcbiAgICBjb250cm9scy5hUHJlc3MgPSBub29wO1xuICAgIGNvbnRyb2xzLmJQcmVzcyA9IG5vb3A7XG4gICAgY29udHJvbHMuc2VsZWN0UHJlc3MgPSBub29wO1xuICAgIGNvbnRyb2xzLnN0YXJ0UHJlc3MgPSBub29wO1xuICBcbiAgICBjb250cm9scy51cFJlbGVhc2UgPSBub29wO1xuICAgIGNvbnRyb2xzLmxlZnRSZWxlYXNlID0gbm9vcDtcbiAgICBjb250cm9scy5kb3duUmVsZWFzZSA9IG5vb3A7XG4gICAgY29udHJvbHMucmlnaHRSZWxlYXNlID0gbm9vcDtcbiAgICBjb250cm9scy5hUmVsZWFzZSA9IG5vb3A7XG4gICAgY29udHJvbHMuYlJlbGVhc2UgPSBub29wO1xuICAgIGNvbnRyb2xzLnNlbGVjdFJlbGVhc2UgPSBub29wO1xuICAgIGNvbnRyb2xzLnN0YXJ0UmVsZWFzZSA9IG5vb3A7XG4gIFxuICAgIGNvbnRyb2xzLmtleURvd24gPSBub29wO1xuICAgIGNvbnRyb2xzLmtleVVwID0gbm9vcDtcbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uICgpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGV2ZW50TmFtZSBvZiBldmVudFF1ZXVlKSB7XG4gICAgICBjb250cm9sc1tldmVudE5hbWVdKCk7XG4gICAgfVxuICBcbiAgICBldmVudFF1ZXVlID0gW107XG4gIH1cbn1cblxuZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24gKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHN3aXRjaChlLmtleSkge1xuICAgIGNhc2UgJ3cnOlxuICAgIGNhc2UgJ1cnOlxuICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgZXZlbnRRdWV1ZS5wdXNoKCd1cFByZXNzJyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdkJzpcbiAgICBjYXNlICdEJzpcbiAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgIGV2ZW50UXVldWUucHVzaCgncmlnaHRQcmVzcycpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncyc6XG4gICAgY2FzZSAnUyc6XG4gICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgIGV2ZW50UXVldWUucHVzaCgnZG93blByZXNzJyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdhJzpcbiAgICBjYXNlICdBJzpcbiAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgZXZlbnRRdWV1ZS5wdXNoKCdsZWZ0UHJlc3MnKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnaic6XG4gICAgY2FzZSAnSic6XG4gICAgY2FzZSAneic6XG4gICAgY2FzZSAnWic6XG4gICAgICBldmVudFF1ZXVlLnB1c2goJ2FQcmVzcycpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnayc6XG4gICAgY2FzZSAnSyc6XG4gICAgY2FzZSAneCc6XG4gICAgY2FzZSAnWCc6XG4gICAgICBldmVudFF1ZXVlLnB1c2goJ2JQcmVzcycpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICcgJzpcbiAgICAgIGV2ZW50UXVldWUucHVzaCgnc2VsZWN0UHJlc3MnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgIGV2ZW50UXVldWUucHVzaCgnc3RhcnRQcmVzcycpO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBpZiAoIWUubWV0YUtleSkge1xuICAgIGV2ZW50UXVldWUucHVzaCgna2V5RG93bicpO1xuICB9XG59O1xuXG5kb2N1bWVudC5vbmtleXVwID0gZnVuY3Rpb24gKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHN3aXRjaChlLmtleSkge1xuICAgIGNhc2UgJ3cnOlxuICAgIGNhc2UgJ1cnOlxuICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgZXZlbnRRdWV1ZS5wdXNoKCd1cFJlbGVhc2UnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2QnOlxuICAgIGNhc2UgJ0QnOlxuICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgZXZlbnRRdWV1ZS5wdXNoKCdyaWdodFJlbGVhc2UnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3MnOlxuICAgIGNhc2UgJ1MnOlxuICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICBldmVudFF1ZXVlLnB1c2goJ2Rvd25SZWxlYXNlJyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdhJzpcbiAgICBjYXNlICdBJzpcbiAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgZXZlbnRRdWV1ZS5wdXNoKCdsZWZ0UmVsZWFzZScpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdqJzpcbiAgICBjYXNlICdKJzpcbiAgICBjYXNlICd6JzpcbiAgICBjYXNlICdaJzpcbiAgICAgIGV2ZW50UXVldWUucHVzaCgnYVJlbGVhc2UnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2snOlxuICAgIGNhc2UgJ0snOlxuICAgIGNhc2UgJ3gnOlxuICAgIGNhc2UgJ1gnOlxuICAgICAgZXZlbnRRdWV1ZS5wdXNoKCdiUmVsZWFzZScpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICcgJzpcbiAgICAgIGV2ZW50UXVldWUucHVzaCgnc2VsZWN0UmVsZWFzZScpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnRW50ZXInOlxuICAgICAgZXZlbnRRdWV1ZS5wdXNoKCdzdGFydFJlbGVhc2UnKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgaWYgKCFlLm1ldGFLZXkpIHtcbiAgICBldmVudFF1ZXVlLnB1c2goJ2tleVVwJyk7ICBcbiAgfVxufTtcbiIsImltcG9ydCB7IENhbnZhcywgQ2FudmFzVHlwZSB9IGZyb20gXCIuL2NhbnZhc1wiO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyBjcmVhdGVSZWN0YW5nbGUsIFJlY3RhbmdsZSB9IGZyb20gXCIuL3JlY3RhbmdsZVwiO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSGl0Qm94IHtcbiAgY29sb3I6IHN0cmluZzsgLy8gbW92ZSB0byBkZWJ1ZyBvYmplY3RcbiAgcmVjdGFuZ2xlOiBSZWN0YW5nbGU7XG4gIGRyYXc6ICh0eXBlOiBDYW52YXNUeXBlLCBjYW52YXM6IENhbnZhcykgPT4gdm9pZDtcbiAgaGl0OiAoaGl0Qm94OiBIaXRCb3gpID0+IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIaXRCb3ggKFxuICBwYXJhbXM6IFBhcnRpYWw8UGljazxIaXRCb3gsICdjb2xvcicgfCAncmVjdGFuZ2xlJz4+ID0ge31cbik6IEhpdEJveCB7XG4gIHJldHVybiB7XG4gICAgY29sb3I6ICcjMDZmJyxcbiAgICByZWN0YW5nbGU6IGNyZWF0ZVJlY3RhbmdsZShwYXJhbXMucmVjdGFuZ2xlKSxcblxuICAgIGRyYXc6IGZ1bmN0aW9uICh0eXBlOiBDYW52YXNUeXBlLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgaWYgKGNvbmZpZy5kZWJ1Zykge1xuICAgICAgICBjb25zb2xlLmxvZyhgaGl0Qm94LmRyYXcoKWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcHAgPSBjYW52YXMuY29uZmlnLnBwcDtcbiAgICAgIGNhbnZhcy5jb250ZXh0W3R5cGVdLmdsb2JhbEFscGhhID0gMC40O1xuICAgICAgY2FudmFzLmNvbnRleHRbdHlwZV0uZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgIGNhbnZhcy5jb250ZXh0W3R5cGVdLmZpbGxSZWN0KFxuICAgICAgICAodGhpcy5yZWN0YW5nbGUueCkgKiBwcHAsXG4gICAgICAgICh0aGlzLnJlY3RhbmdsZS55KSAqIHBwcCwgXG4gICAgICAgICh0aGlzLnJlY3RhbmdsZS53aWR0aCkgKiBwcHAsXG4gICAgICAgICh0aGlzLnJlY3RhbmdsZS5oZWlnaHQpICogcHBwXG4gICAgICApO1xuICAgIH0sXG5cbiAgICBoaXQ6IGZ1bmN0aW9uIChoaXRCb3g6IEhpdEJveCk6IGJvb2xlYW4ge1xuICAgICAgLy8gVE9ET1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgLi4ucGFyYW1zXG4gIH1cbn1cbiIsImltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvb3Age1xuICBzdGFydDogKCkgPT4gdm9pZDtcbiAgc3RvcDogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgZnBzID0gMjQ7XG5sZXQgdGhlbjogbnVtYmVyO1xubGV0IGVsYXBzZWQ6IG51bWJlcjtcbmxldCBub3c6IG51bWJlcjtcbmxldCBjYW5VcGRhdGUgPSBmYWxzZTtcbmxldCB0aWNrQ291bnQgPSAwO1xubGV0IGNhbGxiYWNrOiAoKSA9PiB2b2lkO1xuXG5mdW5jdGlvbiB1cGRhdGUgKCk6IHZvaWQge1xuICBpZiAoIWNhblVwZGF0ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuXG4gIG5vdyA9IERhdGUubm93KCk7XG4gIGVsYXBzZWQgPSBub3cgLSB0aGVuO1xuXG4gIGlmIChlbGFwc2VkID4gZnBzKSB7XG4gICAgdGhlbiA9IG5vdyAtIChlbGFwc2VkICUgZnBzKTtcbiAgICBcbiAgICBpZiAoY29uZmlnLmRlYnVnKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aWNrQ291bnQpO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgICB0aWNrQ291bnQrKztcbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQgKGNiOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gIGNhbGxiYWNrID0gY2I7XG4gIHRoZW4gPSBEYXRlLm5vdygpO1xuICBzdGFydCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnQgKCk6IHZvaWQge1xuICBjYW5VcGRhdGUgPSB0cnVlO1xuICB1cGRhdGUoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3AgKCk6IHZvaWQge1xuICBjYW5VcGRhdGUgPSBmYWxzZTtcbn1cbiIsInR5cGUgVHJhY2tzID0geyBbbmFtZTogc3RyaW5nXTogSFRNTEF1ZGlvRWxlbWVudCB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIE1lZGlhUGxheWVyIHtcbiAgdHJhY2tzOiBUcmFja3MsXG5cbiAgbG9hZDogKHBhdGhzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9LCBvbkNvbXBsZXRlOiAoKSA9PiBhbnkpID0+IHZvaWQ7XG4gIHBsYXk6IChuYW1lOiBzdHJpbmcsIGxvb3A/OiBib29sZWFuLCBvbkNvbXBsZXRlPzogKCkgPT4gYW55KSA9PiB2b2lkO1xuICBwYXVzZTogKG5hbWU6IHN0cmluZykgPT4gdm9pZDtcbiAgcGF1c2VBbGw6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBtZWRpYVBsYXllcjogTWVkaWFQbGF5ZXIgPSB7XG4gIHRyYWNrczoge30sXG5cbiAgbG9hZDogZnVuY3Rpb24gKHBhdGhzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9LCBvbkNvbXBsZXRlOiAoKSA9PiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCB0cmFja0NvdW50ID0gT2JqZWN0LmtleXMocGF0aHMpLmxlbmd0aDtcbiAgICBsZXQgbG9hZGVkQ291bnQgPSAwO1xuXG4gICAgaWYgKCF0cmFja0NvdW50KSB7XG4gICAgICBvbkNvbXBsZXRlKCk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIG9uTG9hZGVkICgpOiB2b2lkIHtcbiAgICAgIGxvYWRlZENvdW50Kys7XG5cbiAgICAgIGlmIChsb2FkZWRDb3VudCA9PT0gdHJhY2tDb3VudCkge1xuICAgICAgICBvbkNvbXBsZXRlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBuYW1lIGluIHBhdGhzKSB7XG4gICAgICBjb25zdCBhdWRpbyA9IG5ldyBBdWRpbygpO1xuICAgICAgdGhpcy50cmFja3NbbmFtZV0gPSBhdWRpbztcblxuICAgICAgYXVkaW8uc3JjID0gcGF0aHNbbmFtZV07XG4gICAgICBhdWRpby5vbmNhbnBsYXl0aHJvdWdoID0gb25Mb2FkZWQ7XG4gICAgfVxuICB9LFxuXG4gIHBsYXk6IGZ1bmN0aW9uIChuYW1lOiBzdHJpbmcsIGxvb3A6IGJvb2xlYW4gPSBmYWxzZSwgb25Db21wbGV0ZT86ICgpID0+IGFueSk6IHZvaWQge1xuICAgIGlmIChvbkNvbXBsZXRlKSB7XG4gICAgICB0aGlzLnRyYWNrc1tuYW1lXS5vbmVuZGVkID0gKCkgPT4ge1xuICAgICAgICBvbkNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMudHJhY2tzW25hbWVdLm9uZW5kZWQgPSBudWxsO1xuICAgICAgfTtcbiAgICB9XG4gICAgdGhpcy50cmFja3NbbmFtZV0ubG9vcCA9IGxvb3A7XG4gICAgdGhpcy50cmFja3NbbmFtZV0ucGxheSgpO1xuICB9LFxuXG4gIHBhdXNlOiBmdW5jdGlvbiAobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy50cmFja3NbbmFtZV0ucGF1c2UoKTtcbiAgfSxcblxuICBwYXVzZUFsbDogZnVuY3Rpb24gKCk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgbmFtZSBpbiB0aGlzLnRyYWNrcykge1xuICAgICAgdGhpcy50cmFja3NbbmFtZV0ucGF1c2UoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENhbnZhcywgQ2FudmFzVHlwZSB9IGZyb20gXCIuL2NhbnZhc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1ldGFUaWxlIHtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIGZyYW1lOiBudW1iZXI7XG4gIHRpbGVzOiBzdHJpbmdbXVtdO1xufVxuXG4vKipcbiAqIFxuICogQHBhcmFtIGNhbnZhcyBcbiAqIEBwYXJhbSB0aWxlWCBcbiAqIEBwYXJhbSB0aWxlWSBcbiAqIEBwYXJhbSBtZXRhVGlsZSBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRyYXdUaWxlICh0eXBlOiBDYW52YXNUeXBlLCBjYW52YXM6IENhbnZhcywgdGlsZVg6IG51bWJlciwgdGlsZVk6IG51bWJlciwgbWV0YVRpbGU6IE1ldGFUaWxlKTogdm9pZCB7XG4gIGxldCB4ID0gMDtcbiAgbGV0IHkgPSAwO1xuICBjb25zdCBwcHAgPSBjYW52YXMuY29uZmlnLnBwcDtcbiAgY29uc3QgdGlsZSA9IG1ldGFUaWxlLnRpbGVzW21ldGFUaWxlLmZyYW1lXTtcblxuICBjYW52YXMuY29udGV4dFt0eXBlXS5nbG9iYWxBbHBoYSA9IDE7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aWxlLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgaGV4ID0gdGlsZVtpXTtcblxuICAgIGlmIChoZXgpIHtcbiAgICAgIGNhbnZhcy5jb250ZXh0W3R5cGVdLmZpbGxTdHlsZSA9IGhleDtcbiAgICAgIGNhbnZhcy5jb250ZXh0W3R5cGVdLmZpbGxSZWN0KFxuICAgICAgICAodGlsZVggKyB4KSAqIHBwcCxcbiAgICAgICAgKHRpbGVZICsgeSkgKiBwcHAsXG4gICAgICAgIHBwcCwgcHBwXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh4ID09PSBtZXRhVGlsZS53aWR0aCAtIDEpIHtcbiAgICAgIHggPSAwO1xuICAgICAgeSsrO1xuICAgIH0gZWxzZSB7XG4gICAgICB4Kys7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIFJlY3RhbmdsZSB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgY2VudGVyWDogKHJlY3RhbmdsZTogUmVjdGFuZ2xlKSA9PiB2b2lkO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWN0YW5nbGUgKHBhcmFtczogUGFydGlhbDxSZWN0YW5nbGU+ID0ge30pOiBSZWN0YW5nbGUge1xuICByZXR1cm4ge1xuICAgIHg6IDAsXG4gICAgeTogMCxcbiAgICB3aWR0aDogMCxcbiAgICBoZWlnaHQ6IDAsXG4gICAgY2VudGVyWDogZnVuY3Rpb24gKGJhc2U6IFJlY3RhbmdsZSk6IHZvaWQge1xuICAgICAgY29uc3QgcmVsYXRpdmVDZW50ZXIgPSBiYXNlLnggKyBiYXNlLndpZHRoIC8gMjtcbiAgICAgIHRoaXMueCA9IHJlbGF0aXZlQ2VudGVyIC0gdGhpcy53aWR0aCAvIDI7XG4gICAgfSxcbiAgICAuLi5wYXJhbXNcbiAgfTtcbn1cbiIsImltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCIuL2FuaW1hdGlvblwiO1xuaW1wb3J0IHsgYXNzZXRMb2FkZXIgfSBmcm9tIFwiLi9hc3NldExvYWRlclwiO1xuaW1wb3J0IHsgQ2FudmFzIH0gZnJvbSBcIi4vY2FudmFzXCI7XG5pbXBvcnQgeyBDb25maWcsIGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgY29udHJvbHMsIENvbnRyb2xzIH0gZnJvbSBcIi4vY29udHJvbHNcIjtcbmltcG9ydCB7IG1lZGlhUGxheWVyLCBNZWRpYVBsYXllciB9IGZyb20gXCIuL21lZGlhUGxheWVyXCI7XG5pbXBvcnQgeyBNZXRhVGlsZSB9IGZyb20gXCIuL21ldGFUaWxlXCI7XG5pbXBvcnQgeyBNZXRhVGlsZVNwcml0ZSwgVGV4dFNwcml0ZSB9IGZyb20gXCIuL3Nwcml0ZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNjZW5lIHtcbiAgYW5pbWF0aW9ucz86IHsgW2tleTogc3RyaW5nXTogQW5pbWF0aW9uIH07XG4gIGJnQ29sb3I/OiBzdHJpbmc7XG4gIGNhbnZhcz86IENhbnZhcztcbiAgY29uZmlnPzogQ29uZmlnO1xuICBjb250cm9scz86IENvbnRyb2xzO1xuICBtZXRhVGlsZXM/OiB7IFtrZXk6IHN0cmluZ106IE1ldGFUaWxlIH07XG4gIG1lZGlhUGxheWVyPzogTWVkaWFQbGF5ZXI7XG4gIHByZWxvYWQ/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xuICBzdGF0aWNTcHJpdGVzPzogeyBba2V5OiBzdHJpbmddOiBUZXh0U3ByaXRlIHwgTWV0YVRpbGVTcHJpdGUgfTtcbiAgc3ByaXRlcz86IHsgW2tleTogc3RyaW5nXTogVGV4dFNwcml0ZSB8IE1ldGFUaWxlU3ByaXRlIH07XG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIGluaXQ6ICguLi5hcmdzOiBhbnkpID0+IHZvaWQ7XG4gIGNoYW5nZVNjZW5lPzogKG5hbWU6IHN0cmluZywgLi4uYXJnczogYW55KSA9PiB2b2lkO1xuICBkZXN0cm95PzogKCkgPT4gdm9pZDtcbiAgb25SZXNpemU/OiAoKSA9PiB2b2lkO1xuICB1cGRhdGU/OiAoY2FudmFzOiBDYW52YXMpID0+IHZvaWQ7XG59XG5cbmxldCBjdXJyZW50U2NlbmU6IFNjZW5lO1xubGV0IHNjZW5lczogeyBbbmFtZTogc3RyaW5nXTogU2NlbmUgfSA9IHt9O1xubGV0IGlzTG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG5mdW5jdGlvbiBkcmF3U3RhdGljSXRlbXMgKHNjZW5lOiBTY2VuZSk6IHZvaWQge1xuICBzY2VuZS5jYW52YXMuY2xlYXIoJ3N0YXRpYycsIHNjZW5lLmJnQ29sb3IpO1xuXG4gIE9iamVjdC52YWx1ZXMoc2NlbmUuc3RhdGljU3ByaXRlcykuZm9yRWFjaCgoc3ByaXRlOiBNZXRhVGlsZVNwcml0ZSB8IFRleHRTcHJpdGUpID0+IHtcbiAgICBzcHJpdGUuZHJhdygnc3RhdGljJywgc2NlbmUuY2FudmFzKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRyYXdEeW5hbWljSXRlbXMgKHNjZW5lOiBTY2VuZSwgY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgc2NlbmUuY2FudmFzLmNsZWFyKCdkeW5hbWljJyk7XG5cbiAgT2JqZWN0LnZhbHVlcyhzY2VuZS5hbmltYXRpb25zKS5mb3JFYWNoKChhbmltYXRpb246IEFuaW1hdGlvbikgPT4ge1xuICAgIGFuaW1hdGlvbi51cGRhdGUoJ2R5bmFtaWMnLCBjYW52YXMpO1xuICB9KTtcbiAgT2JqZWN0LnZhbHVlcyhzY2VuZS5zcHJpdGVzKS5mb3JFYWNoKChzcHJpdGU6IE1ldGFUaWxlU3ByaXRlIHwgVGV4dFNwcml0ZSkgPT4ge1xuICAgIHNwcml0ZS5kcmF3KCdkeW5hbWljJywgY2FudmFzKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNjZW5lUmVhZHkgKG1ldGFUaWxlcz86IHsgW2tleTogc3RyaW5nXTogTWV0YVRpbGUgfSwgLi4uYXJnczogYW55KTogdm9pZCB7XG4gIGN1cnJlbnRTY2VuZS5tZXRhVGlsZXMgPSBtZXRhVGlsZXM7XG5cbiAgY3VycmVudFNjZW5lLmluaXQoLi4uYXJncyk7XG4gIGRyYXdTdGF0aWNJdGVtcyhjdXJyZW50U2NlbmUpO1xuICBjdXJyZW50U2NlbmUuY2FudmFzLm9uUmVzaXplID0gKCkgPT4ge1xuICAgIGN1cnJlbnRTY2VuZS5vblJlc2l6ZSgpO1xuICAgIGRyYXdTdGF0aWNJdGVtcyhjdXJyZW50U2NlbmUpO1xuICB9XG5cbiAgaXNMb2FkaW5nID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGxvYWRTY2VuZShuYW1lOiBzdHJpbmcsIC4uLmFyZ3M6IGFueSk6IHZvaWQge1xuICBpZiAoIXNjZW5lc1tuYW1lXSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgc2NlbmUgXCIke25hbWV9XCIgZG9lcyBub3QgZXhpc3RgKTtcbiAgfVxuXG4gIGlzTG9hZGluZyA9IHRydWU7XG5cbiAgaWYgKGN1cnJlbnRTY2VuZSkge1xuICAgIGN1cnJlbnRTY2VuZS5hbmltYXRpb25zID0ge307XG4gICAgY3VycmVudFNjZW5lLm1ldGFUaWxlcyA9IHt9O1xuICAgIGN1cnJlbnRTY2VuZS5zcHJpdGVzID0ge307XG4gICAgY3VycmVudFNjZW5lLnN0YXRpY1Nwcml0ZXMgPSB7fTtcblxuICAgIGN1cnJlbnRTY2VuZS5jb250cm9scy5yZXNldCgpO1xuXG4gICAgaWYgKHR5cGVvZiBjdXJyZW50U2NlbmUuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY3VycmVudFNjZW5lLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBjdXJyZW50U2NlbmUgPSBzY2VuZXNbbmFtZV07XG4gIGN1cnJlbnRTY2VuZS5jaGFuZ2VTY2VuZSA9IGxvYWRTY2VuZTtcblxuICBpZiAoY3VycmVudFNjZW5lLnByZWxvYWQgJiYgT2JqZWN0LmtleXMoY3VycmVudFNjZW5lLnByZWxvYWQpLmxlbmd0aCkge1xuICAgIGlmIChjb25maWcuZGVidWcpIHtcbiAgICAgIGNvbnNvbGUubG9nKGB3YWl0aW5nIGZvciAke25hbWV9IHByZWxvYWQuLi5gKTtcbiAgICB9XG5cbiAgICBhc3NldExvYWRlcihjdXJyZW50U2NlbmUubWVkaWFQbGF5ZXIsIGN1cnJlbnRTY2VuZS5wcmVsb2FkLCAobWV0YVRpbGVzPzogeyBba2V5OiBzdHJpbmddOiBNZXRhVGlsZSB9KSA9PiB7XG4gICAgICBzY2VuZVJlYWR5KG1ldGFUaWxlcywgLi4uYXJncyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgc2NlbmVSZWFkeSh7fSwgLi4uYXJncyk7XG5cbiAgICBpZiAoY29uZmlnLmRlYnVnKSB7XG4gICAgICBjb25zb2xlLmxvZyhgbG9hZGVkIHNjZW5lOiAke25hbWV9YCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogXG4gKiBAcGFyYW0gc2NlbmVPYmogXG4gKiBAcGFyYW0gaW5pdGlhbFNjZW5lTmFtZSBcbiAqIEBwYXJhbSBjYW52YXMgXG4gKiBAcGFyYW0gaW5pdGlhbEFyZ3MgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0IChcbiAgc2NlbmVPYmo6IHsgW25hbWU6IHN0cmluZ106IFNjZW5lIH0sXG4gIGluaXRpYWxTY2VuZU5hbWU6IHN0cmluZyxcbiAgY2FudmFzOiBDYW52YXMsXG4gIC4uLmluaXRpYWxBcmdzOiBhbnkpOiB2b2lkIHtcbiAgZm9yIChjb25zdCBuYW1lIGluIHNjZW5lT2JqKSB7XG4gICAgbGV0IHNjZW5lOiBTY2VuZSA9IHNjZW5lT2JqW25hbWVdO1xuXG4gICAgc2NlbmUgPSB7XG4gICAgICAuLi5zY2VuZSxcbiAgICAgIGFuaW1hdGlvbnM6IHt9LFxuICAgICAgY2FudmFzOiBjYW52YXMsXG4gICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgIGNvbnRyb2xzOiBjb250cm9scyxcbiAgICAgIG1ldGFUaWxlczoge30sXG4gICAgICBtZWRpYVBsYXllcjogbWVkaWFQbGF5ZXIsXG4gICAgICBzcHJpdGVzOiB7fSxcbiAgICAgIHN0YXRpY1Nwcml0ZXM6IHt9XG4gICAgfTtcblxuICAgIHNjZW5lc1tuYW1lXSA9IHNjZW5lO1xuICB9XG5cbiAgaWYgKHNjZW5lcy5sb2FkaW5nKSB7XG4gICAgc2NlbmVzLmxvYWRpbmcuaW5pdCguLi5pbml0aWFsQXJncyk7XG4gIH1cblxuICBsb2FkU2NlbmUoaW5pdGlhbFNjZW5lTmFtZSwgLi4uaW5pdGlhbEFyZ3MpO1xufVxuXG4vKipcbiAqIFxuICogQHBhcmFtIGNhbnZhcyBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZSAoY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgaWYgKGlzTG9hZGluZykge1xuICAgIGRyYXdTdGF0aWNJdGVtcyhzY2VuZXMubG9hZGluZyk7XG4gICAgZHJhd0R5bmFtaWNJdGVtcyhzY2VuZXMubG9hZGluZywgY2FudmFzKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGN1cnJlbnRTY2VuZS51cGRhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGN1cnJlbnRTY2VuZS51cGRhdGUoY2FudmFzKTtcbiAgICB9XG5cbiAgICBjdXJyZW50U2NlbmUuY29udHJvbHMudXBkYXRlKCk7XG4gICAgZHJhd0R5bmFtaWNJdGVtcyhjdXJyZW50U2NlbmUsIGNhbnZhcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFuaW1hdGlvbiwgT25Db21wbGV0ZSB9IGZyb20gXCIuL2FuaW1hdGlvblwiO1xuaW1wb3J0IHsgQ2FudmFzLCBDYW52YXNUeXBlIH0gZnJvbSBcIi4vY2FudmFzXCI7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IGNyZWF0ZUhpdEJveCwgSGl0Qm94IH0gZnJvbSBcIi4vaGl0Qm94XCI7XG5pbXBvcnQgeyBkcmF3VGlsZSwgTWV0YVRpbGUgfSBmcm9tIFwiLi9tZXRhVGlsZVwiO1xuaW1wb3J0IHsgY3JlYXRlUmVjdGFuZ2xlLCBSZWN0YW5nbGUgfSBmcm9tIFwiLi9yZWN0YW5nbGVcIjtcbmltcG9ydCB7IGNyZWF0ZVRleHRPcHRpb25zLCBkcmF3VGV4dExpbmUsIGdldExpbmVMZW5ndGgsIGdldExpbmVzLCBUZXh0T3B0aW9ucyB9IGZyb20gXCIuL3RleHRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBUZXh0U3ByaXRlIHtcbiAgY29sb3I6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgdmlzaWJsZTogYm9vbGVhbjtcbiAgb3B0aW9uczogVGV4dE9wdGlvbnM7XG4gIHJlY3RhbmdsZTogUmVjdGFuZ2xlO1xuICBtYXhXaWR0aDogbnVtYmVyO1xuICBkcmF3OiAodHlwZTogQ2FudmFzVHlwZSwgY2FudmFzOiBDYW52YXMpID0+IHZvaWQ7XG4gIGNyZWF0ZUFuaW1hdGlvbjogKHN0YXJ0Q2hhcjogbnVtYmVyLCBlbmRDaGFyOiBudW1iZXIsIGludGVydmFsOiBudW1iZXIsIG9uQ29tcGxldGU/OiBPbkNvbXBsZXRlKSA9PiBBbmltYXRpb247XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWV0YVRpbGVTcHJpdGUge1xuICB2aXNpYmxlOiBib29sZWFuO1xuICBtZXRhVGlsZTogTWV0YVRpbGU7XG4gIHJlY3RhbmdsZTogUmVjdGFuZ2xlO1xuICBoaXRCb3g6IEhpdEJveDtcbiAgZHJhdzogKHR5cGU6IENhbnZhc1R5cGUsIGNhbnZhczogQ2FudmFzKSA9PiB2b2lkO1xuICBjcmVhdGVBbmltYXRpb246IChzdGFydENoYXI6IG51bWJlciwgZW5kQ2hhcjogbnVtYmVyLCBpbnRlcnZhbDogbnVtYmVyLCBvbkNvbXBsZXRlPzogT25Db21wbGV0ZSkgPT4gQW5pbWF0aW9uO1xufVxuXG4vKipcbiAqIFxuICogQHBhcmFtIHBhcmFtcyBcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWV0YVRpbGVTcHJpdGUgKFxuICBwYXJhbXM6IFBhcnRpYWw8UGljazxNZXRhVGlsZVNwcml0ZSwgJ21ldGFUaWxlJyB8ICd2aXNpYmxlJz4+ID0ge31cbik6IE1ldGFUaWxlU3ByaXRlIHtcbiAgY29uc3QgcmVjdGFuZ2xlID0gY3JlYXRlUmVjdGFuZ2xlKHtcbiAgICB3aWR0aDogcGFyYW1zLm1ldGFUaWxlLndpZHRoLFxuICAgIGhlaWdodDogcGFyYW1zLm1ldGFUaWxlLmhlaWdodFxuICB9KTtcbiAgY29uc3QgaGl0Qm94ID0gY3JlYXRlSGl0Qm94KHtcbiAgICByZWN0YW5nbGVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gdXBkYXRlSGl0Qm94ICh0eXBlOiBDYW52YXNUeXBlLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgIGhpdEJveC5yZWN0YW5nbGUueCA9IHJlY3RhbmdsZS54O1xuICAgIGhpdEJveC5yZWN0YW5nbGUueCA9IHJlY3RhbmdsZS54O1xuXG4gICAgaGl0Qm94LmRyYXcodHlwZSwgY2FudmFzKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBtZXRhVGlsZTogbnVsbCxcbiAgICByZWN0YW5nbGUsXG4gICAgaGl0Qm94LFxuXG4gICAgZHJhdzogZnVuY3Rpb24gKHR5cGU6IENhbnZhc1R5cGUsIGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICBpZiAoIXRoaXMudmlzaWJsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChjb25maWcuZGVidWcpIHtcbiAgICAgICAgY29uc29sZS5sb2coYG1ldGFUaWxlU3ByaXRlLmRyYXcoKWApO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGVIaXRCb3godHlwZSwgY2FudmFzKTtcbiAgICAgIGRyYXdUaWxlKHR5cGUsIGNhbnZhcywgdGhpcy5yZWN0YW5nbGUueCwgdGhpcy5yZWN0YW5nbGUueSwgdGhpcy5tZXRhVGlsZSk7XG4gICAgfSxcblxuICAgIGNyZWF0ZUFuaW1hdGlvbjogZnVuY3Rpb24gKHN0YXJ0RnJhbWU6IG51bWJlciwgZW5kRnJhbWU6IG51bWJlciwgdGlja0ludGVydmFsOiBudW1iZXIsIG9uQ29tcGxldGU/OiBPbkNvbXBsZXRlKTogQW5pbWF0aW9uIHtcbiAgICAgIGNvbnN0IHNwcml0ZSA9IHRoaXM7XG5cbiAgICAgIGxldCBjYW5BZHZhbmNlID0gdHJ1ZTtcbiAgICAgIGxldCB3aWxsSGFuZGxlQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgIGxldCBjdXJyZW50RnJhbWUgPSBzdGFydEZyYW1lO1xuICAgICAgbGV0IHRpY2tDb3VudCA9IDA7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBmdW5jdGlvbiAoKTogdm9pZCB7XG4gICAgICAgICAgY2FuQWR2YW5jZSA9IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RvcDogZnVuY3Rpb24gKGdvdG9GcmFtZT86IG51bWJlcik6IHZvaWQge1xuICAgICAgICAgIGlmIChnb3RvRnJhbWUpIHtcbiAgICAgICAgICAgIGlmIChnb3RvRnJhbWUgPiAwKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRGcmFtZSA9IGdvdG9GcmFtZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRGcmFtZSA9IGVuZEZyYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhbkFkdmFuY2UgPSBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh0eXBlOiBDYW52YXNUeXBlLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgIGlmICh0aWNrQ291bnQgPCB0aWNrSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRpY2tDb3VudCsrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY2FuQWR2YW5jZSkge1xuICAgICAgICAgICAgICBjdXJyZW50RnJhbWUgPSBNYXRoLm1pbihlbmRGcmFtZSwgKytjdXJyZW50RnJhbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAod2lsbEhhbmRsZUNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgIGlmIChvbkNvbXBsZXRlID09PSAnbG9vcCcpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50RnJhbWUgPSBzdGFydEZyYW1lO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvbkNvbXBsZXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHdpbGxIYW5kbGVDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aWNrQ291bnQgPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjYW5BZHZhbmNlICYmIGN1cnJlbnRGcmFtZSA9PT0gZW5kRnJhbWUpIHtcbiAgICAgICAgICAgIC8vIGFsbG93IHRoZSBmaW5hbCBpbnRlcnZhbCB0byBydW4gYmVmb3JlIGhhbmRsaW5nIGNvbXBsZXRlXG4gICAgICAgICAgICB3aWxsSGFuZGxlQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNwcml0ZS5tZXRhVGlsZS5mcmFtZSA9IGN1cnJlbnRGcmFtZTtcbiAgICAgICAgICBzcHJpdGUuZHJhdyh0eXBlLCBjYW52YXMpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICAuLi5wYXJhbXNcbiAgfTtcbn1cblxuLyoqXG4gKiBcbiAqIEBwYXJhbSBwYXJhbXMgXG4gKiBAcmV0dXJucyBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRleHRTcHJpdGUgKFxuICAvLyB2YWx1ZSBtdXN0IGJlIHBhc3NlZCBpbiBmb3IgaW5pdGlhbCwgYXV0b21hdGljIHJlY3RhbmdsZSBjYWxjdWxhdGlvblxuICBwYXJhbXM6IFBhcnRpYWw8UGljazxUZXh0U3ByaXRlLCAnY29sb3InIHwgJ3ZhbHVlJyB8ICdtYXhXaWR0aCcgfCAnb3B0aW9ucycgfCAndmlzaWJsZSc+PiA9IHt9XG4pOiBUZXh0U3ByaXRlIHtcbiAgY29uc3Qgd2lkdGggPSBwYXJhbXMubWF4V2lkdGggfHwgZ2V0TGluZUxlbmd0aChwYXJhbXMudmFsdWUsIHBhcmFtcy5vcHRpb25zKTtcbiAgY29uc3QgcmVjdGFuZ2xlID0gY3JlYXRlUmVjdGFuZ2xlKHsgd2lkdGggfSlcblxuICByZXR1cm4ge1xuICAgIGNvbG9yOiAnIzAwMCcsXG4gICAgdmFsdWU6ICcnLFxuICAgIG1heFdpZHRoOiBudWxsLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgb3B0aW9uczogY3JlYXRlVGV4dE9wdGlvbnMoKSxcbiAgICByZWN0YW5nbGUsXG5cbiAgICBkcmF3OiBmdW5jdGlvbiAodHlwZTogQ2FudmFzVHlwZSwgY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgIGlmICghdGhpcy52aXNpYmxlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbmZpZy5kZWJ1Zykge1xuICAgICAgICBjb25zb2xlLmxvZyhgdGV4dFNwcml0ZS5kcmF3KClgKTtcbiAgICAgIH1cblxuICAgICAgY2FudmFzLmNvbnRleHRbdHlwZV0uZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcblxuICAgICAgaWYgKHRoaXMubWF4V2lkdGgpIHtcbiAgICAgICAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gZ2V0TGluZXModGhpcy52YWx1ZSwgdGhpcy5vcHRpb25zLCB0aGlzLm1heFdpZHRoKTtcbiAgICAgICAgbGV0IHkgPSB0aGlzLnJlY3RhbmdsZS55O1xuXG4gICAgICAgIGZvciAoY29uc3QgbGluZSBvZiBsaW5lcykge1xuICAgICAgICAgIGRyYXdUZXh0TGluZSh0eXBlLCBjYW52YXMsIHRoaXMucmVjdGFuZ2xlLngsIHksIGxpbmUsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgeSArPSB0aGlzLm9wdGlvbnMubGluZUhlaWdodDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZHJhd1RleHRMaW5lKHR5cGUsIGNhbnZhcywgdGhpcy5yZWN0YW5nbGUueCwgdGhpcy5yZWN0YW5nbGUueSwgdGhpcy52YWx1ZSwgdGhpcy5vcHRpb25zKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0Q2hhciBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZW5kQ2hhciB1c2UgMS1uIGZvciBhIHNwZWNpZmljIGVuZCBjaGFyYWN0ZXI7IG9yIC0xIGZvciB0aGUgY2hhcmFjdGVyIGxlbmd0aFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbnRlcnZhbCBob3cgbWFueSB0aWNrcyBwZXIgZnJhbWVcbiAgICAgKiBAcGFyYW0ge09uQ29tcGxldGV9IG9uQ29tcGxldGUgXG4gICAgICogQHJldHVybnMge0FuaW1hdGlvbn1cbiAgICAgKi9cbiAgICBjcmVhdGVBbmltYXRpb246IGZ1bmN0aW9uIChzdGFydENoYXI6IG51bWJlciwgZW5kQ2hhcjogbnVtYmVyLCB0aWNrSW50ZXJ2YWw6IG51bWJlciwgb25Db21wbGV0ZT86IE9uQ29tcGxldGUpOiBBbmltYXRpb24ge1xuICAgICAgY29uc3Qgc3ByaXRlID0gdGhpcztcbiAgICAgIGNvbnN0IGNoYXJMZW4gPSBzcHJpdGUudmFsdWUuc3BsaXQoJycpLmxlbmd0aDtcblxuICAgICAgbGV0IHRpY2tDb3VudCA9IDA7XG4gICAgICBsZXQgZHJhd2FibGVDaGFyTGVuID0gc3RhcnRDaGFyO1xuICAgICAgbGV0IHdpbGxIYW5kbGVDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgbGV0IGNhbkFkdmFuY2UgPSB0cnVlO1xuXG4gICAgICBlbmRDaGFyID0gZW5kQ2hhciA+IDAgPyBlbmRDaGFyIDogY2hhckxlbjtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uICgpOiB2b2lkIHtcbiAgICAgICAgICBjYW5BZHZhbmNlID0gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBzdG9wOiBmdW5jdGlvbiAoZ290b0NoYXI/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICBpZiAoZ290b0NoYXIpIHtcbiAgICAgICAgICAgIGlmIChnb3RvQ2hhciA+IDApIHtcbiAgICAgICAgICAgICAgZHJhd2FibGVDaGFyTGVuID0gZ290b0NoYXI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkcmF3YWJsZUNoYXJMZW4gPSBjaGFyTGVuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhbkFkdmFuY2UgPSBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICh0eXBlOiBDYW52YXNUeXBlLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgIGlmICghc3ByaXRlLnZpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYW52YXMuY29udGV4dFt0eXBlXS5maWxsU3R5bGUgPSBzcHJpdGUuY29sb3I7XG4gICAgICBcbiAgICAgICAgICBpZiAodGlja0NvdW50IDwgdGlja0ludGVydmFsKSB7XG4gICAgICAgICAgICB0aWNrQ291bnQrKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNhbkFkdmFuY2UpIHtcbiAgICAgICAgICAgICAgZHJhd2FibGVDaGFyTGVuID0gTWF0aC5taW4oZW5kQ2hhciwgKytkcmF3YWJsZUNoYXJMZW4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAod2lsbEhhbmRsZUNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgIGlmIChvbkNvbXBsZXRlID09PSAnbG9vcCcpIHtcbiAgICAgICAgICAgICAgICBkcmF3YWJsZUNoYXJMZW4gPSBzdGFydENoYXI7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9uQ29tcGxldGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgd2lsbEhhbmRsZUNvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRpY2tDb3VudCA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNhbkFkdmFuY2UgJiYgZHJhd2FibGVDaGFyTGVuID09PSBlbmRDaGFyKSB7XG4gICAgICAgICAgICAvLyBhbGxvdyB0aGUgZmluYWwgaW50ZXJ2YWwgdG8gcnVuIGJlZm9yZSBoYW5kbGluZyBjb21wbGV0ZVxuICAgICAgICAgICAgd2lsbEhhbmRsZUNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY29uZmlnLmRlYnVnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgbWV0YVRpbGVTcHJpdGUuZHJhdygpYCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNwcml0ZS5tYXhXaWR0aCkge1xuICAgICAgICAgICAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gZ2V0TGluZXMoc3ByaXRlLnZhbHVlLCBzcHJpdGUub3B0aW9ucywgc3ByaXRlLm1heFdpZHRoKTtcbiAgICAgICAgICAgIGxldCB5ID0gc3ByaXRlLnJlY3RhbmdsZS55O1xuICAgICAgICAgICAgbGV0IGRyYXduQ2hhckxlbiA9IDA7XG4gICAgICBcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGluZSBvZiBsaW5lcykge1xuICAgICAgICAgICAgICBpZiAoZHJhd25DaGFyTGVuICsgbGluZS5sZW5ndGggPCBkcmF3YWJsZUNoYXJMZW4pIHtcbiAgICAgICAgICAgICAgICBkcmF3VGV4dExpbmUodHlwZSwgY2FudmFzLCBzcHJpdGUucmVjdGFuZ2xlLngsIHksIGxpbmUsIHNwcml0ZS5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICBkcmF3bkNoYXJMZW4gKz0gbGluZS5sZW5ndGg7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZHJhd1RleHRMaW5lKHR5cGUsIGNhbnZhcywgc3ByaXRlLnJlY3RhbmdsZS54LCB5LCBsaW5lLnNsaWNlKDAsIGRyYXdhYmxlQ2hhckxlbiAtIGRyYXduQ2hhckxlbiksIHNwcml0ZS5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICBkcmF3bkNoYXJMZW4gKz0gZHJhd2FibGVDaGFyTGVuIC0gZHJhd25DaGFyTGVuO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgeSArPSBzcHJpdGUub3B0aW9ucy5saW5lSGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkcmF3VGV4dExpbmUodHlwZSwgY2FudmFzLCBzcHJpdGUucmVjdGFuZ2xlLngsIHNwcml0ZS5yZWN0YW5nbGUueSwgc3ByaXRlLnZhbHVlLnNsaWNlKDAsIGRyYXdhYmxlQ2hhckxlbiksIHNwcml0ZS5vcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLi4ucGFyYW1zXG4gIH07XG59XG4iLCJpbXBvcnQgeyBDYW52YXMsIENhbnZhc1R5cGUgfSBmcm9tICcuL2NhbnZhcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhcmFjdGVyIHtcbiAgb2Zmc2V0WDogbnVtYmVyO1xuICBvZmZzZXRZOiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICB0aWxlOiBudW1iZXJbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb250IHtcbiAgWyBrZXk6c3RyaW5nIF06IENoYXJhY3RlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRleHRPcHRpb25zIHtcbiAgZm9udDogRm9udDtcbiAgdHJhY2tpbmc6IG51bWJlcjtcbiAgbGluZUhlaWdodDogbnVtYmVyXG59O1xuXG4vKipcbiAqIFxuICogQHJldHVybnMge1RleHRPcHRpb25zfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGV4dE9wdGlvbnMgKCk6IFRleHRPcHRpb25zIHtcbiAgcmV0dXJuIHtcbiAgICBmb250OiBudWxsLFxuICAgIHRyYWNraW5nOiAwLFxuICAgIGxpbmVIZWlnaHQ6IDBcbiAgfTtcbn1cblxuLyoqXG4gKiBcbiAqIEBwYXJhbSBmb250IFxuICogQHBhcmFtIGNoYXIgXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoYXJhY3RlckRvZXNFeGlzdCAoZm9udDogRm9udCwgY2hhcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGlmIChmb250W2NoYXJdKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEZvbnQgZG9lcyBub3QgY29udGFpbiB0aGUgY2hhcmFjdGVyIFwiJHtjaGFyfVwiYCk7XG4gIH1cbn1cblxuLyoqXG4gKiBcbiAqIEBwYXJhbSBjYW52YXMgXG4gKiBAcGFyYW0gY2hhclggXG4gKiBAcGFyYW0gY2hhclkgXG4gKiBAcGFyYW0gY2hhciBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRyYXdDaGFyYWN0ZXIgKHR5cGU6IENhbnZhc1R5cGUsIGNhbnZhczogQ2FudmFzLCBjaGFyWDogbnVtYmVyLCBjaGFyWTogbnVtYmVyLCBjaGFyOiBDaGFyYWN0ZXIpOiB2b2lkIHtcbiAgbGV0IHggPSAwO1xuICBsZXQgeSA9IDA7XG4gIGNvbnN0IHBwcCA9IGNhbnZhcy5jb25maWcucHBwO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhci50aWxlLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGNoYXIudGlsZVtpXSA9PT0gMSkge1xuICAgICAgY2FudmFzLmNvbnRleHRbdHlwZV0uZmlsbFJlY3QoXG4gICAgICAgIChjaGFyWCArIHggKyBjaGFyLm9mZnNldFgpICogcHBwLFxuICAgICAgICAoY2hhclkgKyB5ICsgY2hhci5vZmZzZXRZKSAqIHBwcCxcbiAgICAgICAgcHBwLFxuICAgICAgICBwcHBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHggPT09IGNoYXIud2lkdGggLSAxKSB7XG4gICAgICB4ID0gMDtcbiAgICAgIHkrKztcbiAgICB9IGVsc2Uge1xuICAgICAgeCsrO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFxuICogQHBhcmFtIGNhbnZhcyBcbiAqIEBwYXJhbSB0ZXh0IFxuICogQHBhcmFtIG9wdGlvbnMgXG4gKiBAcGFyYW0gY29sb3IgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkcmF3VGV4dExpbmUgKHR5cGU6IENhbnZhc1R5cGUsIGNhbnZhczogQ2FudmFzLCBsaW5lWDogbnVtYmVyLCBsaW5lWTogbnVtYmVyLCB0ZXh0OiBzdHJpbmcsIG9wdGlvbnM6IFRleHRPcHRpb25zKTogdm9pZCB7XG4gIGNvbnN0IGNoYXJhY3RlcnM6IHN0cmluZ1tdID0gdGV4dC5zcGxpdCgnJyk7XG4gIGxldCB4ID0gbGluZVg7XG4gIGxldCB5ID0gbGluZVk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyYWN0ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hhciA9IGNoYXJhY3RlcnNbaV07XG5cbiAgICBpZiAoY2hhcmFjdGVyRG9lc0V4aXN0KG9wdGlvbnMuZm9udCwgY2hhcikpIHtcbiAgICAgIGRyYXdDaGFyYWN0ZXIodHlwZSwgY2FudmFzLCB4LCB5LCBvcHRpb25zLmZvbnRbY2hhcl0pO1xuICAgICAgeCArPSBvcHRpb25zLmZvbnRbY2hhcl0ud2lkdGg7XG4gICAgfVxuXG4gICAgeCArPSBvcHRpb25zLnRyYWNraW5nO1xuICB9XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIGdldCBhcnJheSBvZiBsaW5lcyBjb25maW5lZCB0byBhIG1heCB3aWR0aFxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4V2lkdGggXG4gKiBAcmV0dXJucyB7c3RyaW5nW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMaW5lcyAodGV4dDogc3RyaW5nLCBvcHRpb25zOiBUZXh0T3B0aW9ucywgbWF4V2lkdGg6IG51bWJlcik6IHN0cmluZ1tdIHtcbiAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IHdvcmRzOiBzdHJpbmdbXSA9IHRleHQuc3BsaXQoJyAnKTtcbiAgbGV0IGxpbmUgPSAnJztcbiAgbGV0IGxpbmVXaWR0aCA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHdvcmQgPSB3b3Jkc1tpXTtcbiAgICBjb25zdCB3b3JkQ2hhcnMgPSB3b3JkLnNwbGl0KCcnKTtcblxuICAgIGxldCB3b3JkV2lkdGggPSAwO1xuXG4gICAgZm9yIChjb25zdCB3b3JkQ2hhciBvZiB3b3JkQ2hhcnMpIHtcbiAgICAgIGlmIChjaGFyYWN0ZXJEb2VzRXhpc3Qob3B0aW9ucy5mb250LCB3b3JkQ2hhcikpIHtcbiAgICAgICAgY29uc3QgY2hhciA9IG9wdGlvbnMuZm9udFt3b3JkQ2hhcl07XG4gICAgICAgIHdvcmRXaWR0aCArPSAoY2hhci53aWR0aCArIGNoYXIub2Zmc2V0WCArIG9wdGlvbnMudHJhY2tpbmcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxpbmVXaWR0aCArPSB3b3JkV2lkdGg7XG5cbiAgICBpZiAobGluZVdpZHRoIDw9IG1heFdpZHRoKSB7XG4gICAgICBsaW5lICs9IHdvcmQgKyAnICc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmVzLnB1c2gobGluZSk7XG4gICAgICBsaW5lID0gd29yZCArICcgJztcbiAgICAgIGxpbmVXaWR0aCA9IHdvcmRXaWR0aDtcbiAgICB9XG4gIH1cblxuICBsaW5lcy5wdXNoKGxpbmUpO1xuXG4gIHJldHVybiBsaW5lcztcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gZm9yIGNhbGN1bGF0aW5nIHBpeGVsIGxlbmd0aCBvZiB0ZXh0IHdpdGggbm8gbWF4V2lkdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBsaW5lIFxuICogQHBhcmFtIHt0ZXh0T3B0aW9uc30gb3B0aW9ucyBcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMaW5lTGVuZ3RoIChsaW5lOiBzdHJpbmcsIG9wdGlvbnM6IFRleHRPcHRpb25zKTogbnVtYmVyIHtcbiAgY29uc3Qgd29yZENoYXJzID0gbGluZS5zcGxpdCgnJyk7XG4gIGxldCB3aWR0aCA9IDA7XG4gIFxuICBmb3IgKGNvbnN0IHdvcmRDaGFyIG9mIHdvcmRDaGFycykge1xuICAgIGlmIChjaGFyYWN0ZXJEb2VzRXhpc3Qob3B0aW9ucy5mb250LCB3b3JkQ2hhcikpIHtcbiAgICAgIGNvbnN0IGNoYXIgPSBvcHRpb25zLmZvbnRbd29yZENoYXJdO1xuICAgICAgd2lkdGggKz0gKGNoYXIud2lkdGggKyBjaGFyLm9mZnNldFggKyBvcHRpb25zLnRyYWNraW5nKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gd2lkdGg7XG59XG4iLCJpbXBvcnQgeyBNZXRhVGlsZSB9IGZyb20gXCIuL21ldGFUaWxlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0aWxlTG9hZGVyIChcbiAgcGF0aHM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0sXG4gIG9uQ29tcGxldGU6ICh0aWxlczogeyBba2V5OiBzdHJpbmddOiBNZXRhVGlsZSB9KSA9PiBhbnlcbik6IHZvaWQge1xuICBjb25zdCB0cmFja0NvdW50ID0gT2JqZWN0LmtleXMocGF0aHMpLmxlbmd0aDtcbiAgY29uc3QgdGlsZXM6IHsgW2tleTogc3RyaW5nXTogTWV0YVRpbGUgfSA9IHt9O1xuICBsZXQgbG9hZGVkQ291bnQgPSAwO1xuXG4gIGlmICghdHJhY2tDb3VudCkge1xuICAgIG9uQ29tcGxldGUoe30pO1xuICB9XG4gIFxuICBmdW5jdGlvbiBvbkxvYWRlZCAoKTogdm9pZCB7XG4gICAgbG9hZGVkQ291bnQrKztcblxuICAgIGlmIChsb2FkZWRDb3VudCA9PT0gdHJhY2tDb3VudCkge1xuICAgICAgb25Db21wbGV0ZSh0aWxlcyk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyBzd2l0Y2ggdG8gYXN5bmMvYXdhaXQgZmV0Y2goKVxuICBmb3IgKGNvbnN0IG5hbWUgaW4gcGF0aHMpIHtcbiAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICB0aWxlc1tuYW1lXSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIG9uTG9hZGVkKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRpbGUgXCIke25hbWV9XCIgd2FzIG5vdCBmb3VuZGApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB4aHIub3BlbignR0VUJywgcGF0aHNbbmFtZV0pO1xuICAgIHhoci5zZW5kKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZUNhbnZhcyB9IGZyb20gJy4vY29tbW9uL2NhbnZhcyc7XG5pbXBvcnQgKiBhcyBsb29wIGZyb20gJy4vY29tbW9uL2xvb3AnO1xuaW1wb3J0ICogYXMgc2NlbmUgZnJvbSAnLi9jb21tb24vc2NlbmUnO1xuXG4vLyBpbXBvcnQgeyBpbnRybyB9IGZyb20gJy4vc2NlbmVzL2ludHJvL2luZGV4JztcbmltcG9ydCB7IHNwbGFzaCB9IGZyb20gJy4vc2NlbmVzL3NwbGFzaC9pbmRleCc7XG5pbXBvcnQgeyBsb2FkaW5nIH0gZnJvbSAnLi9zY2VuZXMvbG9hZGluZy9pbmRleCc7XG4vLyBpbXBvcnQgeyBwcm9sb2d1ZSB9IGZyb20gJy4vc2NlbmVzL3BsYXkvcHJvbG9ndWUvaW5kZXgnO1xuLy8gaW1wb3J0IHsgdGVzdCB9IGZyb20gJy4vc2NlbmVzL3Rlc3QvaW5kZXgnO1xuaW1wb3J0IHsgdGl0bGUgfSBmcm9tICcuL3NjZW5lcy90aXRsZS9pbmRleCc7XG5cbmNvbnN0IGNhbnZhcyA9IGNyZWF0ZUNhbnZhcygpO1xuY2FudmFzLmZpdFRvVmlld3BvcnQoKTtcbndpbmRvdy5vbnJlc2l6ZSA9ICgpID0+IGNhbnZhcy5maXRUb1ZpZXdwb3J0KCk7XG5cbnNjZW5lLmluaXQoe1xuICBsb2FkaW5nLFxuICBzcGxhc2gsXG4gIHRpdGxlXG59LCAnc3BsYXNoJywgY2FudmFzKTtcblxubG9vcC5pbml0KCgpID0+IHtcbiAgc2NlbmUudXBkYXRlKGNhbnZhcyk7XG59KTtcbiIsImltcG9ydCB7IEZvbnQsIFRleHRPcHRpb25zIH0gZnJvbSAnLi4vLi4vY29tbW9uL3RleHQnO1xuXG5pbXBvcnQgZm9udERhdGEgZnJvbSAnLi9kYXRhL25lcy1mb250Lmpzb24nO1xuXG5jb25zdCBmb250ID0gZm9udERhdGEgYXMgRm9udDtcblxuZXhwb3J0IGNvbnN0IHRleHRPcHRpb25zOiBUZXh0T3B0aW9ucyA9IHtcbiAgZm9udCxcbiAgdHJhY2tpbmc6IDEsXG4gIGxpbmVIZWlnaHQ6IDEwXG59O1xuIiwiaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NjZW5lXCI7XG5pbXBvcnQgeyBjcmVhdGVUZXh0U3ByaXRlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zcHJpdGVcIjtcblxuaW1wb3J0IHsgdGV4dE9wdGlvbnMgfSBmcm9tIFwiLi4vY29tbW9uL3RleHRPcHRpb25zXCI7XG5cbmV4cG9ydCBjb25zdCBsb2FkaW5nOiBTY2VuZSA9IHtcbiAgbmFtZTogJ2xvYWRpbmcnLFxuICBiZ0NvbG9yOiAnIzAwMCcsXG5cbiAgaW5pdDogZnVuY3Rpb24gKCk6IHZvaWQge1xuICAgIHRoaXMuc3ByaXRlcy5sb2FkaW5nVGV4dCA9IGNyZWF0ZVRleHRTcHJpdGUoe1xuICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgIG9wdGlvbnM6IHRleHRPcHRpb25zLFxuICAgICAgdmFsdWU6ICdMT0FESU5HJ1xuICAgIH0pO1xuXG4gICAgY29uc3QgZWxsaXBzaXMgPSBjcmVhdGVUZXh0U3ByaXRlKHtcbiAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICBvcHRpb25zOiB0ZXh0T3B0aW9ucyxcbiAgICAgIHZhbHVlOiAnLi4uJ1xuICAgIH0pO1xuICAgIHRoaXMuYW5pbWF0aW9ucy5lbGxpcHNpcyA9IGVsbGlwc2lzLmNyZWF0ZUFuaW1hdGlvbigwLCBudWxsLCAxNiwgJ2xvb3AnKTtcblxuICAgIGNvbnN0IHRleHRZID0gdGhpcy5jYW52YXMuY29uZmlnLmhlaWdodCAtICh0aGlzLnNwcml0ZXMubG9hZGluZ1RleHQucmVjdGFuZ2xlLmhlaWdodCArIDE2KTtcblxuICAgIHRoaXMuc3ByaXRlcy5sb2FkaW5nVGV4dC5yZWN0YW5nbGUueCA9IChcbiAgICAgIHRoaXMuY2FudmFzLmNvbmZpZy53aWR0aCAtICh0aGlzLnNwcml0ZXMubG9hZGluZ1RleHQucmVjdGFuZ2xlLndpZHRoICsgZWxsaXBzaXMucmVjdGFuZ2xlLndpZHRoICsgOClcbiAgICApO1xuICAgIHRoaXMuc3ByaXRlcy5sb2FkaW5nVGV4dC5yZWN0YW5nbGUueSA9IHRleHRZO1xuXG4gICAgZWxsaXBzaXMucmVjdGFuZ2xlLnggPSAoXG4gICAgICB0aGlzLnNwcml0ZXMubG9hZGluZ1RleHQucmVjdGFuZ2xlLnggKyB0aGlzLnNwcml0ZXMubG9hZGluZ1RleHQucmVjdGFuZ2xlLndpZHRoXG4gICAgKTtcbiAgICBlbGxpcHNpcy5yZWN0YW5nbGUueSA9IHRleHRZO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlUmVjdGFuZ2xlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9yZWN0YW5nbGVcIjtcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zY2VuZVwiO1xuaW1wb3J0IHsgY3JlYXRlTWV0YVRpbGVTcHJpdGUsIGNyZWF0ZVRleHRTcHJpdGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Nwcml0ZVwiO1xuXG5pbXBvcnQgeyB0ZXh0T3B0aW9ucyB9IGZyb20gXCIuLi9jb21tb24vdGV4dE9wdGlvbnNcIjtcblxuZnVuY3Rpb24gcGxhY2VJdGVtcyAoc2NlbmU6IFNjZW5lKTogdm9pZCB7XG4gIGNvbnN0IGNhbnZhc1JlY3RhbmdsZSA9IGNyZWF0ZVJlY3RhbmdsZSh7IHdpZHRoOiBzY2VuZS5jYW52YXMuY29uZmlnLndpZHRoIH0pO1xuXG4gIHNjZW5lLnN0YXRpY1Nwcml0ZXMuY29udHJvbHMucmVjdGFuZ2xlLmNlbnRlclgoY2FudmFzUmVjdGFuZ2xlKTtcbiAgc2NlbmUuc3RhdGljU3ByaXRlcy5jb250cm9scy5yZWN0YW5nbGUueSA9IDE4O1xuXG4gIHNjZW5lLnNwcml0ZXMuYW55S2V5LnJlY3RhbmdsZS5jZW50ZXJYKGNhbnZhc1JlY3RhbmdsZSk7XG4gIHNjZW5lLnNwcml0ZXMuYW55S2V5LnJlY3RhbmdsZS55ID0gMjA2O1xufVxuXG5jb25zdCBhbnlLZXkgPSB7XG4gIHRpY2tzUGVyQmxpbms6IDE2LFxuICB0aWNrQ291bnQ6IDAsXG5cbiAgdXBkYXRlOiBmdW5jdGlvbiAoc2NlbmU6IFNjZW5lKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGlja0NvdW50IDwgdGhpcy50aWNrc1BlckJsaW5rKSB7XG4gICAgICB0aGlzLnRpY2tDb3VudCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY2VuZS5zcHJpdGVzLmFueUtleS52aXNpYmxlID0gIXNjZW5lLnNwcml0ZXMuYW55S2V5LnZpc2libGU7XG4gICAgICB0aGlzLnRpY2tDb3VudCA9IDA7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBzcGxhc2g6IFNjZW5lID0ge1xuICBuYW1lOiAnc3BsYXNoJyxcbiAgYmdDb2xvcjogJyMwMDAnLFxuICBwcmVsb2FkOiB7XG4gICAgY29udHJvbHM6ICdzcmMvc2NlbmVzL2Fzc2V0cy9zcGxhc2gvY29udHJvbHMuanNvbidcbiAgfSxcblxuICBpbml0OiBmdW5jdGlvbiAoKTogdm9pZCB7XG4gICAgYW55S2V5LnRpY2tDb3VudCA9IDA7XG5cbiAgICB0aGlzLmNvbnRyb2xzLmtleURvd24gPSAoKSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZVNjZW5lKCd0aXRsZScpO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGljU3ByaXRlcy5jb250cm9scyA9IGNyZWF0ZU1ldGFUaWxlU3ByaXRlKHtcbiAgICAgIG1ldGFUaWxlOiB0aGlzLm1ldGFUaWxlcy5jb250cm9sc1xuICAgIH0pO1xuXG4gICAgdGhpcy5zcHJpdGVzLmFueUtleSA9IGNyZWF0ZVRleHRTcHJpdGUoe1xuICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgIG9wdGlvbnM6IHRleHRPcHRpb25zLFxuICAgICAgdmFsdWU6ICdQUkVTUyBBTlkgS0VZIFRPIENPTlRJTlVFJ1xuICAgIH0pO1xuXG4gICAgcGxhY2VJdGVtcyh0aGlzKTtcbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uICgpOiB2b2lkIHtcbiAgICBhbnlLZXkudXBkYXRlKHRoaXMpO1xuICB9LFxuXG4gIG9uUmVzaXplOiBmdW5jdGlvbiAoKTogdm9pZCB7XG4gICAgcGxhY2VJdGVtcyh0aGlzKTtcbiAgfVxufTtcbiIsImltcG9ydCB7IG1lZGlhUGxheWVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tZWRpYVBsYXllclwiO1xuaW1wb3J0IHsgY3JlYXRlUmVjdGFuZ2xlLCBSZWN0YW5nbGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3JlY3RhbmdsZVwiO1xuaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NjZW5lXCI7XG5pbXBvcnQgeyBjcmVhdGVNZXRhVGlsZVNwcml0ZSwgY3JlYXRlVGV4dFNwcml0ZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc3ByaXRlXCI7XG5cbmltcG9ydCB7IHRleHRPcHRpb25zIH0gZnJvbSBcIi4uL2NvbW1vbi90ZXh0T3B0aW9uc1wiO1xuXG5mdW5jdGlvbiBwbGFjZVN0YXRpY0l0ZW1zIChzY2VuZTogU2NlbmUpOiB2b2lkIHtcbiAgY29uc3QgY2FudmFzUmVjdGFuZ2xlID0gY3JlYXRlUmVjdGFuZ2xlKHtcbiAgICB3aWR0aDogc2NlbmUuY2FudmFzLmNvbmZpZy53aWR0aCxcbiAgICBoZWlnaHQ6IHNjZW5lLmNhbnZhcy5jb25maWcuaGVpZ2h0XG4gIH0pO1xuXG4gIHNjZW5lLnN0YXRpY1Nwcml0ZXMudGl0bGVUZXh0LnJlY3RhbmdsZS5jZW50ZXJYKGNhbnZhc1JlY3RhbmdsZSk7XG4gIHNjZW5lLnN0YXRpY1Nwcml0ZXMuc3RhcnRHYW1lLnJlY3RhbmdsZS5jZW50ZXJYKGNhbnZhc1JlY3RhbmdsZSk7XG4gIHNjZW5lLnN0YXRpY1Nwcml0ZXMuYWJvdXQucmVjdGFuZ2xlLmNlbnRlclgoY2FudmFzUmVjdGFuZ2xlKTtcbiAgc2NlbmUuc3RhdGljU3ByaXRlcy5jb3B5cmlnaHQucmVjdGFuZ2xlLmNlbnRlclgoY2FudmFzUmVjdGFuZ2xlKTtcblxuICBzY2VuZS5zdGF0aWNTcHJpdGVzLnRpdGxlVGV4dC5yZWN0YW5nbGUueSA9IDE4O1xuICBzY2VuZS5zdGF0aWNTcHJpdGVzLnN0YXJ0R2FtZS5yZWN0YW5nbGUueSA9IDE1NDtcbiAgc2NlbmUuc3RhdGljU3ByaXRlcy5hYm91dC5yZWN0YW5nbGUueSA9IHNjZW5lLnN0YXRpY1Nwcml0ZXMuc3RhcnRHYW1lLnJlY3RhbmdsZS55ICsgMTk7XG4gIHNjZW5lLnN0YXRpY1Nwcml0ZXMuY29weXJpZ2h0LnJlY3RhbmdsZS55ID0gY2FudmFzUmVjdGFuZ2xlLmhlaWdodCAtIDE2O1xufVxuXG5jb25zdCBzZWxlY3Rpb24gPSB7XG4gIGluZGV4OiAwLFxuICBpdGVtczogW1xuICAgICdzdGFydEdhbWUnLFxuICAgICdhYm91dCdcbiAgXVxufTtcblxuY29uc3QgY3Vyc29yID0ge1xuICBvZmZzZXRYOiA3LFxuICBvZmZzZXRZOiAxLFxuICB0aWNrc1BlckJsaW5rOiAxNixcbiAgdGlja0NvdW50OiAwLFxuXG4gIHVwZGF0ZTogZnVuY3Rpb24gKHNjZW5lOiBTY2VuZSwgc2VsZWN0ZWRSZWN0YW5nbGU6IFJlY3RhbmdsZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRpY2tDb3VudCA8IHRoaXMudGlja3NQZXJCbGluaykge1xuICAgICAgdGhpcy50aWNrQ291bnQrKztcbiAgICB9IGVsc2Uge1xuICAgICAgc2NlbmUuc3ByaXRlcy5jdXJzb3IudmlzaWJsZSA9ICFzY2VuZS5zcHJpdGVzLmN1cnNvci52aXNpYmxlO1xuICAgICAgdGhpcy50aWNrQ291bnQgPSAwO1xuICAgIH1cblxuICAgIHNjZW5lLnNwcml0ZXMuY3Vyc29yLnJlY3RhbmdsZS54ID0gc2VsZWN0ZWRSZWN0YW5nbGUueCAtIHNjZW5lLnNwcml0ZXMuY3Vyc29yLnJlY3RhbmdsZS53aWR0aCAtIHRoaXMub2Zmc2V0WFxuICAgIHNjZW5lLnNwcml0ZXMuY3Vyc29yLnJlY3RhbmdsZS55ID0gc2VsZWN0ZWRSZWN0YW5nbGUueSAtIHRoaXMub2Zmc2V0WTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHRpdGxlOiBTY2VuZSA9IHtcbiAgbmFtZTogJ3RpdGxlJyxcbiAgYmdDb2xvcjogJyMwMDAnLFxuICBwcmVsb2FkOiB7XG4gICAgJ3RoZW1lJzogJ3NyYy9zY2VuZXMvYXNzZXRzL3RpdGxlL3RoZW1lLm1wMycsXG4gICAgJ3NlbGVjdCc6ICdzcmMvc2NlbmVzL2Fzc2V0cy90aXRsZS9zZWxlY3QubXAzJyxcbiAgICAndGl0bGVUZXh0JzogJ3NyYy9zY2VuZXMvYXNzZXRzL3RpdGxlL3RpdGxlLXRleHQuanNvbicsXG4gICAgJ2N1cnNvcic6ICdzcmMvc2NlbmVzL2Fzc2V0cy90aXRsZS9jdXJzb3IuanNvbidcbiAgfSxcblxuICBpbml0OiBmdW5jdGlvbiAoKTogdm9pZCB7XG4gICAgc2VsZWN0aW9uLmluZGV4ID0gMDtcbiAgICBjdXJzb3IudGlja0NvdW50ID0gMDtcblxuICAgIHRoaXMuc3RhdGljU3ByaXRlcy50aXRsZVRleHQgPSBjcmVhdGVNZXRhVGlsZVNwcml0ZSh7XG4gICAgICBtZXRhVGlsZTogdGhpcy5tZXRhVGlsZXMudGl0bGVUZXh0XG4gICAgfSk7XG4gICAgdGhpcy5zdGF0aWNTcHJpdGVzLnN0YXJ0R2FtZSA9IGNyZWF0ZVRleHRTcHJpdGUoe1xuICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgIG9wdGlvbnM6IHRleHRPcHRpb25zLFxuICAgICAgdmFsdWU6ICdTVEFSVCBHQU1FJ1xuICAgIH0pO1xuICAgIHRoaXMuc3RhdGljU3ByaXRlcy5hYm91dCA9IGNyZWF0ZVRleHRTcHJpdGUoe1xuICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgIG9wdGlvbnM6IHRleHRPcHRpb25zLFxuICAgICAgdmFsdWU6ICdBQk9VVCdcbiAgICB9KTtcbiAgICB0aGlzLnN0YXRpY1Nwcml0ZXMuY29weXJpZ2h0ID0gY3JlYXRlVGV4dFNwcml0ZSh7XG4gICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgb3B0aW9uczogdGV4dE9wdGlvbnMsXG4gICAgICB2YWx1ZTogJzIwMjEgQ09TTUlDIFBPTFlHT04nXG4gICAgfSk7XG5cbiAgICBwbGFjZVN0YXRpY0l0ZW1zKHRoaXMpO1xuXG4gICAgdGhpcy5zcHJpdGVzLmN1cnNvciA9IGNyZWF0ZU1ldGFUaWxlU3ByaXRlKHtcbiAgICAgIG1ldGFUaWxlOiB0aGlzLm1ldGFUaWxlcy5jdXJzb3JcbiAgICB9KTtcblxuICAgIGNvbnN0IGhhbmRsZVNlbGVjdGlvbiA9ICgpOiB2b2lkID0+IHtcbiAgICAgIG1lZGlhUGxheWVyLnBhdXNlQWxsKCk7XG4gICAgICBtZWRpYVBsYXllci5wbGF5KCdzZWxlY3QnLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHNlbGVjdGlvbi5pbmRleCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2hhbmdlU2NlbmUoJ2ludHJvJykpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jaGFuZ2VTY2VuZSgnYWJvdXQnKSk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRyb2xzLnVwUHJlc3MgPSAoKSA9PiB7XG4gICAgICBpZiAoc2VsZWN0aW9uLmluZGV4ID4gMCkge1xuICAgICAgICBzZWxlY3Rpb24uaW5kZXgtLTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuY29udHJvbHMuZG93blByZXNzID0gKCkgPT4ge1xuICAgICAgaWYgKHNlbGVjdGlvbi5pbmRleCA8IHNlbGVjdGlvbi5pdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHNlbGVjdGlvbi5pbmRleCsrO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5jb250cm9scy5hUHJlc3MgPSAoKSA9PiB7XG4gICAgICBoYW5kbGVTZWxlY3Rpb24oKTtcbiAgICB9O1xuICAgIHRoaXMuY29udHJvbHMuc3RhcnRQcmVzcyA9ICgpID0+IHtcbiAgICAgIGhhbmRsZVNlbGVjdGlvbigpO1xuICAgIH07XG5cbiAgICBtZWRpYVBsYXllci5wbGF5KCd0aGVtZScsIHRydWUpO1xuICB9LFxuXG4gIHVwZGF0ZTogZnVuY3Rpb24gKCk6IHZvaWQge1xuICAgIGN1cnNvci51cGRhdGUodGhpcywgdGhpcy5zdGF0aWNTcHJpdGVzW3NlbGVjdGlvbi5pdGVtc1tzZWxlY3Rpb24uaW5kZXhdXS5yZWN0YW5nbGUpO1xuICB9LFxuXG4gIG9uUmVzaXplOiBmdW5jdGlvbiAoKTogdm9pZCB7XG4gICAgcGxhY2VTdGF0aWNJdGVtcyh0aGlzKTtcbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=