/// <reference types="styled-components" />

import { CustomTheme } from '../theme/theme'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {
    defaultBodyBackground: string
  }
}
