// Generated with oj v0.3.0
;(function(){var M = {}, F = {}, R = {}, P, G, RR;

// Package modules
M['/node_modules'] = {"underscore":"underscore.js","backbone":"backbone.js","oj-markdown":"oj.markdown.js","oj-twitter-button":"oj.TwitterButton.js","oj-youtube-video":"oj.YouTubeVideo.js"};

F['/node_modules/underscore/underscore.js'] = (function(module,exports){(function(require,process,global,__dirname,__filename){
//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
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
  _.VERSION = '1.5.2';

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
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
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
      results.push(iterator.call(context, value, index, list));
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
      if (iterator.call(context, value, index, list)) results.push(value);
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
    if (_.isEmpty(attrs)) return first ? void 0 : [];
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
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed > result.computed && (result = {value : value, computed : computed});
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

  // Shuffle an array, using the modern version of the 
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
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

  // Sample **n** random values from an array.
  // If **n** is not specified, returns a single random element from the array.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (arguments.length < 2 || guard) {
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
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
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, value, context) {
      var result = {};
      var iterator = value == null ? _.identity : lookupIterator(value);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

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

  // Safely create a real, live array from anything iterable.
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
    return (n == null) || guard ? array[0] : slice.call(array, 0, n);
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
    if ((n == null) || guard) {
      return array[array.length - 1];
    } else {
      return slice.call(array, Math.max(array.length - n, 0));
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
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
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
    return _.uniq(_.flatten(arguments, true));
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
    var length = _.max(_.pluck(arguments, "length").concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
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
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
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

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
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
    if (funcs.length === 0) throw new Error("bindAll must be passed function names");
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
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
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
    var timeout, args, context, timestamp, result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function() {
        var last = (new Date()) - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
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
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
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
          if (obj[prop] === void 0) obj[prop] = source[prop];
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
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
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
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
      return false;
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
    var accum = Array(Math.max(0, n));
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
      "'": '&#x27;'
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

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
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
})(require.RR('/node_modules/underscore/underscore.js'),require.P,require.G,'/node_modules/underscore','underscore.js');});

F['/node_modules/backbone/backbone.js'] = (function(module,exports){(function(require,process,global,__dirname,__filename){
//     Backbone.js 1.1.0

//     (c) 2010-2011 Jeremy Ashkenas, DocumentCloud Inc.
//     (c) 2011-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both the browser and the server.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.0';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = root.jQuery || root.Zepto || root.ender || root.$;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = true;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true}, options);

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i] = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return singular ? models[0] : models;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i];
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute];
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);

          // Listen to added models' events, and index models for lookup by
          // `id` and by `cid`.
          model.on('all', this._onModelEvent, this);
          this._byId[model.cid] = model;
          if (model.id != null) this._byId[model.id] = model;
        }
        if (order) order.push(existing || model);
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }
      
      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj.id] || this._byId[obj.cid] || this._byId[obj];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp, options) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  var noXhrPatch = typeof window !== 'undefined' && !!window.ActiveXObject && !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        callback && callback.apply(router, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      });
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^\/]+)';
                   })
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param) {
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Cached regex for stripping urls of hash and query.
  var pathStripper = /[?#].*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;
      var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !atRoot) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + this.location.search + '#' + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && atRoot && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the fragment of the query and hash for matching.
      fragment = fragment.replace(pathStripper, '');

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

}).call(this);
})(require.RR('/node_modules/backbone/backbone.js'),require.P,require.G,'/node_modules/backbone','backbone.js');});

F['/node_modules/oj-markdown/oj.markdown.js'] = (function(module,exports){(function(require,process,global,__dirname,__filename){
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
})(require.RR('/node_modules/oj-markdown/oj.markdown.js'),require.P,require.G,'/node_modules/oj-markdown','oj.markdown.js');});

F['/node_modules/oj-twitter-button/oj.TwitterButton.js'] = (function(module,exports){(function(require,process,global,__dirname,__filename){
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
}));})(require.RR('/node_modules/oj-twitter-button/oj.TwitterButton.js'),require.P,require.G,'/node_modules/oj-twitter-button','oj.TwitterButton.js');});

F['/node_modules/oj-youtube-video/oj.YouTubeVideo.js'] = (function(module,exports){(function(require,process,global,__dirname,__filename){
// oj.YouTubeVideo.js

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
})(require.RR('/node_modules/oj-youtube-video/oj.YouTubeVideo.js'),require.P,require.G,'/node_modules/oj-youtube-video','oj.YouTubeVideo.js');});


// Native modules
F['oj'] = (function(module,exports){(function(process,global,__dirname,__filename){
//
// oj.js v0.3.0
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

  oj.version = '0.3.0'

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
  function _construct(Type){return new (FunP.bind.apply(Type, arguments))}

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

  // oj.View
  oj.View = oj.createType('View', {

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


  // oj.View.cssMap: remember css for this View
  oj.View.cssMap = {}

  // oj.View.css: set view's css with css object mapping, or raw css string
  oj.View.css = function(css){
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

  // oj.View.themes: Remember themes for this View
  oj.View.themes = []

  // oj.View.theme: create a View specific theme with css object mapping
  oj.View.theme = function(name, css){
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

  // oj.CollectionView: Inheritable base type that enables two-way collection binding
  oj.CollectionView = oj.createType('CollectionView', {
    base: oj.View,
    constructor: function(options){
      if ((options != null ? options.each : void 0) != null)
        this.each = oj.argumentShift(options, 'each')

      if ((options != null ? options.models : void 0) != null)
        this.models = oj.argumentShift(options, 'models')

      oj.CollectionView.base.constructor.apply(this, arguments)

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

  // oj.ModelView: Inheritable base type that enables two-way model binding
  oj.ModelView = oj.createType('ModelView', {
    base: oj.View,
    constructor: function(options){
      if ((options != null ? options.value : void 0) != null)
        this.value = oj.argumentShift(options, 'value')

      if ((options != null ? options.model : void 0) != null)
        this.model = oj.argumentShift(options, 'model')

      return oj.ModelView.base.constructor.apply(this, arguments)
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

  // oj.ModelViewView: Inheritable base type that enables two-way model binding to a specific key
  oj.ModelKeyView = oj.createType('ModelKeyView', {

    // Inherit ModelView to handle model and bindings
    base: oj.ModelView,
    constructor: function(options){

      if ((options != null ? options.key : void 0) != null)
        this.key = oj.argumentShift(options, 'key')

      // Call super to bind model and value
      return oj.ModelKeyView.base.constructor.apply(this, arguments)
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

  // oj.TextBox
  oj.TextBox = oj.createType('TextBox', {
    base: oj.ModelKeyView,
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

      return oj.TextBox.base.constructor.apply(this, [options])
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

  // oj.CheckBox
  oj.CheckBox = oj.createType('CheckBox', {
    base: oj.ModelKeyView,
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

      return oj.CheckBox.base.constructor.call(this, options)
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

  // oj.Text
  oj.Text = oj.createType('Text', {
    base: oj.ModelKeyView,
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

      return oj.Text.base.constructor.call(this, options)
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

  // oj.TextArea
  oj.TextArea = oj.createType('TextArea', {
    base: oj.ModelKeyView,
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
      return oj.TextArea.base.constructor.call(this, options)
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

  // oj.ListBox
  oj.ListBox = oj.createType('ListBox', {
    base: oj.ModelKeyView,
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

      return oj.ListBox.base.constructor.apply(this, [options])
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

  // oj.Button
  oj.Button = oj.createType('Button', {
    base: oj.View,
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
      this.el = oj(function(){return oj.button(title)})

      oj.Button.base.constructor.apply(this, [options])
      return this.title = title
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

  // oj.List: List control with two-way collection binding
  oj.List = oj.createType('List', {
    base: oj.CollectionView,
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
      oj.List.base.constructor.apply(this, [options])

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

          // Calc from ojValues
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
          return this._$items != null ? this._$items : this._$items = this.$("> " + this.itemTagName)
        }
      }
    },

    methods: {
      // item: get or set item value at item ix
      item: function(ix, ojml){
        ix = this._bound(ix, this.count, ".item: index")
        if (ojml != null)
          this.$item(ix).oj(ojml)
        else
          return this.$item(ix).ojValue()
      },

      // $item: `<li>` element for a given item ix. The tag name may change.
      $item: function(ix){return this.$items.eq(this._bound(ix, this.count, ".$item: index"))},

      // make: Remake view from model data using each
      make: function(){
        // Do nothing until fully constructed
        if (!this.isConstructed)
          return

        // Some properties call make before construction completes
        var _t = this, ix, model, models, views, out

        // Convert models to views using each
        if ((this.models != null) && (this.each != null)){

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
        return oj(function(){return _t.each(model)})
      },

      // _itemElFromItem: Helper to create itemTagName wrapped item
      _itemElFromItem: function(item){
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
        var tag = this.itemTagName

        // Empty
        if (this.count === 0)
          this.$el.oj(function(){return oj[tag](ojml)})

        // Last
        else if (ix === this.count)
          this.$item(ix - 1).ojAfter(function(){return oj[tag](ojml)})

        // Not last
        else
          this.$item(ix).ojBefore(function(){return oj[tag](ojml)})

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
  oj.NumberList = oj.createType('NumberList', {
    base: oj.List,
    constructor: function(){
      var args = [{tagName:'ol', itemTagName:'li'}].concat(slice.call(arguments))
      return oj.NumberList.base.constructor.apply(this, args)
    }
  })

  // oj.BulletList: BulletList is a `List` specialized with `<ul>` and `<li>` tags
  oj.BulletList = oj.createType('BulletList', {
    base: oj.List,
    constructor: function(){
      var args = [{tagName:'ul', itemTagName:'li'}].concat(slice.call(arguments))
      return oj.BulletList.base.constructor.apply(this, args)
    }
  })

  // oj.Table
  oj.Table = oj.createType('Table', {
    base: oj.CollectionView,
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
      oj.Table.base.constructor.apply(this, [options])

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

    // Parse the text to turn it into bool, number, or string
    if (oj.isDOMText(child))
      return oj.parse(child.nodeValue)

    // Get elements as oj instances or elements
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
F['jquery'] = (function(module,exports){(function(process,global,__dirname,__filename){
(function(e,undefined){function j(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}function A(e){var t=D[e]={};return x.each(e.match(w)||[],function(e,n){t[n]=!0}),t}function F(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=x.expando+Math.random()}function P(e,t,n){var r;if(n===undefined&&1===e.nodeType)if(r="data-"+t.replace(O,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:H.test(n)?JSON.parse(n):n}catch(i){}L.set(e,t,n)}else n=undefined;return n}function U(){return!0}function Y(){return!1}function V(){try{return o.activeElement}catch(e){}}function Z(e,t){while((e=e[t])&&1!==e.nodeType);return e}function et(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(G.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return g.call(t,e)>=0!==n})}function pt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function ft(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function ht(e){var t=ut.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function dt(e,t){var n=e.length,r=0;for(;n>r;r++)q.set(e[r],"globalEval",!t||q.get(t[r],"globalEval"))}function gt(e,t){var n,r,i,s,o,u,a,f;if(1===t.nodeType){if(q.hasData(e)&&(s=q.access(e),o=q.set(t,s),f=s.events)){delete o.handle,o.events={};for(i in f)for(n=0,r=f[i].length;r>n;n++)x.event.add(t,i,f[i][n])}L.hasData(e)&&(u=L.access(e),a=x.extend({},u),L.set(t,a))}}function mt(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return t===undefined||t&&x.nodeName(e,t)?x.merge([e],n):n}function yt(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ot.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}function At(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Dt.length;while(i--)if(t=Dt[i]+n,t in e)return t;return r}function Lt(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function qt(t){return e.getComputedStyle(t,null)}function Ht(e,t){var n,r,i,s=[],o=0,u=e.length;for(;u>o;o++)r=e[o],r.style&&(s[o]=q.get(r,"olddisplay"),n=r.style.display,t?(s[o]||"none"!==n||(r.style.display=""),""===r.style.display&&Lt(r)&&(s[o]=q.access(r,"olddisplay",Rt(r.nodeName)))):s[o]||(i=Lt(r),(n&&"none"!==n||!i)&&q.set(r,"olddisplay",i?n:x.css(r,"display"))));for(o=0;u>o;o++)r=e[o],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?s[o]||"":"none"));return e}function Ot(e,t,n){var r=Tt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function Ft(e,t,n,r,i){var s=n===(r?"border":"content")?4:"width"===t?1:0,o=0;for(;4>s;s+=2)"margin"===n&&(o+=x.css(e,n+jt[s],!0,i)),r?("content"===n&&(o-=x.css(e,"padding"+jt[s],!0,i)),"margin"!==n&&(o-=x.css(e,"border"+jt[s]+"Width",!0,i))):(o+=x.css(e,"padding"+jt[s],!0,i),"padding"!==n&&(o+=x.css(e,"border"+jt[s]+"Width",!0,i)));return o}function Pt(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,s=qt(e),o=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,s);if(0>=i||null==i){if(i=vt(e,t,s),(0>i||null==i)&&(i=e.style[t]),Ct.test(i))return i;r=o&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+Ft(e,t,n||(o?"border":"content"),r,s)+"px"}function Rt(e){var t=o,n=Nt[e];return n||(n=Mt(e,t),"none"!==n&&n||(xt=(xt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(xt[0].contentWindow||xt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=Mt(e,t),xt.detach()),Nt[e]=n),n}function Mt(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}function _t(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||$t.test(e)?r(e,i):_t(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)_t(e+"["+i+"]",t[i],n,r)}function un(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,s=t.toLowerCase().match(w)||[];if(x.isFunction(n))while(r=s[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function ln(e,t,n,r){function o(u){var a;return i[u]=!0,x.each(e[u]||[],function(e,u){var f=u(t,n,r);return"string"!=typeof f||s||i[f]?s?!(a=f):undefined:(t.dataTypes.unshift(f),o(f),!1)}),a}var i={},s=e===on;return o(t.dataTypes[0])||!i["*"]&&o("*")}function cn(e,t){var n,r,i=x.ajaxSettings.flatOptions||{};for(n in t)t[n]!==undefined&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&x.extend(!0,e,r),e}function pn(e,t,n){var r,i,s,o,u=e.contents,a=e.dataTypes;while("*"===a[0])a.shift(),r===undefined&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in u)if(u[i]&&u[i].test(r)){a.unshift(i);break}if(a[0]in n)s=a[0];else{for(i in n){if(!a[0]||e.converters[i+" "+a[0]]){s=i;break}o||(o=i)}s=s||o}return s?(s!==a[0]&&a.unshift(s),n[s]):undefined}function fn(e,t,n,r){var i,s,o,u,a,f={},l=e.dataTypes.slice();if(l[1])for(o in e.converters)f[o.toLowerCase()]=e.converters[o];s=l.shift();while(s)if(e.responseFields[s]&&(n[e.responseFields[s]]=t),!a&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),a=s,s=l.shift())if("*"===s)s=a;else if("*"!==a&&a!==s){if(o=f[a+" "+s]||f["* "+s],!o)for(i in f)if(u=i.split(" "),u[1]===s&&(o=f[a+" "+u[0]]||f["* "+u[0]])){o===!0?o=f[i]:f[i]!==!0&&(s=u[0],l.unshift(u[1]));break}if(o!==!0)if(o&&e["throws"])t=o(t);else try{t=o(t)}catch(c){return{state:"parsererror",error:o?c:"No conversion from "+a+" to "+s}}}return{state:"success",data:t}}function En(){return setTimeout(function(){xn=undefined}),xn=x.now()}function Sn(e,t,n){var r,i=(Nn[t]||[]).concat(Nn["*"]),s=0,o=i.length;for(;o>s;s++)if(r=i[s].call(n,t,e))return r}function jn(e,t,n){var r,i,s=0,o=kn.length,u=x.Deferred().always(function(){delete a.elem}),a=function(){if(i)return!1;var t=xn||En(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,s=1-r,o=0,a=f.tweens.length;for(;a>o;o++)f.tweens[o].run(s);return u.notifyWith(e,[f,s,n]),1>s&&a?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:xn||En(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(r),r},stop:function(t){var n=0,r=t?f.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;for(Dn(l,f.opts.specialEasing);o>s;s++)if(r=kn[s].call(f,e,l,f.opts))return r;return x.map(l,Sn,f),x.isFunction(f.opts.start)&&f.opts.start.call(e,f),x.fx.timer(x.extend(a,{elem:e,anim:f,queue:f.opts.queue})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Dn(e,t){var n,r,i,s,o;for(n in e)if(r=x.camelCase(n),i=t[r],s=e[n],x.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=x.cssHooks[r],o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}function An(e,t,n){var r,i,s,o,u,a,f=this,l={},c=e.style,h=e.nodeType&&Lt(e),p=q.get(e,"fxshow");n.queue||(u=x._queueHooks(e,"fx"),null==u.unqueued&&(u.unqueued=0,a=u.empty.fire,u.empty.fire=function(){u.unqueued||a()}),u.unqueued++,f.always(function(){f.always(function(){u.unqueued--,x.queue(e,"fx").length||u.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[c.overflow,c.overflowX,c.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(c.display="inline-block")),n.overflow&&(c.overflow="hidden",f.always(function(){c.overflow=n.overflow[0],c.overflowX=n.overflow[1],c.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],wn.exec(i)){if(delete t[r],s=s||"toggle"===i,i===(h?"hide":"show")){if("show"!==i||!p||p[r]===undefined)continue;h=!0}l[r]=p&&p[r]||x.style(e,r)}if(!x.isEmptyObject(l)){p?"hidden"in p&&(h=p.hidden):p=q.access(e,"fxshow",{}),s&&(p.hidden=!h),h?x(e).show():f.done(function(){x(e).hide()}),f.done(function(){var t;q.remove(e,"fxshow");for(t in l)x.style(e,t,l[t])});for(r in l)o=Sn(h?p[r]:0,r,f),r in p||(p[r]=o.start,h&&(o.end=o.start,o.start="width"===r||"height"===r?1:0))}}function Ln(e,t,n,r,i){return new Ln.prototype.init(e,t,n,r,i)}function qn(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=jt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function Hn(e){return x.isWindow(e)?e:9===e.nodeType&&e.defaultView}var t,n,r=typeof undefined,i=e.location,o=e.document,s=o.documentElement,a=e.jQuery,u=e.$,l={},c=[],p="2.0.3",f=c.concat,h=c.push,d=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,x=function(e,n){return new x.fn.init(e,n,t)},b=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^-ms-/,N=/-([\da-z])/gi,E=function(e,t){return t.toUpperCase()},S=function(){o.removeEventListener("DOMContentLoaded",S,!1),e.removeEventListener("load",S,!1),x.ready()};x.fn=x.prototype={jquery:p,constructor:x,init:function(e,t,n){var r,i;if(!e)return this;if("string"==typeof e){if(r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:T.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof x?t[0]:t,x.merge(this,x.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:o,!0)),C.test(r[1])&&x.isPlainObject(t))for(r in t)x.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=o.getElementById(r[2]),i&&i.parentNode&&(this.length=1,this[0]=i),this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?n.ready(e):(e.selector!==undefined&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return d.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,t,n,r,i,s,o=arguments[0]||{},u=1,a=arguments.length,f=!1;for("boolean"==typeof o&&(f=o,o=arguments[1]||{},u=2),"object"==typeof o||x.isFunction(o)||(o={}),a===u&&(o=this,--u);a>u;u++)if(null!=(e=arguments[u]))for(t in e)n=o[t],r=e[t],o!==r&&(f&&r&&(x.isPlainObject(r)||(i=x.isArray(r)))?(i?(i=!1,s=n&&x.isArray(n)?n:[]):s=n&&x.isPlainObject(n)?n:{},o[t]=x.extend(f,s,r)):r!==undefined&&(o[t]=r));return o},x.extend({expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=a),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){(e===!0?--x.readyWait:x.isReady)||(x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(o,[x]),x.fn.trigger&&x(o).trigger("ready").off("ready")))},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if("object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}return!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:JSON.parse,parseXML:function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=undefined}return(!t||t.getElementsByTagName("parsererror").length)&&x.error("Invalid XML: "+e),t},noop:function(){},globalEval:function(e){var t,n=eval;e=x.trim(e),e&&(1===e.indexOf("use strict")?(t=o.createElement("script"),t.text=e,o.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(k,"ms-").replace(N,E)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,s=e.length,o=j(e);if(n){if(o){for(;s>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(o){for(;s>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:function(e){return null==e?"":v.call(e)},makeArray:function(e,t){var n=t||[];return null!=e&&(j(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:g.call(t,e,n)},merge:function(e,t){var n=t.length,r=e.length,i=0;if("number"==typeof n)for(;n>i;i++)e[r++]=t[i];else while(t[i]!==undefined)e[r++]=t[i++];return e.length=r,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;for(n=!!n;o>s;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,t,n){var r,i=0,s=e.length,o=j(e),u=[];if(o)for(;s>i;i++)r=t(e[i],i,n),null!=r&&(u[u.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(u[u.length]=r);return f.apply([],u)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),x.isFunction(e)?(r=d.call(arguments,2),i=function(){return e.apply(t||this,r.concat(d.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):undefined},access:function(e,t,n,r,i,s,o){var u=0,a=e.length,f=null==n;if("object"===x.type(n)){i=!0;for(u in n)x.access(e,t,u,n[u],!0,s,o)}else if(r!==undefined&&(i=!0,x.isFunction(r)||(o=!0),f&&(o?(t.call(e,r),t=null):(f=t,t=function(e,t,n){return f.call(x(e),n)})),t))for(;a>u;u++)t(e[u],n,o?r:r.call(e[u],u,t(e[u],n)));return i?e:f?t.call(e):a?t(e[0],n):s},now:Date.now,swap:function(e,t,n,r){var i,s,o={};for(s in t)o[s]=e.style[s],e.style[s]=t[s];i=n.apply(e,r||[]);for(s in t)e.style[s]=o[s];return i}}),x.ready.promise=function(t){return n||(n=x.Deferred(),"complete"===o.readyState?setTimeout(x.ready):(o.addEventListener("DOMContentLoaded",S,!1),e.addEventListener("load",S,!1))),n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()}),t=x(o),function(e,t){function ot(e,t,n,i){var s,o,u,a,f,l,p,m,g,E;if((t?t.ownerDocument||t:w)!==h&&c(t),t=t||h,n=n||[],!e||"string"!=typeof e)return n;if(1!==(a=t.nodeType)&&9!==a)return[];if(d&&!i){if(s=Z.exec(e))if(u=s[1]){if(9===a){if(o=t.getElementById(u),!o||!o.parentNode)return n;if(o.id===u)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(u))&&y(t,o)&&o.id===u)return n.push(o),n}else{if(s[2])return H.apply(n,t.getElementsByTagName(e)),n;if((u=s[3])&&r.getElementsByClassName&&t.getElementsByClassName)return H.apply(n,t.getElementsByClassName(u)),n}if(r.qsa&&(!v||!v.test(e))){if(m=p=b,g=t,E=9===a&&e,1===a&&"object"!==t.nodeName.toLowerCase()){l=mt(e),(p=t.getAttribute("id"))?m=p.replace(nt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",f=l.length;while(f--)l[f]=m+gt(l[f]);g=$.test(e)&&t.parentNode||t,E=l.join(",")}if(E)try{return H.apply(n,g.querySelectorAll(E)),n}catch(S){}finally{p||t.removeAttribute("id")}}}return Nt(e.replace(W,"$1"),t,n,i)}function ut(){function t(n,r){return e.push(n+=" ")>s.cacheLength&&delete t[e.shift()],t[n]=r}var e=[];return t}function at(e){return e[b]=!0,e}function ft(e){var t=h.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function lt(e,t){var n=e.split("|"),r=e.length;while(r--)s.attrHandle[n[r]]=t}function ct(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||O)-(~e.sourceIndex||O);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function ht(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function pt(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function dt(e){return at(function(t){return t=+t,at(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function vt(){}function mt(e,t){var n,r,i,o,u,a,f,l=N[e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=s.preFilter;while(u){(!n||(r=X.exec(u)))&&(r&&(u=u.slice(r[0].length)||u),a.push(i=[])),n=!1,(r=V.exec(u))&&(n=r.shift(),i.push({value:n,type:r[0].replace(W," ")}),u=u.slice(n.length));for(o in s.filter)!(r=G[o].exec(u))||f[o]&&!(r=f[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),u=u.slice(n.length));if(!n)break}return t?u.length:u?ot.error(e):N(e,a).slice(0)}function gt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function yt(e,t,n){var r=t.dir,s=n&&"parentNode"===r,o=S++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||s)return e(t,n,i)}:function(t,n,u){var a,f,l,c=E+" "+o;if(u){while(t=t[r])if((1===t.nodeType||s)&&e(t,n,u))return!0}else while(t=t[r])if(1===t.nodeType||s)if(l=t[b]||(t[b]={}),(f=l[r])&&f[0]===c){if((a=f[1])===!0||a===i)return a===!0}else if(f=l[r]=[c],f[1]=e(t,n,u)||i,f[1]===!0)return!0}}function bt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function wt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=null!=t;for(;a>u;u++)(s=e[u])&&(!n||n(s,r,i))&&(o.push(s),f&&t.push(u));return o}function Et(e,t,n,r,i,s){return r&&!r[b]&&(r=Et(r)),i&&!i[b]&&(i=Et(i,s)),at(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||Tt(t||"*",u.nodeType?[u]:u,[]),m=!e||!s&&t?v:wt(v,h,e,u,a),g=n?i||(s?e:d||r)?[]:o:m;if(n&&n(m,g,u,a),r){f=wt(g,p),r(f,[],u,a),l=f.length;while(l--)(c=f[l])&&(g[p[l]]=!(m[p[l]]=c))}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?j.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=wt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):H.apply(o,g)})}function St(e){var t,n,r,i=e.length,o=s.relative[e[0].type],u=o||s.relative[" "],a=o?1:0,l=yt(function(e){return e===t},u,!0),c=yt(function(e){return j.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==f)||((t=n).nodeType?l(e,n,r):c(e,n,r))}];for(;i>a;a++)if(n=s.relative[e[a].type])h=[yt(bt(h),n)];else{if(n=s.filter[e[a].type].apply(null,e[a].matches),n[b]){for(r=++a;i>r;r++)if(s.relative[e[r].type])break;return Et(a>1&&bt(h),a>1&&gt(e.slice(0,a-1).concat({value:" "===e[a-2].type?"*":""})).replace(W,"$1"),n,r>a&&St(e.slice(a,r)),i>r&&St(e=e.slice(r)),i>r&&gt(e))}h.push(n)}return bt(h)}function xt(e,t){var n=0,r=t.length>0,o=e.length>0,u=function(u,a,l,c,p){var d,v,m,g=[],y=0,b="0",w=u&&[],S=null!=p,x=f,T=u||o&&s.find.TAG("*",p&&a.parentNode||a),N=E+=null==x?1:Math.random()||.1;for(S&&(f=a!==h&&a,i=n);null!=(d=T[b]);b++){if(o&&d){v=0;while(m=e[v++])if(m(d,a,l)){c.push(d);break}S&&(E=N,i=++n)}r&&((d=!m&&d)&&y--,u&&w.push(d))}if(y+=b,r&&b!==y){v=0;while(m=t[v++])m(w,g,a,l);if(u){if(y>0)while(b--)w[b]||g[b]||(g[b]=D.call(c));g=wt(g)}H.apply(c,g),S&&!u&&g.length>0&&y+t.length>1&&ot.uniqueSort(c)}return S&&(E=N,f=x),w};return r?at(u):u}function Tt(e,t,n){var r=0,i=t.length;for(;i>r;r++)ot(e,t[r],n);return n}function Nt(e,t,n,i){var o,u,f,l,c,h=mt(e);if(!i&&1===h.length){if(u=h[0]=h[0].slice(0),u.length>2&&"ID"===(f=u[0]).type&&r.getById&&9===t.nodeType&&d&&s.relative[u[1].type]){if(t=(s.find.ID(f.matches[0].replace(rt,it),t)||[])[0],!t)return n;e=e.slice(u.shift().value.length)}o=G.needsContext.test(e)?0:u.length;while(o--){if(f=u[o],s.relative[l=f.type])break;if((c=s.find[l])&&(i=c(f.matches[0].replace(rt,it),$.test(u[0].type)&&t.parentNode||t))){if(u.splice(o,1),e=i.length&&gt(u),!e)return H.apply(n,i),n;break}}}return a(e,h)(i,t,!d,n,$.test(e)),n}var n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b="sizzle"+ -(new Date),w=e.document,E=0,S=0,T=ut(),N=ut(),C=ut(),k=!1,L=function(e,t){return e===t?(k=!0,0):0},A=typeof t,O=1<<31,M={}.hasOwnProperty,_=[],D=_.pop,P=_.push,H=_.push,B=_.slice,j=_.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},F="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",I="[\\x20\\t\\r\\n\\f]",q="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",R=q.replace("w","w#"),U="\\["+I+"*("+q+")"+I+"*(?:([*^$|!~]?=)"+I+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+R+")|)|)"+I+"*\\]",z=":("+q+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+U.replace(3,8)+")*)|.*)\\)|)",W=RegExp("^"+I+"+|((?:^|[^\\\\])(?:\\\\.)*)"+I+"+$","g"),X=RegExp("^"+I+"*,"+I+"*"),V=RegExp("^"+I+"*([>+~]|"+I+")"+I+"*"),$=RegExp(I+"*[+~]"),J=RegExp("="+I+"*([^\\]'\"]*)"+I+"*\\]","g"),K=RegExp(z),Q=RegExp("^"+R+"$"),G={ID:RegExp("^#("+q+")"),CLASS:RegExp("^\\.("+q+")"),TAG:RegExp("^("+q.replace("w","w*")+")"),ATTR:RegExp("^"+U),PSEUDO:RegExp("^"+z),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+I+"*(even|odd|(([+-]|)(\\d*)n|)"+I+"*(?:([+-]|)"+I+"*(\\d+)|))"+I+"*\\)|)","i"),bool:RegExp("^(?:"+F+")$","i"),needsContext:RegExp("^"+I+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+I+"*((?:-\\d)?\\d*)"+I+"*\\)|)(?=[^-]|$)","i")},Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,et=/^(?:input|select|textarea|button)$/i,tt=/^h\d$/i,nt=/'|\\/g,rt=RegExp("\\\\([\\da-f]{1,6}"+I+"?|("+I+")|.)","ig"),it=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{H.apply(_=B.call(w.childNodes),w.childNodes),_[w.childNodes.length].nodeType}catch(st){H={apply:_.length?function(e,t){P.apply(e,B.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}u=ot.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},r=ot.support={},c=ot.setDocument=function(e){var n=e?e.ownerDocument||e:w,i=n.defaultView;return n!==h&&9===n.nodeType&&n.documentElement?(h=n,p=n.documentElement,d=!u(n),i&&i.attachEvent&&i!==i.top&&i.attachEvent("onbeforeunload",function(){c()}),r.attributes=ft(function(e){return e.className="i",!e.getAttribute("className")}),r.getElementsByTagName=ft(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),r.getElementsByClassName=ft(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),r.getById=ft(function(e){return p.appendChild(e).id=b,!n.getElementsByName||!n.getElementsByName(b).length}),r.getById?(s.find.ID=function(e,t){if(typeof t.getElementById!==A&&d){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},s.filter.ID=function(e){var t=e.replace(rt,it);return function(e){return e.getAttribute("id")===t}}):(delete s.find.ID,s.filter.ID=function(e){var t=e.replace(rt,it);return function(e){var n=typeof e.getAttributeNode!==A&&e.getAttributeNode("id");return n&&n.value===t}}),s.find.TAG=r.getElementsByTagName?function(e,n){return typeof n.getElementsByTagName!==A?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,s=t.getElementsByTagName(e);if("*"===e){while(n=s[i++])1===n.nodeType&&r.push(n);return r}return s},s.find.CLASS=r.getElementsByClassName&&function(e,n){return typeof n.getElementsByClassName!==A&&d?n.getElementsByClassName(e):t},m=[],v=[],(r.qsa=Y.test(n.querySelectorAll))&&(ft(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||v.push("\\["+I+"*(?:value|"+F+")"),e.querySelectorAll(":checked").length||v.push(":checked")}),ft(function(e){var t=n.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&v.push("[*^$]="+I+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||v.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),v.push(",.*:")})),(r.matchesSelector=Y.test(g=p.webkitMatchesSelector||p.mozMatchesSelector||p.oMatchesSelector||p.msMatchesSelector))&&ft(function(e){r.disconnectedMatch=g.call(e,"div"),g.call(e,"[s!='']:x"),m.push("!=",z)}),v=v.length&&RegExp(v.join("|")),m=m.length&&RegExp(m.join("|")),y=Y.test(p.contains)||p.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!!r&&1===r.nodeType&&!!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},L=p.compareDocumentPosition?function(e,t){if(e===t)return k=!0,0;var i=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t);return i?1&i||!r.sortDetached&&t.compareDocumentPosition(e)===i?e===n||y(w,e)?-1:t===n||y(w,t)?1:l?j.call(l,e)-j.call(l,t):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,s=e.parentNode,o=t.parentNode,u=[e],a=[t];if(e===t)return k=!0,0;if(!s||!o)return e===n?-1:t===n?1:s?-1:o?1:l?j.call(l,e)-j.call(l,t):0;if(s===o)return ct(e,t);r=e;while(r=r.parentNode)u.unshift(r);r=t;while(r=r.parentNode)a.unshift(r);while(u[i]===a[i])i++;return i?ct(u[i],a[i]):u[i]===w?-1:a[i]===w?1:0},n):h},ot.matches=function(e,t){return ot(e,null,null,t)},ot.matchesSelector=function(e,t){if((e.ownerDocument||e)!==h&&c(e),t=t.replace(J,"='$1']"),!(!r.matchesSelector||!d||m&&m.test(t)||v&&v.test(t)))try{var n=g.call(e,t);if(n||r.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(i){}return ot(t,h,null,[e]).length>0},ot.contains=function(e,t){return(e.ownerDocument||e)!==h&&c(e),y(e,t)},ot.attr=function(e,n){(e.ownerDocument||e)!==h&&c(e);var i=s.attrHandle[n.toLowerCase()],o=i&&M.call(s.attrHandle,n.toLowerCase())?i(e,n,!d):t;return o===t?r.attributes||!d?e.getAttribute(n):(o=e.getAttributeNode(n))&&o.specified?o.value:null:o},ot.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},ot.uniqueSort=function(e){var t,n=[],i=0,s=0;if(k=!r.detectDuplicates,l=!r.sortStable&&e.slice(0),e.sort(L),k){while(t=e[s++])t===e[s]&&(i=n.push(s));while(i--)e.splice(n[i],1)}return e},o=ot.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},s=ot.selectors={cacheLength:50,createPseudo:at,match:G,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(rt,it),e[3]=(e[4]||e[5]||"").replace(rt,it),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ot.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ot.error(e[0]),e},PSEUDO:function(e){var n,r=!e[5]&&e[2];return G.CHILD.test(e[0])?null:(e[3]&&e[4]!==t?e[2]=e[4]:r&&K.test(r)&&(n=mt(r,!0))&&(n=r.indexOf(")",r.length-n)-r.length)&&(e[0]=e[0].slice(0,n),e[2]=r.slice(0,n)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(rt,it).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=T[e+" "];return t||(t=RegExp("(^|"+I+")"+e+"("+I+"|$)"))&&T(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==A&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=ot.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var s="nth"!==e.slice(0,3),o="last"!==e.slice(-4),u="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,a){var f,l,c,h,p,d,v=s!==o?"nextSibling":"previousSibling",m=t.parentNode,g=u&&t.nodeName.toLowerCase(),y=!a&&!u;if(m){if(s){while(v){c=t;while(c=c[v])if(u?c.nodeName.toLowerCase()===g:1===c.nodeType)return!1;d=v="only"===e&&!d&&"nextSibling"}return!0}if(d=[o?m.firstChild:m.lastChild],o&&y){l=m[b]||(m[b]={}),f=l[e]||[],p=f[0]===E&&f[1],h=f[0]===E&&f[2],c=p&&m.childNodes[p];while(c=++p&&c&&c[v]||(h=p=0)||d.pop())if(1===c.nodeType&&++h&&c===t){l[e]=[E,p,h];break}}else if(y&&(f=(t[b]||(t[b]={}))[e])&&f[0]===E)h=f[1];else while(c=++p&&c&&c[v]||(h=p=0)||d.pop())if((u?c.nodeName.toLowerCase()===g:1===c.nodeType)&&++h&&(y&&((c[b]||(c[b]={}))[e]=[E,h]),c===t))break;return h-=i,h===r||0===h%r&&h/r>=0}}},PSEUDO:function(e,t){var n,r=s.pseudos[e]||s.setFilters[e.toLowerCase()]||ot.error("unsupported pseudo: "+e);return r[b]?r(t):r.length>1?(n=[e,e,"",t],s.setFilters.hasOwnProperty(e.toLowerCase())?at(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=j.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:at(function(e){var t=[],n=[],r=a(e.replace(W,"$1"));return r[b]?at(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)(s=o[u])&&(e[u]=!(t[u]=s))}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:at(function(e){return function(t){return ot(e,t).length>0}}),contains:at(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:at(function(e){return Q.test(e||"")||ot.error("unsupported lang: "+e),e=e.replace(rt,it).toLowerCase(),function(t){var n;do if(n=d?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===p},focus:function(e){return e===h.activeElement&&(!h.hasFocus||h.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!s.pseudos.empty(e)},header:function(e){return tt.test(e.nodeName)},input:function(e){return et.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:dt(function(){return[0]}),last:dt(function(e,t){return[t-1]}),eq:dt(function(e,t,n){return[0>n?n+t:n]}),even:dt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:dt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:dt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:dt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},s.pseudos.nth=s.pseudos.eq;for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})s.pseudos[n]=ht(n);for(n in{submit:!0,reset:!0})s.pseudos[n]=pt(n);vt.prototype=s.filters=s.pseudos,s.setFilters=new vt,a=ot.compile=function(e,t){var n,r=[],i=[],s=C[e+" "];if(!s){t||(t=mt(e)),n=t.length;while(n--)s=St(t[n]),s[b]?r.push(s):i.push(s);s=C(e,xt(i,r))}return s},r.sortStable=b.split("").sort(L).join("")===b,r.detectDuplicates=k,c(),r.sortDetached=ft(function(e){return 1&e.compareDocumentPosition(h.createElement("div"))}),ft(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||lt("type|href|height|width",function(e,n,r){return r?t:e.getAttribute(n,"type"===n.toLowerCase()?1:2)}),r.attributes&&ft(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||lt("value",function(e,n,r){return r||"input"!==e.nodeName.toLowerCase()?t:e.defaultValue}),ft(function(e){return null==e.getAttribute("disabled")})||lt(F,function(e,n,r){var i;return r?t:(i=e.getAttributeNode(n))&&i.specified?i.value:e[n]===!0?n.toLowerCase():null}),x.find=ot,x.expr=ot.selectors,x.expr[":"]=x.expr.pseudos,x.unique=ot.uniqueSort,x.text=ot.getText,x.isXMLDoc=ot.isXML,x.contains=ot.contains}(e);var D={};x.Callbacks=function(e){e="string"==typeof e?D[e]||A(e):x.extend({},e);var t,n,r,i,s,o,u=[],a=!e.once&&[],f=function(h){for(t=e.memory&&h,n=!0,o=i||0,i=0,s=u.length,r=!0;u&&s>o;o++)if(u[o].apply(h[0],h[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,u&&(a?a.length&&f(a.shift()):t?u=[]:l.disable())},l={add:function(){if(u){var n=u.length;(function o(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&l.has(n)||u.push(n):n&&n.length&&"string"!==r&&o(n)})})(arguments),r?s=u.length:t&&(i=n,f(t))}return this},remove:function(){return u&&x.each(arguments,function(e,t){var n;while((n=x.inArray(t,u,n))>-1)u.splice(n,1),r&&(s>=n&&s--,o>=n&&o--)}),this},has:function(e){return e?x.inArray(e,u)>-1:!!u&&!!u.length},empty:function(){return u=[],s=0,this},disable:function(){return u=a=t=undefined,this},disabled:function(){return!u},lock:function(){return a=undefined,t||l.disable(),this},locked:function(){return!a},fireWith:function(e,t){return!u||n&&!a||(t=t||[],t=[e,t.slice?t.slice():t],r?a.push(t):f(t)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!n}};return l},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,s){var o=s[0],u=x.isFunction(e[t])&&e[t];i[s[1]](function(){var e=u&&u.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[o+"With"](this===r?n.promise():this,u?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[1^e][2].disable,t[2][2].lock),i[s[0]]=function(){return i[s[0]+"With"](this===i?r:this,arguments),this},i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=d.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,s=1===i?e:x.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?d.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1)for(u=Array(r),a=Array(r),f=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i;return i||s.resolveWith(f,n),s.promise()}}),x.support=function(t){var n=o.createElement("input"),r=o.createDocumentFragment(),i=o.createElement("div"),s=o.createElement("select"),u=s.appendChild(o.createElement("option"));return n.type?(n.type="checkbox",t.checkOn=""!==n.value,t.optSelected=u.selected,t.reliableMarginRight=!0,t.boxSizingReliable=!0,t.pixelPosition=!1,n.checked=!0,t.noCloneChecked=n.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!u.disabled,n=o.createElement("input"),n.value="t",n.type="radio",t.radioValue="t"===n.value,n.setAttribute("checked","t"),n.setAttribute("name","t"),r.appendChild(n),t.checkClone=r.cloneNode(!0).cloneNode(!0).lastChild.checked,t.focusinBubbles="onfocusin"in e,i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===i.style.backgroundClip,x(function(){var n,r,s="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",u=o.getElementsByTagName("body")[0];u&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",u.appendChild(n).appendChild(i),i.innerHTML="",i.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",x.swap(u,null!=u.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===i.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(i,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(i,null)||{width:"4px"}).width,r=i.appendChild(o.createElement("div")),r.style.cssText=i.style.cssText=s,r.style.marginRight=r.style.width="0",i.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),u.removeChild(n))}),t):t}({});var L,q,H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,O=/([A-Z])/g;F.uid=1,F.accepts=function(e){return e.nodeType?1===e.nodeType||9===e.nodeType:!0},F.prototype={key:function(e){if(!F.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=F.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,x.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),s=this.cache[i];if("string"==typeof t)s[t]=n;else if(x.isEmptyObject(s))x.extend(this.cache[i],t);else for(r in t)s[r]=t[r];return s},get:function(e,t){var n=this.cache[this.key(e)];return t===undefined?n:n[t]},access:function(e,t,n){var r;return t===undefined||t&&"string"==typeof t&&n===undefined?(r=this.get(e,t),r!==undefined?r:this.get(e,x.camelCase(t))):(this.set(e,t,n),n!==undefined?n:t)},remove:function(e,t){var n,r,i,s=this.key(e),o=this.cache[s];if(t===undefined)this.cache[s]={};else{x.isArray(t)?r=t.concat(t.map(x.camelCase)):(i=x.camelCase(t),t in o?r=[t,i]:(r=i,r=r in o?[r]:r.match(w)||[])),n=r.length;while(n--)delete o[r[n]]}},hasData:function(e){return!x.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}},L=new F,q=new F,x.extend({acceptData:F.accepts,hasData:function(e){return L.hasData(e)||q.hasData(e)},data:function(e,t,n){return L.access(e,t,n)},removeData:function(e,t){L.remove(e,t)},_data:function(e,t,n){return q.access(e,t,n)},_removeData:function(e,t){q.remove(e,t)}}),x.fn.extend({data:function(e,t){var n,r,i=this[0],s=0,o=null;if(e===undefined){if(this.length&&(o=L.get(i),1===i.nodeType&&!q.get(i,"hasDataAttrs"))){for(n=i.attributes;n.length>s;s++)r=n[s].name,0===r.indexOf("data-")&&(r=x.camelCase(r.slice(5)),P(i,r,o[r]));q.set(i,"hasDataAttrs",!0)}return o}return"object"==typeof e?this.each(function(){L.set(this,e)}):x.access(this,function(t){var n,r=x.camelCase(e);if(i&&t===undefined){if(n=L.get(i,e),n!==undefined)return n;if(n=L.get(i,r),n!==undefined)return n;if(n=P(i,r,undefined),n!==undefined)return n}else this.each(function(){var n=L.get(this,r);L.set(this,r,t),-1!==e.indexOf("-")&&n!==undefined&&L.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){L.remove(this,e)})}}),x.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=q.get(e,t),n&&(!r||x.isArray(n)?r=q.access(e,t,x.makeArray(n)):r.push(n)),r||[]):undefined},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),s=x._queueHooks(e,t),o=function(){x.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return q.get(e,n)||q.access(e,n,{empty:x.Callbacks("once memory").add(function(){q.remove(e,[t+"queue",n])})})}}),x.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),n>arguments.length?x.queue(this[0],e):t===undefined?this:this.each(function(){var n=x.queue(this,e,t);x._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=x.Deferred(),s=this,o=this.length,u=function(){--r||i.resolveWith(s,[s])};"string"!=typeof e&&(t=e,e=undefined),e=e||"fx";while(o--)n=q.get(s[o],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(u));return u(),i.promise(t)}});var R,M,W=/[\t\r\n\f]/g,$=/\r/g,B=/^(?:input|select|textarea|button)$/i;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[x.propFix[e]||e]})},addClass:function(e){var t,n,r,i,s,o=0,u=this.length,a="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(a)for(t=(e||"").match(w)||[];u>o;o++)if(n=this[o],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):" ")){s=0;while(i=t[s++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,s,o=0,u=this.length,a=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(a)for(t=(e||"").match(w)||[];u>o;o++)if(n=this[o],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):"")){s=0;while(i=t[s++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,i=0,s=x(this),o=e.match(w)||[];while(t=o[i++])s.hasClass(t)?s.removeClass(t):s.addClass(t)}else(n===r||"boolean"===n)&&(this.className&&q.set(this,"__className__",this.className),this.className=this.className||e===!1?"":q.get(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(W," ").indexOf(t)>=0)return!0;return!1},val:function(e){var t,n,r,i=this[0];if(arguments.length)return r=x.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,x(this).val()):e,null==i?i="":"number"==typeof i?i+="":x.isArray(i)&&(i=x.map(i,function(e){return null==e?"":e+""})),t=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&t.set(this,i,"value")!==undefined||(this.value=i))});if(i)return t=x.valHooks[i.type]||x.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&(n=t.get(i,"value"))!==undefined?n:(n=i.value,"string"==typeof n?n.replace($,""):null==n?"":n)}}),x.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s="select-one"===e.type||0>i,o=s?null:[],u=s?i+1:r.length,a=0>i?u:s?i:0;for(;u>a;a++)if(n=r[a],!(!n.selected&&a!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),s)return t;o.push(t)}return o},set:function(e,t){var n,r,i=e.options,s=x.makeArray(t),o=i.length;while(o--)r=i[o],(r.selected=x.inArray(x(r).val(),s)>=0)&&(n=!0);return n||(e.selectedIndex=-1),s}}},attr:function(e,t,n){var i,s,o=e.nodeType;if(e&&3!==o&&8!==o&&2!==o)return typeof e.getAttribute===r?x.prop(e,t,n):(1===o&&x.isXMLDoc(e)||(t=t.toLowerCase(),i=x.attrHooks[t]||(x.expr.match.bool.test(t)?M:R)),n===undefined?i&&"get"in i&&null!==(s=i.get(e,t))?s:(s=x.find.attr(e,t),null==s?undefined:s):null!==n?i&&"set"in i&&(s=i.set(e,n,t))!==undefined?s:(e.setAttribute(t,n+""),n):(x.removeAttr(e,t),undefined))},removeAttr:function(e,t){var n,r,i=0,s=t&&t.match(w);if(s&&1===e.nodeType)while(n=s[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,s,o=e.nodeType;if(e&&3!==o&&8!==o&&2!==o)return s=1!==o||!x.isXMLDoc(e),s&&(t=x.propFix[t]||t,i=x.propHooks[t]),n!==undefined?i&&"set"in i&&(r=i.set(e,n,t))!==undefined?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||B.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),M={set:function(e,t,n){return t===!1?x.removeAttr(e,n):e.setAttribute(n,n),n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,t){var n=x.expr.attrHandle[t]||x.find.attr;x.expr.attrHandle[t]=function(e,t,r){var i=x.expr.attrHandle[t],s=r?undefined:(x.expr.attrHandle[t]=undefined)!=n(e,t,r)?t.toLowerCase():null;return x.expr.attrHandle[t]=i,s}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,t){return x.isArray(t)?e.checked=x.inArray(x(e).val(),t)>=0:undefined}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var I=/^key/,z=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,X=/^([^.]*)(?:\.(.+)|)$/;x.event={global:{},add:function(e,t,n,i,s){var o,u,a,f,l,c,h,p,d,v,m,g=q.get(e);if(g){n.handler&&(o=n,n=o.handler,s=o.selector),n.guid||(n.guid=x.guid++),(f=g.events)||(f=g.events={}),(u=g.handle)||(u=g.handle=function(e){return typeof x===r||e&&x.event.triggered===e.type?undefined:x.event.dispatch.apply(u.elem,arguments)},u.elem=e),t=(t||"").match(w)||[""],l=t.length;while(l--)a=X.exec(t[l])||[],d=m=a[1],v=(a[2]||"").split(".").sort(),d&&(h=x.event.special[d]||{},d=(s?h.delegateType:h.bindType)||d,h=x.event.special[d]||{},c=x.extend({type:d,origType:m,data:i,handler:n,guid:n.guid,selector:s,needsContext:s&&x.expr.match.needsContext.test(s),namespace:v.join(".")},o),(p=f[d])||(p=f[d]=[],p.delegateCount=0,h.setup&&h.setup.call(e,i,v,u)!==!1||e.addEventListener&&e.addEventListener(d,u,!1)),h.add&&(h.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),s?p.splice(p.delegateCount++,0,c):p.push(c),x.event.global[d]=!0);e=null}},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,v,m=q.hasData(e)&&q.get(e);if(m&&(a=m.events)){t=(t||"").match(w)||[""],f=t.length;while(f--)if(u=X.exec(t[f])||[],p=v=u[1],d=(u[2]||"").split(".").sort(),p){c=x.event.special[p]||{},p=(r?c.delegateType:c.bindType)||p,h=a[p]||[],u=u[2]&&RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),o=s=h.length;while(s--)l=h[s],!i&&v!==l.origType||n&&n.guid!==l.guid||u&&!u.test(l.namespace)||r&&r!==l.selector&&("**"!==r||!l.selector)||(h.splice(s,1),l.selector&&h.delegateCount--,c.remove&&c.remove.call(e,l));o&&!h.length&&(c.teardown&&c.teardown.call(e,d,m.handle)!==!1||x.removeEvent(e,p,m.handle),delete a[p])}else for(p in a)x.event.remove(e,p+t[f],n,r,!0);x.isEmptyObject(a)&&(delete m.handle,q.remove(e,"events"))}},trigger:function(t,n,r,i){var s,u,a,f,l,c,h,p=[r||o],d=y.call(t,"type")?t.type:t,v=y.call(t,"namespace")?t.namespace.split("."):[];if(u=a=r=r||o,3!==r.nodeType&&8!==r.nodeType&&!_.test(d+x.event.triggered)&&(d.indexOf(".")>=0&&(v=d.split("."),d=v.shift(),v.sort()),l=0>d.indexOf(":")&&"on"+d,t=t[x.expando]?t:new x.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=v.join("."),t.namespace_re=t.namespace?RegExp("(^|\\.)"+v.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=undefined,t.target||(t.target=r),n=null==n?[t]:x.makeArray(n,[t]),h=x.event.special[d]||{},i||!h.trigger||h.trigger.apply(r,n)!==!1)){if(!i&&!h.noBubble&&!x.isWindow(r)){for(f=h.delegateType||d,_.test(f+d)||(u=u.parentNode);u;u=u.parentNode)p.push(u),a=u;a===(r.ownerDocument||o)&&p.push(a.defaultView||a.parentWindow||e)}s=0;while((u=p[s++])&&!t.isPropagationStopped())t.type=s>1?f:h.bindType||d,c=(q.get(u,"events")||{})[t.type]&&q.get(u,"handle"),c&&c.apply(u,n),c=l&&u[l],c&&x.acceptData(u)&&c.apply&&c.apply(u,n)===!1&&t.preventDefault();return t.type=d,i||t.isDefaultPrevented()||h._default&&h._default.apply(p.pop(),n)!==!1||!x.acceptData(r)||l&&x.isFunction(r[d])&&!x.isWindow(r)&&(a=r[l],a&&(r[l]=null),x.event.triggered=d,r[d](),x.event.triggered=undefined,a&&(r[l]=a)),t.result}},dispatch:function(e){e=x.event.fix(e);var t,n,r,i,s,o=[],u=d.call(arguments),a=(q.get(this,"events")||{})[e.type]||[],f=x.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!f.preDispatch||f.preDispatch.call(this,e)!==!1){o=x.event.handlers.call(this,e,a),t=0;while((i=o[t++])&&!e.isPropagationStopped()){e.currentTarget=i.elem,n=0;while((s=i.handlers[n++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(s.namespace))&&(e.handleObj=s,e.data=s.data,r=((x.event.special[s.origType]||{}).handle||s.handler).apply(i.elem,u),r!==undefined&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return f.postDispatch&&f.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,s,o=[],u=t.delegateCount,a=e.target;if(u&&a.nodeType&&(!e.button||"click"!==e.type))for(;a!==this;a=a.parentNode||this)if(a.disabled!==!0||"click"!==e.type){for(r=[],n=0;u>n;n++)s=t[n],i=s.selector+" ",r[i]===undefined&&(r[i]=s.needsContext?x(i,this).index(a)>=0:x.find(i,this,null,[a]).length),r[i]&&r.push(s);r.length&&o.push({elem:a,handlers:r})}return t.length>u&&o.push({elem:this,handlers:t.slice(u)}),o},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,s=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||o,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||s===undefined||(e.which=1&s?1:2&s?3:4&s?2:0),e}},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,s=e,u=this.fixHooks[i];u||(this.fixHooks[i]=u=z.test(i)?this.mouseHooks:I.test(i)?this.keyHooks:{}),r=u.props?this.props.concat(u.props):this.props,e=new x.Event(s),t=r.length;while(t--)n=r[t],e[n]=s[n];return e.target||(e.target=o),3===e.target.nodeType&&(e.target=e.target.parentNode),u.filter?u.filter(e,s):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==V()&&this.focus?(this.focus(),!1):undefined},delegateType:"focusin"},blur:{trigger:function(){return this===V()&&this.blur?(this.blur(),!1):undefined},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&x.nodeName(this,"input")?(this.click(),!1):undefined},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==undefined&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},x.Event=function(e,t){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.getPreventDefault&&e.getPreventDefault()?U:Y):this.type=e,t&&x.extend(this,t),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,undefined):new x.Event(e,t)},x.Event.prototype={isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=U,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=U,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=U,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t),n}}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,t,n,r,i){var s,o;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=undefined);for(o in e)this.on(o,t,n,e[o],i);return this}if(null==n&&null==r?(r=t,n=t=undefined):null==r&&("string"==typeof t?(r=n,n=undefined):(r=n,n=t,t=undefined)),r===!1)r=Y;else if(!r)return this;return 1===i&&(s=r,r=function(e){return x().off(e),s.apply(this,arguments)},r.guid=s.guid||(s.guid=x.guid++)),this.each(function(){x.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,x(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=undefined),n===!1&&(n=Y),this.each(function(){x.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?x.event.trigger(e,t,n,!0):undefined}});var G=/^.[^:#\[\.,]*$/,J=/^(?:parents|prev(?:Until|All))/,Q=x.expr.match.needsContext,K={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t=x(e,this),n=t.length;return this.filter(function(){var e=0;for(;n>e;e++)if(x.contains(this,t[e]))return!0})},not:function(e){return this.pushStack(et(this,e||[],!0))},filter:function(e){return this.pushStack(et(this,e||[],!1))},is:function(e){return!!et(this,"string"==typeof e&&Q.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,s=[],o=Q.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(o?o.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=s.push(n);break}return this.pushStack(s.length>1?x.unique(s):s)},index:function(e){return e?"string"==typeof e?g.call(x(e),this[0]):g.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return Z(e,"nextSibling")},prev:function(e){return Z(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return e.contentDocument||x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(K[e]||x.unique(i),J.test(e)&&i.reverse()),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,t,n){var r=[],i=n!==undefined;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&x(e).is(n))break;r.push(e)}return r},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});var tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,nt=/<([\w:]+)/,rt=/<|&#?\w+;/,it=/<(?:script|style|link)/i,ot=/^(?:checkbox|radio)$/i,st=/checked\s*(?:[^=]|=\s*.checked.)/i,at=/^$|\/(?:java|ecma)script/i,ut=/^true\/(.*)/,lt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ct={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ct.optgroup=ct.option,ct.tbody=ct.tfoot=ct.colgroup=ct.caption=ct.thead,ct.th=ct.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===undefined?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(mt(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&dt(mt(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++)1===e.nodeType&&(x.cleanData(mt(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var t=this[0]||{},n=0,r=this.length;if(e===undefined&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!it.test(e)&&!ct[(nt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(tt,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(x.cleanData(mt(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=f.apply([],e);var r,i,s,o,u,a,l=0,c=this.length,h=this,p=c-1,d=e[0],v=x.isFunction(d);if(v||!(1>=c||"string"!=typeof d||x.support.checkClone)&&st.test(d))return this.each(function(r){var i=h.eq(r);v&&(e[0]=d.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(r=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),i=r.firstChild,1===r.childNodes.length&&(r=i),i)){for(s=x.map(mt(r,"script"),ft),o=s.length;c>l;l++)u=r,l!==p&&(u=x.clone(u,!0,!0),o&&x.merge(s,mt(u,"script"))),t.call(this[l],u,l);if(o)for(a=s[s.length-1].ownerDocument,x.map(s,ht),l=0;o>l;l++)u=s[l],at.test(u.type||"")&&!q.access(u,"globalEval")&&x.contains(a,u)&&(u.src?x._evalUrl(u.src):x.globalEval(u.textContent.replace(lt,"")))}return this}}),x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=[],i=x(e),s=i.length-1,o=0;for(;s>=o;o++)n=o===s?this:this.clone(!0),x(i[o])[t](n),h.apply(r,n.get());return this.pushStack(r)}}),x.extend({clone:function(e,t,n){var r,i,s,o,u=e.cloneNode(!0),a=x.contains(e.ownerDocument,e);if(!(x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(o=mt(u),s=mt(e),r=0,i=s.length;i>r;r++)yt(s[r],o[r]);if(t)if(n)for(s=s||mt(e),o=o||mt(u),r=0,i=s.length;i>r;r++)gt(s[r],o[r]);else gt(e,u);return o=mt(u,"script"),o.length>0&&dt(o,!a&&mt(e,"script")),u},buildFragment:function(e,t,n,r){var i,s,o,u,a,f,l=0,c=e.length,h=t.createDocumentFragment(),p=[];for(;c>l;l++)if(i=e[l],i||0===i)if("object"===x.type(i))x.merge(p,i.nodeType?[i]:i);else if(rt.test(i)){s=s||h.appendChild(t.createElement("div")),o=(nt.exec(i)||["",""])[1].toLowerCase(),u=ct[o]||ct._default,s.innerHTML=u[1]+i.replace(tt,"<$1></$2>")+u[2],f=u[0];while(f--)s=s.lastChild;x.merge(p,s.childNodes),s=h.firstChild,s.textContent=""}else p.push(t.createTextNode(i));h.textContent="",l=0;while(i=p[l++])if((!r||-1===x.inArray(i,r))&&(a=x.contains(i.ownerDocument,i),s=mt(h.appendChild(i),"script"),a&&dt(s),n)){f=0;while(i=s[f++])at.test(i.type||"")&&n.push(i)}return h},cleanData:function(e){var t,n,r,i,s,o,u=x.event.special,a=0;for(;(n=e[a])!==undefined;a++){if(F.accepts(n)&&(s=n[q.expando],s&&(t=q.cache[s]))){if(r=Object.keys(t.events||{}),r.length)for(o=0;(i=r[o])!==undefined;o++)u[i]?x.event.remove(n,i):x.removeEvent(n,i,t.handle);q.cache[s]&&delete q.cache[s]}delete L.cache[n[L.expando]]}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}}),x.fn.extend({wrapAll:function(e){var t;return x.isFunction(e)?this.each(function(t){x(this).wrapAll(e.call(this,t))}):(this[0]&&(t=x(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var vt,xt,bt=/^(none|table(?!-c[ea]).+)/,wt=/^margin/,Tt=RegExp("^("+b+")(.*)$","i"),Ct=RegExp("^("+b+")(?!px)[a-z%]+$","i"),kt=RegExp("^([+-])=("+b+")","i"),Nt={BODY:"block"},Et={position:"absolute",visibility:"hidden",display:"block"},St={letterSpacing:0,fontWeight:400},jt=["Top","Right","Bottom","Left"],Dt=["Webkit","O","Moz","ms"];x.fn.extend({css:function(e,t){return x.access(this,function(e,t,n){var r,i,s={},o=0;if(x.isArray(t)){for(r=qt(e),i=t.length;i>o;o++)s[t[o]]=x.css(e,t[o],!1,r);return s}return n!==undefined?x.style(e,t,n):x.css(e,t)},e,t,arguments.length>1)},show:function(){return Ht(this,!0)},hide:function(){return Ht(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Lt(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=vt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,s,o,u=x.camelCase(t),a=e.style;return t=x.cssProps[u]||(x.cssProps[u]=At(a,u)),o=x.cssHooks[t]||x.cssHooks[u],n===undefined?o&&"get"in o&&(i=o.get(e,!1,r))!==undefined?i:a[t]:(s=typeof n,"string"===s&&(i=kt.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(x.css(e,t)),s="number"),null==n||"number"===s&&isNaN(n)||("number"!==s||x.cssNumber[u]||(n+="px"),x.support.clearCloneStyle||""!==n||0!==t.indexOf("background")||(a[t]="inherit"),o&&"set"in o&&(n=o.set(e,n,r))===undefined||(a[t]=n)),undefined)}},css:function(e,t,n,r){var i,s,o,u=x.camelCase(t);return t=x.cssProps[u]||(x.cssProps[u]=At(e.style,u)),o=x.cssHooks[t]||x.cssHooks[u],o&&"get"in o&&(i=o.get(e,!0,n)),i===undefined&&(i=vt(e,t,r)),"normal"===i&&t in St&&(i=St[t]),""===n||n?(s=parseFloat(i),n===!0||x.isNumeric(s)?s||0:i):i}}),vt=function(e,t,n){var r,i,s,o=n||qt(e),u=o?o.getPropertyValue(t)||o[t]:undefined,a=e.style;return o&&(""!==u||x.contains(e.ownerDocument,e)||(u=x.style(e,t)),Ct.test(u)&&wt.test(t)&&(r=a.width,i=a.minWidth,s=a.maxWidth,a.minWidth=a.maxWidth=a.width=u,u=o.width,a.width=r,a.minWidth=i,a.maxWidth=s)),u},x.each(["height","width"],function(e,t){x.cssHooks[t]={get:function(e,n,r){return n?0===e.offsetWidth&&bt.test(x.css(e,"display"))?x.swap(e,Et,function(){return Pt(e,t,r)}):Pt(e,t,r):undefined},set:function(e,n,r){var i=r&&qt(e);return Ot(e,n,r?Ft(e,t,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,t){return t?x.swap(e,{display:"inline-block"},vt,[e,"marginRight"]):undefined}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,t){x.cssHooks[t]={get:function(e,n){return n?(n=vt(e,t),Ct.test(n)?x(e).position()[t]+"px":n):undefined}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},s="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+jt[r]+t]=s[r]||s[r-2]||s[0];return i}},wt.test(e)||(x.cssHooks[e+t].set=Ot)});var Wt=/%20/g,$t=/\[\]$/,Bt=/\r?\n/g,It=/^(?:submit|button|image|reset|file)$/i,zt=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&zt.test(this.nodeName)&&!It.test(e)&&(this.checked||!ot.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(Bt,"\r\n")}}):{name:t.name,value:n.replace(Bt,"\r\n")}}).get()}}),x.param=function(e,t){var n,r=[],i=function(e,t){t=x.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(t===undefined&&(t=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){i(this.name,this.value)});else for(n in e)_t(n,e[n],t,i);return r.join("&").replace(Wt,"+")},x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var Xt,Ut,Yt=x.now(),Vt=/\?/,Gt=/#.*$/,Jt=/([?&])_=[^&]*/,Qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Kt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Zt=/^(?:GET|HEAD)$/,en=/^\/\//,tn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,nn=x.fn.load,rn={},on={},sn="*/".concat("*");try{Ut=i.href}catch(an){Ut=o.createElement("a"),Ut.href="",Ut=Ut.href}Xt=tn.exec(Ut.toLowerCase())||[],x.fn.load=function(e,t,n){if("string"!=typeof e&&nn)return nn.apply(this,arguments);var r,i,s,o=this,u=e.indexOf(" ");return u>=0&&(r=e.slice(u),e=e.slice(0,u)),x.isFunction(t)?(n=t,t=undefined):t&&"object"==typeof t&&(i="POST"),o.length>0&&x.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){s=arguments,o.html(r?x("<div>").append(x.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){o.each(n,s||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ut,type:"GET",isLocal:Kt.test(Xt[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":sn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?cn(cn(e,x.ajaxSettings),t):cn(x.ajaxSettings,e)},ajaxPrefilter:un(rn),ajaxTransport:un(on),ajax:function(e,t){function T(e,t,s,u){var f,m,g,b,w,S=t;2!==y&&(y=2,o&&clearTimeout(o),n=undefined,i=u||"",E.readyState=e>0?4:0,f=e>=200&&300>e||304===e,s&&(b=pn(l,E,s)),b=fn(l,b,E,f),f?(l.ifModified&&(w=E.getResponseHeader("Last-Modified"),w&&(x.lastModified[r]=w),w=E.getResponseHeader("etag"),w&&(x.etag[r]=w)),204===e||"HEAD"===l.type?S="nocontent":304===e?S="notmodified":(S=b.state,m=b.data,g=b.error,f=!g)):(g=S,(e||!S)&&(S="error",0>e&&(e=0))),E.status=e,E.statusText=(t||S)+"",f?p.resolveWith(c,[m,S,E]):p.rejectWith(c,[E,S,g]),E.statusCode(v),v=undefined,a&&h.trigger(f?"ajaxSuccess":"ajaxError",[E,l,f?m:g]),d.fireWith(c,[E,S]),a&&(h.trigger("ajaxComplete",[E,l]),--x.active||x.event.trigger("ajaxStop")))}"object"==typeof e&&(t=e,e=undefined),t=t||{};var n,r,i,s,o,u,a,f,l=x.ajaxSetup({},t),c=l.context||l,h=l.context&&(c.nodeType||c.jquery)?x(c):x.event,p=x.Deferred(),d=x.Callbacks("once memory"),v=l.statusCode||{},m={},g={},y=0,b="canceled",E={readyState:0,getResponseHeader:function(e){var t;if(2===y){if(!s){s={};while(t=Qt.exec(i))s[t[1].toLowerCase()]=t[2]}t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===y?i:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return y||(e=g[n]=g[n]||e,m[e]=t),this},overrideMimeType:function(e){return y||(l.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>y)for(t in e)v[t]=[v[t],e[t]];else E.always(e[E.status]);return this},abort:function(e){var t=e||b;return n&&n.abort(t),T(0,t),this}};if(p.promise(E).complete=d.add,E.success=E.done,E.error=E.fail,l.url=((e||l.url||Ut)+"").replace(Gt,"").replace(en,Xt[1]+"//"),l.type=t.method||t.type||l.method||l.type,l.dataTypes=x.trim(l.dataType||"*").toLowerCase().match(w)||[""],null==l.crossDomain&&(u=tn.exec(l.url.toLowerCase()),l.crossDomain=!(!u||u[1]===Xt[1]&&u[2]===Xt[2]&&(u[3]||("http:"===u[1]?"80":"443"))===(Xt[3]||("http:"===Xt[1]?"80":"443")))),l.data&&l.processData&&"string"!=typeof l.data&&(l.data=x.param(l.data,l.traditional)),ln(rn,l,t,E),2===y)return E;a=l.global,a&&0===x.active++&&x.event.trigger("ajaxStart"),l.type=l.type.toUpperCase(),l.hasContent=!Zt.test(l.type),r=l.url,l.hasContent||(l.data&&(r=l.url+=(Vt.test(r)?"&":"?")+l.data,delete l.data),l.cache===!1&&(l.url=Jt.test(r)?r.replace(Jt,"$1_="+Yt++):r+(Vt.test(r)?"&":"?")+"_="+Yt++)),l.ifModified&&(x.lastModified[r]&&E.setRequestHeader("If-Modified-Since",x.lastModified[r]),x.etag[r]&&E.setRequestHeader("If-None-Match",x.etag[r])),(l.data&&l.hasContent&&l.contentType!==!1||t.contentType)&&E.setRequestHeader("Content-Type",l.contentType),E.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+("*"!==l.dataTypes[0]?", "+sn+"; q=0.01":""):l.accepts["*"]);for(f in l.headers)E.setRequestHeader(f,l.headers[f]);if(!l.beforeSend||l.beforeSend.call(c,E,l)!==!1&&2!==y){b="abort";for(f in{success:1,error:1,complete:1})E[f](l[f]);if(n=ln(on,l,t,E)){E.readyState=1,a&&h.trigger("ajaxSend",[E,l]),l.async&&l.timeout>0&&(o=setTimeout(function(){E.abort("timeout")},l.timeout));try{y=1,n.send(m,T)}catch(S){if(!(2>y))throw S;T(-1,S)}}else T(-1,"No Transport");return E}return E.abort()},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,t){return x.get(e,undefined,t,"script")}}),x.each(["get","post"],function(e,t){x[t]=function(e,n,r,i){return x.isFunction(n)&&(i=i||r,r=n,n=undefined),x.ajax({url:e,type:t,dataType:i,data:n,success:r})}}),x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===undefined&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),x.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=x("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),o.head.appendChild(t[0])},abort:function(){n&&n()}}}});var hn=[],dn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=hn.pop()||x.expando+"_"+Yt++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(t,n,r){var i,s,o,u=t.jsonp!==!1&&(dn.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&dn.test(t.data)&&"data");return u||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=x.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,u?t[u]=t[u].replace(dn,"$1"+i):t.jsonp!==!1&&(t.url+=(Vt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return o||x.error(i+" was not called"),o[0]},t.dataTypes[0]="json",s=e[i],e[i]=function(){o=arguments},r.always(function(){e[i]=s,t[i]&&(t.jsonpCallback=n.jsonpCallback,hn.push(i)),o&&x.isFunction(s)&&s(o[0]),o=s=undefined}),"script"):undefined}),x.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var gn=x.ajaxSettings.xhr(),mn={0:200,1223:204},yn=0,vn={};e.ActiveXObject&&x(e).on("unload",function(){for(var e in vn)vn[e]();vn=undefined}),x.support.cors=!!gn&&"withCredentials"in gn,x.support.ajax=gn=!!gn,x.ajaxTransport(function(e){var t;return x.support.cors||gn&&!e.crossDomain?{send:function(n,r){var i,s,o=e.xhr();if(o.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)o[i]=e.xhrFields[i];e.mimeType&&o.overrideMimeType&&o.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)o.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete vn[s],t=o.onload=o.onerror=null,"abort"===e?o.abort():"error"===e?r(o.status||404,o.statusText):r(mn[o.status]||o.status,o.statusText,"string"==typeof o.responseText?{text:o.responseText}:undefined,o.getAllResponseHeaders()))}},o.onload=t(),o.onerror=t("error"),t=vn[s=yn++]=t("abort"),o.send(e.hasContent&&e.data||null)},abort:function(){t&&t()}}:undefined});var xn,bn,wn=/^(?:toggle|show|hide)$/,Tn=RegExp("^(?:([+-])=|)("+b+")([a-z%]*)$","i"),Cn=/queueHooks$/,kn=[An],Nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Tn.exec(t),s=i&&i[3]||(x.cssNumber[e]?"":"px"),o=(x.cssNumber[e]||"px"!==s&&+r)&&Tn.exec(x.css(n.elem,e)),u=1,a=20;if(o&&o[3]!==s){s=s||o[3],i=i||[],o=+r||1;do u=u||".5",o/=u,x.style(n.elem,e,o+s);while(u!==(u=n.cur()/r)&&1!==u&&--a)}return i&&(o=n.start=+o||+r||0,n.unit=s,n.end=i[1]?o+(i[1]+1)*i[2]:+i[2]),n}]};x.Animation=x.extend(jn,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Nn[n]=Nn[n]||[],Nn[n].unshift(t)},prefilter:function(e,t){t?kn.unshift(e):kn.push(e)}}),x.Tween=Ln,Ln.prototype={constructor:Ln,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(x.cssNumber[n]?"":"px")},cur:function(){var e=Ln.propHooks[this.prop];return e&&e.get?e.get(this):Ln.propHooks._default.get(this)},run:function(e){var t,n=Ln.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ln.propHooks._default.set(this),this}},Ln.prototype.init.prototype=Ln.prototype,Ln.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Ln.propHooks.scrollTop=Ln.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(qn(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Lt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),s=x.speed(t,n,r),o=function(){var t=jn(this,x.extend({},e),s);(i||q.get(this,"finish"))&&t.stop(!0)};return o.finish=o,i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=undefined),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",s=x.timers,o=q.get(this);if(i)o[i]&&o[i].stop&&r(o[i]);else for(i in o)o[i]&&o[i].stop&&Cn.test(i)&&r(o[i]);for(i=s.length;i--;)s[i].elem!==this||null!=e&&s[i].queue!==e||(s[i].anim.stop(n),t=!1,s.splice(i,1));(t||!n)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=q.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],s=x.timers,o=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=s.length;t--;)s[t].elem===this&&s[t].queue===e&&(s[t].anim.stop(!0),s.splice(t,1));for(t=0;o>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),x.each({slideDown:qn("show"),slideUp:qn("hide"),slideToggle:qn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=Ln.prototype.init,x.fx.tick=function(){var e,t=x.timers,n=0;for(xn=x.now();t.length>n;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||x.fx.stop(),xn=undefined},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){bn||(bn=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(bn),bn=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===undefined?this:this.each(function(t){x.offset.setOffset(this,e,t)});var t,n,i=this[0],s={top:0,left:0},o=i&&i.ownerDocument;if(o)return t=o.documentElement,x.contains(t,i)?(typeof i.getBoundingClientRect!==r&&(s=i.getBoundingClientRect()),n=Hn(o),{top:s.top+n.pageYOffset-t.clientTop,left:s.left+n.pageXOffset-t.clientLeft}):s},x.offset={setOffset:function(e,t,n){var r,i,s,o,u,a,f,l=x.css(e,"position"),c=x(e),h={};"static"===l&&(e.style.position="relative"),u=c.offset(),s=x.css(e,"top"),a=x.css(e,"left"),f=("absolute"===l||"fixed"===l)&&(s+a).indexOf("auto")>-1,f?(r=c.position(),o=r.top,i=r.left):(o=parseFloat(s)||0,i=parseFloat(a)||0),x.isFunction(t)&&(t=t.call(e,n,u)),null!=t.top&&(h.top=t.top-u.top+o),null!=t.left&&(h.left=t.left-u.left+i),"using"in t?t.using.call(e,h):c.css(h)}},x.fn.extend({position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===x.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(r=e.offset()),r.top+=x.css(e[0],"borderTopWidth",!0),r.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-x.css(n,"marginTop",!0),left:t.left-r.left-x.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;x.fn[t]=function(i){return x.access(this,function(t,i,s){var o=Hn(t);return s===undefined?o?o[n]:t[i]:(o?o.scrollTo(r?e.pageXOffset:s,r?s:e.pageYOffset):t[i]=s,undefined)},t,i,arguments.length,null)}}),x.each({Height:"height",Width:"width"},function(e,t){x.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){x.fn[r]=function(r,i){var s=arguments.length&&(n||"boolean"!=typeof r),o=n||(r===!0||i===!0?"margin":"border");return x.access(this,function(t,n,r){var i;return x.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):r===undefined?x.css(t,n,o):x.style(t,n,r,o)},t,s?r:undefined,s,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}),"object"==typeof e&&"object"==typeof e.document&&(e.jQuery=e.$=x)})(window)})(P,G,'/','jquery');});

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