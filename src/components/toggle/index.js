import styled from 'styled-components';
import PropTypes from 'prop-types';

import { rem } from '~/util/style/lengths';

const Toggle = ({ cbId, isOn, onClick, disabled }) => (
  <Container htmlFor={cbId} $isOn={isOn} disabled={disabled}>
    <Indicator $isOn={isOn}>
      <Input id={cbId} type="checkbox" checked={isOn} onChange={onClick} />
    </Indicator>
  </Container>
);

Toggle.propTypes = {
  cbId: PropTypes.string,
  isOn: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Toggle.defaultProps = {
  cbId: `cb-${Math.random()}`,
};

export default Toggle;

const Container = styled.label`
  width: ${rem(48)};
  min-width: ${rem(48)};
  height: ${rem(30)};
  background-color: ${({ theme, $isOn }) =>
    $isOn ? theme.colors.duleoneRed : theme.colors.white};
  border: ${rem(1)} solid ${({ theme }) => theme.colors.softBlack};
  border-radius: ${rem(32)};
  cursor: pointer;
  padding: ${rem(3)};
  transition: background-color 0.2s;
`;

const Indicator = styled.div`
  height: 100%;
  width: 50%;
  background-color: ${({ theme }) => theme.colors.softWhite};
  border-radius: 100%;
  transform: ${({ $isOn }) => ($isOn ? 'translateX(100%)' : 'none')};
  transition: transform 0.2s, background-color 0.2s;
  position: relative;

  &::after {
    color: ${({ theme }) => theme.colors.black};
    content: '${({ $isOn }) => ($isOn ? 'ON' : 'OFF')}';
    font-size: ${rem(8)};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Input = styled.input`
  height: ${rem(1)};
  width: ${rem(1)};
  left: ${rem(10)};
  top: ${rem(10)};
`;
