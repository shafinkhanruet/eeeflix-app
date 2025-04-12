import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useTransform, useScroll } from 'framer-motion';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { SoundContext } from '../contexts/SoundContext';

const HeroContainer = styled.div`
  position: relative;
  min-height: 90vh;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  z-index: 1;
  padding-top: 60px; /* Space for the navbar */
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-height: 70vh;
    align-items: flex-start;
    padding-top: 80px;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://i.postimg.cc/3Jtrm7bb/477575715-967699118653522-4375073918279317182-n.jpg');
  background-size: cover;
  background-position: center 30%;
  filter: blur(1.5px) brightness(0.9);
  z-index: -1;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.7) 20%,
      rgba(0, 0, 0, 0.6) 60%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.6) 20%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 1100px;
  width: 100%;
  padding: 0 3rem;
  margin-left: 3rem;
  z-index: 2;
  will-change: transform;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 2rem;
    margin-left: 2rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1.5rem;
    margin-left: 0;
  }
`;

const HeroTextContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 550px;
`;

const NetflixLogo = styled(motion.img)`
  width: 20rem;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.7));
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 16rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 14rem;
  }
`;

const TopTen = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const TopTenBadge = styled.div`
  background-color: #E50914;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
`;

const TopTenText = styled.span`
  color: #fff;
  font-size: 0.9rem;
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0.5rem 0;
  max-width: 550px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const MaturityContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0.5rem 0 1rem;
`;

const MaturityRating = styled.div`
  display: inline-block;
  background-color: rgba(51, 51, 51, 0.8);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 0.2rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Tags = styled.span`
  color: #ddd;
  font-size: 0.9rem;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const NetflixPlayButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: white;
  color: black;
  border: none;
  padding: 0.5rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 38px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.85);
  }
  
  svg {
    font-size: 1.3rem;
  }
`;

const NetflixMoreInfoButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 38px;
  
  &:hover {
    background-color: rgba(109, 109, 110, 0.5);
  }
  
  svg {
    font-size: 1.3rem;
  }
`;

const Hero = () => {
  const { scrollY } = useScroll();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [isMounted, setIsMounted] = useState(false);
  
  // Set mounted state after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Parallax effect for text
  const titleY = useTransform(scrollY, [0, 500], [0, -20]);
  
  useEffect(() => {
    // Only start animations after component is mounted
    if (!isMounted) return;
    
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView, isMounted]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };
  
  return (
    <HeroContainer ref={ref}>
      <HeroBackground />
      
      <HeroContent
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <HeroTextContent>
          <NetflixLogo 
            src="https://preview.fontget.com/tmp/67fac987c25b4.png"
            alt="Circuit of Minds Logo"
            variants={itemVariants}
            style={{ y: titleY }}
          />
          
          <TopTen variants={itemVariants}>
            <TopTenBadge>#1</TopTenBadge>
            <TopTenText>in EEE Student Projects Today</TopTenText>
          </TopTen>
          
          <HeroDescription variants={itemVariants}>
            Join the brilliant minds of the Electrical and Electronics Engineering (EEE) 
            department at RUET as they uncover hidden truths about the mysterious forces 
            shaping the future of technology. Explore the challenges, discoveries, and 
            breakthroughs that will define the next generation of engineers.
          </HeroDescription>
          
          <MaturityContainer variants={itemVariants}>
            <MaturityRating>EEE</MaturityRating>
            <Tags>Innovation • Technology • Engineering • 2023</Tags>
          </MaturityContainer>
          
          <ButtonContainer variants={itemVariants}>
            <NetflixPlayButton
              onClick={() => {
                window.location.href = '/students';
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlay /> Play
            </NetflixPlayButton>
            
            <NetflixMoreInfoButton
              onClick={() => {
                window.location.href = '/about';
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaInfoCircle /> More Info
            </NetflixMoreInfoButton>
          </ButtonContainer>
        </HeroTextContent>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
