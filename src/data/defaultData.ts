import type { Project, SiteConfig, Skill, Experience, Certificate } from '../types';

// ─── Default Project Data ────────────────────────────────────────────────────

export const defaultProjects: Project[] = [
    {
        id: "newlife",
        title: "NewLife - AI-Powered Travel Companion",
        tech: "React, TypeScript, AI Integration, Real-time APIs",
        technologies: ["React", "TypeScript", "AI/ML", "Real-time APIs", "Weather API", "Maps Integration", "Social Features"],
        desc: "Comprehensive AI-powered travel planning platform that revolutionizes trip organization. Features intelligent itinerary generation, real-time updates based on weather and traffic, vibrant community engagement, and seamless travel experience management.",
        url: "https://new-life-ai.vercel.app/",
        githubUrl: "https://github.com/kweephyo-pmt/new_life",
        category: "web",
        year: "2025",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
        featured: true,
        order: 1,
        features: [
            "AI-powered real-time itinerary planning with intelligent suggestions and personalized recommendations",
            "Smart trip updates that automatically adjust plans based on weather conditions, traffic, and local events",
            "Vibrant travel community platform with post creation, reactions, comments, and experience sharing",
            "Comprehensive trip management system for both weekend getaways and international journeys",
            "Modern TypeScript architecture with responsive design for seamless mobile and desktop experiences",
            "Integration with multiple APIs for weather forecasting, maps, and real-time travel information"
        ]
    },
    {
        id: "trackpoint",
        title: "TrackPoint - Professional Attendance Tracking",
        tech: "React, TypeScript, Supabase, Facial Recognition",
        technologies: ["React", "TypeScript", "Supabase", "Facial Recognition", "Location Services", "Real-time Analytics"],
        desc: "A comprehensive, modern attendance tracking application built with React, TypeScript, and Supabase. Features advanced facial recognition, location-based restrictions, real-time analytics, and a complete admin management system.",
        url: "https://trackpoint-attendance.vercel.app/",
        githubUrl: "https://github.com/kweephyo-pmt/TrackPoint",
        category: "web",
        year: "2025",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        featured: true,
        order: 2,
        features: [
            "Advanced facial recognition technology for secure and accurate attendance tracking",
            "Location-based restrictions ensuring attendance can only be marked from designated areas",
            "Real-time analytics dashboard with comprehensive reporting and data visualization",
            "Complete admin management system with user roles, permissions, and attendance oversight",
            "Modern TypeScript architecture with Supabase backend for scalable data management",
            "Responsive design optimized for both desktop and mobile attendance marking"
        ]
    },
    {
        id: "weflix",
        title: "WeFlix Movie Streaming Platform",
        tech: "React, JavaScript, CSS, Movie API",
        technologies: ["React", "JavaScript", "CSS", "Movie API"],
        desc: "Modern movie streaming platform with comprehensive movie database integration. Features advanced search functionality, detailed movie information, responsive design, and intuitive user interface for seamless movie discovery.",
        url: "https://weflixmovie.netlify.app/",
        githubUrl: "https://github.com/kweephyo-pmt/WeFlix",
        category: "web",
        year: "2025",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
        featured: false,
        order: 3,
        features: [
            "Comprehensive movie database integration with real-time search and filtering capabilities",
            "Responsive design architecture optimized for desktop, tablet, and mobile viewing experiences",
            "Interactive movie details with ratings, cast information, and trailer integration",
            "Modern UI/UX design with smooth animations and intuitive navigation system"
        ]
    },
    {
        id: "linkclub",
        title: "LinkClub Real-Time Chat Application",
        tech: "React, MERN Stack, Socket.io, JWT, Stream.io",
        technologies: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT", "Cloudinary", "TailwindCSS", "DaisyUI", "Zustand"],
        desc: "Modern, full-stack real-time chat application built with the MERN stack, featuring instant messaging and comprehensive user management. Implements Socket.io for real-time bidirectional communication.",
        url: "https://linkclub.netlify.app/",
        githubUrl: "https://github.com/kweephyo-pmt/linkclub",
        category: "web",
        year: "2025",
        image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80",
        featured: true,
        order: 4,
        features: [
            "Real-time bidirectional communication using Socket.io with instant message delivery and typing indicators",
            "Comprehensive user authentication system with JWT tokens and bcryptjs password hashing for security",
            "Modern React 18 frontend with Vite build tool, TailwindCSS styling, and DaisyUI components",
            "Full-stack MERN architecture with Express.js API, MongoDB database, and Cloudinary image upload integration"
        ]
    },
    {
        id: "curriculum",
        title: "Curriculum Statistics Website",
        tech: "Vue.js, Chart.js, Node.js, MySQL, Firebase, GCP",
        technologies: ["Vue.js", "Chart.js", "Node.js", "MySQL", "Firebase", "GCP"],
        desc: "Enterprise-level data visualization platform developed for Mae Fah Luang University's School of Management. Features comprehensive academic analytics with interactive dashboards and real-time data processing.",
        url: "https://app.som-bi.work.gd/",
        githubUrl: "https://github.com/kweephyo-pmt/senior_project",
        category: "web",
        year: "2025",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        featured: false,
        order: 5,
        features: [
            "Advanced data visualization using Chart.js with dynamic filtering and export capabilities",
            "Scalable backend architecture with MySQL database and Firebase integration",
            "Responsive web design with cross-browser compatibility and mobile optimization",
            "Secure authentication system with multi-level user permissions and data protection"
        ]
    },
    {
        id: "cafez",
        title: "CafeZ Mobile App",
        tech: "Flutter, Firebase",
        technologies: ["Flutter", "Firebase"],
        desc: "Cross-platform mobile application for streamlined cafe operations and customer engagement. Implemented secure payment processing, real-time order management, and comprehensive business analytics.",
        url: "https://play.google.com/store/apps/details?id=com.cafez.app&hl=en",
        githubUrl: "https://github.com/kweephyo-pmt/cafe_z",
        category: "mobile",
        year: "2024",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
        featured: false,
        order: 6,
        features: [
            "Intuitive mobile interface with seamless ordering workflow and integrated payment gateway",
            "Cross-platform development using Flutter framework for iOS and Android deployment",
            "Cloud-based backend infrastructure with Firebase for real-time synchronization and secure user management"
        ]
    },
    {
        id: "portfolio",
        title: "Personal Portfolio Website",
        tech: "React, Tailwind CSS, Framer Motion, Vite",
        technologies: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
        desc: "Professional portfolio website demonstrating full-stack development capabilities and project management skills. Features performance-optimized architecture, modern UI/UX design principles, and comprehensive project documentation.",
        url: "https://phyominthein.com/",
        githubUrl: "https://github.com/kweephyo-pmt/phyominthein-portfolio",
        category: "web",
        year: "2025",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
        featured: false,
        order: 7,
        features: [
            "Responsive design architecture with performance-optimized animations and micro-interactions",
            "Modern build pipeline using Vite for fast development and optimized production builds",
            "Interactive project galleries with live deployment links and comprehensive documentation",
            "Accessible design with dark/light theme support and professional typography system"
        ]
    },
    {
        id: "reclaimify",
        title: "Reclaimify Lost & Found App",
        tech: "Flutter, Firebase, GoogleMaps API",
        technologies: ["Flutter", "Firebase", "Google Maps API"],
        desc: "Comprehensive lost-and-found management system with geolocation services and intelligent matching algorithms. Features advanced search capabilities, automated notifications, and community-driven item recovery platform.",
        url: "https://github.com/kweephyo-pmt/lost_found",
        githubUrl: "https://github.com/kweephyo-pmt/lost_found",
        category: "mobile",
        year: "2023",
        image: "https://images.unsplash.com/photo-1505409628601-edc9af17fda6?w=800&q=80",
        featured: false,
        order: 8,
        features: [
            "Geospatial mapping integration with Google Maps API for precise location tracking",
            "Advanced image processing and machine learning for item categorization and matching",
            "Push notification system with intelligent matching algorithms for item recovery",
            "Responsive user interface with accessibility features and multilingual support"
        ]
    }
];

// ─── Default Site Config ─────────────────────────────────────────────────────

export const defaultSiteConfig: SiteConfig = {
    name: "Phyo Min Thein",
    tagline: "Leo",
    bio: "Software Engineering student with expertise in full-stack development, and DevOps. Delivering innovative solutions through modern technology stacks.",
    aboutTitle: "Hi, I'm Phyo Min Thein",
    aboutMe: "I'm a passionate full-stack developer who loves building elegant, user-centered digital experiences. With expertise spanning web and mobile development, I craft solutions that combine technical excellence with beautiful design.",
    email: "phyominthein.dev@gmail.com",
    phone: "+66 XX XXX XXXX",
    location: "Thailand 🇹🇭",
    availableForWork: true,
    heroTitle: "Full-Stack Developer",
    github: "https://github.com/kweephyo-pmt",
    linkedin: "https://linkedin.com/in/phyominthein",
    twitter: "",
    instagram: "",
    resumeUrl: "",
    profileImage: "",
    accentColor: "#6366f1",
    theme: "dark"
};

// ─── Default Skills ──────────────────────────────────────────────────────────

export const defaultSkills: Skill[] = [
    { id: "react", name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { id: "nextjs", name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    { id: "nodejs", name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
    { id: "cpp", name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
    { id: "java", name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
    { id: "python", name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { id: "javascript", name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg" },
    { id: "git", name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    { id: "typescript", name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { id: "mongodb", name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
    { id: "mysql", name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
    { id: "firebase", name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
];

// ─── Default Experience ──────────────────────────────────────────────────────

export const defaultExperiences: Experience[] = [
    {
        id: "exp1",
        company: "Mae Fah Luang University",
        role: "Full-Stack Developer (Senior Project)",
        period: "2024 – 2025",
        location: "Chiang Rai, Thailand",
        description: "Developed an enterprise-level curriculum statistics platform for the School of Management, featuring advanced data visualization, role-based access control, and real-time analytics dashboards serving university administrators and faculty.",
        technologies: ["Vue.js", "Chart.js", "Node.js", "MySQL", "Firebase", "GCP"],
        type: "work"
    },
    {
        id: "exp2",
        company: "Freelance",
        role: "Mobile App Developer",
        period: "2023 – 2024",
        location: "Remote",
        description: "Built cross-platform mobile applications using Flutter and Firebase for various clients. Delivered production-ready apps including a cafe management system (CafeZ) published on Google Play Store.",
        technologies: ["Flutter", "Firebase", "Dart", "Google Maps API"],
        type: "freelance"
    },
    {
        id: "exp3",
        company: "Personal Projects",
        role: "Full-Stack Developer",
        period: "2023 – Present",
        location: "Remote",
        description: "Continuously building and deploying modern web and mobile applications, exploring cutting-edge technologies including AI integration, real-time communication, and facial recognition systems.",
        technologies: ["React", "TypeScript", "Supabase", "Socket.io", "AI/ML"],
        type: "work"
    }
];

// ─── Default Certificates ────────────────────────────────────────────────────

export const defaultCertificates: Certificate[] = [
    {
        id: "cert1",
        title: "IBM FullStack Software Developer",
        issuer: "IBM",
        date: "2025",
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        description: "Professional certification in full-stack software development covering both frontend and backend technologies",
        link: "https://coursera.org/share/40b4858ad6371b82352207c45d2860c3",
        order: 1
    },
    {
        id: "cert2",
        title: "Foundation of Digital Marketing & E-Commerce",
        issuer: "Google",
        date: "2025",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        description: "Google certification covering digital marketing fundamentals and e-commerce strategies",
        link: "https://coursera.org/share/89ab619cbadf335ba8d8bc3a7f4b688b",
        order: 2
    },
    {
        id: "cert3",
        title: "Google AI Essentials",
        issuer: "Google",
        date: "2025",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        description: "Essential certification in artificial intelligence concepts and Google AI tools",
        link: "https://coursera.org/share/6a8123f02bb4ba5578285fd82e580839",
        order: 3
    }
];
