const projects = [
  {
    title: "Gammy's Game",
    href: '/blackjack',
    repo: 'https://github.com/mduleone/dule.one-next/blob/main/src/pages/blackjack/index.js',
    desc: 'Part of this project. A Blackjack Strategy Card in-browser, because a physical card is just too darn inconvenient. This is Basic Strategy as described in Chapter 3 of <a href="https://smile.amazon.com/Beat-Dealer-Winning-Strategy-Twenty-One/dp/0394703103/ref=asc_df_0394703103" target="_blank" rel="noopener noreferrer">Beat the Dealer</a>, trusted by Ina Frey.',
    internal: true,
    imageHeight: 1930,
    imageWidth: 1284,
    images: ['/images/blackjack-light.jpg', '/images/blackjack-dark.jpg'],
  },
  {
    title: 'Tranquil Island',
    href: 'https://tranquil-island.glitch.me',
    repo: 'https://glitch.com/edit/#!/tranquil-island',
    desc: 'Generative Art!<br /><br />Inspired by a lightning talk at <a href="https://manhattanjs.com" target="_blank" rel="noopener noreferrer">ManhattanJS</a> from <a href="https://twitter.com/twholman">Tim Holman</a> about <a href="https://www.youtube.com/watch?v=4Se0_w0ISYk">generative art (video from JSConf Austraila)</a>, and then again inspired to sit down and play with things by a talk on GPU generated art by <a href="https://twitter.com/MaxBittker" target="_blank" rel="noopener noreferrer">Max Bittker</a> at <a href="https://dinosaurjs.org" target="_blank" rel="noopener noreferrer">DinosaurJS</a>.',
    internal: false,
    imageHeight: 1188,
    imageWidth: 1188,
    images: [
      '/images/tranquil-island-1.jpg',
      '/images/tranquil-island-2.jpg',
      '/images/tranquil-island-3.jpg',
    ],
  },
  {
    title: 'Crapshoot',
    href: 'https://dule.one/crapshoot',
    repo: 'https://github.com/mduleone/crapshoot',
    desc: '"Create React App Plus - Super Handy, Obviously Opinionated, Tested!"<br /><br />An opinionated and scaffolded approach to building React/Redux Web Applications, with an unejected instance of Create React App as its base. In addition to Redux, it comes with a bunch of other goodies baked in! Check out the repository for a more detailed explanation.',
    internal: false,
    imageHeight: 1064,
    imageWidth: 1284,
    images: ['/images/crapshoot.jpg'],
  },
  {
    title: 'Redux Majic',
    href: 'https://www.npmjs.com/package/redux-majic',
    repo: 'https://github.com/mduleone/redux-majic',
    desc: '"Module Architecture for JsonAPI Ingesting Consumers"<br /><br />Redux Majic makes building client-side JavaScript applications using <a href="http://redux.js.org/" target="_blank" rel="noopener noreferrer">Redux</a> against <a href="http://jsonapi.org/" target="_blank" rel="noopener noreferrer">JsonAPI</a> backends easier.',
    internal: false,
  },
  {
    title: 'matt.dule.one',
    href: '/',
    repo: 'https://github.com/mduleone/dule.one-next',
    desc: 'This project: my personal website. A NextJS app.',
    internal: true,
    imageHeight: 2233,
    imageWidth: 1284,
    images: ['/images/home-light.jpg', '/images/home-dark.jpg'],
  },
  {
    title: 'Casino Craps',
    href: 'https://dule.one/craps',
    repo: 'https://github.com/mduleone/craps',
    desc: 'A frontend implementation of the popular casino table game, Craps! Complete with a tutorial, this is an excellent and fun way to learn to play Craps without the fear of losing your shirt! You start with $10,000, and table stakes allow for you to be as frugal or as extravigant as you wish, allowing bets of all sizes, from $10 to $10,000.',
    internal: false,
    imageHeight: 1000,
    imageWidth: 1680,
    images: ['/images/craps-standard.png', '/images/craps-charcoal.png'],
  },
  {
    title: 'Amazon IoT Button Starter',
    href: '',
    repo: 'https://github.com/mduleone/iotbutton-starter',
    desc: 'A project to serve as a starting point for building something with an Amazon Internet of Things Button. Currently, this uses socket.io to talk to a vanilla JS front end to display button statistics. Among my next steps are hooking up a React/Redux front end.',
    internal: false,
  },
  {
    title: 'Node Poker',
    href: '/holdemAnalyzer',
    repo: 'https://github.com/mduleone/nodePoker',
    desc: 'A Node.js implementation of a poker hand analyzer. <a href="http://dule.one/holdemAnalyzer" target="_blank" rel="noopener noreferrer">Texas Hold\'em</a> implemented in the GUI, <a href="http://dule.one/holdem?board=KsQsTsKdAd&hand1=AsJs&hand2=AhKh&hand5=TdTh" target="_blank" rel="noopener noreferrer">Texas Hold\' em</a> and <a href="http://dule.one/poker?hand1=AsJsKsQsTs&hand2=AhKhAcKdAd" target="_blank" rel="noopener noreferrer">5 card</a> poker implemented in an API. More games implemented in the project, but none with exposed endpoints. Inspired by solving <a href="https://projecteuler.net/problem=54" target="_blank" rel="noopener noreferrer">Project Euler #54</a> in <a href="https://gist.github.com/mduleone/133c118b8a6c6bb9b624" target="_blank" rel="noopener noreferrer">COBOL</a> and wanting a more practical API.',
    internal: false,
    imageHeight: 1218,
    imageWidth: 884,
    images: [
      '/images/poker-analyzer-2-colors.png',
      '/images/poker-analyzer-4-colors.png',
    ],
  },
  {
    title: 'Five Card Draw - Alexa Skill',
    href: '',
    repo: 'https://github.com/mduleone/alexaFivecard',
    desc: 'A Five Card Draw Poker skill for the Amazon Echo. Ask Alexa to deal you a hand, and then try your best to beat her!<br /><br />Powered by <a href="http://dule.one/holdemAnalyzer" target="_blank" rel="noopener noreferrer">Node Poker</a>.',
    internal: false,
  },
  {
    title: 'Make Utterance',
    href: 'https://www.npmjs.com/package/make-utterance',
    repo: 'https://github.com/mduleone/MakeUtterance',
    desc: 'A very basic tool to make creating utterance strings for the Amazon Echo easier.',
    internal: false,
  },
  {
    title: 'Pokedex - Alexa Skill',
    href: '',
    repo: 'https://github.com/mduleone/EchoPokedex',
    desc: 'A Pokedex skill for the Amazon Echo. Ask Alexa to tell you about any Pokemon in the Pokemon universe.<br /><br />Powered by the <a href="http://pokeapi.co/" target="_blank" rel="noopener noreferrer">Pok&eacute;mon RESTful API</a>.',
    internal: false,
  },
];

export default projects;
