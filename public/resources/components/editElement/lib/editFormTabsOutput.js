import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import lodash from 'lodash'
import TabDependencyManager from './tabDependencyManager'
import FormDropdown from './formDropdown'

export default class EditFormTabsOutput extends React.Component {
  static propTypes = {
    element: React.PropTypes.object.isRequired,
    allTabs: React.PropTypes.array.isRequired,
    activeTabIndex: React.PropTypes.number.isRequired,
    onTabsMount: React.PropTypes.func.isRequired,
    onTabsUnmount: React.PropTypes.func.isRequired,
    setFieldMount: React.PropTypes.func.isRequired,
    setFieldUnmount: React.PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.onTabsMount(this.refs[ 'editorTabs' ], {
      tabsWrapper: ReactDOM.findDOMNode(this.refs[ 'editorTabsWrapper' ])
    })
  }

  componentWillUnmount () {
    this.props.onTabsUnmount(this.refs[ 'editorTabs' ], {
      tabsWrapper: ReactDOM.findDOMNode(this.refs[ 'editorTabsWrapper' ])
    })
  }

  getContainer = () => {
    return ReactDOM.findDOMNode(this.refs[ 'editorTabs' ])
  }

  render () {
    let { activeTabIndex, allTabs, setFieldMount, setFieldUnmount, element, showDropdown } = this.props
    let tabsHeaderOutput = []
    let formDropdown = ''
    let tabWrapperClasses = classNames({
      'vcv-ui-editor-tabs-wrapper': true,
      'vcv-ui-editor-tabs-wrapper-state--hidden': showDropdown
    })

    lodash.each(allTabs, (tab) => {
      tabsHeaderOutput.push(
        <TabDependencyManager
          {...tab}
          getContainer={this.getContainer}
          setFieldMount={setFieldMount}
          setFieldUnmount={setFieldUnmount}
          element={element}
          isActive={activeTabIndex === tab.index}
        />
      )
    })

    if (showDropdown) {
      formDropdown = (
        <FormDropdown
          activeTabIndex={activeTabIndex}
          allTabs={allTabs}
          setFieldMount={setFieldMount}
          setFieldUnmount={setFieldUnmount}
        />
      )
    }

    return (
      <div className='vcv-ui-editor-tabs-container'>
        <nav ref='editorTabs' className='vcv-ui-editor-tabs'>
          <div className={tabWrapperClasses} ref='editorTabsWrapper'>
            {tabsHeaderOutput}
          </div>
          {formDropdown}
        </nav>
      </div>
    )
  }
}
