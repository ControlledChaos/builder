/*eslint jsx-quotes: [2, "prefer-double"]*/
import React from 'react'
import classNames from 'classnames'
import ReactDOM from 'react-dom'
import Resizer from '../../../content/resizer/component/resizer'

class BarContentStart extends React.Component {
  state = {
    contentComponent: null,
    contentProps: {},
    showContent: false,
    realWidth: 0
  }

  componentDidMount () {
    this.props.api.addAction('setStartContent', (Component, props = {}) => {
      this.setState({
        contentComponent: Component,
        contentProps: props
      })
    })
    this.props.api
      .reply('bar-content-start:show', () => {
        this.setState({ showContent: true })
      })
      .reply('bar-content-start:hide', () => {
        this.setState({ showContent: false })
      })
      .reply('bar-content-start:toggle', () => {
        if (this.state.showContent) {
          this.props.api.request('bar-content-start:hide')
        } else {
          this.props.api.request('bar-content-start:show')
        }
      })
    this.addResizeListener(ReactDOM.findDOMNode(this), this.handleElementResize)
    this.handleElementResize()
  }

  componentWillUnmount () {
    this.removeResizeListener(ReactDOM.findDOMNode(this), this.handleElementResize)
  }

  resizeCallback = (e) => {
    if (e && e.direction) {
      if (e.direction === 'left') {
        this.props.api.request('navbar:resizeLeft', e.offsetX)
      }
    }
  }

  handleElementResize = () => {
    let element = ReactDOM.findDOMNode(this)
    this.setState({
      realWidth: element.offsetWidth
    })
  }

  addResizeListener (element, fn) {
    let isIE = !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/Edge/))
    if (window.getComputedStyle(element).position === 'static') {
      element.style.position = 'relative'
    }
    var obj = element.__resizeTrigger__ = document.createElement('object')
    obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;')
    obj.__resizeElement__ = element
    obj.onload = function (e) {
      this.contentDocument.defaultView.addEventListener('resize', fn)
    }
    obj.type = 'text/html'
    if (isIE) {
      element.appendChild(obj)
    }
    obj.data = 'about:blank'
    if (!isIE) {
      element.appendChild(obj)
    }
  }

  removeResizeListener (element, fn) {
    element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize', fn)
    element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__)
  }

  render () {
    let content = null
    if (this.state.contentComponent) {
      content = React.createElement(this.state.contentComponent, this.state.contentProps)
    }
    let contentClasses = classNames({
      'vcv-layout-bar-content-start': true,
      'vcv-ui-state--visible': this.state.showContent,
      'vcv-media--xs': true,
      'vcv-media--sm': this.state.realWidth > 400,
      'vcv-media--md': this.state.realWidth > 800,
      'vcv-media--lg': this.state.realWidth > 1200,
      'vcv-media--xl': this.state.realWidth > 1600
    })

    return (
      <div className={contentClasses} id="vcv-editor-start">
        {content}
        <Resizer params={{
          resizeRight: true,
          resizerTargetRight: '.vcv-layout-bar-content-start',
          resizerClasses: 'vcv-ui-resizer vcv-ui-resizer-e vcv-ui-resizer-layout-placement-top vcv-ui-resizer-content-start-right'
        }} />
        <Resizer params={{
          resizeBottom: true,
          resizerTargetBottom: '.vcv-layout-bar-content',
          resizerClasses: 'vcv-ui-resizer vcv-ui-resizer-n vcv-ui-resizer-layout-placement-top vcv-ui-resizer-content-start-bottom'
        }} />
        <Resizer params={{
          resizeRight: true,
          resizeBottom: true,
          resizerTargetRight: '.vcv-layout-bar-content-start',
          resizerTargetBottom: '.vcv-layout-bar-content',
          resizerClasses: 'vcv-ui-resizer vcv-ui-resizer-nw vcv-ui-resizer-layout-placement-top vcv-ui-resizer-content-start-right-bottom'
        }} />

        <Resizer params={{
          resizeRight: true,
          resizerTargetRight: '.vcv-layout-bar-content',
          resizerClasses: 'vcv-ui-resizer vcv-ui-resizer-e vcv-ui-resizer-layout-placement-left vcv-ui-resizer-content-start-right'
        }} />
        <Resizer params={{
          resizeBottom: true,
          resizerTargetBottom: '.vcv-layout-bar-content-start',
          resizerClasses: 'vcv-ui-resizer vcv-ui-resizer-n vcv-ui-resizer-layout-placement-left vcv-ui-resizer-content-start-bottom'
        }} />
        <Resizer params={{
          resizeRight: true,
          resizeBottom: true,
          resizerTargetRight: '.vcv-layout-bar-content',
          resizerTargetBottom: '.vcv-layout-bar-content-start',
          resizerClasses: 'vcv-ui-resizer vcv-ui-resizer-nw vcv-ui-resizer-layout-placement-left vcv-ui-resizer-content-start-right-bottom'
        }} />

        <Resizer params={{
          resizeLeft: true,
          resizerTargetLeft: '.vcv-layout-bar-content',
          resizerClasses: 'vcv-ui-resizer vcv-ui-resizer-e vcv-ui-resizer-layout-placement-right vcv-ui-resizer-content-start-left'
        }} />
        <Resizer params={{
          resizeBottom: true,
          resizerTargetBottom: '.vcv-layout-bar-content-start',
          resizerClasses: 'vcv-ui-resizer vcv-ui-resizer-n vcv-ui-resizer-layout-placement-right vcv-ui-resizer-content-start-bottom'
        }} />
        <Resizer params={{
          resizeLeft: true,
          resizeBottom: true,
          resizerTargetLeft: '.vcv-layout-bar-content',
          resizerTargetBottom: '.vcv-layout-bar-content-start',
          resizerClasses: 'vcv-ui-resizer vcv-ui-resizer-ne vcv-ui-resizer-layout-placement-right vcv-ui-resizer-content-start-left-bottom'
        }} />

        <Resizer params={{
          resizeTop: true,
          resizerTargetTop: '.vcv-layout-bar-content',
          resizerClasses: 'vcv-ui-resizer vcv-ui-resizer-n vcv-ui-resizer-layout-placement-bottom vcv-ui-resizer-content-start-top'
        }} />
        <Resizer params={{
          resizeRight: true,
          resizerTargetRight: '.vcv-layout-bar-content-start',
          resizerClasses: 'vcv-ui-resizer vcv-ui-resizer-e vcv-ui-resizer-layout-placement-bottom vcv-ui-resizer-content-start-right'
        }} />
        <Resizer params={{
          resizeTop: true,
          resizeRight: true,
          resizerTargetTop: '.vcv-layout-bar-content',
          resizerTargetRight: '.vcv-layout-bar-content-start',
          resizerClasses: 'vcv-ui-resizer vcv-ui-resizer-ne vcv-ui-resizer-layout-placement-bottom vcv-ui-resizer-content-start-right-top'
        }} />

        <Resizer params={{
          resizeBottom: true,
          resizerTargetBottom: '.vcv-layout-bar-content-start',
          resizerClasses: 'vcv-ui-resizer vcv-ui-resizer-n vcv-ui-resizer-layout-placement-detached vcv-ui-resizer-content-start-bottom'
        }} />
        <Resizer params={{
          resizeLeft: true,
          resizeBottom: true,
          resizerTargetLeft: '.vcv-layout-bar',
          resizerTargetBottom: '.vcv-layout-bar-content-start',
          resizerClasses: 'vcv-ui-resizer vcv-ui-resizer-ne vcv-ui-resizer-layout-placement-detached vcv-ui-resizer-content-start-left-bottom',
          callback: this.resizeCallback
        }} />
        <Resizer params={{
          resizeRight: true,
          resizeBottom: true,
          resizerTargetRight: '.vcv-layout-bar',
          resizerTargetBottom: '.vcv-layout-bar-content-start',
          resizerClasses: 'vcv-ui-resizer vcv-ui-resizer-nw vcv-ui-resizer-layout-placement-detached vcv-ui-resizer-content-start-right-bottom'
        }} />
      </div>
    )
  }
}
BarContentStart.propTypes = {
  api: React.PropTypes.object.isRequired
}

export default BarContentStart
