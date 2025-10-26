#!/usr/bin/env node

/**
 * Accessibility Test Runner
 * Runs comprehensive WCAG 2.1 AA compliance tests
 */

const fs = require('fs');
const path = require('path');

// Import test setup
require('./test-setup');

// Import accessibility test functions
const {
  testColorContrast,
  testKeyboardNavigation,
  testScreenReaderSupport,
  testFocusManagement,
  testMotionPreferences,
  testFormValidation,
  testImageAltText,
  testHeadingStructure,
  testLinkPurpose,
  testLanguageIdentification,
} = require('./src/components/accessibility/TestingSuite.tsx');

async function runAccessibilityTests() {
  console.log('🚀 Running Accessibility Tests...\n');

  const tests = [
    { name: 'Color Contrast', fn: testColorContrast },
    { name: 'Keyboard Navigation', fn: testKeyboardNavigation },
    { name: 'Screen Reader Support', fn: testScreenReaderSupport },
    { name: 'Focus Management', fn: testFocusManagement },
    { name: 'Motion Preferences', fn: testMotionPreferences },
    { name: 'Form Validation', fn: testFormValidation },
    { name: 'Image Alt Text', fn: testImageAltText },
    { name: 'Heading Structure', fn: testHeadingStructure },
    { name: 'Link Purpose', fn: testLinkPurpose },
    { name: 'Language Identification', fn: testLanguageIdentification },
  ];

  const results = {
    totalTests: tests.length,
    passed: 0,
    failed: 0,
    warnings: 0,
    violations: [],
    score: 0,
  };

  for (const test of tests) {
    console.log(`Running: ${test.name}`);
    try {
      const violations = await test.fn();

      if (violations.length === 0) {
        console.log(`✅ ${test.name}: PASSED\n`);
        results.passed++;
      } else {
        const criticalCount = violations.filter(v => v.severity === 'critical').length;
        const seriousCount = violations.filter(v => v.severity === 'serious').length;
        const moderateCount = violations.filter(v => v.severity === 'moderate').length;
        const minorCount = violations.filter(v => v.severity === 'minor').length;

        console.log(`❌ ${test.name}: FAILED`);
        console.log(`   Critical: ${criticalCount}, Serious: ${seriousCount}, Moderate: ${moderateCount}, Minor: ${minorCount}`);

        violations.forEach(violation => {
          console.log(`   - ${violation.description} (${violation.element})`);
        });
        console.log('');

        results.failed++;
        results.violations.push(...violations);

        if (criticalCount > 0 || seriousCount > 0) {
          results.warnings++;
        }
      }
    } catch (error) {
      console.log(`💥 ${test.name}: ERROR - ${error.message}\n`);
      results.failed++;
    }
  }

  // Calculate overall score
  const totalViolations = results.violations.length;
  const criticalWeight = 20;
  const seriousWeight = 15;
  const moderateWeight = 10;
  const minorWeight = 5;

  const totalPenalty = results.violations.reduce((sum, violation) => {
    switch (violation.severity) {
      case 'critical': return sum + criticalWeight;
      case 'serious': return sum + seriousWeight;
      case 'moderate': return sum + moderateWeight;
      case 'minor': return sum + minorWeight;
      default: return sum;
    }
  }, 0);

  results.score = Math.max(0, 100 - totalPenalty);

  // Generate report
  console.log('📊 Accessibility Test Results Summary');
  console.log('=====================================');
  console.log(`Total Tests: ${results.totalTests}`);
  console.log(`Passed: ${results.passed}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Warnings: ${results.warnings}`);
  console.log(`Overall Score: ${results.score}/100`);
  console.log(`WCAG Level: ${results.score >= 95 ? 'AAA' : results.score >= 85 ? 'AA' : results.score >= 70 ? 'A' : 'F'}`);
  console.log('');

  if (results.violations.length > 0) {
    console.log('🔧 Top Recommendations:');
    const recommendations = generateRecommendations(results.violations);
    recommendations.forEach(rec => console.log(`   • ${rec}`));
    console.log('');
  }

  // Save detailed report
  const reportPath = path.join(__dirname, 'accessibility-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    results,
    violations: results.violations,
  }, null, 2));

  console.log(`📄 Detailed report saved to: ${reportPath}`);

  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

function generateRecommendations(violations) {
  const recommendations = [];

  if (violations.some(v => v.rule === 'color-contrast')) {
    recommendations.push('Improve color contrast ratios to meet WCAG guidelines');
  }

  if (violations.some(v => v.rule === 'keyboard-navigation')) {
    recommendations.push('Ensure all interactive elements are keyboard accessible');
  }

  if (violations.some(v => v.rule === 'screen-reader-support')) {
    recommendations.push('Add proper ARIA labels and semantic HTML structure');
  }

  if (violations.some(v => v.rule === 'focus-management')) {
    recommendations.push('Implement visible focus indicators for keyboard navigation');
  }

  if (violations.some(v => v.rule === 'image-alt-text')) {
    recommendations.push('Add descriptive alt text to all images');
  }

  if (violations.some(v => v.rule === 'heading-structure')) {
    recommendations.push('Fix heading hierarchy and add missing h1 element');
  }

  if (recommendations.length === 0) {
    recommendations.push('Continue maintaining excellent accessibility standards');
  }

  return recommendations;
}

// Run tests if this script is executed directly
if (require.main === module) {
  runAccessibilityTests().catch(error => {
    console.error('Test runner failed:', error);
    process.exit(1);
  });
}

module.exports = { runAccessibilityTests };