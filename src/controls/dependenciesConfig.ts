interface Generic {
  [key: string]: {
    data: {
      [key: string]: string
    }
    dev: boolean
  }
}

interface IDependenciesConfig {
  [key: string]:
    | {
        data: {
          [key: string]: string
        }
        dev: boolean
      }
    | Generic
}

export const dependenciesConfig: IDependenciesConfig = {
  materialui: {
    emotion: {
      data: {
        '@mui/material': 'latest',
        '@emotion/react': 'latest',
        '@emotion/styled': 'latest',
        '@mui/icons-material': 'latest',
      },
      dev: false,
    },
    styledcomponents: {
      data: {
        'styled-components': '^6.0.8',
        '@types/styled-components': '^5.1.26',
        '@mui/material': 'latest',
        '@mui/styled-engine-sc': 'latest',
        '@mui/icons-material': 'latest',
      },
      dev: false,
    },
  },
  sass: {
    data: { sass: '^1.69.0', '@types/sass': '^1.45.0' },
    dev: false,
  },
  styledcomponents: {
    data: {
      'styled-components': '^6.0.8',
      '@types/styled-components': '^5.1.26',
    },
    dev: false,
  },
  chakraui: {
    data: {
      '@chakra-ui/react': '^2.8.1',
      '@emotion/react': '^11.11.1',
      '@emotion/styled': '^11.11.0',
      'framer-motion': '^10.16.4',
    },
    dev: false,
  },
  zustand: {
    data: { zustand: '^4.4.3' },
    dev: false,
  },
  redux: {
    data: { '@reduxjs/toolkit': '^1.9.7', 'react-redux': '^8.1.3' },
    dev: false,
  },
  reactquery: {
    data: { 'react-query': '^3.39.3', '@types/react-query': '^1.2.9' },
    dev: false,
  },
  axios: {
    data: { axios: '^1.5.1', '@types/axios': '^0.14.0' },
    dev: false,
  },
  storybook: {
    data: {
      storybook: '',
      '@storybook/react-vite': 'latest',
      '@storybook/react': 'latest',
      '@storybook/addon-essentials': 'latest',
      '@storybook/addon-interactions': 'latest',
      '@storybook/addon-links': 'latest',
      '@storybook/blocks': 'latest',
    },
    dev: false,
  },
}
