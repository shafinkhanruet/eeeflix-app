import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SoundContext } from '../contexts/SoundContext';

// Components
import Section from '../components/Section';
import Button from '../components/Button';
import StudentCard from '../components/StudentCard';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ParallaxBackground from '../components/ParallaxBackground';

// Mock data
import { featuredStudents } from '../data/students';

// Styled Components
const PageContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.4; /* Reduced opacity for better performance */
`;

const SectionWrapper = styled(motion.div)`
  position: relative;
  z-index: 1;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.gradientOverlay};
  z-index: -1;
  pointer-events: none;
`;

const ScrollProgress = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #E50914;
  transform-origin: 0%;
  z-index: 1000;
`;

const StudentsGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-top: 2rem;
  max-width: 100%;
  width: 100%;
  overflow-x: auto;
  padding: 1rem 1rem 1.5rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(30, 87, 177, 0.3) rgba(15, 28, 48, 0.1);
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(15, 28, 48, 0.1);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(30, 87, 177, 0.3);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(30, 87, 177, 0.5);
  }
  
  /* Ensure snap scrolling for better UX */
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  
  & > div {
    min-width: 280px;
    max-width: 300px;
    scroll-snap-align: start;
  }
`;

const ViewAllButton = styled(motion.div)`
  margin-top: 3rem;
  text-align: center;
`;

const TestimonialSection = styled(motion.div)`
  position: relative;
  padding: 4rem 0;
  overflow: hidden;
`;

const TestimonialCard = styled(motion.div)`
  background: ${props => props.theme.effects.glass.background};
  backdrop-filter: ${props => props.theme.effects.glass.backdropFilter};
  border: ${props => props.theme.effects.glass.border};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 2.5rem;
  margin: 0 auto;
  max-width: 800px;
  position: relative;
  box-shadow: ${props => props.theme.shadows.glass};
  overflow: hidden;
  z-index: 1;
  
  &:before {
    content: '"';
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 8rem;
    opacity: 0.1;
    color: ${props => props.theme.colors.accent};
    font-family: serif;
    line-height: 1;
  }
`;

const TestimonialText = styled.p`
  font-size: ${props => props.theme.fontSizes.large};
  line-height: 1.8;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.theme.colors.gradientAccent};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.h4`
  margin: 0;
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.textPrimary};
`;

const AuthorRole = styled.p`
  margin: 0;
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.textSecondary};
`;

// Add these styled components for enhanced section headings
const EnhancedSectionTitle = styled.h2`
  color: #FFFFFF;
  font-size: 2.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: #E50914;
    box-shadow: 0 0 10px rgba(229, 9, 20, 0.5);
  }
`;

const EnhancedSectionSubtitle = styled.p`
  color: #B3B3B3;
  font-size: 1.2rem;
  text-align: center;
  max-width: 700px;
  margin: 2rem auto 2.5rem;
  line-height: 1.6;
`;

const FeaturedStudentsWrapper = styled.div`
  position: relative;
  padding: 4rem 0;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(16, 42, 76, 0.8) 0%, rgba(13, 19, 33, 0.9) 100%);
    z-index: -1;
  }
`;

// Add these styled components for testimonials
const EnhancedTestimonialSection = styled(motion.div)`
  position: relative;
  padding: 5rem 0;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #0F0F0F;
    z-index: -1;
  }
`;

const EnhancedTestimonialCard = styled(motion.div)`
  background: #181818;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 3rem;
  margin: 0 auto;
  max-width: 800px;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(229, 9, 20, 0.1);
  overflow: hidden;
  z-index: 1;
  
  &:before {
    content: '"';
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 10rem;
    opacity: 0.07;
    color: #E50914;
    font-family: serif;
    line-height: 1;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      rgba(229, 9, 20, 0) 0%, 
      rgba(229, 9, 20, 0.8) 50%, 
      rgba(229, 9, 20, 0) 100%
    );
  }
`;

const EnhancedTestimonialText = styled.p`
  font-size: 1.25rem;
  line-height: 1.8;
  color: #E0E0E0;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
  font-style: italic;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const EnhancedTestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const EnhancedAuthorAvatar = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: #E50914;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
  border: 3px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const EnhancedAuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const EnhancedAuthorName = styled.h4`
  margin: 0;
  font-size: 1.1rem;
  color: #FFFFFF;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const EnhancedAuthorRole = styled.p`
  margin: 0.3rem 0 0;
  font-size: 0.9rem;
  color: #B0B0B0;
`;

const ParallaxSection = styled.div`
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
`;

const ParallaxLayer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  will-change: transform;
`;

const FloatingGradient = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, 
    rgba(229, 9, 20, 0.15) 0%, 
    rgba(229, 9, 20, 0) 70%
  );
  filter: blur(30px);
  opacity: 0.5;
  pointer-events: none;
`;

// Add these styled components for the Features section
const EnhancedFeaturesWrapper = styled.div`
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #0F0F0F;
    z-index: -1;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      rgba(229, 9, 20, 0) 0%, 
      rgba(229, 9, 20, 0.6) 50%, 
      rgba(229, 9, 20, 0) 100%
    );
  }
`;

// Enhanced Styling for Featured Students section
const PremiumFeaturedSection = styled.div`
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #0F0F0F;
    z-index: -1;
  }
`;

const SectionHeading = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
`;

const PremiumTitle = styled.h2`
  color: #FFFFFF;
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  position: relative;
  display: inline-block;
  letter-spacing: 1px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: #E50914;
    box-shadow: 0 0 15px rgba(229, 9, 20, 0.5);
    border-radius: 2px;
  }
`;

const PremiumSubtitle = styled.p`
  color: #B3B3B3;
  font-size: 1.2rem;
  text-align: center;
  max-width: 800px;
  margin: 2rem auto 3rem;
  line-height: 1.7;
  letter-spacing: 0.5px;
`;

const FeaturedStudentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;
  margin: 2rem auto;
  padding: 0 4rem;
  max-width: 1400px;
  justify-items: center;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 2rem;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    padding: 0 1.5rem;
  }
`;

const ViewAllButtonWrapper = styled(motion.div)`
  margin-top: 4rem;
  text-align: center;
  
  button, a {
    padding: 1rem 2.2rem;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    }
  }
`;

const Home = () => {
  const { playSound } = useContext(SoundContext);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  // Animation controls
  const studentControls = useAnimation();
  const testimonialControls = useAnimation();
  const featuresControls = useAnimation();
  
  // Multiple refs for different sections
  const [studentsRef, studentsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [testimonialRef, testimonialInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [featuresRef, featuresInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Handle intro video completion
  const handleIntroComplete = () => {
    setIsIntroComplete(true);
  };
  
  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Trigger animations when sections come into view
  useEffect(() => {
    // Only start animations if component is mounted
    if (!isMounted) return;
    
    if (studentsInView) {
      studentControls.start('visible');
    }
    if (testimonialInView) {
      testimonialControls.start('visible');
    }
    if (featuresInView) {
      featuresControls.start('visible');
    }
  }, [studentsInView, testimonialInView, featuresInView, studentControls, testimonialControls, featuresControls, isMounted]);
  
  // Testimonial state
  const testimonials = [
    {
      text: "EEEFlix has transformed how we connect with our peers and access department resources. The premium interface makes navigation intuitive and engaging.",
      author: "Rahul A.",
      role: "Student, 2023 Batch",
      initials: "RA"
    },
    {
      text: "As a faculty member, I'm impressed by the platform's ability to showcase student achievements and department information in such an elegant way.",
      author: "Dr. Sharma",
      role: "Associate Professor",
      initials: "DS"
    },
    {
      text: "The interactive elements and smooth animations make EEEFlix stand out from other department websites. It's both functional and beautiful.",
      author: "Priya M.",
      role: "Student, 2022 Batch",
      initials: "PM"
    }
  ];
  
  // Change testimonial less frequently for better performance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 12000); // Increased to 12 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  // Improved variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };
  
  const testimonialVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      scale: 0.95,
      transition: { 
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };
  
  const handleButtonHover = () => {
    if (playSound) playSound('hover');
  };
  
  const handleButtonClick = () => {
    if (playSound) playSound('click');
  };

  return (
    <PageContainer>
      {/* Scroll Progress Bar */}
      <ScrollProgress style={{ scaleX, willChange: 'transform' }} />
      
      {/* Background Effect */}
      <BackgroundWrapper>
        <ParallaxBackground />
        {/* Floating gradient elements */}
        <FloatingGradient 
          style={{ 
            x: useTransform(scrollYProgress, [0, 1], ['-10%', '30%']),
            y: useTransform(scrollYProgress, [0, 1], ['10%', '60%']),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1])
          }} 
        />
        <FloatingGradient 
          style={{ 
            x: useTransform(scrollYProgress, [0, 1], ['80%', '50%']),
            y: useTransform(scrollYProgress, [0, 1], ['30%', '70%']),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 0.8, 1.4])
          }} 
        />
      </BackgroundWrapper>
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <SectionWrapper
        ref={featuresRef}
        initial="hidden"
        animate={featuresControls}
        variants={containerVariants}
      >
        <EnhancedFeaturesWrapper>
          <motion.div
            variants={itemVariants}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <EnhancedSectionTitle>Why Choose EEEFlix</EnhancedSectionTitle>
            <EnhancedSectionSubtitle>
              Discover the benefits of our premium platform for Electrical & Electronic Engineering students and faculty.
            </EnhancedSectionSubtitle>
          </motion.div>
          <Features />
        </EnhancedFeaturesWrapper>
      </SectionWrapper>
      
      {/* Testimonial Section */}
      <SectionWrapper
        ref={testimonialRef}
        initial="hidden"
        animate={testimonialControls}
        variants={containerVariants}
      >
        <EnhancedTestimonialSection>
          <motion.div
            variants={itemVariants}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <EnhancedSectionTitle>What People Say</EnhancedSectionTitle>
            <EnhancedSectionSubtitle>
              Hear from our students and faculty about their experience with EEEFlix.
            </EnhancedSectionSubtitle>
          </motion.div>
          
          <motion.div
            key={currentTestimonial}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={testimonialVariants}
          >
            <EnhancedTestimonialCard>
              <EnhancedTestimonialText>
                {testimonials[currentTestimonial].text}
              </EnhancedTestimonialText>
              <EnhancedTestimonialAuthor>
                <EnhancedAuthorAvatar>
                  {testimonials[currentTestimonial].initials}
                </EnhancedAuthorAvatar>
                <EnhancedAuthorInfo>
                  <EnhancedAuthorName>{testimonials[currentTestimonial].author}</EnhancedAuthorName>
                  <EnhancedAuthorRole>{testimonials[currentTestimonial].role}</EnhancedAuthorRole>
                </EnhancedAuthorInfo>
              </EnhancedTestimonialAuthor>
            </EnhancedTestimonialCard>
          </motion.div>
        </EnhancedTestimonialSection>
      </SectionWrapper>
      
      {/* Featured Students Section */}
      <SectionWrapper
        ref={studentsRef}
        initial="hidden"
        animate={studentControls}
        variants={containerVariants}
      >
        <PremiumFeaturedSection>
          <SectionHeading variants={itemVariants}>
            <PremiumTitle>Featured Students</PremiumTitle>
            <PremiumSubtitle>
              Meet our exceptional students who are making a difference in the
              field of Electrical & Electronic Engineering with groundbreaking 
              research and innovative solutions.
            </PremiumSubtitle>
          </SectionHeading>
          
          <FeaturedStudentsGrid>
            {featuredStudents.slice(0, 4).map((student) => (
              <motion.div 
                key={student.id} 
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                <StudentCard student={student} />
              </motion.div>
            ))}
          </FeaturedStudentsGrid>
          
          <ViewAllButtonWrapper variants={itemVariants}>
            <Button 
              to="/students"
              variant="premium"
              onMouseEnter={handleButtonHover}
              onClick={handleButtonClick}
            >
              View All Students
            </Button>
          </ViewAllButtonWrapper>
        </PremiumFeaturedSection>
      </SectionWrapper>
      
      <GradientOverlay />
    </PageContainer>
  );
};

export default Home;
