SharedStyles example:

```js
import React from 'react';
import { Csku } from './SharedStyles';
import { H5 } from './Heading';
import { Button } from './Button';


function SomeComponent() {
  const [showCsku, setShowCsku] = React.useState(true);

  return (
    <Csku as={H5}>Csku Wrapper with shared styles</Csku>
    <Csku>
      <Csku px="2px" py="1em" mr={1}>
        <Csku as="p">Hello in `P` Tag</Csku>
      </Csku>

      <Csku row>
        <Csku col sizer={{
          xs: true,
          md: 4,
          lg: 3,
          smOffset: 3,
          xsStyle: `color: red;`,
          mdStyle: `color: green;`,
          lgStyle: `color: blue;`
        }}>
          <Csku as="p" sizer={{lg: `color: black;`}}>Hello in Row - Col - P Tag</Csku>
        </Csku>
      </Csku>

      <Csku>
        <Csku as="p" show={showCsku}>Click button to see magic</Csku>
        <Csku as={Button} onClick={() => setShowCsku(!showCsku)}>
          {showCsku ? 'Hide' : 'Show'} Text
        </Csku>
      </Csku>
    </Csku>
  );
}
```
