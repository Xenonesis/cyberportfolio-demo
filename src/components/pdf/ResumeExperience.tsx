import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { EXPERIENCE } from '@/lib/data';

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
  experienceItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  experienceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Helvetica-Bold',
  },
  experiencePeriod: {
    fontSize: 11,
    color: '#00FFFF',
    fontFamily: 'Helvetica',
  },
  experienceCompany: {
    fontSize: 13,
    color: '#39FF14',
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },
  experienceDescription: {
    fontSize: 11,
    color: '#E2E8F0',
    lineHeight: 1.5,
    marginBottom: 12,
    fontFamily: 'Helvetica',
  },
  technologiesSection: {
    marginBottom: 12,
  },
  technologiesTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    fontFamily: 'Helvetica-Bold',
  },
  technologiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  technologyBadge: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  technologyText: {
    fontSize: 9,
    color: '#CBD5E1',
    fontFamily: 'Helvetica',
  },
  achievementsSection: {
    marginBottom: 8,
  },
  achievementsTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    fontFamily: 'Helvetica-Bold',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  achievementBullet: {
    width: 4,
    height: 4,
    backgroundColor: '#39FF14',
    borderRadius: 2,
    marginTop: 5,
    marginRight: 8,
    flexShrink: 0,
  },
  achievementText: {
    fontSize: 10,
    color: '#CBD5E1',
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
});

export const ResumeExperience = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Professional Experience</Text>

      {EXPERIENCE.map((exp) => (
        <View key={exp.id} style={styles.experienceItem}>
          <View style={styles.experienceHeader}>
            <Text style={styles.experienceTitle}>{exp.title}</Text>
            <Text style={styles.experiencePeriod}>{exp.period}</Text>
          </View>

          <Text style={styles.experienceCompany}>{exp.company}</Text>

          <Text style={styles.experienceDescription}>
            {exp.description}
          </Text>

          <View style={styles.technologiesSection}>
            <Text style={styles.technologiesTitle}>Key Technologies:</Text>
            <View style={styles.technologiesGrid}>
              {exp.technologies.map((tech, techIndex) => (
                <View key={techIndex} style={styles.technologyBadge}>
                  <Text style={styles.technologyText}>{tech}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.achievementsSection}>
            <Text style={styles.achievementsTitle}>Key Achievements:</Text>
            {exp.achievements.map((achievement, achIndex) => (
              <View key={achIndex} style={styles.achievementItem}>
                <View style={styles.achievementBullet} />
                <Text style={styles.achievementText}>{achievement}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};