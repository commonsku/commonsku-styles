# Collapsible

Example:

```js
import { H1 } from './Headings';
import { Box } from './Box';
import { CollapsiblePanel } from './Collapsible';

const [open, setOpen] = React.useState(false);
const [status, setStatus] = React.useState(false);

<>
  <H1 onClick={e => setOpen(!open)}>Click me to open Collapse 1!!!</H1>
  <Collapsible
      isOpen={open}
      onEntering={(node, isAppearing) => setStatus('onEntering')}
      onEntered={(node, isAppearing) => setStatus('onEntered')}
      onExit={(node) => setStatus('onExit')}
      onExiting={(node) => setStatus('onExiting')}
      onExited={(node) => setStatus('onExited')}
  >
      <Box>This is my Collapse 1.</Box>
  </Collapsible>
  <CollapsiblePanel title="Collapse 2" isDefaultOpen={false}>
      <Box>This is my CollapsiblePanel 2.</Box>
  </CollapsiblePanel>
</>
```
