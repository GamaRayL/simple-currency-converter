import { Converter } from 'components/Converter';
import { Title } from 'components/Title';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';

const CustomApp = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 140px;
  padding: 20px;
`;

const GlobalStyles = css`
  body {
    background: #1c92d2;
    background: -webkit-linear-gradient(to right, #f2fcfe, #1c92d2);
    background: linear-gradient(to right, #f2fcfe, #1c92d2);
  }
`;

function App() {
  return (
    <CustomApp>
      <Global styles={GlobalStyles} />
      <Title />
      <Converter />
    </CustomApp>
  );
}

export default App;;
