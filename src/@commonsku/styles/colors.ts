
export const primary1 = {
  '10': '#CEEFF4',
  '20': '#A5E5EF',
  '30': '#78DFEE',
  '40': '#49DAF0',
  '50': '#16D9F6',
  '60': '#00C1DE',
  '65': '#00C1DE',
  '70': '#0A8294',
  '75': '#0A8294',
  '80': '#0D607F',
  '85': '#0D607F',
  '90': '#12474F',
  'main': '',
  'main-hover': '',
  'mainHover': '',
  'light': '',
  'lightest': '',
  'dark': '',
  'dark-hover': '',
  'darkHover': '',
  'darkest': '',

};
primary1['main'] = primary1['70'];
primary1['main-hover'] = primary1['75'];
primary1['lightest'] = primary1['10'];
primary1['light'] = primary1['30'];
primary1['dark'] = primary1['80'];
primary1['dark-hover'] = primary1['85'];
primary1['darkest'] = primary1['90'];

primary1.mainHover = primary1['main-hover'];
primary1.darkHover = primary1['dark-hover'];


export const teal = primary1;

export const primary2 = {
  main: '#FFFFFF',
  border: {
    main: '#0C5A88',
  },
};

export const white = primary2;

export const secondary1 = {
  '10': '#FEF2F7',
  '20': '#FCE5EF',
  '30': '#FACCE0',
  '40': '#F5A2C6',
  '50': '#EF609E',
  '60': '#C01E64',
  '70': '#951F52',
  '80': '#6D1E40',
  '90': '#49192E',
  'main': '',
  'lightest': '',
  'light': '',
  'dark': '',
  'darkest': '',
};
secondary1['main'] = secondary1['60'];
secondary1['lightest'] = secondary1['10'];
secondary1['light'] = secondary1['30'];
secondary1['dark'] = secondary1['80'];
secondary1['darkest'] = secondary1['90'];

export const pink = secondary1;

export const secondary2 = {
  '10': '#FEF9C3',
  '20': '#FEF08A',
  '30': '#FDE047',
  '40': '#FACC15',
  '50': '#EAB308',
  '60': '#CA8A04',
  '70': '#845209',
  '80': '#713F12',
  '90': '#422006',
  'main': '',
  'lightest': '',
  'light': '',
  'dark': '',
  'darkest': '',
};
secondary2['main'] = secondary2['50'];
secondary2['lightest'] = secondary2['10'];
secondary2['light'] = secondary2['30'];
secondary2['dark'] = secondary2['70'];
secondary2['darkest'] = secondary2['90'];

export const yellow = secondary2;

export const secondary3 = {
  '10': '#DCFCE7',
  '20': '#BBF7D0',
  '30': '#86EFAC',
  '40': '#4ADE80',
  '50': '#22C55E',
  '60': '#16A34A',
  '70': '#116932',
  '80': '#124A28',
  '90': '#042713',
  'main': '',
  'lightest': '',
  'light': '',
  'dark': '',
  'darkest': '',
};
secondary3['main'] = secondary3['60'];
secondary3['lightest'] = secondary3['10'];
secondary3['light'] = secondary3['30'];
secondary3['dark'] = secondary3['80'];
secondary3['darkest'] = secondary3['90'];

export const green = secondary3;

export const secondary4 = {
  '10': '#F0F5FA',
  '20': '#E2ECF5',
  '30': '#C8DCEC',
  '40': '#9BBFDC',
  '50': '#5F98C7',
  '60': '#1E6EB0',
  '70': '#0961A9',
  '80': '#043053',
  '90': '#003C5E',
  'main': '',
  'lightest': '',
  'light': '',
  'dark': '',
  'darkest': '',
};
secondary4['main'] = secondary4['70'];
secondary4['lightest'] = secondary4['10'];
secondary4['light'] = secondary4['30'];
secondary4['dark'] = secondary4['80'];
secondary4['darkest'] = secondary4['90'];

export const navy = secondary4;

export const neutrals = {
  '10': '#FFFFFF',
  '20': '#FAFAFA',
  '30': '#F4F4F5',
  '40': '#E4E4E7',
  '50': '#D4D4D8',
  '60': '#A1A1AA',
  '70': '#71717A',
  '80': '#27272A',
  '90': '#18181B',
  '100': '#111111',
  'main': '',
  'darkest': '',
  'dark': '',
  'bodyText': '',
  'bg1': '',
  'white': '',
};
neutrals['main'] = neutrals['100'];
neutrals['white'] = neutrals['10'];
neutrals['bg1'] = neutrals['20'];
neutrals['bodyText'] = neutrals['90'];
neutrals['dark'] = neutrals['90'];
neutrals['darkest'] = neutrals['100'];

export const errors = {
  '10': '#FEE2E2',
  '20': '#FECACA',
  '30': '#FCA5A5',
  '40': '#F87171',
  '50': '#EF4444',
  '60': '#DC2626',
  '70': '#991919',
  '80': '#511111',
  '90': '#300C0C',
  'main': '',
  'lightest': '',
  'light': '',
  'dark': '',
  'darkest': '',
};
errors['main'] = errors['50'];
errors['lightest'] = errors['10'];
errors['light'] = errors['30'];
errors['dark'] = errors['70'];
errors['darkest'] = errors['90'];

const colors = {
  primary1,
  secondary1,
  secondary2,
  secondary3,
  secondary4,

  teal: teal,
  pink: pink,
  yellow: yellow,
  green: green,
  navy: navy,

  neutrals,
  errors,
  orders: {
    'OPPORTUNITY': {
      main: primary1['80'],
    },
    'PRESENTATION': {
      main: primary1['70'],
    },
    'ESTIMATE': {
      main: primary1['50'],
    },
    'PRE-SALES': {
      main: primary1['60'],
    },
    'SALES ORDER': {
      main: secondary2['50'],
      current: secondary2['50'],
      previous: neutrals['60']
    },
    'INVOICE': {
      main: secondary3['60'],
    },
    'TARGET': {
      main: secondary1['60'],
    },
  },
  notes: {
    main: secondary1['50'],
  },
  calls: {
    main: secondary4['40'],
  },
  meetings: {
    main: secondary4['80'],
  },
  left_nav: {
    main: primary1['70'],
    sub_menu: {
      bg: primary1['80'],
      link: {
        bg: primary1['90'],
        text: primary2.main,
      },
    },
    link: {
      text: primary2.main,
    },
  },
  text: {
    main: neutrals['90'],
    bold: neutrals['100'],
    body: neutrals['90'],
    title: neutrals['100'],
    label: neutrals['100'],
    placeholder: {
      default: neutrals['60'],
      hover: neutrals['70']
    }
  },
  white: '#fff',
  black: '#18181B',
  primary: '#0A8294',
  cta: '#C01E64',
  primary0: '#F3FAFC', // lighter
  primary10: '#CEEFF4', // light
  primary100: '#0A8294', // dark
  disabledButton: '#DAE9EE',
  disabledButtonBorder: '#C9E8F2',
  texttitle: '#18181B', // once dark blue now black
  textlabel: '#18181B',
  textbody: '#52525B',
  textplaceholder: '#A1A1AA',
  bggray: '#F4F4F5',
  bgblue: '#F3FAFC',
  inputBorder: '#ABC7D1',
  special1: '#ffd302',        // yellow
  special2: '#00d374',        // green
  special3: '#ff297c',        // red
  primaryBg: '#EAF2F6',
  special2Bg: '#E7FFE9',
  transparent: 'transparent',
  error: errors['main'],

  primary2: '#0A8294',
  primary20: '#0D607F',
  primary200: '#12474F',

  tableHeaderBg: '#F6FEFF',
  tableBorder: '#edf2f5',
  input: {
    background: '#fff',
    border: neutrals['60'],
    text: neutrals['90'],
    placeholder: neutrals['60'],
    active: {
      border: primary1['60'],
      text: neutrals['90'],
    },
    hover: {
      border: primary1['50'],
      placeholder: neutrals['70'],
    },
    error: {
      border: errors['main'],
    },
    disabled: {
      text: neutrals['70'],
      background: neutrals['40'],
    },
    iconWrapper: {
      background: neutrals['50'],
      active: {
        background: neutrals['20'],
      },
      hover: {
        background: primary1['20'],
      },
      disabled: {
        background: neutrals['50'],
      },
    },
    icon: {
      fill: '#fff',
      active: {
        fill: primary1['60'],
      },
      hover: {
        fill: primary1['50'],
      },
      disabled: {
        fill: '#fff',
      },
    },
  },
  select: {
    background: '#fff',
    border: neutrals['60'],
    text: neutrals['90'],
    placeholder: neutrals['60'],
    active: {
      border: primary1['60'],
      text: neutrals['90'],
    },
    hover: {
      border: primary1['50'],
      placeholder: neutrals['70'],
    },
    error: {
      border: errors['main'],
    },
    disabled: {
      background: neutrals['40'],
      border: neutrals['40'],
    },
    dropdownIcon: {
      color: primary1['60'],
      error: {
        color: errors['main'],
      },
      disabled: neutrals['60'],
    },
    clearIcon: {
      color: errors['60'],
    },
  },
};

export default colors;
