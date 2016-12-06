/* eslint react/jsx-no-bind:"off" */
import React from 'react'
import Attribute from '../attribute'
import classNames from 'classnames'
import './css/styles.less'
import vcCake from 'vc-cake'
import FieldWrapper from './field-tabs'
const Cook = vcCake.getService('cook')
const AssetsManager = vcCake.getService('assets-manager')
const categoriesService = vcCake.getService('categories')

export default class ElementAttribute extends Attribute {
  static propTypes = {
    updater: React.PropTypes.func.isRequired,
    api: React.PropTypes.object.isRequired,
    fieldKey: React.PropTypes.string.isRequired,
    value: React.PropTypes.object.isRequired,
    element: React.PropTypes.object.isRequired,
    options: React.PropTypes.any
  }

  updateState (props) {
    let element = Cook.get(props.value)

    return {
      value: props.value,
      tag: props.value.tag,
      element: element,
      allTabs: ElementAttribute.updateTabs(element)
    }
  }

  onClickReplacement = (element) => {
    let cookElement = Cook.get(element)
    this.setState({
      value: element,
      tag: element.tag,
      element: cookElement,
      allTabs: ElementAttribute.updateTabs(cookElement)
    })
    this.setFieldValue(element)
  }

  changeShowReplacements = () => {
    this.setState({ showReplacements: !this.state.showReplacements })
  }

  static updateTabs (element) {
    let tabs = []
    ElementAttribute.editFormTabs(element).map((tab, index) => {
      let tabsData = {
        id: tab.key,
        index: index,
        data: tab.data,
        params: ElementAttribute.editFormTabParams(element, tab.key),
        key: `element-params-tab-${element.get('id')}-${tab.key}`
      }
      tabs.push(tabsData)
    }, ElementAttribute)

    return tabs
  }

  static editFormTabs (element) {
    const group = element.get('metaEditFormTabs')
    if (group && group.each) {
      return group.each(ElementAttribute.editFormTabsIterator.bind(this, element))
    }
    return []
  }

  static editFormTabsIterator (element, item) {
    return {
      key: item,
      value: element.get(item),
      data: element.settings(item)
    }
  }

  static editFormTabParams (element, tabName) {
    const value = element.get(tabName)
    const settings = element.settings(tabName)
    if (settings.settings.type === 'group' && value && value.each) {
      return value.each(ElementAttribute.editFormTabsIterator.bind(this, element))
    }
    // In case if tab is single param holder
    return [ {
      key: tabName,
      value: value,
      data: settings
    } ]
  }

  onChange = () => {
    this.setFieldValue(this.state.element.toJS())
  }

  render () {
    let replacements = ''

    let category = this.props.options.category || '*'
    let categorySettings = categoriesService.category(category)
    if (this.state.showReplacements) {
      let replacementItemsOutput = categorySettings.elements.map((tag) => {
        let cookElement = Cook.get({ tag: tag })
        let nameClasses = classNames({
          'vcv-ui-item-badge vcv-ui-badge--success': false,
          'vcv-ui-item-badge vcv-ui-badge--warning': false
        })

        let publicPathThumbnail

        if (vcCake.env('FEATURE_ASSETS_MANAGER')) {
          publicPathThumbnail = vcCake.getService('wipAssetsManager').getPublicPath(cookElement.get('tag'), cookElement.get('metaThumbnail'))
        } else {
          publicPathThumbnail = AssetsManager.getPublicPath(cookElement.get('tag'), cookElement.get('metaThumbnail'))
        }

        return <li key={'vcv-replace-element-' + cookElement.get('tag')} className='vcv-ui-item-list-item'>
          <a className='vcv-ui-item-element' onClick={this.onClickReplacement.bind(this, { tag: tag })}>
            <span className='vcv-ui-item-element-content'>
              <img className='vcv-ui-item-element-image' src={publicPathThumbnail}
                alt='' />
              <span className='vcv-ui-item-overlay'>
                <span className='vcv-ui-item-add vcv-ui-icon vcv-ui-icon-add' />
              </span>
            </span>
            <span className='vcv-ui-item-element-name'>
              <span className={nameClasses}>
                {cookElement.get('name')}
              </span>
            </span>
          </a>
        </li>
      })

      replacements = (
        <div className='vcv-ui-replace-element-container'>
          <a className='vcv-ui-replace-element-hide' title='Close' onClick={this.changeShowReplacements}>
            <i className='vcv-layout-bar-content-hide-icon vcv-ui-icon vcv-ui-icon-close-thin' />
          </a>
          <ul className='vcv-ui-replace-element-list'>
            {replacementItemsOutput}
          </ul>
        </div>
      )
    } else {
      replacements = (
        <div>
          <p
            className='vcv-ui-form-helper'
          >
            You can change the button within this element with another button from your elements
          </p>
          <button className='vcv-ui-form-button vcv-ui-form-button--default'
            onClick={this.changeShowReplacements}>
            Replace button
          </button>
        </div>
      )
    }

    let replacementBlock = ''
    if (categorySettings.elements.length > 1) {
      replacementBlock = (
        <div className='vcv-ui-replace-element-block'>
          {replacements}
        </div>
      )
    }

    return <div className='vcv-ui-form-element'>
      {replacementBlock}
      <FieldWrapper
        api={this.props.api}
        onChange={this.onChange}
        element={this.state.element}
        allTabs={this.state.allTabs}
      />
    </div>
  }
}
