import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaPhone, FaFacebook, FaStar, FaGraduationCap, 
  FaLinkedin, FaGithub, FaEnvelope, FaPlus, FaComment, FaWhatsapp, FaExclamationTriangle, 
  FaUserSlash, FaAddressCard, FaUniversity, FaMapMarkerAlt, FaCalendarAlt, 
  FaUserGraduate, FaChartLine, FaAward, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { allStudents } from '../data/students';

// Overlay for premium effect
const PageOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000000;
  z-index: -1;
`;

const ProfileContainer = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 1rem;
    margin: 0 auto;
  }
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(18, 18, 18, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease, transform 0.2s ease;
  text-decoration: none;
  
  &:hover {
    background: rgba(229, 9, 20, 0.8);
    transform: scale(1.1);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const ProfileCard = styled(motion.div)`
  background: linear-gradient(to bottom, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.95));
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(100, 100, 100, 0.2);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
  z-index: 2;
`;

const AvatarOuterContainer = styled(motion.div)`
  position: relative;
  width: 180px;
  height: 180px;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    width: 140px;
    height: 140px;
  }
`;

const AvatarGlow = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 110%;
  background: radial-gradient(circle, rgba(229, 9, 20, 0.5) 0%, rgba(0, 0, 0, 0) 70%);
  border-radius: 50%;
  z-index: 0;
  filter: blur(10px);
`;

const AvatarContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 4px solid #E50914;
  z-index: 1;
  background-color: #181818;
  box-shadow: 0 0 25px rgba(229, 9, 20, 0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(229, 9, 20, 0.8);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.8);
    pointer-events: none;
  }
`;

const StatusBadge = styled(motion.div)`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #E50914;
  color: white;
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  transform-origin: bottom right;
  letter-spacing: 1px;
`;

const StudentName = styled(motion.h1)`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0.5rem 0;
  text-align: center;
  background: linear-gradient(to right, #FFFFFF, #E5E5E5, #FFFFFF);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StudentId = styled(motion.h2)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0.5rem 0 1.5rem;
  color: #B3B3B3;
  text-align: center;
  letter-spacing: 1px;
`;

const AchievementsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 600px;
`;

const AchievementBadge = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(229, 9, 20, 0.2);
  color: #FFFFFF;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  border: 1px solid rgba(229, 9, 20, 0.5);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(229, 9, 20, 0.3);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 12px rgba(229, 9, 20, 0.2);
    border-color: rgba(229, 9, 20, 0.8);
  }
  
  svg {
    color: #E50914;
    font-size: 1rem;
  }
`;

const ProfileSections = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  margin: 2rem 0;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const InfoSection = styled(motion.div)`
  background: rgba(25, 25, 25, 0.8);
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(80, 80, 80, 0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    background: rgba(30, 30, 30, 0.9);
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    border-color: rgba(100, 100, 100, 0.5);
  }
`;

const SectionTitle = styled.h3`
  color: #FFFFFF;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(229, 9, 20, 0.3);
  
  svg {
    color: #E50914;
    font-size: 1.3rem;
  }
`;

const InfoSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #E0E0E0;
  font-size: 1rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    color: #FFFFFF;
    transform: translateX(5px);
    border-bottom-color: rgba(229, 9, 20, 0.4);
  }
  
  svg {
    color: #E50914;
    font-size: 1.2rem;
    min-width: 20px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const SocialLink = styled(motion.a)`
  color: #E0E0E0;
  font-size: 1.8rem;
  background: linear-gradient(135deg, rgba(229, 9, 20, 0.2), rgba(229, 9, 20, 0.4));
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(229, 9, 20, 0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    color: #FFFFFF;
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(229, 9, 20, 0.3);
    
    &:before {
      transform: translateX(100%);
    }
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: skewX(-25deg);
    transition: transform 0.6s ease;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
  justify-content: center;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.primary ? 
    'linear-gradient(135deg, #E50914, #B20710)' : 
    'linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(50, 50, 50, 0.9))'};
  color: #FFFFFF;
  border: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
  min-width: 180px;
  
  &:hover {
    box-shadow: 0 8px 25px ${props => props.primary ? 
      'rgba(229, 9, 20, 0.4)' : 
      'rgba(0, 0, 0, 0.5)'};
    transform: translateY(-3px);
  }
  
  svg {
    font-size: 1.1rem;
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 3rem;
  color: #E5E5E5;
  font-size: 1.2rem;
  background-color: rgba(18, 18, 18, 0.8);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

// Animation Variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
      duration: 0.6,
      ease: "easeOut"
      }
    }
  };
  
  const itemVariants = {
  hidden: { opacity: 0, y: 30 },
    visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

const QuoteContainer = styled(motion.div)`
  background: linear-gradient(90deg, rgba(20, 20, 20, 0.8), rgba(229, 9, 20, 0.1), rgba(20, 20, 20, 0.8));
  padding: 1.2rem;
  border-radius: 10px;
  margin: 0.5rem 0 2rem;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-style: italic;
  color: #E5E5E5;
  position: relative;
  line-height: 1.6;
  font-size: 1.05rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(70, 70, 70, 0.4);
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 1rem;
  }
`;

const QuoteIcon = styled.span`
  color: #E50914;
  font-size: 1.6rem;
  display: inline-block;
  margin: 0 0.5rem;
  vertical-align: text-top;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const DetailsCard = styled(motion.div)`
  background: rgba(18, 18, 18, 0.8);
  border-radius: 12px;
  padding: 1.8rem;
  width: 100%;
  height: 100%;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(70, 70, 70, 0.4);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
    background: rgba(25, 25, 25, 0.9);
  }
`;

const ParticlesBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.5;
`;

// Loading components
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #141414;
  color: white;
  padding: 2rem;
`;

const LoadingCircle = styled.div`
  width: 80px;
  height: 80px;
  border: 3px solid rgba(229, 9, 20, 0.3);
  border-top: 3px solid #E50914;
  border-radius: 50%;
  margin-bottom: 2rem;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 20px rgba(229, 9, 20, 0.5);

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const LoadingSubText = styled.p`
  font-size: 1rem;
  color: #E5E5E5;
  text-align: center;
  opacity: 0.8;
`;

// Error components
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #141414;
  color: white;
  padding: 2rem;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  color: #E50914;
  margin-bottom: 1.5rem;
  animation: pulse 2s ease infinite;

  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const ErrorText = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  
  // Audio setup for interactions
  const [hoverSound] = useState(new Audio('/sounds/hover.mp3'));
  const [clickSound] = useState(new Audio('/sounds/click.mp3'));
  
  const playHoverSound = () => {
    hoverSound.currentTime = 0;
    hoverSound.play().catch(err => console.log('Audio play error:', err));
  };
  
  const playClickSound = () => {
    clickSound.currentTime = 0;
    clickSound.play().catch(err => console.log('Audio play error:', err));
  };
  
  // Generate mock data for development
  const mockPhone = useMemo(() => {
    const numberBase = Math.floor(Math.random() * 9000000000) + 1000000000;
    return `+880 ${numberBase.toString().substring(0, 5)}-${numberBase.toString().substring(5, 10)}`;
  }, []);
  
  const facebookProfileUrl = useMemo(() => {
    return `https://facebook.com/${id.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  }, [id]);
  
  // Load student data
  useEffect(() => {
    setIsMounted(true);
    
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        
        // In a real app, you'd fetch from an API
        // For demo purposes, simulate API call delay and create mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get student ID from URL parameter
        const studentId = id || '2301019';
        
        // Try to find the student in allStudents first
        let foundStudent = allStudents.find(s => s.id === studentId || s.id.includes(studentId));
        
        // If no matching student, create a mock student
        if (!foundStudent) {
          const studentIndex = parseInt(studentId.slice(-2)) || 0;
          const avatarPath = `${process.env.PUBLIC_URL}/assets/images/avatar/avatar-${studentIndex + 1}.jpg`;
          
          foundStudent = {
            id: studentId,
            name: `Student ${studentId}`,
            image: avatarPath
          };
        }
        
        // Create enriched student data
        const enrichedStudent = {
          ...foundStudent,
          department: 'Electrical & Electronic Engineering',
          series: '23',
          section: 'A',
          status: 'Active',
          email: `${studentId.toLowerCase()}@eeeflix.edu`,
          phone: foundStudent.contactInfo?.phone || mockPhone,
          address: 'University Campus, Building C',
          facebook: foundStudent.contactInfo?.facebook || facebookProfileUrl,
          quote: "Electrical engineering is not just a profession, it's a way of thinking.",
          achievements: [
            { name: "Dean's List" },
            { name: "Honor Roll" },
            { name: "Outstanding Performance" }
          ]
        };
        
        console.log("Student data:", enrichedStudent);
        setStudent(enrichedStudent);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError("Failed to load student profile");
        setLoading(false);
      }
    };
    
    fetchStudentData();
    
    return () => {
      setIsMounted(false);
    };
  }, [id, mockPhone, allStudents, facebookProfileUrl]);
  
  // Initialize particles once student data is loaded
  useEffect(() => {
    if (isMounted && !loading && student) {
      try {
        // Initialize any background effects or animations here
        const particles = document.getElementById('tsparticles');
        if (particles) {
          // Configure particle animation (if you have a particle library)
          console.log('Particles initialized');
        }
      } catch (error) {
        console.error('Error initializing effects:', error);
      }
    }
  }, [isMounted, loading, student]);
  
  if (loading) {
    return (
      <LoadingContainer>
        <LoadingCircle />
        <LoadingText>Loading Student Profile...</LoadingText>
        <LoadingSubText>Please wait...</LoadingSubText>
      </LoadingContainer>
    );
  }
  
  if (error) {
    return (
      <ErrorContainer>
        <ErrorIcon><FaExclamationTriangle /></ErrorIcon>
        <ErrorText>{error}</ErrorText>
        <BackButton 
          onClick={() => {
            playClickSound();
            navigate('/students');
          }}
          onMouseEnter={playHoverSound}
          variants={itemVariants}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(229, 9, 20, 0.8)" }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back to Students
        </BackButton>
      </ErrorContainer>
    );
  }
  
  if (!student) {
    return (
      <ErrorContainer>
        <ErrorIcon><FaUserSlash /></ErrorIcon>
        <ErrorText>Student not found</ErrorText>
        <BackButton 
          onClick={() => {
            playClickSound();
            navigate('/students');
          }}
          onMouseEnter={playHoverSound}
          variants={itemVariants}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(229, 9, 20, 0.8)" }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back to Students
        </BackButton>
      </ErrorContainer>
    );
  }

  return (
    <ProfileContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      ref={containerRef}
    >
      <PageOverlay 
        initial="hidden"
        animate="visible"
        variants={overlayVariants}
      />
      
      <BackButton 
        onClick={() => {
          playClickSound();
          navigate('/students');
        }}
        onMouseEnter={playHoverSound}
        variants={itemVariants}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(229, 9, 20, 0.8)" }}
        whileTap={{ scale: 0.95 }}
      >
        <FaArrowLeft />
      </BackButton>
      
      <ProfileCard 
        variants={itemVariants}
        whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)" }}
      >
        <AvatarOuterContainer variants={itemVariants}>
          <AvatarGlow 
            animate={{ 
              opacity: [0.5, 0.8, 0.5], 
              scale: [1, 1.1, 1] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "mirror" 
            }}
          />
          <AvatarContainer
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {student && student.image ? (
              <img 
                src={student.image} 
                alt={student.name} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '50%'
                }} 
              />
            ) : (
              <div style={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '4rem',
                fontWeight: 'bold',
                color: '#E5E5E5',
                backgroundColor: '#181818',
                borderRadius: '50%'
              }}>
                {student && student.name ? student.name.charAt(0) : 'S'}
              </div>
            )}
          </AvatarContainer>
          <StatusBadge
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            whileHover={{ scale: 1.1 }}
          >
            EEE
          </StatusBadge>
        </AvatarOuterContainer>
        
        <StudentName 
          variants={itemVariants}
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
        >
          {student.name}
        </StudentName>
        <StudentId 
          variants={itemVariants}
        >
          ID: {student.id}
        </StudentId>
        
        <AchievementsContainer variants={itemVariants}>
          {student.achievements.map((achievement, index) => (
            <AchievementBadge
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + (index * 0.1) }}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {index === 0 ? <FaStar /> : index === 1 ? <FaGraduationCap /> : <FaAward />} {achievement.name}
            </AchievementBadge>
          ))}
        </AchievementsContainer>
        
        <QuoteContainer 
          variants={itemVariants}
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)" }}
        >
          <QuoteIcon>❝</QuoteIcon>
          {student.quote || "Electricity is the power that fuels our future"}
          <QuoteIcon>❞</QuoteIcon>
        </QuoteContainer>
        
        <ProfileSections>
          <InfoSection 
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)" }}
          >
            <SectionTitle>
              <FaAddressCard /> Contact Information
            </SectionTitle>
            <InfoSectionContent>
              <InfoItem>
                <FaPhone /> {student ? student.phone : '+880 1234-567-890'}
              </InfoItem>
              <InfoItem>
                <FaEnvelope /> {student ? student.email : 'student@eeeflix.edu'}
              </InfoItem>
              <InfoItem>
                <FaMapMarkerAlt /> University Campus, Building C
              </InfoItem>
              <SocialLinks>
                <SocialLink 
                  href={student.facebook} 
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  onMouseEnter={playHoverSound}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaFacebookF />
                </SocialLink>
                <SocialLink 
                  href="#" 
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  onMouseEnter={playHoverSound}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaInstagram />
                </SocialLink>
              </SocialLinks>
            </InfoSectionContent>
          </InfoSection>
          
          <DetailsCard
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)" }}
          >
            <SectionTitle>
              <FaUserGraduate /> Academic Profile
            </SectionTitle>
            <InfoSectionContent>
              <InfoItem>
                <FaUniversity /> Department: {student ? student.department : 'Electrical & Electronic Engineering'}
              </InfoItem>
              <InfoItem>
                <FaCalendarAlt /> Series: {student ? student.series : '23'}
              </InfoItem>
              <InfoItem>
                <FaAward /> Section: {student ? student.section : 'A'}
              </InfoItem>
              <InfoItem>
                <FaChartLine /> Status: Active
              </InfoItem>
            </InfoSectionContent>
          </DetailsCard>
        </ProfileSections>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default StudentProfile; 