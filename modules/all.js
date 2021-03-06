// Generated with oj v0.3.1
;(function(){var M = {}, F = {}, R = {}, P, G, RR;

// Package modules
M['/'] = {"oj":"pages/oj.TryEditor.ojc","oj-markdown":"oj.markdown.js","oj-mustache":"oj.mustache.js","oj-ace-editor":"oj.AceEditor.js","oj-vimeo-video":"oj.VimeoVideo.js","oj-youtube-video":"oj.YouTubeVideo.js","oj-twitter-button":"oj.TwitterButton.js","oj-github-button":"oj.GitHubButton.js","oj-jsfiddle":"oj.JSFiddle.js"};
M['/oj/pages/node_modules'] = {"underscore":"underscore.js"};

F['/oj/pages/modules/all.ojc'] = (function(module,exports){(function(require,process,global,__dirname,__filename){
(function(){with(oj.sandbox){module.exports._ = require('underscore');

oj.use(require('oj-markdown'));

oj.use(require('oj-mustache'));

oj.use(require('oj-ace-editor'));

oj.use(require('oj-vimeo-video'));

oj.use(require('oj-youtube-video'));

oj.use(require('oj-twitter-button'));

oj.use(require('oj-github-button'));

oj.use(require('oj-jsfiddle'));

oj.use(require('../oj.TryEditor'));
}}).call(this);})(require.RR('/oj/pages/modules/all.ojc'),require.P,require.G,'/oj/pages/modules','all.ojc');});

F['/oj/pages/node_modules/underscore/underscore.js'] = (function(module,exports){(function(require,process,global,__dirname,__filename){
//     Underscore.js 1.4.4
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.4.4';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? null : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(context, args.concat(slice.call(arguments)));
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);
})(require.RR('/oj/pages/node_modules/underscore/underscore.js'),require.P,require.G,'/oj/pages/node_modules/underscore','underscore.js');});

F['/oj-markdown/oj.markdown.js'] = (function(module,exports){(function(require,process,global,__dirname,__filename){
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2013, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', /\n+(?=(?: *[-*_]){3,} *(?:\n+|$))/)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3]
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style',
        text: cap[0]
      });
      continue;
    }

    // def
    if (top && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += '<a href="'
        + href
        + '">'
        + text
        + '</a>';
      continue;
    }

    // url (gfm)
    if (cap = this.rules.url.exec(src)) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += '<a href="'
        + href
        + '">'
        + text
        + '</a>';
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? escape(cap[0])
        : cap[0];
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      out += this.outputLink(cap, link);
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += '<strong>'
        + this.output(cap[2] || cap[1])
        + '</strong>';
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += '<em>'
        + this.output(cap[2] || cap[1])
        + '</em>';
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += '<code>'
        + escape(cap[2], true)
        + '</code>';
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += '<br>';
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += '<del>'
        + this.output(cap[1])
        + '</del>';
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += escape(this.smartypants(cap[0]));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  if (cap[0].charAt(0) !== '!') {
    return '<a href="'
      + escape(link.href)
      + '"'
      + (link.title
      ? ' title="'
      + escape(link.title)
      + '"'
      : '')
      + '>'
      + this.output(cap[1])
      + '</a>';
  } else {
    return '<img src="'
      + escape(link.href)
      + '" alt="'
      + escape(cap[1])
      + '"'
      + (link.title
      ? ' title="'
      + escape(link.title)
      + '"'
      : '')
      + '>';
  }
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/--/g, '\u2014')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options) {
  var parser = new Parser(options);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return '<hr>\n';
    }
    case 'heading': {
      return '<h'
        + this.token.depth
        + ' id="'
        + this.options.headerPrefix
        + this.token.text.toLowerCase().replace(/[^\w]+/g, '-')
        + '">'
        + this.inline.output(this.token.text)
        + '</h'
        + this.token.depth
        + '>\n';
    }
    case 'code': {
      if (this.options.highlight) {
        var code = this.options.highlight(this.token.text, this.token.lang);
        if (code != null && code !== this.token.text) {
          this.token.escaped = true;
          this.token.text = code;
        }
      }

      if (!this.token.escaped) {
        this.token.text = escape(this.token.text, true);
      }

      return '<pre><code'
        + (this.token.lang
        ? ' class="'
        + this.options.langPrefix
        + this.token.lang
        + '"'
        : '')
        + '>'
        + this.token.text
        + '</code></pre>\n';
    }
    case 'table': {
      var body = ''
        , heading
        , i
        , row
        , cell
        , j;

      // header
      body += '<thead>\n<tr>\n';
      for (i = 0; i < this.token.header.length; i++) {
        heading = this.inline.output(this.token.header[i]);
        body += '<th';
        if (this.token.align[i]) {
          body += ' style="text-align:' + this.token.align[i] + '"';
        }
        body += '>' + heading + '</th>\n';
      }
      body += '</tr>\n</thead>\n';

      // body
      body += '<tbody>\n'
      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];
        body += '<tr>\n';
        for (j = 0; j < row.length; j++) {
          cell = this.inline.output(row[j]);
          body += '<td';
          if (this.token.align[j]) {
            body += ' style="text-align:' + this.token.align[j] + '"';
          }
          body += '>' + cell + '</td>\n';
        }
        body += '</tr>\n';
      }
      body += '</tbody>\n';

      return '<table>\n'
        + body
        + '</table>\n';
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return '<blockquote>\n'
        + body
        + '</blockquote>\n';
    }
    case 'list_start': {
      var type = this.token.ordered ? 'ol' : 'ul'
        , body = '';

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return '<'
        + type
        + '>\n'
        + body
        + '</'
        + type
        + '>\n';
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return '<li>'
        + body
        + '</li>\n';
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return '<li>'
        + body
        + '</li>\n';
    }
    case 'html': {
      return !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
    }
    case 'paragraph': {
      return '<p>'
        + this.inline.output(this.token.text)
        + '</p>\n';
    }
    case 'text': {
      return '<p>'
        + this.parseText()
        + '</p>\n';
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function() {
      var out, err;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occured:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: ''
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

// Create a plugin by defining a function that accepts oj and returns a map of extensions to oj
var plugin = function(oj,settings){
  // Initialize marked options
  if (typeof settings !== 'object')
    settings = {}
  marked.setOptions(settings);

  var md = function(){
    if (arguments.length > 0) {

      // Since JavaScript doesn't have multi-line strings join args with newline
      var args = Array.prototype.slice.call(arguments, 0);

      // Emit markdown as if it was a tag method
      return oj.emit(marked(args.join('\n')));
    }
  };

  // Export to oj as oj.markdown and oj.md
  return {markdown:md, md:md};
};

// Export to OJ
if (typeof oj != 'undefined')
  oj.use(plugin);

if (typeof exports === 'object') {
  module.exports = plugin;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return plugin; });
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());
})(require.RR('/oj-markdown/oj.markdown.js'),require.P,require.G,'/oj-markdown','oj.markdown.js');});

F['/oj-mustache/oj.mustache.js'] = (function(module,exports){(function(require,process,global,__dirname,__filename){
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (root, factory) {

  // Export to Node, Require.JS, or globally
  var mustache = {};
  factory(mustache);

  // Define plugin
  var plugin = function(oj, settings){
    if (typeof settings !== 'object') settings = {};

    // oj.mustache
    return {mustache: function(){

      // Union arguments into json and args
      var u = oj.unionArguments(arguments), json = u.options, args = u.args, template;

      // Handle errors
      if (args.length == 0) throw new Error('oj.mustache: template string not found');
      else if (Object.keys(json).length == 0) throw new Error('oj.mustache: json object not found');

      // Join with newline because JavaScript doesn't support multi-line comments
      template = args.join('\n');

      return oj.emit(mustache.to_html(template, json));
    }};
  };

  // Export plugin to Node, RequireJS, and Globally
  if (typeof module === 'object' && module.exports) module.exports = plugin;
  else if (typeof define === "function" && define.amd) define(function(){return plugin});
  else root.Mustache = mustache;

  // Export to OJ
  if (typeof oj != 'undefined') oj.use(plugin);

}(this, function (mustache) {

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var nonSpaceRe = /\S/;
  var eqRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var RegExp_test = RegExp.prototype.test;
  function testRegExp(re, string) {
    return RegExp_test.call(re, string);
  }

  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var Object_toString = Object.prototype.toString;
  var isArray = Array.isArray || function (object) {
    return Object_toString.call(object) === '[object Array]';
  };

  function isFunction(object) {
    return typeof object === 'function';
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      var string = match[0];
      this.tail = this.tail.substring(string.length);
      this.pos += string.length;
      return string;
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var index = this.tail.search(re), match;

    switch (index) {
    case -1:
      match = this.tail;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  function Context(view, parent) {
    this.view = view == null ? {} : view;
    this.parent = parent;
    this._cache = { '.': this.view };
  }

  Context.make = function (view) {
    return (view instanceof Context) ? view : new Context(view);
  };

  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  Context.prototype.lookup = function (name) {
    var value;
    if (name in this._cache) {
      value = this._cache[name];
    } else {
      var context = this;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;

          var names = name.split('.'), i = 0;
          while (value != null && i < names.length) {
            value = value[names[i++]];
          }
        } else {
          value = context.view[name];
        }

        if (value != null) break;

        context = context.parent;
      }

      this._cache[name] = value;
    }

    if (isFunction(value)) {
      value = value.call(this.view);
    }

    return value;
  };

  function Writer() {
    this.clearCache();
  }

  Writer.prototype.clearCache = function () {
    this._cache = {};
    this._partialCache = {};
  };

  Writer.prototype.compile = function (template, tags) {
    var fn = this._cache[template];

    if (!fn) {
      var tokens = mustache.parse(template, tags);
      fn = this._cache[template] = this.compileTokens(tokens, template);
    }

    return fn;
  };

  Writer.prototype.compilePartial = function (name, template, tags) {
    var fn = this.compile(template, tags);
    this._partialCache[name] = fn;
    return fn;
  };

  Writer.prototype.getPartial = function (name) {
    if (!(name in this._partialCache) && this._loadPartial) {
      this.compilePartial(name, this._loadPartial(name));
    }

    return this._partialCache[name];
  };

  Writer.prototype.compileTokens = function (tokens, template) {
    var self = this;
    return function (view, partials) {
      if (partials) {
        if (isFunction(partials)) {
          self._loadPartial = partials;
        } else {
          for (var name in partials) {
            self.compilePartial(name, partials[name]);
          }
        }
      }

      return renderTokens(tokens, self, Context.make(view), template);
    };
  };

  Writer.prototype.render = function (template, view, partials) {
    return this.compile(template)(view, partials);
  };

  /**
   * Low-level function that renders the given `tokens` using the given `writer`
   * and `context`. The `template` string is only needed for templates that use
   * higher-order sections to extract the portion of the original template that
   * was contained in that section.
   */
  function renderTokens(tokens, writer, context, template) {
    var buffer = '';

    // This function is used to render an artbitrary template
    // in the current context by higher-order functions.
    function subRender(template) {
      return writer.render(template, context);
    }

    var token, tokenValue, value;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];
      tokenValue = token[1];

      switch (token[0]) {
      case '#':
        value = context.lookup(tokenValue);

        if (typeof value === 'object' || typeof value === 'string') {
          if (isArray(value)) {
            for (var j = 0, jlen = value.length; j < jlen; ++j) {
              buffer += renderTokens(token[4], writer, context.push(value[j]), template);
            }
          } else if (value) {
            buffer += renderTokens(token[4], writer, context.push(value), template);
          }
        } else if (isFunction(value)) {
          var text = template == null ? null : template.slice(token[3], token[5]);
          value = value.call(context.view, text, subRender);
          if (value != null) buffer += value;
        } else if (value) {
          buffer += renderTokens(token[4], writer, context, template);
        }

        break;
      case '^':
        value = context.lookup(tokenValue);

        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || (isArray(value) && value.length === 0)) {
          buffer += renderTokens(token[4], writer, context, template);
        }

        break;
      case '>':
        value = writer.getPartial(tokenValue);
        if (isFunction(value)) buffer += value(context);
        break;
      case '&':
        value = context.lookup(tokenValue);
        if (value != null) buffer += value;
        break;
      case 'name':
        value = context.lookup(tokenValue);
        if (value != null) buffer += mustache.escape(value);
        break;
      case 'text':
        buffer += tokenValue;
        break;
      }
    }

    return buffer;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var tree = [];
    var collector = tree;
    var sections = [];

    var token;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];
      switch (token[0]) {
      case '#':
      case '^':
        sections.push(token);
        collector.push(token);
        collector = token[4] = [];
        break;
      case '/':
        var section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : tree;
        break;
      default:
        collector.push(token);
      }
    }

    return tree;
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];
      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          lastToken = token;
          squashedTokens.push(token);
        }
      }
    }

    return squashedTokens;
  }

  function escapeTags(tags) {
    return [
      new RegExp(escapeRegExp(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRegExp(tags[1]))
    ];
  }

  /**
   * Breaks up the given `template` string into a tree of token objects. If
   * `tags` is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. ["<%", "%>"]). Of
   * course, the default is to use mustaches (i.e. Mustache.tags).
   */
  function parseTemplate(template, tags) {
    template = template || '';
    tags = tags || mustache.tags;

    if (typeof tags === 'string') tags = tags.split(spaceRe);
    if (tags.length !== 2) throw new Error('Invalid tags: ' + tags.join(', '));

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          delete tokens[spaces.pop()];
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(tagRes[0]);
      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(['text', chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr == '\n') stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) break;
      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(eqRe);
        scanner.scan(eqRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === '{') {
        value = scanner.scanUntil(new RegExp('\\s*' + escapeRegExp('}' + tags[1])));
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = '&';
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) throw new Error('Unclosed tag at ' + scanner.pos);

      token = [type, value, start, scanner.pos];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();
        if (!openSection) {
          throw new Error('Unopened section "' + value + '" at ' + start);
        }
        if (openSection[1] !== value) {
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
        }
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        tags = value.split(spaceRe);
        if (tags.length !== 2) {
          throw new Error('Invalid tags at ' + start + ': ' + tags.join(', '));
        }
        tagRes = escapeTags(tags);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();
    if (openSection) {
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
    }

    return nestTokens(squashTokens(tokens));
  }

  mustache.name = "mustache.js";
  mustache.version = "0.7.3";
  mustache.tags = ["{{", "}}"];

  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

  mustache.parse = parseTemplate;

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // All Mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates and partials in the default writer.
   */
  mustache.clearCache = function () {
    return defaultWriter.clearCache();
  };

  /**
   * Compiles the given `template` to a reusable function using the default
   * writer.
   */
  mustache.compile = function (template, tags) {
    return defaultWriter.compile(template, tags);
  };

  /**
   * Compiles the partial with the given `name` and `template` to a reusable
   * function using the default writer.
   */
  mustache.compilePartial = function (name, template, tags) {
    return defaultWriter.compilePartial(name, template, tags);
  };

  /**
   * Compiles the given array of tokens (the output of a parse) to a reusable
   * function using the default writer.
   */
  mustache.compileTokens = function (tokens, template) {
    return defaultWriter.compileTokens(tokens, template);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function (template, view, partials) {
    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  mustache.to_html = function (template, view, partials, send) {
    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

}));
})(require.RR('/oj-mustache/oj.mustache.js'),require.P,require.G,'/oj-mustache','oj.mustache.js');});

F['/oj-ace-editor/oj.AceEditor.js'] = (function(module,exports){(function(require,process,global,__dirname,__filename){
// oj.AceEditor.js

;(function(root, factory){

  // Export to Node, Require.JS, or globally
  if (typeof module === 'object' && module.exports) module.exports = factory(root)
  else if (typeof define === 'function' && define.amd) define(function(){return factory(root)})
  else factory(root, root.oj)

}(this, function(root, oj){

  var debounce;

  var plugin = function(oj,settings){

    // Client side the AceEditor must be included by <script> tag. Help people understand.
    if (oj.isClient && !oj.isDefined(ace))
      throw new Error('oj.AceEditor: ace not found')

    if (typeof settings !== 'object')
      settings = {}

    var AceEditor = oj.createType('AceEditor', {
      base: oj.ModelKeyView,

      constructor: function(){
        var union = oj.unionArguments(arguments),
          options = union.options,
          args = union.args,
          defaults = {
            width: 400,                     // Default the height
            height: 200,                    // Default the width
            fontSize: 14,                   // Default font size
            showFoldWidgets: false,         // Hide fold widgets
            showPrintMargin: false,         // Hide print margin
            useSoftTabs: true,              // Change tabs to spaces
            behaviorsEnabled: true,         // Enable quote and paren matching
            foldStyle: 'markbegin',         // Default fold style when folds are unhidden
            hScrollBarAlwaysVisible: false, // Prevent ugly scroll bars
            vScrollBarAlwaysVisible: false, // Ace doesn't have this property. This solution is imperfect.

            // Disable workers on local files because ace doesn't support this
            useWorker: false// window.location.protocol != 'file:'
          };
        // Default options if unspecified
        for (k in defaults) {
          if (options[k] == null)
            options[k] = defaults[k];
        }
        var ver = this._getVersion();
        // ver.major = 10;
        // Create el as relatively positioned div
        var This = this;
        this.el = oj(function(){
          oj.div(function(){

              if(ver.major == -1)
                oj.div({c:'oj-AceEditor-editor', style:{position:'absolute',width:options.width, height:options.height}});
              else
                oj.TextArea({c:'oj-AceEditor-editor',
                  change:function(){
                    if (typeof This.viewChanged == 'function') {
                      This.viewChanged();
                    }
                    if (typeof This.change == 'function') {
                      This.change();
                    }
                  },
                  style:{
                    backgroundColor:'#FEFAF3',
                    color:'#586E75',
                    border:'none',
                    position:'absolute',
                    fontSize: options.fontSize,
                    width:options.width,
                    fontFamily:"Monaco,Menlo,Ubuntu Mono,Consolas,source-code-pro,monospace",
                    height:options.height}});
            },{
              style:{
                position:'relative',
                width:options.width,
                height:options.height
              }
            }
          );
        });

        this.$editor = this.$('.oj-AceEditor-editor');

        if (ver.major == -1) {

          // Create editor
          if (oj.isClient && typeof ace != 'undefined') {

            this.editor = ace.edit(this.$editor.get(0));
            this.editor.resize()

            // Register for editor changes
            // Use debounce to ensure cut and paste only fires one event change
            var This = this;
            this.session.doc.on('change', debounce(50, function(){
              if (typeof This.viewChanged == 'function')
                This.viewChanged();
              if (typeof This.change == 'function')
                This.change();
            }));
          }
        }
        else
        {
          this._editor = {
            width:function(){},
            height:function(){},
            getSession:function(){return {
              doc:{'on':function(){}},
              getValue:function(){},
              setValue:function(){},
              getMode:function(){return {'$id':'js'}},
              setMode:function(){},
              getTabSize:function(){return 2;},
              setTabSize:function(){},
              setFoldStyle:function(){},
              getUseSoftTabs:function(){return true},
              setUseSoftTabs:function(){},
              getUseWrapMode:function(){},
              setUseWrapMode:function(){},
              getWrapLimitRange:function(){},
              setWrapLimitRange:function(){},
              getUseWorker:function(){},
              setUseWorker:function(){}
            }},
            setSession:function(){},
            renderer:{
              getShowGutter:function(){},
              setShowGutter:function(){},
              getPrintMarginColumn:function(){},
              setPrintMarginColumn:function(){},
              getHScrollBarAlwaysVisible:function(){},
              setHScrollBarAlwaysVisible:function(){}
            },
            getTheme:function(){},
            setTheme:function(){},
            resize:function(){},
            getReadOnly:function(){},
            setReadOnly:function(){},
            setFontSize:function(){},
            getCursorPosition:function(){},
            moveCursorToPosition:function(){},
            getShowPrintMargin:function(){},
            setShowPrintMargin:function(){},
            getShowInvisibles:function(){},
            setShowInvisibles:function(){},
            getDisplayIndentGuides:function(){},
            setDisplayIndentGuides:function(){},
            getShowFoldWidgets:function(){},
            setShowFoldWidgets:function(){},

            getHighlightSelectedWord:function(){},
            setHighlightSelectedWord:function(){},
            getHighlightActiveLine:function(){},
            setHighlightActiveLine:function(){},
            getBehavioursEnabled:function(){},
            setBehavioursEnabled:function(){}
          }


        }

        // Shift editor properties
        var props = [
          'theme',
          'mode',
          'width',
          'height',
          'wrapLimit',
          'showPrintMargin',
          'readOnly',
          'fontSize',
          'tabSize',

          'foldStyle',
          'selectionStyle',

          'showPrintMargin',
          'showInvisibles',
          'showGutter',
          'showIndentGuides',
          'showFoldWidgets',

          'highlightSelectedWord',
          'highlightActiveLine',

          'useSoftTabs',
          'useWrapMode',
          'wrapLimitRange',
          'printMarginColumn',
          'animatedScroll',
          'useWorker',
          'hScrollBarAlwaysVisible',
          'vScrollBarAlwaysVisible',
          'fadeFoldWidgets',

          'behaviorsEnabled'
        ];
        for (var i = 0; i < props.length; i++) {
          var prop = props[i];
          if (options[prop] != null)
            this[prop] = oj.argumentShift(options, prop);
        }

        // Value is property or first argument
        value = oj.argumentShift(options, 'value') || args.join('\n');

        // Pass on options. Args have been handled at this level.
        AceEditor.base.constructor.apply(this, [options]);

        // Hide vertical scroll bar
        this.$scrollbar = this.$('.ace_scrollbar');
        this.$scroller = this.$('.ace_scroller');
        this.$content = this.$('.ace_content');

        if (value)
          this.value = value;
      },

      properties: {

        // Accessing Properties
        // ----------------------------------------------------------------------

        value: {
          get: function(){
            if(this._isVer) {
              return this._verEditor.value;
            }

            if(this.session)
              return this.session.getValue(); },
          set: function(v){
            if(this.session) {
              // Save the location of the cursor
              var pos = this.cursorPosition;
              this.session.setValue(v)

              // Restore the location of the cursor
              this.cursorPosition = pos;

              if (this._isVer) {
                this._verEditor.value = v
              }
            }
          }
        },

        editor: {
          get: function(){ return this._editor; },
          set: function(v){ this._editor = v; }
        },

        session: {
          get: function(){ if(this.editor) return this.editor.getSession(); },
          set: function(v){ if(this.editor) this.editor.setSession(v); }
        },

        renderer: {
          get: function(){ if(this.editor) return this.editor.renderer; }
        },

        change: {
          get: function(){ return this._change; },
          set: function(v){ this._change = v; }
        },

        // Wrap ace event handling object
        eventHandler: {
          get: function(){
            if (typeof 'ace' == 'undefined')
              return;
            return this._eventHandler || (this._eventHandler = ace.require("ace/lib/event"));
          }
        },

        // Wrap ace container element
        containerEl: {
          get: function(){
            return this._container || (this._container = this.$('.editor-container')[0]);
          }
        },

        // Custom Properties
        // ----------------------------------------------------------------------

        // Set/get theme and automatically add ace/theme prefix
        theme: {
          get: function(){
            if (!this.editor) return;
            var theme = this.editor.getTheme();
            var prefix = 'ace/theme/';
            if (theme && theme.indexOf(prefix) === 0)
              theme = theme.slice(prefix.length);
            return theme;
          },
          set: function(v){
            if (!this.editor) return;
            var prefix = 'ace/theme/';
            if (v && v.indexOf(prefix) != 0)
              v = prefix + v;
            this.editor.setTheme(v);
          }
        },

        // Set/get mode and automatically add ace/mode prefix
        mode: {
          get: function(){
            if (!this.session) return;
            // Get mode string from Mode object
            var mode = this.session.getMode().$id;
            var prefix = 'ace/mode/';
            if (mode && mode.indexOf(prefix) === 0)
              mode = mode.slice(prefix.length);
            return mode;
          },
          set: function(v){
            if (!this.session) return;
            var prefix = 'ace/mode/';
            if (v && v.indexOf(prefix) != 0)
              v = prefix + v;
            this.session.setMode(v);
          }
        },

        // Change width
        width: {
          get: function(){ return this.$el.width(); },
          set: function(v){
            this.$el.width(v)
            this.updateWidth()
          }
        },

        // Change height
        height: {
          get: function(){ return this.$el.height(); },
          set: function(v){
            this.$el.height(v);
            this.$editor.height(v);
            if (this.editor)
              this.editor.resize();
          }
        },

        // Meta property that sets wrapLimitRange, printMarginColumn, and useWrapMode all at once
        // wrapLimit: 40      (limit of 40 characters)
        // wrapLimit: 'off'   (no limit, creates scroll bar)
        // wrapLimit: 'auto'  (limit to size of buffer)
        wrapLimit: {
          get: function(){ if(this.session) return this.wrapLimitRange; },
          set: function(v){
            if(this.session) {
              // Turn off wrapping if false or set to 'off'
              if(!v || v === 'off') {
                this.useWrapMode = false;
                this.printMarginColumn = 80;
              }

              // Wrap to region if set to 'auto'
              else if (v === 'auto') {
                this.useWrapMode = true;
                this.wrapLimitRange = null;
                this.printMarginColumn = 80;
              }

              // Otherwise wrap to specified character count
              else if (typeof v === 'number') {
                this.wrapLimitRange = v;
                this.printMarginColumn = v;
                this.useWrapMode = true;
              }
            }
          }
        },

        // TODO: Enable Drag and drop as a property
        // useDragAndDrop: {
        //   get: function(){},
        //   set: function(v){}
        // },
        // https://github.com/ajaxorg/ace/blob/master/demo/kitchen-sink/demo.js#L437
        // event.addListener(container, "drop", function(e) {
        //   var file;
        //   try {
        //       file = e.dataTransfer.files[0];
        //       if (window.FileReader) {
        //           var reader = new FileReader();
        //           reader.onload = function() {
        //               var mode = modelist.getModeFromPath(file.name);

        //               env.editor.session.doc.setValue(reader.result);
        //               modeEl.value = mode.name;
        //               env.editor.session.setMode(mode.mode);
        //               env.editor.session.modeName = mode.name;
        //           };
        //           reader.readAsText(file);
        //       }
        //       return event.preventDefault(e);
        //   } catch(err) {
        //       return event.stopEvent(e);
        //   }
        // });

        // Editor Configuration Properties
        // ----------------------------------------------------------------------

        // Make the editor read only
        readOnly: {
          get: function(){ if(this.editor) return this.editor.getReadOnly(); },
          set: function(v){ if(this.editor) this.editor.setReadOnly(v); }
        },

        // Change font size
        fontSize: {
          get: function(){ if(this.editor) return this._fontSize; },
          set: function(v){
            if(this.editor) {
              this.editor.setFontSize(v);
              this._fontSize = v;
            }
          }
        },

        // Change tab size
        tabSize: {
          get: function(){ if(this.editor) return this.session.getTabSize(); },
          set: function(v){ if(this.editor) this.session.setTabSize(v); }
        },

        // Change cursorPosition as object: {row:4, column:25}
        cursorPosition: {
          get: function(){ if(this.editor) return this.editor.getCursorPosition(); },
          set: function(v){ if(this.editor) this.editor.moveCursorToPosition(v); }
        },

        // Editor Show Properties
        // ----------------------------------------------------------------------

        // Show print margin
        showPrintMargin: {
          get: function(){ if(this.editor) return this.editor.getShowPrintMargin(); },
          set: function(v){ if(this.editor) this.editor.setShowPrintMargin(v); }
        },

        // Show invisible characters
        showInvisibles: {
          get: function(){ if(this.editor) return this.editor.getShowInvisibles(); },
          set: function(v){ if(this.editor) this.editor.setShowInvisibles(v); }
        },

        // Show gutter
        showGutter: {
          get: function(){ if(this.editor) return this.renderer.getShowGutter(); },
          set: function(v){ if(this.editor) this.renderer.setShowGutter(v); }
        },

        // Show Indent guides
        showIndentGuides: {
          get: function(){ if(this.editor) return this.editor.getDisplayIndentGuides(); },
          set: function(v){ if(this.editor) this.editor.setDisplayIndentGuides(v); }
        },

        // Show fold widgets that collapse / expand code blocks
        showFoldWidgets: {
          get: function(){ if(this.editor) return this.editor.getShowFoldWidgets(); },
          set: function(v){ if(this.editor) this.editor.setShowFoldWidgets(v); }
        },

        // Editor Highlight Properties
        // ----------------------------------------------------------------------

        // Highlight selected word elsewhere in the editor
        highlightSelectedWord: {
          get: function(){ if(this.editor) return this.editor.getHighlightSelectedWord(); },
          set: function(v){ if(this.editor) this.editor.setHighlightSelectedWord(v); }
        },

        // Highlight active line
        highlightActiveLine: {
          get: function(){ if(this.editor) return this.editor.getHighlightActiveLine(); },
          set: function(v){ if(this.editor) this.editor.setHighlightActiveLine(v); }
        },

        // Editor Style Properties
        // ----------------------------------------------------------------------

        // Selection style options: 'line' or 'text'
        selectionStyle: {
          get: function(){ if(this.editor) return this.editor.getSelectionStyle() || 'line';
          },
          set: function(v){
            if(this.editor) {
              if (v !== 'line' && v !== 'text')
                throw new Error("oj.AceEditor: selectionStyle expects 'line' or 'text'")
              this.editor.setSelectionStyle(v);
            }
          }
        },

        // Fold style options: 'manual', markbegin' or 'markbeginend'
        foldStyle: {
          get: function(){ if(this.session) return this._foldStyle; },
          set: function(v){
            if(this.session) {
              this._foldStyle = v;
              this.session.setFoldStyle(v);
            }
          }
        },

        // Enable ace editor behaviors to auto match quotes, parens, curly braces, and square brackets
        behaviorsEnabled: {
          get: function(){ if(this.editor) return this.editor.getBehavioursEnabled(); },
          set: function(v){ if(this.editor) this.editor.setBehavioursEnabled(v); }
        },

        // Editor Not-Very-Important Properties
        // ----------------------------------------------------------------------------------

        useSoftTabs: {
          get: function(){ if(this.session) return this.session.getUseSoftTabs(); },
          set: function(v){ if(this.session) this.session.setUseSoftTabs(v); }
        },

        // Set whether wrapping should be on (true) or off (false)
        useWrapMode: {
          get: function(){ if(this.session) return this.session.getUseWrapMode(); },
          set: function(v){ if(this.session) this.session.setUseWrapMode(v); }
        },

        // Set the wrap limit character count
        wrapLimitRange: {
          get: function(){ if(this.session) return this.session.getWrapLimitRange(); },
          set: function(v){ if(this.session) this.session.setWrapLimitRange(v, v); },
        },

        // Set the number of characters the margin should appear at.
        printMarginColumn: {
          get: function(){ if(this.renderer) return this.renderer.getPrintMarginColumn(); },
          set: function(v){ if(this.renderer) this.renderer.setPrintMarginColumn(v); }
        },

        // Animates scrolling for find and goto line
        animatedScroll: {
          get: function(){ if(this.editor) return this.editor.getAnimatedScroll(); },
          set: function(v){ if(this.editor) this.editor.setAnimatedScroll(v); }
        },

        // Use or disable worker threads in ace editor
        useWorker: {
          get: function(){ if(this.session) return this.session.getUseWorker(); },
          set: function(v){ if(this.session) this.session.setUseWorker(v); }
        },

        // Turn horizontal scrollbar on permanently
        hScrollBarAlwaysVisible: {
          get: function(){ if(this.editor) return this.renderer.getHScrollBarAlwaysVisible(); },
          set: function(v){ if(this.editor) this.renderer.setHScrollBarAlwaysVisible(v); }
        },

        // Turn horizontal scrollbar on permanently
        vScrollBarAlwaysVisible: {
          get: function(){ return this._vScrollBarAlwaysVisible || false; },
          set: function(v){
            this._vScrollBarAlwaysVisible = v;
            if (this.$scrollbar != null) {
              if (v) {
                this.$scrollbar.show();
                this.updateWidth();
              } else {
                this.$scrollbar.hide()
                this.updateWidth();
              }
            }
          }
        },

        // Fade fold widgets that allow code blocks to be collapsed
        fadeFoldWidgets: {
          get: function(){ if(this.editor) return this.editor.getFadeFoldWidgets(); },
          set: function(v){ if(this.editor) this.editor.setFadeFoldWidgets(v); }
        },

        $scrollbar: null,
        $scroller: null,
        $content: null,
        _isVer:{
          get:function(){
            return this._getVersion().major != -1
          }
        },
        _verEditor:{
          get:function(){
            if(!this._isVer)
              return null;
            return this.$editor.get(0).oj;
          }
        }
      },

      methods: {

        // When the view changes
        viewChanged: function(){
          AceEditor.base.inserted.apply(this, arguments);
        },

        // When inserted in the dom
        inserted: function(){
          AceEditor.base.inserted.apply(this, arguments);

          this.value = this.value
          // Scroll visiblility can only be triggered once inserted
          this.vScrollBarAlwaysVisible = this.vScrollBarAlwaysVisible
        },

        // The width is dependent on if vertical scroll is turned off
        updateWidth: function(){
            // Get the width
            var w = this.width;

            // The editor width is bigger if there is no scroll bar
            widthScroll = this.vScrollBarAlwaysVisible ? 0 : this.scrollWidth();
            this.$editor.width(w + widthScroll);

            // Trigger the editor to change size
            if (this.editor)
              this.editor.resize();
        },

        // Dynamically calculate the scroll width by measuring the difference
        // Cache the result
        scrollWidth: function(){
          if (this._scrollWidth != null)
            return this._scrollWidth;
          if (this.isInserted) {
            var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
            // Append our div, do our calculation and then remove it
            $('body').append(div);
            var w1 = $('div', div).innerWidth();
            div.css('overflow-y', 'scroll');
            var w2 = $('div', div).innerWidth();
            $(div).remove();
            return this._scrollWidth = (w1 - w2);
          }
        },
        _getVersion: function(){
          if (oj.isClient) {
            var agent = navigator.userAgent;
            var reg = /MSIE\s?(\d+)(?:\.(\d+))?/i;
            var matches = agent.match(reg);
            if (matches != null) {
                return { major: matches[1], minor: matches[2] };
            }
          }
          return { major: "-1", minor: "-1" };
        }
      }
    });

    return {AceEditor:AceEditor};

  };

  // Debounce from underscore to remove the only underscore dependency
  // http://underscorejs.org/#debounce
  debounce = function(wait, func, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Export to OJ
  if (typeof oj != 'undefined') oj.use(plugin);

  return plugin;
}));
})(require.RR('/oj-ace-editor/oj.AceEditor.js'),require.P,require.G,'/oj-ace-editor','oj.AceEditor.js');});

F['/oj-vimeo-video/oj.VimeoVideo.js'] = (function(module,exports){(function(require,process,global,__dirname,__filename){
// oj.VimeoVideo.js

;(function(root, factory){

  // Export to Node, Require.JS, or globally
  if (typeof module === 'object' && module.exports) module.exports = factory(root)
  else if (typeof define === 'function' && define.amd) define(function(){return factory(root)})
  else factory(root, root.oj)

}(this, function(root, oj){

  // Froogaloop is the offical javascript api to Vimeo
  // https://github.com/vimeo/player-api/tree/master/javascript
  var Froogaloop=function(){function e(a){return new e.fn.init(a)}function h(a,c,b){if(!b.contentWindow.postMessage)return!1;var f=b.getAttribute("src").split("?")[0],a=JSON.stringify({method:a,value:c});"//"===f.substr(0,2)&&(f=window.location.protocol+f);b.contentWindow.postMessage(a,f)}function j(a){var c,b;try{c=JSON.parse(a.data),b=c.event||c.method}catch(f){}"ready"==b&&!i&&(i=!0);if(a.origin!=k)return!1;var a=c.value,e=c.data,g=""===g?null:c.player_id;c=g?d[g][b]:d[b];b=[];if(!c)return!1;void 0!==
  a&&b.push(a);e&&b.push(e);g&&b.push(g);return 0<b.length?c.apply(null,b):c.call()}function l(a,c,b){b?(d[b]||(d[b]={}),d[b][a]=c):d[a]=c}var d={},i=!1,k="";e.fn=e.prototype={element:null,init:function(a){"string"===typeof a&&(a=document.getElementById(a));this.element=a;a=this.element.getAttribute("src");"//"===a.substr(0,2)&&(a=window.location.protocol+a);for(var a=a.split("/"),c="",b=0,f=a.length;b<f;b++){if(3>b)c+=a[b];else break;2>b&&(c+="/")}k=c;return this},api:function(a,c){if(!this.element||
  !a)return!1;var b=this.element,f=""!==b.id?b.id:null,d=!c||!c.constructor||!c.call||!c.apply?c:null,e=c&&c.constructor&&c.call&&c.apply?c:null;e&&l(a,e,f);h(a,d,b);return this},addEvent:function(a,c){if(!this.element)return!1;var b=this.element,d=""!==b.id?b.id:null;l(a,c,d);"ready"!=a?h("addEventListener",a,b):"ready"==a&&i&&c.call(null,d);return this},removeEvent:function(a){if(!this.element)return!1;var c=this.element,b;a:{if((b=""!==c.id?c.id:null)&&d[b]){if(!d[b][a]){b=!1;break a}d[b][a]=null}else{if(!d[a]){b=
  !1;break a}d[a]=null}b=!0}"ready"!=a&&b&&h("removeEventListener",a,c)}};e.fn.init.prototype=e.fn;window.addEventListener?window.addEventListener("message",j,!1):window.attachEvent("onmessage",j);return window.Froogaloop=e}();

  // Create url from Vimeo options
  function vimeoUrl(video, options)
  {
    var out = 'http://player.vimeo.com/video/' + video + '?api=1&player_id=' + options.player_id;
    for(k in options)
      out += '&' + k + '=' + options[k];
    return out;
  }

  var plugin = function(oj,settings){
    if (typeof settings !== 'object')
      settings = {}

    var VimeoVideo = oj.createType('VimeoVideo', {
      // The model-key bind to the url of the movie
      base: oj.View,

      // VimeoVideo(videoID, properties)
      constructor: function(){
        var this_ = this;
        var union = oj.unionArguments(arguments);
        var options = union.options;
        var args = union.args;

        // First argument is video id
        if(args.length > 0)
          this.video = args[0];

        // Shift properties
        var props = [
          'width',
          'height',
          'video',
          'showTitle',
          'showByline',
          'showPortrait',
          'color',
          'autoplay',
          'loop'
        ];
        for (var i = 0; i < props.length; i++) {
          var prop = props[i];
          if (options[prop] != null)
            this[prop] = oj.argumentShift(options, prop);
        }

        this.el = oj(function(){
          oj.iframe({
            src: this_.src,
            width:this_.width,
            height:this_.height,
            frameborder:0,
            webkitAllowFullScreen:1,
            mozallowfullscreen:1,
            allowFullScreen:1,
          });
        });

        VimeoVideo.base.constructor.apply(this, [options]);

        // // // Bind events using javascript API
        // this.player = Froogaloop(this.el);

        // // // When the player is ready, add listeners for pause, finish, and playProgress
        // this.player.addEvent('ready', function() {});


        //   console.log("ready called");

        //   this_.player.addEvent('pause', function(){this_.onPause.apply(this_,arguments)});
        //   this_.player.addEvent('finish', function(){this_.onFinish.apply(this_,arguments)});
        //   this_.player.addEvent('playProgress', function(){this_.onPlayProgress.apply(this_,arguments)});
        // });

        // if (oj.isClient) {
        //   console.log("starting: ", starting);
        //   player.api('starting');
        // }
      },
      properties: {
        width: {
          get: function(){ return this._width || 300; },
          set: function(v){
            this._width = v;
            if (this.isConstructed)
              this.$el.attr('width', v);
          }
        },

        height: {
          get: function(){ return this._height || 178; },
          set: function(v){
            this._height = v;
            if (this.isConstructed)
              this.$el.attr('height', v);
          }
        },

        // The video id
        video: 24715531,

        // Show title (readwrite)
        showTitle: false,

        // Show the users byline on the video (readwrite)
        showByline: false,

        // Show the user's portrait on the video (readwrite)
        showPortrait: false,

        // Color of controls (readwrite)
        color: {
          get: function(){return this._color || '00adef';},
          set: function(v){
            // Remove prefix of '#'
            if(v.length > 0 && v[0] == '#')
              v = v.slice(1);
            this._color = v;
          }
        },

        // Play the video automatically on load
        autoplay: false,

        // Repeat video when it reaches the end
        loop: false,

        src: {
          get: function(){
            return vimeoUrl(this.video, this.videoOptions);
          }
        },

        // Gather options to set url (readonly)
        videoOptions: {
          get: function(){
            return {
              title: (this.showTitle ? 1 : 0),
              byline: (this.showByline ? 1 : 0),
              portrait: (this.showPortrait ? 1 : 0),
              color: this.color,
              autoplay: (this.autoplay ? 1 : 0),
              loop: (this.loop ? 1 : 0),
              player_id: (this.id ? 1 : 0)
            };
          }
        }
      },

      methods: {

        play: function(){
        },
        stop: function(){
        },

        rewind: function(){
        },

        onPause: function(id) {
          console.log('paused', id);
        },

        onFinish: function(id) {
          console.log('finish', id);
        },

        onPlayProgress: function(data, id) {
          console.log('playProgress: ', data, id);
        }

      }
    });

    return {VimeoVideo:VimeoVideo};
  };

  // Export to OJ
  if (typeof oj != 'undefined')
    oj.use(plugin);

  return plugin;
}));

})(require.RR('/oj-vimeo-video/oj.VimeoVideo.js'),require.P,require.G,'/oj-vimeo-video','oj.VimeoVideo.js');});

F['/oj-youtube-video/oj.YouTubeVideo.js'] = (function(module,exports){(function(require,process,global,__dirname,__filename){
// oj.YouTubeVideo.js

;(function(root, factory){

  // Export to Node, Require.JS, or globally
  if (typeof module === 'object' && module.exports) module.exports = factory(root)
  else if (typeof define === 'function' && define.amd) define(function(){return factory(root)})
  else factory(root, root.oj)

}(this, function(root, oj){

  var plugin = function(oj,settings){
    if (typeof settings !== 'object')
      settings = {};

    var YouTubeVideo = oj.createType('YouTubeVideo', {
      // The model-key bind to the url of the movie
      base: oj.View,

      // YouTubeVideo(videoID, properties)
      constructor: function(){
        var this_ = this;
        var union = oj.unionArguments(arguments);
        var options = union.options;
        var args = union.args;

        // First argument is video id
        if(args.length > 0)
          this.video = args[0];

        // Shift properties
        var props = [
          'width',
          'height',
          'video',
          'autoplay',
          'volume',
          'mute',
          'playbackRate'
        ];
        for (var i = 0; i < props.length; i++) {
          var prop = props[i];
          if (options[prop] != null)
            this[prop] = oj.argumentShift(options, prop);
        }

        this.el = oj(function(){
          oj.iframe({
            src: this_.src,
            type: 'text/html',
            width:this_.width,
            height:this_.height,
            frameborder:0,
            webkitAllowFullScreen:1,
            mozallowfullscreen:1,
            allowFullScreen:1,
          });
        });

        YouTubeVideo.base.constructor.apply(this, [options]);

        this.loadYouTubeAPI();

      },
      properties: {
        width: {
          get: function(){ return this._width || 300; },
          set: function(v){
            this._width = v;
            if (this.isConstructed)
              this.$el.attr('width', v);
          }
        },

        height: {
          get: function(){ return this._height || 170; },
          set: function(v){
            this._height = v;
            if (this.isConstructed)
              this.$el.attr('height', v);
          }
        },

        volume: {
          get: function(){
            return this._volume != null ? this._volume : 1.0},
          set: function(v){
            this._volume = Math.min(Math.max(v,0),1);
            if (this.player) {
              this.player.setVolume(this._volume * 100);
            }
          }
        },

        mute: {
          get: function(){ return this._mute != null ? this._mute : false; },
          set: function(v){
            this._mute = !!v;
            if (this.player) {
              if (this._mute) {
                this.player.mute();
              } else {
                this.player.unMute();
              }
            }
          }
        },

        playbackRate: {
          get: function(){ return this._playbackRate != null ?  this._playbackRate : 1.0; },
          set: function(v){
            this._playbackRate = v;
            if (this.player) {
              this.player.setPlaybackRate(v);
            }
          }
        },

        availablePlaybackRates: {
          get: function(){ return this.player ? this.player.getAvailablePlaybackRates() : [1]; },
        },

        player: null,

        // The video id
        video: {
          get:function(){return this._video || 't-FUTp_oO5s';},
          set:function(v){
            this._video = v;
            if(this.player) {
              this.player.setVideo(v);
            }
          }
        },

        origin: {
          get: function(){
            if (!oj.isClient || window.location.protocol === 'file:')
              return null;
            else if (this._origin)
              return this._origin;
            // Calculate origin from window.location
            return this._origin = (window.location.protocol + '//' + window.location.hostname);
          },
          set: function(v){ this._origin = v; }
        },

        // Play the video automatically on load
        autoplay: false,
        loop: {
          get: function(){ return this._loop || false; },
          set: function(v){ this._loop = v; if (this.player){this.player.setLoop(v);} }
        },

        src: {
          get: function(){

            var options = this.videoOptions;
            var out = 'http://www.youtube.com/embed/' + this.video + '?autoplay=' + options.autoplay;
            if (options.origin) {
              out += 'origin=' + options.origin;
            }
            for(k in options)
              out += '&' + k + '=' + options[k];
            return out;
          }
        },

        // Gather options to set url (readonly)
        videoOptions: {
          get: function(){
            return {
              autoplay: (this.autoplay ? 1 : 0)
            };
          }
        },

        // Overridable state changed event handler
        playerStateChanged: function(state, player){
        }

      },

      methods: {

        loadYouTubeAPI: function(){

          var this_ = this;
          if (oj.isClient && !YouTubeVideo._loaded) {
            var p=/^http:/.test(document.location)?'http':'https';
            var url = p + '://www.youtube.com/iframe_api';
            $.ajax({
              url:url,
              cache:true,
              dataType:'script'
            }).always(function(result){
            });
            YouTubeVideo._loaded = true;
          }
        },

        // Called when the youtube javascript api loads
        youtubeAPILoaded: function(){
          var this_ = this;
          new YT.Player(this.id, {
            events: {
                onStateChange: function(){
                  this_._onPlayerStateChange.apply(this_, arguments);
                },
                onReady: function(event){
                  this_.player = event.target
                  this_._onPlayerReady.apply(this_, arguments);
                }
              }
          });
        },

        play: function(){
          if(this.player) {
            this.player.playVideo();
          }
        },

        stop: function(){
          if(this.player) {
            this.player.stopVideo();
          }
        },

        pause: function(){
          if(this.player) {
            this._playing = false;
            this.player.pauseVideo();
          }
        },

        // Toggle play and pause
        playToggle: function(){
          if (this._playing)
            this.pause();
          else
            this.play();
        },

        // Toggle mute / unmute
        muteToggle: function(){
          this.mute = !this.mute;
        },

        seekTo: function(seconds, allowSeekAhead){
          if(this.player) {
            this.player.seekTo(seconds, allowSeekAhead);
          }
        },
        _onPlayerReady: function(event){
          this.mute = this.mute;
          this.volume = this.volume;
          this.playbackRate = this.playbackRate;
        },
        // Internal handler to built in onPlayerStateChange event
        // Parse the data into understandable strings and call
        // the playerStateChanged property
        _onPlayerStateChange: function(event){
          this._playing = false;
          switch(event.data) {
            case -1:
              this._state = 'stopped';
              break;
            case 0:
              this._state = 'ended';
              break;
            case 1:
              this._state = 'playing';
              this._playing = true;
              break;
            case 2:
              this._state = 'paused'
              break;
            case 3:
              this._state = 'buffering'
            case 4:
              this._state = 'cued'
              break;
          }

          // Call through to user event handler if available
          if(this.playerStateChanged)
            this.playerStateChanged(this._state, event.target);
        }
      }
    });

    // Client side create hook to YouTube API ready call
    if(oj.isClient) {
      // YouTube API requires this method to be global
      window.onYouTubeIframeAPIReady = YouTubeVideo.onYouTubeIframeAPIReady = function(){
        // Inform each player the JS API is loaded
        $('.oj-YouTubeVideo').each(function(){
          this.oj.youtubeAPILoaded();
        })
      }
    }

    return {YouTubeVideo:YouTubeVideo};
  };

  // Export to OJ
  if (typeof oj != 'undefined')
    oj.use(plugin);

  return plugin;
}));
})(require.RR('/oj-youtube-video/oj.YouTubeVideo.js'),require.P,require.G,'/oj-youtube-video','oj.YouTubeVideo.js');});

F['/oj-twitter-button/oj.TwitterButton.js'] = (function(module,exports){(function(require,process,global,__dirname,__filename){
// oj.TwitterButton.js

;(function(root, factory){

  // Export to Node
  if (typeof module === 'object' && module.exports)
    module.exports = factory(root)

  // Export to RequireJS
  else if (typeof define === 'function' && define.amd)
    define(function(){return factory(root)})

  // Export to OJ
  else
    factory(root, root.oj)

}(this, function(root, oj){

  // Create plugin
  var plugin = function(oj, settings){
    if (typeof settings !== 'object')
      settings = {}

    var TwitterButton = oj.createType('TwitterButton', {

      base: oj.View,

      constructor: function(){
        var this_ = this;
        var union = oj.unionArguments(arguments);
        var options = union.options;
        var args = union.args;

        // First argument is username
        if(args.length > 0)
          this.username = args[0];

        // Shift properties
        var props = [
          'label',
          'size',
          'showCount',
          'showUsername',
          'username'
        ];
        for (var i = 0; i < props.length; i++) {
          var prop = props[i];
          if (options[prop] != null)
            this[prop] = oj.argumentShift(options, prop);
        }

        // Create el
        this.el = oj(function(){
          var size = null, tailor = null;
          if (this_.size)
            size = {'data-size':this_.size.toString()};
          if (!this_.showTailoring)
            tailor = {'data-dnt':(!this_.showTailoring).toString()};

          oj.a("Follow @" + this_.username, {
              href: 'https://twitter.com/' + this_.username.toString(),
              c:'twitter-follow-button',
              'data-show-count':this_.showCount.toString(),
              'data-show-screen-name':this_.showUsername.toString(),
              style:{display:'none'}
            },
            tailor,
            size
          );
        });

        TwitterButton.base.constructor.apply(this, [options]);

        this.loadTwitterAPI();
      },
      properties: {
        username: 'evanmoran',
        showCount: true,
        showUsername: true,
        showTailoring: true,
        size:{
          get:function(){return this._size || 'medium';},
          set:function(v){this._size = v;}
        }
      },

      methods: {
        loadTwitterAPI:function(){
          var this_ = this;
          if (oj.isClient && !TwitterButton._loaded) {
            var p=/^http:/.test(document.location)?'http':'https';
            var url = p + '://platform.twitter.com/widgets.js';
            $.ajax({
              url:url,
              cache:true,
              dataType:'script'
            // Prevents flickering for slow connections
            }).always(function(result){
              this_.$el.show()
            });
            TwitterButton._loaded = true;
          }

        }
      }
    });

    return {TwitterButton:TwitterButton};
  }

  // Export to OJ
  if (typeof oj != 'undefined')
    oj.use(plugin);

  return plugin
}));})(require.RR('/oj-twitter-button/oj.TwitterButton.js'),require.P,require.G,'/oj-twitter-button','oj.TwitterButton.js');});

F['/oj-github-button/oj.GitHubButton.js'] = (function(module,exports){(function(require,process,global,__dirname,__filename){
// oj.GitHubButton.js

;(function(root, factory){

  // Export to Node, Require.JS, or globally
  if (typeof module === 'object' && module.exports) module.exports = factory(root)
  else if (typeof define === 'function' && define.amd) define(function(){return factory(root)})
  else factory(root, root.oj)

}(this, function(root, oj){

  // Create plugin
  var plugin = function(oj, settings){
    if (typeof settings !== 'object')
      settings = {}

    var GitHubButton = oj.createType('GitHubButton', {

      base: oj.View,

      constructor: function(){
        var this_ = this;
        var union = oj.unionArguments(arguments);
        var options = union.options;
        var args = union.args;

        // Accept user as first arg
        if (args.length >= 1)
          this.user = args[0];

        // Accept repo as second arg
        if(args.length >= 2)
          this.repo = args[1];

        // Shift properties
        var props = [
          'type',
          'user',
          'repo',
          'showCount',
          'size',
          'width',
          'height'
        ];
        for (var i = 0; i < props.length; i++) {
          var prop = props[i];
          if (options[prop] != null)
            this[prop] = oj.argumentShift(options, prop);
        }

        // Create el
        this.el = oj(function(){

          // Calculate arguments to ghbts.com
          var size = '', count = '', user = '', repo = '', type = '';
          if (!this_.user)
            throw new Error('oj.GitHubButton: user is not specified');
          user = 'user=' + this_.user
          if (this_.repo)
            repo = '&repo=' + this_.repo
          if (this_.size)
            size = '&size=' + this_.size
          if (this_.showCount)
            count = '&count=' + this_.showCount
          if (this_.type)
            type = '&type=' + this_.type

          src = "http://ghbtns.com/github-btn.html?" + user + repo + type + count + size;

          oj.iframe({
            src:src,
            allowtransparency:"true",
            frameborder:"0",
            scrolling:"0",
            width:this_.width,
            height:this_.height
          });
        });

        GitHubButton.base.constructor.apply(this, [options]);
      },

      properties: {
        user: 'evanmoran',
        repo: null,
        type: { // watch, follow, fork, (star)==watch
          // Default to follow if no repro is set
          get:function(){return this._type || (this.repo == null ? 'follow' : 'watch');},
          set:function(v){
            if(!v || v == 'star')
              v = 'watch';
            this._type = v;
          }
        },
        showCount: true,
        size:{              // null or large
          get:function(){return this._size;},
          set:function(v){this._size = v;}
        },
        width:{            // pixals if specified. Otherwise is calculate from settings
          get:function(){return this._width || _widthFromType(this.type,this.showCount,this.size)},
          set:function(v){this._width = v;}
        },
        height:{           // pixals if specified. Otherwise is calculate from settings
          get:function(){return this._height || this.size == 'large' ? 30 : 20},
          set:function(v){this._height = v;}
        }
      },
    });

    return {GitHubButton:GitHubButton};
  };

  _widthFromType = function(type, showCount, size){
    w = 0;
    if (type == 'watch' && showCount == false)
      w = 62;
    else if (type == 'watch' && showCount == true)
      w = 110;
    else if (type == 'fork' && showCount == false)
      w = 53;
    else if (type == 'fork' && showCount == true)
      w = 95;
    else if (type == 'follow' && showCount == false)
      w = 132;
    else if (type == 'follow' && showCount == true)
      w = 165;
    w += size == 'large' ? 30 : 0;
  }

  // Export to OJ
  if (typeof oj != 'undefined')
    oj.use(plugin);

  return plugin;
}));

})(require.RR('/oj-github-button/oj.GitHubButton.js'),require.P,require.G,'/oj-github-button','oj.GitHubButton.js');});

F['/oj-jsfiddle/oj.JSFiddle.js'] = (function(module,exports){(function(require,process,global,__dirname,__filename){
// oj.JSFiddle.js

;(function(root, factory){

  // Export to Node, Require.JS, or globally
  if (typeof module === 'object' && module.exports) module.exports = factory(root)
  else if (typeof define === 'function' && define.amd) define(function(){return factory(root)})
  else factory(root, root.oj)

}(this, function(root, oj){

  // Create plugin
  var plugin = function(oj, settings){
    if (typeof settings !== 'object')
      settings = {}

    var JSFiddle = oj.createType('JSFiddle', {

      base: oj.View,

      constructor: function(){
        var this_ = this;
        var union = oj.unionArguments(arguments);
        var options = union.options;
        var args = union.args;

        // Shift properties
        var props = [
          'url',
          'tabs',
          'style',
          'width',
          'height'
        ];
        for (var i = 0; i < props.length; i++) {
          var prop = props[i];
          if (options[prop] != null)
            this[prop] = oj.argumentShift(options, prop);
        }

        // Accept url as first arg
        if (!this._url && args.length >= 1)
          this.url = args[0];

        // Create el
        this.el = oj(function(){

          if (!this_.url)
            throw new Error('oj.JSFiddle: url is not specified');

          var url = this_.url;

          var tabs = this_.tabs ? this_.tabs + '/' : '';

          var style = this_.style ? this_.style + '/' : '';

          // Calculate src to iframe
          var src = "http://jsfiddle.net/" + url + "/embedded/" + tabs + style;

          oj.iframe({
            src:src,
            width:this_.width,
            height:this_.height
          });
        });

        JSFiddle.base.constructor.apply(this, [options]);
      },

      properties: {
        url: {
          get:function(){
            return this._url || 'evanmoran/vhNcD';
          },
          set:function(v){
            // Strip off unecesary parts of url
            v = unprepend(v, 'http://');
            v = unprepend(v, 'jsfiddle.net')
            v = unappend(v, '/')
            this._url = v;
          }
        },
        tabs: 'result,js,html,css,resources',
        style: '',         // '' or 'presentation'
        width:{            // pixals if specified. Otherwise is calculate from settings
          get:function(){return this._width || 300},
          set:function(v){this._width = v;}
        },
        height:{           // pixals if specified. Otherwise is calculate from settings
          get:function(){return this._height || 200},
          set:function(v){this._height = v;}
        }
      },
    });

    return {JSFiddle:JSFiddle};
  };

  // Helper methods
  // ---------------------------------------------------------------------------

  function startsWith (strInput, strStart) {
    return strInput.length >= strStart.length && strInput.lastIndexOf(strStart, 0) == 0;
  }

  function endsWith (strInput, strEnd) {
    return strInput.length >= strEnd.length && strInput.lastIndexOf(strEnd, strInput.length - strEnd.length) == strInput.length - strEnd.length;
  }

  function unprepend (strInput, strStart) {
    if(startsWith(strInput, strStart))
      return strInput.slice(strStart.length);
    return strInput;
  }

  function unappend (strInput, strEnd) {
    if (endsWith(strInput, strEnd))
      return strInput.slice(0, strInput.length - strEnd.length);
    return strInput;
  }

  // Export to OJ
  if (typeof oj != 'undefined')
    oj.use(plugin);

  return plugin;
}));


})(require.RR('/oj-jsfiddle/oj.JSFiddle.js'),require.P,require.G,'/oj-jsfiddle','oj.JSFiddle.js');});

F['/oj/pages/oj.TryEditor.ojc'] = (function(module,exports){(function(require,process,global,__dirname,__filename){
(function(){with(oj.sandbox){var SCRIPT, TEXTJ, consolePadding, editorBackgroundColor, editorBorderColor, editorBorderWidth, editorPadding, lineHeight, makeCSS, maximizeDuration, phoneWidth, _arraysEqual, _calculateScripts, _escapeCode, _foundScripts, _pluginScripts, _replaceIFRAME, _scriptTagForCode, _scriptTagForCodeBody, _scriptTagWithUpdater, _updateIFRAME;

editorBorderColor = '#ffd272';

editorBackgroundColor = '#fefaf3';

editorBorderWidth = 2;

editorPadding = 4;

consolePadding = 4;

phoneWidth = 696;

maximizeDuration = 500;

lineHeight = 21;

makeCSS = null;

SCRIPT = 'scr' + 'ipt';

TEXTJ = 'text="text/javascript"';

module.exports = function(oj, settings) {
  var TryEditor;
  TryEditor = createType('TryEditor', {
    base: ModelKeyView,
    constructor: function() {
      var args, options, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6,
        _this = this;
      _ref = oj.unionArguments(arguments), options = _ref.options, args = _ref.args;
      this._editor = new AceEditor({
        c: 'oj-TryEditor-input-editor',
        theme: 'orange',
        mode: 'oj',
        fontSize: 15,
        tabSize: 2,
        behaviorsEnabled: true,
        useSoftTabs: true,
        showGutter: false,
        highlightActiveLine: false,
        showPrintMargin: false,
        readOnly: false,
        showIndentGuides: false,
        change: function() {
          return _this.editorChanged.apply(_this, arguments);
        }
      });
      this.el = oj(function() {
        return div(function() {
          div({
            c: 'oj-TryEditor-resizer'
          }, function() {
            return div({
              c: 'oj-TryEditor-gripper'
            });
          });
          div({
            c: 'oj-TryEditor-inputs'
          }, function() {
            div({
              c: 'oj-TryEditor-bar'
            }, function() {
              return div({
                c: 'oj-TryEditor-bar-states'
              }, function() {
                div({
                  c: 'oj-TryEditor-bar-state cs'
                }, 'CS', {
                  title: 'Use CoffeeScript'
                });
                return div({
                  c: 'oj-TryEditor-bar-state js selected'
                }, 'JS', {
                  title: 'Use JavaScript'
                });
              });
            });
            return _this.editor.emit();
          });
          div({
            c: 'oj-TryEditor-outputs'
          }, function() {
            div({
              c: 'oj-TryEditor-console'
            });
            iframe();
            return div({
              c: 'oj-TryEditor-bar'
            }, function() {
              return div({
                c: 'oj-TryEditor-bar-maximize',
                title: 'Maximize'
              });
            });
          });
          return div({
            c: 'oj-TryEditor-seperator'
          });
        });
      });
      this.$inputs = this.$('.oj-TryEditor-inputs');
      this.$input = this.$('.oj-TryEditor-input-editor');
      this.$outputs = this.$('.oj-TryEditor-outputs');
      this.$seperator = this.$('.oj-TryEditor-seperator');
      this.$resizer = this.$('.oj-TryEditor-resizer');
      this.$console = this.$('.oj-TryEditor-console');
      this.$gripper = this.$('.oj-TryEditor-gripper');
      this.$jsButton = this.$('.oj-TryEditor-bar-state.js');
      this.$csButton = this.$('.oj-TryEditor-bar-state.cs');
      this.$maximizeButton = this.$('.oj-TryEditor-bar-maximize');
      if (oj.isString(options.state)) {
        this.state = oj.argumentShift(options, 'state');
      }
      if (oj.isString(options.js)) {
        this.js = oj.argumentShift(options, 'js');
      }
      if (oj.isString(options.cs)) {
        this.cs = oj.argumentShift(options, 'cs');
      }
      if (args.length > 0) {
        this.value = args.join('\n');
      } else {
        this.value = (this.state === 'js' ? this.js : this.cs) || '';
      }
      if (this.value === '') {
        this.value = ' ';
        this.value = '';
      }
      this.minWidth = (_ref1 = oj.argumentShift(options, 'minWidth')) != null ? _ref1 : 400;
      this.minHeight = (_ref2 = oj.argumentShift(options, 'minHeight')) != null ? _ref2 : lineHeight * 1 + 2 * editorPadding;
      if (options.width != null) {
        this.width = oj.argumentShift(options, 'width');
      }
      if (options.height != null) {
        this.height = oj.argumentShift(options, 'height');
      }
      this.split = (_ref3 = oj.argumentShift(options, 'split')) != null ? _ref3 : 0.5;
      this.fontSize = (_ref4 = oj.argumentShift(options, 'fontSize')) != null ? _ref4 : 15;
      this.lineCount = (_ref5 = oj.argumentShift(options, 'lineCount')) != null ? _ref5 : 'fit';
      this.maximize = (_ref6 = oj.argumentShift(options, 'maximize')) != null ? _ref6 : false;
      TryEditor.base.constructor.apply(this, [options]);
      return this._bindEvents();
    },
    properties: {
      width: {
        get: function() {
          return this.$el.width();
        }
      },
      height: {
        get: function() {
          var _ref;
          return (_ref = this._height) != null ? _ref : this.minHeight;
        },
        set: function(v) {
          this._height = v;
          return this.updateFrame();
        }
      },
      fontSize: {
        get: function() {
          return this.editor.fontSize;
        },
        set: function(v) {
          this.editor.fontSize = v;
        }
      },
      lineCount: {
        get: function() {
          return this._lineCount;
        },
        set: function(v) {
          var lineCount, _ref, _ref1, _ref2, _ref3;
          this._lineCount = v;
          lineCount = 1;
          if (v === 'fit' && (this.value != null)) {
            lineCount = Math.max(((_ref = this.cs) != null ? (_ref1 = _ref.split(/\r\n|\r|\n/)) != null ? _ref1.length : void 0 : void 0) || 1, ((_ref2 = this.js) != null ? (_ref3 = _ref2.split(/\r\n|\r|\n/)) != null ? _ref3.length : void 0 : void 0) || 1);
          } else if (oj.isNumber(v)) {
            lineCount = v;
          }
          this.height = lineCount * lineHeight + editorPadding * 2 + 4;
        }
      },
      split: {
        get: function() {
          return this._split;
        },
        set: function(v) {
          this._split = v;
          return this.updateFrame();
        }
      },
      editor: {
        get: function() {
          return this._editor;
        }
      },
      value: {
        get: function() {
          var _ref;
          return (_ref = this.editor.value) != null ? _ref : '';
        },
        set: function(v) {
          if (this.state === 'cs') {
            this._cs = v;
          } else {
            this._js = v;
          }
          this.editor.value = v;
          return this.recompile();
        }
      },
      js: {
        get: function() {
          var _ref;
          return (_ref = this._js) != null ? _ref : '';
        },
        set: function(v) {
          this._js = v;
          if (this.state === 'js') {
            this.value = v;
          }
        }
      },
      cs: {
        get: function() {
          var _ref;
          return (_ref = this._cs) != null ? _ref : '';
        },
        set: function(v) {
          this._cs = v;
          if (this.state === 'cs') {
            this.value = v;
          }
        }
      },
      state: {
        get: function() {
          var _ref;
          return (_ref = this._state) != null ? _ref : 'js';
        },
        set: function(v) {
          this._state = v;
          if (v === 'js') {
            this.value = this.js;
            this.mode = 'oj';
            this.$jsButton.addClass('selected');
            return this.$csButton.removeClass('selected');
          } else {
            this.value = this.cs;
            this.mode = 'ojc';
            this.$jsButton.removeClass('selected');
            return this.$csButton.addClass('selected');
          }
        }
      },
      mode: {
        get: function() {
          return this.editor.mode;
        },
        set: function(v) {
          return this.editor.mode = v;
        }
      },
      fit: {
        get: function() {
          var _ref;
          return (_ref = this._fit) != null ? _ref : true;
        },
        set: function(v) {
          return this._fit = v;
        }
      },
      maximize: {
        get: function() {
          var _ref;
          return (_ref = this._maximize) != null ? _ref : false;
        },
        set: function(v) {
          var pos,
            _this = this;
          this._maximize = v;
          if (!this.isInserted) {
            return;
          }
          if (v) {
            pos = this.$el.offset();
            pos.top -= $(window).scrollTop();
            pos.left -= $(window).scrollLeft();
            this._prevWidth = this.width;
            this._prevHeight = this.height;
            this._prevTop = pos.top;
            this._prevLeft = pos.left;
            this._prevZIndex = this.$el.css('z-index');
            this.$el.css({
              position: 'fixed',
              top: pos.top,
              left: pos.left,
              zIndex: 1000
            });
            $('body').css({
              overflow: 'hidden'
            });
            this.$el.animate({
              top: 0,
              height: '100%'
            }, {
              progress: function() {
                return _this.height = _this.$el.height();
              },
              complete: function() {
                return _this.$el.animate({
                  left: 0,
                  width: '100%'
                }, {
                  duration: maximizeDuration
                });
              },
              duration: maximizeDuration
            });
            return this.$gripper.hide();
          } else {
            this.$el.animate({
              left: this._prevLeft,
              width: this._prevWidth
            }, {
              duration: maximizeDuration,
              complete: function() {
                return _this.$el.animate({
                  top: _this._prevTop,
                  height: _this._prevHeight
                }, {
                  progress: function() {
                    return _this.height = _this.$el.height();
                  },
                  complete: function() {
                    return _this.$el.css({
                      position: 'relative',
                      top: '',
                      left: ''
                    });
                  },
                  duration: maximizeDuration
                });
              }
            });
            this.$gripper.show();
            return $('body').css({
              overflow: 'auto'
            });
          }
        }
      },
      $inputs: null,
      $input: null,
      $outputs: null,
      $output: {
        get: function() {
          return this.$('.oj-TryEditor-outputs > iframe');
        }
      },
      $seperator: null,
      $resizer: null,
      $console: null,
      $gripper: null,
      $jsButton: null,
      $csButton: null,
      $maximizeButton: null,
      _scriptTagsLast: null
    },
    methods: {
      toggleState: function() {
        return this.state = this.state === 'js' ? 'cs' : 'js';
      },
      editorChanged: function() {
        if (this.state === 'js') {
          this._js = this.value;
        } else {
          this._cs = this.value;
        }
        return this.recompile();
      },
      valueChanged: function() {
        return TryEditor.base.valueChanged.apply(this, arguments);
      },
      windowResized: function(innerWidth, innerHeight) {
        if (this.maximize) {
          return this.height = innerHeight - editorBorderWidth * 2;
        }
      },
      updateFrame: function() {
        var h, w;
        w = this.width;
        h = this.height;
        this.$resizer.width(w);
        this.editor.height = h - editorPadding * 2;
        this.$inputs.height(h);
        this.$outputs.height(h);
        if (w >= phoneWidth || this.maximize) {
          this.$inputs.css({
            display: 'inline-block'
          });
          this.editor.width = w / 2 - editorPadding * 2;
          this.$outputs.css({
            'border-top': ''
          });
          this.$outputs.height(h);
          this.$outputs.width(w / 2);
          this.$output.width(w / 2);
          this.$output.height(h);
          this.$console.width(w / 2 - 2 * consolePadding);
          this.$console.height(h - 2 * consolePadding);
          this.$seperator.show();
          this.$seperator.height(this.height);
          this.$seperator.css('left', Math.floor(this.width * this.split));
          if (Math.abs(h - this.$resizer.height()) > 10) {
            this.$resizer.height(h);
          }
          return this.$el.height(h);
        } else {
          this.$inputs.css({
            display: 'block'
          });
          this.editor.width = w - editorPadding * 2;
          this.$outputs.width(w);
          this.$output.width(w);
          this.$output.height(h - editorPadding);
          this.$console.height(h - 2 * consolePadding);
          this.$console.width(w - 2 * consolePadding);
          this.$seperator.hide();
          this.$outputs.css({
            'border-top': "" + editorBorderWidth + "px solid " + editorBorderColor
          });
          if (Math.abs(h / 2 - this.$resizer.height()) > 10) {
            this.$resizer.height(h * 2);
          }
          return this.$el.height(h * 2);
        }
      },
      inserted: function() {
        var d,
          _this = this;
        TryEditor.base.inserted.apply(this, arguments);
        this.lineCount = this.lineCount;
        this.editor.width = this.editor.width;
        this.editor.value = this.value;
        this.editor.height = this.height;
        this.editor.mode = this.mode;
        d = maximizeDuration;
        maximizeDuration = 0;
        this.maximize = this.maximize;
        maximizeDuration = d;
        setTimeout((function() {
          return _this.value = _this.value;
        }), 350);
        return setTimeout((function() {
          return _this.updateFrame();
        }), 50);
      },
      consoleError: function(message) {
        if (this.isConstructed) {
          this.$console.html(message);
          this.$console.show();
        }
      },
      consoleSuccess: function() {
        if (this.isConstructed) {
          this.$console.hide();
        }
      },
      recompile: function() {
        var code, eCoffee, scriptTags;
        if (!this.isInserted) {
          return;
        }
        code = this.value;
        if (this.state === 'cs') {
          try {
            code = CoffeeScript.compile(code, {
              bare: true
            });
          } catch (_error) {
            eCoffee = _error;
            this.consoleError("CoffeeScript Error: " + eCoffee.message);
            return;
          }
        }
        scriptTags = _calculateScripts(code, _pluginScripts);
        if (scriptTags === this._scriptTagsLast) {
          _updateIFRAME(this.$output, code);
        } else {
          this._scriptTagsLast = scriptTags;
          _replaceIFRAME(this.$outputs, this.$output, scriptTags, code);
        }
        return this.consoleSuccess();
      },
      _bindEvents: function() {
        var _$gripper, _$resizer, _ref,
          _this = this;
        this.$jsButton.click(function() {
          return _this.state = 'js';
        });
        this.$csButton.click(function() {
          return _this.state = 'cs';
        });
        this.$maximizeButton.click(function() {
          return _this.maximize = !_this.maximize;
        });
        if (oj.isClient) {
          if ($.resize != null) {
            $.resize.throttleWindow = false;
            $.resize.delay = 100;
            $(window).resize(function() {
              return _this.windowResized(window.innerWidth, window.innerHeight);
            });
            this.$el.resize(function(e, ui) {
              return _this.updateFrame();
            });
            this.$resizer.resize(function(e, ui) {
              var h;
              h = $(e.currentTarget).height();
              if (_this.width < phoneWidth) {
                if (h / 2 > _this.minHeight) {
                  _this.height = h / 2;
                }
              } else {
                _this.height = h;
              }
              return _this.updateFrame();
            });
          }
          if (((_ref = this.$resizer) != null ? _ref.drag : void 0) != null) {
            _$resizer = this.$resizer;
            _$gripper = this.$gripper;
            return this.$resizer.drag().drag("start", function(ev, dd) {
              dd.width = $(this).width();
              dd.height = $(this).height();
              _$gripper.css({
                style: {
                  height: '100%'
                }
              });
            }).drag("end", function(ev, dd) {
              _$gripper.css({
                style: {
                  height: '12px'
                }
              });
            }).drag(function(ev, dd) {
              $(this).css({
                height: Math.max(lineHeight, dd.height + dd.deltaY)
              });
            }, {
              handle: '.oj-TryEditor-gripper'
            });
          }
        }
      }
    }
  });
  TryEditor.css({
    border: "" + editorBorderWidth + "px solid " + editorBorderColor,
    boxShadow: '2px 2px 4px RGBA(0,0,0,0.15)',
    display: 'block',
    position: 'relative',
    zIndex: 20,
    backgroundColor: '#FEFAF3',
    '.oj-TryEditor-seperator': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      backgroundColor: editorBorderColor,
      width: '2px',
      height: '1px',
      zIndex: 100
    },
    '.oj-TryEditor-resizer': {
      position: 'absolute',
      top: '-1px',
      left: '-1px',
      width: '2px',
      height: '1px'
    },
    '.oj-TryEditor-inputs': {
      display: 'inline-block',
      zIndex: 30,
      position: 'relative'
    },
    '.oj-TryEditor-input-editor': {
      resize: 'none',
      border: "" + editorPadding + "px solid " + editorBackgroundColor
    },
    '.oj-TryEditor-outputs': {
      display: 'inline-block',
      position: 'relative',
      zIndex: 40
    },
    '.oj-TryEditor-outputs > iframe': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: 'white',
      border: 'none',
      zIndex: 20
    },
    '.oj-TryEditor-console': {
      position: 'absolute',
      color: 'red',
      backgroundColor: 'RGBA(255,255,255,0.8)',
      textAlign: 'left',
      fontSize: '16px',
      padding: "" + consolePadding + "px",
      width: '100%',
      height: '100%',
      zIndex: 30,
      display: 'none'
    },
    '.oj-TryEditor-bar': {
      position: 'absolute',
      top: '0px',
      right: '0px',
      margin: '8px 4px 0 0',
      height: '21px',
      zIndex: 100
    },
    '.oj-TryEditor-example-chooser': {
      position: 'relative',
      float: 'right',
      height: '100%',
      zIndex: 10,
      marginLeft: '8px'
    },
    '.oj-TryEditor-bar-state': {
      display: 'inline-block',
      color: '#D5A876',
      width: '25px',
      height: '100%',
      float: 'right',
      marginLeft: '0px',
      zIndex: 101,
      textAlign: 'center',
      cursor: 'pointer',
      fontSize: '12px'
    },
    '.oj-TryEditor-bar-state:hover': {
      textDecoration: 'underline'
    },
    '.oj-TryEditor-bar-state.selected': {
      fontWeight: 'bold',
      color: '#E88E00',
      textDecoration: 'none !important'
    },
    '.oj-TryEditor-bar-maximize': {
      display: 'inline-block',
      backgroundImage: 'url(media/try_popout.png)',
      width: '15px',
      height: '12px',
      float: 'right',
      zIndex: 101,
      cursor: 'pointer',
      '@media only screen and (max-width: 739px)': {
        display: 'none'
      }
    },
    '.oj-TryEditor-gripper': {
      position: 'absolute',
      bottom: '2px',
      right: '2px',
      left: 'auto',
      width: '100%',
      height: '12px',
      cursor: 's-resize',
      backgroundImage: 'url(media/try_gripper.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom right',
      zIndex: 101
    }
  });
  return {
    TryEditor: TryEditor
  };
};

_pluginScripts = {
  Backbone: ["<" + SCRIPT + " src=\"scripts/underscore.js\" " + TEXTJ + "></" + SCRIPT + ">\n", "<" + SCRIPT + " src=\"scripts/backbone.js\" " + TEXTJ + "></" + SCRIPT + ">\n"],
  AceEditor: ["<" + SCRIPT + " src=\"scripts/ace/ace.js\" " + TEXTJ + "></" + SCRIPT + ">\n", "<" + SCRIPT + " src=\"scripts/oj.AceEditor.js\" " + TEXTJ + "></" + SCRIPT + ">\n"],
  VimeoVideo: ["<" + SCRIPT + " src=\"scripts/oj.VimeoVideo.js\" " + TEXTJ + "></" + SCRIPT + ">\n"],
  YouTubeVideo: ["<" + SCRIPT + " src=\"scripts/oj.YouTubeVideo.js\" " + TEXTJ + "></" + SCRIPT + ">\n"],
  GitHubButton: ["<" + SCRIPT + " src=\"scripts/oj.GitHubButton.js\" " + TEXTJ + "></" + SCRIPT + ">\n"],
  TwitterButton: ["<" + SCRIPT + " src=\"scripts/oj.TwitterButton.js\" " + TEXTJ + "></" + SCRIPT + ">\n"],
  markdown: ["<" + SCRIPT + " src=\"scripts/oj.markdown.js\" " + TEXTJ + "></" + SCRIPT + ">\n"],
  md: ["<" + SCRIPT + " src=\"scripts/oj.markdown.js\" " + TEXTJ + "></" + SCRIPT + ">\n"],
  marked: ["<" + SCRIPT + " src=\"scripts/oj.marked.js\" " + TEXTJ + "></" + SCRIPT + ">\n"],
  mustache: ["<" + SCRIPT + " src=\"scripts/oj.mustache.js\" " + TEXTJ + "></" + SCRIPT + ">\n"],
  JSFiddle: ["<" + SCRIPT + " src=\"scripts/oj.JSFiddle.js\" " + TEXTJ + "></" + SCRIPT + ">\n"]
};

_foundScripts = function(code, pluginScripts) {
  var out, plugin, v;
  out = [];
  for (plugin in pluginScripts) {
    v = pluginScripts[plugin];
    if (code.indexOf(plugin) !== -1) {
      out.push(plugin);
    }
  }
  return out.sort();
};

_arraysEqual = function(a, b) {
  var i, v, _i, _len;
  if (a === b) {
    return true;
  }
  if (a === null || b === null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (i = _i = 0, _len = a.length; _i < _len; i = ++_i) {
    v = a[i];
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

_escapeCode = function(str) {
  return str;
};

_calculateScripts = function(code, pluginScripts) {
  var foundScripts, out, plugin, s, _i, _j, _len, _len1, _ref;
  out = "";
  out += "<" + SCRIPT + " src=\"scripts/jquery.js\" " + TEXTJ + "></" + SCRIPT + ">\n";
  out += "<" + SCRIPT + " src=\"scripts/oj.js\" " + TEXTJ + "></" + SCRIPT + ">\n";
  foundScripts = _foundScripts(code, _pluginScripts);
  for (_i = 0, _len = foundScripts.length; _i < _len; _i++) {
    plugin = foundScripts[_i];
    _ref = pluginScripts[plugin];
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      s = _ref[_j];
      out += s;
    }
  }
  return out;
};

_scriptTagWithUpdater = function() {
  return "<" + SCRIPT + " class=\"updater\">\n(function(){\n  // Allow editor to rebuild iframe at will\n  var _code = null;\n  document.showError = function(err){\n    // Error style\n    var errorStyle = {style:{color:'red', fontSize:'16px', fontFamily:'sans-serif'}};\n\n    // Report error\n    $('body').oj([oj.div, errorStyle, err.toString()]);\n  };\n  document.rebuild = function(code){\n    if (code == _code)\n      return;\n    $('script.build').remove()\n    try {\n    $('head').append(\"<scr\"+\"ipt class='build'>\"+code+\"</scr\"+\"ipt>\");\n    } catch(eAppend) {\n      document.showError(eAppend);\n    }\n  };\n  // Allow dom manipulation within the iframe\n  document.oj = oj;\n  document.$ = $;\n})(this);\n</" + SCRIPT + ">";
};

_scriptTagForCodeBody = function(code) {
  return "// Start onready\noj.$(function(){try{with(oj){\n\n// Insert code into body\noj.$.ojBody(function(){\n\n" + code + "\n\n});\n\n// Handle errors\n}} catch(e) {\n  document.showError(e);\n}});";
};

_scriptTagForCode = function(code) {
  return "<" + SCRIPT + " class=\"build\">\n\n" + (_scriptTagForCodeBody(code)) + "\n\n</" + SCRIPT + ">";
};

_replaceIFRAME = function($iframeParent, $iframe, scriptTags, code) {
  var doc, html, iframe;
  html = "<head>\n" + scriptTags + "\n" + (_scriptTagWithUpdater()) + "\n" + (_scriptTagForCode(code)) + "\n</head>\n<body>\n</body>";
  $iframe.remove();
  iframe = document.createElement('iframe');
  $iframeParent.append(iframe);
  doc = iframe.contentWindow || iframe.contentDocument;
  if (doc.document) {
    doc = doc.document;
  }
  doc.open();
  doc.write(html);
  return doc.close();
};

_updateIFRAME = function($iframe, code) {
  var $body, $html, $styles, doc$, docOJ;
  if ($iframe.contents() && $iframe.contents()[0] && oj.isFunction($iframe.contents()[0].rebuild)) {
    $html = $iframe.contents().find('html');
    $body = $iframe.contents().find('body');
    doc$ = $iframe.contents()[0].$;
    $styles = doc$('style');
    $styles.each(function() {
      var $this, cls;
      $this = $(this);
      cls = $this.attr('class');
      if (oj.isString(cls) && cls.match(/^oj-.*style$/)) {
        return $this.remove();
      }
    });
    doc$('body').html('');
    $iframe.contents()[0].rebuild(_scriptTagForCodeBody(code));
    docOJ = $iframe.contents()[0].oj;
    if (typeof docOJ !== 'undefined' && typeof docOJ.TwitterButton !== 'undefined') {
      docOJ.TwitterButton._loaded = false;
    }
    if (typeof docOJ !== 'undefined' && typeof docOJ.YouTubeVideo !== 'undefined') {
      return docOJ.YouTubeVideo.onYouTubeIframeAPIReady();
    }
  }
};
}}).call(this);})(require.RR('/oj/pages/oj.TryEditor.ojc'),require.P,require.G,'/oj/pages','oj.TryEditor.ojc');});


// Native modules
F['oj'] = (function(module,exports){(function(process,global,__dirname,__filename){
//
// oj.js v0.3.1
// ojjs.org
//
// Copyright 2013, Evan Moran
// Released under the MIT License
//
// ===================================================================
// Unified templating for the people. Thirsty people.

;(function(root, factory){

  // CommonJS export for Node
  if (typeof module === 'object' && module.exports) {
    try {$ = require('jquery')} catch (e){}
    module.exports = factory(root, $)

  // AMD export for RequireJS
  }

  else if (typeof define === 'function' && define.amd)
    define(['jquery'], function($){return factory(root, $) })

  // Global export for client side
  else
    root.oj = factory(root, (root.jQuery || root.Zepto || root.ender || root.$))

}(this, function(root, $){

  var ArrP = Array.prototype,
    FunP = Function.prototype,
    ObjP = Object.prototype,
    slice = ArrP.slice,
    unshift = ArrP.unshift,
    concat = ArrP.concat,
    pass = function(v){return v},
    _udf = 'undefined'

  // oj function: highest level of capture for tag functions
  function oj(){
    return oj.tag.apply(this, ['oj'].concat(slice.call(arguments)).concat([{__quiet__:1}]))
  }

  // Version
  oj.version = '0.3.1'

  // Configuration settings
  oj.settings = {
    defaultThemes: null
  }

  oj.isClient = !(typeof process !== _udf && process !== null ? process.versions != null ? process.versions.node : 0 : 0)

  // Detect jQuery globally or in required module
  if (typeof $ != _udf)
    oj.$ = $

  // Reference ourselves for template files to see
  oj.oj = oj

  // oj.load: load the page specified generating necessary html, css, and client side events
  oj.load = function(page, data){
    // Defer dom manipulation until the page is ready
    return oj.$(function(){
      // Load through require and passing through template data
      var ojml = function(){require(page).call(data, data)}
      oj.$.ojBody(ojml)

      // Trigger events bound through onload
      return oj.onload()
    })
  }

  // oj.onload: Enlist in onload action or run them.
  var _onLoadQueue = {queue: [], loaded: false}
  oj.onload = function(f){
    // Call everything if no arguments
    if (oj.isUndefined(f)){
      _onLoadQueue.loaded = true
      while ((f = _onLoadQueue.queue.shift()))
        f()
    }
    // Call load if already loaded
    else if (_onLoadQueue.loaded)
      f()
    // Queue function for later
    else
      _onLoadQueue.queue.push(f)
  }

  // oj.emit: Used by plugins to group multiple elements as if it is a single tag.
  oj.emit = function(){return oj.tag.apply(oj, ['oj'].concat(slice.call(arguments)))}

  // Type Helpers
  oj.isDefined = function(a){return typeof a !== _udf}
  oj.isOJ = function(obj){return !!(obj != null ? obj.isOJ : void 0)}
  oj.isOJType = function(a){return oj.isOJ(a) && a.type === a}
  oj.isOJInstance = function(a){return oj.isOJ(a) && !oj.isOJType(a)}
  oj.isEvented = function(a){return !!(a && a.on && a.off && a.trigger)}
  oj.isDOM = function(a){return !!(a && (a.nodeType != null))}
  oj.isDOMElement = function(a){return !!(a && a.nodeType === 1)}
  oj.isDOMAttribute = function(a){return !!(a && a.nodeType === 2)}
  oj.isDOMText = function(a){return !!(a && a.nodeType === 3)}
  oj.isjQuery = function(a){return !!(a && a.jquery)}
  oj.isUndefined = function(a){return a === void 0}
  oj.isBoolean = function(a){return a === true || a === false || ObjP.toString.call(a) === '[object Boolean]'}
  oj.isNumber = function(a){return !!(a === 0 || (a && a.toExponential && a.toFixed))}
  oj.isString = function(a){return !!(a === '' || (a && a.charCodeAt && a.substr))}
  oj.isDate = function(a){return !!(a && a.getTimezoneOffset && a.setUTCFullYear)}
  oj.isPlainObject = function(a){return oj.$.isPlainObject(a) && !oj.isOJ(a)}
  oj.isFunction = oj.$.isFunction
  oj.isArray = oj.$.isArray
  oj.isRegEx = function(a){return ObjP.toString.call(a) === '[object RegExp]'}
  oj.isArguments = function(a){return ObjP.toString.call(a) === '[object Arguments]'}
  oj.parse = function(str){
    var n, o = str
    if (str === _udf)
      o = void 0
    else if (str === 'null')
      o = null
    else if (str === 'true')
      o = true
    else if (str === 'false')
      o = false
    else if (!isNaN(n = parseFloat(str)))
      o = n
    return o
  }

  // unionArguments: Union arguments into options and args
  oj.unionArguments = function(argList){
    var options = {}, args = [], v, ix = 0
    for (; ix < argList.length; ix++){
      v = argList[ix]
      if (oj.isPlainObject(v))
        options = _extend(options, v)
      else
        args.push(v)
    }
    return {options: options, args: args}
  }

  // argumentShift: Shift argument out of options with key
  oj.argumentShift = function(options, key){
    var value
    if ((oj.isPlainObject(options)) && (key != null) && (options[key] != null)){
      value = options[key]
      delete options[key]
    }
    return value
  }

  // Utility Helpers
  var _keys = Object.keys,
    _extend = oj.$.extend

  function _isCapitalLetter(c){return !!(c.match(/[A-Z]/))}

  function _has(obj, key){return ObjP.hasOwnProperty.call(obj, key)}

  function _values(obj){
    var keys = _keys(obj),
      len = keys.length,
      values = new Array(len),
      i = 0
    for (; i < len; i++)
      values[i] = obj[keys[i]]
    return values
  }

  function _toArray(obj){
    if (!obj)
      return []
    if (oj.isArray(obj))
      return slice.call(obj)
    if (oj.isArguments(obj))
      return slice.call(obj)
    if (obj.toArray && oj.isFunction(obj.toArray))
      return obj.toArray()
    return _values(obj)
  }

  function _isEmpty(o){
    if (oj.isArray(o))
      return o.length === 0
    for (var k in o)
      if (_has(o, k))
        return false
    return true
  }

  function _clone(o){
    if (!(oj.isArray(o) || oj.isPlainObject(o)))
      return o
    if (oj.isArray(o))
      return o.slice()
    else
      return _extend({}, o)
  }

  // _setObject(obj, k1, k2, ..., value):
  // Set object deeply key by key ensure each part is an object
  function _setObject(obj){
    var args = arguments,
      o = obj,
      len = args.length,
      // keys are args ix: 1 to n-2
      keys = 3 <= len ? slice.call(args, 1, len = len - 1) : (len = 1, []),
      // value is last arg
      value = args[len++],
      ix, k

    for (ix = 0; ix < keys.length; ix++){
      k = keys[ix]

      // Initialize key to empty object if necessary
      if (typeof o[k] !== 'object')
        o[k] = {}

      // Set final value if this is the last key
      if (ix === keys.length - 1)
        o[k] = value
      else
        // Continue deeper
        o = o[k]
    }
    return obj
  }

  // uniqueSort:
  function uniqueSort(arr, isSorted){
    if (isSorted == null)
      isSorted = false

    if (!isSorted)
      arr.sort()

    var out = [], ix, item
    for (ix = 0; ix < arr.length; ix++){
      item = arr[ix]
      if (ix > 0 && arr[ix - 1] === arr[ix])
        continue
      out.push(item)
    }
    return out
  }

  // _d(args...): initialization helper that returns first arg that isn't null
  function _d(){
    for (var ix = 0;ix < arguments.length; ix++)
      if (arguments[ix] != null)
        return arguments[ix]
    return null
  }

  // _e: error by throwing msg with optional fn name
  function _e(fn, msg){
    msg = _d(msg, fn, '')
    fn = _d(fn, 0)
    var pfx = "oj: "
    if (fn)
      pfx = "oj." + fn + ": "
    throw new Error(pfx + msg)
  }

  // _a: assert when cond is false with msg and with optional fn name
  function _a(cond, fn, msg){if (!cond) _e(fn,msg)}

  // _v: validate argument n with fn name and message
  function _v(fn, n, v, type){
    n = {1:'first',2:'second',3: 'third', 4: 'fourth'}[n]
    _a(!type || (typeof v === type), fn, "" + type + " expected for " + n + " argument")
  }

  // _splitAndTrim: Split string by seperator and trim result
  function _splitAndTrim(str, seperator, limit){
    return str.split(seperator, limit).map(function(v){
      return v.trim()
    })
  }

  // _decamelize: Convert from camal case to underscore case
  function _decamelize(str){return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()}

  // _dasherize: Convert from camal case or space seperated to dashes
  function _dasherize(str){return _decamelize(str).replace(/[ _]/g, '-')}

  // oj.addMethod: add multiple methods to an object
  oj.addMethods = function(obj, mapNameToMethod){
    for (var methodName in mapNameToMethod)
      oj.addMethod(obj, methodName, mapNameToMethod[methodName])
  }

  // oj.addMethod: Add method to object with name and fn
  oj.addMethod = function(obj, name, fn){
    _v('addMethod', 2, name, 'string')
    _v('addMethod', 3, fn, 'function')
    // Methods are non-enumerable, non-writable properties
    Object.defineProperty(obj, name, {
      value: fn,
      enumerable: false,
      writable: false,
      configurable: true
    })
  }

  // oj.removeMethod: Remove a method with name from an object
  oj.removeMethod = function(obj, name){
    _v('removeMethod', 2, name, 'string')
    delete obj[name]
  }

  // oj.addProperties: add multiple properties to an object
  // Properties can be specified by get/set methods or by a value
  // Optionally you can include writable or enumerable settings
  oj.addProperties = function(obj, mapNameToInfo){

    // Iterate over properties
    var propInfo, propName

    for (propName in mapNameToInfo){
      propInfo = mapNameToInfo[propName]

      // Wrap the value if propInfo is not already a prop definition
      if (((propInfo != null ? propInfo.get : void 0) == null) &&
          ((propInfo != null ? propInfo.value : void 0) == null))
        propInfo = {value: propInfo, writable: true}

      oj.addProperty(obj, propName, propInfo)
    }
  }

  // oj.addProperty: Add property to object with name and info
  oj.addProperty = function(obj, name, info){
    _v('addProperty', 2, name, 'string')
    _v('addProperty', 3, info, 'object')

    // Default properties to enumerable and configurable
    info = _extend({enumerable: true, configurable: true}, info)

    // Remove property if it already exists
    if (Object.getOwnPropertyDescriptor(obj, name) != null)
      oj.removeProperty(obj, name)

    // Add the property
    Object.defineProperty(obj, name, info)
  }

  // oj.removeProperty: remove property from object with name
  oj.removeProperty = function(obj, name){
    _v('removeProperty', 2, name, 'string')
    delete obj[name]
  }

  // oj.isProperty: Determine property in object is a get/set property
  oj.isProperty = function(obj, name){
    _v('isProperty', 2, name, 'string')
    return Object.getOwnPropertyDescriptor(obj, name).get != null
  }

  // oj.copyProperty: Copy source.propName to dest.propName
  oj.copyProperty = function(dest, source, propName){
    var info = Object.getOwnPropertyDescriptor(source, propName)
    info = _d(info, {value: [], enumerable: false, writable: true, configurable: true })
    if (info.value != null)
      info.value = _clone(info.value)
    return Object.defineProperty(dest, propName, info)
  }

  // _argsStack: Abstraction to wrap global arguments stack.
  // This makes me sad but it is necessary for div -> syntax
  var _argsStack = []

  // Access the top of the stack
  oj._argsTop = function(){
    if (_argsStack.length)
      return _argsStack[_argsStack.length - 1]
    else
      return null
  }

  // Push scope onto arguments
  oj._argsPush = function(args){
    _argsStack.push(_d(args,[]))
  }

  // Pop scope from arguments
  oj._argsPop = function(){
    if (_argsStack.length)
      return _argsStack.pop()
    return null
  }

  // Append argument
  oj._argsAppend = function(arg){
    var top = oj._argsTop()
    if (top != null)
      top.push(arg)
  }

  // oj.tag (name, attributes, rest...)
  oj.tag = function(name){
    _v('tag', 1, name, 'string')

    var rest = 2 <= arguments.length ? slice.call(arguments, 1) : [],
      u = oj.unionArguments(rest),
      args = u.args,
      attributes = u.options,
      isQuiet = attributes.__quiet__,
      arg, len, r, ix,
      // Build ojml starting with tag
      ojml = [name]

    if (isQuiet)
      delete attributes.__quiet__

    // Add attributes to ojml if they exist
    if (!_isEmpty(attributes))
      ojml.push(attributes)

    // Store current tag context
    oj._argsPush(ojml)

    // Loop over attributes
    for (ix = 0; ix < args.length; ix++){
      arg = args[ix]

      if (oj.isPlainObject(arg))
        continue

      else if (oj.isFunction(arg)){
        len = oj._argsTop().length

        // Call the fn tags will append to oj._argsTop
        r = arg()

        // Use return value instead if oj._argsTop didn't change
        if (len === oj._argsTop().length && (r != null))
          oj._argsAppend(r)

      } else
        oj._argsAppend(arg)
    }

    // Restore previous tag context
    oj._argsPop()

    // Append the final result to your parent's arguments
    // if there exists an argument to append to.
    // Do not emit when quiet is set,
    if (!isQuiet)
      oj._argsAppend(ojml)

    return ojml
  }

  // Define all elements as closed or open
  oj.tag.elements = {
    closed: 'a abbr acronym address applet article aside audio b bdo big blockquote body button canvas caption center cite code colgroup command datalist dd del details dfn dir div dl dt em embed fieldset figcaption figure font footer form frameset h1 h2 h3 h4 h5 h6 head header hgroup html i iframe ins keygen kbd label legend li map mark menu meter nav noframes noscript object ol optgroup option output p pre progress q rp rt ruby s samp script section select small source span strike strong style sub summary sup table tbody td textarea tfoot th thead time title tr tt u ul var video wbr xmp'.split(' '),
    open: 'area base br col command css !DOCTYPE embed hr img input keygen link meta param source track wbr'.split(' ')
  }

  // Keep track of all valid elements
  oj.tag.elements.all = (oj.tag.elements.closed.concat(oj.tag.elements.open)).sort()

  // tag.isClosed: Determine if an element is closed or open
  oj.tag.isClosed = function(tag){return oj.tag.elements.open.indexOf(tag) === -1}

  // _setTagName: Record tag name on a given tag function
  function _setTagName(tag, name){if (tag != null) tag.tagName = name }

  // _getTagName: Get a tag name on a given tag function
  function _getTagName(tag){return tag.tagName}

  // _getQuietTagName: Get quiet tag name
  function _getQuietTagName(tag){return '_' + tag}

  // _setInstanceOnElement: Record an oj instance on a given element
  function _setInstanceOnElement(el, inst){if (el != null) el.oj = inst}

  // _getInstanceOnElement: Get a oj instance on a given element
  function _getInstanceOnElement(el){
    if ((el != null ? el.oj : 0) != null)
      return el.oj
    else
      return null
  }

  // Create tag methods for all elements
  for (var ix = 0; ix < oj.tag.elements.all.length; ix++){
    t = oj.tag.elements.all[ix]
    ;(function(t){
      // Define tag function named t
      oj[t] = function(){return oj.tag.apply(oj, [t].concat(slice.call(arguments)))}

      // Quiet tag functions do not emit
      // Define quiet tag function named qt
      var qt = _getQuietTagName(t)
      oj[qt] = function(){return oj.tag.apply(oj, [t, {__quiet__: 1 }].concat(slice.call(arguments)))}

      // Tag functions remember their name so the OJML syntax can use the function
      _setTagName(oj[t], t)
      _setTagName(oj[qt], t)
    })(t)
  }

  // oj.doctype: Method to define doctypes based on short names

  var dhp = 'HTML PUBLIC "-//W3C//DTD HTML 4.01',
  w3 = '"http://www.w3.org/TR/html4/',
  strict5 = 'html',
  strict4 = dhp + '//EN" ' + w3 + 'strict.dtd"',
  _doctypes = {
    '5': strict5,
    'HTML 5': strict5,
    '4': strict4,
    'HTML 4.01 Strict': strict4,
    'HTML 4.01 Frameset': dhp + ' Frameset//EN" ' + w3 + 'frameset.dtd"',
    'HTML 4.01 Transitional': dhp + ' Transitional//EN" ' + w3 + 'loose.dtd"'
  }

  // Define the method passing through to !DOCTYPE tag function
  oj.doctype = function(typeOrValue){
    typeOrValue = _d(typeOrValue,'5')
    return oj['!DOCTYPE'](_d(_doctypes[typeOrValue], typeOrValue))
  }

  // oj.extendInto (context): Extend all OJ methods into a context.
  // Defaults to root, which is either `global` or `window`

  // Methods that start with _ are not extended
  oj.useGlobally = oj.extendInto = function(context){
    context = _d(context,root)

    var o = {}, k, qn, v

    // For all keys and values in oj
    for (k in oj){
      v = oj[k]

      // Extend into new object
      if (k[0] !== '_' && k !== 'extendInto' && k !== 'useGlobally'){
        o[k] = v

        // Export _tag and _Type methods
        qn = _getQuietTagName(k)
        if (oj[qn])
          o[qn] = oj[qn]
      }
    }
    _extend(context, o)
  }

  // oj.compile(options, ojml)
  // ---
  // Compile ojml into meaningful parts
  // options:
  // * html - Compile to html
  // * dom - Compile to dom
  // * css - Compile to css
  // * cssMap - Record css as a javascript object
  // * styles -- Output css as style tags
  // * minify - Minify js and css
  // * ignore:{html:1} - Map of tags to ignore while compiling

  oj.compile = function(options, ojml){
    // Options is optional
    ojml = _d(ojml, options)

    var css, cssMap, dom, html,

    // Default options to compile everything
    options = _extend({html:1, dom:0, css:0, cssMap:0, minify:0, ignore:{}}, options),

    // Init accumulator
    acc = _clone(options)

    acc.html = options.html ? [] : null
    acc.dom = options.dom && (typeof document !== "undefined" && document !== null) ? document.createElement('OJ') : null
    acc.css = options.css || options.cssMap ? {} : null
    acc.indent = ''
    acc.data = options.data

    // Accumulate insert events per element
    acc.inserts = []

    if (options.dom)
      acc.types = []

    acc.tags = {}

    // Always ignore oj and css tags
    _extend(options.ignore, {oj:1, css:1})

    // Recursive compile to accumulator
    _compileAny(ojml, acc)

    // Flatten CSS
    if (acc.css != null)
      cssMap = _flattenCSSMap(acc.css)

    // Generate css if necessary
    if (options.css)
      css = _cssFromPluginObject(cssMap, {minify: options.minify, tags: 0})

    // Output cssMap if necessary
    if (!options.cssMap)
      cssMap = undefined

    // Generate HTML if necessary
    if (options.html)
      html = acc.html.join('')

    // Generate dom if necessary
    if (options.dom){

      // Remove the <oj> wrapping from the dom element
      dom = acc.dom.childNodes

      // Cleanup inconsistencies of childNodes
      if (dom.length != null){
        // Make dom a real array
        dom = _toArray(dom)

        // Filter out anything that isn't a dom element
        dom = dom.filter(function(v){return oj.isDOM(v)})
      }

      // Ensure dom is null if empty
      if (dom.length === 0)
        dom = null

      // Single elements are not returned as a list
      else if (dom.length === 1)
        // Reasoning: The common cases don't have multiple elements
        // <html>,<body>, etc and this is abstracted for you anyway
        // with jQuery plugins
        dom = dom[0]
    }
    return {
      html: html,
      dom: dom,
      css: css,
      cssMap: cssMap,
      types: acc.types,
      tags: acc.tags,
      inserts: acc.inserts
    }
  }

  // _styleFromObject: Convert object to style string
  function _styleFromObject(obj, options){
    options = _extend({
      inline: true,
      indent: ''
    }, options)

    // Trailing semi should only exist on when we aren't indenting
    options.semi = !options.inline

    var out = "",

    // Sort keys to create consistent output
    keys = _keys(obj).sort(),

    // Support indention and inlining
    indent = options.indent != null ? options.indent : '',
    newline = options.inline ? '' : '\n',
    ix, k, kFancy, semi

    for (ix = 0; ix < keys.length; ix++){
      kFancy = keys[ix]

      // Add semi if it is not inline or it is not the last key
      semi = options.semi || ix !== keys.length - 1 ? ";" : ''

      // Allow keys to be camal case
      k = _dasherize(kFancy)

      // Collect css result for this key
      out += "" + indent + k + ":" + obj[kFancy] + semi + newline
    }
    return out
  }

  // _attributesFromObject: Convert object to attribute string with no special conversions
  function _attributesFromObject(obj){
    if (!oj.isPlainObject(obj))
      return obj

    // Pass through non objects
    var k, v, ix,
      out = '',
      space = '',
      // Serialize attributes in order for consistent output
      attrs = _keys(obj).sort()

    for (ix = 0; ix < attrs.length; ix++){
      k = attrs[ix]
      v = obj[k]

      // Boolean attributes have no value
      if (v === true)
        out += "" + space + k

      // Other attributes have a value
      else
        out += "" + space + k + "=\"" + v + "\""

      space = ' '
    }
    return out
  }

  // _flattenCSSMap: Take an OJ cssMap and flatten it into the form
  // `'plugin' -> '@media query' -> 'selector' ->'rulesMap'`
  //
  // This method vastly simplifies `_cssFromPluginObject`
  // Nested, media, and comma definitions are resolved and merged
  function _flattenCSSMap(cssMap){
    var flatMap = {}, plugin, cssMap_
    for (plugin in cssMap){
      cssMap_ = cssMap[plugin]
      _flattenCSSMap_(cssMap_, flatMap, [''], [''], plugin)
    }
    return flatMap
  }

  // Recursive helper with accumulators (it outputs flatMapAcc)
  function _flattenCSSMap_(cssMap, flatMapAcc, selectorsAcc, mediasAcc, plugin){

    // Built in media helpers
    var acc, cur, inner, isMedia, mediaJoined, mediasNext, next, outer, parts, rules, selector, selectorJoined, selectorsNext, o, i,

    medias = {
      'widescreen': 'only screen and (min-width: 1200px)',
      'monitor': '',
      'tablet': 'only screen and (min-width: 768px) and (max-width: 959px)',
      'phone': 'only screen and (max-width: 767px)'
    }

    for (selector in cssMap){
      rules = cssMap[selector]

      // Base Case: Record our selector when `rules` is a value
      if (typeof rules !== 'object'){

        // Join selectors and media accumulators with commas
        selectorJoined = selectorsAcc.sort().join(',')
        mediaJoined = mediasAcc.sort().join(',')

        // Prepend @media as that was removed previously when spliting into parts
        if (mediaJoined !== '')
          mediaJoined = "@media " + mediaJoined

        // Record the rule deeply in `flatMapAcc`
        _setObject(flatMapAcc, plugin, mediaJoined, selectorJoined, selector, rules)
      // Recursive Case: Recurse on `rules` when it is an object
      } else {

        // (r1) Media Query found: Generate the next media queries
        if (selector.indexOf('@media') === 0){
          isMedia = true
          mediasNext = next = []
          selectorsNext = selectorsAcc
          selector = (selector.slice('@media'.length)).trim()
          acc = mediasAcc

        // (r2) Selector found: Generate the next selectors
        } else {
          isMedia = false
          selectorsNext = next = []
          mediasNext = mediasAcc
          acc = selectorsAcc
        }

        // Media queries and Selectors can be comma seperated
        parts = _splitAndTrim(selector, ',')

        // Media queries have convience substitutions like 'phone', 'tablet'
        if (isMedia){
          parts = parts.map(function(v){
            return _d(medias[v], v)
          })
        }

        // Determine the next selectors or media queries
        for (o = 0; o < acc.length; o++){
          outer = acc[o]

          for (i = 0; i < parts.length; i++){
            inner = parts[i]

            // When `&` is not present just insert in front with the correct join operator
            cur = inner
            if ((inner.indexOf('&')) === -1 && outer !== '')
              cur = (isMedia ? '& and ' : '& ') + cur

            next.push(cur.replace(/&/g, outer))
          }
        }

        // Recurse through objects after calculating the next selectors
        _flattenCSSMap_(
          rules, flatMapAcc, selectorsNext, mediasNext, plugin
        )
      }
    }
  }

  // _styleClassFromPlugin: Abstract plugin <style> naming
  function _styleClassFromPlugin(plugin){return "" + plugin + "-style"}

  // _styleTagFromMediaObject: Abstract creating <style> tag
  oj._styleTagFromMediaObject = function(plugin, mediaMap, options){
    var newline = (options != null ? options.minify : void 0) ? '' : '\n',
      css = _cssFromMediaObject(mediaMap, options)
    return "<style class=\"" + (_styleClassFromPlugin(plugin)) + "\">" + newline + css + "</style>"
  }

  // _cssFromMediaObject: Convert css from a flattened mediaMap rule object.
  // The rule object is of the form:
  // mediaQuery => selector => rulesObject
  function _cssFromMediaObject(mediaMap, options){
    options = _d(options, {})

    var indent, indentRule, media, rules, selector, selectorMap, space, styles,

      minify = options.minify != null ? options.minify : 0,
      tags = options.tags != null ? options.tags : 0,

      // Deterine what output characters are needed
      newline = minify ? '' : '\n',
      space = minify ? '' : ' ',
      inline = minify,
      css = ''

    // Build css for media => selector =>  rules
    for (media in mediaMap){
      selectorMap = mediaMap[media]

      // Serialize media query
      if (media){
        media = media.replace(/,/g, "," + space)
        css += "" + media + space + "{" + newline
      }

      for (selector in selectorMap){
        styles = selectorMap[selector]
        indent = (!minify) && media ? '\t' : ''

        // Serialize selector
        selector = selector.replace(/,/g, "," + newline)
        css += "" + indent + selector + space + "{" + newline

        // Serialize style rules
        indentRule = !minify ? indent + '\t' : indent
        rules = _styleFromObject(styles, {
          inline: inline,
          indent: indentRule
        })
        css += rules + indent + '}' + newline
      }

      // End media query
      if (media !== '')
        css += '}' + newline

    }
    try {
      css = oj._minifyCSS(css, options)
    } catch (e){
      throw new Error("css minification error: " + e.message + "\nCould not minify:\n" + css)
    }
    return css
  }

  // _cssFromPluginObject: Convert flattened css selectors and rules to a string
  // pluginMaps are of the form:
  // pluginName => mediaQuery => selector => rulesObject
  // minify:false will output newlines
  // tags:true will output the css in `<style>` tags

  function _cssFromPluginObject(flatCSSMap, options){
    options = _d(options, {})

    var mediaMap, plugin,
      minify = options.minify != null ? options.minify : 0,
      tags = options.tags != null ? options.tags : 0,
      // Deterine what output characters are needed
      newline = minify ? '' : '\n',
      space = minify ? '' : ' ',
      inline = minify,
      css = ''

    for (plugin in flatCSSMap){
      mediaMap = flatCSSMap[plugin]
      if (tags)
        css += "<style class=\"" + plugin + "-style\">" + newline

      // Serialize CSS with potential minification
      css += _cssFromMediaObject(mediaMap, options)
      if (tags)
        css += "" + newline + "</style>" + newline
    }
    return css
  }

  // _compileDeeper: Recursive helper for compiling that wraps indention
  function _compileDeeper(method, ojml, options){
    var i = options.indent
    options.indent += '\t'
    method(ojml, options)
    options.indent = i
  }

  // _compileAny Recursive helper for compiling ojml or any type
  function _compileAny(any, options){
    // Array
    if (oj.isArray(any))
      _compileTag(any, options)

    // String
    else if (oj.isString(any)){
      if (options.html != null)
        options.html.push(any)

      if (any.length > 0 && any[0] === '<'){
        var root = document.createElement('div')
        root.innerHTML = any
        if (options.dom != null)
          options.dom.appendChild(root)
      } else {
        if (options.dom != null)
          options.dom.appendChild(document.createTextNode(any))
      }

    // Boolean or Number
    } else if (oj.isBoolean(any) || oj.isNumber(any)){
      if (options.html != null)
        options.html.push("" + any)

      if (options.dom != null)
        options.dom.appendChild(document.createTextNode("" + any))

    // Function
    } else if (oj.isFunction(any)){

      // Wrap function call to allow full oj generation within any
      var data = options.data || {};
      _compileAny(oj(function(){any.call(data, data)}), options);

    // Date
    } else if (oj.isDate(any)){
      if (options.html != null)
        options.html.push("" + (any.toLocaleString()))

      if (options.dom != null)
        options.dom.appendChild(document.createTextNode("" + (any.toLocaleString())))

    // OJ Type or Instance
    } else if (oj.isOJ(any)){
      if (options.types != null)
        options.types.push(any)

      if (options.html != null)
        options.html.push(any.toHTML(options))

      if (options.dom != null)
        options.dom.appendChild(any.toDOM(options))

      if (options.css != null)
        _extend(options.css, any.toCSSMap(options))
    }
    // Do nothing for: null, undefined, object
  }


  // _compileTag: Recursive helper for compiling ojml tags
  function _compileTag(ojml, options){

    // Empty list compiles to undefined
    if (ojml.length === 0) return

    // The first part of ojml is the tag
    var tag = ojml[0],
      tagType = typeof tag,
      u = oj.unionArguments(ojml.slice(1)),
      attributes = u.options,
      children = u.args,
      styles,
      selector

    // Allow the tag parameter to be 'table' (string) or oj.table (function) or oj.Table (object)
    if ((tagType === 'function' || tagType === 'object'))
      tag = _d(_getTagName(tag), tag)

    // Fail if no tag found
    if (!(oj.isString(tag) && tag.length > 0))
      _e('compile', 'tag name is missing')

    // Record tag as encountered
    options.tags[tag] = true

    // Instance oj object if tag is capitalized
    if (_isCapitalLetter(tag[0]))
      return _compileDeeper(_compileAny, new oj[tag](ojml.slice(1)), options)

    // Compile to css if requested
    if (options.css && tag === 'css'){

      // Extend options.css with rules
      for (selector in attributes){
        styles = attributes[selector]
        options.css['oj'] = _d(options.css['oj'], {})
        options.css['oj'][selector] = _d(options.css['oj'][selector], {})
        _extend(options.css['oj'][selector], styles)
      }
    }

    // Compile DOCTYPE as special case because it is not really an element
    // It has attributes with spaces and cannot be created by dom manipulation
    // In this way it is HTML generation only.

    if (tag === '!DOCTYPE'){
      _v('compile', 1, ojml[1], 'string')
      if (!options.ignore[tag]){
        if (options.html)
          options.html.push("<" + tag + " " + ojml[1] + ">")
        // options.dom is purposely ignored
      }
      return
    }
    if (!options.ignore[tag]){
      var events = _attributesProcessedForOJ(attributes), el

      // Compile to dom if requested
      // Add dom element with attributes
      if (options.dom && (typeof document !== _udf && document !== null)){

        // Create element
        el = document.createElement(tag)

        // Add self to parent
        if (oj.isDOMElement(options.dom))
          options.dom.appendChild(el)

        // Push ourselves on the dom stack (to handle children)
        options.dom = el

        // Set attributes in sorted order for consistency
        if (oj.isPlainObject(attributes)){
          var keys = _keys(attributes).sort(), ix, attrName, attrValue
          for (ix = 0; ix < keys.length; ix++){
            attrName = keys[ix]
            attrValue = attributes[attrName]

            // Boolean attributes have no value
            if (attrValue === true)
              el.setAttributeNode(document.createAttribute(attrName))
            else
              el.setAttribute(attrName, attrValue)
          }
        }

        // Bind events
        _attributesBindEventsToDOM(events, el, options.inserts)
      }

      // Compile to html if requested
      // Add tag with attributes
      if (options.html){
        var attr = _d(_attributesFromObject(attributes), ''),
          space = attr === '' ? '' : ' '
        options.html.push("<" + tag + space + attr + ">")
        // Recurse through children if this tag isn't ignored deeply
      }
    }
    if (options.ignore[tag] !== 'deep'){
      for (ix = 0; ix < children.length; ix++){
        var child = children[ix]
        // Skip indention if there is only one child
        if (options.html != null && !options.minify && children.length > 1)
          options.html.push("\n\t" + options.indent)
        _compileDeeper(_compileAny, child, options)
      }
    }

    // Skip indention if there is only one child
    if (options.html != null && !options.minify && children.length > 1)
      options.html.push("\n" + options.indent)

    // End html tag if you have children or your tag closes
    if (!options.ignore[tag]){

      // Close tag if html
      if (options.html != null && (children.length > 0 || oj.tag.isClosed(tag)))
        options.html.push("</" + tag + ">")

      // Pop ourselves if dom
      if (options.dom)
        options.dom = options.dom.parentNode
    }
  }

  // _attributesProcessedForOJ: Process attributes to make them easier to use
  function _attributesProcessedForOJ(attr){
    var jqEvents = {bind:1, on:1, off:1, live:1, blur:1, change:1, click:1, dblclick:1, focus:1, focusin:1, focusout:1, hover:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseenter:1, mouseleave:1, mousemove:1, mouseout:1, mouseup:1, ready:1, resize:1, scroll:1, select:1, insert:1},
    events, k, v

    // Allow attributes to alias c to class and use arrays instead of space seperated strings
    // Convert to c and class from arrays to strings
    if (oj.isArray(attr != null ? attr.c : void 0))
      attr.c = attr.c.join(' ')

    if (oj.isArray(attr != null ? attr["class"] : void 0))
      attr["class"] = attr["class"].join(' ')

    // Move c to class
    if ((attr != null ? attr.c : void 0) != null){
      if ((attr != null ? attr["class"] : void 0) != null)
        attr["class"] += ' ' + attr.c
      else
        attr["class"] = attr.c
      delete attr.c
    }

    // Allow attributes to take style as an object
    if (oj.isPlainObject(attr != null ? attr.style : void 0)){
      attr.style = _styleFromObject(attr.style, {
        inline: true
      })
    }

    // Omit attributes with values of false, null, or undefined
    if (oj.isPlainObject(attr)){
      for (k in attr){
        v = attr[k]
        if (v === null || v === void 0 || v === false)
          delete attr[k]
      }
    }

    // Filter out jquery events
    events = {}
    if (oj.isPlainObject(attr)){

      // Filter out attributes that are jquery events
      for (k in attr){
        v = attr[k]

        // If this attribute (k) is an event
        if (jqEvents[k] != null){
          events[k] = v
          delete attr[k]
        }
      }
    }

    // Returns bindable events
    return events
  }

  // Bind events to dom
  function _attributesBindEventsToDOM(events, el, inserts){
    var ek, ev, _results = []
    for (ek in events){
      ev = events[ek]
      _a(oj.$ != null, "jquery is missing when binding a '" + ek + "' event")
      // accumulate insert events manually since DOMNodeInserted is slow and depreciated
      if (ek == 'insert' && inserts)
        inserts.push(function(){ev.call(el,el)})
      else if (oj.isArray(ev))
        _results.push(oj.$(el)[ek].apply(this, ev))
      else
        _results.push(oj.$(el)[ek](ev))
    }
    return _results
  }

  // oj.toHTML: Compile directly to HTML only
  oj.toHTML = function(options, ojml){

    // Options is optional
    if (!oj.isPlainObject(options)){
      ojml = options
      options = {}
    }

    // Create html only
    _extend(options, {dom: 0, js: 0, html: 1, css: 0})
    return (oj.compile(options, ojml)).html
  }

  // oj.toCSS: Compile directly to CSS only
  oj.toCSS = function(options, ojml){
    // Options is optional
    if (!oj.isPlainObject(options)){
      ojml = options
      options = {}
    }
    // Create css only
    _extend(options, {dom: 0, js: 0, html: 0, css: 1})
    return (oj.compile(options, ojml)).css
  }

  // _inherit: Inherit Child from Parent
  // Based on, but sadly incompatable with, coffeescript inheritance
  function _inherit(Child, Parent){
    var Ctor, prop

    // Copy class properties and methods
    for (prop in Parent)
      oj.copyProperty(Child, Parent, prop)

    Ctor = function(){}
    Ctor.prototype = Parent.prototype
    Child.prototype = new Ctor()

    // Provide easy access for base class methods
    // Example: Parent.base.methodName(arguments...)
    Child.base = Child.__super__ = Parent.prototype
  }

  // _construct(Type, arg1, arg2, ...): Construct type as if using call
  function _construct(Type){
    return new (FunP.bind.apply(Type, arguments))
  }

  // oj.createType: Create OJ type with args object supporting:
  // base, constructor, properties, and methods
  oj.createType = function(name, args){

    args = _d(args, {})
    args.methods = _d(args.methods, {})
    args.properties = _d(args.properties, {})

    _v('createType', 1, name, 'string')
    _v('createType', 2, args, 'object')

    var methodKeys, propKeys, typeProps,

      // When auto newing you need to delay construct the properties
      // or they will be constructed twice.
      delay = '__DELAYED__',

      // Constructor to return
      Out = new Function("return function " + name + "(){\n  var _t = this;\n  if ( !(this instanceof " + name + ") ){\n    _t = new " + name + "('" + delay + "');\n    _t.__autonew__ = true;\n  }\n\n  if (arguments && arguments[0] != '" + delay + "')\n    " + name + ".prototype.constructor.apply(_t, arguments);\n\n  return _t;\n}")()

    // Default the constructor to call its base
    if (args.base != null && (args.constructor == null || (!args.hasOwnProperty('constructor')))){
      args.constructor = function(){
        return Out.base != null ?  Out.base.constructor.apply(this, arguments) : void 0
      }
    }

    // Inherit if necessary
    if (args.base != null)
      _inherit(Out, args.base)

    // Add the constructor as a method
    oj.addMethod(Out.prototype, 'constructor', args.constructor)

    // Mark new type and its instances with a non-enumerable type and isOJ properties
    typeProps = {
      type: {
        value: Out,
        writable: false,
        enumerable: false
      },
      typeName: {
        value: name,
        writable: false,
        enumerable: false
      },
      isOJ: {
        value: true,
        writable: false,
        enumerable: false
      }
    }
    oj.addProperties(Out, typeProps)
    oj.addProperties(Out.prototype, typeProps)

    // Add properties all oj Types have
    propKeys = (_keys(args.properties)).sort()
    if (Out.prototype.properties != null)
      propKeys = uniqueSort(Out.prototype.properties.concat(propKeys))

    oj.addProperty(Out.prototype, 'properties', {
      value: propKeys,
      writable: false,
      enumerable: false
    })

    // Add methods helper to instance
    methodKeys = (_keys(args.methods)).sort()
    if (Out.prototype.methods != null)
      methodKeys = uniqueSort(Out.prototype.methods.concat(methodKeys))

    oj.addProperty(Out.prototype, 'methods', {
      value: methodKeys,
      writable: false,
      enumerable: false
    })

    // Add methods all oj Types have
    _extend(args.methods, {

      // get: Get property by key or get all properties
      get: function(k){
        // get specific property
        if (oj.isString(k)){
          if (this.has(k))
            return this[k]
        // get all properties
        } else {
          var out = {}, ix, p
          for (ix = 0; ix < this.properties.length; ix++){
            p = this.properties[ix]
            out[p] = this[p]
          }
          return out
        }
      },

      // set: Set property by key, or set all properties with object
      set: function(k, v){
        var key, obj = k, value

        // Optionally take key, value instead of object
        if (!oj.isPlainObject(k)){
          obj = {}
          obj[k] = v
        }

        // Set all keys that are valid properties
        for (key in obj){
          value = obj[key]
          if (this.has(key)){
            this[key] = value
          }
        }
      },

      // has: Determine if property exists
      has: function(k){return this.properties.some(function(v){return v === k})},

      // can: Determine if method exists
      can: function(k){return this.methods.some(function(v){return v === k})},

      // toJSON: Use properties to generate json
      toJSON: function(){
        var json = {},
          prop,
          ix = 0
        for (;ix < this.properties.length; ix++){
          prop = this.properties[ix]
          json[prop] = this[prop]
        }
        return json
      }
    })

    // Add methods
    oj.addMethods(Out.prototype, args.methods)

    // Add the properties
    oj.addProperties(Out.prototype, args.properties)
    return Out
  }

  // _createQuietType: Takes an OJ Type and creates the _Type that doesn't emit
  _createQuietType = function(typeName){
    return oj[_getQuietTagName(typeName)] = function(){
      return _construct.apply(null, [oj[typeName]].concat(slice.call(arguments), [{
        __quiet__: 1
      }]))
    }
  }

  // oj.createEnum
  oj.createEnum = function(name, args){_e('createEnum', 'NYI')}

  // View
  var View = oj.createType('View', {

    // Views are special objects map properties together. This is a union of arguments
    // With the remaining arguments becoming a list
    constructor: function(){
      _a(oj.isDOM(this.el), this.typeName, 'constructor did not set this.el')

      // Set instance on @el
      _setInstanceOnElement(this.el, this)

      var u = oj.unionArguments(arguments),
        options = u.options,
        args = u.args

      // Emit as a tag if it isn't quiet or used new keyword
      if (this.__autonew__ && !options.__quiet__)
        this.emit()

      // Remove quiet flag as it has served its purpose
      if (options.__quiet__ != null)
        delete options.__quiet__

      // Add class oj-typeName
      this.$el.addClass("oj-" + this.typeName)

      // Set default themes if setting is set
      if(oj.settings.defaultThemes)
        this.themes = oj.settings.defaultThemes

      // Views automatically set all options to their properties
      // arguments directly to properties
      this.set(options)

      // Remove options that were set
      options = _clone(options)
      this.properties.forEach(function(v){return delete options[v]})

      // Views pass through remaining options to be attributes on the root element
      // This can include jquery events and interpreted arguments
      this.addAttributes(options)

      // Record if view is fully constructed
      return this._isConstructed = true
    },
    properties: {
      // The element backing the View
      el: {
        get: function(){return this._el},
        set: function(v){
          // Set the element directly if this is a dom element
          if (oj.isDOMElement(v)){
            this._el = v
            // Clear cache of $el
            this._$el = null
          } else {
            // Generate the dom element
            this._el = oj.compile({dom:1, css:0, cssMap:0, html:0}, v).dom
          }
        }
      },

      // Get and cache jquery-enabled element (readonly)
      $el: {
        get: function(){
          return this._$el != null ? this._$el : (this._$el = oj.$(this.el))
        }
      },

      // Get and set id attribute of view
      id: {
        get: function(){return this.$el.attr('id')},
        set: function(v){return this.$el.attr('id', v)}
      },
      // class:
      // get: -> @$el.attr 'class'
      // set: (v) ->
      //   # Join arrays with spaces
      //   if oj.isArray v
      //     v = v.join ' '
      //   @$el.attr 'class', v
      //   return
      // Alias for classes
      // c:
      // get: -> @class
      // set: (v) -> @class = v; return
      // Get all currently set attributes (readonly)

      attributes: {
        get: function(){
          var out = {}
          slice.call(this.el.attributes).forEach(function(attr){
            return out[attr.name] = attr.value
          })
          return out
        }
      },

      // Get all classes as an array (readwrite)
      classes: {
        get: function(){return this.$el.attr('class').split(/\s+/)},
        set: function(v){this.$el.attr('class', v.join(' '))}
      },

      // Get / set all currently set themes (readwrite)
      themes: {
        get: function(){
          var thms = [],
            prefix = 'theme-',
            ix = 0,
            cls
          for (; ix < this.classes.length; ix++){
            cls = this.classes[ix]
            if (cls.indexOf(prefix) === 0)
              thms.push(cls.slice(prefix.length))
          }
          return thms
        },
        set: function(v){
          if (!oj.isArray(v))
            v = [v]
          this.clearThemes()
          var theme, ix = 0
          for (;ix < v.length; ix++){
            theme = v[ix]
            this.addTheme(theme)
          }
        }
      },
      theme: {
        get: function(){return this.themes},
        set: function(v){this.themes = v}
      },

      // Determine if this view has been fully constructed (readonly)
      isConstructed: {get: function(){return _d(this._isConstructed, false)}},

      // Determine if this view has been fully inserted (readonly)
      isInserted: {get: function(){return _d(this._isInserted, false)}}
    },
    methods: {

      // $: Find element from within root
      $: function(){return this.$el.find.apply(this.$el, arguments)},

      // addAttribute: Add a single attribute
      addAttribute: function(name, value){
        var attr = {}
        attr[name] = value
        this.addAttributes(attr)
      },

      // addAttributes: Add attributes and apply the oj magic with jquery binding
      addAttributes: function(attributes){
        var attr = _clone(attributes),
          events = _attributesProcessedForOJ(attr),
          k, v

        // Add attributes as object
        if (oj.isPlainObject(attr)){
          for (k in attr){
            v = attr[k]
            if (k === 'class')
              this.addClass(v)
            else if (v === true)
              // Boolean attributes have no value
              this.el.setAttributeNode(document.createAttribute(k))
            else
              // Otherwise add it normally
              this.$el.attr(k, v)
          }
        }

        // Bind events
        if (events != null)
          _attributesBindEventsToDOM(events, this.el)
      },

      // Remove a single attribute
      removeAttribute: function(name){this.$el.removeAttr(name)},

      // Remove multiple attributes
      removeAttributes: function(list){var _t = this; list.forEach(function(v){_t.removeAttribute(v)})},

      // Add a single class
      addClass: function(name){this.$el.addClass(name)},

      // Remove a single class
      removeClass: function(name){this.$el.removeClass(name)},

      // Determine if class is applied
      hasClass: function(name){return this.$el.hasClass(name)},

      // Add a single theme
      addTheme: function(name){this.addClass("theme-" + name)},

      // Remove a single theme
      removeTheme: function(name){this.removeClass("theme-" + name)},

      // Determine if theme is applied
      hasTheme: function(name){return this.hasClass("theme-" + name)},

      // Clear all themes
      clearThemes: function(){var _t = this; this.themes.forEach(function(t){_t.removeTheme(t)}) },

      // emit: Emit instance as a tag function would do
      emit: function(){oj._argsAppend(this)},

      // Convert View to html
      toHTML: function(options){
        return this.el.outerHTML + ((options != null ? options.minify : void 0) ? '' : '\n')
      },

      // Convert View to dom (for compiling)
      toDOM: function(){return this.el},

      // Convert
      toCSS: function(options){
        return _cssFromPluginObject(_flattenCSSMap(this.cssMap), _extend({}, {
          minify: options.minify,
          tags: 0
        }))
      },

      // Convert
      toCSSMap: function(){return this.type.cssMap},

      // Convert View to string (for debugging)
      toString: function(){return this.toHTML()},

      // detach: -> throw 'detach nyi'
      // The implementation is to set el manipulate it, and remember how to set it back

      // attach: -> throw 'attach nyi'
      // The implementation is to unset el from detach
      // inserted is called the instance is inserted in the dom (override)

      inserted: function(){return this._isInserted = true}
    }
  })

  // View.cssMap: remember css for this View
  View.cssMap = {}

  // View.css: set view's css with css object mapping, or raw css string
  View.css = function(css){
    _a(oj.isString(css) || oj.isPlainObject(css), this.typeName, 'object or string expected for first argument')

    var cssMap, _base, _base1, _name, _name1, _ref2, _ref3

    if (oj.isString(css)){
      if ((_ref2 = (_base = this.cssMap)[_name = "oj-" + this.typeName]) == null){
        _base[_name] = ""
      }
      this.cssMap["oj-" + this.typeName] += css
    } else {
      if ((_ref3 = (_base1 = this.cssMap)[_name1 = "oj-" + this.typeName]) == null){
        _base1[_name1] = {}
      }
      cssMap = _setObject({}, ".oj-" + this.typeName, css)
      _extend(this.cssMap["oj-" + this.typeName], cssMap)
    }
  }

  // View.themes: Remember themes for this View
  View.themes = []

  // View.theme: create a View specific theme with css object mapping
  View.theme = function(name, css){
    _v(this.typeName, 1, name, 'string')
    _v(this.typeName, 2, css, 'object')

    // Calculate styleName
    var dashName = _dasherize(name),
      styleName = "oj-" + this.typeName,

      // Wrap css in plugin name
      cssMap = _setObject({}, ".oj-" + this.typeName + ".theme-" + dashName, css)

    // Extend into this views cssMap
      this.cssMap[styleName] = _d(this.cssMap[styleName], {})
      _extend(this.cssMap["oj-" + this.typeName], cssMap)

    // Remember the theme item
    this.themes.push(dashName)
    this.themes = uniqueSort(this.themes)
  }

  // CollectionView: Inheritable base type that enables two-way collection binding
  var CollectionView = oj.createType('CollectionView', {
    base: View,
    constructor: function(options){
      if ((options != null ? options.each : void 0) != null)
        this.each = oj.argumentShift(options, 'each')

      if ((options != null ? options.models : void 0) != null)
        this.models = oj.argumentShift(options, 'models')

      CollectionView.base.constructor.apply(this, arguments)

      // Once everything is constructed call make precisely once.
      return this.make()
    },
    properties: {
      each: {
        get: function(){return this._each},
        set: function(v){
          this._each = v
          if (this.isConstructed)
            this.make()
        }
      },
      collection: {
        get: function(){return this.models},
        set: function(v){return this.models = v}
      },
      models: {
        get: function(){return this._models},
        set: function(v){
          // Unbind events if collection
          if (oj.isFunction(this._models != null ? this._models.off : void 0))
            this._models.off('add remove change reset destroy', null, this)

          this._models = v

          // Bind events if collection
          if (oj.isFunction(this._models != null ? this._models.on : void 0)){
            this._models.on('add', this.collectionModelAdded, this)
            this._models.on('remove', this.collectionModelRemoved, this)
            this._models.on('change', this.collectionModelChanged, this)
            this._models.on('destroy', this.collectionModelDestroyed, this)
            this._models.on('reset', this.collectionReset, this)
          }
          if (this.isConstructed)
            this.make()
        }
      }
    },
    methods: {

      // Override make to create your view
      make: function(){_e(this.typeName, '`make` method not implemented by custom view')},

      // Override these events to minimally update on change
      collectionModelAdded: function(mod, cols){return this.make()},
      collectionModelRemoved: function(mod, cols, opt){return this.make()},
      collectionModelChanged: function(mod, cols, opt){},
      collectionModelDestroyed: function(cols, opt){return this.make()},
      collectionReset: function(cols, opt){return this.make()}
    }
  })

  // ModelView: Inheritable base type that enables two-way model binding
  var ModelView = oj.createType('ModelView', {
    base: View,
    constructor: function(options){
      if ((options != null ? options.value : void 0) != null)
        this.value = oj.argumentShift(options, 'value')

      if ((options != null ? options.model : void 0) != null)
        this.model = oj.argumentShift(options, 'model')

      return ModelView.base.constructor.apply(this, arguments)
    },
    properties: {
      model: {
        get: function(){
          return this._model
        },
        set: function(v){
          // Unbind events on the old model
          if (oj.isEvented(this._model))
            this._model.off('change', null, this)

          this._model = v

          // Bind events on the new model
          if (oj.isEvented(this._model))
            this._model.on('change', this.modelChanged, this)

          // Trigger change manually when settings new model
          this.modelChanged()
        }
      }
    },
    methods: {

      // Override modelChanged if you don't want a full remake
      modelChanged: function(){
        var _t = this
        return this.$el.oj(function(){
          return _t.make(_t.mode)
        })
      },
      make: function(model){
        return _e(this.typeName, '`make` method not implemented by custom view')
      }
    }
  })

  // ModelViewView: Inheritable base type that enables two-way model binding to a specific key
  var ModelKeyView = oj.createType('ModelKeyView', {

    // Inherit ModelView to handle model and bindings
    base: ModelView,
    constructor: function(options){

      if ((options != null ? options.key : void 0) != null)
        this.key = oj.argumentShift(options, 'key')

      // Call super to bind model and value
      return ModelKeyView.base.constructor.apply(this, arguments)
    },
    properties: {
      // Key used to access model
      key: null,

      // Override this property and call this.viewChanged when appropriate
      value: {
        get: function(){_e(this.typeName, 'value getter not implemented')},
        set: function(v){_e(this.typeName, 'value setter not implemented')}
      }
    },

    methods: {

      // modelChanged: called by model binding code to
      // automatically set this.value when the model changes
      modelChanged: function(){
        if ((this.model != null) && (this.key != null)){
          // Update the view if necessary
          if (!this._viewUpdatedModel)
            this.value = this.model.get(this.key)
        }
      },

      // viewChanged: Will set the model whenever this.value is set
      viewChanged: function(){
        var _t = this

        // Briefly delay view changes because they often change before
        // the controls visually update
        setTimeout((function(){
          if ((_t.model != null) && (_t.key != null)){
            // Ensure view changes aren't triggered twice
            _t._viewUpdatedModel = true
            _t.model.set(_t.key, _t.value)
            _t._viewUpdatedModel = false
          }
        }), 10)
      }
    }
  })

  // TextBox
  var TextBox = oj.createType('TextBox', {
    base: ModelKeyView,
    constructor: function(){
      var _t = this,
        u = oj.unionArguments(arguments),
        options = u.options,
        args = u.args

      this.el = oj(function(){
        oj.input({type: 'text'}, {
          // When live changes are set indicate change on every keypress
          // Delay change events slighty as value is visually updated after key presses
          keydown: function(){
            if (_t.live)
              setTimeout((function(){return _t.$el.change()}), 10)
          },
          keyup: function(){
            if (_t.live)
              setTimeout((function(){return _t.$el.change()}), 10)
          },
          change: function(){_t.viewChanged()}
        })
      })

      // Value can be set by argument
      if (args.length > 0)
        this.value = args[0]

      // Set live if it exists
      if ((options != null ? options.live : void 0) != null)
        this.live = oj.argumentShift(options, 'live')

      return TextBox.base.constructor.apply(this, [options])
    },
    properties: {
      value: {
        get: function(){
          var v = this.el.value
          if ((v == null) || v === _udf)
            v = ''
          return v
        },
        set: function(v){this.el.value = v}
      },

      // Live update model as text changes
      live: true
    }
  })

  // CheckBox
  var CheckBox = oj.createType('CheckBox', {
    base: ModelKeyView,
    constructor: function(){
      var _t = this,
        u = oj.unionArguments(arguments),
        options = u.options,
        args = u.args

      this.el = oj(function(){
        oj.input({type: 'checkbox'}, {
          change: function(){_t.viewChanged()}
        })
      })

      // Value can be set by argument
      if (args.length > 0)
        this.value = args[0]

      return CheckBox.base.constructor.call(this, options)
    },
    properties: {
      value: {
        get: function(){return this.el.checked},
        set: function(v){
          this.el.checked = v = !!v
          if (v)
            this.$el.attr('checked', 'checked')
          else
            this.$el.removeAttr('checked')
        }
      }
    }
  })

  // Text
  var Text = oj.createType('Text', {
    base: ModelKeyView,
    constructor: function(){
      var _t = this,
        u = oj.unionArguments(arguments),
        options = u.options,
        args = u.args

      // Get tag name if provided
      this._tagName = oj.argumentShift(options, 'tagName')

      // Create element with tagName
      this.el = oj(function(){
        return oj[_t.tagName]()
      })

      // Value can be set by argument
      if (args.length > 0)
        this.value = args[0]

      return Text.base.constructor.call(this, options)
    },

    properties: {
      // value: text value of this object (readwrite)
      value: {
        get: function(){return this.$el.ojValue()},
        set: function(v){this.$el.oj(v)}
      },

      // tagName: name of root tag (writeonce)
      tagName: {get: function(){return _d(this._tagName, 'div')}}
    }
  })

  // TextArea
  var TextArea = oj.createType('TextArea', {
    base: ModelKeyView,
    constructor: function(){
      var _t = this,
        u = oj.unionArguments(arguments),
        options = u.options,
        args = u.args

      this.el = oj(function(){
        return oj.textarea({
          // When live changes are set indicate change on every keypress
          // Delay change events slighty as value is visually updated after key presses
          keydown: function(){
            if (_t.live)
              setTimeout((function(){return _t.$el.change()}), 10)
          },
          keyup: function(){
            if (_t.live)
              setTimeout((function(){return _t.$el.change()}), 10)
          },
          change: function(){
            _t.viewChanged()
          }
        })
      })

      // Value can be set by argument
      this.value = oj.argumentShift(options, 'value') || args.join('\n')
      return TextArea.base.constructor.call(this, options)
    },
    properties: {
      value: {
        get: function(){return this.el.value},
        set: function(v){this.el.value = v}
      },

      // Live update model as text changes
      live: true
    }
  })

  // ListBox
  var ListBox = oj.createType('ListBox', {
    base: ModelKeyView,
    constructor: function(){
      var _t = this,
        u = oj.unionArguments(arguments),
        options = u.options,
        args = u.args

      this.el = oj(function(){
        return oj.select({
          change: function(){_t.viewChanged()}
        })
      })

      // @options is a list of elements
      this.options = oj.argumentShift(options, 'options')

      // Value can be set by argument
      if (args.length > 0)
        this.value = args[0]

      return ListBox.base.constructor.apply(this, [options])
    },
    properties: {
      value: {
        get: function(){
          return this.$el.val()
        },
        set: function(v){
          this.$el.val(v)
        }
      },
      options: {
        get: function(){
          return this._options
        },
        set: function(v){
          if (!oj.isArray(v)){
            throw new Error("oj." + this.typeName + ".options array is missing")
          }
          this._options = v
          this.$el.oj(function(){
            var op, _j, _len1

            for (_j = 0, _len1 = v.length; _j < _len1; _j++){
              op = v[_j]
              oj.option(op)
            }
          })
        }
      }
    }
  })

  // Button
  var Button = oj.createType('Button', {
    base: View,
    constructor: function(){
      var _t = this,
      u = oj.unionArguments(arguments),
      options = u.options,
      args = u.args,

      // Label is first argument
      title = ''
      if (args.length > 0)
        title = args[0]

      // Label is specified as option
      if (options.title != null)
        title = oj.argumentShift(options, 'title')

      // Create element
      this.el = oj(function(){oj.button(title)})

      Button.base.constructor.apply(this, [options])
      this.title = title
    },
    properties: {
      title: {
        get: function(){return _d(this._title, '')},
        set: function(v){this.$el.oj((this._title = v))}
      }
    },
    methods: {
      click: function(){
        if (arguments.length > 0)
          return this.$el.click.apply(this.$el, arguments)
        else
          return this.$el.click()
      }
    }
  })

  // Image
  var Image = oj.createType('Image', {
    base: View,
    constructor: function(){
      this.el = oj(function(){oj.img()})
      Image.base.constructor.apply(this, arguments)
    },
    properties: {
      height: {
        get: function(){return this._height},
        set: function(v){this._height = v; this.$el.attr('height', v)}
      },
      width: {
        get: function(){return this._width},
        set: function(v){this._width = v; this.$el.attr('width', v)}
      },
      alt: {
        get: function(){return this._alt},
        set: function(v){this._alt = v; this.$el.attr('alt', v)}
      },
      src: {
        get: function(){return this._src},
        set: function(v){this._src = v; this.$el.attr('src', v)}
      }
    },
    methods: {
    }
  })

  // List: List control with two-way collection binding
  var List = oj.createType('List', {
    base: CollectionView,
    constructor: function(){
      var _t = this,
        u = oj.unionArguments(arguments),
        options = u.options,
        args = u.args,
        items

      // tagName is write-once
      this._tagName = oj.argumentShift(options, 'tagName')
      this.itemTagName = oj.argumentShift(options, 'itemTagName')

      // Create the root element
      this.el = oj(function(){return oj[_t.tagName]()})

      // Use el if it was passed in
      if (options.el != null)
        this.el = oj.argumentShift(options, 'el')

      // Default @each function to pass through values
      if (options.each == null){
        options.each = function(model){
          if (oj.isString(model) || oj.isNumber(model) || oj.isBoolean(model))
            return model
          else
            return JSON.stringify(model)
        }
      }

      // Args have been handled so don't pass them on
      List.base.constructor.apply(this, [options])

      // Set @items to options or args if they exist
      items = args.length > 0 ? args : null
      return this.items = options.items != null ? oj.argumentShift(options, 'items') : items
    },

    properties: {
      // items: get or set all items at once (readwrite)
      items: {
        get: function(){
          // Found in cache
          if (this._items != null)
            return this._items
          // Retrieve the types directly
          else
            return this.$items.ojValues()
        },
        set: function(v){
          this._items = v
          this.make()
        }
      },
      count: {get: function(){return this.$items.length}},

      // tagName: name of root tag (writeonce)
      tagName: {get: function(){return _d(this._tagName, 'div')}},

      // itemTagName: name of item tags (readwrite)
      itemTagName: {
        get: function(){return _d(this._itemTagName, 'div')},
        set: function(v){this._itemTagName = v; this.make()}
      },

      // $items: list of `<li>` elements (readonly)
      $items: {
        get: function(){
          // Get from cache or cache the recalculated list
          return this._$items != null ? this._$items : this._$items = this.$el.children()
        }
      }
    },

    methods: {
      // item: get or set item value at item ix
      item: function(ix, ojml){
        ix = this._bound(ix, this.count, ".item: index")
        if (ojml != null) {
          if(typeof ojml == 'object' && ojml.isListItem)
            this.$item(ix).ojReplaceWith(ojml)
          else
            this.$item(ix).oj(ojml)
          this.itemsChanged()
        }
        else
          return this.$item(ix).ojValue()
      },

      // $item: `<li>` element for a given item ix. The tag name may change.
      $item: function(ix){return this.$items.eq(this._bound(ix, this.count, ".$item: index"))},

      // make: Remake view from model data using each
      make: function(){
        // Do nothing until fully constructed
        if (!this.isConstructed) return

        // Some properties call make before construction completes
        var _t = this, ix, model, models, views, out

        // Convert models to views using each
        if (this.models != null && this.each != null){
          // Get list of models from collection or array
          models = oj.isEvented(this.models) ? this.models.models : this.models
          // Add view item for every model
          views = models.map(function(model){return _t._itemFromModel(model)})

        // Items are already views so just use them
        } else if (this.items != null) {
          views = this.items
        }

        // Render the views
        this.$el.oj(function(){return views.map(function(view){_t._itemElFromItem(view)}) })

        // Indicate to CollectionView the items changed
        this.itemsChanged()
      },

      // collectionModelAdded: Model add occurred, add the item
      collectionModelAdded: function(m, c){this.add(c.indexOf(m), this._itemFromModel(m))},

      // collectionModelRemoved: Model remove occured, delete the item
      collectionModelRemoved: function(m, c, o){this.remove(o.index)},

      // collectionModelRemoved: Model reset occured, full rebuild
      collectionReset: function(){this.make()},

      // Helper Methods
      // _itemFromModel: Helper to map model to item
      _itemFromModel: function(model){
        var _t = this
        if(oj.isOJType(_t.each))
          return new _t.each(model)
        return oj(function(){return _t.each(model)})
      },

      // _itemElFromItem: Helper to create itemTagName wrapped item
      _itemElFromItem: function(item){
        // Wrap with itemTagName unless the item is itself a listItem
        if (item && typeof item.isListItem == 'boolean')
          item.emit()
        else
          return oj[this.itemTagName](item)
      },

      // _bound: Bound index to allow negatives, throw when out of range
      _bound: function(ix, count, message){
        var ixNew = ix < 0 ? ix + count : ix
        if (!(0 <= ixNew && ixNew < count))
          _e(this.typeName, message + " is out of bounds (" + ix + " in [0," + (count - 1) + "])")
        return ixNew
      },

      // itemsChanged: Model changed occured, clear relevant cached values
      itemsChanged: function(){this._items = null; this._$items = null},

      // Manipulation Methods
      add: function(ix, ojml){
        // ix defaults to -1 and is optional
        if (ojml == null){
          ojml = ix
          ix = -1
        }

        ix = this._bound(ix, this.count + 1, ".add: index")

        var _t = this,
          tag = this.itemTagName

        // Empty
        if (this.count === 0)
          this.$el.oj(function(){_t._itemElFromItem(ojml)})

        // Last
        else if (ix === this.count)
          this.$item(ix - 1).ojAfter(function(){return _t._itemElFromItem(ojml)})

        // Not last
        else
          this.$item(ix).ojBefore(function(){return _t._itemElFromItem(ojml)})

        this.itemsChanged()
      },

      remove: function(ix){
        ix = _d(ix,-1)
        ix = this._bound(ix, this.count, ".remove: index")
        var out = this.item(ix)
        this.$item(ix).remove()
        this.itemsChanged()
        return out
      },

      move: function(ixFrom, ixTo){
        ixTo = _d(ixTo, -1)
        if (ixFrom === ixTo)
          return
        ixFrom = this._bound(ixFrom, this.count, ".move: fromIndex")
        ixTo = this._bound(ixTo, this.count, ".move: toIndex")
        if (ixTo > ixFrom)
          this.$item(ixFrom).insertAfter(this.$item(ixTo))
        else
          this.$item(ixFrom).insertBefore(this.$item(ixTo))
        this.itemsChanged()
      },
      swap: function(ix1, ix2){
        if (ix1 === ix2)
          return
        ix1 = this._bound(ix1, this.count, ".swap: firstIndex")
        ix2 = this._bound(ix2, this.count, ".swap: secondIndex")
        if (Math.abs(ix1 - ix2) === 1)
          this.move(ix1, ix2)
        else {
          var ixMin = Math.min(ix1, ix2),
            ixMax = Math.max(ix1, ix2)
          this.move(ixMax, ixMin)
          this.move(ixMin + 1, ixMax)
        }
        this.itemsChanged()
      },
      unshift: function(v){this.add(0, v)},
      shift: function(){return this.remove(0)},
      push: function(v){this.add(this.count, v)},
      pop: function(){return this.remove(-1)},
      clear: function(){this.$items.remove(); this.itemsChanged()}
    }
  })


  // oj.NumberList: NumberList is a `List` specialized with `<ol>` and `<li>` tags
  var NumberList = oj.createType('NumberList', {
    base: List,
    constructor: function(){
      var args = [{tagName:'ol', itemTagName:'li'}].concat(slice.call(arguments))
      return NumberList.base.constructor.apply(this, args)
    }
  })

  // oj.BulletList: BulletList is a `List` specialized with `<ul>` and `<li>` tags
  var BulletList = oj.createType('BulletList', {
    base: List,
    constructor: function(){
      var args = [{tagName:'ul', itemTagName:'li'}].concat(slice.call(arguments))
      return BulletList.base.constructor.apply(this, args)
    }
  })

  // oj.Table
  var Table = oj.createType('Table', {
    base: CollectionView,
    constructor: function(){
      var _t = this,
        u = oj.unionArguments(arguments),
        options = u.options,
        args = u.args,
        rows, ix

      // Generate root
      this.el = oj(function(){return oj.table()})

      // Use el if it was passed in
      if (options.el != null)
        this.el = oj.argumentShift(options, 'el')

      // Default @each function to pass through values
      if (options.each == null){
        options.each = function(model, cell){
          var values = (oj.isString(model)) || (oj.isNumber(model)) || (oj.isBoolean(model)) ? [model] : (oj.isEvented(model)) && typeof model.attributes === 'object' ? _values(model.attributes) : _values(model)
          return values.map(function(v){cell(v)})
        }
      }

      // Args have been handled so don't pass them on
      Table.base.constructor.apply(this, [options])

      // Validate args as arrays
      for(ix = 0; ix < args.length; ix++)
        _a(oj.isArray(args[ix]), 'Table', 'array expected for row arguments')

      // Set @rows to options or args if they exist
      rows = _d(oj.argumentShift(options, 'rows'), args)
      if (rows.length > 0)
        return this.rows = rows
    },
    properties: {

      // rowCount: The number of rows (readonly)
      rowCount: {get: function(){return this.$trs.length}},

      // columnCount: The number of columns (readonly)
      columnCount: {get: function(){
        // The number of columns is number of `<tr>` in rows, header, or footer
        var tflen, thlen, trlen
        if ((trlen = this.$tr(0).find('> td').length) > 0)
          return trlen
        else if ((thlen = this.$theadTR.find('> th').length) > 0)
          return thlen
        else if ((tflen = this.$tfootTR.find('> td').length) > 0)
          return tflen
        return 0
      }},

      // rows: Row values as a list of lists as interpreted by ojValue plugin (readwrite)
      rows: {
        get: function(){
          // Get cached result
          if (this._rows != null)
            return this._rows

          // Calculate rows by mapping from td to ojValue
          var r, rx = 0
          this._rows = []
          for (; rx < this.rowCount; rx++){
            r = this.$tdsRow(rx).toArray().map(function(el){return $(el).ojValue()})
            this._rows.push(r)
          }
          return this._rows
        },
        set: function(list){
          if (!((list != null) && list.length > 0))
            return this.clearBody()
          this._rows = list
          this.make()
        }
      },

      // header: Array of header values as interpreted by ojValue plugin (readwrite)
      header: {
        get: function(){return this.$theadTR.find('> th').ojValues()},
        set: function(list){
          _a(oj.isArray(list), this.typeName + '.header', 'array expected for first argument')

          if (!((list != null) && list.length > 0))
            return this.clearHeader()

          return this.$theadTRMake.oj(function(){
            return list.map(function(ojml){oj.th(ojml)})
          })
        }
      },

      // footer: Array of footer values as interpreted by ojValue plugin (readwrite)
      footer: {
        get: function(){
          return this.$tfootTR.find('> td').ojValues()
        },
        set: function(list){
          var _t = this

          if (!oj.isArray(list)){
            throw new Error('oj.Table.footer: array expected for first argument')
          }
          if (!((list != null) && list.length > 0)){
            return this.clearFooter()
          }
          return this.$tfootTRMake.oj(function(){
            var ojml, _j, _len1, _results

            _results = []
            for (_j = 0, _len1 = list.length; _j < _len1; _j++){
              ojml = list[_j]
              _results.push(oj.td(ojml))
            }
            return _results
          })
        }
      },

      // caption: The table caption (readwrite)
      caption: {
        get: function(){return this.$caption.ojValue()},
        set: function(v){this.$captionMake.oj(v)}
      },

      // Element accessors
      $table: {get: function(){return this.$el}},
      $caption: {get: function(){return this.$('> caption')}},
      $colgroup: {get: function(){return this.$('> colgroup')}},
      $thead: {get: function(){return this.$('> thead')}},
      $tfoot: {get: function(){return this.$('> tfoot')}},
      $tbody: {get: function(){return this.$('> tbody')}},
      $theadTR: {get: function(){return this.$thead.find('> tr')}},
      $tfootTR: {get: function(){return this.$tfoot.find('> tr')}},
      $ths: {get: function(){return this.$theadTR.find('> th')}},
      $trs: {get: function(){
        // Cache or calculate
        return this._$trs != null ? this._$trs : this._$trs = this.$("> tbody > tr")
      }},

      // Table tags must have an order: `<caption>` `<colgroup>` `<thead>` `<tfoot>` `<tbody>`
      // These accessors create table tags and preserve this order very carefully
      // $colgroupMake: get or create `<colgroup>` after `<caption>` or prepended to `<table>`

      $colgroupMake: {get: function(){
        if (this.$colgroup.length > 0)
          return this.$colgroup
        t = '<colgroup></colgroup>'
        if (this.$caption.length > 0)
          this.$caption.insertAfter(t)
        else
          this.$table.append(t)
        return this.$tbody
      }},

      // $captionMake: get or create `<caption>` prepended to `<table>`
      $captionMake: {
        get: function(){
          if (this.$caption.length > 0)
            return this.$caption
          this.$table.prepend('<caption></caption>')
          return this.$caption
        }
      },

      // $tfootMake: get or create `<tfoot>` before `<tbody>` or appended to `<table>`
      $tfootMake: {
        get: function(){
          if (this.$tfoot.length > 0)
            return this.$tfoot
          t = '<tfoot></tfoot>'
          if (this.$tfoot.length > 0)
            this.$tfoot.insertBefore(t)
          else
            this.$table.append(t)

          return this.$tfoot
        }
      },

      // $theadMake: get or create `<thead>` after `<colgroup>` or after `<caption>`, or prepended to `<table>`
      $theadMake: {
        get: function(){
          if (this.$thead.length > 0)
            return this.$thead
          t = '<thead></thead>'
          if (this.$colgroup.length > 0)
            this.$colgroup.insertAfter(t)
          else if (this.$caption.length > 0)
            this.$caption.insertAfter(t)
          else
            this.$table.prepend(t)
          return this.$thead
        }
      },

      // $tbodyMake: get or create `<tbody>` appened to `<table>`
      $tbodyMake: {
        get: function(){
          if (this.$tbody.length > 0)
            return this.$tbody
          this.$table.append('<tbody></tbody>')
          return this.$tbody
        }
      },

      // $theadTRMake: get or create `<tr>` inside of `<thead>`
      $theadTRMake: {
        get: function(){
          if (this.$theadTR.length > 0)
            return this.$theadTR
          this.$theadMake.html('<tr></tr>')
          return this.$theadTR
        }
      },

      // $tfootTRMake: get or create `<tr>` inside of `<tfoot>`
      $tfootTRMake: {
        get: function(){
          if (this.$tfootTR.length > 0)
            return this.$tfootTR
          this.$tfootMake.html('<tr></tr>')
          return this.$tfootTR
        }
      }
    },

    methods: {

      // make: Remake everything (override)
      make: function(){
        if (!this.isConstructed)
          return

        // Some properties call make before construction completes
        var _t = this, models, rowViews = []

        // Convert models to views if model/each exists
        if ((this.models != null) && (this.each != null)){
          models = oj.isEvented(this.models) ? this.models.models : this._models
          rowViews = models.map(function(model){return _t._rowFromModel(model)})
        // Convert rows to views
        } else if (this.rows != null){
          rowViews = this.rows.map(function(row){
            return oj(function(){
              row.forEach(function(cell){oj.td(cell)})
            })
          })
        }

        // Render rows into tbody
        if (rowViews.length > 0)
          this.$tbodyMake.oj(function(){
            rowViews.forEach(function(r){
              oj.tr(r)
            })
          })

        this.bodyChanged()
      },

      collectionModelAdded: function(m, c){
        var rx = c.indexOf(m),
          row = this._rowFromModel(m)
        this._addRowTR(rx, oj(function(){
          return oj.tr(row)
        }))
      },

      collectionModelRemoved: function(m, c, o){this.removeRow(o.index)},

      collectionReset: function(){this.make()},

      // $tr: Get `<tr>` jquery element at row rx
      $tr: function(rx){
        rx = rx < 0 ? rx + count : rx
        return this.$trs.eq(rx)
      },

      // $tdsRow: Get list of `<td>`s in row rx
      $tdsRow: function(rx){
        rx = rx < 0 ? rx + count : rx
        return this.$tr(rx).find('> td')
      },

      // $td: Get `<td>` row rx, column cx
      $td: function(rx, cx){
        rx = rx < 0 ? rx + this.rowCount : rx
        cx = cx < 0 ? cx + this.columnCount : cx
        return this.$tdsRow(rx).eq(cx)
      },

      // row: Get values at a given row
      row: function(rx, listOJML){
        rx = this._bound(rx, this.rowCount, ".row: rx")

        if (listOJML != null){
          _a(listOJML.length === cellCount(rx), this.typeName, "array expected for second argument with length (" + rx + ")")

          // Set tds
          listOJML.forEach(function(ojml,cx){
            this.$td(rx, cx).oj(ojml)
          })

        } else {
          return this.$tdsRow(rx).ojValues()
        }
      },

      // cell: Get or set value at row rx, column cx
      cell: function(rx, cx, ojml){
        if (ojml != null)
          return this.$td(rx, cx).oj(ojml)
        else
          return this.$td(rx, cx).ojValue()
      },

      // addRow: Add row to index rx
      addRow: function(rx, listOJML){

        if (listOJML == null){
          listOJML = rx
          rx = -1
        }
        rx = this._bound(rx, this.rowCount + 1, ".addRow: rx")
        _a(oj.isArray(listOJML), 'addRow', 'expected array for row content')

        this._addRowTR(rx, function(){
          oj.tr(function(){
            listOJML.forEach(function(cell){
              oj.td(cell)
            })
          })
        })
      },

      // _addRowTR: Helper to add row directly with `<tr>`
      _addRowTR: function(rx, tr){
        // Empty
        if (this.rowCount === 0)
          this.$el.oj(tr)

        // Last
        else if (rx === this.rowCount)
          this.$tr(rx - 1).ojAfter(tr)

        // Not last
        else
          this.$tr(rx).ojBefore(tr)

        this.bodyChanged()
      },

      // removeRow: Remove row at index rx (defaults to end)
      removeRow: function(rx){
        if (rx == null)
          rx = -1
        rx = this._bound(rx, this.rowCount, ".removeRow: index")
        var out = this.row(rx)
        this.$tr(rx).remove()
        this.bodyChanged()
        return out
      },

      // moveRow: Move row at index rx (defaults to end)
      moveRow: function(rxFrom, rxTo){
        if (rxFrom === rxTo)
          return

        rxFrom = this._bound(rxFrom, this.rowCount, ".moveRow: fromIndex")
        rxTo = this._bound(rxTo, this.rowCount, ".moveRow: toIndex")
        var insert = rxTo > rxFrom ? 'insertAfter' : 'insertBefore'
        this.$tr(rxFrom)[insert](this.$tr(rxTo))
        this.bodyChanged()
      },

      // swapRow: Swap row rx1 and rx2
      swapRow: function(rx1, rx2){
        if (rx1 === rx2)
          return
        rx1 = this._bound(rx1, this.rowCount, ".swap: firstIndex")
        rx2 = this._bound(rx2, this.rowCount, ".swap: secondIndex")
        if (Math.abs(rx1 - rx2) === 1)
          this.moveRow(rx1, rx2)
        else {
          var rxMin = Math.min(rx1, rx2),
            rxMax = Math.max(rx1, rx2)
          this.moveRow(rxMax, rxMin)
          this.moveRow(rxMin + 1, rxMax)
        }
        this.bodyChanged()
      },
      unshiftRow: function(v){this.addRow(0, v)},
      shiftRow: function(){return this.removeRow(0)},
      pushRow: function(v){this.addRow(this.rowCount, v)},
      popRow: function(){return this.removeRow(-1)},
      clearColgroup: function(){this.$colgroup.remove()},
      clearBody: function(){
        this.$tbody.remove()
        this.bodyChanged()
      },
      clearHeader: function(){
        this.$thead.remove()
        this.headerChanged()
      },
      clearFooter: function(){
        this.$tfoot.remove()
        this.footerChanged()
      },
      clearCaption: function(){
        this.$caption.remove();
      },
      clear: function(){
        this.clearBody()
        this.clearHeader()
        this.clearFooter()
        return this.$caption.remove()
      },

      // When body changes clear relevant cached values
      bodyChanged: function(){this._rows = null; this._columns = null; this._$trs = null},

      // When header changes clear relevant cached values
      headerChanged: function(){this._header = null},

      // When footer changes clear relevant cached values
      footerChanged: function(){this._footer = null},

      // _rowFromModel: Helper to map model to row
      _rowFromModel: function(model){
        var _t = this
        return oj(function(){
          return _t.each(model, oj.td)
        })
      },

      // _bound: Bound index to allow negatives, throw when out of range
      _bound: function(ix, count, message){
        var ixNew = ix < 0 ? ix + count : ix
        if (!(0 <= ixNew && ixNew < count)){
          throw new Error("oj." + this.typeName + message + " is out of bounds (" + ix + " in [0," + (count - 1) + "])")
        }
        return ixNew
      }
    }
  })

  // Extend Types into oj
  _extend(oj, {
    View:View,
    ModelView:ModelView,
    ModelKeyView:ModelKeyView,
    CollectionView:CollectionView,
    Button:Button,
    CheckBox:CheckBox,
    Text:Text,
    TextBox:TextBox,
    TextArea:TextArea,
    ListBox:ListBox,
    List:List,
    NumberList:NumberList,
    BulletList:BulletList,
    Table:Table
  })

  // Create Quiet _Types
  for (var typeName in oj){
    // Type with captital first letter that doesn't end in "View"
    if (_isCapitalLetter(typeName[0]) && typeName.slice(typeName.length - 4) !== 'View'){
      oj[_getQuietTagName(typeName)] = _createQuietType(typeName)
    }
  }

  // oj.sandbox: The sandbox is a readonly version of oj exposed to the user when templating server-side
  oj.sandbox = {}
  _keys(oj).forEach(function(key){
    if ((key.length > 0 && key[0] !== '_') || (key.length > 0 && key[0] === '_' && (oj[key.slice(1)] != null))){
      oj.addProperty(oj.sandbox, key, {value: oj[key], writable: false})
    }
  })

  // oj.use(plugin, settings): import a plugin of OJ with optional settings
  oj.use = function(plugin, settings){
    settings = _d(settings, {})
    _v('use', 1, plugin, 'function')
    _v('use', 2, settings, 'object')

   // Call plugin to gather extension map
    var pluginResult = plugin(oj, settings),
      pluginMap =  _clone(pluginResult),
      name, value

    // Add _Type quiet types
    for (name in pluginResult){
      value = pluginResult[name]
      if (oj.isOJType(value))
        pluginMap[_getQuietTagName(name)] = _createQuietType(value.typeName)
    }

    // Extend all properties
    for (name in pluginMap){
      value = pluginMap[name]

      // Add to oj
      oj[name] = value

      // Add plugin to sandbox
      oj.addProperty(oj.sandbox, name, {value: value, writable: false})
    }
  }

  // _jqExtend(fn): Create a jquery plugin with the following options:
  //   option.get is called to retrieve value per element
  //   option.set is called when setting elements
  //   option.first:true means return only the first get,
  //     otherwise it is returned as an array
  function _jqExtend(options){
    if (options == null)
      options = {}

    options = _extend({
      get: pass,
      set: pass,
      first: false
    }, options)

    return function(){
      var el, out, r, ix,
        args = _toArray(arguments),
        $els = jQuery(this)

      // Map over jquery selection if no arguments
      if ((oj.isFunction(options.get)) && args.length === 0){
        out = []
        for (ix = 0; ix < $els.length; ix++){
          el = $els[ix]
          out.push(options.get(oj.$(el)))
          if (options.first)
            return out[0]
        }
        return out
      } else if (oj.isFunction(options.set)){

        // By default return this for chaining
        out = $els
        for (ix = 0; ix < $els.length; ix++){
          el = $els[ix]
          r = options.set(oj.$(el), args)
          // Short circuit if anything is returned
          if (r != null)
            return r
        }
        return $els
      }
    }
  }

  function _triggerInserted(types, inserts){
    var ix = 0
    for (; ix <  types.length; ix++)
      types[ix].inserted()
    if(inserts) {
      for (ix = 0; ix < inserts.length; ix++)
        inserts[ix]()
    }
  }

  function _insertStyles(pluginMap, options){
    var mediaMap, plugin
    for (plugin in pluginMap){
      mediaMap = pluginMap[plugin]

      // Skip global css if options.global is true
      if (plugin === 'oj-style' && !(options != null ? options.global : 0))
        continue

      // Create <style> tag for the plugin
      if (oj.$('.' + _styleClassFromPlugin(plugin)).length === 0)
        oj.$('head').append(oj._styleTagFromMediaObject(plugin, mediaMap))
    }
  }

  // oj jquery plugin: Insert like innertHTML or get first instance
  oj.$.fn.oj = _jqExtend({
    // Get returns the first instance
    get: function($el){return $el[0].oj},

    // Set compiles and inserts in innerHTML
    set: function($el, args){

      // No arguments return the first instance
      if (args.length === 0)
        return $el[0].oj

      // Compile ojml
      var r = oj.compile.apply(oj, [{dom: 1, html: 0, cssMap: 1 }].concat(slice.call(args)))

      _insertStyles(r.cssMap, {global: 0})

      // Reset content and append to dom
      $el.html('')

      // Ensure r.dom is an array
      if (!oj.isArray(r.dom))
        r.dom = [r.dom]

      // Append resulting dom elements
      for (var ix = 0; ix < r.dom.length; ix++)
        $el.append(r.dom[ix])

      // Trigger inserted events
      _triggerInserted(r.types, r.inserts)
    }
  })

  // jQuery.ojBody plugin: replace body with ojml.
  // Global css is rebuilt when using this method.
  oj.$.ojBody = function(ojml){

    // Compile only the body and below
    var bodyOnly = {html: 1, '!DOCTYPE': 1, body: 1, head: 'deep', meta: 1, title: 'deep', link: 'deep', script: 'deep'}

    try {
      var r = oj.compile({dom: 1, html: 0, css: 0, cssMap: 1, ignore: bodyOnly }, ojml)
    } catch (e){
      throw new Error("oj.compile: " + e.message)
    }

    // Clear body and insert dom elements
    if (r.dom != null)
      oj.$('body').html(r.dom)

    _insertStyles(r.cssMap, {global:1})

    _triggerInserted(r.types, r.inserts)
  }

  // Helper method that abstracts getting oj values
  function _jqGetValue($el, args){
    var el = $el[0],
      child = el.firstChild

    // Return the instance if the element has an oj instance
    if (oj.isOJInstance(_getInstanceOnElement(el)))
      return _getInstanceOnElement(el)

    // Parse the text to turn it into bool, number, or string
    else if (oj.isDOMText(child))
      return oj.parse(child.nodeValue)

    // Return the first child otherwise as an oj instance or child element
    else if (oj.isDOMElement(child))
      return _d(_getInstanceOnElement(child), child)
  }

  // jQuery.fn.ojValue: Get the first value of the selected contents
  oj.$.fn.ojValue = _jqExtend({first: true, set: null, get: _jqGetValue })

  // jQuery.fn.ojValues: Get values as an array of the selected element's contents
  oj.$.fn.ojValues = _jqExtend({first: false, set: null, get: _jqGetValue})

  // jQuery.fn.ojAfter, ojBefore, etc: oj insertion plugins to jquery
  var jqFromOJ = {
    ojAfter: 'after',
    ojBefore: 'before',
    ojAppend: 'append',
    ojPrepend: 'prepend',
    ojReplaceWith: 'replaceWith',
    ojWrap: 'wrap',
    ojWrapInner: 'wrapInner'
  }
  for (var ojName in jqFromOJ){
    var jqName = jqFromOJ[ojName]
    ;(function(ojName, jqName){
      oj.$.fn[ojName] = _jqExtend({
        set: function($el, args){

          // Compile ojml for each one to separate references
          var opts = {dom:1,html:0,css:0,cssMap:1},
            r = oj.compile.apply(oj, [opts].concat(slice.call(args)))
          _insertStyles(r.cssMap, {global: 0})

          // Append to the dom
          $el[jqName](r.dom)
          _triggerInserted(r.types, r.inserts)
        },
        get: null
      })
    })(ojName, jqName)
  }

  // Minify Helpers that hook into server-side minification
  oj._minifyJS = pass
  oj._minifyCSS = pass

  // Path Helpers: Used to implement require client side
  // Simplified from: github.com/joyent/node/lib/path.js

  var _pathRx = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:\.{1,2}$|[\s\S]+?)?(\.[^.\/]*)?)$/

  function _pathSplit(fname){
    var result = _pathRx.exec(fname)
    return [result[1] || '', result[2] || '', result[3] || '', result[4] || '']
  }

  function _pathNormArray(parts, allowAboveRoot){
    var up = 0,
      i = parts.length - 1,
      last
    while (i >= 0){
      last = parts[i]
      if (last === '.')
        parts.splice(i, 1)
      else if (last === '..'){
        parts.splice(i, 1)
        up++
      } else if (up){
        parts.splice(i, 1)
        up--
      }
      i--
    }
    if (allowAboveRoot)
      while (up--)
        parts.unshift('..')
    return parts
  }

  oj._pathResolve = function(){
    var resolvedPath = '',
      isAbsolute = false,
      i = arguments.length - 1,
      path
    while (i >= -1 && !isAbsolute){
      path = i >= 0 ? arguments[i] : process.cwd()
      if ((typeof path !== 'string') || !path)
        continue
      resolvedPath = path + '/' + resolvedPath
      isAbsolute = path.charAt(0) === '/'
      i--
    }
    resolvedPath = _pathNormArray(resolvedPath.split('/').filter(function(p){
      return !!p
    }), !isAbsolute).join('/')
    return ((isAbsolute ? '/' : '') + resolvedPath) || '.'
  }

  oj._pathNormalize = function(path){
    var isAbsolute = path.charAt(0) === '/',
    trailingSlash = path.substr(-1) === '/'
    path = _pathNormArray(path.split('/').filter(function(p){
      return !!p
    }), !isAbsolute).join('/')
    if (!path && !isAbsolute)
      path = '.'
    if (path && trailingSlash)
      path += '/'
    return (isAbsolute ? '/' : '') + path
  }

  oj._pathJoin = function(){
    var paths = slice.call(arguments, 0)
    return oj._pathNormalize(paths.filter(function(p, index){
      return p && typeof p === 'string'
    }).join('/'))
  }

  oj._pathDirname = function(path){
    var result = _pathSplit(path),
    root = result[0],
    dir = result[1]
    if (!root && !dir)
      return '.'
    if (dir)
      dir = dir.substr(0, dir.length - 1)
    return root + dir
  }

  return oj
}));
})(P,G,'/','oj');});

// Define node environment: process P, global G and require factory RR
P = {cwd: function(){return '/'}}
G = {process: P,Buffer: {}}
RR = function(f){
  var o = function(m){return run(find(m, f))};
  o.P = P; o.G = G; o.F = F; o.M = M, o.RR = RR;
  return o;
  function run(f){
    if(R[f] != null)
      return R[f];
    var eo = {},
      mo = {exports: eo};
    if(typeof F[f] != 'function')
      throw new Error("file not found (" + f + ")");
    F[f](mo,eo);
    return R[f] = mo.exports;
  }
  function find(m,f){
    var r, dir, dm, ext, ex, i, loc;
    if (F[m] && !m.match(/\//))
      return m;

    if (!!m.match(/\//)) {
        r = oj._pathResolve(f, oj._pathJoin(oj._pathDirname(f), m));
        ext = ['', '.oj', '.ojc', '.js', '.coffee', '.json'];
      for(i = 0; i < ext.length; i++){
        ex = ext[i];
        if((loc = r + ex) && F[loc])
          return loc;
        else if ((loc = oj._pathJoin(r, 'index' + ex)) && F[loc])
          return loc;
      }
    } else {
      if (typeof oj !== 'undefined') {
        dir = oj._pathDirname(f);
        while(true) {
          dm = oj._pathJoin(dir, 'node_modules');
          if(M[dm] && M[dm][m])
            return oj._pathJoin(dm, m, M[dm][m]);
          if(dir == '/')
            break;
          dir = oj._pathResolve(dir, '..');
        }
      }
    }
    throw new Error("module not found (" + m + ")");
  }
};

// Define require and oj
require = RR('/');
oj = require('oj');
}).call(this);