import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const ClientOnlyPortal = ({ children, selector = 'body' }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
};

ClientOnlyPortal.propTypes = {
  children: PropTypes.node.isRequired,
  selector: PropTypes.string,
};

export default ClientOnlyPortal;
