import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faCog,
  faGlobeAmericas,
  faPrint,
  faTable,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const fontAwesomeLibrary = [
  fab,
  faCog,
  faEnvelope,
  faGlobeAmericas,
  faPrint,
  faTable,
  faTimes,
];

library.add(...fontAwesomeLibrary);
