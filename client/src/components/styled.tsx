import React, { FunctionComponent } from "react";
import styled from "styled-components";

export const Centered = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Container = styled.div`
  text-align: center;
  width: 100%;
`;

const Recipient = styled.div`
  display: inline-block;
  height: 100%;
`;

export const CenteredHorizontal: FunctionComponent = (props) => (
  <Container>
    <Recipient>{props.children}</Recipient>
  </Container>
);
