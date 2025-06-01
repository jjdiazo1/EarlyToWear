import type { Config } from "tailwindcss"

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // MANTENER TU SISTEMA EXISTENTE
      backgroundColor: {
        primary: "rgba(var(--bg-primary))",
        secondary: "rgba(var(--bg-secondary))",
        tertiary: "rgba(var(--bg-tertiary))",
        disabled: "rgba(var(--bg-disabled))",
        component: {
          DEFAULT: "rgba(var(--bg-component-primary))",
          hover: "rgba(var(--bg-component-primary-hover))",
          secondary: {
            DEFAULT: "rgba(var(--bg-component-secondary))",
            hover: "rgba(var(--bg-component-secondary-hover))",
          },
        },
        action: {
          DEFAULT: "rgba(var(--bg-action-primary))",
          hover: "rgba(var(--bg-action-primary-hover))",
          pressed: "rgba(var(--bg-action-primary-pressed))",
          secondary: {
            DEFAULT: "var(--bg-action-secondary)",
            hover: "var(--bg-action-secondary-hover)",
            pressed: "var(--bg-action-secondary-pressed)",
          },
          tertiary: {
            DEFAULT: "var(--bg-action-tertiary)",
            hover: "var(--bg-action-tertiary-hover)",
            pressed: "var(--bg-action-tertiary-pressed)",
          },
        },
        positive: {
          DEFAULT: "rgba(var(--bg-positive-primary))",
          hover: "rgba(var(--bg-positive-primary-hover))",
          pressed: "rgba(var(--bg-positive-primary-pressed))",
          secondary: {
            DEFAULT: "rgba(var(--bg-positive-secondary))",
            hover: "rgba(var(--bg-positive-secondary-hover))",
            pressed: "rgba(var(--bg-positive-secondary-pressed))",
          },
        },
        negative: {
          DEFAULT: "rgba(var(--bg-negative-primary))",
          hover: "rgba(var(--bg-negative-primary-hover))",
          pressed: "rgba(var(--bg-negative-primary-pressed))",
          secondary: {
            DEFAULT: "rgba(var(--bg-negative-secondary))",
            hover: "rgba(var(--bg-negative-secondary-hover))",
            pressed: "rgba(var(--bg-negative-secondary-pressed))",
          },
        },
        warning: {
          DEFAULT: "rgba(var(--bg-warning-primary))",
          hover: "rgba(var(--bg-warning-primary-hover))",
          pressed: "rgba(var(--bg-warning-primary-pressed))",
          secondary: {
            DEFAULT: "rgba(var(--bg-warning-secondary))",
            hover: "rgba(var(--bg-warning-secondary-hover))",
            pressed: "rgba(var(--bg-warning-secondary-pressed))",
          },
        },
        
        // NUEVOS COLORES PARA EFECTOS MODERNOS
        glass: {
          light: "var(--bg-glass-light)",
          medium: "var(--bg-glass-medium)",
          dark: "var(--bg-glass-dark)",
        },
        
        // Colores para gradientes modernos
        indigo: {
          50: "rgba(var(--indigo-50), 1)",
          100: "rgba(var(--indigo-100), 1)",
          200: "rgba(var(--indigo-200), 1)",
          300: "rgba(var(--indigo-300), 1)",
          400: "rgba(var(--indigo-400), 1)",
          500: "rgba(var(--indigo-500), 1)",
          600: "rgba(var(--indigo-600), 1)",
          700: "rgba(var(--indigo-700), 1)",
          800: "rgba(var(--indigo-800), 1)",
          900: "rgba(var(--indigo-900), 1)",
        },
        
        purple: {
          50: "rgba(var(--purple-50), 1)",
          100: "rgba(var(--purple-100), 1)",
          200: "rgba(var(--purple-200), 1)",
          300: "rgba(var(--purple-300), 1)",
          400: "rgba(var(--purple-400), 1)",
          500: "rgba(var(--purple-500), 1)",
          600: "rgba(var(--purple-600), 1)",
          700: "rgba(var(--purple-700), 1)",
          800: "rgba(var(--purple-800), 1)",
          900: "rgba(var(--purple-900), 1)",
        },
        
        pink: {
          50: "rgba(var(--pink-50), 1)",
          100: "rgba(var(--pink-100), 1)",
          200: "rgba(var(--pink-200), 1)",
          300: "rgba(var(--pink-300), 1)",
          400: "rgba(var(--pink-400), 1)",
          500: "rgba(var(--pink-500), 1)",
          600: "rgba(var(--pink-600), 1)",
          700: "rgba(var(--pink-700), 1)",
          800: "rgba(var(--pink-800), 1)",
          900: "rgba(var(--pink-900), 1)",
        },
      },
      
      colors: {
        // MANTENER TU SISTEMA EXISTENTE
        primary: "rgba(var(--content-primary))",
        secondary: "rgba(var(--content-secondary))",
        tertiary: "rgba(var(--content-tertiary))",
        disabled: "rgba(var(--content-disabled))",
        action: {
          DEFAULT: "rgba(var(--content-action-primary))",
          hover: "rgba(var(--content-action-primary-hover))",
          pressed: "rgba(var(--content-action-primary-pressed))",
          on: {
            primary: "rgba(var(--content-action-on-primary))",
            secondary: "rgba(var(--content-action-on-secondary))",
            tertiary: "rgba(var(--content-action-on-tertiary))",
          },
        },
        positive: {
          DEFAULT: "rgba(var(--content-positive-primary))",
          on: {
            primary: "rgba(var(--content-positive-on-primary))",
            secondary: "rgba(var(--content-positive-on-secondary))",
          },
        },
        negative: {
          DEFAULT: "rgba(var(--content-negative-primary))",
          on: {
            primary: "rgba(var(--content-negative-on-primary))",
            secondary: "rgba(var(--content-negative-on-secondary))",
          },
        },
        warning: {
          DEFAULT: "rgba(var(--content-warning-primary))",
          on: {
            primary: "rgba(var(--content-warning-on-primary))",
            secondary: "rgba(var(--content-warning-on-secondary))",
          },
        },
        
        // NUEVOS COLORES DISPONIBLES EN TAILWIND
        indigo: {
          50: "rgba(var(--indigo-50), 1)",
          100: "rgba(var(--indigo-100), 1)",
          200: "rgba(var(--indigo-200), 1)",
          300: "rgba(var(--indigo-300), 1)",
          400: "rgba(var(--indigo-400), 1)",
          500: "rgba(var(--indigo-500), 1)",
          600: "rgba(var(--indigo-600), 1)",
          700: "rgba(var(--indigo-700), 1)",
          800: "rgba(var(--indigo-800), 1)",
          900: "rgba(var(--indigo-900), 1)",
        },
        
        purple: {
          50: "rgba(var(--purple-50), 1)",
          100: "rgba(var(--purple-100), 1)",
          200: "rgba(var(--purple-200), 1)",
          300: "rgba(var(--purple-300), 1)",
          400: "rgba(var(--purple-400), 1)",
          500: "rgba(var(--purple-500), 1)",
          600: "rgba(var(--purple-600), 1)",
          700: "rgba(var(--purple-700), 1)",
          800: "rgba(var(--purple-800), 1)",
          900: "rgba(var(--purple-900), 1)",
        },
        
        pink: {
          50: "rgba(var(--pink-50), 1)",
          100: "rgba(var(--pink-100), 1)",
          200: "rgba(var(--pink-200), 1)",
          300: "rgba(var(--pink-300), 1)",
          400: "rgba(var(--pink-400), 1)",
          500: "rgba(var(--pink-500), 1)",
          600: "rgba(var(--pink-600), 1)",
          700: "rgba(var(--pink-700), 1)",
          800: "rgba(var(--pink-800), 1)",
          900: "rgba(var(--pink-900), 1)",
        },
      },
      
      borderColor: {
        // MANTENER TU SISTEMA EXISTENTE
        DEFAULT: "rgba(var(--border-primary))",
        secondary: "rgba(var(--border-secondary))",
        action: "rgba(var(--border-action))",
        negative: {
          DEFAULT: "rgba(var(--border-negative-primary))",
          secondary: "rgba(var(--border-negative-secondary))",
        },
        positive: {
          DEFAULT: "rgba(var(--border-positive-primary))",
          secondary: "rgba(var(--border-positive-secondary))",
        },
        warning: {
          DEFAULT: "rgba(var(--border-warning-primary))",
          secondary: "rgba(var(--border-warning-secondary))",
        },
        disabled: "rgba(var(--border-disabled))",
        
        // NUEVOS BORDES PARA GLASSMORPHISM
        glass: "var(--border-glass)",
        modern: "var(--border-modern)",
      },
      
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "20px",
        xl: "24px",  
        "2xl": "32px",
        full: "1000px",
      },
      
      fill: {
        primary: "rgba(var(--content-action-on-primary))",
        secondary: "rgba(var(--content-action-on-secondary))",
        disabled: "rgba(var(--content-disabled))",
      },
      
      // Z-INDEX JERARQUÍA CLARA PARA EVITAR CONFLICTOS
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        'hero': '40',          // Hero components
        'content': '50',       // General content
        'header': '900',       // Site header/navigation
        'sidebar': '950',      // Sidebars
        'cart': '9999',        // Cart sidebar
        'dropdown': '999999',  // Cart dropdown - MÁXIMO
        'modal': '100000',     // Modals
        'tooltip': '100001',   // Tooltips
      },
      
      // Nuevas utilidades para efectos modernos
      boxShadow: {
        'glass': 'var(--shadow-glass)',
        'glass-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'colored': 'var(--shadow-colored)',
        'colored-lg': 'var(--shadow-colored-lg)',
      },
      
      backdropBlur: {
        xs: '2px',
      },
      
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shine': 'shine 2s ease-in-out infinite',
      },
      
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 20px rgba(79, 70, 229, 0.1)',
          },
          '100%': {
            boxShadow: '0 0 30px rgba(79, 70, 229, 0.2), 0 0 40px rgba(79, 70, 229, 0.1)',
          },
        },
        shine: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
      
      // Gradientes usando tus colores personalizados
      backgroundImage: {
        'gradient-brand': 'var(--bg-gradient-brand)',
        'gradient-surface': 'var(--bg-gradient-surface)',
        'gradient-overlay': 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.6) 100%)',
        
        // Gradientes adicionales con los nuevos colores
        'gradient-indigo': 'linear-gradient(135deg, rgba(var(--indigo-500), 1) 0%, rgba(var(--indigo-700), 1) 100%)',
        'gradient-purple': 'linear-gradient(135deg, rgba(var(--purple-500), 1) 0%, rgba(var(--purple-700), 1) 100%)',
        'gradient-modern': 'linear-gradient(135deg, rgba(var(--indigo-600), 1) 0%, rgba(var(--purple-600), 1) 50%, rgba(var(--pink-600), 1) 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config