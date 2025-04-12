// Mock student data for EEEFlix
// Using the provided roll numbers and names

// Helper function to generate random achievements
const generateRandomAchievements = () => {
  const achievementTypes = [
    { type: 'star', label: 'Top Performer' },
    { type: 'academic', label: 'Dean\'s List' },
    { type: 'academic', label: 'High CGPA' },
    { type: 'award', label: 'Project Award' },
    { type: 'award', label: 'Innovation Award' },
    { type: 'star', label: 'Research Excellence' }
  ];
  
  // Randomly select 1-3 achievements
  const numAchievements = Math.floor(Math.random() * 3) + 1;
  const selectedAchievements = [];
  
  for (let i = 0; i < numAchievements; i++) {
    const randomIndex = Math.floor(Math.random() * achievementTypes.length);
    selectedAchievements.push(achievementTypes[randomIndex]);
  }
  
  return selectedAchievements;
};

// Use local avatar images
const getAvatarImage = (index) => {
  try {
    // Assign avatar images serially from 1 to 60
    if (index >= 0 && index < 60) {
      const avatarNumber = index + 1; // Direct mapping: student 0 gets avatar-1, student 59 gets avatar-60
      console.log(`Loading avatar: avatar-${avatarNumber}.jpg for student index ${index}`);
      
      // Use process.env.PUBLIC_URL to correctly reference files in the public folder
      const imagePath = `${process.env.PUBLIC_URL}/assets/images/avatar/avatar-${avatarNumber}.jpg`;
      
      // Return the path with a timestamp to prevent caching issues
      return `${imagePath}?t=${Date.now()}`;
    } else {
      // Default avatar path (using avatar-1 as fallback)
      return `${process.env.PUBLIC_URL}/assets/images/avatar/avatar-1.jpg?t=${Date.now()}`;
    }
  } catch (error) {
    console.error('Error generating avatar path:', error);
    // Return first avatar as default with a timestamp
    return `${process.env.PUBLIC_URL}/assets/images/avatar/avatar-1.jpg?t=${Date.now()}`;
  }
};

// Generate contact information
const generateContactInfo = (id) => {
  // Generate a mock phone number based on student ID
  const phoneNumber = `+880${id.slice(-5)}-${id.slice(-3)}`;
  
  // Generate a Facebook profile using the student ID
  const facebookProfile = `https://facebook.com/profile/${id}`;
  
  return {
    phone: phoneNumber,
    facebook: facebookProfile
  };
};

// Create student data from the provided list
const createStudentData = () => {
  // Ensure we create exactly 60 students with serial avatar assignments
  const studentNames = [
    "MD. ASADULLAH",
    "MD. SIFAT ZAMAN",
    "MD. RAGIB ANJUM",
    "BIPRO KUMAR BASAK",
    "MD. SHAHRIA ISLAM",
    "MAHMUD E REZA",
    "FARHAN SADIK",
    "MORSHEDUL HASSAN",
    "MD. ARIF MAHAMUD",
    "MD. SHOPNIL",
    "MD. NOEM SIDDIKI",
    "AFZAR UZ ZAMAN BISWAS",
    "MD. MAHIR ASEF MUGDHO",
    "MUHAI MINUL ISLAM",
    "MD. MOJAHIDUL ISLAM",
    "MD. KIBRIA ALAM SHAFI",
    "MD. SAIFUL ISLAM",
    "SUMAIYA JAHAN",
    "ABDUL BAKEU BORSHON",
    "APURBA ROY DIGONTHA",
    "MST. JANNATUL FERDOUS",
    "MD. HABIBUR RAHMAN SHOPON",
    "MD. MAHADI HASSAN DIPU",
    "S. M. TAHSIN RIFAT",
    "SAYEED AL SAHAF",
    "SHAKIN MAHMUD TANVIR",
    "MD. TANVIR AHMED MAHIN",
    "NAHIYAN IBNAT NEHA",
    "AYMAN FAIZAH",
    "MD. SHAFIN KHAN",
    "TADRUP KUMAR DHAR",
    "MD. SAJEEB HUSSAIN",
    "NASRULLAH AL SAMI",
    "MD. AJMAIN FAYEK",
    "MD. TASNIM ALAM TURZO",
    "MD. SABBIR HOSSAIN SAKIB",
    "SEHRAN ALAM",
    "MD. MASHQURUL ALAM",
    "AMRITO SARKAR",
    "MOST. NAFISA MAHJABIN BORSHA",
    "SIMUL SHAHRIAR",
    "FAISAL MAHMUD FAHIM",
    "RIFA TAMANNA",
    "MD. MASUM LIEON",
    "THAMINA AKTER",
    "MD. YEAMINUL BASAR",
    "JAWAD UDDIN ALVI",
    "MD. SHIHAB -UN-SAKIB",
    "MD. NIYAMUL HAQUE NAYEEM",
    "MD. ABID HOSSAIN",
    "MD. HARUN TALUKDER",
    "MD. PROTIK HASAN",
    "RAF RAFIN KHAN KHAN",
    "TAHMIDUL HAQUE SAIF",
    "MD. SAJIDUR RAHMAN",
    "MD. RAKIN ABSAR RUDDRO",
    "FARDEEN AHMED",
    "MD. RIFATUL ISLAM",
    "MD. TASHRIF AHAMMED TUHIN",
    "MD. RAKEEB TANVIR SIDDIQUI"
  ];

  // Sample descriptions for students with more premium content
  const descriptions = [
    "Leading research in renewable energy integration with smart grid technologies.",
    "Award-winning developer specializing in advanced embedded systems and IoT architectures.",
    "Publishing innovative machine learning solutions for predictive maintenance in power systems.",
    "Pioneering work in nanoscale VLSI design with focus on quantum computing applications.",
    "Developing next-generation control systems for aerospace and defense applications.",
    "Advancing signal processing algorithms for 6G communication networks.",
    "Creating breakthrough solutions in efficient power electronics for electric vehicles.",
    "Spearheading research in high-frequency RF engineering for advanced telecommunications.",
    "Leading projects on sustainable energy systems with international collaborations.",
    "Innovating in autonomous robotics systems with computer vision integration."
  ];

  // Create exactly 60 students
  const students = [];
  
  // First, add all the named students
  for (let i = 0; i < Math.min(studentNames.length, 60); i++) {
    const rollNumber = 2301001 + i;
    const id = rollNumber.toString();
    const descriptionIndex = i % descriptions.length;
    
    students.push({
      id: id,
      name: studentNames[i],
      image: getAvatarImage(i), // Serial assignment: student 0 gets avatar-1
      contactInfo: generateContactInfo(id),
      description: descriptions[descriptionIndex],
      achievements: generateRandomAchievements(),
      year: "2023",
      semester: "Spring"
    });
  }
  
  // If we have fewer than 60 named students, add generic ones to reach 60
  if (students.length < 60) {
    for (let i = students.length; i < 60; i++) {
      const rollNumber = 2301001 + i;
      const id = rollNumber.toString();
      const descriptionIndex = i % descriptions.length;
      
      students.push({
        id: id,
        name: `Student ${rollNumber}`,
        image: getAvatarImage(i), // Continue serial assignment
        contactInfo: generateContactInfo(id),
        description: descriptions[descriptionIndex],
        achievements: generateRandomAchievements(),
        year: "2023",
        semester: "Spring"
      });
    }
  }
  
  return students;
};

// Create the student data
export const allStudents = createStudentData();

// Select only 2023 batch students (IDs starting with 2301) for the featured section
// Select exactly 5 students from the 2023 batch with interesting profiles
export const featuredStudents = allStudents
  .filter(student => student.id.startsWith('2301')) // Only 23 series students
  .sort((a, b) => {
    // Sort by achievements length first (more achievements = higher priority)
    const achievementDiff = (b.achievements?.length || 0) - (a.achievements?.length || 0);
    if (achievementDiff !== 0) return achievementDiff;
    
    // If same number of achievements, sort by name for consistency
    return a.name.localeCompare(b.name);
  })
  .slice(0, 5); // Limit to exactly 5 students
