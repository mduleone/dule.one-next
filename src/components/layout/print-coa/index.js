import styled from 'styled-components';

const PrintCoa = () => (
  <PrintCoatOfArms src="/images/duleone.jpg" />
);

export default PrintCoa;

const PrintCoatOfArms = styled.img`
  display: none;
  visibility: hidden;
  position: absolute;
  right: 0;
  top: 0;
  width: 120px;
  z-index: 100;

  @media only print {
    display: block;
    visibility: visible;
  }
`;
