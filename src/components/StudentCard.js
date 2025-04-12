import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { FaUser, FaInfoCircle, FaChevronRight } from 'react-icons/fa';
import { throttle } from '../utils/helpers';

// Netflix-inspired styled components
const CardContainer = styled(motion.div)`
  position: relative;
  width: 280px;
  height: 400px;
  border-radius: 10px;
  overflow: visible;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, #181818, #141414);
  cursor: pointer;
  transform-origin: center center;
  padding: 15px 15px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 
                0 0 25px rgba(229, 9, 20, 0.2);
    transform: translateY(-10px);
  }

  @media (max-width: 768px) {
    width: 280px;
    height: 400px;
    margin: 0 auto 2rem auto;
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 170px;
  height: 170px;
  margin: 1rem auto 1rem;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border: 2px solid #E50914;
  transition: transform 0.3s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.05);
    border-width: 3px;
  }
`;

const ProfileImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.5s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.1);
  }
`;

const ImagePlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #141414;
  color: #B3B3B3;
  font-size: 3rem;
  transition: transform 0.5s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.1);
  }
`;

const CardContent = styled(motion.div)`
  position: relative;
  padding: 0.5rem 0.5rem 0.5rem;
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
`;

const NameContainer = styled.div`
  height: auto;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 10px;
  overflow: visible;
`;

const ButtonContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StudentName = styled(motion.h3)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.3rem;
  color: #FFFFFF;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  overflow: visible;
  text-overflow: ellipsis;
  white-space: normal;
  max-width: 100%;
  padding: 0 5px;
  width: 95%;
  text-align: center;
  
  ${CardContainer}:hover & {
    transform: scale(1.05);
    color: #FFFFFF;
  }
`;

const StudentId = styled(motion.p)`
  font-size: 0.85rem;
  font-weight: 400;
  color: #888888;
  margin: 0;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  
  ${CardContainer}:hover & {
    color: #B3B3B3;
  }
`;

const StudentTitle = styled(motion.div)`
  font-size: 0.75rem;
  font-weight: 600;
  color: #FFFFFF;
  margin: 0.3rem 0 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background-color: #E50914;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  display: inline-block;
  box-shadow: 0 2px 6px rgba(229, 9, 20, 0.4);
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
    border-radius: 4px;
  }
  
  ${CardContainer}:hover & {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(229, 9, 20, 0.5);
  }
`;

const CRTitle = styled(motion.div)`
  font-size: 0.75rem;
  font-weight: 600;
  color: #FFFFFF;
  margin: 0.3rem 0 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: linear-gradient(135deg, #B71C1C, #F44336);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  display: inline-block;
  box-shadow: 0 2px 6px rgba(244, 67, 54, 0.4);
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%);
    border-radius: 4px;
  }
  
  ${CardContainer}:hover & {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(244, 67, 54, 0.5);
  }
`;

const ViewProfileButton = styled(motion.button)`
  background: #E50914;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(229, 9, 20, 0.25);
  position: relative;
  overflow: hidden;
  margin-top: 0.5rem;
  width: 100%;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 7px 14px rgba(229, 9, 20, 0.4);
    background: #F40612;
  }
  
  &:after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(45deg);
    transition: all 0.5s ease;
    opacity: 0;
  }
  
  ${CardContainer}:hover &:after {
    animation: shine 1.5s infinite;
    opacity: 1;
  }
  
  @keyframes shine {
    0% {
      left: -100%;
      opacity: 0.7;
    }
    100% {
      left: 100%;
      opacity: 0;
    }
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
  
  ${CardContainer}:hover & {
    animation: none;
  }
`;

const GlowEffect = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(229, 9, 20, 0.15) 0%,
    rgba(229, 9, 20, 0) 50%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
`;

// The StudentCard component
const StudentCard = ({ student, delay = 0, playSound }) => {
  const [isMounted, setIsMounted] = useState(false);
  const controls = useAnimation();
  const cardRef = useRef(null);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Handle mouse movement for the glow effect
  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      cardRef.current.style.setProperty('--mouse-x', `${x}%`);
      cardRef.current.style.setProperty('--mouse-y', `${y}%`);
    }
  };
  
  // Throttle sound events to prevent excessive triggers
  const handleMouseEnter = throttle(() => {
    if (playSound) playSound('hover');
    if (isMounted && controls) {
      try {
        controls.start('hovered');
        // Show glow effect
        if (cardRef.current) {
          const glowElement = cardRef.current.querySelector('.glow-effect');
          if (glowElement) glowElement.style.opacity = '1';
        }
      } catch (error) {
        console.log('Animation error in handleMouseEnter:', error);
      }
    }
  }, 300);
  
  const handleMouseLeave = () => {
    if (isMounted && controls) {
      try {
        controls.start('initial');
        // Hide glow effect
        if (cardRef.current) {
          const glowElement = cardRef.current.querySelector('.glow-effect');
          if (glowElement) glowElement.style.opacity = '0';
        }
      } catch (error) {
        console.log('Animation error in handleMouseLeave:', error);
      }
    }
  };
  
  const handleClick = throttle(() => {
    if (playSound) playSound('click');
  }, 300);
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        delay: delay * 0.1,
        ease: [0.23, 1, 0.32, 1]
      }
    },
    hovered: {
      scale: 1.05,
      y: -10,
      transition: { 
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      }
    },
    initial: {
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };
  
  const childrenVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: delay * 0.1 + 0.2,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        delay: delay * 0.1 + 0.3
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: '0 7px 14px rgba(229, 9, 20, 0.4)',
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };
  
  // Initialize animation state in useEffect
  useEffect(() => {
    let mounted = true;
    
    // Only start animation if component is mounted
    if (mounted && controls) {
      try {
        controls.start('visible');
      } catch (error) {
        console.log('Animation initialization error:', error);
      }
    }
    
    return () => {
      mounted = false;
    };
  }, [controls]);

  if (!student) {
    return null;
  }

  return (
    <Link 
      to={`/student/${encodeURIComponent(student.id)}`} 
      style={{ textDecoration: 'none' }}
      onClick={(e) => {
        if (!student || !student.id) {
          e.preventDefault();
          console.error("Cannot navigate - student or student ID is missing");
          return;
        }
        handleClick();
      }}
    >
      <CardContainer 
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate={controls}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(229, 9, 20, 0.3)' }}
      >
        <GlowEffect className="glow-effect" />
        
        <ProfileImageContainer>
          {student.image ? (
            <ProfileImage 
              style={{
                backgroundImage: `url(${student.image})`
              }}
            />
          ) : (
            <ImagePlaceholder>
              <FaUser />
            </ImagePlaceholder>
          )}
        </ProfileImageContainer>
        
        <CardContent>
          <NameContainer>
            <StudentName variants={childrenVariants}>
              {student.name || `Student ${student.id}`}
            </StudentName>
            <StudentId variants={childrenVariants}>ID: {student.id}</StudentId>
            {student.name === "MD. SHAFIN KHAN" && (
              <StudentTitle 
                variants={childrenVariants}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay * 0.1 + 0.4, duration: 0.3 }}
              >
                Developer
              </StudentTitle>
            )}
            {(student.name === "ABDUL BAKEU BORSHON" || student.name === "TAHMIDUL HAQUE SAIF") && (
              <CRTitle 
                variants={childrenVariants}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay * 0.1 + 0.4, duration: 0.3 }}
              >
                CR
              </CRTitle>
            )}
          </NameContainer>
          
          <ButtonContainer>
            <ViewProfileButton 
              variants={buttonVariants}
              whileHover={{ scale: 1.02, backgroundColor: '#F40612' }}
            >
              View Profile
            </ViewProfileButton>
          </ButtonContainer>
        </CardContent>
      </CardContainer>
    </Link>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(StudentCard);
