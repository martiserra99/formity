"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/mapsy";
exports.ids = ["vendor-chunks/mapsy"];
exports.modules = {

/***/ "(ssr)/./node_modules/mapsy/dist/index.js":
/*!******************************************!*\
  !*** ./node_modules/mapsy/dist/index.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.mapsy = mapsy;\n/**\n * This utility function is used to map a value to a corresponding function based on the type of the value.\n *\n * @template T The type we are dealing with.\n * @template U The path to the key that we want to narrow down.\n * @template V The path to the discriminator key used to extract the subset.\n * @template W The extra parameters of the returned function.\n * @template X The return type of the returned function.\n *\n * @param nested The path to the key that we want to narrow down.\n * @param subset The path to the discriminator key used to extract the subset.\n * @param caller The mapper object with the keys and the corresponding functions.\n *\n * @returns A function that maps a value to a corresponding function based on the type of the value.\n */\nfunction mapsy(nested, subset, caller) {\n    return function (value) {\n        var args = [];\n        for (var _i = 1; _i < arguments.length; _i++) {\n            args[_i - 1] = arguments[_i];\n        }\n        var path = __spreadArray(__spreadArray([], nested, true), subset, true);\n        var key = path.reduce(function (acc, key) {\n            var object = acc;\n            var property = key;\n            return object[property];\n        }, value);\n        var callback = caller[key];\n        return callback.apply(void 0, __spreadArray([value], args, false));\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWFwc3kvZGlzdC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiO0FBQ0EsNkVBQTZFLE9BQU87QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qix1QkFBdUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mb3JtaXR5LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL21hcHN5L2Rpc3QvaW5kZXguanM/NjE0NSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWFwc3kgPSBtYXBzeTtcbi8qKlxuICogVGhpcyB1dGlsaXR5IGZ1bmN0aW9uIGlzIHVzZWQgdG8gbWFwIGEgdmFsdWUgdG8gYSBjb3JyZXNwb25kaW5nIGZ1bmN0aW9uIGJhc2VkIG9uIHRoZSB0eXBlIG9mIHRoZSB2YWx1ZS5cbiAqXG4gKiBAdGVtcGxhdGUgVCBUaGUgdHlwZSB3ZSBhcmUgZGVhbGluZyB3aXRoLlxuICogQHRlbXBsYXRlIFUgVGhlIHBhdGggdG8gdGhlIGtleSB0aGF0IHdlIHdhbnQgdG8gbmFycm93IGRvd24uXG4gKiBAdGVtcGxhdGUgViBUaGUgcGF0aCB0byB0aGUgZGlzY3JpbWluYXRvciBrZXkgdXNlZCB0byBleHRyYWN0IHRoZSBzdWJzZXQuXG4gKiBAdGVtcGxhdGUgVyBUaGUgZXh0cmEgcGFyYW1ldGVycyBvZiB0aGUgcmV0dXJuZWQgZnVuY3Rpb24uXG4gKiBAdGVtcGxhdGUgWCBUaGUgcmV0dXJuIHR5cGUgb2YgdGhlIHJldHVybmVkIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSBuZXN0ZWQgVGhlIHBhdGggdG8gdGhlIGtleSB0aGF0IHdlIHdhbnQgdG8gbmFycm93IGRvd24uXG4gKiBAcGFyYW0gc3Vic2V0IFRoZSBwYXRoIHRvIHRoZSBkaXNjcmltaW5hdG9yIGtleSB1c2VkIHRvIGV4dHJhY3QgdGhlIHN1YnNldC5cbiAqIEBwYXJhbSBjYWxsZXIgVGhlIG1hcHBlciBvYmplY3Qgd2l0aCB0aGUga2V5cyBhbmQgdGhlIGNvcnJlc3BvbmRpbmcgZnVuY3Rpb25zLlxuICpcbiAqIEByZXR1cm5zIEEgZnVuY3Rpb24gdGhhdCBtYXBzIGEgdmFsdWUgdG8gYSBjb3JyZXNwb25kaW5nIGZ1bmN0aW9uIGJhc2VkIG9uIHRoZSB0eXBlIG9mIHRoZSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwc3kobmVzdGVkLCBzdWJzZXQsIGNhbGxlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhdGggPSBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIG5lc3RlZCwgdHJ1ZSksIHN1YnNldCwgdHJ1ZSk7XG4gICAgICAgIHZhciBrZXkgPSBwYXRoLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSBhY2M7XG4gICAgICAgICAgICB2YXIgcHJvcGVydHkgPSBrZXk7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0W3Byb3BlcnR5XTtcbiAgICAgICAgfSwgdmFsdWUpO1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBjYWxsZXJba2V5XTtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbdmFsdWVdLCBhcmdzLCBmYWxzZSkpO1xuICAgIH07XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/mapsy/dist/index.js\n");

/***/ })

};
;