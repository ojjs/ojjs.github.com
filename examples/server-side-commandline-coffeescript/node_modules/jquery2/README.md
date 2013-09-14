[![browser support](https://ci.testling.com/amiorin/jquery2.png)](https://ci.testling.com/amiorin/jquery2)
## Introduction
A patched version of jQuery 2.0.2 that doesn't create the global $.
It's supposed to be used with [node-browserify](https://github.com/substack/node-browserify).

## With Backbone

```js
// src/backbone.js
'use strict';

var jquery = require('jquery2');
var backbone = require('backbone');

backbone.$ = jquery;

module.exports = backbone;
```

```js
// src/main.js
'use strict';

var backbone = require('./backbone');

console.log(window.backbone);
// => undefined
console.log(backbone);
// => Backbone
console.log(window.$);
// => undefined
```
