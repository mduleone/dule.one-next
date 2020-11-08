import PropTypes from 'prop-types';
import styled from 'styled-components';

const Name = ({ imageWidth, header = false }) => {
  return (
    <Container header={header} width={imageWidth}>
      <Image header={header} width={imageWidth} src="/me-square-draw.png" />
      <TopImage header={header} width={imageWidth} src="/me-square-real.png" />
      Matt DuLeone
    </Container>
  )
}

export default Name;

Name.propTypes = {
  header: PropTypes.bool,
  imageWidth: PropTypes.number.isRequired,
}

const imageMargin = 8;

const Container = styled.span`
  display: inline-block;
  font-size: ${({ header, width }) => header ? 19 : (width / 2)}px;
  line-height: ${({ width }) => width}px;
  color: ${({ theme }) => theme.colors.black};
  position: relative;
  margin-left: ${({ width }) => (width + imageMargin)}px;

  @media only print {
    font-size: ${({ header, width }) => header ? width : (width / 2)}px;
    line-height: ${({ header, width }) => header ? 'inherit' : `${width}px`};
    color: ${({ theme }) => theme.colors.black};
    position: ${({ header }) => header ? 'static' : 'relative'};
    margin-left: ${({ header, width }) => header ? 0 : (width + imageMargin)}px;
  }
`;

const Image = styled.img`
  height: ${({ width }) => width}px;
  width: ${({ width }) => width}px;
  border-radius: 50%;
  position: absolute;
  left: -${({ width }) => (width + imageMargin)}px;
  border: 1px solid ${({ theme }) => theme.colors.black};

  @media only print {
    display: ${({ header }) => header ? 'none' : 'block'};
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
