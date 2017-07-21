import React from 'react'
import classNames from 'classnames'
import FieldDependencyManager from './fieldDependencyManager'
import { getStorage } from 'vc-cake'

const workspaceStorage = getStorage('workspaceStorage')

export default class EditFormSection extends React.Component {
  static propTypes = {
    tab: React.PropTypes.object.isRequired
  }

  section = null
  sectionHeader = null

  constructor (props) {
    super(props)
    this.state = {
      isActive: false,
      sectionDependenciesClasses: [],
      contentEnd: document.getElementById('vcv-editor-end')
    }
    this.toggleSection = this.toggleSection.bind(this)
  }

  componentDidMount () {
    if (this.props.tab.index === this.props.activeTabIndex) {
      this.toggleSection()
    }
    this.props.setFieldMount(this.props.tab.fieldKey, {
      ref: this.refs[ 'section' ],
      refComponent: this,
      refDomComponent: this.refs[ 'section' ]
    }, 'section')
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ isActive: nextProps.tab.index === nextProps.activeTabIndex })
  }

  componentDidUpdate (prevProps, prevState) {
    this.checkSectionPosition()
    workspaceStorage.state('scrollbarSettings').set({ checkHeight: true })
  }

  componentWillUnmount () {
    this.props.setFieldUnmount(this.props.tab.fieldKey, 'section')
  }

  /**
   * Set workspace storage state to scroll edit form if section content is below the fold
   */
  checkSectionPosition () {
    const { isActive } = this.state
    const headerRect = this.sectionHeader.getBoundingClientRect()
    const headerOffset = this.sectionHeader.offsetTop + headerRect.height
    if (isActive) {
      // will scroll to top
      workspaceStorage.state('scrollbarSettings').set({ scroll: headerOffset - headerRect.height })
      // will scroll 50px to bottom
      // workspaceStorage.state('scrollbarSettings').set({ scroll: headerOffset - contentEndRect.bottom + headerRect.height + 50 })
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
      return <FieldDependencyManager
        {...this.props}
        key={`edit-form-field-${param.key}`}
        fieldKey={param.key}
        updater={this.props.onElementChange}
        // updateDependencies={this.updateDependencyClasses}
      />
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

    return <div
      className={sectionClasses}
      key={tab.key}
      ref='section'
    >
      <div
        className='vcv-ui-edit-form-section-header'
        onClick={this.toggleSection}
        ref={(header) => { this.sectionHeader = header }}
      >
        {tabTitle}
      </div>
      <div className='vcv-ui-edit-form-section-content'>
        {this.getSectionFormFields(tab.params)}
      </div>
    </div>
  }
}