import { createVuetify } from 'vuetify'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const spacingVariables = {
  'space-0': '0',
  'space-1': 'clamp(2px, min(0.5vw, 0.5vh), 6px)',
  'space-2': 'clamp(4px, min(1vw, 1vh), 12px)',
  'space-3': 'clamp(6px, min(1.5vw, 1.5vh), 18px)',
  'space-4': 'clamp(8px, min(2vw, 2vh), 24px)',
  'space-5': 'clamp(10px, min(2.5vw, 2.5vh), 30px)',
  'space-6': 'clamp(12px, min(3vw, 3vh), 36px)',
  'space-7': 'clamp(14px, min(3.5vw, 3.5vh), 42px)',
  'space-8': 'clamp(16px, min(4vw, 4vh), 48px)',
  'space-9': 'clamp(18px, min(4.5vw, 4.5vh), 54px)',
  'space-10': 'clamp(20px, min(5vw, 5vh), 60px)',
  'space-11': 'clamp(22px, min(5.5vw, 5.5vh), 66px)',
  'space-12': 'clamp(24px, min(6vw, 6vh), 72px)',
} as const

const typographyVariables = {
  'font-size-h1': 'clamp(40px, calc(min(8vw, 8vh) + 12px), 88px)',
  'font-size-h2': 'clamp(36px, calc(min(6vw, 6vh) + 10px), 72px)',
  'font-size-h3': 'clamp(32px, calc(min(5vw, 5vh) + 8px), 56px)',
  'font-size-h4': 'clamp(28px, calc(min(4vw, 4vh) + 8px), 44px)',
  'font-size-h5': 'clamp(24px, calc(min(3vw, 3vh) + 8px), 34px)',
  'font-size-h6': 'clamp(20px, calc(min(2.5vw, 2.5vh) + 8px), 28px)',
  'font-size-subtitle-1': 'clamp(16px, calc(min(1.5vw, 1.5vh) + 8px), 22px)',
  'font-size-subtitle-2': 'clamp(14px, calc(min(1.2vw, 1.2vh) + 6px), 18px)',
  'font-size-body-1': 'clamp(16px, calc(min(1.2vw, 1.2vh) + 6px), 20px)',
  'font-size-body-2': 'clamp(14px, calc(min(1vw, 1vh) + 6px), 18px)',
  'font-size-button': 'clamp(14px, calc(min(1vw, 1vh) + 6px), 18px)',
  'font-size-caption': 'clamp(12px, calc(min(0.8vw, 0.8vh) + 5px), 14px)',
  'font-size-overline': 'clamp(12px, calc(min(0.8vw, 0.8vh) + 5px), 14px)',
} as const

const layoutSizeVariables = {
  'size-xs': 'clamp(120px, min(20vw, 20vh), 160px)',
  'size-sm': 'clamp(160px, min(25vw, 25vh), 200px)',
  'size-md': 'clamp(200px, min(30vw, 30vh), 260px)',
  'size-lg': 'clamp(240px, min(35vw, 35vh), 320px)',
  'size-xl': 'clamp(300px, min(45vw, 45vh), 400px)',
  'container-max-width': 'clamp(800px, 90vw, 1400px)',
} as const

const themeVariables = {
  ...spacingVariables,
  ...typographyVariables,
  ...layoutSizeVariables,
} as const

export default createVuetify({
  theme: {
    defaultTheme: 'system',
    themes: {
      light: {
        variables: themeVariables,
      },
      dark: {
        variables: themeVariables,
      },
    },
  },
})
