import propTypes from 'prop-types';
import styled from 'styled-components';

import PlayingCard from '~/components/playing-card';
import { rem } from '~/util/style/lengths';

const Blackjack = ({ right = false }) => (
  <BlackjackContainer>
    <CardContainer $right={right}>
      <PlayingCard card={right ? 'Kh' : 'As'} />
    </CardContainer>
    <CardContainer $right={right}>
      <PlayingCard card={right ? 'Ac' : 'Kd'} />
    </CardContainer>
  </BlackjackContainer>
);

Blackjack.propTypes = {
  right: propTypes.bool,
};

export default Blackjack;

const BlackjackContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CardContainer = styled.div`
  width: ${rem(40)};
  display: inline-block;
  position: relative;
  z-index: 1;
  transform: rotate(${({ $right }) => ($right ? '20deg' : '0')});

  @media screen and (min-width: ${rem(342)}) {
    width: ${rem(60)};
  }

  :last-child {
    position: absolute;
    transform: rotate(${({ $right }) => ($right ? '0' : '-20deg')});
    left: 0;
    z-index: 0;
  }
`;
