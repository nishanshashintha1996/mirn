// theme.js
import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
      a: {
        color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    }),
  },
  colors: {
    brand: {
      50: '#e4f9f5',
      100: '#c1e9e1',
      200: '#9bdad0',
      300: '#74cac1',
      400: '#4dbaaf',
      500: '#33a296', // main color
      600: '#267d74',
      700: '#195853',
      800: '#0b3331',
      900: '#001111',
    },
  },
});

export default theme;
