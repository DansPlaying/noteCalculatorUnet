import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUser, faHome, faBookmark, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faUser, faGithub, faBookmark, faHome, faSun, faMoon)

export default FontAwesomeIcon
