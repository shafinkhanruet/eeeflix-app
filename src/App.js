import React, { lazy, Suspense, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import styled, { ThemeProvider } from 'styled-components';

// Theme
import { darkTheme } from './theme';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Context
import { SoundContext, SoundProvider } from './contexts/SoundContext';

// Lazy load ParallaxBackground for faster initial paint
const ParallaxBackground = lazy(() => import('./components/ParallaxBackground'));

// Lazy load pages with improved loading
const Home = lazy(() => 
  import('./pages/Home').then(module => {
    // Add a slight delay to ensure loading spinner shows and doesn't flash
    return new Promise(resolve => setTimeout(() => resolve(module), 300));
  })
);
const Students = lazy(() => import('./pages/Students'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const StudentProfile = lazy(() => import('./pages/StudentProfile'));

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  position: relative;
  z-index: 1;
`;

// Create a component for the background to improve performance
const BackgroundContainer = React.memo(() => (
  <Suspense fallback={null}>
    <ParallaxBackground />
  </Suspense>
));

function App() {
  const location = useLocation();

  // Create a simple sound context value with disabled functionality
  const soundContextValue = {
    soundEnabled: false,
    setSoundEnabled: () => {},
    playSound: () => {}
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <SoundContext.Provider value={soundContextValue}>
        <AppContainer>
          <BackgroundContainer />
          <Navbar />
          <MainContent>
            <AnimatePresence mode="wait">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/student/:id" element={<StudentProfile />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </MainContent>
          <Footer />
        </AppContainer>
      </SoundContext.Provider>
    </ThemeProvider>
  );
}

export default App;
