'use client';

import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Document, Page, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeHeader } from './ResumeHeader';
import { ResumeSummary } from './ResumeSummary';
import { ResumeSkills } from './ResumeSkills';
import { ResumeExperience } from './ResumeExperience';
import { ResumeEducation } from './ResumeEducation';
import { ResumeProjects } from './ResumeProjects';
import { ResumeFooter } from './ResumeFooter';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#0F172A',
    color: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  container: {
    flex: 1,
  },
});

// PDF Document Component
const ResumeDocument = () => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.container}>
        <ResumeHeader />
        <ResumeSummary />
        <ResumeSkills />
        <ResumeExperience />
        <ResumeEducation />
        <ResumeProjects />
        <ResumeFooter />
      </View>
    </Page>
  </Document>
);

interface PDFResumeGeneratorProps {
  children?: React.ReactNode;
  className?: string;
}

export const PDFResumeGenerator: React.FC<PDFResumeGeneratorProps> = ({
  children,
  className = '',
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateAndDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      // Generate the PDF blob
      const blob = await pdf(<ResumeDocument />).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Aditya_Kumar_Tiwari_Cybersecurity_Resume.pdf';

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation failed:', err);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (children) {
    return (
      <div className={className} onClick={generateAndDownloadPDF}>
        {children}
      </div>
    );
  }

  return (
    <div className={className}>
      <button
        onClick={generateAndDownloadPDF}
        disabled={isGenerating}
        className='bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 disabled:cursor-not-allowed'
        aria-label={
          isGenerating ? 'Generating PDF resume...' : 'Download PDF resume'
        }
      >
        {isGenerating ? (
          <>
            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
            <span>Generating PDF...</span>
          </>
        ) : (
          <>
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              />
            </svg>
            <span>Download Resume PDF</span>
          </>
        )}
      </button>

      {error && (
        <div className='mt-4 p-4 bg-red-900/50 border border-red-500/50 rounded-lg'>
          <div className='flex items-center space-x-2'>
            <svg
              className='w-5 h-5 text-red-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span className='text-red-400 text-sm'>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};
