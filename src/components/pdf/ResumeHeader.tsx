import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { SITE_CONFIG } from '@/lib/data';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0F172A',
    padding: 30,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },
  title: {
    fontSize: 16,
    color: '#00FFFF',
    marginBottom: 20,
    fontFamily: 'Helvetica',
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 120,
  },
  contactLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginRight: 8,
    fontFamily: 'Helvetica',
  },
  contactValue: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  certifications: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  certTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold',
  },
  certGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  certBadge: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#00FFFF',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  certText: {
    fontSize: 10,
    color: '#00FFFF',
    fontFamily: 'Helvetica',
  },
});

export const ResumeHeader = () => {
  const recentCerts = [
    'CISSP',
    'CEH',
    'CompTIA Security+',
    'AWS Security',
    'ISO 27001',
  ];

  return (
    <View style={styles.header}>
      <Text style={styles.name}>Aditya Kumar Tiwari</Text>
      <Text style={styles.title}>
        Cybersecurity Expert & Full-Stack Developer
      </Text>

      <View style={styles.contactGrid}>
        <View style={styles.contactItem}>
          <Text style={styles.contactLabel}>Email:</Text>
          <Text style={styles.contactValue}>{SITE_CONFIG.email}</Text>
        </View>
        <View style={styles.contactItem}>
          <Text style={styles.contactLabel}>Phone:</Text>
          <Text style={styles.contactValue}>{SITE_CONFIG.phone}</Text>
        </View>
        <View style={styles.contactItem}>
          <Text style={styles.contactLabel}>Location:</Text>
          <Text style={styles.contactValue}>{SITE_CONFIG.address}</Text>
        </View>
        <View style={styles.contactItem}>
          <Text style={styles.contactLabel}>LinkedIn:</Text>
          <Text style={styles.contactValue}>
            linkedin.com/in/aditya-cybersecurity
          </Text>
        </View>
        <View style={styles.contactItem}>
          <Text style={styles.contactLabel}>GitHub:</Text>
          <Text style={styles.contactValue}>
            github.com/aditya-cybersecurity
          </Text>
        </View>
      </View>

      <View style={styles.certifications}>
        <Text style={styles.certTitle}>Security Certifications</Text>
        <View style={styles.certGrid}>
          {recentCerts.map((cert, index) => (
            <View key={index} style={styles.certBadge}>
              <Text style={styles.certText}>{cert}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
