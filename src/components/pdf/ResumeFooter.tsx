import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { SITE_CONFIG } from '@/lib/data';

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#1E293B',
    padding: 20,
    marginTop: 20,
    borderTopWidth: 2,
    borderTopColor: '#00FFFF',
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginRight: 8,
    fontFamily: 'Helvetica',
  },
  contactValue: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  socialLinks: {
    flex: 1,
    alignItems: 'flex-end',
  },
  socialTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'right',
    fontFamily: 'Helvetica-Bold',
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 8,
  },
  socialBadge: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#00FFFF',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  socialText: {
    fontSize: 9,
    color: '#00FFFF',
    fontFamily: 'Helvetica',
  },
  disclaimer: {
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  disclaimerText: {
    fontSize: 8,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 1.3,
    fontFamily: 'Helvetica',
  },
});

export const ResumeFooter = () => {
  const socialPlatforms = [
    { name: 'LinkedIn', url: 'linkedin.com/in/aditya-cybersecurity' },
    { name: 'GitHub', url: 'github.com/aditya-cybersecurity' },
    { name: 'Portfolio', url: 'aditya-cybersecurity.com' },
  ];

  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>Contact Information</Text>
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
        </View>

        <View style={styles.socialLinks}>
          <Text style={styles.socialTitle}>Professional Networks</Text>
          <View style={styles.socialGrid}>
            {socialPlatforms.map((platform, index) => (
              <View key={index} style={styles.socialBadge}>
                <Text style={styles.socialText}>{platform.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          This resume is confidential and intended solely for the recipient. All information contained herein is proprietary
          and may not be reproduced or distributed without explicit written permission.
        </Text>
      </View>
    </View>
  );
};