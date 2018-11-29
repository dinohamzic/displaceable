# displaceable

A tiny JavaScript library that handles super smooth element displacement on mouse move.

---

## Setup

#### Install:

```bash
npm install displaceable
```

## Basic usage

#### Import:

```js
import Displaceable from 'displaceable';
```

#### Initialize:

```js
// single Node
const displaceable = new Displaceable(document.getElementById('id'));
```

or

```js
// NodeList
const displaceable = new Displaceable(document.querySelectorAll('img'));
```

or

```js
// array of Nodes
const displaceable = new Displaceable([
  document.getElementById('id-1'),
  document.getElementById('id-2'),
  document.getElementById('id-3')
]);
```

## Configuration

Coming soon...
