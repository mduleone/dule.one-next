import styled from 'styled-components';

import { rem } from '~/util/style/lengths';

const PrintAddress = () => (
  <Container>
    <Address>
      <div>Jersey City, NJ 07302</div>
      <a href="mailto:matt@duleone.com">matt@duleone.com</a>
    </Address>
  </Container>
);

export default PrintAddress;

const Container = styled.div`
  display: none;
  visibility: hidden;
  position: absolute;
  top: ${rem(19 * 2 + 8)};
  left: 0;
  right: 0;

  @media only print {
    display: block;
    visibility: visible;
  }
`;

const Address = styled.div`
  font-size: ${rem(19)};
  margin: 0 auto;

  @media only print {
    & * {
      font-size: ${rem(19)};
    }
  }
`;
