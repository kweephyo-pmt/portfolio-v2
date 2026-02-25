export interface Project {
    id: string;
    title: string;
    tech: string;
    technologies: string[];
    desc: string;
    url: string;
    githubUrl: string;
    category: 'web' | 'mobile' | 'other';
    year: string;
    image: string;
    features: string[];
    featured?: boolean;
    order?: number;
}

export interface Skill {
    id: string;
    name: string;
    icon: string;
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
    technologies: string[];
    type: 'work' | 'internship' | 'freelance';
}

export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    imageUrl: string;
    description?: string;
    link?: string;
    order?: number;
}

export interface SiteConfig {
    name: string;
    tagline: string;
    bio: string;
    aboutTitle?: string;
    aboutMe?: string;
    email: string;
    phone: string;
    location: string;
    availableForWork: boolean;
    heroTitle: string;
    github: string;
    linkedin: string;
    twitter?: string;
    instagram?: string;
    resumeUrl?: string;
    profileImage?: string;
    accentColor: string;
    theme: 'dark' | 'light';
}

export interface AdminUser {
    username: string;
    passwordHash: string;
}

export interface ToastMessage {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
}
