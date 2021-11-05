const resume = [
  {
    id: "summary",
    title: "Summary",
    noPrintBottomMargin: true,
    webOrder: -1,
    content: "Successful engineering leader with over nine years of meaningful software contributions. Extensive experience providing solutions across a myriad of industries including health and wellness, food-delivery services, and education, among others. Strong collaborator who has consistently over-delivered. Proven track record of building clean, robust, maintainable products, and empowering others to do the same. Comfortable working on cross functional teams.",
  },
  {
    id: "work",
    title: "Professional Experience",
    noPrintBottomMargin: true,
    subSections: [
      {
        id: "care/of",
        name: "Care/of",
        location: "New York, NY",
        displayName: "Care/of,&nbsp;New&nbsp;York,&nbsp;NY",
        date: "February 2019 - Present",
        positions: [
          {
            title: "Senior Engineering Manager",
            date: "June 2020 - Present",
          },
          {
            title: "Senior Software Engineer",
            date: "February 2019 - May 2020",
          },
        ],
        content: "Technical owner of forward-facing Front End web presence. People manager of Front End Engineering team. Tech-lead of the Growth Product-Engineering team, focusing on the pre-purchase user experience. In conjunction with the rest of the management team, built out Incident Response Procedures and engineering on-call responsibilities. Architected and orchestrated carving out the Front End application from our React-rendering Rails monolith into a Next.js application — increasing engineer productivity and drastically decreasing site loading time. Improved key site-speed metrics by over 3-times, coupled with other conversion-enhancing tactics to increase site-wide conversion by over 7% while growing site traffic by 35%. Implemented integrations with third parties to ensure GDPR and CCPA privacy, cookie policy, and data-deletion requirement compliance. Partnered with internal Marketing stakeholders to manage implementation of Tag Manager solution.",
      },
      {
        id: "slice",
        name: "Slice",
        location: "New York, NY",
        displayName: "Slice,&nbsp;New&nbsp;York,&nbsp;NY",
        date: "October 2017 - February 2019",
        positions: [
          {
            title: "Senior Software Engineer",
            date: "October 2017 - February 2019",
          },
        ],
        content: "Owned Front End of web-based owner-facing application. Created React+D3 chart library, used for visualizations for owners to track their progress and sales. Created and integrated standard JavaScript style and linting config across all JavaScript respositories. Transitioned from ownership of Front End of owners-application to ownership of Front End of customer-facing application. Architected redux store for customer-facing application (search, menu, checkout, order tracking). Rearchitected and implemented Checkout experience. Transitioned customer-facing application from React-on-Rails to Node.js server with server-side-rendering application.",
      },
      {
        id: "grovo",
        name: "Grovo Learning",
        location: "New York, NY",
        displayName: "Grovo&nbsp;Learning, New&nbsp;York,&nbsp;NY",
        date: "December 2015 - September 2017",
        positions: [
          {
            title: "Senior Front End Engineer",
            date: "June 2017 - September 2017",
          },
          {
            title: "Front End Engineer II",
            date: "April 2016 - May 2017",
          },
          {
            title: "Front End Engineer I",
            date: "December 2015 - March 2016",
          },
        ],
        content: "Front End technical lead. Owned significant portions of flagship high-scale React/Redux application powered by a microservices-architecture back end. Worked closely with Product, Design, back end counterpart lead, and team of engineers to build a wide range of beautiful and highly functional product features. Architect of Redux store structure, saga implementation, and action normalization. Integrated with d3 to create data visualizations.",
      },
      {
        id: "nbc",
        name: "NBCUniversal",
        location: "Englewood Cliffs",
        displayName: "NBCUniversal,&nbsp;Englewood&nbsp;Cliffs,&nbsp;NJ",
        date: "June 2014 - December 2015",
        positions: [
          {
            title: "Technical&nbsp;Associate - Media&nbsp;Labs",
            date: "June 2014 - December 2015",
          },
        ],
        content: "Developer, technical generalist, and mathematician on NBCUniversal's Technical Innovation team. Ideated, designed, and prototyped solutions to issues across company footprint and all brands, from wearables in Universal Parks to web based solutions for Television networks including NBC, CNBC, and Telemundo. Participated in and acted as Technical/Developer Support during NBCUniversal hosted hackathons. Named Inventor on 2 Patents.",
      },
      {
        id: "issi",
        name: "Innovative Software Solutions Inc.",
        location: "Maple Shade, NJ",
        displayName: "Innovative&nbsp;Software&nbsp;Solutions&nbsp;Inc., Maple&nbsp;Shade,&nbsp;NJ",
        date: "February 2012 - June 2014",
        positions: [
          {
            title: "COBOL Programmer",
            date: "February 2012 - June 2014",
          },
        ],
        content: "With specifications provided by clients, developed new software for Benefit Fund Administration. Analyzed and assessed bugs in existing software as reported by clients, and implemented appropriate changes to resolve issues. Emphasis was on product quality and turnaround.",
      },
      {
        id: "tdbank",
        name: "TD Bank",
        location: "Cherry Hill, NJ",
        displayName: "TD Bank, Cherry Hill, NJ",
        date: "July 2011 - February 2012",
        positions: [
          {
            title: "Customer Service Representative",
            date: "July 2011 - February 2012",
          },
        ],
        content: "Provided excellent customer service by engaging customers, assessing their financial needs, responding to their questions and concerns, and nurturing the company-customer relationship.",
        hideForPrint: true,
      },
    ],
  },
  {
    id: "awards",
    title: "Honors and Awards",
    noPrintBottomMargin: true,
    noPrintTopMargin: true,
    subSections: [
      {
        id: "patents",
        displayName: "Granted Patents",
        content: [
          {
            href: "https://patents.google.com/patent/US10121170B2/en",
            printPrefix: "US10121170B2",
            copy: "System and method for minimizing a physical queue",
          },
          {
            href: "https://patents.google.com/patent/US10075485B2/en",
            printPrefix: "US10075485B2",
            copy: "Animated snapshots",
          }
        ]
      },
      {
        id: "techcrunch",
        displayName: "TechCrunch Disrupt NYC Hackathon",
        href: "https://disruptny2016.devpost.com/",
        date: "May 2016",
        printHalfWidth: true,
        content: [
          {
            screenPrefix: "Member of",
            copy: "<a href=\"http://holoassist.club/\" target=\"_blank\">HoloBots</a> (<a href=\"https://devpost.com/software/holobots/\">devpost</a>), Multi-challenge Winner",
          }
        ]
      },
      {
        id: "mastercard",
        displayName: "MasterCard Masters of Code NYC Hackathon",
        href: "http://www.hackathon.io/masters-new",
        date: "November 2015",
        printHalfWidth: true,
        content: [
          {
            screenPrefix: "Member of",
            copy: "<a href=\"http://www.hackathon.io/visual-ecommerce\" target=\"_blank\">Visual-eCommerce</a>, Runner Up",
          },
        ],
      },
      {
        id: "putnam",
        displayName: "William Lowell Putnam Undergraduate Mathematics Competition",
        href: "http://math.scu.edu/putnam/",
        date: "2009",
        content: "77<sup>th</sup> Percentile",
      },
    ],
  },
  {
    id: "projects",
    title: "Open Source Projects",
    printPrefix: "Selected",
    noPrintBottomMargin: true,
    subSections: [
      {
        id: "tranquilIsalnd",
        displayName: "Tranquil Island",
        date: "June 2018",
        content: "A generative-art project built using React and the canvas. Inspired by talks from several meetups and conferences.<br /><a href=\"https://tranquil-island.glitch.me\" target=\"_blank\" >Make some art</a><br /><a href=\"https://glitch.com/edit/#!/remix/tranquil-island\" target=\"_blank\">Remix on Glitch</a>",
      },
      {
        id: "reduxMajic",
        displayName: "Redux Majic",
        date: "September 2017",
        content: "\"Module Architecture for JsonAPI Ingesting Consumers\" - Redux Majic makes building client-side JavaScript applications using <a href=\"http://redux.js.org/\" target=\"_blank\">Redux</a> against <a href=\"http://jsonapi.org/\" target=\"_blank\">JsonAPI</a> backends easier.<br /><a href=\"https://github.com/mduleone/redux-majic\" target=\"_blank\">Repository</a><br /><a href=\"https://www.npmjs.com/package/redux-majic\" target=\"_blank\">npm</a>",
      },
      {
        id: "crapshoot",
        displayName: "Crapshoot",
        date: "August 2017",
        content: "\"Create React App Plus - Super Handy, Obviously Opinionated, Tested!\" - An opinionated, scaffolded approach to building React/Redux Web Applications, with an unejected instance of Create React App as its base.<br /><a href=\"https://github.com/mduleone/crapshoot\" target=\"_blank\">Repository</a>",
      },
      {
        id: "iot",
        displayName: "Amazon IoT Button Starter Kit",
        date: "October 2016",
        content: "Built during <a href=\"https://hacktoberfest.digitalocean.com/\" target=\"_blank\">Hacktoberfest 2016</a>, this is to serve as a starting point for projects that want to use an <a href=\"https://aws.amazon.com/iotbutton/\" target=\"_blank\">Amazon IoT Button</a> in conjunction with a web interface.<br /><a href=\"https://github.com/mduleone/iotbutton-starter\" target=\"_blank\">Repository</a><br />",
        hideForPrint: true,
      },
      {
        id: "5cardAlexa",
        displayName: "Five Card Draw - Amazon Alexa Skill",
        date: "January 2016 - March 2016",
        content: "An Amazon Alexa skill that lets you play Five Card Draw. Powered by Node Poker.<br /><a href=\"https://github.com/mduleone/alexaFivecard\" target=\"_blank\">Repository</a>",
        hideForPrint: true,
      },
      {
        id: "poker",
        displayName: "Node Poker",
        date: "January 2016",
        content: "Node.js implementation of hand-winner analysis for several poker variations, including a UI for Texas Hold'em and an API endpoint for Five Card Draw.<br /><a href=\"https://github.com/mduleone/nodePoker\" target=\"_blank\">Repository</a><br /><a href=\"/holdemAnalyzer\" target=\"_blank\" >Play</a>",
        printHalfWidth: true,
      },
      {
        id: "utterance",
        displayName: "Make Utterance",
        date: "December 2015",
        content: "Simple CLI intended to make creating complex Alexa Skill Utterances simpler.<br /><a href=\"https://github.com/mduleone/makeUtterance\" target=\"_blank\">Repository</a><br /><a href=\"https://www.npmjs.com/package/make-utterance\" target=\"_blank\" >npm</a>",
        hideForPrint: true,
      },
      { id: "spacer"},
      {
        id: "craps",
        displayName: "Casino Craps",
        date: "February 2013 - January 2014",
        content: "Front end implementation of the popular casino game Craps. Built as a means to learn JavaScript, JQuery, how to interact with the HTML5 canvas, and CSS.<br /><a href=\"https://github.com/mduleone/craps\" target=\"_blank\" >Repository</a><br /><a href=\"https://dule.one/craps\" target=\"_blank\" >Play</a>",
        printHalfWidth: true,
      },
    ],
  },
  {
    id: "tech",
    title: "Technology Proficiencies",
    noPrintTopMargin: true,
    content: "JavaScript, React, Next.js, Redux, Node.js, SASS, Express, d3.js, HTML, CSS, Ruby, Rails, GraphQL, PHP, Android, AndroidWear, C#, Matlab, ImageMagick, Java, COBOL, Python",
    webOrder: -1,
  },
  {
    id: "education",
    title: "Education",
    noPrintTopMargin: true,
    subSections: [
      {
        id: "rutgers",
        displayName: "Rutgers University, New Brunswick, NJ",
        date: "May 2011",
        content: "<div>Bachelors of Arts, Mathematics with Honors</div><div>Minor, Computer Science</div>",
      },
    ],
  },
  {
    id: "activities",
    title: "Activities",
    hideForPrint: true,
    subSections: [
      {
        id: "SAM",
        displayName: "Sigma Alpha Mu Fraternity",
        printHalfWidth: true,
        positions: [
          {
            title: "International Board Service",
            date: "August 2010 - August 2011",
          },
          {
            title: "Chapter Treasurer",
            date: "January 2009 - December 2010",
          },
        ],
      },
      {
        id: "OOO",
        displayName: "Order of Omega",
        date: "Inducted April 2011",
        printHalfWidth: true,
        content: [
          {
            hideForPrint: true,
            copy: "All Greek Leadership Society",
          },
        ],
      },
      {
        id: "GSA",
        displayName: "Gamma Sigma Alpha",
        date: "Inducted December 2009",
        content: [
          {
            hideForPrint: true,
            copy: "All Greek Honors Society",
          },
        ],
      },
    ],
  },
];

export default resume;
