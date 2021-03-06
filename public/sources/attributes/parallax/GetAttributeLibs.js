import { getStorage } from 'vc-cake'

const assetsStorage = getStorage('assets')

export default (value) => {
  let libs = []
  const libNames = assetsStorage.state('attributeLibs').get()

  if (value && value.device && Object.keys(value.device).length) {
    for (let device in value.device) {
      if (value.device.hasOwnProperty(device)) {
        for (let fieldKey in value.device[ device ]) {
          if (value.device[ device ].hasOwnProperty(fieldKey)) {
            let matchField = libNames.find((lib) => {
              let matchKey = lib.fieldKey === fieldKey
              let currentValue = value.device[ device ][ fieldKey ]
              if (currentValue === '0' || currentValue === '1') {
                currentValue = !!parseInt(currentValue)
              }
              let matchValue = lib.value === currentValue
              return (matchKey && matchValue) || (fieldKey === 'animation')
            })
            if (matchField) {
              let libData = {
                name: '',
                dependencies: []
              }
              libData.name = matchField.library
              if (matchField.dependencies) {
                libData.dependencies.push(...matchField.dependencies)
              }
              libs.push(libData)
            }
          }
        }
      }
    }
  }

  return libs
}
