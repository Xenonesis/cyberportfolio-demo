import { Metadata } from 'next';
import { CareerTimeline } from '@/components/sections/CareerTimeline';

export const metadata: Metadata = {
  title: 'Career Timeline & Resume Summary - Aditya Kumar Tiwari',
  description:
    'Explore my professional journey through cybersecurity and development, showcasing education, experience, certifications, and key achievements that demonstrate expertise in protecting digital assets.',
  keywords: [
    'career timeline',
    'resume summary',
    'cybersecurity career',
    'professional experience',
    'education background',
    'certifications',
    'achievements',
    'security specialist',
    'full-stack developer',
  ],
  openGraph: {
    title: 'Career Timeline & Resume Summary - Aditya Kumar Tiwari',
    description:
      'Explore my professional journey through cybersecurity and development, showcasing education, experience, certifications, and key achievements that demonstrate expertise in protecting digital assets.',
    type: 'article',
    url: 'https://aditya-cybersecurity.com/career-timeline',
  },
};

export default function CareerTimelinePage() {
  return (
    <main>
      <CareerTimeline />
    </main>
  );
}
