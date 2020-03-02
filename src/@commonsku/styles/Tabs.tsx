import styled from 'styled-components'
import React, { useState, Component } from 'react'

const TabBar = styled.ul<{padded?: boolean}>`
  display: block;
  font-size: 1.125rem;
  font-family: 'skufont-demibold', sans-serif;
  margin: 0;
  margin-bottom: ${props => props.padded ? "20px" : 0};
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

const TabContent = styled.div``


/* 

Here's how you use this:

<Tabs tabs={[
              { name: "abc", label: "ABC", content: <div>abc</div> },
              { name: "xyz", label: "XYZ", content: <div>xyz</div> },
           ]}
/>

*/

// const Tabs = ({ tabs }: { tabs: {label: string, content: React.ReactNode}[], }) => {
//   /* add state, onclick event */
//   const [state, setState] = useState({ 
//     selectedTabIndex: 0,
//     selectedTab: tabs[0]
//   });
//   return <div>
//     <TabBar>
//       {tabs.map((tab, index) => <Tab key={index}
//         selected={index == state.selectedTabIndex}
//         onClick={() => setState({ ...state, selectedTabIndex: index })}>
//         {tab.label}
//       </Tab>)}
//     </TabBar>
//     {tabs[state.selectedTabIndex].content}
//   </div>
// }

type TabType = {label: string, content: React.ReactNode, onClick?: Function|VoidFunction};
type StateType = {selectedTabIndex: number, selectedTab: TabType};
type TabsProps = {tabs: TabType[], selectedTabIndex?: number, padded?: boolean};
class Tabs extends Component<TabsProps, StateType> {
  constructor(props: TabsProps) {
    super(props);
    this.state = {
      selectedTabIndex: this.props.selectedTabIndex || 0,
      selectedTab: this.props.tabs[this.props.selectedTabIndex || 0]
    };
  }

  componentDidMount() {
    let callback = this.props.tabs[this.state.selectedTabIndex].onClick;
    if(callback) { callback(); }
  }

  render () {
    const { tabs } = this.props;
    return <div>
      <TabBar padded={this.props.padded == true}>
        {tabs.map((tab, index) => <Tab key={index}
          selected={index == this.state.selectedTabIndex}
          onClick={() => {
            this.setState({ selectedTabIndex: index })
            let callback = tabs[index].onClick;
            if(callback) { callback(); }
          }}>
          {tab.label}
        </Tab>)}
      </TabBar>
      {tabs[this.state.selectedTabIndex].content}
    </div>
  }
}

export {TabBar, Tab, Tabs};
