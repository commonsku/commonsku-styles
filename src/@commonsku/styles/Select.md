Select example:

```js
import { LabeledSelect } from './Select';
import { find } from 'lodash';

const options = [{ value: 'skucon', label: 'Skucon' }, { value: 'skucamp', label: 'Skucamp' }, { value: 'others', label: 'Others' }]

<LabeledSelect 
  label="Labeled Select" name="events" noMargin
  value={find(options, { value: 'skucon' })}
  options={options} 
/>
```
