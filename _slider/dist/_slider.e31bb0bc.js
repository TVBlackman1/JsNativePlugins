// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"slider/Animator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Animator = void 0;

var _this = void 0;

/**
 *
 * Animator has following animation names:
 * -> easy-easy
 * -> quad
 * -> linear
 * -> mikhail-func
 * -> daniil-func
 * -> paral-func
 * -> first-func
 * -> lags-func
 * -> andrey-func
 * -> kiril-func
 *
 * @returns {{getAnimationFunction: (function(*=): function(*): *)}}
 * @constructor
 */
var Animator = function Animator() {
  /*
    after it will be: {
      func-name-1: {
          func: (x) => (x**2)
          maxFuncX: any number
      },
      func-name-2: {
          func: (x) => (x**3)
          maxFuncX: any number
      },
      ....
      etc
  }
    whats mean maxFuncX and func -> see comments of object structure below.
     */
  var mathFunctionObjects = {};

  function addMathFunction(mathFunctionObject) {
    var func = mathFunctionObject.func;
    var maxFuncX = mathFunctionObject.maxFuncX;
    mathFunctionObjects[mathFunctionObject.name] = {
      func: func,
      maxFuncX: maxFuncX
    };
  }

  function getAnimationFunction(funcName) {
    try {
      return getDecoratedFunction(funcName);
    } catch (e) {
      // name not exist in animator
      console.log("Not correct name of animation.");
      return null;
    }
  }

  getAnimationFunction = getAnimationFunction.bind(_this);

  function getDecoratedFunction(funcName) {
    var currentFunctionObject = mathFunctionObjects[funcName];
    var func = currentFunctionObject.func;
    var maxFuncX = currentFunctionObject.maxFuncX;
    var maxFuncY = func(maxFuncX);
    return function (piece) {
      // piece - values from 0 to 1
      var x = piece * maxFuncX;
      return func(x) / maxFuncY; // values from 0 to 1
    };
  }
  /*
    Objects of math functions have structure:
   -> name - string name, unique id for every function. The can get function by its name.
   -> func - math function of 1 argument 'x'. It returns 'y'. Function must follow the next rule:
             f(x2) > f(0), x2 - rightmost value of the considered scope of the given function definition.
   -> maxFuncX - the rightmost value of the considered scope of the given function definition.
     */


  var easyEasy = {
    name: 'easy-easy',
    func: function func(x) {
      return 1 / (1 + Math.pow(2.7, 5 - x));
    },
    maxFuncX: 10
  };
  var quad = {
    name: 'quad',
    func: function func(x) {
      return Math.pow(x, 5);
    },
    maxFuncX: 15
  };
  var linear = {
    name: 'linear',
    func: function func(x) {
      return x;
    },
    maxFuncX: 15
  };
  var mikhailFunc = {
    name: 'mikhail-func',
    func: function func(x) {
      return Math.atan(x - 2) * Math.pow(x, 2) / 3 * 4;
    },
    maxFuncX: 4
  };
  var daniilFunc = {
    name: 'daniil-func',
    func: function func(x) {
      x -= 20;
      return (2.7 + Math.sin(2.7 * x) / x) * Math.pow(2.7, 2) * (2.7 / (2.7 + Math.pow(2.7, -x * 2.7)));
    },
    maxFuncX: 35
  };
  var paral = {
    name: 'paral-func',
    func: function func(x) {
      return Math.sin(2.7 * x) * x + x;
    },
    maxFuncX: 5
  };
  var first = {
    name: 'first-func',
    func: function func(x) {
      x -= 4;
      return Math.pow(1 + 1 / Math.pow(2.17, x), Math.pow(2.17, x)) - 1;
    },
    maxFuncX: 8
  };
  var lags = {
    name: 'lags-func',
    func: function func(x) {
      var a = Math.sin(x / 12) + 0.99;
      var b = 12 * a / Math.abs(a);
      b += 20 * Math.log(x) + Math.sign(Math.sin(x));
      return b;
    },
    maxFuncX: 300
  };
  var andrey = {
    name: 'andrey-func',
    func: function func(x) {
      x += 0.1;
      return 1 / x / Math.cos(Math.round(x)) + Math.sqrt(Math.abs(x));
    },
    maxFuncX: 100
  };
  var kiril = {
    name: 'kiril-func',
    func: function func(x) {
      return -(Math.cos(Math.PI * x) - 1) / 2;
    },
    maxFuncX: 1
  };
  addMathFunction(quad);
  addMathFunction(easyEasy);
  addMathFunction(linear);
  addMathFunction(mikhailFunc);
  addMathFunction(daniilFunc);
  addMathFunction(paral);
  addMathFunction(first);
  addMathFunction(lags);
  addMathFunction(andrey);
  addMathFunction(kiril);
  return {
    getAnimationFunction: getAnimationFunction,
    addMathFunction: addMathFunction
  };
};

exports.Animator = Animator;
},{}],"slider/ScrollAnimator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollAnimator = void 0;

var _Animator = require("./Animator");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultAnimationName = 'linear';
var defaultAnimationDuration = 600;

var ScrollAnimator = /*#__PURE__*/function () {
  /**
   *
   * @param $scrollableElement - DOM object like div, ul, etc.
   * @param {Object} settings - settings of animator.
   * @param {string=} settings.animationName - animation name
   * @param {number=} settings.animationDuration - animation duration
   * @param {function} settings.onEnd - function will be calling in end of animation.
   */
  function ScrollAnimator($scrollableElement) {
    var _settings$onEnd, _settings$animationNa, _settings$animationDu;

    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ScrollAnimator);

    this.$scrollableElement = $scrollableElement;
    this.animatedInMoment = false;
    this.onAnimationEnd = (_settings$onEnd = settings.onEnd) !== null && _settings$onEnd !== void 0 ? _settings$onEnd : function () {};
    var animationName = (_settings$animationNa = settings.animationName) !== null && _settings$animationNa !== void 0 ? _settings$animationNa : defaultAnimationName;
    this.animationFunction = (0, _Animator.Animator)().getAnimationFunction(animationName);

    if (!this.animationFunction) {
      // name not exist in animator
      this.animationFunction = (0, _Animator.Animator)().getAnimationFunction(defaultAnimationName);
    }

    this.animationDuration = (_settings$animationDu = settings.animationDuration) !== null && _settings$animationDu !== void 0 ? _settings$animationDu : defaultAnimationDuration;
  }

  _createClass(ScrollAnimator, [{
    key: "scrollShift",

    /**
     *
     * @param difference
     */
    value: function scrollShift(difference) {
      if (this.animated || difference === 0) return;
      this.animateShift(difference);
    }
  }, {
    key: "animateShift",
    value: function animateShift(difference) {
      var _this = this;

      var duration = this.animationDuration;
      var intervalDelay = 10;
      var times = duration / intervalDelay;
      this.animatedInMoment = true;
      var start = this.$scrollableElement.scrollLeft;
      var end = start + difference;
      var linearDx = difference / times;
      var currentOffset = 0;
      var interval = setInterval(function () {
        currentOffset += linearDx;
        var piece = currentOffset / difference; // values from 0 to 1

        var relativePosCoefficient = _this.animationFunction(piece); // values from 0 to 1


        _this.$scrollableElement.scrollLeft = start + relativePosCoefficient * difference;
      }, intervalDelay);
      setTimeout(function () {
        clearInterval(interval);
        _this.$scrollableElement.scrollLeft = end;

        _this.onAnimationEnd();

        _this.animatedInMoment = false;
      }, duration);
    }
  }, {
    key: "animated",
    get: function get() {
      return this.animatedInMoment;
    }
  }]);

  return ScrollAnimator;
}();

exports.ScrollAnimator = ScrollAnimator;
},{"./Animator":"slider/Animator.js"}],"slider/Slider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _require = require('./ScrollAnimator'),
    ScrollAnimator = _require.ScrollAnimator;

var defaultAutoScrollDelay = 2400;
var defaultAutoScroll = false;

var _addScrollHandler = new WeakSet();

var _addClickHandler = new WeakSet();

var _addAutoScroll = new WeakSet();

var _setup = new WeakSet();

var _notifyOnScrollEnd = new WeakSet();

var _updateNavigationCurrentView = new WeakSet();

var _changeCurrentContent = new WeakSet();

var Slider = /*#__PURE__*/function () {
  /**
   *
   * @param {object} settings
   * settings can have following parameters:
   * -> {String} selector - required parameter. It is html selector for slider.
   * -> {String} animationName - name of animations. List of available in comments at Animator.js
   * -> {number} animationDuration - duration of animation. Gets time in ms.
   * -> {boolean} autoScroll - true, if auto scroll is on.
   * -> {number} autoScrollDelay - delay before auto scroll.
   */
  function Slider() {
    var _settings$autoScrollD, _settings$autoScroll;

    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Slider);

    _changeCurrentContent.add(this);

    _updateNavigationCurrentView.add(this);

    _notifyOnScrollEnd.add(this);

    _setup.add(this);

    _addAutoScroll.add(this);

    _addClickHandler.add(this);

    _addScrollHandler.add(this);

    this.$el = document.querySelector(settings.selector);
    this.$content = this.$el.querySelector('.slider-content');
    this.$contentElems = this.$content.querySelectorAll('.slider-content-li');
    this.$nav = this.$el.querySelector('.slider-nav');
    this.$navElems = this.$nav.querySelectorAll('.slider-nav-elem');
    this.scrollAnimator = new ScrollAnimator(this.$content, {
      animationName: settings.animationName,
      animationDuration: settings.animationDuration,
      onEnd: _classPrivateMethodGet(this, _notifyOnScrollEnd, _notifyOnScrollEnd2).bind(this)
    });
    this.scrollImmediately = new ScrollAnimator(this.$content, {
      animationDuration: 0
    });
    this.autoScrollDelay = (_settings$autoScrollD = settings.autoScrollDelay) !== null && _settings$autoScrollD !== void 0 ? _settings$autoScrollD : defaultAutoScrollDelay;
    this.autoScroll = (_settings$autoScroll = settings.autoScroll) !== null && _settings$autoScroll !== void 0 ? _settings$autoScroll : defaultAutoScroll;
    this.index = 0;
    this.currentContent = this.$contentElems[this.index];
    this.funcsOnScrollEnd = [];

    _classPrivateMethodGet(this, _setup, _setup2).call(this);
  }

  _createClass(Slider, [{
    key: "subscribeOnScrollEnd",

    /**
     * Called on end of scroll
     *
     * @param {function(index: number)} func
     */
    value: function subscribeOnScrollEnd(func) {
      this.funcsOnScrollEnd.push(func);
    }
  }, {
    key: "forcedNotify",
    value: function forcedNotify() {
      _classPrivateMethodGet(this, _notifyOnScrollEnd, _notifyOnScrollEnd2).call(this);
    }
    /**
     * slider will shows element <li> of <ul> with new index.
     *
     * @param {number} newIndex - index of element. Starts with 0.
     */

  }, {
    key: "goToContentWithIndex",
    value: function goToContentWithIndex(newIndex) {
      if (newIndex < 0) {
        newIndex = this.$contentElems.length - 1;
      } else if (newIndex >= this.$contentElems.length) {
        newIndex = 0;
      }

      if (this.scrollAnimator.animated) return;
      var currentContentElement = this.$contentElems[this.index];
      var leftOfCurrent = currentContentElement.getBoundingClientRect().left;
      var newContentElement = this.$contentElems[newIndex];
      var leftOfNewElement = newContentElement.getBoundingClientRect().left;
      var xShift = leftOfNewElement - leftOfCurrent;

      _classPrivateMethodGet(this, _changeCurrentContent, _changeCurrentContent2).call(this, newIndex); // change index before play animation because functions, that invoke
      // in the end of animation used newIndex. Maybe can be problems if animation delay is 0.


      this.scrollAnimator.scrollShift(xShift);
    }
  }]);

  return Slider;
}();

exports.Slider = Slider;

var _addScrollHandler2 = function _addScrollHandler2() {
  var _this = this;

  this.$content.addEventListener('mousewheel', function (event) {
    // 1 - next, -1 - previous
    var shiftContentCoefficient = event.wheelDelta < 0 ? 1 : -1;

    _this.goToContentWithIndex(_this.index + shiftContentCoefficient);

    return false;
  });
};

var _addClickHandler2 = function _addClickHandler2() {
  var _this2 = this;

  this.$navElems.forEach(function ($el, index) {
    $el.addEventListener('click', function (event) {
      _this2.goToContentWithIndex(index);

      return false;
    });
  });
};

var _addAutoScroll2 = function _addAutoScroll2() {
  var _this3 = this;

  this.autoScrollInterval = setInterval(function () {
    _this3.goToContentWithIndex(_this3.index + 1);
  }, this.autoScrollDelay);
};

var _setup2 = function _setup2() {
  // this.goToContentWithIndex = this.goToContentWithIndex.bind(this)
  _classPrivateMethodGet(this, _addScrollHandler, _addScrollHandler2).call(this);

  _classPrivateMethodGet(this, _addClickHandler, _addClickHandler2).call(this);

  if (this.autoScroll) {
    _classPrivateMethodGet(this, _addAutoScroll, _addAutoScroll2).call(this);
  }
};

var _notifyOnScrollEnd2 = function _notifyOnScrollEnd2() {
  var _this4 = this;

  this.funcsOnScrollEnd.forEach(function (func) {
    func(_this4.index);
  });
};

var _updateNavigationCurrentView2 = function _updateNavigationCurrentView2() {
  this.$navElems.forEach(function ($el) {
    $el.classList.remove('active');
  });
  this.$navElems[this.index].classList.add('active');
};

var _changeCurrentContent2 = function _changeCurrentContent2(newIndex) {
  this.index = newIndex;
  this.currentContent = this.$contentElems[this.index];

  _classPrivateMethodGet(this, _updateNavigationCurrentView, _updateNavigationCurrentView2).call(this);
};
},{"./ScrollAnimator":"slider/ScrollAnimator.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _Slider = require("./slider/Slider");

var slider = new _Slider.Slider({
  selector: '.slider',
  animationName: 'easy-easy',
  animationDuration: 300,
  autoScroll: true,
  autoScrollDelay: 2400
});
window.s = slider;
var $effected = document.querySelector('.effected');
slider.subscribeOnScrollEnd(function (index) {
  $effected.style.backgroundImage = slider.$contentElems[slider.index].style.backgroundImage;
});
slider.forcedNotify();
},{"./slider/Slider":"slider/Slider.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63753" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/_slider.e31bb0bc.js.map