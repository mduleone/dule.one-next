import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faChartBar,
  faCog,
  faGlobeAmericas,
  faInfinity,
  faInfoCircle,
  faPrint,
  faSpinner,
  faTable,
  faTimes,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import {
  faEnvelope,
  faKeyboard,
  faQuestionCircle,
} from '@fortawesome/free-regular-svg-icons';

const fontAwesomeLibrary = [
  fab,
  faChartBar,
  faCog,
  faEnvelope,
  faGlobeAmericas,
  faInfinity,
  faInfoCircle,
  faKeyboard,
  faPrint,
  faQuestionCircle,
  faSpinner,
  faTable,
  faTimes,
  faUndo,
];

library.add(...fontAwesomeLibrary);
