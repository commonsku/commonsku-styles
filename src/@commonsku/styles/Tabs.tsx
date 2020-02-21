import styled from 'styled-components'
import React, { useState } from 'react'

const TabBar = styled.ul`
  display: block;
  font-size: 1.125rem;
  font-family: 'skufont-demibold', sans-serif;
  margin: 0;
  padding: 0;
`

const Tab = styled.li<{selected?: boolean}>`
  cursor: pointer;
  display: inline-block;
  border-bottom: ${props => props.selected ? "5px solid #02c0da" : "none"};
  color: #222222;
  opacity: ${props => props.selected ? "1" : ".5"};
  list-style: none;
  margin-bottom: 0 !important;
  position: relative;
  padding: 1rem 12px;
  margin-right: 15px;
`

const TabContent = styled.div`
  padding: 0.9375rem 0;
`


/* 

Here's how you use this:

<Tabs tabs={[
              { name: "abc", label: "ABC", content: <div>abc</div> },
              { name: "xyz", label: "XYZ", content: <div>xyz</div> },
           ]}
/>

*/

const Tabs = ({ tabs }: { tabs: {label: string, content: React.ReactNode}[] }) => {
  /* add state, onclick event */
  const [state, setState] = useState({ 
    selectedTabIndex: 0,
    selectedTab: tabs[0]
  });
  return <div>
    <TabBar>
      {tabs.map((tab, index) => <Tab key={index}
        selected={index == state.selectedTabIndex}
        onClick={() => setState({ ...state, selectedTabIndex: index })}>
        {tab.label}
      </Tab>)}
    </TabBar>
    <TabContent>
      {tabs[state.selectedTabIndex].content}
    </TabContent>
  </div>
}

export {TabBar, Tab, Tabs};
