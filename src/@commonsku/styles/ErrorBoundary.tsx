import React, { Component } from 'react'
import styled from 'styled-components';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'
import { Button } from './Button';
import { window } from '../utils';

const Wrapper = styled.div<SharedStyleTypes>`
  &&& {
    text-align: center;
    font-family: "TT Norms Pro", sans-serif;
    background: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${SharedStyles}   
  }
`;

const ErrorTextContainer = styled.div`
    padding: 100px 50px;
    margin-top: 100px;

    @media only screen and (max-width: 700px) {
    margin-right: auto;
    }

    @media only screen and (min-width: 701px) {
    margin-right: 10px;
    }
`;

type StateType = { hasError: boolean };
type ErrorBoundaryProps = React.PropsWithChildren<{}>;
export class ErrorBoundary extends Component<ErrorBoundaryProps, StateType> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false }
  }


  componentDidCatch(error: Error | any, info: string | any) {
    this.setState({ hasError: true })
    console.log({ error, info })
  }

  render() {
    const goBack = () =>{
      window.history.back();
    }
    const isNewTab = window.history.length === 1;
    if (this.state.hasError) {
      return (
        <Wrapper {...this.props}>
            <ErrorTextContainer>
            <b style={{color:'#2A4D63',fontSize:'64px'}}>Sorry, something went wrong.</b>< br />
              <p style={{ color:'#597486',fontSize:'24px',fontStyle:'normal',lineHeight: '40px',fontWeight: 400, position:'relative', zIndex: 100}}> We’ve been notified about the error
              and will get it resolved shortly.</p>
              <br />
              <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
              <Button variant="primary" size="medium" id="goBackButton" onClick={goBack} style={{marginRight: '25px', zIndex: 100 , display: isNewTab ? 'none':'table-cell' }}>Back to previous page</Button>
              <Button variant="text"  size="medium" style={{zIndex: 100}}  onClick={e=> window.location.href = "/"} >Go to homepage</Button>
              </div>
            </ErrorTextContainer>
            <div style={{position: 'absolute',bottom:'0',width:'100%'}}>
              <svg xmlns="http://www.w3.org/2000/svg"  width="100%" height="310" viewBox="0 0 1510 310" fill="none" preserveAspectRatio="none">
              <path d="M858 52.2161C498 -49.6986 200.667 20.7424 0 68.7022V310H1510V52.2166L1508.43 52.7138C1352.99 101.997 1202.45 149.728 858 52.2161Z" fill="#EDF4F7"/>
              </svg>
            </div>
        </Wrapper>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
