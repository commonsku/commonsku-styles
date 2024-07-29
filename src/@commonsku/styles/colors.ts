
export const primary1 = {
  '10': '#F6FEFF',
  '20': '#E1F7FA',
  '30': '#A6F4FF',
  '40': '#5FE6FA',
  '50': '#28D5EE',
  '60': '#02C0DA',
  '65': '#00B1C8',
  '70': '#00A0B6',
  '75': '#008EA0',
  '80': '#00788A',
  '85': '#006672',
  '90': '#004D59',
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
  '10': '#FFEDF4',
  '20': '#FDC5DB',
  '30': '#FC9DC2',
  '40': '#F55393',
  '50': '#EB1D6E',
  '60': '#DB0057',
  '70': '#C4004E',
  '80': '#A70043',
  '90': '#870036',
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
  '10': '#FFFDF5',
  '20': '#FFF9C5',
  '30': '#FFF597',
  '40': '#FFE544',
  '50': '#FFD302',
  '60': '#E6BA00',
  '70': '#C69B00',
  '80': '#9E7800',
  '90': '#735400',
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
  '10': '#F2FFF9',
  '20': '#C9FDE5',
  '30': '#A1FBD2',
  '40': '#59F3AE',
  '50': '#23E68E',
  '60': '#00D374',
  '70': '#00B966',
  '80': '#009853',
  '90': '#00733F',
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
  '10': '#EDF4F7',
  '20': '#C6E8F7',
  '30': '#A1DAF4',
  '40': '#5BBDEC',
  '50': '#249AD4',
  '60': '#0F6EA6',
  '70': '#0C5A88',
  '80': '#05476E',
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
  '20': '#EDF4F7',
  '30': '#E6EFF2',
  '40': '#DAE9EE',
  '50': '#D0D7DC',
  '60': '#B8C4CB',
  '70': '#899CA9',
  '80': '#597486',
  '90': '#2A4D63',
  '100': '#123952',
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
  '10': '#FFF2F3',
  '20': '#FDCACD',
  '30': '#FBA3A9',
  '40': '#F35C66',
  '50': '#E52633',
  '60': '#D10411',
  '70': '#B4000C',
  '80': '#8F000A',
  '90': '#660007',
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
  black: '#000',
  primary: '#02c0da',
  cta: '#fa237c',
  primary0: '#DAE9EE', // lighter
  primary10: '#C9E8F2', // light
  primary100: '#00889B', // dark
  disabledButton: '#DAE9EE',
  disabledButtonBorder: '#C9E8F2',
  texttitle: '#123952', // a dark blue text
  textlabel: '#123952',
  textbody: '#52585C',
  textplaceholder: '#A4ABAE',
  bggray: '#EDF2F4',
  bgblue: '#ECF4F7',
  inputBorder: '#ABC7D1',
  special1: '#ffd302',        // yellow
  special2: '#00d374',        // green
  special3: '#ff297c',        // red
  primaryBg: '#EAF2F6',
  special2Bg: '#E7FFE9',
  transparent: 'transparent',
  error: errors['main'],

  primary2: '#00A0B6',
  primary20: '#00788A',
  primary200: '#004D59',

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
