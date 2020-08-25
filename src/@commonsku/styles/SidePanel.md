SidePanel example:

```js
import React, { useState, useReducer } from 'react';
import { SidePanel, Button } from './SidePanel';
const [showPanel, setShowPanel] = useState(false);

<SidePanel
    title="SidePanel Title"
    controls={<Button onClick={() => setShowPanel(false)}>Close Panel</Button>}
    visible={showPanel} // show the panel
    animationDuration={300} // duration of the animation of the slide
    from="right" // specify the location to slide from
    height={100} // height of the panel. Most likely used when `from` given with "top" or "bottom" value
    backdrop // add backdrop outside the panel
>
    <h1>Body of the panel</h1>
</SidePanel>
```
