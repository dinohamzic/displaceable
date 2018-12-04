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

You can pass an object as the second parameter of `Displaceable()` to modify the instance settings.

```js
const displaceable = new Displaceable(document.getElementById('node-id'), {
  displaceFactor: 5,
  lockY: true,
  resetTime: 500,
  skewFactor: 10,
  trigger: document.getElementById('trigger-id')
});
```

Property | Type | Default | Description
------ | ---- | ------- | -----------
displaceFactor | number | 3 | Multiplier for the translate transformation. The bigger the number, the more the Nodes will move. You can use a negative value to invert the direction of the movement.
lockX | boolean | false | If set to `true`, Nodes will only move on the Y axis.
lockY | boolean | false | If set to `true`, Nodes will only move on the X axis.
resetTime | number | 1000 | How fast the Nodes will return to their original position (in milliseconds).
skewFactor | number | 5 | Multiplier for the skew transformation. The bigger the number, the more Nodes will skew. You can use a negative value to invert the skewing direction.
trigger | window\|Node | window | The Node that triggers the displacement. It can be any Node with height and width greater than zero.

#### Data attributes:

- `data-displace-factor`
- `data-lock-x`
- `data-lock-y`
- `data-skew-factor`

To control each Node independently, use the following data attributes. The value set in the data attribute will override the one in the `settings` object only for that particular element.

```html
<img
  data-displace-factor="10"
  data-skew-factor="10"
  id="img-id"
/>

<div
  data-lock-y="true"
  id="div-id"
>
  I'm displaceable and I can only move horizontally!
</div>
```
