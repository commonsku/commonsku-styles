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
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
};

const ssr = {
  window: win,
  document: doc,
};

export default ssr;
