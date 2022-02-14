import _ from 'lodash'
import styled, { css } from 'styled-components'
import React, { Component } from 'react'
import { SharedStyles, SharedStyleTypes } from './SharedStyles'

const tabSizes = {
  small: css`
    font-size: 0.9rem;
    padding: 0.5rem 5px;
    margin: 0;
  `,
  medium: css`
    font-size: inherit;
    padding: 1rem 12px;
    margin: 0 15px 0 0;
  `,
};

const TabBar = styled.ul<{padded?: boolean} & SharedStyleTypes>`
  &&& {
    display: block;
    font-size: 16px;
    font-family: 'skufont-demibold', sans-serif;
    margin: 0;
    margin-bottom: ${props => props.padded ? "20px" : 0};
    padding: 0;
    ${SharedStyles}
  }
`

const Tab = styled.li<{selected?: boolean, size?: keyof typeof tabSizes} & SharedStyleTypes>`
  &&& {
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
    ${SharedStyles}

    ${props => tabSizes[props.size ?? 'medium']}
  }
`

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

export type TTab = {label: string, content: React.ReactNode, onClick?: Function|VoidFunction};
export type TabsProps = { tabs: TTab[], selectedTabIndex?: number, padded?: boolean, size?: keyof typeof tabSizes };
type TabsState = {selectedTabIndex: number};

class Tabs extends Component<TabsProps, TabsState> {
  constructor(props: TabsProps) {
    super(props);
    this.state = {
      selectedTabIndex: this.props.selectedTabIndex || 0,
    };
  }

  getTab(tabs: TTab[], tabIndex=0): null | TTab {
    if (!tabs.length || tabs.length-1 < tabIndex) {
      return null;
    }
    return tabs[tabIndex];
  }

  componentDidMount() {
    const selectedTab = this.getTab(this.props.tabs, this.state.selectedTabIndex);
    if (!selectedTab) {
      return;
    }

    const callback = selectedTab.onClick;
    if(callback) { callback(); }
  }

  componentDidUpdate(prevProps: Readonly<TabsProps>, prevState: Readonly<TabsState>) {
    if (prevProps.tabs !== this.props.tabs) {
      this.setState({
        selectedTabIndex: 0,
      });
    }
  }

  render () {
    const { tabs, size } = this.props;
    const selectedTab = this.getTab(tabs, this.state.selectedTabIndex);
    return <div>
      <TabBar padded={this.props.padded === true}>
        {tabs.map((tab, index) => <Tab 
          key={index} size={size}
          selected={index === this.state.selectedTabIndex}
          onClick={() => {
            this.setState({ selectedTabIndex: index })
            let callback = tabs[index].onClick;
            if(callback) { callback(); }
          }}>
          {tab.label}
        </Tab>)}
      </TabBar>
      {_.get(selectedTab, ['content'], '')}
    </div>
  }
}

export {TabBar, Tab, Tabs};
