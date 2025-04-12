import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaGraduationCap } from 'react-icons/fa';
import { SoundContext } from '../contexts/SoundContext';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  transition: all 0.3s ease;
  background: ${props => props.scrolled ? 'rgba(0, 0, 0, 0.95)' : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%)'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.scrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none'};
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 4rem;
  max-width: 1800px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0.8rem 2rem;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoImage = styled.img`
  height: 42px;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.active ? '#FFFFFF' : '#B3B3B3'};
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 0;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  position: relative;
  transition: color 0.2s ease;
  
  &:hover {
    color: #FFFFFF;
  }
  
  ${props => props.active && `
    font-weight: 700;
  `}
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 101;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.98);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
`;

const MobileNavLink = styled(NavLink)`
  font-size: 1.5rem;
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { playSound } = useContext(SoundContext);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = () => {
    playSound('click');
    setMobileMenuOpen(false);
  };

  const handleMenuToggle = () => {
    playSound('click');
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      } 
    }
  };

  const mobileMenuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  return (
    <NavContainer 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      scrolled={scrolled}
    >
      <NavContent>
        <Logo 
          to="/" 
          onClick={() => playSound('click')}
          onMouseEnter={() => playSound('hover')}
        >
          <LogoImage 
            src="https://preview.fontget.com/tmp/67fabb0a7fd49.png" 
            alt="EEEFlix Logo" 
          />
        </Logo>
        
        <NavLinks>
          <NavLink 
            to="/" 
            active={location.pathname === '/'}
            onClick={handleLinkClick}
            onMouseEnter={() => playSound('hover')}
          >
            Home
          </NavLink>
          <NavLink 
            to="/students" 
            active={location.pathname === '/students'}
            onClick={handleLinkClick}
            onMouseEnter={() => playSound('hover')}
          >
            Students
          </NavLink>
          <NavLink 
            to="/about" 
            active={location.pathname === '/about'}
            onClick={handleLinkClick}
            onMouseEnter={() => playSound('hover')}
          >
            About
          </NavLink>
          <NavLink 
            to="/contact" 
            active={location.pathname === '/contact'}
            onClick={handleLinkClick}
            onMouseEnter={() => playSound('hover')}
          >
            Contact
          </NavLink>
        </NavLinks>
        
        <MobileMenuButton onClick={handleMenuToggle}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
        
        <AnimatePresence>
          {mobileMenuOpen && (
            <MobileMenu
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <MobileNavLinks>
                <MobileNavLink 
                  to="/" 
                  active={location.pathname === '/'}
                  onClick={handleLinkClick}
                >
                  Home
                </MobileNavLink>
                <MobileNavLink 
                  to="/students" 
                  active={location.pathname === '/students'}
                  onClick={handleLinkClick}
                >
                  Students
                </MobileNavLink>
                <MobileNavLink 
                  to="/about" 
                  active={location.pathname === '/about'}
                  onClick={handleLinkClick}
                >
                  About
                </MobileNavLink>
                <MobileNavLink 
                  to="/contact" 
                  active={location.pathname === '/contact'}
                  onClick={handleLinkClick}
                >
                  Contact
                </MobileNavLink>
              </MobileNavLinks>
            </MobileMenu>
          )}
        </AnimatePresence>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;
