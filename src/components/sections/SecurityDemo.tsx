'use client';

import { Button } from '@/components/ui/Button';
import { Card, SecurityCard } from '@/components/ui/Card';
import {
  SecurityStatus,
  ThreatLevel,
  SecurityBadge,
  SecurityProgress,
  CircuitPattern,
  BinaryRain,
  DataFlow,
  SecurityAlert,
} from '@/components/ui/SecurityElements';

export const SecurityDemo = () => {
  return (
    <section className='py-16 bg-deep-navy-800'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-white text-center mb-12'>
          Security Styling System Demo
        </h2>

        {/* Security Status Indicators */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-12'>
          <SecurityStatus status='online' label='System Status' />
          <SecurityStatus status='secure' label='Security Level' />
          <SecurityStatus status='offline' label='Backup System' />
          <SecurityStatus status='warning' label='Maintenance' />
        </div>

        {/* Threat Level Indicators */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-12'>
          <ThreatLevel
            level='low'
            title='Low Risk'
            description='Normal operations'
          />
          <ThreatLevel
            level='medium'
            title='Medium Risk'
            description='Monitoring required'
          />
          <ThreatLevel
            level='high'
            title='High Risk'
            description='Immediate action needed'
          />
          <ThreatLevel
            level='critical'
            title='Critical Risk'
            description='System compromised'
          />
        </div>

        {/* Security Badges */}
        <div className='flex flex-wrap gap-4 mb-12 justify-center'>
          <SecurityBadge type='encrypted' label='Data Encrypted' />
          <SecurityBadge type='verified' label='Identity Verified' />
          <SecurityBadge type='protected' label='Firewall Active' />
          <SecurityBadge type='certified' label='ISO 27001 Certified' />
        </div>

        {/* Progress Bars */}
        <div className='space-y-6 mb-12'>
          <SecurityProgress
            value={85}
            label='System Security'
            showPercentage={true}
            variant='scan'
          />
          <SecurityProgress
            value={60}
            label='Threat Detection'
            showPercentage={true}
            variant='standard'
          />
          <SecurityProgress
            value={95}
            label='Data Integrity'
            showPercentage={true}
            variant='scan'
          />
        </div>

        {/* Security Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
          <SecurityCard
            title='Network Security'
            description='Advanced firewall protection and intrusion detection'
            threatLevel='low'
            tags={['Firewall', 'IDS', 'VPN']}
          />
          <SecurityCard
            title='Data Protection'
            description='End-to-end encryption and secure data storage'
            threatLevel='medium'
            tags={['Encryption', 'Backup', 'Compliance']}
          />
          <SecurityCard
            title='Threat Intelligence'
            description='Real-time threat monitoring and response'
            threatLevel='high'
            tags={['Monitoring', 'Response', 'Analysis']}
          />
        </div>

        {/* Security Alerts */}
        <div className='space-y-4 mb-12'>
          <SecurityAlert
            type='info'
            title='Security Update'
            message='New security patches have been applied to all systems.'
          />
          <SecurityAlert
            type='success'
            title='Threat Neutralized'
            message='Potential security threat has been successfully blocked.'
          />
          <SecurityAlert
            type='warning'
            title='System Maintenance'
            message='Scheduled maintenance will occur tonight at 2 AM UTC.'
          />
          <SecurityAlert
            type='error'
            title='Security Breach'
            message='Unauthorized access detected. Immediate action required.'
          />
        </div>

        {/* Button Variants */}
        <div className='flex flex-wrap gap-4 justify-center mb-12'>
          <Button variant='primary'>Primary Action</Button>
          <Button variant='secondary'>Secondary Action</Button>
          <Button variant='outline'>Outline Action</Button>
          <Button variant='security'>Security Action</Button>
          <Button variant='neon'>Neon Action</Button>
          <Button variant='ghost'>Ghost Action</Button>
        </div>

        {/* Circuit Pattern Background */}
        <CircuitPattern size='md' intensity='medium' className='p-8 mb-12'>
          <div className='text-center'>
            <h3 className='text-2xl font-bold text-white mb-4'>
              Circuit Pattern Background
            </h3>
            <p className='text-light-gray-300'>
              Demonstrating animated circuit pattern with security glow
            </p>
          </div>
        </CircuitPattern>

        {/* Binary Rain Effect */}
        <BinaryRain density='medium' speed='normal' className='p-8 mb-12'>
          <div className='text-center'>
            <h3 className='text-2xl font-bold text-white mb-4'>
              Binary Rain Effect
            </h3>
            <p className='text-light-gray-300'>
              Subtle binary code falling in the background
            </p>
          </div>
        </BinaryRain>

        {/* Data Flow Animation */}
        <DataFlow direction='right' speed='normal' className='p-8'>
          <div className='text-center'>
            <h3 className='text-2xl font-bold text-white mb-4'>
              Data Flow Animation
            </h3>
            <p className='text-light-gray-300'>
              Simulating data movement with security-themed animation
            </p>
          </div>
        </DataFlow>
      </div>
    </section>
  );
};
