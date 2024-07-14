// FloatingButton.js
import React from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

const FloatingButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
      isRound
      size="lg"
      position="fixed"
      bottom="2rem"
      right="2rem"
      onClick={toggleColorMode}
      zIndex="tooltip"
    />
  );
};

export default FloatingButton;
