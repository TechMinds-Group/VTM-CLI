interface Generic {
  [key: string]: {
    data: string[]
    dev: boolean
  }
}

interface IDependenciesConfig {
  [key: string]:
    | {
        data: string[]
        dev: boolean
      }
    | Generic
}

export const dependenciesConfig: IDependenciesConfig = {
  materialui: {
    emotion: {
      data: [
        '@mui/material',
        '@emotion/react',
        '@emotion/styled',
        '@mui/icons-material',
      ],
      dev: false,
    },
    styledcomponents: {
      data: [
        'styled-components@^6.0.0-rc.6',
        '@types/styled-components@^5.1.26',
        '@mui/material',
        '@mui/styled-engine-sc',
        '@mui/icons-material',
      ],
      dev: false,
    },
  },
  sass: {
    data: ['sass', '@types/sass'],
    dev: false,
  },
  styledcomponents: {
    data: ['styled-components@^6.0.0-rc.6', '@types/styled-components@^5.1.26'],
    dev: false,
  },
  chakraui: {
    data: [
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
    ],
    dev: false,
  },
  zustand: {
    data: ['zustand', '@types/zustand'],
    dev: false,
  },
  redux: {
    data: ['@reduxjs/toolkit', 'react-redux'],
    dev: false,
  },
  reactquery: {
    data: ['react-query', '@types/react-query'],
    dev: false,
  },
  axios: {
    data: ['axios', '@types/axios'],
    dev: false,
  },
  storybook: {
    data: [
      'storybook',
      '@storybook/react-vite',
      '@storybook/react',
      '@storybook/addon-essentials',
      '@storybook/addon-interactions',
      '@storybook/addon-links',
      '@storybook/blocks',
    ],
    dev: false,
  },
}
