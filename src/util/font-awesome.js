import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faGlobeAmericas, faPrint } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const fontAwesomeLibrary = [fab, faGlobeAmericas, faPrint, faEnvelope];

library.add(...fontAwesomeLibrary);
