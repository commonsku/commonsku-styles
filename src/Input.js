import styled from 'styled-components'

const Input = styled.input`
  padding: .5rem;
  color: #123952;
  height: 2.3125rem;
  border: 1px solid #ABC7D1;
  border-radius: 5px;
  font-family: 'skufont-regular', sans-serif;
  background-color: white;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  &:focus {
    border: 2px solid #02c0da;
    outline: none;
  }
`;

export default Input;