import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { Component } from 'vue'

import {
  faUser,
  faHome,
  faBookmark,
  faSun,
  faMoon,
  faCalculator,
  faInfoCircle,
  faCheckCircle,
  faExclamationTriangle,
  faBars,
  faTimes,
  faCog,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

library.add(
  faUser,
  faGithub,
  faLinkedin,
  faBookmark,
  faHome,
  faSun,
  faMoon,
  faCalculator,
  faInfoCircle,
  faCheckCircle,
  faExclamationTriangle,
  faBars,
  faTimes,
  faCog,
  faArrowRight,
)

export default FontAwesomeIcon as Component
