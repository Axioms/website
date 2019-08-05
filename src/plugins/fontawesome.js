import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAndroid } from '@fortawesome/free-brands-svg-icons'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import { faWindows } from '@fortawesome/free-brands-svg-icons'
import { faChrome } from '@fortawesome/free-brands-svg-icons'
import { faClipboard } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

library.add(faAndroid, faApple, faWindows, faChrome, faClipboard, faExclamationTriangle, faExclamationCircle, faTimes, faArrowDown, faLink, faTrashAlt, faLock)

Vue.component('font-awesome-icon', FontAwesomeIcon)