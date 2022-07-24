import styled from 'styled-components';
import PropTypes from 'prop-types';

import { DECK } from '~/util/playing-cards';

import Clubs2 from './faces/clubs/2';
import Clubs3 from './faces/clubs/3';
import Clubs4 from './faces/clubs/4';
import Clubs5 from './faces/clubs/5';
import Clubs6 from './faces/clubs/6';
import Clubs7 from './faces/clubs/7';
import Clubs8 from './faces/clubs/8';
import Clubs9 from './faces/clubs/9';
import ClubsT from './faces/clubs/T';
import ClubsJ from './faces/clubs/J';
import ClubsQ from './faces/clubs/Q';
import ClubsK from './faces/clubs/K';
import ClubsA from './faces/clubs/A';
import Diamonds2 from './faces/diamonds/2';
import Diamonds3 from './faces/diamonds/3';
import Diamonds4 from './faces/diamonds/4';
import Diamonds5 from './faces/diamonds/5';
import Diamonds6 from './faces/diamonds/6';
import Diamonds7 from './faces/diamonds/7';
import Diamonds8 from './faces/diamonds/8';
import Diamonds9 from './faces/diamonds/9';
import DiamondsT from './faces/diamonds/T';
import DiamondsJ from './faces/diamonds/J';
import DiamondsQ from './faces/diamonds/Q';
import DiamondsK from './faces/diamonds/K';
import DiamondsA from './faces/diamonds/A';
import Hearts2 from './faces/hearts/2';
import Hearts3 from './faces/hearts/3';
import Hearts4 from './faces/hearts/4';
import Hearts5 from './faces/hearts/5';
import Hearts6 from './faces/hearts/6';
import Hearts7 from './faces/hearts/7';
import Hearts8 from './faces/hearts/8';
import Hearts9 from './faces/hearts/9';
import HeartsT from './faces/hearts/T';
import HeartsJ from './faces/hearts/J';
import HeartsQ from './faces/hearts/Q';
import HeartsK from './faces/hearts/K';
import HeartsA from './faces/hearts/A';
import Spades2 from './faces/spades/2';
import Spades3 from './faces/spades/3';
import Spades4 from './faces/spades/4';
import Spades5 from './faces/spades/5';
import Spades6 from './faces/spades/6';
import Spades7 from './faces/spades/7';
import Spades8 from './faces/spades/8';
import Spades9 from './faces/spades/9';
import SpadesT from './faces/spades/T';
import SpadesJ from './faces/spades/J';
import SpadesQ from './faces/spades/Q';
import SpadesK from './faces/spades/K';
import SpadesA from './faces/spades/A';
import Joker from './faces/joker';

const Card = ({ card }) => {
  let CardToRender;

  switch (card) {
    case 'As':
      CardToRender = SpadesA;
      break;
    case '2s':
      CardToRender = Spades2;
      break;
    case '3s':
      CardToRender = Spades3;
      break;
    case '4s':
      CardToRender = Spades4;
      break;
    case '5s':
      CardToRender = Spades5;
      break;
    case '6s':
      CardToRender = Spades6;
      break;
    case '7s':
      CardToRender = Spades7;
      break;
    case '8s':
      CardToRender = Spades8;
      break;
    case '9s':
      CardToRender = Spades9;
      break;
    case 'Ts':
      CardToRender = SpadesT;
      break;
    case 'Js':
      CardToRender = SpadesJ;
      break;
    case 'Qs':
      CardToRender = SpadesQ;
      break;
    case 'Ks':
      CardToRender = SpadesK;
      break;
    case 'Ad':
      CardToRender = DiamondsA;
      break;
    case '2d':
      CardToRender = Diamonds2;
      break;
    case '3d':
      CardToRender = Diamonds3;
      break;
    case '4d':
      CardToRender = Diamonds4;
      break;
    case '5d':
      CardToRender = Diamonds5;
      break;
    case '6d':
      CardToRender = Diamonds6;
      break;
    case '7d':
      CardToRender = Diamonds7;
      break;
    case '8d':
      CardToRender = Diamonds8;
      break;
    case '9d':
      CardToRender = Diamonds9;
      break;
    case 'Td':
      CardToRender = DiamondsT;
      break;
    case 'Jd':
      CardToRender = DiamondsJ;
      break;
    case 'Qd':
      CardToRender = DiamondsQ;
      break;
    case 'Kd':
      CardToRender = DiamondsK;
      break;
    case 'Ac':
      CardToRender = ClubsA;
      break;
    case '2c':
      CardToRender = Clubs2;
      break;
    case '3c':
      CardToRender = Clubs3;
      break;
    case '4c':
      CardToRender = Clubs4;
      break;
    case '5c':
      CardToRender = Clubs5;
      break;
    case '6c':
      CardToRender = Clubs6;
      break;
    case '7c':
      CardToRender = Clubs7;
      break;
    case '8c':
      CardToRender = Clubs8;
      break;
    case '9c':
      CardToRender = Clubs9;
      break;
    case 'Tc':
      CardToRender = ClubsT;
      break;
    case 'Jc':
      CardToRender = ClubsJ;
      break;
    case 'Qc':
      CardToRender = ClubsQ;
      break;
    case 'Kc':
      CardToRender = ClubsK;
      break;
    case 'Ah':
      CardToRender = HeartsA;
      break;
    case '2h':
      CardToRender = Hearts2;
      break;
    case '3h':
      CardToRender = Hearts3;
      break;
    case '4h':
      CardToRender = Hearts4;
      break;
    case '5h':
      CardToRender = Hearts5;
      break;
    case '6h':
      CardToRender = Hearts6;
      break;
    case '7h':
      CardToRender = Hearts7;
      break;
    case '8h':
      CardToRender = Hearts8;
      break;
    case '9h':
      CardToRender = Hearts9;
      break;
    case 'Th':
      CardToRender = HeartsT;
      break;
    case 'Jh':
      CardToRender = HeartsJ;
      break;
    case 'Qh':
      CardToRender = HeartsQ;
      break;
    case 'Kh':
      CardToRender = HeartsK;
      break;
    case 'joker':
      CardToRender = Joker;
      break;
    default:
      CardToRender = Joker;
  }

  return (
    <Svg viewBox="0 0 167.087 242.667">
      <CardToRender />
    </Svg>
  );
};

export default Card;

Card.propTypes = {
  card: PropTypes.oneOf([...DECK, 'joker']),
};

const Svg = styled.svg`
  aspect-ratio: 167.087 / 242.667;
  width: 100%;
`;
