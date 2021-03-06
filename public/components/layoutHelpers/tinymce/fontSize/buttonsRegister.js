const ButtonsRegister = function (editor, window) {
  const getFontSizeItems = function () {
    const fontSizeFormats = '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 42pt 48pt 56pt 64pt 80pt 96pt'
    return fontSizeFormats.split(' ').map((item) => {
      let text = item
      let value = item
      let values = item.split('=')
      if (values.length > 1) {
        text = values[ 0 ]
        value = values[ 1 ]
      }
      return {
        text: text,
        value: value
      }
    })
  }

  const createFontSizeListBoxChangeHandler = function (editor, items) {
    const round = (number, precision) => {
      const factor = Math.pow(10, precision)
      return Math.round(number * factor) / factor
    }
    const toPt = (fontSize, precision) => {
      if (/[0-9.]+px$/.test(fontSize)) {
        return round(parseInt(fontSize, 10) * 72 / 96, precision || 0) + 'pt'
      }
      return fontSize
    }
    const findMatchingValue = (items, pt, px) => {
      let value
      items.forEach(function (item) {
        if (item.value === px) {
          value = px
        } else if (item.value === pt) {
          value = pt
        }
      })
      return value
    }

    return function () {
      let self = this
      editor.on('init nodeChange', (e) => {
        let px, pt, precision, match
        px = editor.queryCommandValue('FontSize')
        if (px) {
          for (precision = 3; !match && precision >= 0; precision--) {
            pt = toPt(px, precision)
            match = findMatchingValue(items, pt, px)
          }
        }
        self.value(match || null)
        if (!match) {
          self.text(pt)
        }
      })
    }
  }

  let fontSizeItems = getFontSizeItems()
  editor.addButton('fontSizeSelectAdvanced', {
    type: 'listbox',
    text: 'Font Sizes',
    tooltip: 'Font Sizes',
    fixedWidth: true,
    values: fontSizeItems,
    onPostRender: createFontSizeListBoxChangeHandler(editor, fontSizeItems),
    onselect: (e) => {
      const { value } = e.control.settings
      if (value) {
        editor.execCommand('FontSize', false, value)
      }
    }
  })
}

export default ButtonsRegister
