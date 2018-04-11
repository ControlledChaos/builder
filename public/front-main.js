import './polyfills'
/* global jQuery */
import publicAPI from './resources/api/publicAPI'
import './sources/less/front/init.less'

window.vcv = publicAPI

jQuery(document).ready(() => {
  window.vcv.trigger('ready')
}, false)
