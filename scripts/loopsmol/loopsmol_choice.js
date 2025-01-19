"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = function(target, all) {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = function(to, from, except, desc) {
  if (from && typeof from === "object" || typeof from === "function")
    for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
      key = keys[i];
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: function(k) {
          return from[k];
        }.bind(null, key), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
  return to;
};
var __toCommonJS = function(mod) {
  return __copyProps(__defProp({}, "__esModule", { value: true }), mod);
};

// src/standalone/loopsmol_choice.ts
var loopsmol_choice_exports = {};
__export(loopsmol_choice_exports, {
  main: function() {
    return main;
  }
});
module.exports = __toCommonJS(loopsmol_choice_exports);
var import_kolmafia = require("kolmafia");
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function main(choice, page) {
  var options = (0, import_kolmafia.availableChoiceOptions)();
  if (choice === 923 && options[5]) {
    (0, import_kolmafia.runChoice)(5);
  } else if (choice === 780 && options[4]) {
    (0, import_kolmafia.runChoice)(4);
  } else if (choice === 785 && options[4]) {
    (0, import_kolmafia.runChoice)(4);
  } else if (choice === 788 && options[2]) {
    (0, import_kolmafia.runChoice)(2);
  } else if (choice === 691 && options[4]) {
    (0, import_kolmafia.runChoice)(4);
  } else if (choice === 1322) {
    if ((0, import_kolmafia.getProperty)("_questPartyFairQuest") === "food" || (0, import_kolmafia.getProperty)("_questPartyFairQuest") === "booze") {
      (0, import_kolmafia.runChoice)(1);
    } else {
      (0, import_kolmafia.runChoice)(2);
    }
  } else if (choice === 182) {
    if (options[4]) {
      (0, import_kolmafia.runChoice)(4);
    } else if (options[6]) {
      (0, import_kolmafia.runChoice)(6);
    } else {
      (0, import_kolmafia.runChoice)(1);
    }
  } else if (choice === 1525) {
    var priority = {
      "Throw a second dart quickly": 60,
      "Deal 25-50% more damage": 800,
      "You are less impressed by bullseyes": 10,
      "25% Better bullseye targeting": 20,
      "Extra stats from stats targets": 40,
      "Butt awareness": 30,
      "Add Hot Damage": 1e3,
      "Add Cold Damage": 31,
      "Add Sleaze Damage": 1e3,
      "Add Spooky Damage": 1e3,
      "Add Stench Damage": 1e3,
      "Expand your dart capacity by 1": 50,
      "Bullseyes do not impress you much": 9,
      "25% More Accurate bullseye targeting": 19,
      "Deal 25-50% extra damage": 1e4,
      "Increase Dart Deleveling from deleveling targets": 100,
      "Deal 25-50% greater damage": 1e4,
      // "Extra stats from stats targets":39, - Dupe in ash script, not sure about the logic here
      "25% better chance to hit bullseyes": 18
    };
    var currentScore = 999999999;
    var choiceToRun = 1;
    for (var _i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), option = _Object$entries$_i[0], optionText = _Object$entries$_i[1];
      if (!priority[optionText]) {
        (0, import_kolmafia.print)('dart perk "'.concat(optionText, '" not in priority list'), "red");
        continue;
      }
      if (priority[optionText] >= currentScore) {
        continue;
      }
      currentScore = priority[optionText];
      choiceToRun = parseInt(option);
    }
    (0, import_kolmafia.runChoice)(choiceToRun);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
