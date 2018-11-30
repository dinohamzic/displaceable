// TODO:
// 1. debounce resize and scroll events
// 2. create method to destroy resize and scroll event listeners

export default class Displaceable {

  constructor(nodes, settings = {}) {
    try {
      this.nodes = this.normalizeNodes(nodes)
      this.initializeSettings(settings)
      this.initializeTrigger()
    } catch (e) {
      return console.error(e)
    }

    this.initializeNodes()
    this.addEventListeners()
  }

  normalizeNodes(nodes) {
    if (!nodes) {
      throw new Error(
        `Unable to initialize Displaceable: ` +
        `"${nodes}" is not a Node, NodeLists or array of Nodes.`
      )
    }

    if (nodes instanceof Node) {
      return [nodes]
    }

    if (nodes instanceof NodeList) {
      return [].slice.call(nodes)
    }

    if (nodes instanceof Array) {
      nodes.forEach(node => {
        if (!(node instanceof Node)) {
          throw new Error(`"${node}" is not a valid Node.`)
        }
      })

      return nodes
    }
  }

  initializeSettings(customSettings) {
    this.settings = {
      displaceFactor: 3,
      lockX: false,
      lockY: false,
      resetTime: 1000,
      skewFactor: 5,
      trigger: window,
      ...customSettings
    }
  }

  initializeTrigger() {
    const { trigger } = this.settings

    if (!(trigger instanceof Node) && trigger !== window) {
      throw new Error(
        `"${trigger}" is not a valid displacement trigger. ` +
        `The displacement trigger must be a valid HTML Node.`
      )
    }

    const scrollY = window.scrollY

    if (trigger === window) {
      this.triggerCenterX = window.innerWidth / 2
      this.triggerCenterY = window.innerHeight / 2 + scrollY
    } else {
      const { x, y, width, height } = trigger.getBoundingClientRect()

      if (width === 0 || height === 0) {
        throw new Error(
          `"${trigger}" has invalid dimensions. ` +
          `Both width and height must be greater than zero.`
        )
      }

      this.triggerCenterX = x + width / 2
      this.triggerCenterY = y + height / 2 + scrollY
    }
  }

  initializeNodes() {
    this.nodes.forEach(node => {
      node.style.pointerEvents = `none`
      node.style.willChange = `transform`
    })
  }

  addEventListeners() {
    const { trigger } = this.settings
    trigger.onmousemove = e => this.handleMouseMove(e)
    trigger.onmouseout = () => this.handleMouseOut()
    window.addEventListener(`resize`, () => this.initializeTrigger())
    window.addEventListener(`onscroll`, () => this.initializeTrigger())
  }

  handleMouseMove(e) {
    window.requestAnimationFrame(() => this.animateNodes(e))
  }

  handleMouseOut() {
    const { resetTime } = this.settings

    window.requestAnimationFrame(() => {
      this.nodes.forEach(node => {
        node.style.transition = `transform ${resetTime}ms`
        node.style.transform = ``
      })
    })
  }

  animateNodes(e) {
    const mouseX = e.clientX
    const mouseY = e.clientY + window.scrollY

    const displacementStrengthX = mouseX - this.triggerCenterX
    const displacementStrengthY = mouseY - this.triggerCenterY

    let { displaceFactor, skewFactor } = this.settings

    this.nodes.forEach(node => {
      displaceFactor = node.dataset.displaceFactor
        ? parseFloat(node.dataset.displaceFactor)
        : displaceFactor

      skewFactor = node.dataset.skewFactor
        ? parseFloat(node.dataset.skewFactor)
        : skewFactor

      const normalizedSkewFactor = skewFactor / 100

      let displaceX = Math.sqrt(Math.abs(displacementStrengthX)) * displaceFactor
      let displaceY = Math.sqrt(Math.abs(displacementStrengthY)) * displaceFactor

      let skewX = Math.sqrt(Math.abs(displacementStrengthX)) * normalizedSkewFactor
      let skewY = Math.sqrt(Math.abs(displacementStrengthY)) * normalizedSkewFactor

      if (displacementStrengthX < 0) {
        displaceX *= -1
        skewX *= -1
        skewY *= -1
      }

      if (displacementStrengthY < 0) {
        displaceY *= -1
      }

      const transform = (
        `translate(${displaceX}px, ${displaceY}px) ` +
        `skew(${skewY}deg, ${skewX}deg)`
      )

      node.style.transition = `transform .05s`
      node.style.transform = transform
    })
  }

}
