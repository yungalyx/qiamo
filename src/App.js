import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import NavBar from './components/nav';
import LandingPage from "./pages/LandingView"
import ProjectListView from './pages/ProjectListView';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProjectDetailView from './pages/ProjectDetailView';
import ProfileDetailView from './pages/ProfileDetailView';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<ProjectListView />} />
          <Route path='/project/:address/:chain_id' element={<ProjectDetailView />} />
          <Route path='/user/:address/:chain_id' element={<ProfileDetailView />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
