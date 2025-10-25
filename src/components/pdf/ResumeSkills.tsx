import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { SKILL_CATEGORIES, PROFICIENCY_LEVELS } from '@/lib/data';

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
  categoryContainer: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Helvetica-Bold',
  },
  categoryStats: {
    fontSize: 10,
    color: '#94A3B8',
    fontFamily: 'Helvetica',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skillItem: {
    width: '48%',
    marginBottom: 8,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  skillName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#E2E8F0',
    fontFamily: 'Helvetica-Bold',
  },
  skillLevel: {
    fontSize: 10,
    color: '#00FFFF',
    fontFamily: 'Helvetica',
  },
  skillBar: {
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    marginBottom: 4,
  },
  skillProgress: {
    height: 4,
    borderRadius: 2,
  },
  skillDescription: {
    fontSize: 9,
    color: '#94A3B8',
    lineHeight: 1.3,
    fontFamily: 'Helvetica',
  },
  proficiencyLegend: {
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  legendColor: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 9,
    color: '#CBD5E1',
    fontFamily: 'Helvetica',
  },
});

const getProficiencyColor = (level: number) => {
  const proficiency = PROFICIENCY_LEVELS.find(p => level >= p.minPercentage && level <= p.maxPercentage);
  return proficiency?.color === 'neon-green' ? '#39FF14' :
         proficiency?.color === 'electric-cyan' ? '#00FFFF' : '#64748B';
};

export const ResumeSkills = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Skills & Expertise</Text>

      {SKILL_CATEGORIES.map((category) => (
        <View key={category.id} style={styles.categoryContainer}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.categoryStats}>
              {category.skillCount} skills • {category.averageProficiency}% avg proficiency
            </Text>
          </View>

          <View style={styles.skillsGrid}>
            {category.skills.slice(0, 8).map((skill) => (
              <View key={skill.id} style={styles.skillItem}>
                <View style={styles.skillHeader}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <Text style={styles.skillLevel}>{skill.proficiency}%</Text>
                </View>

                <View style={styles.skillBar}>
                  <View
                    style={[
                      styles.skillProgress,
                      {
                        width: `${skill.proficiency}%`,
                        backgroundColor: getProficiencyColor(skill.proficiency),
                      },
                    ]}
                  />
                </View>

                <Text style={styles.skillDescription}>
                  {skill.description.length > 80
                    ? `${skill.description.substring(0, 80)}...`
                    : skill.description}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.proficiencyLegend}>
        <Text style={styles.legendTitle}>Proficiency Levels</Text>
        <View style={styles.legendGrid}>
          {PROFICIENCY_LEVELS.map((level) => (
            <View key={level.level} style={styles.legendItem}>
              <View
                style={[
                  styles.legendColor,
                  {
                    backgroundColor: level.color === 'neon-green' ? '#39FF14' :
                                   level.color === 'electric-cyan' ? '#00FFFF' : '#64748B'
                  },
                ]}
              />
              <Text style={styles.legendText}>
                {level.level.charAt(0).toUpperCase() + level.level.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};