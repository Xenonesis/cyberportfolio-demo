/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Comprehensive Dark Tech-Inspired Security Color Palette
        'deep-navy': {
          50: '#1E293B',
          100: '#1A2231',
          200: '#151B26',
          300: '#11161E',
          400: '#0F1219',
          500: '#0F172A', // Deep Navy Blue - Primary Background
          600: '#0C1221',
          700: '#0A0F1A',
          800: '#080C14',
          900: '#020617',
        },
        'electric-cyan': {
          50: '#E0FFFF',
          100: '#B2FFFF',
          200: '#84FFFF',
          300: '#56FFFF',
          400: '#28FFFF',
          500: '#00FFFF', // Electric Cyan - Primary Accent
          600: '#00E6E6',
          700: '#00CCCC',
          800: '#009999',
          900: '#006666',
        },
        'neon-green': {
          50: '#F0FFF4',
          100: '#C6F6D5',
          200: '#9AE6B4',
          300: '#68D391',
          400: '#48BB78',
          500: '#39FF14', // Neon Green - Secondary Accent
          600: '#32CC0E',
          700: '#2A990B',
          800: '#226608',
          900: '#1A3305',
        },
        'security-gray': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151', // Security Gray - Secondary Backgrounds
          800: '#1F2937',
          900: '#111827',
        },
        'light-gray': {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // Security-Themed Utility Colors
        'threat-level': {
          low: '#39FF14',      // Neon Green
          medium: '#FFD700',    // Gold/Yellow
          high: '#FF6B6B',     // Red
          critical: '#FF0000',  // Bright Red
        },
        'status': {
          online: '#39FF14',    // Neon Green
          offline: '#6B7280',   // Gray
          secure: '#00FFFF',    // Electric Cyan
          warning: '#FFD700',   // Yellow
        }
      },
      fontFamily: {
        'mono': ['"JetBrains Mono"', 'monospace'],
        'sans': ['"Inter"', 'system-ui', 'sans-serif'],
        'heading': ['"Space Grotesk"', 'Arial', 'sans-serif'], // Tech-inspired heading font
      },
      fontSize: {
        // Comprehensive Typography Scale
        'h1': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['2.5rem', { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '600' }],
        'h3': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h4': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h5': ['1.25rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '500' }],
        'h6': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '400' }],
        'code': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '400' }],
      },
      animation: {
        // Enhanced Security-Themed Animations
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'circuit': 'circuit 4s linear infinite',
        'scan': 'scan 1s ease-in-out forwards',
        'data-flow': 'dataFlow 3s ease-in-out infinite',
        'lock-in': 'lockIn 0.5s ease-out forwards',
        'shield-activate': 'shieldActivate 1s ease-out forwards',
        'binary-rain': 'binaryRain 20s linear infinite',
        'security-scan': 'securityScan 2s ease-in-out forwards',
        'neon-pulse': 'neonPulse 1.5s ease-in-out infinite',
        'cyber-grid': 'cyberGrid 8s linear infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))' },
          '50%': { opacity: '0.6', filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.3))' },
        },
        circuit: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        dataFlow: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '20%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        lockIn: {
          '0%': { transform: 'scale(0.8) rotate(180deg)', opacity: '0' },
          '50%': { transform: 'scale(1.1) rotate(90deg)', opacity: '0.7' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        shieldActivate: {
          '0%': { transform: 'scale(0.5)', opacity: '0', filter: 'hue-rotate(0deg)' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8', filter: 'hue-rotate(180deg)' },
          '100%': { transform: 'scale(1)', opacity: '1', filter: 'hue-rotate(360deg)' },
        },
        binaryRain: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(100vh)', opacity: '1' },
        },
        securityScan: {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '50%': { transform: 'scaleX(1)', backgroundColor: 'rgba(57, 255, 20, 0.3)' },
          '100%': { transform: 'scaleX(1)', backgroundColor: 'rgba(57, 255, 20, 0.8)' },
        },
        neonPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(0, 255, 255, 0.6)' },
        },
        cyberGrid: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(10px, 10px)' },
        },
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 255, 255, 0.3)',
        'neon-green': '0 0 20px rgba(57, 255, 20, 0.3)',
        'neon-lg': '0 0 40px rgba(0, 255, 255, 0.2)',
        'neon-green-lg': '0 0 40px rgba(57, 255, 20, 0.2)',
        'security': '0 0 30px rgba(0, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      // Custom Security-Themed Utilities
      utilities: {
        '.security-glow': {
          boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
          transition: 'box-shadow 0.3s ease',
        },
        '.circuit-pattern': {
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(0deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        },
        '.binary-texture': {
          backgroundImage: `
            linear-gradient(90deg,
              transparent 70%,
              rgba(0, 255, 255, 0.05) 70.1%,
              rgba(0, 255, 255, 0.05) 75%,
              transparent 75.1%
            )
          `,
          backgroundSize: '20px 20px',
        },
        '.lock-icon': {
          animation: 'lockIn 0.5s ease-out',
        },
        '.shield-badge': {
          animation: 'shieldActivate 1s ease-out',
        },
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}