import { useState } from 'react';
import styled from 'styled-components';

const PrintHelper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <Container>
      <button onClick={toggleOpen} type="button">
        Looking to Print?
      </button>
      {isOpen && (
        <div>
          some stuff
        </div>
      )}
    </Container>
  );
};

export default PrintHelper;

const Container = styled.div`
  position: absolute;
  right: 0;
  bottom: 1em;
  transform-origin: center;
  transform: rotate(90deg);
`