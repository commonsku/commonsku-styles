import { useState } from "react";
import { Toggle, ToggleLink } from "@commonsku/styles";
import * as demo from './DemoStyles'
import { DemoCodeBlock } from './DemoCodeblock'


export function ToggleDemo() {
  const [selected, setSelected] = useState(true)
    
  return <div style={{display: 'flex', flexDirection: 'column', marginBottom: '24px'}}>
    
    <demo.SmallLabel>Small Active Toggle</demo.SmallLabel>
      <Toggle size="small" mr={24} mb={24} onClick={() => setSelected(!selected)}>
        <ToggleLink selected={selected}>Active</ToggleLink>
        <ToggleLink selected={!selected}>Inactiveeeeeeeee</ToggleLink>
      </Toggle>
      {DemoCodeBlock({code:
`<Toggle size="small" onClick={() => setSelected(!selected)}>
    <ToggleLink selected={!selected} >Active</ToggleLink>
    <ToggleLink selected={selected}>Inactiveeeeeeeee</ToggleLink>
</Toggle>`})}
  
    <demo.SmallLabel>Medium Toggle</demo.SmallLabel>
      <Toggle size="medium" mr={24} mb={24}>
        <ToggleLink>Active</ToggleLink>
        <ToggleLink selected>Inactive</ToggleLink>
      </Toggle>
      {DemoCodeBlock({code:
`<Toggle size="medium">
    <ToggleLink>Active</ToggleLink>
    <ToggleLink selected>Inactive</ToggleLink>
</Toggle>`})}

    <demo.SmallLabel>Large Toggle</demo.SmallLabel>
      <Toggle size="large" mr={24} mb={24}>
        <ToggleLink selected >Active</ToggleLink>
        <ToggleLink >Inactive</ToggleLink>
      </Toggle>
      {DemoCodeBlock({code:
`<Toggle size="large">
    <ToggleLink selected>Active</ToggleLink>
    <ToggleLink>Inactive</ToggleLink>
</Toggle>`})}
</div>
}

export function ToggleWithStetchDemo(){
  const [selected, setSelected] = useState(true)

  return <div style={{display: 'flex', flexDirection: 'column', marginBottom: '24px'}}>

    <demo.SmallLabel>Small Active Toggle with stretch prop</demo.SmallLabel>
      <Toggle size="small" stretch mr={24} mb={24} onClick={() => setSelected(!selected)}>
        <ToggleLink selected={selected} stretch >Active</ToggleLink>
        <ToggleLink selected={!selected} stretch >Inactive</ToggleLink>
      </Toggle>
      {DemoCodeBlock({code: 
`<Toggle size="small" stretch onClick={() => setSelected(!selected)}>
    <ToggleLink selected={!selected} stretch >Active</ToggleLink>
    <ToggleLink selected={selected} stretch >Inactive</ToggleLink>
</Toggle>`})}

    <demo.SmallLabel>Medium Toggle with stretch prop</demo.SmallLabel>
      <Toggle size="medium" stretch mr={24} mb={24}>
        <ToggleLink stretch>Active</ToggleLink>
        <ToggleLink selected stretch>Inactive</ToggleLink>
      </Toggle>
      {DemoCodeBlock({code: 
`<Toggle size="medium" stretch>
  <ToggleLink selected stretch>Active</ToggleLink>
  <ToggleLink stretch>Inactive</ToggleLink>
</Toggle>`})}

    <demo.SmallLabel>Large Toggle with stretch prop</demo.SmallLabel>
      <Toggle size="large" stretch mr={24} mb={24}>
        <ToggleLink selected stretch >Active</ToggleLink>
        <ToggleLink stretch >Inactive</ToggleLink>
      </Toggle>
      {DemoCodeBlock({code:
`<Toggle size="large" stretch>
  <ToggleLink selected stretch>Active</ToggleLink>
  <ToggleLink stretch>Inactive</ToggleLink>
</Toggle>`})}
</div>
}