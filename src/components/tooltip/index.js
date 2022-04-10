import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { rem } from '~/util/style/lengths';
import colors from '~/util/colors';

const Tooltip = ({ children, show, horizontal, vertical }) => {
  const popup = useRef(null);
  const [verticalPosition, setVerticalPosition] = useState(vertical || 'top');
  const [horizontalPosition, setHorizontalPosition] = useState(
    horizontal || 'center',
  );
  const [svgDropShadow, setSvgDropShadow] = useState(colors.shadowColor);

  useEffect(() => {
    const listener = () => {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setSvgDropShadow(colors.inverseShadowColor);
      } else {
        setSvgDropShadow(colors.shadowColor);
      }
    };
    window.matchMedia &&
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', listener);

    listener();

    return () =>
      window.matchMedia &&
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', listener);
  }, []);

  const updatePosition = () => {
    if (!popup.current) {
      return;
    }

    const { x, y, width, height } = popup.current.getBoundingClientRect();
    const horizontalOrder = ['left', 'center', 'right'];
    const verticalOrder = ['top', 'bottom'];
    const horizontalIdx = horizontalOrder.indexOf(horizontalPosition);
    const verticalIdx = verticalOrder.indexOf(verticalPosition);

    let newHorizontalPos = horizontalPosition;
    let newVerticalPos = verticalPosition;
    if (
      x + width > window.innerWidth &&
      horizontalIdx < horizontalOrder.length - 1
    ) {
      newHorizontalPos = horizontalOrder[horizontalIdx - 1];
    } else if (x <= 0 && horizontalIdx > 0) {
      newHorizontalPos = horizontalOrder[horizontalIdx + 1];
    }
    if (y - height - 30 - 76 <= 0 && verticalIdx < verticalOrder.length - 1) {
      newVerticalPos = verticalOrder[verticalIdx + 1];
    } else if (y + height >= window.innerHeight && verticalIdx > 0) {
      newVerticalPos = verticalOrder[verticalIdx - 1];
    }

    if (!horizontal) {
      setHorizontalPosition(newHorizontalPos);
    }
    if (!vertical) {
      setVerticalPosition(newVerticalPos);
    }
  };

  useEffect(() => {
    updatePosition();
  }, [popup.current, show]);

  useEffect(() => {
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);

  return (
    show && (
      <PopUp
        onClick={(e) => e.stopPropagation()}
        $horizontal={horizontalPosition}
        $vertical={verticalPosition}
        ref={popup}
      >
        {children}
        <Triangle
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0,0,80,80"
          $horizontal={horizontalPosition}
          $vertical={verticalPosition}
        >
          <defs>
            <filter id="shadow">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="5"
                floodColor={svgDropShadow}
              />
            </filter>
          </defs>
          <polygon points="0,0 40,40 80,0" style={{ filter: 'url(#shadow)' }} />
        </Triangle>
      </PopUp>
    )
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
  horizontal: PropTypes.string,
  vertical: PropTypes.string,
};

export default Tooltip;

const PopUp = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.softBlack};
  border-radius: ${rem(6)};
  box-shadow: 0 0 ${rem(5)} ${({ theme }) => theme.colors.shadowColor};
  position: absolute;
  top: ${({ $vertical }) =>
    $vertical === 'top' ? 'initial' : `calc(100% + ${rem(20)})`};
  right: ${({ $horizontal }) => {
    if ($horizontal === 'center') {
      return 'initial';
    }
    if ($horizontal === 'left') {
      return 0;
    }
    return 'initial';
  }};
  bottom: ${({ $vertical }) =>
    $vertical === 'top' ? `calc(100% + ${rem(20)})` : 'initial'};
  left: ${({ $horizontal }) => {
    if ($horizontal === 'center') {
      return '50%';
    }
    if ($horizontal === 'right') {
      return 0;
    }
    return 'initial';
  }};
  transform: translateX(
    ${({ $horizontal }) => {
      if ($horizontal === 'center') {
        return '-50%';
      }
      return 0;
    }}
  );
  padding: ${rem(19 / 2)};
  z-index: 901;
  width: ${rem(200)};
  cursor: default;

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.softBlack};
    color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 0 ${rem(5)} ${({ theme }) => theme.colors.inverseShadowColor};
  }
`;

const Triangle = styled.svg`
  position: absolute;
  bottom: ${({ $vertical }) =>
    $vertical === 'top' ? 'initial' : `calc(100% - ${rem(1)})`};
  top: ${({ $vertical }) =>
    $vertical === 'top' ? `calc(100% - ${rem(1)})` : 'initial'};
  right: ${({ $horizontal }) => {
    if ($horizontal === 'left') {
      return rem(3);
    }
    if ($horizontal === 'center') {
      return 'initial';
    }
    return 'initial';
  }};
  left: ${({ $horizontal }) => {
    if ($horizontal === 'right') {
      return rem(3);
    }
    if ($horizontal === 'center') {
      return '50%';
    }
    return 'initial';
  }};
  transform: translateX(
      ${({ $horizontal }) => {
        if ($horizontal === 'center') {
          return '-50%';
        }
        return 0;
      }}
    )
    rotate(
      ${({ $vertical }) => {
        if ($vertical === 'bottom') {
          return '180deg';
        }
        return 0;
      }}
    );
  width: ${rem(30)};
  height: ${rem(30)};

  & > polygon {
    fill: ${({ theme }) => theme.colors.white};
    stroke: ${({ theme }) => theme.colors.white};
    stroke-width: ${rem(2)};

    @media (prefers-color-scheme: dark) {
      fill: ${({ theme }) => theme.colors.softBlack};
      stroke: ${({ theme }) => theme.colors.softBlack};
    }
  }
`;
