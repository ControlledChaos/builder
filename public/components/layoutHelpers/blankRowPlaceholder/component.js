import React from 'react'
import ElementControl from './lib/elementControl'
import vcCake from 'vc-cake'
import PropTypes from 'prop-types'

import oneColumnIcon from 'public/sources/images/blankRowPlaceholderIcons/oneColumn.raw'
import twoColumnsIcon from 'public/sources/images/blankRowPlaceholderIcons/twoColumns.raw'
import threeColumnsIcon from 'public/sources/images/blankRowPlaceholderIcons/threeColumns.raw'
import fourColumnsIcon from 'public/sources/images/blankRowPlaceholderIcons/fourColumns.raw'
import fiveColumnsIcon from 'public/sources/images/blankRowPlaceholderIcons/fiveColumns.raw'
import customIcon from 'public/sources/images/blankRowPlaceholderIcons/custom.raw'
import textBlockIcon from 'public/sources/images/blankRowPlaceholderIcons/textBlock.raw'
import addElementIcon from 'public/sources/images/blankRowPlaceholderIcons/addElement.raw'
import pasteIcon from 'public/sources/images/blankRowPlaceholderIcons/pasteIcon.raw'

import oneColumnIconLight from 'public/sources/images/blankRowPlaceholderIcons/oneColumnLight.raw'
import twoColumnsIconLight from 'public/sources/images/blankRowPlaceholderIcons/twoColumnsLight.raw'
import threeColumnsIconLight from 'public/sources/images/blankRowPlaceholderIcons/threeColumnsLight.raw'
import fourColumnsIconLight from 'public/sources/images/blankRowPlaceholderIcons/fourColumnsLight.raw'
import fiveColumnsIconLight from 'public/sources/images/blankRowPlaceholderIcons/fiveColumnsLight.raw'
import customIconLight from 'public/sources/images/blankRowPlaceholderIcons/customLight.raw'
import textBlockIconLight from 'public/sources/images/blankRowPlaceholderIcons/textBlockLight.raw'
import addElementIconLight from 'public/sources/images/blankRowPlaceholderIcons/addElementLight.raw'
import pasteIconLight from 'public/sources/images/blankRowPlaceholderIcons/pasteIconLight.raw'

const cook = vcCake.getService('cook')
const utils = vcCake.getService('utils')
const workspaceStorage = vcCake.getStorage('workspace')
const elementsStorage = vcCake.getStorage('elements')

export default class BlankRowPlaceholder extends React.Component {
  static propTypes = {
    api: PropTypes.object.isRequired
  }

  static localizations = window.VCV_I18N && window.VCV_I18N()
  static editorType = window.VCV_EDITOR_TYPE ? window.VCV_EDITOR_TYPE() : 'default'

  addedId = null
  iframeWindow = null

  constructor (props) {
    super(props)
    let copyData = (window.localStorage && window.localStorage.getItem('vcv-copy-data')) || workspaceStorage.state('copyData').get()
    if (!copyData) {
      copyData = false
    } else if (copyData.constructor === String) {
      try {
        copyData = JSON.parse(copyData)
      } catch (err) {
        copyData = false
      }
    }
    this.rowContainer = React.createRef()
    this.elementsContainer = React.createRef()
    this.state = {
      copyData
    }
    this.handleClick = this.handleClick.bind(this)
    this.setControlsLayout = this.setControlsLayout.bind(this)
    this.openEditForm = this.openEditForm.bind(this)
    this.getControls = this.getControls.bind(this)
  }

  componentDidMount () {
    utils.addResizeListener(this.rowContainer.current, {}, this.setControlsLayout)
  }

  componentDidUpdate () {
    if (!this.state.controlWidth) {
      this.setControlData()
    }
    if (!this.state.containerWidth && this.state.controlWidth) {
      this.setControlsLayout()
    }
  }

  componentWillUnmount () {
    utils.removeResizeListener(this.rowContainer.current, {}, this.setControlsLayout)
  }

  getControls () {
    return [
      {
        tag: 'row',
        options: {
          layout: { all: [ 'auto' ] },
          icon: BlankRowPlaceholder.editorType === 'default' || BlankRowPlaceholder.editorType === 'template' ? oneColumnIcon : oneColumnIconLight,
          title: BlankRowPlaceholder.localizations ? BlankRowPlaceholder.localizations.addOneColumn : 'Add one column'
        }
      },
      {
        tag: 'row',
        options: {
          layout: { all: [ 'auto', 'auto' ] },
          icon: BlankRowPlaceholder.editorType === 'default' || BlankRowPlaceholder.editorType === 'template' ? twoColumnsIcon : twoColumnsIconLight,
          title: BlankRowPlaceholder.localizations ? BlankRowPlaceholder.localizations.addTwoColumns : 'Add two columns'
        }
      },
      {
        tag: 'row',
        options: {
          layout: { all: [ 'auto', 'auto', 'auto' ] },
          icon: BlankRowPlaceholder.editorType === 'default' || BlankRowPlaceholder.editorType === 'template' ? threeColumnsIcon : threeColumnsIconLight,
          title: BlankRowPlaceholder.localizations ? BlankRowPlaceholder.localizations.addThreeColumns : 'Add three columns'
        }
      },
      {
        tag: 'row',
        options: {
          layout: { all: [ 'auto', 'auto', 'auto', 'auto' ] },
          icon: BlankRowPlaceholder.editorType === 'default' || BlankRowPlaceholder.editorType === 'template' ? fourColumnsIcon : fourColumnsIconLight,
          title: BlankRowPlaceholder.localizations ? BlankRowPlaceholder.localizations.addFourColumns : 'Add four columns'
        }
      },
      {
        tag: 'row',
        options: {
          layout: { all: [ 'auto', 'auto', 'auto', 'auto', 'auto' ] },
          icon: BlankRowPlaceholder.editorType === 'default' || BlankRowPlaceholder.editorType === 'template' ? fiveColumnsIcon : fiveColumnsIconLight,
          title: BlankRowPlaceholder.localizations ? BlankRowPlaceholder.localizations.addFiveColumns : 'Add five columns'
        }
      },
      {
        tag: 'row',
        options: {
          layout: { all: [ '66.66%', '33.34%' ] },
          icon: BlankRowPlaceholder.editorType === 'default' || BlankRowPlaceholder.editorType === 'template' ? customIcon : customIconLight,
          title: BlankRowPlaceholder.localizations ? BlankRowPlaceholder.localizations.addCustomRowLayout : 'Add custom row layout',
          type: 'custom'
        }
      },
      {
        tag: 'textBlock',
        options: {
          icon: BlankRowPlaceholder.editorType === 'default' || BlankRowPlaceholder.editorType === 'template' ? textBlockIcon : textBlockIconLight,
          title: BlankRowPlaceholder.localizations ? BlankRowPlaceholder.localizations.addTextBlock : 'Add Text block'
        }
      },
      {
        tag: 'addElement',
        options: {
          icon: BlankRowPlaceholder.editorType === 'default' || BlankRowPlaceholder.editorType === 'template' ? addElementIcon : addElementIconLight,
          title: BlankRowPlaceholder.localizations ? BlankRowPlaceholder.localizations.addElement : 'Add Element'
        }
      },
      {
        tag: 'paste',
        options: {
          icon: BlankRowPlaceholder.editorType === 'default' || BlankRowPlaceholder.editorType === 'template' ? pasteIcon : pasteIconLight,
          title: BlankRowPlaceholder.localizations ? BlankRowPlaceholder.localizations.paste : 'Paste'
        }
      }
    ]
  }

  /**
   * Handle click for element control, don't open edit form
   * @param element
   */
  handleElementControl (element) {
    elementsStorage.trigger('add', element)
  }

  /**
   * Handle click for element control, don't open edit form
   */
  handlePaste () {
    workspaceStorage.trigger('pasteEnd')
  }

  /**
   * Handle click for element control
   * @param element
   * @param tab
   */
  handleElementControlWithForm (element, tab = '') {
    elementsStorage.trigger('add', element)
    this.addedId = element.id

    let iframe = document.getElementById('vcv-editor-iframe')
    this.iframeWindow = iframe && iframe.contentWindow && iframe.contentWindow.window
    this.iframeWindow.vcv.on('ready', this.openEditForm)
  }

  /**
   * Open edit form
   * @param action
   * @param id
   */
  openEditForm (action, id) {
    if (action === 'add' && id === this.addedId) {
      workspaceStorage.trigger('edit', this.addedId, '')
      this.iframeWindow.vcv.off('ready', this.openEditForm)
    }
  }

  /**
   * Handle click for add element control, open add element form
   */
  handleAddElementControl () {
    workspaceStorage.trigger('add', '')
  }

  /**
   * Handle click for control depending on clicked control tag
   * @param control
   */
  handleClick (control) {
    if (control.tag === 'paste') {
      this.handlePaste()
    }
    if (control.tag === 'addElement') {
      this.handleAddElementControl()
    }
    if (control.tag === 'textBlock') {
      const element = cook.get({ tag: control.tag }).toJS()
      this.handleElementControlWithForm(element)
    }
    if (control.tag === 'row') {
      const layoutData = {
        layoutData: control.options.layout
      }
      const element = cook.get({ tag: control.tag, layout: layoutData }).toJS()
      if (control.options.type && control.options.type === 'custom') {
        this.handleElementControlWithForm(element, 'layout')
      } else {
        this.handleElementControl(element)
      }
    }
  }

  /**
   * Set state for the single control width, sum width of all controls
   */
  setControlData () {
    const controls = Array.prototype.slice.call(this.elementsContainer.current.children)
    const controlStyle = window.getComputedStyle(controls[0])
    const controlWidth = parseInt(controlStyle.width)
    const controlMargin = parseInt(controlStyle.marginLeft) + parseInt(controlStyle.marginRight)
    const controlFullWidth = controlWidth + controlMargin
    this.setState({
      controlWidth: controlFullWidth,
      controlsWidth: controlFullWidth * this.getControls().length
    })
  }

  /**
   * Set state for the width of element controls container
   */
  setControlsLayout () {
    const { controlWidth, controlsWidth } = this.state
    const containerWidth = this.rowContainer.current.getBoundingClientRect().width
    const elementsCount = Math.floor(containerWidth / controlWidth)
    let elementsWidth = elementsCount * controlWidth
    elementsWidth = elementsWidth < controlsWidth ? elementsWidth : null
    if (this.state.containerWidth !== elementsWidth) {
      this.setState({ containerWidth: elementsWidth })
    }
  }

  /**
   * Get control props
   * @param control
   * @param index
   * @return object
   */
  getControlProps (control, index) {
    return {
      key: 'vcvBlankRow' + control.tag + index,
      control: control,
      handleClick: this.handleClick
    }
  }

  /**
   * Get controls elements from controlsData
   * @return []
   */
  getElementControls () {
    return this.getControls().map((control, i) => {
      return <ElementControl {...this.getControlProps(control, i)} />
    })
  }

  render () {
    const elementControls = this.getElementControls()
    let containerWidth = {}
    if (this.state.containerWidth) {
      containerWidth.width = `${this.state.containerWidth}px`
    }

    const dragOverlayIcon = BlankRowPlaceholder.editorType === 'default' || BlankRowPlaceholder.editorType === 'template' ? addElementIcon : addElementIconLight

    return (
      <div
        className='vcvhelper vcv-ui-blank-row-container vcv-is-disabled-outline'
        ref={this.rowContainer}
      >
        <div className='vcv-ui-blank-row' id='vcv-ui-blank-row'>
          <div className='vcv-ui-blank-row-drag-overlay' dangerouslySetInnerHTML={{ __html: dragOverlayIcon }} />
          <div
            className='vcv-ui-blank-row-controls-container'
            style={containerWidth}
            ref={this.elementsContainer}
          >
            {elementControls}
          </div>
        </div>
      </div>
    )
  }
}
