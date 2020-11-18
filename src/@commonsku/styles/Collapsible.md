# Collapsible

Example:

```js
const [open, setOpen] = React.useState(false);
const [status, setStatus] = React.useState(false);

<H1 onCLick={e => setOpen(!open)}>Click me to open Collpase 1!!!</H1>
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
```
