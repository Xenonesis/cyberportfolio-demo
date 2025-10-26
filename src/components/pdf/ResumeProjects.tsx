import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { PROJECTS } from '@/lib/data';

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
  projectItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  projectHeader: {
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'Helvetica-Bold',
  },
  projectSubtitle: {
    fontSize: 12,
    color: '#00FFFF',
    fontFamily: 'Helvetica',
  },
  projectDescription: {
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
  challengesSection: {
    marginBottom: 12,
  },
  challengesTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    fontFamily: 'Helvetica-Bold',
  },
  challengeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  challengeBullet: {
    width: 4,
    height: 4,
    backgroundColor: '#FF4444',
    borderRadius: 2,
    marginTop: 5,
    marginRight: 8,
    flexShrink: 0,
  },
  challengeText: {
    fontSize: 10,
    color: '#FCA5A5',
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  solutionsSection: {
    marginBottom: 12,
  },
  solutionsTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    fontFamily: 'Helvetica-Bold',
  },
  solutionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  solutionBullet: {
    width: 4,
    height: 4,
    backgroundColor: '#39FF14',
    borderRadius: 2,
    marginTop: 5,
    marginRight: 8,
    flexShrink: 0,
  },
  solutionText: {
    fontSize: 10,
    color: '#D1FAD6',
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  resultsSection: {
    marginBottom: 8,
  },
  resultsTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    fontFamily: 'Helvetica-Bold',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  resultBullet: {
    width: 4,
    height: 4,
    backgroundColor: '#00FFFF',
    borderRadius: 2,
    marginTop: 5,
    marginRight: 8,
    flexShrink: 0,
  },
  resultText: {
    fontSize: 10,
    color: '#BAE6FD',
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
});

export const ResumeProjects = () => {
  // Show only top 3 projects for PDF to keep it concise
  const topProjects = PROJECTS.slice(0, 3);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Key Projects & Case Studies</Text>

      {topProjects.map(project => (
        <View key={project.id} style={styles.projectItem}>
          <View style={styles.projectHeader}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectSubtitle}>{project.subtitle}</Text>
          </View>

          <Text style={styles.projectDescription}>{project.description}</Text>

          <View style={styles.technologiesSection}>
            <Text style={styles.technologiesTitle}>Technologies Used:</Text>
            <View style={styles.technologiesGrid}>
              {project.technologies.map((tech, index) => (
                <View key={index} style={styles.technologyBadge}>
                  <Text style={styles.technologyText}>{tech}</Text>
                </View>
              ))}
            </View>
          </View>

          {project.challenges && project.challenges.length > 0 && (
            <View style={styles.challengesSection}>
              <Text style={styles.challengesTitle}>Challenges:</Text>
              {project.challenges.map((challenge, index) => (
                <View key={index} style={styles.challengeItem}>
                  <View style={styles.challengeBullet} />
                  <Text style={styles.challengeText}>{challenge}</Text>
                </View>
              ))}
            </View>
          )}

          {project.solutions && project.solutions.length > 0 && (
            <View style={styles.solutionsSection}>
              <Text style={styles.solutionsTitle}>Solutions Implemented:</Text>
              {project.solutions.map((solution, index) => (
                <View key={index} style={styles.solutionItem}>
                  <View style={styles.solutionBullet} />
                  <Text style={styles.solutionText}>{solution}</Text>
                </View>
              ))}
            </View>
          )}

          {project.results && project.results.length > 0 && (
            <View style={styles.resultsSection}>
              <Text style={styles.resultsTitle}>Results & Impact:</Text>
              {project.results.map((result, index) => (
                <View key={index} style={styles.resultItem}>
                  <View style={styles.resultBullet} />
                  <Text style={styles.resultText}>{result}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};
