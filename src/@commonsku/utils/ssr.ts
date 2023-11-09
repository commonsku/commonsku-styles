class El {
  parentNode = null;
  children = [];
  childNodes = [];
  style = {};

  setAttribute() {}

  getElementsByTagName() {
    return [];
  }

  click() {}

  appendChild(el: Element) {
    return el;
  }

  removeChild(el: Element) {}
}

const createElement = (): HTMLElement => {
  if (typeof HTMLElement !== 'undefined') {
    return new HTMLElement();
  } else {
    const el: any = new El();
    return el as HTMLElement;
  }
}

const doc = typeof document !== 'undefined' ? document : {
  body: createElement(),
  hidden: false,
  addEventListener() {},
  removeEventListener() {},
  activeElement: {
    blur() {},
    nodeName: '',
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {},
    };
  },
  createElement() {
    return createElement();
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: '',
  },
};

const win = typeof window !== 'undefined' ? window : {
  innerWidth: 0,
  innerHeight: 0,
  document: doc,
  navigator: {
    userAgent: '',
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: '',
  },
  history: {
    replaceState() {},
    pushState() {},
    go() {},
    back() {},
    length: 1,
  },
  CustomEvent: function CustomEvent() {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return '';
      },
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  matchMedia() {
    return {
      matches: false, media: '',
      onchange: () => null,
      addListener: () => null,
      removeListener: () => null,
      addEventListener: () => null,
      removeEventListener: () => null,
    };
  },
};

const ssr = {
  window: win,
  document: doc,
};

export default ssr;
