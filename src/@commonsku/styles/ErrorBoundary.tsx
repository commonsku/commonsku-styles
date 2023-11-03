import React, { Component } from 'react'
import styled from 'styled-components';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'
import { Button } from './Button';

const Wrapper = styled.div<SharedStyleTypes>`
    text-align: center;
    font-family: "TT Norms Pro", sans-serif;
    background: white !important;
    position: fixed !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${SharedStyles}
`;

const ErrorTextContainer = styled.div`
    font-size: 2em;
    padding: 100px 50px;
    margin-top: 100px;

    @media only screen and (max-width: 700px) {
    margin-right: auto;
    }

    @media only screen and (min-width: 701px) {
    margin-right: 10px;
    }
`;

type StateType = { hasError: boolean, isNewTab: boolean };
type ErrorBoundaryProps = React.PropsWithChildren<{}>;
export class ErrorBoundary extends Component<ErrorBoundaryProps, StateType> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false,isNewTab: false }
  }

 
  componentDidCatch(error: Error | any, info: string | any) {
    this.setState({ hasError: true })
    console.log({ error, info })
  }

  componentDidMount() {
    if (window.history.length === 1) {
      this.setState({ isNewTab: true });
    }
  }
  
  render() {
    const goBack = () =>{
      window.history.back();
    }
    if (this.state.hasError) {
      return (
        <Wrapper {...this.props}>
            <ErrorTextContainer>
            <b style={{color:'#2A4D63'}}>Sorry, something went wrong.</b>< br />
              <p style={{ color:'#597486',fontSize:'24px',fontStyle:'normal',lineHeight: '48px',fontWeight: 600}}> We’ve been notified about the error <br />
              and will get it resolved shortly.</p>
              <br />
              <Button  variant="primary" size="medium" id="goBackButton" onClick={goBack} style={{marginRight: '25px', display : this.state.isNewTab ? 'none':'table-cell' }}>Back to previous page</Button>
              <a style={{color:'#00A0B6',textDecoration: 'none',fontSize:'14px',fontWeight: '600', marginRight:'40px'}} href="/">Go to homepage</a>
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
