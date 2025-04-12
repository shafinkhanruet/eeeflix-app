import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { SoundContext } from '../contexts/SoundContext';

const FooterContainer = styled.footer`
  background: #000000;
  backdrop-filter: blur(12px);
  padding: 4rem 0 2rem;
  position: relative;
  z-index: 10;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.15);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #FFFFFF;
  position: relative;
  letter-spacing: 0.5px;
  font-weight: 600;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: #E50914;
  }
`;

const FooterLink = styled.a`
  color: #B3B3B3;
  margin-bottom: 0.8rem;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  display: inline-block;
  
  &:hover {
    color: #FFFFFF;
    transform: translateX(5px);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 1rem;
`;

const SocialIcon = styled(motion.a)`
  color: #B3B3B3;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #E50914;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: #B3B3B3;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
`;

const Logo = styled.div`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 1.2rem;
  
  span {
    color: #E50914;
  }
`;

const FooterText = styled.p`
  color: #B3B3B3;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  opacity: 0.9;
`;

const Footer = () => {
  const { playSound } = useContext(SoundContext);
  
  const handleMouseEnter = () => {
    playSound('hover');
  };
  
  const handleClick = () => {
    playSound('click');
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <Logo>EEE<span>Flix</span></Logo>
          <FooterText>
            A premium platform for Electrical & Electronic Engineering students and faculty, designed to showcase excellence and innovation.
          </FooterText>
          <SocialIcons>
            <SocialIcon 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={handleMouseEnter}
              onClick={handleClick}
              whileHover={{ y: -5 }}
            >
              <FaFacebook />
            </SocialIcon>
            <SocialIcon 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={handleMouseEnter}
              onClick={handleClick}
              whileHover={{ y: -5 }}
            >
              <FaTwitter />
            </SocialIcon>
            <SocialIcon 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={handleMouseEnter}
              onClick={handleClick}
              whileHover={{ y: -5 }}
            >
              <FaInstagram />
            </SocialIcon>
            <SocialIcon 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={handleMouseEnter}
              onClick={handleClick}
              whileHover={{ y: -5 }}
            >
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={handleMouseEnter}
              onClick={handleClick}
              whileHover={{ y: -5 }}
            >
              <FaGithub />
            </SocialIcon>
          </SocialIcons>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink 
            href="/" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            Home
          </FooterLink>
          <FooterLink 
            href="/students" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            Students
          </FooterLink>
          <FooterLink 
            href="/about" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            About Us
          </FooterLink>
          <FooterLink 
            href="/contact" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            Contact
          </FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink 
            href="#" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            Research Papers
          </FooterLink>
          <FooterLink 
            href="#" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            Projects
          </FooterLink>
          <FooterLink 
            href="#" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            Publications
          </FooterLink>
          <FooterLink 
            href="#" 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            Events
          </FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <FooterText>
            Department of Electrical & Electronic Engineering<br />
            Rajshahi University of Engineering & Technology<br />
            Rajshahi-6204, Bangladesh<br /><br />
            Email: head_eee@ruet.ac.bd<br />
            Phone: +880-721-750742
          </FooterText>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {new Date().getFullYear()} EEEFlix. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
