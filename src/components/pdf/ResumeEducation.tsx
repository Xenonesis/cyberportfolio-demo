import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { EDUCATION, CERTIFICATIONS } from '@/lib/data';

const styles = StyleSheet.create({
  section: {
    marginBottom: 25,
    paddingHorizontal: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#00FFFF',
    fontFamily: 'Helvetica-Bold',
  },
  educationItem: {
    marginBottom: 15,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  educationDegree: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Helvetica-Bold',
  },
  educationYear: {
    fontSize: 11,
    color: '#39FF14',
    fontFamily: 'Helvetica',
  },
  educationInstitution: {
    fontSize: 13,
    color: '#00FFFF',
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },
  educationDescription: {
    fontSize: 11,
    color: '#E2E8F0',
    lineHeight: 1.5,
    marginBottom: 8,
    fontFamily: 'Helvetica',
  },
  honorsSection: {
    marginBottom: 8,
  },
  honorsTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'Helvetica-Bold',
  },
  honorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  honorBadge: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#39FF14',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  honorText: {
    fontSize: 9,
    color: '#39FF14',
    fontFamily: 'Helvetica',
  },
  certificationsSection: {
    marginTop: 20,
  },
  certificationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#39FF14',
    fontFamily: 'Helvetica-Bold',
  },
  certificationItem: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  certificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  certificationTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Helvetica-Bold',
  },
  certificationDate: {
    fontSize: 10,
    color: '#00FFFF',
    fontFamily: 'Helvetica',
  },
  certificationIssuer: {
    fontSize: 12,
    color: '#39FF14',
    marginBottom: 6,
    fontFamily: 'Helvetica-Bold',
  },
  certificationDescription: {
    fontSize: 10,
    color: '#CBD5E1',
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  certificationStatus: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#39FF14',
    color: '#0F172A',
    fontSize: 8,
    fontWeight: 'bold',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
    fontFamily: 'Helvetica-Bold',
  },
});

export const ResumeEducation = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Education & Certifications</Text>

      {/* Education */}
      {EDUCATION.map(edu => (
        <View key={edu.id} style={styles.educationItem}>
          <View style={styles.educationHeader}>
            <Text style={styles.educationDegree}>{edu.degree}</Text>
            <Text style={styles.educationYear}>{edu.year}</Text>
          </View>

          <Text style={styles.educationInstitution}>{edu.institution}</Text>

          <Text style={styles.educationDescription}>{edu.description}</Text>

          {edu.honors && edu.honors.length > 0 && (
            <View style={styles.honorsSection}>
              <Text style={styles.honorsTitle}>Honors & Awards:</Text>
              <View style={styles.honorsGrid}>
                {edu.honors.map((honor, index) => (
                  <View key={index} style={styles.honorBadge}>
                    <Text style={styles.honorText}>{honor}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      ))}

      {/* Certifications */}
      <View style={styles.certificationsSection}>
        <Text style={styles.certificationsTitle}>
          Professional Certifications
        </Text>

        {CERTIFICATIONS.map(cert => (
          <View
            key={cert.id}
            style={[styles.certificationItem, { position: 'relative' }]}
          >
            <View style={styles.certificationHeader}>
              <Text style={styles.certificationTitle}>{cert.title}</Text>
              <Text style={styles.certificationDate}>{cert.date}</Text>
            </View>

            <Text style={styles.certificationIssuer}>{cert.issuer}</Text>

            <Text style={styles.certificationDescription}>
              {cert.description}
            </Text>

            {cert.status === 'completed' && (
              <Text style={styles.certificationStatus}>COMPLETED</Text>
            )}
            {cert.status === 'in-progress' && (
              <Text
                style={[
                  styles.certificationStatus,
                  { backgroundColor: '#00FFFF' },
                ]}
              >
                IN PROGRESS
              </Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};
