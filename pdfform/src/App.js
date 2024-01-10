import logo from './logo.svg';
import './App.css';
import { Box, Heading } from '@chakra-ui/react';
import { Router } from './components/router';

function App() {
  return (
    <Box className="App" p={5}>
     <Router/>
    </Box>
  );
}

export default App;
