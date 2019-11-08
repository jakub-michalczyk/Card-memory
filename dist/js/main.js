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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\nmodule.exports = _defineProperty;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/defineProperty.js?");

/***/ }),

/***/ "./node_modules/element-remove/index.js":
/*!**********************************************!*\
  !*** ./node_modules/element-remove/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function (arr) {\n  arr.forEach(function (item) {\n    if (item.hasOwnProperty('remove')) {\n      return;\n    }\n    Object.defineProperty(item, 'remove', {\n      configurable: true,\n      enumerable: true,\n      writable: true,\n      value: function remove() {\n        this.parentNode && this.parentNode.removeChild(this);\n      }\n    });\n  });\n})([Element.prototype, CharacterData.prototype, DocumentType.prototype].filter(Boolean));\n\n\n//# sourceURL=webpack:///./node_modules/element-remove/index.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);\n\nvar game = {\n  playerName: '',\n  difficulty: 10,\n  attempts: 0\n};\nvar CHOOSED_DIFF;\nvar viewingCard = 0;\nvar generatedCards = new Set();\nvar combination = new Set();\nvar cardRepresentation = [];\nvar timeInterval;\nvar menu;\nvar menuHide = 0;\n\n(function init() {\n  if (localStorage.getItem('record') !== null) {\n    records = JSON.parse(localStorage.getItem('record'));\n  }\n\n  document.querySelector('button').addEventListener('click', chooseDifficulty);\n})();\n\nfunction chooseDifficulty() {\n  CHOOSED_DIFF = document.querySelector('select').value; //CHANGE DIFFICULTY\n\n  if (CHOOSED_DIFF === 'easy') {\n    game.difficulty = 10;\n  } else if (CHOOSED_DIFF === 'medium') {\n    game.difficulty = 20;\n  } else {\n    game.difficulty = 30;\n  }\n\n  if (document.querySelector('#name').value === '') {\n    game.playerName = 'Unnamed';\n  } else {\n    game.playerName = document.querySelector('#name').value;\n  }\n\n  return renderBoard();\n}\n\nfunction renderBoard(diff) {\n  var container = document.createElement('div');\n  var hamburger = document.createElement('div');\n  container.id = 'container';\n  hamburger.id = 'hamburger';\n  hamburger.dataset.mode = 'show';\n  hamburger.innerHTML = \"<div class=\\\"line\\\"></div>\\n         <div class=\\\"line\\\"></div>\\n         <div class=\\\"line\\\"></div>\";\n  document.body.innerHTML = '';\n  document.body.append(container, hamburger);\n\n  for (var i = 0; i < game.difficulty; i++) {\n    container.innerHTML += \"<div>\\n            <img alt=\\\"Card\\\" data-id=\\\"\".concat(i, \"\\\" class=\\\"card\\\" src='../img/back.jpg'>\\n        </div>\");\n  }\n\n  createTools();\n  setTimer();\n  fixImageSize();\n  createCardSets(generatedCards, game.difficulty / 2, 30);\n  createCardSets(combination, game.difficulty);\n  generateCards();\n  document.querySelector('#hamburger').addEventListener('click', menuToggle);\n  document.querySelectorAll('.card').forEach(function (card) {\n    return card.addEventListener('click', viewCard);\n  });\n}\n\nfunction createTools() {\n  var tools = document.createElement('div');\n  var pointsBox = document.createElement('div');\n  var timer = document.createElement('div');\n  tools.id = 'tools';\n  tools.className = 'hide';\n  timer.id = 'timer';\n  pointsBox.id = 'points';\n  pointsBox.innerHTML = 'Clicks: <span id=\"actualPoints\">0</span>';\n  document.body.appendChild(tools);\n  tools.append(timer, pointsBox);\n}\n\nfunction fixImageSize() {\n  if (game.difficulty === 10) {\n    document.querySelectorAll('.card').forEach(function (card) {\n      return card.style.width = '100%';\n    });\n  } else if (game.difficulty === 20) {\n    document.querySelectorAll('.card').forEach(function (card) {\n      return card.style.width = '40%';\n    });\n  } else {\n    document.querySelectorAll('.card').forEach(function (card) {\n      return card.style.width = '25%';\n    });\n  }\n}\n\nfunction createCardSets(set, size1, size2) {\n  if (size2 === undefined) {\n    size2 = size1;\n  }\n\n  while (set.size < size1) {\n    set.add(Math.floor(Math.random() * size2));\n  }\n}\n\nfunction menuToggle() {\n  var hamburger = document.querySelector('#hamburger');\n  var lines = [document.querySelectorAll('#hamburger .line')[0], document.querySelectorAll('#hamburger .line')[1], document.querySelectorAll('#hamburger .line')[2]];\n\n  if (hamburger.dataset.mode === 'show') {\n    document.querySelector('#tools').style.left = '0%';\n    hamburger.dataset.mode = 'hide';\n    lines[2].style = \"margin-top:-10px;\";\n    setTimeout(function () {\n      return lines[0].style.transform = \"rotate(45deg)\";\n    }, 200);\n    setTimeout(function () {\n      lines[1].style.transform += \"translateY(-200%) rotate(-45deg)\";\n      lines[2].style.opacity = \"0\";\n    });\n  } else {\n    hamburger.dataset.mode = 'show';\n    menuHide = 0;\n    hideMenu();\n    lines[2].style = \"margin-top:5px;\";\n    setTimeout(function () {\n      lines[1].style.transform = \"translateY(0.5px)\";\n      lines[0].style.transform = \"rotate(0deg)\";\n      lines[1].style.transform = \"translateY(0%) rotate(0deg)\";\n      lines[2].style.opacity = \"1\";\n    }, 200);\n  }\n}\n\nfunction hideMenu() {\n  menuHide += 5;\n\n  if (menuHide < 100) {\n    document.querySelector('#tools').style.left = \"-\".concat(menuHide, \"%\");\n  } else {\n    return cancelAnimationFrame(menu);\n  }\n\n  menu = requestAnimationFrame(hideMenu);\n}\n\nfunction generateCards() {\n  var orginal = Array.from(generatedCards);\n  var combo = Array.from(combination); //DOUBLE SIZE OF ARRAY BY SAME VALUES\n\n  orginal = orginal.concat(orginal);\n\n  for (var i = 0; i < game.difficulty; i++) {\n    var _cardRepresentation$i;\n\n    //CREATE CART REPRESENTATION\n    cardRepresentation[i] = (_cardRepresentation$i = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_cardRepresentation$i, combo[i], orginal[i]), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_cardRepresentation$i, \"guessed\", false), _cardRepresentation$i);\n  }\n}\n\nfunction viewCard(e) {\n  document.querySelector('#actualPoints').textContent = \"\".concat(game.attempts++);\n\n  if (e.target.dataset.guessed === 'guessed') {\n    //IF CARD IS ALREADY GUESSING STOP FUNCTION\n    return;\n  }\n\n  animating(e.target);\n  cardRepresentation.forEach(function (cart) {\n    if (cart.hasOwnProperty(Number(e.target.dataset.id)) && viewingCard <= 2) {\n      cart.guessed = true;\n      e.target.src = \"../img/\".concat(cart[e.target.dataset.id], \".jpg\");\n      e.target.dataset.src = cart[e.target.dataset.id];\n      e.target.dataset.guessed = 'guessed';\n      viewingCard++;\n    }\n\n    if (viewingCard === 2) {\n      var overlayer = document.createElement('div');\n      overlayer.id = 'overlayer';\n      document.body.appendChild(overlayer);\n      viewingCard = 0;\n      clearAnimation();\n      return determineGuess();\n    }\n  });\n}\n\nfunction determineGuess() {\n  var guessingCards = [];\n\n  while (guessingCards.length > 1) {\n    //EMPTY THE ARRAY\n    guessingCards.pop();\n  }\n\n  document.querySelectorAll('.card').forEach(function (card) {\n    if (card.dataset.src !== '' && card.dataset.src !== null && card.dataset.src !== undefined) {\n      //PUSH CARD TO ARRAY CONTAINING CURRENTLY GUESSING CARDS\n      guessingCards.push(card);\n    }\n  });\n\n  if (guessingCards.length === 0) {\n    return badGuess();\n  } else if (guessingCards[0].dataset.src === guessingCards[1].dataset.src) {\n    //IF BOTH CARD HAS EQUAL SRC IT IS A GUESSED PAIR\n    return goodGuess();\n  } else {\n    return badGuess();\n  }\n}\n\nfunction goodGuess() {\n  document.querySelectorAll('.card').forEach(function (card) {\n    if (card.dataset.guessed === 'guessed') {\n      setTimeout(function () {\n        //ROTATE CARD TO WHITE BACKSIDE\n        card.src = '../img/backGuessed.jpg';\n        card.removeEventListener('click', viewCard);\n        card.parentNode.style = \"transition:all 0.5s;opacity:0\";\n        setTimeout(function () {\n          if (document.querySelector('#overlayer') !== null) {\n            document.querySelector('#overlayer').remove();\n          }\n\n          card.parentNode.remove();\n          return checkWin();\n        }, 500);\n      }, 500);\n    }\n  });\n}\n\nfunction badGuess() {\n  setTimeout(function () {\n    document.querySelectorAll('.card').forEach(function (card) {\n      if (document.querySelector('#overlayer') !== null) {\n        document.querySelector('#overlayer').remove();\n      } //ROTATE CARD TO IT'S BACK AND EMPTY THE DATASETS\n\n\n      card.src = '../img/back.jpg';\n      card.dataset.src = '';\n      card.dataset.guessed = '';\n    });\n  }, 500);\n}\n\nfunction animating(elem) {\n  var animationCount = 0;\n\n  if (animationCount === 0) {\n    elem.style = \"transform: rotateY(-160deg);\\n            -webkit-transform: rotateY(-160deg);\";\n    animationCount++;\n  } else if (animationCount === 1) {\n    elem.style = \"transform: rotateY(160deg);\\n            -webkit-transform: rotateY(160deg);\";\n    animationCount = 0;\n  }\n\n  return fixImageSize();\n}\n\nfunction clearAnimation() {\n  setTimeout(function () {\n    document.querySelectorAll('.card').forEach(function (card) {\n      card.style = \"transform: rotateY(0deg);\\n                -webkit-transform: rotateY(0deg);\";\n      fixImageSize();\n    });\n  }, 500);\n}\n\nfunction checkWin() {\n  var box = document.querySelectorAll('#container div');\n\n  if (box.length === 0) {\n    stopTime();\n    return createWinScreen();\n  }\n}\n\nfunction createWinScreen() {\n  var box = document.createElement('div');\n  box.id = 'winBox';\n  box.innerHTML = \"<h1>You won!</h1>\\n         <div id=\\\"finishGame\\\">\\n            <div>\\n                <img alt=\\\"Icon\\\" src='../img/reverseIcon.png'>\\n            </div>\\n            <div>Name: <b>\".concat(game.playerName, \"</b></div>\\n            <div>Time: <b>\").concat(document.querySelector('#timer').textContent.replace(/\\s/g, ''), \"</b></div>\\n            <div>Clicks: <b>\").concat(game.attempts, \"</b></div>\\n         </div>\");\n  document.body.appendChild(box);\n  document.querySelector('#hamburger').remove();\n  document.querySelector('#container').remove();\n}\n\nfunction stopTime() {\n  clearInterval(timeInterval);\n}\n\nfunction setTimer() {\n  var hours = 0;\n  var minutes = 0;\n  var sec = 0;\n  document.querySelector('#timer').innerHTML = \"<span id=\\\"h\\\">00</span>\\n         <span id=\\\"m\\\">:00:</span>\\n         <span id=\\\"s\\\">00</span>\";\n  timeInterval = setInterval(function () {\n    sec++;\n\n    if (sec === 59) {\n      minutes++;\n      sec = 0;\n    }\n\n    if (minutes === 59) {\n      hours++;\n      minutes = 0;\n    }\n\n    sec < 10 ? document.querySelector('#s').textContent = \"0\".concat(sec) : document.querySelector('#s').textContent = \"\".concat(sec);\n    minutes < 10 ? document.querySelector('#m').textContent = \":0\".concat(minutes, \":\") : document.querySelector('#m').textContent = \":\".concat(minutes, \":\");\n    hours < 10 ? document.querySelector('#h').textContent = \"0\".concat(hours) : document.querySelector('#h').textContent = \"\".concat(hours);\n  }, 1000);\n}\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ }),

/***/ 0:
/*!*********************************************!*\
  !*** multi element-remove ./src/js/main.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! element-remove */\"./node_modules/element-remove/index.js\");\nmodule.exports = __webpack_require__(/*! ./src/js/main.js */\"./src/js/main.js\");\n\n\n//# sourceURL=webpack:///multi_element-remove_./src/js/main.js?");

/***/ })

/******/ });