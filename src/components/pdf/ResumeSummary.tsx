import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { RESUME_SUMMARY } from '@/lib/data';

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
  summaryText: {
    fontSize: 12,
    color: '#E2E8F0',
    lineHeight: 1.6,
    marginBottom: 20,
    fontFamily: 'Helvetica',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '48%',
    marginBottom: 10,
  },
  achievementBullet: {
    width: 6,
    height: 6,
    backgroundColor: '#00FFFF',
    borderRadius: 3,
    marginTop: 6,
    marginRight: 10,
    flexShrink: 0,
  },
  achievementText: {
    fontSize: 11,
    color: '#CBD5E1',
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  specializationsSection: {
    marginTop: 20,
  },
  specializationsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    fontFamily: 'Helvetica-Bold',
  },
  specializationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specializationBadge: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#39FF14',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 6,
  },
  specializationText: {
    fontSize: 10,
    color: '#39FF14',
    fontFamily: 'Helvetica',
  },
});

export const ResumeSummary = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Professional Summary</Text>

      <Text style={styles.summaryText}>
        {RESUME_SUMMARY.overview}
      </Text>

      <View style={styles.achievementsGrid}>
        {RESUME_SUMMARY.keyAchievements.map((achievement, index) => (
          <View key={index} style={styles.achievementItem}>
            <View style={styles.achievementBullet} />
            <Text style={styles.achievementText}>{achievement}</Text>
          </View>
        ))}
      </View>

      <View style={styles.specializationsSection}>
        <Text style={styles.specializationsTitle}>Core Specializations</Text>
        <View style={styles.specializationsGrid}>
          {RESUME_SUMMARY.specializations.map((specialization, index) => (
            <View key={index} style={styles.specializationBadge}>
              <Text style={styles.specializationText}>{specialization}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};