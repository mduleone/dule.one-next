import { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import Modal from '~/components/modal';
import { rem } from '~/util/style/lengths';
import { HIT, STAND, SPLIT, DOUBLE } from '~/util/blackjack';
import { computeActionColor } from '~/components/blackjack-table';
import Blackjack from '~/components/blackjack-training/blackjack';

const RULES = 'rules';
const ABOUT = 'about';
const TRAINING = 'training';
const COUNTING = 'counting';

const StatisticsModal = ({ showInfo, onClose }) => {
  const [currentTab, setCurrentTab] = useState(ABOUT);
  const contentRef = useRef(null);
  const makeOnClick = (tab) => () => {
    setCurrentTab(tab);
    contentRef.current.scrollTop = 0;
  };

  return (
    <Container isOpen={showInfo} onClose={onClose}>
      <ChartTitle>
        <Blackjack />
        <Title>Blackjack Training</Title>
        <Blackjack right />
      </ChartTitle>
      <Tabs>
        <Tab
          type="button"
          $active={currentTab === ABOUT}
          onClick={makeOnClick(ABOUT)}
        >
          About
        </Tab>
        <Tab
          type="button"
          $active={currentTab === RULES}
          onClick={makeOnClick(RULES)}
        >
          Blackjack Rules
        </Tab>
        <Tab
          type="button"
          $active={currentTab === TRAINING}
          onClick={makeOnClick(TRAINING)}
        >
          Training
        </Tab>
        <Tab
          type="button"
          $active={currentTab === COUNTING}
          onClick={makeOnClick(COUNTING)}
        >
          Card Counting
        </Tab>
      </Tabs>
      <Content ref={contentRef}>
        {currentTab === ABOUT && (
          <>
            <SectionTitle>What is this?</SectionTitle>
            <Paragraph>
              This is a tool to teach Blackjack&rsquo;s Basic Strategy, as
              described by{' '}
              <a
                href="https://smile.amazon.com/Beat-Dealer-Winning-Strategy-Twenty-One/dp/0394703103/ref=asc_df_0394703103"
                target="_blank"
                rel="noopener noreferrer"
              >
                Beat the Dealer
              </a>{' '}
              by Edward O. Thorpe, Ph.D, and supplemented by{' '}
              <a
                href="https://wizardofodds.com/games/blackjack/strategy/4-decks/"
                target="_blank"
                rel="nopener noreferrer"
              >
                the Wizard of Odds
              </a>
              . In an honest single-deck Blackjack game against Standard Rules,
              playing according to Basic Strategy gives the Player a very slight
              edge against the House (specifically, the statistical breakdown
              is: 0.13% Player edge in a single-deck game, 0.25% and 0.41% House
              edge in two- or four-deck games respectively). This tool hopes to
              make it easier to learn and apply Basic Strategy, so you can
              always be sure to make the right play at the tables.
            </Paragraph>
          </>
        )}
        {currentTab === RULES && (
          <>
            <SectionTitle>Blackjack Play</SectionTitle>
            <Paragraph>
              The rules of Blackjack are simple. The goal is to get a point
              total of 21 without going over (busting). Cards are worth their
              face value, with face cards being worth 10, and Aces being worth
              either 11 or 1 (whichever provides for a better, un-busted,
              total). Each hand, the goal is to beat the Dealer without busting,
              or to have the Dealer bust by going over 21 themselves.
            </Paragraph>
            <Subheading>The Deal</Subheading>
            <Paragraph>
              Each Player, including the Dealer, is dealt two cards. Both of the
              Player&rsquo;s cards, and one of the Dealer&rsquo;s cards, are
              dealt face up. If a Player&rsquo;s first two cards are an Ace and
              a 10, that Player has a &rdquo;natural,&ldquo; or a
              &ldquo;blackjack&rdquo;, and in the event that the Dealer is dealt
              a natural, they automatically win, beating every hand except
              Player naturals (against which they draw, or &ldquo;push&rdquo;).
              If a Player gets a natural and the Dealer does not, the Player
              immediately wins, and their bet (usually) pays out 1.5 to 1.
            </Paragraph>
            <Subheading>Action</Subheading>
            <Paragraph>
              For their turn, each Player can take one of a series of actions.
              If the Player&rsquo;s first two cards have identical rank, for
              example two sixes or a King and a Ten, the Player may{' '}
              <Action $action={SPLIT}>Split</Action> their pair by doubling
              their bet and turning their cards into two hands to play. If they
              split, each new hand is dealt a single card, and the Player then
              plays each new hand separately by these rules, except naturals pay
              out 1 to 1.
            </Paragraph>
            <Paragraph>
              If the Player cannot or chooses not to split, their next decision
              is whether to <Action $action={DOUBLE}>Double Down</Action>, or
              double their bet in exchange to draw only one more card. In most
              games, the hand totals a Player is allowed to double down on are
              restricted, but in some games the total is not restricted.
            </Paragraph>
            <Paragraph>
              If the Player chooses not to split or double down, their options
              are to <Action $action={HIT}>Hit</Action> -- draw a card,
              attempting to improve their total to closer to 21 -- or{' '}
              <Action $action={STAND}>Stand</Action> -- which ends their turn
              with their current total. If the Player hits and their total goes
              over 21, they bust and immediately lose.
            </Paragraph>
            <Subheading>Dealer Play</Subheading>
            <Paragraph>
              Once all Players have finished their turns, the Dealer completes
              their hand according to a fixed set of rules. This fixed Dealer
              play is the foundation of Basic Strategy, as well as the winning
              strategies enabled by Card Counting.
            </Paragraph>
            <Subheading>Resolution</Subheading>
            <Paragraph>
              When the Dealer is done, they have either busted or stood with a
              total of 17 or more. If the Dealer busted, every remaining hand
              wins the associated bet. If the Dealer did not bust, any remaining
              hand with a total greater than the Dealer&rsquo;s wins. Any hand
              with a total equal to the Dealer&rsquo;s pushes. Any hand with a
              lower point total than the Dealer loses the associated bet.
            </Paragraph>
          </>
        )}
        {currentTab === TRAINING && (
          <>
            <SectionTitle>Training Modes</SectionTitle>
            <Paragraph>
              You can train specifically against different hand mixes or Dealer
              strategy.
            </Paragraph>
            <Subheading>Hand Mix</Subheading>
            <Ul>
              <li>All hands</li>
              <li>Only pairs</li>
              <li>
                Only soft-hands (<Cards>A-x</Cards>)
              </li>
            </Ul>
            <Subheading>Dealer Strategy</Subheading>
            <Ul>
              <li>Hit Soft 17</li>
              <li>Stand Soft 17</li>
            </Ul>
            <SectionTitle>Statistics</SectionTitle>
            <Paragraph>
              Track your statistics, so you can observe your strengths and focus
              on training your weaknesses!
            </Paragraph>
          </>
        )}
        {currentTab === COUNTING && (
          <>
            <SectionTitle>Card Counting</SectionTitle>
            <Paragraph>
              Beyond playing Basic Strategy, Blackjack is one of the few games
              in a casino where the Player or House advantage can swing back and
              forth, depending on the cards left in the deck or shoe.
              Importantly, the Player&rsquo;s advantage can reach as high as a
              10% edge over the House. Card counting is, theoretically, a simple
              way to suss out which way the advantage currently falls.
            </Paragraph>
            <Paragraph>
              Conceptually, when a deck is &ldquo;rich&rdquo; in high cards
              (Tens and Aces) and &ldquo;poor&rdquo; in low cards (
              <Cards>2-6</Cards>) -- that is, it contains more high cards than
              low cards -- the Player&rsquo;s advantage is higher. The richer
              the deck is in high cards, the better for the Player.
            </Paragraph>
            <Paragraph>
              Players can win substantial sums at Blackjack by waiting for these
              Player-favorable situations and placing large bets when they are
              likely to have an edge over the House, and placing small bets when
              they are behind.
            </Paragraph>
            <Paragraph>
              All counting methods are based on the cards left in a given deck
              or shoe. As such, with all counting methods,{' '}
              <strong>the count resets to 0 on every shuffle</strong>. This tool
              tracks the &rdquo;Point-Count&ldquo; counting method, which
              assigns a value to each set of cards: low (<Cards>2-6</Cards>),
              middle (<Cards>7-9</Cards>), and high (<Cards>T-A</Cards>), and
              for each card seen, adds to the &ldquo;Running Count&rdquo;
              according to the following chart.
            </Paragraph>
            <Table>
              <tbody>
                <tr>
                  <Td>Tens &amp; Aces (High)</Td>
                  <Td>- 1</Td>
                </tr>
                <tr>
                  <Td>7 - 9 (Middle)</Td>
                  <Td>+ 0</Td>
                </tr>
                <tr>
                  <Td>2 - 6 (Low)</Td>
                  <Td>+ 1</Td>
                </tr>
              </tbody>
            </Table>
            <Paragraph>
              With this method, the higher the count, the better the situation
              is for the Player, because it corresponds with seeing
              proportionally more low cards than high cards, which implies that
              the remaining deck has a greater-than-normal proportion of high
              cards to low cards.{' '}
              <strong>
                The higher this relative proportion, the greater the Expected
                Value of the Player&rsquo;s bet.
              </strong>
            </Paragraph>
            <Paragraph>
              Armed with this, the remaining information we need to guide our
              bet sizing is how many deck remain in the given shoe. This allows
              us to come up with a ratio of the Player&rsquo;s advantage.
            </Paragraph>
            <Paragraph>
              You can compute the “Betting Count” (also called the “True Count”
              elsewhere) ratio:
            </Paragraph>
            <Equation>
              Betting Count
              <Equals>=</Equals>
              <Fraction>
                <div>Running Count</div>
                <div># of decks left</div>
              </Fraction>
            </Equation>
            <Paragraph>
              When this ratio is positive, the Player has an advantage. When
              this ratio is above 1, the Player&rsquo;s advantage is
              significant.
            </Paragraph>
            <Paragraph>
              A simple heuristic for bet-sizing (though detectable), is to
              increase your standard bet by one unit for each positive whole
              number in the Betting Count.
            </Paragraph>
            <Paragraph>
              For example, if your standard bet is $10, the Running Count is +6,
              and there are 2 decks remaining, the Betting Count is +3, so in
              playing this system, you would place a $40, or 4-unit, bet as your
              next bet.
            </Paragraph>
          </>
        )}
      </Content>
    </Container>
  );
};

StatisticsModal.propTypes = {
  showInfo: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default StatisticsModal;

const Container = styled(Modal)`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.screenFont};
`;

const ChartTitle = styled.h1`
  font-size: ${rem(24)};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: ${rem(32)};

  @media screen and (min-width: ${rem(400)}) {
    margin-top: ${rem(24)};
  }
`;

const Title = styled.span`
  margin: 0 ${rem(14)};
`;

const Tabs = styled.div`
  border-bottom: ${rem(2)} ${({ theme }) => theme.colors.black} solid;
  display: flex;
  min-height: ${rem(50)};
  justify-content: space-between;

  @media screen and (min-width: ${rem(456)}) {
    justify-content: flex-start;
  }

  @media (prefers-color-scheme: dark) {
    border-color: ${({ theme }) => theme.colors.softWhite};
  }
`;

const Tab = styled.button`
  font-family: ${({ theme }) => theme.fonts.screenFont};
  background-color: transparent;
  outline: none;
  border: none;
  display: inline-flex;
  cursor: pointer;
  border-top-left-radius: ${rem(3)};
  border-top-right-radius: ${rem(3)};
  margin: 0 ${rem(2)};
  padding: 0 ${rem(4)};
  height: ${rem(48)};
  align-items: center;
  font-size: ${rem(12)};

  :first-child {
    margin-left: 0;
  }

  :last-child {
    margin-right: 0;
  }

  @media screen and (min-width: ${rem(306)}) {
    font-size: ${rem(14)};
  }

  @media screen and (min-width: ${rem(344)}) {
    font-size: ${rem(19)};
  }

  @media screen and (min-width: ${rem(456)}) {
    & + & {
      margin-left: ${rem(4)};
    }
  }

  ${({ $active }) =>
    $active &&
    css`
      background-color: #00000088;
      color: ${({ theme }) => theme.colors.white};

      @media (prefers-color-scheme: dark) {
        background-color: #ffffff88;
        color: ${({ theme }) => theme.colors.black};
      }
    `}
`;

const Content = styled.div`
  flex-grow: 1;
  overflow-y: scroll;

  @media screen and (min-width: ${rem(768)}) {
    max-height: ${rem(375)};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${rem(20)};
  margin-bottom: ${rem(8)};
`;

const Subheading = styled.h3`
  font-size: ${rem(18)};
  margin-bottom: ${rem(8)};
`;

const Paragraph = styled.p`
  text-align: justify;

  & + & {
    margin-top: ${rem(8)};
  }
`;

const Cards = styled.span`
  font-family: monospace;
`;

const Table = styled.table`
  max-width: ${rem(250)};
  margin: ${rem(8)} auto;
  border-spacing: ${rem(4)} 0;
`;

const Td = styled.td`
  :first-child {
    text-align: left;
  }

  :last-child {
    text-align: right;
  }
`;

const Equation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: ${rem(8)} auto;
`;

const Equals = styled.div`
  padding: ${rem(4)} ${rem(8)};
`;

const Fraction = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;

  & > * {
    padding: ${rem(4)} ${rem(8)};
  }

  & *:last-child {
    border-top: ${rem(1)} ${({ theme }) => theme.colors.black} solid;

    @media (prefers-color-scheme: dark) {
      border-color: ${({ theme }) => theme.colors.softWhite};
    }
  }
`;

const Action = styled.span`
  background-color: ${({ theme, $action }) =>
    computeActionColor($action, theme.colors)};
  color: ${({ theme, $action }) =>
    $action === STAND ? theme.colors.white : theme.colors.black};
  padding: ${rem(1)} ${rem(3)};
  border-radius: ${rem(3)};
`;

const Ul = styled.ul`
  margin: 0;
`;
