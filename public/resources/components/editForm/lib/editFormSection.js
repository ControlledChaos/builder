import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import FieldDependencyManager from './fieldDependencyManager'

export default class EditFormSection extends React.Component {
  static propTypes = {
    tab: PropTypes.object.isRequired,
    onAttributeChange: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      isActive: true,
      sectionDependenciesClasses: []
    }
    this.toggleSection = this.toggleSection.bind(this)
  }

  componentDidMount () {
    if (this.props.tab.index === this.props.activeTabIndex) {
      window.setTimeout(() => {
        this.checkSectionPosition()
      }, 0)
    }

    this.props.setFieldMount(this.props.tab.fieldKey, {
      ref: this.section,
      refComponent: this,
      refDomComponent: this.section
    }, 'section')
  }

  componentDidUpdate (prevProps, prevState) {
    window.setTimeout(() => {
      this.checkSectionPosition(prevState)
    }, 0)
  }

  componentWillUnmount () {
    this.props.setFieldUnmount(this.props.tab.fieldKey, 'section')
  }

  /**
   * Set workspace storage state to scroll edit form if section content is below the fold
   */
  checkSectionPosition (prevState) {
    if (!this.sectionHeader) {
      return
    }
    const { isActive } = this.state
    if (prevState && !prevState.isActive && isActive || this.props.tab.index === this.props.activeTabIndex) {
      // will scroll to top
      let scrollbar = this.props.sectionContentScrollbar
      if (scrollbar) {
        const headerRect = this.sectionHeader.getBoundingClientRect()
        const headerOffset = this.sectionHeader.offsetTop + headerRect.height
        const offset = headerOffset - headerRect.height
        scrollbar.scrollTop(offset)
      }
    }
  }

  /**
   * Toggle section
   */
  toggleSection () {
    this.setState({ isActive: !this.state.isActive })
  }

  /**
   * Get section form fields
   * @param tabParams
   * @return Array
   */
  getSectionFormFields (tabParams) {
    return tabParams.map((param) => {
      const fieldType = param.data && param.data.type ? param.data.type.name : ''
      return (
        <FieldDependencyManager
          {...this.props}
          key={`edit-form-field-${param.key}`}
          fieldKey={param.key}
          fieldType={fieldType}
        />
      )
    })
  }

  render () {
    let { tab } = this.props
    let { isActive, sectionDependenciesClasses } = this.state
    let sectionClasses = classNames({
      'vcv-ui-edit-form-section': true,
      'vcv-ui-edit-form-section--opened': isActive,
      'vcv-ui-edit-form-section--closed': !isActive
    }, sectionDependenciesClasses)
    let tabTitle = tab.data.settings.options.label ? tab.data.settings.options.label : tab.data.settings.options.tabLabel

    return (
      <div className={sectionClasses} key={tab.key} ref={ref => { this.section = ref }}>
        <div className='vcv-ui-edit-form-section-header' onClick={this.toggleSection}
          ref={header => { this.sectionHeader = header }}>
          {tabTitle}
        </div>
        <form className='vcv-ui-edit-form-section-content'>
          {this.getSectionFormFields(tab.params)}
        </form>
      </div>
    )
  }
}