import { createGlobalStyle } from 'styled-components'

import eot_bold     from './fonts/TT-Norms-Pro-Bold.eot'
import eot_demibold from './fonts/TT-Norms-Pro-DemiBold.eot'
import eot_medium   from './fonts/TT-Norms-Pro-Medium.eot'
import eot_regular  from './fonts/TT-Norms-Pro-Regular.eot'

import otf_bold     from './fonts/TT-Norms-Pro-Bold.otf'
import otf_demibold from './fonts/TT-Norms-Pro-DemiBold.otf'
import otf_medium   from './fonts/TT-Norms-Pro-Medium.otf'
import otf_regular  from './fonts/TT-Norms-Pro-Regular.otf'

import ttf_bold     from './fonts/TT-Norms-Pro-Bold.ttf'
import ttf_demibold from './fonts/TT-Norms-Pro-DemiBold.ttf'
import ttf_medium   from './fonts/TT-Norms-Pro-Medium.ttf'
import ttf_regular  from './fonts/TT-Norms-Pro-Regular.ttf'

import woff_bold     from './fonts/TT-Norms-Pro-Bold.woff'
import woff_demibold from './fonts/TT-Norms-Pro-DemiBold.woff'
import woff_medium   from './fonts/TT-Norms-Pro-Medium.woff'
import woff_regular  from './fonts/TT-Norms-Pro-Regular.woff'

import woff2_bold     from './fonts/TT-Norms-Pro-Bold.woff2'
import woff2_demibold from './fonts/TT-Norms-Pro-DemiBold.woff2'
import woff2_medium   from './fonts/TT-Norms-Pro-Medium.woff2'
import woff2_regular  from './fonts/TT-Norms-Pro-Regular.woff2'

const Typography = createGlobalStyle`
  @font-face {
    font-family: "skufont-bold";
    src: url(${eot_bold});
    src: url(${otf_bold})   format("opentype"), 
         url(${ttf_bold})   format("TrueType"),
         url(${woff_bold})  format("woff"),
         url(${woff2_bold}) format("woff2");
  }
  @font-face {
    font-family: "skufont-demibold";
    src: url(${eot_demibold});
    src: url(${otf_demibold})   format("opentype"),
         url(${ttf_demibold})   format("TrueType"),
         url(${woff_demibold})  format("woff"),
         url(${woff2_demibold}) format("woff2");
  }
  
  @font-face {
    font-family: "skufont-medium";
    src: url(${eot_medium});
    src: url(${otf_medium})   format("opentype"),
         url(${ttf_medium})   format("TrueType"),
         url(${woff_medium})  format("woff"),
         url(${woff2_medium}) format("woff2");
  }
  
  @font-face {
    font-family: "skufont-regular";
    src: url(${eot_regular});
    src: url(${otf_regular})   format("opentype"),
         url(${ttf_regular})   format("TrueType"),
         url(${woff_regular})  format("woff"),
         url(${woff2_regular}) format("woff2");
  }

  body {
    font-family: "skufont-regular";
  }
`

export {Typography}
