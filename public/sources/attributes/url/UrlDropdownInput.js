import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

export default class UrlDropdownInput extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    updater: PropTypes.func.isRequired,
    fieldKey: PropTypes.string.isRequired
  }
  static VALUES = [
    'http://',
    'https://',
    'mailto:',
    'tel:'
  ]
  inputTimeout = 0
  dropdownTimeout = 0

  constructor (props) {
    super(props)
    this.state = {}
    this.state = this.stateFromValue(this.props.value)
    this.state.dropdownFocus = false
    this.state.inputFocus = false

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handleDropdownFocus = this.handleDropdownFocus.bind(this)
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this)
  }

  componentWillUnmount () {
    if (this.inputTimeout) {
      window.clearTimeout(this.inputTimeout)
      this.inputTimeout = 0
    }
    if (this.dropdownTimeout) {
      window.clearTimeout(this.dropdownTimeout)
      this.dropdownTimeout = 0
    }
  }

  setFieldValue (inputValue) {
    let result = this.stateFromValue(inputValue)
    this.props.updater(this.props.fieldKey, result.inputValue && result.dropdownValue && result.dropdownValue !== 'custom' ? `${result.dropdownValue}${result.inputValue}` : result.inputValue)
    this.setState(result)
  }

  stateFromValue (inputValue) {
    inputValue = inputValue.trim()
    let dropdownValue = UrlDropdownInput.VALUES[ 0 ] // Default protcol value
    if (inputValue) {
      dropdownValue = this.state.dropdownValue ? this.state.dropdownValue : 'custom'
    }

    let { protocol, protocolRegExp } = this.extractProtocol(inputValue)
    if (protocol) {
      dropdownValue = protocol

      // If not Custom then strip from input
      if (protocolRegExp) {
        inputValue = inputValue.replace(protocolRegExp, '')
      }
    }

    return {
      inputValue: inputValue || '',
      dropdownValue: dropdownValue
    }
  }

  extractProtocol (value) {
    let protocolRegExp = new RegExp(/^https?:\/\/|mailto:|tel:/)
    let match = value.match(protocolRegExp)
    if (match) {
      return {
        protocol: match[ 0 ],
        protocolRegExp: protocolRegExp
      }
    }

    return {
      protocol: false,
      protocolRegExp: false
    }
  }

  handleInputChange (e) {
    let inputValue = e.currentTarget.value
    let result = this.stateFromValue(inputValue)
    this.props.updater(this.props.fieldKey, result.inputValue && result.dropdownValue && result.dropdownValue !== 'custom' ? `${result.dropdownValue}${result.inputValue}` : result.inputValue)
    this.setState({
      inputValue: inputValue,
      dropdownValue: result.dropdownValue
    })
  }

  handleInputBlur (e) {
    let inputValue = e.currentTarget.value
    let result = this.stateFromValue(inputValue)
    this.setState({
      inputValue: result.inputValue,
      dropdownValue: result.dropdownValue
    })
  }

  handleDropdownSelect (e) {
    let dropdownValue = e.currentTarget.value
    this.props.updater(this.props.fieldKey, this.state.inputValue && dropdownValue && dropdownValue !== 'custom' ? `${dropdownValue}${this.state.inputValue}` : this.state.inputValue)
    this.setState({
      dropdownValue: dropdownValue
    })
  }

  handleInputFocus () {
    this.setState({ inputFocus: true })
    this.inputTimeout = setTimeout(() => {
      this.setState({ inputFocus: false })
    }, 400)
  }

  handleDropdownFocus () {
    this.setState({ dropdownFocus: true })
    this.dropdownTimeout = setTimeout(() => {
      this.setState({ dropdownFocus: false })
    }, 400)
  }

  getDropdown () {
    let options = []
    UrlDropdownInput.VALUES.forEach((item, index) => {
      options.push(<option key={`url-dropdown-item-${index}`} value={item}>{item}</option>)
    })
    options.push(<option key={`url-dropdown-item-${options.length}`} value='custom'>custom</option>)

    return (
      <select
        className='vcv-ui-form-dropdown'
        onChange={this.handleDropdownSelect}
        value={this.state.dropdownValue}
      >
        {options}
      </select>
    )
  }

  render () {
    const localizations = window.VCV_I18N && window.VCV_I18N()
    const urlInputPlaceholder = localizations ? localizations.urlInputPlaceholder : 'Enter destination URL'
    let dropdownContainerClasses = classNames({
      'vcv-ui-editor-dropdown-input-dropdown-container': true,
      'vcv-ui-editor-field-highlight': this.state.dropdownFocus
    })
    let inputContainerClasses = classNames({
      'vcv-ui-editor-dropdown-input-field-container': true,
      'vcv-ui-editor-field-highlight': this.state.inputFocus
    })

    return (
      <div className='vcv-ui-editor-dropdown-input-container'>
        <div
          className={dropdownContainerClasses}
          data-content={this.state.dropdownValue}
          onClick={this.handleDropdownFocus}
        >
          {this.getDropdown()}
        </div>
        <div className={inputContainerClasses}>
          <input
            className='vcv-ui-form-input vcv-ui-editor-dropdown-input-field'
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            type='text'
            value={this.state.inputValue}
            placeholder={urlInputPlaceholder}
            autoFocus
          />
        </div>
      </div>
    )
  }
}
