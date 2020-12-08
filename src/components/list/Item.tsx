import React, {useEffect, useRef, useState} from "react";
import styled from 'styled-components';
//Tools
import {ID} from "../tools/DataTools";

const ListItem = styled.li`
position: relative;
display: flex;
flex-direction: column;
justify-content: space-around;
background-color: ${props => props.selected ? "deeppink" : "white"};
font-family: "ComicNeue", cursive;
padding: 10px;
border-bottom: dotted lightslategrey 3px;
min-height: 120px;
&:last-child {
border: none;
}
&:hover {
  background-color: orange;
}
`;

const EditItemContainer = styled.div`
position: relative;
display: flex;
flex-direction: column;
font-family: "ComicNeue", cursive;
padding: 10px;

`;
const Input = styled.input`
border-color: ${props => props.error ? "red" : "black"};
`;


const SaveCancel = styled.div`

display: flex;
flex-direction: row;
justify-content: space-around;
font-family: "ComicNeue", cursive;
padding: 10px;
`;

/***
 *
 * @param onClick
 * @param id
 * @param props
 * @constructor
 */
export const Item = ({onClick, id, ...props}) => {
    const ref = useRef(null);
    const { selected } = props;
    useEffect(() => {
        if(selected.type === "map" && id === selected.id && ref) {

            // @ts-ignore
            ref.current.scrollIntoView();
        }
    }, [selected, id]);
    return <ListItem ref={ref} onClick={onClick} selected={id === selected.id}> {props.children} </ListItem>
};

/***
 *
 * @param latLong
 * @param onSave
 * @param onClose
 * @param oldName
 * @param id
 * @constructor
 */
export const EditItem = ({latLong, onSave, onClose, oldName= "", id=ID()}) => {
    const [name, setName] = useState(oldName);
    const [error, setError] = useState(false);

    return <EditItemContainer>
        <label >
            Name: <Input
            name="isGoing"
            error={error}
            type="text"
            placeholder={"Add name here"}
            defaultValue={name}
            onChange={e => {
                setError(e.target.value === "");
                setName(e.target.value);
            }}
        />

        </label>
        <p>
            {latLong.Latitude ? null : "Click on the map to choose" }
            Lat: {latLong.Latitude}   Long: {latLong.Longitude}
        </p>
        <SaveCancel>
            <button onClick={() => onClose()}>Cancel</button>
            <button onClick={() => {
                if(name !== "" && latLong.Longitude) {
                    onClose();
                    onSave({
                        uid: id,
                        Name: name,
                        ...latLong
                    });
                } else {
                    setError(true);
                }
            }}>Save</button>
        </SaveCancel>
    </EditItemContainer>
};
