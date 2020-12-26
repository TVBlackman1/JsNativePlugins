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
    return getDecoratedFunction(funcName);
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
  addMathFunction(quad);
  addMathFunction(easyEasy);
  addMathFunction(linear);
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

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _notifyOnScrollEnd = new WeakSet();

var ScrollAnimator = /*#__PURE__*/function () {
  /**
   *
   * @param $scrollableElement - DOM object like div, ul, etc.
   * @param {Object} settings - settings of animator.
   */
  function ScrollAnimator($scrollableElement) {
    var _settings$animationNa, _settings$animationDu;

    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ScrollAnimator);

    _notifyOnScrollEnd.add(this);

    console.log("Created scroll animator");
    this.$scrollableElement = $scrollableElement;
    this.animatedInMoment = false;
    this.funcsOnScrollEnd = [];
    this.subscribeOnScrollEnd(function () {
      console.log("end");
    });
    var animationName = (_settings$animationNa = settings.animationName) !== null && _settings$animationNa !== void 0 ? _settings$animationNa : "linear";
    this.animationFunction = (0, _Animator.Animator)().getAnimationFunction(animationName);
    this.animationDuration = (_settings$animationDu = settings.animationDuration) !== null && _settings$animationDu !== void 0 ? _settings$animationDu : 600;
  }

  _createClass(ScrollAnimator, [{
    key: "subscribeOnScrollEnd",
    value: function subscribeOnScrollEnd(func) {
      this.funcsOnScrollEnd.push(func);
    }
  }, {
    key: "scrollShift",
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
        var piece = currentOffset / difference;
        _this.$scrollableElement.scrollLeft = start + _this.animationFunction(piece) * difference;
      }, intervalDelay);
      setTimeout(function () {
        clearInterval(interval);
        _this.$scrollableElement.scrollLeft = end;
        _this.animatedInMoment = false;

        _classPrivateMethodGet(_this, _notifyOnScrollEnd, _notifyOnScrollEnd2).call(_this);
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

var _notifyOnScrollEnd2 = function _notifyOnScrollEnd2() {
  this.funcsOnScrollEnd.forEach(function (func) {
    func();
  });
};
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

var _setup = new WeakSet();

var Slider = /*#__PURE__*/function () {
  /**
   *
   * @param {object} settings
   */
  function Slider() {
    var _settings$numberOfSta;

    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Slider);

    _setup.add(this);

    this.$el = document.querySelector(settings.selector);
    this.$content = this.$el.querySelector('.slider-content');
    this.$contentElems = this.$content.querySelectorAll('.slider-content-li');
    this.scrollAnimator = new ScrollAnimator(this.$content, {
      animationName: settings.animationName,
      animationDuration: settings.animationDuration
    });
    this.scrollImmediately = new ScrollAnimator(this.$content, {
      animationDuration: 0
    });
    this.index = 0;
    this.index = (_settings$numberOfSta = settings.numberOfStartElement) !== null && _settings$numberOfSta !== void 0 ? _settings$numberOfSta : 0;

    _classPrivateMethodGet(this, _setup, _setup2).call(this);
  }

  _createClass(Slider, [{
    key: "addScrollHandler",
    value: function addScrollHandler() {
      var _this = this;

      this.$content.addEventListener('mousewheel', function (event) {
        // 1 - next, -1 - previous
        var shiftContentCoefficient = event.wheelDelta < 0 ? 1 : -1;

        _this.goToContentWithIndex(_this.index + shiftContentCoefficient);

        return false;
      });
    }
  }, {
    key: "goToContentWithIndex",

    /**
     * go to element in <li> of <ul> in content.
     * @param {number} newIndex - index of element. Starts with 0
     */
    value: function goToContentWithIndex(newIndex) {
      if (newIndex < 0 || newIndex >= this.$contentElems.length) return;
      if (this.scrollAnimator.animated) return;
      var currentContentElement = this.$contentElems[this.index];
      var leftOfCurrent = currentContentElement.getBoundingClientRect().left;
      var newContentElement = this.$contentElems[newIndex];
      var leftOfNewElement = newContentElement.getBoundingClientRect().left;
      var xShift = leftOfNewElement - leftOfCurrent;
      this.scrollAnimator.scrollShift(xShift);
      this.index = newIndex;
    }
  }]);

  return Slider;
}();

exports.Slider = Slider;

var _setup2 = function _setup2() {
  this.addScrollHandler();
};
},{"./ScrollAnimator":"slider/ScrollAnimator.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _Slider = require("./slider/Slider");

var slider = new _Slider.Slider({
  selector: '.slider',
  numberOfStartElement: 0,
  animationName: 'easy-easy',
  animationDuration: 200
});
window.s = slider;
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62051" + '/');

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