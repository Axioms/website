import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAndroid } from '@fortawesome/free-brands-svg-icons'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import { faWindows } from '@fortawesome/free-brands-svg-icons'
import { faChrome } from '@fortawesome/free-brands-svg-icons'
import { faClipboard } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faAndroid, faApple, faWindows, faChrome, faClipboard)

Vue.component('font-awesome-icon', FontAwesomeIcon)