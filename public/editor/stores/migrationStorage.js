import { addStorage, getStorage, getService, env } from 'vc-cake'
import React from 'react'
import ReactDOM from 'react-dom'
import PopupComponent from 'public/resources/components/migrationNotice/popupComponent'

addStorage('migration', (storage) => {
  const cook = getService('cook')
  const utils = getService('utils')
  const elementsStorage = getStorage('elements')

  if (env('FT_MIGRATION_NOTICE')) {
    storage.on('migrateContent', (contentData) => {
      // If no addon installed show popup with offer to install addon
      let iframeContent = document.getElementById('vcv-layout-iframe-content')

      const removePopup = () => {
        ReactDOM.unmountComponentAtNode(iframeContent)
      }
      const addPopup = () => {
        ReactDOM.render(
          <PopupComponent close={removePopup} />,
          iframeContent
        )
      }
      addPopup()
    })
  }

  storage.on('migrateContent', (contentData) => {
    window.setTimeout(() => {
      if (!contentData._migrated) {
        const textElement = cook.get({ tag: 'textBlock', output: utils.wpAutoP(contentData.content, '__VCVID__') })
        if (textElement) {
          elementsStorage.trigger('add', textElement.toJS())
        }
      }
    }, 15)
    // Timeout needed to be last in the call-stack
  })
})