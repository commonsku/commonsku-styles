import { get, isString } from 'lodash'
import styled, { css } from 'styled-components'
import React, { Component, MouseEvent } from 'react'
import { SharedStyles, SharedStyleTypes } from './SharedStyles'
import colors from './colors';

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

type Tabprops = {
  selected?: boolean;
  size?: keyof typeof tabSizes;
  variant?: 'primary' | 'secondary';
} & SharedStyleTypes;
const Tab = styled.li<Tabprops>`
  &&& {
    cursor: pointer;
    display: inline-block;
    border-bottom: ${props => props.selected
        ? `5px solid ${props.variant === 'secondary' ? colors.secondary1.main : colors.primary1.main}`
        : "none"};
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

export type TTab = {label: string | React.ReactNode, content: React.ReactNode, onClick?: (e?: MouseEvent<HTMLLIElement>) => void};
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
    const sameTabs = prevProps.tabs.length !== this.props.tabs.length
    || (
      prevProps.tabs.length === this.props.tabs.length
      && prevProps.tabs.every((e, i) =>
        !isString(e.label) || (
          e.label === this.props.tabs[i].label
          && (e.onClick || "null").toString() === (this.props.tabs[i].onClick || 'null').toString()
        )
      )
    );
    if (!sameTabs) {
      this.setState({
        selectedTabIndex: 0,
      });
    }
  }

  render () {
    const { tabs, size, ...props } = this.props;
    const selectedTab = this.getTab(tabs, this.state.selectedTabIndex);
    return <div {...props}>
      <TabBar padded={this.props.padded === true}>
        {tabs.map((tab, index) => <Tab 
          key={index} size={size}
          className={index === this.state.selectedTabIndex ? 'selected' : ''}
          selected={index === this.state.selectedTabIndex}
          onClick={(e) => {
            this.setState({ selectedTabIndex: index })
            let callback = tabs[index].onClick;
            if(callback) { callback(e); }
          }}>
          {tab.label}
        </Tab>)}
      </TabBar>
      {get(selectedTab, ['content'], '')}
    </div>
  }
}

export {TabBar, Tab, Tabs};
