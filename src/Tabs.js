import styled from 'styled-components'
import React from 'react'

const TabBar = styled.ul`
  display: block;
  font-size: 1.125rem;
  font-family: 'skufont-demibold', sans-serif;
  margin: 0;
  padding: 0;
`

const Tab = styled.li`
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

class Tabs extends React.Component {
  /* add state, onclick event */
  constructor(props) {
    super(props)
    this.state = { 
      selectedTabIndex: 0,
      selectedTab: props.tabs[0]
    }
  }
  render() {
  return <div>
           <TabBar>
             { this.props.tabs.map((tab, index) => <Tab key={index}
	                                                name={tab.name}
							selected={index == this.state.selectedTabIndex}
							onClick={() => this.setState({ selectedTabIndex: index }) }>
	                                             {tab.label}
						   </Tab>)}
           </TabBar>
	   <TabContent>
	     {this.props.tabs[this.state.selectedTabIndex].content}
	   </TabContent>
	 </div>
  }
}

export {TabBar, Tab, Tabs};
