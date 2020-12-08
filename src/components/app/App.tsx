import React, {useState} from 'react';

// Tools
import useLocations from "./useLocations";
import {doLatLong} from "../tools/DataTools";

// Views
import Map from "../map/Map";
import Layout from "../layout/Layout";
import Modal from "../layout/Modal";


function App() {
    const [locations, addList, updateItem, removeItem, clearList] = useLocations();
    const [lookUp, setLookUp] = useState(false);

    const [itemSelect, setSelected] = useState({id: false, type: ""});

    // save the latest click on the map
    const [latLong, setLatLong] = useState(doLatLong(false,false));
    // boolean when adding a new item to the list to show it on the map
    const [add, setAdd] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    return (
        <div>
            <Map  locations={locations} isNew={add} latLong={latLong} lookUp={lookUp} setLatLong={(lat, long) => setLatLong(
                doLatLong(lat,long)
                )}
                onMarkerClick={(item) => {
                setSelected(() => {
                    return  {id: item.uid, type: "map"};
                })
            }}/>
            <Layout setSelected={setSelected}
                    itemSelect={itemSelect}
                    setAdd={setAdd}
                    locations={locations}
                    addList={addList}
                    updateItem={updateItem}
                    removeItem={removeItem}
                    clearList={clearList}
                    latLong={latLong}
                    setLookUp={setLookUp}
                    setLatLong={setLatLong}
                    onHelpClick={() => setShowHelp(true)}
            />
            {showHelp ? <Modal onClick={() => {setShowHelp(false)}}><p>Comnig Soon</p></Modal> : null}
        </div>
    );
}

export default App;
