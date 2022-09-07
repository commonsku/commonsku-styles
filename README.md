<p align="center">
  <a href="https://commonsku.com/" rel="noopener" target="_blank"><img width="150" src="https://www.commonsku.com/img/commonsku-logo.svg" alt="commonsku logo"></a></p>
</p>

<h1 align="center">@commonsku/styles</h1>
React components for faster and easier web development by commonsku.

**https://www.commonsku.com/**
```sh
// with npm
npm install @commonsku/styles
```

## Styleguide
```sh
// with npm
npm run styleguide
```

You can also check out the src/App.tsx to see how to import in your projects

## Testing
### Local development
```npm start```

### Testing locally with main repo

You can add this into the `~/.bashrc` or `~/.profile`

Below code adds commnand `cskustyled` to build and install commonsku styles into your local project

```bash
CSKU_DEV_DIR="$HOME/projects/PROJ_NAME"
CSKU_STYLES_DIR="$HOME/projects/commonsku-styles"
function fn_cskustyled() {
  CSKUS_PKG_VERSION=$(cat $CSKU_STYLES_DIR/package.json 2>&1 | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
  touch $CSKU_STYLES_DIR/dist && rm -r $CSKU_STYLES_DIR/dist \
    && touch $CSKU_STYLES_DIR/commonsku-styles-$CSKUS_PKG_VERSION.tgz && rm $CSKU_STYLES_DIR/commonsku-styles-$CSKUS_PKG_VERSION.tgz \
    && touch $CSKU_DEV_DIR/commonsku-styles-$CSKUS_PKG_VERSION.tgz && rm $CSKU_DEV_DIR/commonsku-styles-$CSKUS_PKG_VERSION.tgz \
    && cd $CSKU_STYLES_DIR \
        && npm run prepack \
        && npm pack \
    && cd $CSKU_DEV_DIR \
        && pm2 kill \
        && npm install $CSKU_STYLES_DIR/commonsku-styles-$CSKUS_PKG_VERSION.tgz \
        && npm run start
}

alias cskustyled="fn_cskustyled"
```

### From local
```json
// add absolute path to package.json
"dependencies": {
  "@commonsku/styles": "/abosolute/path/commonsku-styles",
}
```
### From github
```json
// add absolute path to package.json
"dependencies": {
  "@commonsku/styles": "commonsku/commonsku-styles#branch-name",
}
```
### From npm 
```json
// add absolute path to package.json
"dependencies": {
  "@commonsku/styles": "^1.0.0",
}
```
