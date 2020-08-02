import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAndroid, faApple, faWindows, faChrome } from '@fortawesome/free-brands-svg-icons'
import { faClipboard, faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { 
	faExclamationTriangle, faExclamationCircle, faTimes, faArrowDown, faLink, 
	faLock, faCog, faPlusCircle, faSignOutAlt, faSignInAlt, faUserPlus, faUser,
	faGreaterThanEqual, faLessThan, faMinus, faPlus
} from '@fortawesome/free-solid-svg-icons'



library.add(
	faAndroid, faApple, faWindows, faChrome, faClipboard, faExclamationTriangle, faExclamationCircle, faTimes, 
	faArrowDown, faLink, faTrashAlt, faLock, faCog, faPlusCircle, faEdit, faSignInAlt, faSignOutAlt, faUserPlus, 
	faUser, faGreaterThanEqual, faLessThan, faMinus, faPlus)

Vue.component('font-awesome-icon', FontAwesomeIcon)