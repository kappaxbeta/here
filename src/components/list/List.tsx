import React, {useState} from 'react';

import styled from 'styled-components';

//Views
import {Spacer} from "../tools/Layout";
import {Item, EditItem} from "./Item";

const ListItemTool = styled.p`
  position: absolute;
  right: 10px;
  top: 0px;
`;


const List = styled.ul`
display: flex;
flex-direction: column;
flex-grow: 1;
background-color: white;
overflow: scroll;
z-index: 1000;
margin: 10px 10px 5px;
border: 5px solid transparent;
border-image: linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
border-image-slice: 1;
padding: 0;
font-family: "ComicNeue", cursive;
transition-property: opacity;
transition-duration: 1s;
${props => props.pre ? "" : "opacity: 0%;"};
`;

const ListBottom = styled.div`
display: flex;
flex-direction: row;
flex-grow: 1;

z-index: 1000;
margin: 10px;
margin-top: 0;
max-height: 23px;
padding: 0;
font-family: "ComicNeue", cursive;
transition-property: opacity;
transition-duration: 1s;
${props => props.pre ? "" : "opacity: 0%;"};
`;
/***
 *
 * @param pre
 * @param locations
 * @param search
 * @param onItemClick
 * @param updateItem
 * @param removeItem
 * @param setLatLong
 * @param latLong
 * @param itemSelect
 * @param clearList
 * @constructor
 */
export const ItemList = ({pre, locations, search, onItemClick, updateItem, removeItem, setLatLong, latLong, itemSelect, clearList}) => {
    const [edit, setEdit] = useState(false);

    return <>
        <List pre={pre}>
            {locations.length ? null :<Item  id={""} selected={itemSelect} onClick={() => {}
            }>Add Location or drag a file inside</Item>}
        {locations.map((i: any) => {

            if(search !== "" && !i.Name.toLowerCase().includes(search.toLowerCase())) {
                return;
            }
            return <Item key={"location-" + i.uid} id={i.uid} selected={itemSelect} onClick={() => {
                onItemClick(i);
            }
            }>
                    {/* TODO clean it up*/}
                {edit && edit === i.uid  ? <EditItem id={i.uid} oldName={i.Name} latLong={latLong} onClose={()=> setEdit(false)} onSave={(value) => {
                    updateItem(value);
                }} /> : <> <div><b> {i.Name}</b></div><div>{i.title}</div></>}

                <ListItemTool>
                    {edit && edit === i.uid ?   <button onClick={() => {
                        removeItem(i);
                        setEdit(false);
                    }}
                    >delete</button> :  itemSelect.id === i.uid ?  <button onClick={() => {
                        setLatLong({Latitude: i.Latitude, Longitude: i.Longitude});
                        setEdit(i.uid);
                    }}
                    >edit</button> : null}
                </ListItemTool>
            </Item>
        })}
    </List>
    <ListBottom pre={pre} >
        <Spacer/>
        <button onClick={clearList}>Clear List</button>
    </ListBottom>
    </>
};
