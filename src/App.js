import { ChakraProvider } from '@chakra-ui/react'
import Form from './components/Form';

function App() {
  return (
    <div className='App'>
      <ChakraProvider>
        <Form/>
      </ChakraProvider>
    </div>
  );
}

export default App;
