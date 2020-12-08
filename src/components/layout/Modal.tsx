import React, {useEffect, useRef, useState} from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  width:150px;
  height: 100px;
  left: calc(50% - 75px);
  top: calc(50% - 50px);
  border: 5px dotted transparent;
  background-color: white;
  border-image: linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
  border-image-slice: 1;
  z-index: 2000;
  font-family: "ComicNeue";
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
`;
const Content = styled.div`

`;

const Bottom = styled.div`
  margin: 10px;
`;

/***
 *
 * @param onClick
 * @param children
 * @constructor
 */
const Modal = ({onClick, ...props}) => {
    return <Wrapper>
        <Content>
            {props.children}
        </Content>
        <Bottom>
            <button onClick={onClick}>Close</button>
        </Bottom>
    </Wrapper>
}

export default Modal;
