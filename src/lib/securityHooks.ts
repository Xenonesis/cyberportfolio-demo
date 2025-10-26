'use client';

import { useMemo, useState } from 'react';

// Custom hook to generate stable random values for animations
export const useStableRandom = (count: number, seed: string = 'security') => {
  const randomValues = useMemo(() => {
    // Generate deterministic random values based on seed and count
    const values: number[] = [];
    let seedValue = seed.length;

    for (let i = 0; i < count; i++) {
      // Simple deterministic random number generator
      seedValue = (seedValue * 1664525 + 1013904223) % 2147483647;
      values.push(seedValue / 2147483647);
    }

    return values;
  }, [count, seed]);

  return randomValues;
};

// Hook for security animation timing
export const useSecurityTiming = (baseDuration: number = 2000) => {
  const timing = useMemo(() => {
    // Generate deterministic "random" delay using baseDuration as seed
    const seed = baseDuration * 1664525 + 1013904223;
    const pseudoRandom = (seed % 2147483647) / 2147483647;

    return {
      duration: baseDuration,
      delay: pseudoRandom * baseDuration * 0.1,
      stagger: baseDuration * 0.1,
    };
  }, [baseDuration]);

  return timing;
};

// Hook for security status management
export const useSecurityStatus = (initialStatus: string = 'secure') => {
  const [status, setStatus] = useState(initialStatus);
  const [level, setLevel] = useState<'low' | 'medium' | 'high' | 'critical'>(
    'low'
  );

  const updateStatus = (newStatus: string, threatLevel?: typeof level) => {
    setStatus(newStatus);
    if (threatLevel) {
      setLevel(threatLevel);
    }
  };

  return {
    status,
    level,
    updateStatus,
    isSecure: status === 'secure' || status === 'protected',
    isWarning: level === 'medium' || level === 'high',
    isCritical: level === 'critical',
  };
};

// Hook for security scan progress
export const useSecurityScan = (duration: number = 5000) => {
  const [progress, setProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 1;
      });
    }, duration / 100);
  };

  const resetScan = () => {
    setProgress(0);
    setIsScanning(false);
  };

  return {
    progress,
    isScanning,
    startScan,
    resetScan,
  };
};

// Hook for encryption status
export const useEncryptionStatus = () => {
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [encryptionLevel, setEncryptionLevel] = useState<
    'basic' | 'standard' | 'advanced' | 'quantum'
  >('standard');

  const toggleEncryption = () => {
    setIsEncrypted(!isEncrypted);
  };

  const setLevel = (level: typeof encryptionLevel) => {
    setEncryptionLevel(level);
  };

  return {
    isEncrypted,
    encryptionLevel,
    toggleEncryption,
    setLevel,
    getEncryptionIcon: () => (isEncrypted ? '🔒' : '🔓'),
    getEncryptionColor: () => {
      switch (encryptionLevel) {
        case 'quantum':
          return 'text-electric-cyan-500';
        case 'advanced':
          return 'text-neon-green-500';
        case 'standard':
          return 'text-cyan-400';
        default:
          return 'text-gray-500';
      }
    },
  };
};

// Hook for threat detection simulation
export const useThreatDetection = () => {
  const [threats, setThreats] = useState<string[]>([]);
  const [lastScan, setLastScan] = useState<Date>(new Date());

  const scanForThreats = () => {
    const threatTypes = [
      'Suspicious network activity detected',
      'Potential malware signature found',
      'Unusual login attempt blocked',
      'Data exfiltration attempt prevented',
      'Phishing email filtered',
    ];

    const newThreats: string[] = [];
    const threatCount = Math.floor(Math.random() * 3);

    for (let i = 0; i < threatCount; i++) {
      newThreats.push(
        threatTypes[Math.floor(Math.random() * threatTypes.length)]
      );
    }

    setThreats(newThreats);
    setLastScan(new Date());

    // Clear threats after 30 seconds
    setTimeout(() => {
      setThreats([]);
    }, 30000);
  };

  return {
    threats,
    lastScan,
    scanForThreats,
    threatCount: threats.length,
    hasActiveThreats: threats.length > 0,
  };
};

// Hook for security compliance status
export const useComplianceStatus = () => {
  const [compliance, setCompliance] = useState({
    gdpr: true,
    iso27001: true,
    soc2: true,
    pciDss: false,
    hipaa: false,
  });

  const checkCompliance = (standard: keyof typeof compliance) => {
    return compliance[standard] === true;
  };

  const updateCompliance = (
    standard: keyof typeof compliance,
    status: boolean
  ) => {
    setCompliance(prev => ({
      ...prev,
      [standard]: status,
    }));
  };

  const getComplianceScore = () => {
    const total = Object.keys(compliance).length;
    const compliant = Object.values(compliance).filter(Boolean).length;
    return Math.round((compliant / total) * 100);
  };

  return {
    compliance,
    checkCompliance,
    updateCompliance,
    getComplianceScore,
  };
};

export default {
  useStableRandom,
  useSecurityTiming,
  useSecurityStatus,
  useSecurityScan,
  useEncryptionStatus,
  useThreatDetection,
  useComplianceStatus,
};
