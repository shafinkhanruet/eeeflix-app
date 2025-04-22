// Mock student data for EEEFlix
// Using the provided roll numbers and names

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
const generateContactInfo = (id, name = "") => {
  // Format the name for use in URLs and IDs (convert to lowercase, remove spaces)
  const formattedName = name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
  
  // Generate a realistic Bangladesh mobile number
  // Bangladesh mobile numbers typically start with: 013, 014, 015, 016, 017, 018, 019
  const operators = ['013', '014', '015', '016', '017', '018', '019'];
  const randomOperator = operators[Math.floor(Math.random() * operators.length)];
  const lastEightDigits = id.slice(-5) + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const phoneNumber = `+880 ${randomOperator}-${lastEightDigits.substring(0, 4)}-${lastEightDigits.substring(4)}`;
  
  // Generate a Facebook profile using the student name or ID
  let facebookProfile;
  if (formattedName && formattedName.length > 3) {
    // Use the student's name for Facebook profile if available
    const randomSuffix = Math.floor(Math.random() * 100);
    facebookProfile = `https://facebook.com/${formattedName}${randomSuffix}`;
  } else {
    // Fallback to ID-based profile
    facebookProfile = `https://facebook.com/eeeruet${id.slice(-4)}`;
  }
  
  // Generate an email address
  const email = formattedName 
    ? `${formattedName}${Math.floor(Math.random() * 100)}@eeeflix.edu` 
    : `student${id}@eeeflix.edu`;
  
  return {
    phone: phoneNumber,
    facebook: facebookProfile,
    email: email
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

  // Bengali quotes from students
  const quotes = [
    "শুধু স্বপ্ন দেখলেই হবে না, সেগুলো অর্জন করতে হবে পরিশ্রম আর ইচ্ছাশক্তির মাধ্যমে।",
    "এটা জানি, কঠিন সময় আসবেই, কিন্তু আমি জানি যে, সেই সময়েও আমি এগিয়ে যাব।",
    "আমি জানি, পরিশ্রমের ফল কিছুদিন পরই আমাকে সফলতার দিকে নিয়ে যাবে।",
    "জীবনে সঠিক সময় কখনো আসে না, কিন্তু সঠিক পথ অনুসরণ করলে সাফল্য আসবেই।",
    "আমি একদিন সঠিক সিদ্ধান্ত নিতে পারব, আর সেটা আমাকে সফলতা এনে দেবে।",
    "আমার স্বপ্নগুলো বড়, আর আমি বিশ্বাস করি, আমি এগুলো অর্জন করব।",
    "বিশ্বাস রাখতে হবে, নিজের উপর এবং নিজের কাজে, সাফল্য একদিন আসবেই।",
    "কখনো কখনো আমি হারিয়ে যাই, কিন্তু আবার উঠে দাঁড়াই, কারণ আমি জানি, স্বপ্ন পূরণে সময় লাগে।",
    "এটা জানি, যেকোনো চ্যালেঞ্জ আমাকে শক্তিশালী করে তোলে, আর আমি সেই চ্যালেঞ্জগুলো গ্রহণ করি।",
    "শিক্ষা কখনো থামে না, প্রতিদিন কিছু না কিছু শিখে আমি এগিয়ে যেতে থাকব।",
    "অন্যদের থেকে শিখে নিজেকে প্রতিদিন উন্নত করতে চাই।",
    "কষ্ট সইলে একদিন সফলতা আসবেই, সেই বিশ্বাসটা আমাকে এগিয়ে নিয়ে যায়।",
    "আমার ভরসা শুধু আমার উপর, যেকোনো বাধা আমি পার করব।",
    "আমার লক্ষ্য স্পষ্ট, শুধু কাজ করতে হবে এবং সাফল্য আসবে।",
    "যত সময় নেবে, তবুও আমি থামব না, কারণ সাফল্য পেতে সময় লাগে।",
    "আমি জানি যে, পরীক্ষায় সঠিকভাবে প্রস্তুতি নিলে, সফলতা নিশ্চিত।",
    "যত বেশি চেষ্টা করব, তত বেশি ফল পাবো, এই বিশ্বাস আমাকে এগিয়ে নিয়ে যায়।",
    "আমি প্রতিদিনই কিছু নতুন শিখি, কারণ শিক্ষা শেষ নয়।",
    "বিশ্বাস রাখলে জীবন বদলে যায়, আমি সেই বিশ্বাসে আছি।",
    "বিপদের সময়ে আমি হাল ছাড়ি না, কারণ আমি জানি, সফলতা অপেক্ষা করছে।",
    "বড় স্বপ্ন দেখতে হবে, কারণ বড় স্বপ্নই বড় অর্জন নিয়ে আসে।",
    "সময়ের প্রয়োজন, কিন্তু আমি জানি যে আমি আমার লক্ষ্যে পৌঁছাবো।",
    "একটি ভুল শেখার সুযোগ, আর আমি তাতে পারফেক্ট হবো।",
    "পরিশ্রম এবং ধৈর্য্যই আমাকে সাফল্যের দিকে নিয়ে যাবে।",
    "নির্বাচন আমাকে সফল করবে, সঠিক পথে আমি চলতে থাকব।",
    "কঠিন সময়ে সফলতার রাস্তা খুঁজে বের করা আমি জানি।",
    "আজকের ছোট কাজ, কাল বড় সাফল্য এনে দেবে।",
    "আমার কাজই আমাকে সাফল্যের দিকে নিয়ে যাবে।",
    "প্রতিটি অঙ্গীকার, প্রতিটি অধ্যায় আমাকে সফলতার পথে নিয়ে যাচ্ছে।",
    "আমি জানি যে, প্রত্যেকটা চ্যালেঞ্জ আমাকে আরো শক্তিশালী করে।",
    "আমার সাফল্য আমার পছন্দ, আমি যা চাই তা অর্জন করবো।",
    "সব কিছু সম্ভব যদি তুমি থামো না, আমি থামব না।",
    "কঠোর পরিশ্রম, দৃঢ় মনোভাব—এই দুটি পথেই সফলতা আসবে।",
    "স্বপ্নের পিছনে ছুটে গেলে সফলতা অবশ্যই আসবে।",
    "নিজের ক্ষমতার উপর বিশ্বাস রাখলে কিছুই অসম্ভব নয়।",
    "যে পথটা সহজ মনে হয়, তা সফলতার দিকে নিয়ে যায় না, কঠিন পথই সঠিক।",
    "আমি জানি, কঠিন সময় একদিন শেষ হবে, এবং আমি তখন আরও শক্তিশালী হবো।",
    "জীবন যখন কঠিন হবে, তখনই আমার শক্তি দেখা যাবে।",
    "আজকের কঠিন কাজ, আগামী দিনের সাফল্য এনে দেবে।",
    "যতবার আমি ফেলেছি, ততবার আমি শক্তিশালী হয়েছি।",
    "জীবনের পথে একমাত্র বিপদই আসবে, কিন্তু আমি চলতে থাকবো।",
    "আমার চেষ্টাই আমাকে সফলতার দিকে নিয়ে যাবে।",
    "শিক্ষার অভাব ছিল, কিন্তু আজ আমি শিখছি এবং এগিয়ে যাচ্ছি।",
    "আমি জানি, একদিন আমি আমার স্বপ্নগুলোকে বাস্তবে পরিণত করবো।",
    "সবচেয়ে গুরুত্বপূর্ণ হল, কখনো হাল না ছাড়া।",
    "আজকের পরিশ্রমই আমাকে আগামী দিনের সাফল্য এনে দেবে।",
    "জীবনকে সহজ বানানোর জন্য, আমি প্রস্তুত।",
    "বিশ্বাস আর পরিশ্রম—এ দুটি দিয়ে আমি সব কিছু অর্জন করতে পারি।",
    "প্রতিটি ছোট পদক্ষেপই আমাকে সফলতার দিকে নিয়ে যাবে।",
    "সফলতা আসবে, কিন্তু কষ্টের মধ্য দিয়ে।",
    "জীবন একটি কঠিন পরীক্ষা, কিন্তু আমি এটাতে সফল হবো।",
    "আমি জানি, আমাকে খুঁজে পেতে সময় লাগবে, কিন্তু আমি তা অর্জন করব।",
    "নিজেকে বিশ্বাস করো, আর তুমি পৃথিবী জয় করবে।",
    "তোমার কঠোর পরিশ্রমই একদিন সাফল্য এনে দেবে।",
    "নিজের সীমাবদ্ধতা জানো, এবং এগিয়ে যাও।",
    "যতটা কঠিন হবে, ততটা গৌরবময় হবে সেই পথ।",
    "আমার স্বপ্নটি আমার কর্মে পরিণত হবে।",
    "পরিশ্রম, অধ্যবসায়, আর বিশ্বাস—এগুলোই আমার পথ দেখাবে।",
    "পরিশ্রম কখনো বৃথা যায় না, সফলতা আসবে যদি থেমো না।",
    "একই পদক্ষেপে যদি থামো না, তবে তুমি একদিন সফল হবে।"
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
    const quote = quotes[i % quotes.length]; // Assign quotes in order
    
    // Special case for Farhan Sadik who is at index 6 (ID: 2301007)
    if (studentNames[i] === "FARHAN SADIK") {
      students.push({
        id: id,
        name: studentNames[i],
        image: getAvatarImage(i),
        contactInfo: generateContactInfo(id, studentNames[i]),
        description: descriptions[descriptionIndex],
        quote: "সবার বিচার হবে", // Bengali text meaning "Everyone will be judged"
        year: "2023",
        semester: "Spring"
      });
    } else {
      students.push({
        id: id,
        name: studentNames[i],
        image: getAvatarImage(i), // Serial assignment: student 0 gets avatar-1
        contactInfo: generateContactInfo(id, studentNames[i]),
        description: descriptions[descriptionIndex],
        quote: quote,
        year: "2023",
        semester: "Spring"
      });
    }
  }
  
  // If we have fewer than 60 named students, add generic ones to reach 60
  if (students.length < 60) {
    for (let i = students.length; i < 60; i++) {
      const rollNumber = 2301001 + i;
      const id = rollNumber.toString();
      const descriptionIndex = i % descriptions.length;
      const quote = quotes[i % quotes.length]; // Assign quotes in order
      
      students.push({
        id: id,
        name: `Student ${rollNumber}`,
        image: getAvatarImage(i), // Continue serial assignment
        contactInfo: generateContactInfo(id),
        description: descriptions[descriptionIndex],
        quote: quote,
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
export const featuredStudents = allStudents
  .filter(student => student.id.startsWith('2301')) // Only 23 series students
  .sort(() => Math.random() - 0.5) // Randomly shuffle all 2301 students
  .slice(0, 10); // Select 10 students to ensure we have enough
