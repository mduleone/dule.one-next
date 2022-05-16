import PropTypes from 'prop-types';
import styled from 'styled-components';

import { rem } from '~/util/style/lengths';

const Name = ({ imageWidth, header = false }) => (
  <Container $header={header} $width={imageWidth}>
    <Image $header={header} $width={imageWidth} src="/me-square-draw.png" />
    <TopImage $header={header} $width={imageWidth} src="/me-square-real.png" />
    Matt DuLeone
  </Container>
);

export default Name;

Name.propTypes = {
  header: PropTypes.bool,
  imageWidth: PropTypes.number.isRequired,
};

const imageMargin = 8;

const Container = styled.span`
  display: inline-block;
  font-size: ${({ $header, $width }) => rem($header ? 19 : $width / 2)};
  line-height: ${({ $width }) => rem($width)};
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  margin-left: ${({ $width }) => rem($width + imageMargin)};

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.softBlack};
    color: ${({ theme }) => theme.colors.softWhite};
  }

  @media only screen and (min-width: ${rem(363)}) {
    font-size: ${({ $header, $width }) => rem($header ? 40 : $width / 2)};
  }

  @media only screen and (min-width: ${rem(590)}) {
    font-size: ${({ $header, $width }) => rem($header ? 19 : $width / 2)};
  }

  @media only print {
    overflow: hidden;
    font-size: ${({ $header, $width }) => rem($header ? $width : $width / 2)};
    line-height: ${({ $header, $width }) =>
      $header ? 'inherit' : rem($width)};
    color: ${({ theme }) => theme.colors.black};
    position: ${({ $header }) => ($header ? 'static' : 'relative')};
    margin-left: ${({ $header, $width }) =>
      $header ? 0 : rem($width + imageMargin)};
  }
`;

const Image = styled.img`
  border-radius: 50%;
  position: absolute;
  border: ${rem(1)} solid ${({ theme }) => theme.colors.black};
  height: ${({ $width }) => rem($width)};
  width: ${({ $width }) => rem($width)};
  left: -${({ $width }) => rem($width + imageMargin)};
  top: 0;

  @media only screen and (min-width: ${rem(363)}) {
    height: ${rem(40)};
    width: ${rem(40)};
    top: -${rem(imageMargin)};
    left: -${rem(40 + imageMargin)};
  }

  @media only screen and (min-width: ${rem(590)}) {
    height: ${({ $width }) => rem($width)};
    width: ${({ $width }) => rem($width)};
    left: -${({ $width }) => rem($width + imageMargin)};
    top: 0;
  }

  @media only print {
    display: ${({ $header }) => ($header ? 'none' : 'block')};
  }
`;

const TopImage = styled(Image)`
  transition: opacity 0.3s linear;
  opacity: 0;

  *:hover > & {
    opacity: 1;
  }

  @media only print {
    opacity: 1;
  }
`;
