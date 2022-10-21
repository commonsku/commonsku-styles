import _ from 'lodash'
import styled, { css } from 'styled-components'
import React, { Component } from 'react'
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

type CommonTabProps = {
  size?: keyof typeof tabSizes;
  variant?: 'primary' | 'secondary';
};

type TabProps = {
  selected?: boolean;
} & CommonTabProps & SharedStyleTypes;
const Tab = styled.li<TabProps>`
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

export type TTab = {
  label: string,
  content: React.ReactNode,
  onClick?: (e?: React.MouseEvent<HTMLLIElement, MouseEvent>) => void,
} & CommonTabProps;
export type TabsProps = {
  tabs: TTab[],
  selectedTabIndex?: number,
  padded?: boolean
} & CommonTabProps;
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
        e.label === this.props.tabs[i].label
        && (e.onClick || "null").toString() === (this.props.tabs[i].onClick || 'null').toString()
      )
    );
    if (!sameTabs) {
      this.setState({
        selectedTabIndex: 0,
      });
    }
  }

  render () {
    const { tabs, size, padded, variant, } = this.props;
    const selectedTab = this.getTab(tabs, this.state.selectedTabIndex);
    return <div>
      <TabBar padded={padded}>
        {tabs.map((tab, index) => <Tab 
          key={index}
          size={tab.size || size}
          variant={tab.variant || variant}
          selected={index === this.state.selectedTabIndex}
          onClick={(e) => {
            this.setState({ selectedTabIndex: index });
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
