# displaceable

A tiny JavaScript library that handles super smooth element displacement on mouse move. Inspired by this [shot](https://dribbble.com/shots/5594494-Molley-Heltz-Inspiration-Page-Animation).

![Displaceable screen capture](screen-capture.gif)

---

## Demo and code examples

Live [demo](https://subtlebits.com/projects/displaceable) and React implementation [example](https://github.com/dinohamzic/www-subtlebits-com/blob/master/pages/projects/displaceable.js).

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

#### `settings` object

You can pass an object as the second parameter of `Displaceable()` to modify the settings of the current instance.

```js
const displaceable = new Displaceable(document.getElementById('id'), {
  displaceFactor: 3, // how much the nodes translate on mouse move (float)
  resetTime: 1000,   // how much it takes the nodes to reset when the mouse leaves the trigger area (ms)
  skewFactor: 5,     // how much the nodes skew on mouse move (float)
  trigger: window    // the element that responds to the on mouse move event (window or Node)
});
```

#### Data attributes: `data-displace-factor` and `data-skew-factor`

To control each Node independently, use the following data attributes. The value set in the data attribute will override the one in the configuration object only for that particular element.

```html
<img
     data-displace-factor="10"
     data-skew-factor="10"
     id="example-id"
/>
```
