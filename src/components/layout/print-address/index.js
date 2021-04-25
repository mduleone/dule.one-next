import styled from 'styled-components';

const PrintAddress = () => (
  <Container>
    <Address>
      <div>Jersey City, NJ</div>
      <a href="mailto:matt@duleone.com">matt@duleone.com</a>
    </Address>
  </Container>
);

export default PrintAddress;

const Container = styled.div`
  display: none;
  visibility: hidden;
  position: absolute;
  top: calc(2em + 8px);
  left: 0;
  right: 0;

  @media only print {
    display: block;
    visibility: visible;
  }
`;

const Address = styled.div`
  font-size: 19px;
  margin: 0 auto;
`;
