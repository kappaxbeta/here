import React, {useEffect,  useState} from 'react';

import styled from 'styled-components';

//Tools
import { download } from "../tools/DataTools";

//Views
import DropZone from "../dropzone/DropZone";
import { ItemList} from "../list/List";
import { EditItem } from "../list/Item";
import { Spacer } from "../tools/Layout";

const Title = styled.h1`
color: deeppink;
   transition-property: font-size;
  transition-duration: 2s;
  ${props => props.mini ? "" : "font-size: 1rem"};
`;

const Container = styled.div`
position: absolute;
top: 0;
left: 0;
height: 80vh;
max-width: 400px;
width: 100%;
display: flex;
flex-direction: column;
background-color: white;
overflow: hidden;
z-index: 1000;
margin: 10px;
border: 5px solid transparent;
border-image: linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
border-image-slice: 1;
padding: 10px;
font-family: "ComicNeue", cursive;
font-weight: bold;
 
   transition-property: width, height;
  transition-duration: 2s;
  ${props => props.mini ? "" : "height: 10vh"};
`;


const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
    ${props => !props.mini ? "display: none;" : ""};
`;

const SmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  visibility: visible;
    transition-property: visibility;
  transition-duration: 2s;
  ${props => props.mini ? "display: none;" : ""};
`;


const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  transition-property: opacity;
  transition-duration: 1s;
  ${props => props.pre ? "" : "opacity: 0%;"};
`;

const TopContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const MiniView = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
 
  transition-property: opacity;
  transition-duration: 2s;
  ${props => props.show ? "opacity:100%;" : "opacity: 0%;"};
`;


/***
 *
 * @param locations
 * @param latLong
 * @param addList
 * @param pre
 * @param setNew
 * @constructor
 */
const BottomBar = ({locations, latLong, addList, pre, setNew}) => {
    const [add, setAdd] = useState(   false);
    useEffect(() => {
        setNew(add);
    }, [add]);
    return <>
        <Toolbar pre={pre}>
            <a href={download(locations)} download={ "Locations.json"}>Export</a>

            <div>
                <>{locations.length} Items </>
                <button disabled={add} onClick={() => setAdd(true)}>Add</button>


            </div>


        </Toolbar>

        { add ? <EditItem latLong={latLong} onClose={() => setAdd(false)} onSave={(item) => {
            // @ts-ignore
            addList([item])
        }}/> :null}

    </>
};

/***
 *
 * @param locations
 * @param selected
 * @param mini
 * @constructor
 */
const SingleView = ({locations, selected, mini}) => {
    const [item, setItem] = useState(selected.id ? locations.find(i => i.uid === selected.id) : locations[0]);
    const [show, setShow] = useState(mini);
    useEffect(() => {
        setItem(selected.id ? locations.find(i => i.uid === selected.id) : locations[0])
    }, [selected, locations]);
    useEffect(() => {
        let t;
        t = setTimeout(() => setShow(!show),1000);

        return () => clearTimeout(t);
    }, [mini]);

    return <MiniView show={show}>
        <div>{item.Name}</div>
        <div>{item.title}</div>
    </MiniView>
};

/***
 *
 * @param locations
 * @param addList
 * @param updateItem
 * @param removeItem
 * @param clearList
 * @param setAdd
 * @param latLong
 * @param setLatLong
 * @param itemSelect
 * @param setSelected
 * @param setLookUp
 * @constructor
 */
function Layout({locations, addList, updateItem, removeItem, clearList, setAdd, latLong, setLatLong, itemSelect, setSelected, setLookUp, onHelpClick}) {

    const [search, setSearch] = useState("");

    // Animation tricker
    const [mini, setMini] = useState(true);
    const [pre, setPre] = useState(true);

    return (

            <Container mini={mini}>
                <TopContainer>
                <a onClick={(e) => {e.preventDefault();onHelpClick()}} href={'/#'}>Help?</a> <button onClick={() => {
                    //if minimize do some pre animation before full
                    if(mini) {
                        setTimeout(() => setMini(!mini), 2000);
                        setPre(!pre);
                    } else {
                        setTimeout(() => setPre(!pre), 2000);
                        setMini(!mini);
                    }

                }}>{mini ?  "Minimize" : "Maximize" }</button>
                </TopContainer>
                <Title mini={mini}>
                    Here Location Lookup
                </Title>
                <SmallContainer mini={mini} >
                    {locations.length ? <SingleView mini={mini} locations={locations} selected={itemSelect} /> :  <DropZone onFileDrop={addList}/>  }
                </SmallContainer>
                <BigContainer mini={mini}>
                    <DropZone onFileDrop={addList}/>

                    <Toolbar pre={pre}>

                        <Spacer/>
                        <label>
                            Search: <input
                            name="search"
                            type="text"

                            onChange={e => {
                                setSearch(e.target.value);
                            }}
                        />

                        </label>
                    </Toolbar>
                    <ItemList
                        pre={pre}
                        locations={locations}
                        search={search}
                        latLong={latLong}
                        itemSelect={itemSelect}
                        removeItem={removeItem}
                        setLatLong={setLatLong}
                        onItemClick={(item) => {
                            setLookUp(() => item);
                            setSelected(() => {
                                return  {id: item.uid, type: "list"};
                            });

                        }}
                        updateItem={updateItem}
                        clearList={clearList}
                    />

                    <BottomBar pre={pre} setNew={setAdd} addList={addList} latLong={latLong} locations={locations }/>
                </BigContainer>
            </Container>
    );
}

export default Layout;
