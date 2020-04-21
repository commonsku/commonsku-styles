import React, { Component } from 'react'
import styled from 'styled-components';
import { getThemeColor } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'

const Wrapper = styled.div<SharedStyleTypes>`
    background: ${props => getThemeColor(props, 'bgblue')};
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${SharedStyles}
`;

const ErrorTextContainer = styled.div`
    background: white;
    max-width: 450px;
    text-align: center;
    border-radius: 10px;
    font-size: 2em;
    margin-left: auto;
    padding: 100px 50px;
    margin-top: auto;
    margin-bottom: auto;

    @media only screen and (max-width: 700px) {
    margin-right: auto;
    }

    @media only screen and (min-width: 701px) {
    margin-right: 10px;
    }
`;

const BotContainer = styled.div`
    max-width: 450px;
    text-align: center;
    border-radius: 10px;
    font-size: 2em;
    padding: 40px;

    margin-right: auto;
    @media only screen and (max-width: 700px) {
      margin-left: auto;
      margin-top: 20px;
    }

    @media only screen and (min-width: 701px) {
      margin-left: 5px;
    }
`;

const BotImg = styled.img`
    margin-top: 20px;
    padding: 0;
    margin: 0;
    max-width: 450px;
`;

type StateType = { hasError: boolean };

export class ErrorBoundary extends Component<object, StateType> {
  constructor(props: StateType) {
    super(props);
    this.state = { hasError: false }
  }

  componentDidCatch(error: Error | any, info: string | any) {
    this.setState({ hasError: true })
    console.log({ error, info })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Wrapper {...this.props}>
          <div style={{ display: 'flex', flexWrap: 'wrap', position: 'fixed', width: '100%', }}>
            <ErrorTextContainer>
                I&apos;m sorry... this page cannot be loaded.<br /><br /><a href="/">Back to home</a>
            </ErrorTextContainer>
            <BotContainer>
              <BotImg src="https://login.commonsku.com/images/repairbot.png" alt="SKU Bot" />
            </BotContainer>
          </div>
        </Wrapper>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
