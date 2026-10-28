export const profile = {
  name: 'Advait Saxena',
  email: 'saxenaadvait06@gmail.com',
  location: 'Manipal, Karnataka',
  cgpa: '8.09',
  bio: 'Second-year B.Tech CSE (FinTech) student at MIT Manipal. I like finding out how things work, so I build websites and small AI projects, solve security puzzles, and keep fixing things until they work.',
  about:
    "I'm a second-year CS student at MIT Manipal, and I learn by building things and fixing them when they break. I'm curious about how things work, from AI models to security puzzles, and I like making small tools people can actually use. Away from the keyboard I enjoy music, graphic design and volunteering.",
  socials: {
    github: 'https://github.com/AdvaitZeroSix',
    linkedin: 'https://www.linkedin.com/in/advaitsaxena2306/',
    leetcode: 'https://leetcode.com/u/AdvaitSaxena/',
  },
}

export const aboutFacts = {
  exploring: ['Full-stack', 'Machine learning', 'Deep learning', 'Cybersecurity', 'FinTech'],
  learn: 'Build it, break it, figure out why it broke.',
  giving: 'Blood donation camps, cloth drives, beach clean-ups and old age home visits with Rotaract.',  semesters: [
    { label: 'Sem 1', value: 8.24 },
    { label: 'Sem 2', value: 7.95 },
  ],
  design: ['Canva', 'Excel', 'Figma', 'Graphic design'],}

/* ---------------------------------------------------------------- flagship */
export const flagship = {
  title: 'Hopeless Opus',
  tagline: 'An online puzzle-adventure game for the Acumen category at Techtatva 2026, hosted by ISTE Manipal, with players from across the country and an INR 11,000 prize pool.',
  role: 'I was one of 9 web developers in a team of 17 (alongside 4 designers and 4 story writers). I built 5 of the puzzles and a good share of the website pages.',
  live: 'https://hopelessopus.istemanipal.com',
  stats: [
    { value: 250, suffix: '+', label: 'Registrations' },
    { value: 130, suffix: '+', label: 'Players at once' },
    { value: 30, suffix: '', label: 'Puzzle games' },
  ],
  built: 'Built with React and MongoDB.',
  chapters: [
    {
      id: 'game',
      tab: 'Game',
      kicker: 'The game',
      title: 'A story you play through',
      text: 'Teams sign in, follow a story across three phases and solve a puzzle at every step, while a live leaderboard shows who is ahead.',
      image: '/showcase/ho-home.jpg',
      alt: 'Hopeless Opus home page',
    },
    {
      id: 'website',
      tab: 'Website',
      kicker: 'The website',
      title: 'One world, from the first click',
      text: 'I redesigned the home, rules, contact and leaderboard pages so everything felt like the same ancient-temple setting, with smooth animations.',
      image: '/showcase/ho-rules.jpg',
      alt: 'Hopeless Opus rules page',
    },
    {
      id: 'doors',
      tab: 'Doors',
      kicker: 'Puzzle · The Three Doors',
      title: 'Spot the pattern, pick the door',
      text: 'A timed pattern puzzle. The clock runs on our server and only starts when you press Start, so refreshing the page can never reset it.',
      image: '/showcase/ho-doors.jpg',
      alt: 'Puzzle with three doors and a pattern clue',
    },
    {
      id: 'cipher',
      tab: 'Cipher',
      kicker: 'Puzzle · The Ancient Cipher',
      title: 'Spin the wheel to crack the code',
      text: 'Players turn three rings to decode a hidden message one letter at a time. I built the draggable wheel and its animations.',
      image: '/showcase/ho-cipher.jpg',
      alt: 'Cipher wheel puzzle',
    },
    {
      id: 'relic',
      tab: 'Relic',
      kicker: 'Puzzle · The Missing Relic',
      title: 'Play detective',
      text: 'Arrange the timeline, question the suspects and accuse the right one before time runs out.',
      image: '/showcase/ho-deduction.jpg',
      alt: 'Detective puzzle board',
    },
  ],
}

/* ---------------------------------------------------------------- projects */
// cover picks the card illustration; private = source is not public
export const projects = [
  {
    id: 'gittoknow',
    title: 'GitToKnow',
    kind: 'AI developer tool',
    cover: 'neural',
    icon: 'diagram',
    status: 'Top 6',
    desc: 'Starting on an unfamiliar codebase is slow. Paste a public GitHub link and get an interactive map of which files import which, an AI-written overview, and a chat that answers questions with links to the exact files and lines. Built with a team of 4 for Hacktoberfest x MOSS Hack Day Udupi, using Gemma 4, and made it to the top 6. It also ships as an agent skill that tools like Claude Code can use.',
    tags: ['React', 'FastAPI', 'Gemma 4', 'RAG'],
    repo: 'https://github.com/white-shn/GitToKnow',
  },
  {
    id: 'studenthub',
    title: 'StudentHub',
    kind: 'Web app',
    cover: 'image',
    image: '/showcase/studenthub.jpg',
    status: 'Live',
    icon: 'layers',
    desc: 'Students juggle notes, deadlines and money across different apps. StudentHub brings an expense tracker, notes, a task list and a study timer into one dashboard. Built for the ISTE Summer School 2026 web showcase.',
    tags: ['React', 'MongoDB', 'JWT'],
    live: 'https://studenthub-react.vercel.app/',
    repo: 'https://github.com/AdvaitZeroSix/studenthub_react',
  },
  {
    id: 'spotify',
    title: 'Spotify Wrapped',
    kind: 'Music + AI',
    cover: 'spotify',
    icon: 'music',
    desc: "Spotify's yearly recap only shows up once a year. Upload any playlist to see your mood, top artists and how old your taste is, or rate ten songs and get ten new ones picked for you.",
    tags: ['Python', 'Machine learning', 'Streamlit'],
    private: true,
  },
  {
    id: 'coldcase',
    title: 'Cold Case #069',
    kind: 'Cybersecurity puzzle',
    cover: 'ctf',
    icon: 'shield',
    status: 'Authored',
    desc: 'A detective-style capture-the-flag challenge I designed. Players follow clues through a photo, public information and a hidden website to find the flag. A friendly way for beginners to learn how security investigations work.',
    tags: ['Forensics', 'OSINT', 'Web'],
    repo: 'https://github.com/AdvaitZeroSix/ColdCase069',
  },
  {
    id: 'finance',
    title: 'AI Finance Insights',
    kind: 'Personal finance',
    cover: 'finance',
    icon: 'robot',
    desc: 'Most people only notice where their money went after it is gone. Upload a bank statement and get a 0-100 financial health score, a warning about overspending or forgotten subscriptions, and what to fix first. Built at DevSprint, the Aurora 2026 hackathon by ISTE Manipal.',
    tags: ['Python', 'FastAPI', 'Pandas'],
    private: true,
  },
  {
    id: 'cloudizard',
    title: 'Cloudizard',
    kind: 'AI assistant',
    cover: 'router',
    icon: 'cloud',
    desc: 'One search box that works out what you are asking. Ask about a Pokémon, the weather or anything else and it sends your question to the right place and answers in plain language.',
    tags: ['Python', 'Gemini API'],
    live: 'https://cloudizard.onrender.com',
    repo: 'https://github.com/AdvaitZeroSix/Cloudizard',
  },
  {
    id: 'fifa',
    title: 'FIFA Team Predictor',
    kind: 'Machine learning',
    cover: 'pitch',
    icon: 'futbol',
    desc: 'Can player stats tell you how strong a football team is? This app sorts FIFA 23 teams into Weak, Average, Good and Elite tiers with a Random Forest and compares two teams side by side. Handy for fans, fantasy players and scouts.',
    tags: ['Python', 'scikit-learn', 'Streamlit'],
    live: 'https://advaitsaxena.streamlit.app/',
    repo: 'https://github.com/AdvaitZeroSix/FIFA_TeamPerformance',
  },
  {
    id: 'nn',
    title: 'Neural Network from Scratch',
    kind: 'Deep learning',
    cover: 'neural',
    icon: 'diagram',
    desc: 'To really understand how AI learns, I built a neural network using only basic maths code, with no machine-learning library, and tested it on a real medical dataset against standard methods.',
    tags: ['Python', 'NumPy'],
    repo: 'https://github.com/AdvaitZeroSix/MachineLearning/tree/main/NeuralNetwork',
  },
  {
    id: 'picoctf',
    title: 'picoCTF Write-ups',
    kind: 'Cybersecurity notes',
    cover: 'terminal',
    icon: 'flag',
    desc: 'Notes from solving 10 cybersecurity challenges, such as finding data hidden inside files and spotting clues in web pages. Written step by step so a beginner can follow along.',
    tags: ['Forensics', 'Web'],
    repo: 'https://github.com/AdvaitZeroSix/PicoCtf_Writeups',
  },
  {
    id: 'greenscreen',
    title: 'Live Green Screen',
    kind: 'Computer vision',
    cover: 'chroma',
    icon: 'video',
    desc: 'Change your video background live without special software or a powerful computer. It spots a green cloth and swaps it for any picture. Useful for video calls, streaming and presentations.',
    tags: ['Python', 'OpenCV'],
    repo: 'https://github.com/AdvaitZeroSix/Invisibile_OpenCV',
  },
  {
    id: 'ball',
    title: 'Ball Tracker',
    kind: 'Computer vision',
    cover: 'trail',
    icon: 'dot',
    status: 'Best project',
    desc: 'Follows a moving ball in live video and draws its path. The same idea is used in sports analysis and robotics. Chosen as the best project at the ISTE MIT OpenCV Workshop.',
    tags: ['Python', 'OpenCV'],
  },
]

/* --------------------------------------------------------------- the rest */
export const education = [
  {
    school: 'Manipal Institute of Technology',
    sub: 'B.Tech CSE (Financial Technology) · Manipal, Karnataka',
    date: '2025 – 2029',
    current: true,
    badges: ['CGPA: 8.09', 'Sem 1: 8.24', 'Sem 2: 7.95'],
  },
  {
    school: 'Modern Delhi International School',
    sub: 'Class XI – XII (CBSE) · Faridabad',
    date: '2023 – 2025',
    badges: ['12th: 86.8%', 'JEE Main: 90.2%ile'],
  },
  {
    school: 'Grand Columbus International School',
    sub: 'Class VII – X (CBSE) · Faridabad',
    date: '2019 – 2023',
    badges: ['10th: 93.8%'],
  },
  {
    school: 'Xavier School',
    sub: 'Kindergarten – Class VI · Gamharia, Jamshedpur',
    date: 'Until 2019',
    badges: [],
  },
]

export const skills = [
  { label: 'Languages', items: ['Python', 'Go', 'JavaScript', 'Java', 'C', 'SQL', 'PL/SQL', 'HTML / CSS'] },
  {
    label: 'Web development',
    items: ['React', 'Vite', 'Tailwind CSS', 'GSAP', 'FastAPI', 'MongoDB'],
  },
  {
    label: 'AI & data',
    items: ['Machine learning', 'Deep learning', 'LLM apps (RAG)', 'NumPy', 'Pandas', 'Scikit-learn', 'OpenCV', 'Streamlit'],
  },
  {
    label: 'Design',
    items: ['Canva', 'Figma', 'Framer', 'Graphic design', 'Social media', 'Excel'],
  },
  {
    label: 'Tools',
    items: ['Git & GitHub', 'Oracle SQL*Plus', 'nginx', 'Postman', 'Vercel', 'Render'],
  },
  {
    label: 'Security & CS',
    items: ['Digital forensics', 'OSINT', 'Web security', 'CTF write-ups', 'Data structures & algorithms', 'OOP', 'Programming paradigms'],
  },
]

export const achievements = [
  {
    icon: 'trophy',
    title: 'Top 6 · Hacktoberfest x MOSS Hack Day Udupi',
    text: 'Our team reached the top 6 with GitToKnow, a tool that maps any GitHub codebase and answers questions about it using Gemma 4.',
  },
  {
    icon: 'trophy',
    title: 'Best Project · ISTE MIT OpenCV Workshop',
    text: 'The Ball Tracker was selected as the top submission among all workshop participants.',
  },
  {
    icon: 'shield',
    title: 'Top 50 · Cryptonite MIT CTF',
    text: 'Ranked in the top 50 at the Cryptonite Capture The Flag cybersecurity competition at MIT Manipal.',
  },
  {
    icon: 'check',
    title: "Certificate of Recognition · TechTatva '26",
    text: "Recognised by MIT Manipal for service on the Acumen organising committee at TechTatva '26, the annual technical fest, held 14–17 October 2026.",
  },
]

// Positions of responsibility: each club lists the committee or role I hold in it
export const positions = [
  {
    club: 'ISTE Club, Manipal',
    roles: [
      {
        title: 'Managing Committee',
        text: 'Part of the team running the Acumen category at Techtatva 2026, helped with publicity for Aurora 2026 TechWeek, and took part in its DevSprint hackathon.',
      },
    ],
  },
  {
    club: 'IE Mechatronics Club, Manipal',
    roles: [
      {
        title: 'Managing Committee',
        text: 'I work on AI and development (machine learning and deep learning), social media and graphic design, and helped promote the ROS Workshop.',
      },
    ],
  },
  {
    club: 'Rotaract Club, Manipal',
    roles: [
      {
        title: 'Member',
        text: 'Helped host blood donation camps, cloth donation drives and beach clean-ups, and spent time with the elderly at old age homes. Also took part in 12+ letterhead exchanges with Rotaract clubs across India, building partnerships that let us reach and help more people together.',
      },
    ],
  },
]
