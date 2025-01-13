const resume = [
  {
    id: 'summary',
    title: 'Summary',
    noPrintBottomMargin: true,
    hideTitleForPrint: true,
    webOrder: -1,
    content:
      'Successful engineering leader with over a decade of meaningful organization-building and software contributions. Extensive experience providing solutions and building and working on teams across a myriad of industries including health and wellness, food-delivery services, and education. Strong collaborative leader who has consistently over-delivered. Proven track record of building clean, robust, maintainable products, and empowering others to do the same. Managed several complex projects servicing stakeholders across multiple business units. An ideal role would include leveraging my skills to create the future, while troubleshooting and solving problems of the past.',
  },
  {
    id: 'expertise',
    title: 'Areas of Expertise',
    content:
      'Engineering Management, Building Digital Products, Front End Application Architecture, Process Improvement, Future Innovations',
    webOrder: -1,
  },
  {
    id: 'work',
    title: 'Professional Experience',
    noPrintBottomMargin: true,
    subSections: [
      {
        id: 'atlassian',
        name: 'Atlassian',
        location: 'Remote',
        displayName: 'Atlassian, Jersey&nbsp;City,&nbsp;NJ (Remote)',
        date: 'December 2024 - Present',
        positions: [
          {
            title: 'Senior Software Engineer',
            date: 'December 2024 - Present',
          },
        ],
        content: '',
      },
      {
        id: 'care/of',
        name: 'Care/of',
        location: 'New York, NY',
        displayName:
          'Care/of (NoHo&nbsp;Health&nbsp;Inc.), New&nbsp;York,&nbsp;NY',
        date: 'February 2019 - July 2024',
        positions: [
          {
            title: 'Head of Engineering',
            date: 'August 2023 - July 2024',
          },
          {
            title: 'Director of Engineering',
            date: 'December 2021 - July 2023',
          },
          {
            title: 'Senior Engineering Manager',
            date: 'June 2020 - November 2021',
          },
          {
            title: 'Senior Software Engineer',
            date: 'February 2019 - May 2020',
          },
        ],
        content: `
          <div>
            Responsible for all technology efforts across the company, including Engineering, IT, and Security, and setting the 2+ year technical direction and vision.
            <ul>
              <li>
                Led multiple engineering teams, encompassing customer- and internally-facing digital product and physical product fulfillment operations.
              </li>
              <li>
                Led corporate IT and Security, as well as our technology-enabled fulfillment operations.
              </li>
              <li>
                Partnered with internal physical product stakeholders to ensure multiple successful key new product launches.
              </li>
              <li>
                Hired and promoted engineers and managers, and empowered managers to grow and promote skip-level reports.
              </li>
              <li>
                Built out Incident Response Procedures and Engineering on-call responsibilities.
              </li>
              <li>
                As an Individual Contributor, architected and orchestrated transitioning the Front End application from a React-rendering Rails monolith into a NextJS application—increasing engineer productivity and drastically decreasing site loading time.
              </li>
              <li>
                While Tech Lead of the Growth Product-Engineering team, improved key site-speed metrics by over 3-times, coupled with other conversion-enhancing tactics to increase site-wide conversion by over 7% while growing site traffic by 35%.
              </li>
              <li>
                Ensured GDPR and CCPA privacy, cookie policy, and data-deletion compliance.
              </li>
              <li>
                Partnered with internal Marketing stakeholders to architect implementation of Tag Manager solution.
              </li>
            </ul>
          </div>`,
        onlyPrintLastPosition: true,
      },
      {
        id: 'slice',
        name: 'Slice',
        location: 'New York, NY',
        displayName: 'Slice,&nbsp;New&nbsp;York,&nbsp;NY',
        date: 'October 2017 - February 2019',
        positions: [
          {
            title: 'Senior Software Engineer',
            date: 'October 2017 - February 2019',
          },
        ],
        content: `
          <div>
            Owned Front End of web-based customer-facing application and owner-facing application.
            <ul>
              <li>
                Created React+D3 chart library, used for visualizations for owners to track their progress and sales.
              </li>
              <li>
                Created and integrated standard JavaScript style and linting config across all JavaScript respositories.
              </li>
              <li>
                Architected redux store for customer-facing application (search, menu, checkout, order tracking).
              </li>
              <li>
                Rearchitected and reimplemented Checkout experience.
              </li>
              <li>
                Transitioned customer-facing application from React-on-Rails to Node.js application with server-side-rendering.
              </li>
            </ul>
          </div>`,
      },
      {
        id: 'grovo',
        name: 'Grovo Learning',
        location: 'New York, NY',
        displayName: 'Grovo&nbsp;Learning, New&nbsp;York,&nbsp;NY',
        date: 'December 2015 - September 2017',
        positions: [
          {
            title: 'Senior Front End Engineer',
            date: 'June 2017 - September 2017',
          },
          {
            title: 'Front End Engineer II',
            date: 'April 2016 - May 2017',
          },
          {
            title: 'Front End Engineer I',
            date: 'December 2015 - March 2016',
          },
        ],
        content: `
          <div>
            Front End technical lead.
            <ul>
              <li>
                Owned significant portions of flagship high-scale React/Redux application.
              </li>
              <li>
                Architected Redux store structure, saga implementation, and action normalization.
              </li>
              <li>
                Integrated with d3 to create data visualizations.
              </li>
            </ul>
          </div>`,
        onlyPrintLastPosition: true,
      },
      {
        id: 'nbc',
        name: 'NBCUniversal',
        location: 'Englewood Cliffs',
        displayName: 'NBCUniversal, Englewood&nbsp;Cliffs,&nbsp;NJ',
        date: 'June 2014 - December 2015',
        positions: [
          {
            title: 'Technical&nbsp;Associate - Media&nbsp;Labs',
            date: 'June 2014 - December 2015',
          },
        ],
        content: `
          <div>
            Developer, technical generalist, and mathematician on NBCUniversal's Technical Innovation team.
            <ul>
              <li>
                Ideated, designed, and prototyped solutions to issues across company footprint and all brands, from wearables in Universal Parks to web based solutions for Television networks including NBC, CNBC, and Telemundo.
              </li>
              <li>
                Participated in and acted as Technical/Developer Support during NBCUniversal hosted hackathons.
              </li>
              <li>
                Named Inventor on 2 Patents.
              </li>
            </ul>
          </div>`,
      },
      {
        id: 'issi',
        name: 'Innovative Software Solutions Inc.',
        location: 'Maple Shade, NJ',
        displayName:
          'Innovative&nbsp;Software Solutions&nbsp;Inc., Maple&nbsp;Shade,&nbsp;NJ',
        date: 'February 2012 - June 2014',
        positions: [
          {
            title: 'COBOL Programmer',
            date: 'February 2012 - June 2014',
          },
        ],
        content:
          '<div>Developed new custom software for Benefit Fund Administration, as well as resolved bugs as reported by clients.</div>',
      },
      {
        id: 'tdbank',
        name: 'TD Bank',
        location: 'Cherry Hill, NJ',
        displayName: 'TD Bank, Cherry&nbsp;Hill,&nbsp;NJ',
        date: 'July 2011 - February 2012',
        positions: [
          {
            title: 'Customer Service Representative',
            date: 'July 2011 - February 2012',
          },
        ],
        content:
          '<div>Provided excellent customer service by engaging customers, assessing their financial needs, responding to their questions and concerns, and nurturing the company-customer relationship.</div>',
        hideForPrint: true,
      },
    ],
  },
  {
    id: 'awards',
    title: 'Honors and Awards',
    noPrintBottomMargin: true,
    subSections: [
      {
        id: 'patents',
        displayName: 'Granted Patents',
        content: [
          {
            href: 'https://patents.google.com/patent/US10121170B2/en',
            printPrefix: 'US10121170B2',
            copy: 'System and method for minimizing a physical queue',
          },
          {
            href: 'https://patents.google.com/patent/US10075485B2/en',
            printPrefix: 'US10075485B2',
            copy: 'Animated snapshots',
          },
        ],
      },
      {
        id: 'techcrunch',
        displayName: 'TechCrunch Disrupt NYC Hackathon',
        href: 'https://disruptny2016.devpost.com/',
        date: 'May 2016',
        printHalfWidth: true,
        content: [
          {
            screenPrefix: 'Member of',
            copy: '<a href="http://holoassist.club/" target="_blank" rel="noopener noreferrer">HoloBots</a> (<a href="https://devpost.com/software/holobots/">devpost</a>), Multi-challenge Winner',
          },
        ],
      },
      {
        id: 'mastercard',
        displayName: 'MasterCard Masters of Code NYC Hackathon',
        href: 'http://www.hackathon.io/masters-new',
        date: 'November 2015',
        printHalfWidth: true,
        content: [
          {
            screenPrefix: 'Member of',
            copy: '<a href="http://www.hackathon.io/visual-ecommerce" target="_blank" rel="noopener noreferrer">Visual-eCommerce</a>, Runner Up',
          },
        ],
      },
      {
        id: 'putnam',
        displayName:
          'William Lowell Putnam Undergraduate Mathematics Competition',
        href: 'https://www.maa.org/math-competitions/william-lowell-putnam-mathematical-competition',
        date: '2009',
        content: '77<sup>th</sup> Percentile',
        hideForPrint: true,
      },
    ],
  },
  {
    id: 'projects',
    title: 'Open Source Projects',
    printPrefix: 'Selected',
    noPrintBottomMargin: true,
    subSections: [
      {
        id: 'tranquilIsalnd',
        displayName: 'Tranquil Island',
        // date: 'June 2018',
        content:
          'A generative-art project built using React and the canvas. Inspired by talks from several meetups and conferences.<br /><a href="https://tranquil-island.glitch.me" target="_blank" rel="noopener noreferrer">Make some art</a><br /><a href="https://glitch.com/edit/#!/remix/tranquil-island" target="_blank" rel="noopener noreferrer">Remix on Glitch</a>',
      },
      {
        id: 'reduxMajic',
        displayName: 'Redux Majic',
        // date: 'September 2017',
        content:
          '"Module Architecture for JsonAPI Ingesting Consumers" - Redux Majic makes building client-side JavaScript applications using <a href="http://redux.js.org/" target="_blank" rel="noopener noreferrer">Redux</a> against <a href="http://jsonapi.org/" target="_blank" rel="noopener noreferrer">JsonAPI</a> backends easier.<br /><a href="https://github.com/mduleone/redux-majic" target="_blank" rel="noopener noreferrer">Repository</a><br /><a href="https://www.npmjs.com/package/redux-majic" target="_blank" rel="noopener noreferrer">npm</a>',
      },
      {
        id: 'crapshoot',
        displayName: 'Crapshoot',
        // date: 'August 2017',
        content:
          '"Create React App Plus - Super Handy, Obviously Opinionated, Tested!" - An opinionated, scaffolded approach to building React/Redux Web Applications, with an unejected instance of Create React App as its base.<br /><a href="https://github.com/mduleone/crapshoot" target="_blank" rel="noopener noreferrer">Repository</a>',
      },
      {
        id: 'iot',
        displayName: 'Amazon IoT Button Starter Kit',
        // date: 'October 2016',
        content:
          'Built during <a href="https://hacktoberfest.digitalocean.com/" target="_blank" rel="noopener noreferrer">Hacktoberfest 2016</a>, this is a template project for an <a href="https://aws.amazon.com/iotbutton/" target="_blank" rel="noopener noreferrer">Amazon IoT Button</a> with a web interface.<br /><a href="https://github.com/mduleone/iotbutton-starter" target="_blank" rel="noopener noreferrer">Repository</a><br />',
        hideForPrint: true,
      },
      {
        id: '5cardAlexa',
        displayName: 'Five Card Draw - Amazon Alexa Skill',
        // date: 'January 2016 - March 2016',
        content:
          'An Amazon Alexa skill that lets you play Five Card Draw. Powered by Node Poker.<br /><a href="https://github.com/mduleone/alexaFivecard" target="_blank" rel="noopener noreferrer">Repository</a>',
        hideForPrint: true,
      },
      {
        id: 'poker',
        displayName: 'Node Poker',
        // date: 'January 2016',
        content:
          'Node.js implementation of hand-winner analysis for several poker variations, including a UI for Texas Hold\'em and an API endpoint for Five Card Draw.<br /><a href="https://github.com/mduleone/nodePoker" target="_blank" rel="noopener noreferrer">Repository</a><br /><a href="/holdemAnalyzer" target="_blank" rel="noopener noreferrer">Play</a>',
        // printHalfWidth: true,
      },
      {
        id: 'utterance',
        displayName: 'Make Utterance',
        // date: 'December 2015',
        content:
          'Simple CLI intended to make creating complex Alexa Skill Utterances simpler.<br /><a href="https://github.com/mduleone/makeUtterance" target="_blank" rel="noopener noreferrer">Repository</a><br /><a href="https://www.npmjs.com/package/make-utterance" target="_blank" rel="noopener noreferrer">npm</a>',
        hideForPrint: true,
      },
      { id: 'spacer' },
      {
        id: 'craps',
        displayName: 'Casino Craps',
        // date: 'February 2013 - January 2014',
        content:
          'Front end implementation of the popular casino game Craps. Built as a means to learn JavaScript, JQuery, how to interact with the HTML5 canvas, and CSS.<br /><a href="https://github.com/mduleone/craps" target="_blank" rel="noopener noreferrer">Repository</a><br /><a href="https://dule.one/craps" target="_blank" rel="noopener noreferrer">Play</a>',
        // printHalfWidth: true,
      },
    ],
  },
  {
    id: 'tech',
    title: 'Technology Proficiencies',
    content:
      'JavaScript, React, React Native, Next.js, Styled Components, React Storybook, Redux, Node.js, Express, d3.js, HTML, CSS, SASS, Ruby, Rails, GraphQL, Matlab, ImageMagick, Python, COBOL',
    webOrder: -1,
  },
  {
    id: 'education',
    title: 'Education',
    noPrintTopMargin: true,
    subSections: [
      {
        id: 'rutgers',
        displayName: 'Rutgers University, New Brunswick, NJ',
        content: `
          <div>
            Bachelors of Arts (BA), Mathematics with Honors
          </div>
          <div>
            Minor, Computer Science
          </div>
        `,
      },
    ],
  },
  {
    id: 'activities',
    title: 'Activities',
    hideForPrint: true,
    subSections: [
      {
        id: 'SAM',
        displayName: 'Sigma Alpha Mu Fraternity',
        printHalfWidth: true,
        positions: [
          {
            title: 'International Board Service',
            date: 'August 2010 - August 2011',
          },
          {
            title: 'Chapter Treasurer',
            date: 'January 2009 - December 2010',
          },
        ],
      },
      {
        id: 'OOO',
        displayName: 'Order of Omega',
        date: 'Inducted April 2011',
        printHalfWidth: true,
        content: [
          {
            hideForPrint: true,
            copy: 'All Greek Leadership Society',
          },
        ],
      },
      {
        id: 'GSA',
        displayName: 'Gamma Sigma Alpha',
        date: 'Inducted December 2009',
        content: [
          {
            hideForPrint: true,
            copy: 'All Greek Honors Society',
          },
        ],
      },
    ],
  },
];

export default resume;
