import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faChartBar,
  faCog,
  faGlobeAmericas,
  faInfoCircle,
  faPrint,
  faTable,
  faTimes,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import {
  faEnvelope,
  faQuestionCircle,
} from '@fortawesome/free-regular-svg-icons';

const fontAwesomeLibrary = [
  fab,
  faChartBar,
  faCog,
  faEnvelope,
  faGlobeAmericas,
  faInfoCircle,
  faPrint,
  faQuestionCircle,
  faTable,
  faTimes,
  faUndo,
];

library.add(...fontAwesomeLibrary);
