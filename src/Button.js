import styled from 'styled-components'

/*

  PASS THE BUTTON TYPE AS A PROP:
    - primary (default)
    - secondary
    - cta
    - link

  PASS A SIZE AS A PROP:
    - xl
    - large
    - medium (default)
    - small
    - tiny
  
  OPTIONAL PROPS:
    - disabled

*/

const Button = styled.button`
  border: 3px solid white;
  border-radius: 5px;
  background: ${props => props.secondary ? "transparent" : props => props.cta ? "#fa237c" : "#02c0da" };
  color: ${props => props.secondary ? "#02c0da" : "white"};
  border-color: ${props => props.cta ? "#fa237c" : "#02c0da" };
  font-size: ${ props => props.tiny ? ".8em" : "1em" };
  padding: ${props => props.xl ? "17px 50px" : props => props.large ? "17px 30px" : props => props.small ? "7px 15px" : props => props.tiny ? "5px 5px" : "12px 25px" };
  font-family: ${props => props.small || props.tiny ? "'skufont-regular', sans-serif" : "'skufont-demibold', sans-serif"};
`;

export {Button};
