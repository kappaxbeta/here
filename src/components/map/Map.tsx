import React, {useEffect, useRef} from 'react'
import platform, {H} from './Here';
import styled from "styled-components";
import onResize from 'simple-element-resize-detector';
//Tools
import {convertLatLong} from "../tools/DataTools";

const MapContainer = styled.div`
position: absolute;
top: 0;
left: 0;
height: 100vh;
width: 100vw;
`;

let map;
let group;

let addGroup;

function marker (color) {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" width="32" height="32" viewBox="0 0 263.335 263.335" xml:space="preserve">
<g>
    <g xmlns="http://www.w3.org/2000/svg">
        <path d="M40.479,159.021c21.032,39.992,49.879,74.22,85.732,101.756c0.656,0.747,1.473,1.382,2.394,1.839   c0.838-0.396,1.57-0.962,2.178-1.647c80.218-61.433,95.861-125.824,96.44-128.34c2.366-9.017,3.57-18.055,3.57-26.864    C237.389,47.429,189.957,0,131.665,0C73.369,0,25.946,47.424,25.946,105.723c0,8.636,1.148,17.469,3.412,26.28" fill="${color}"/>
       
    </g>
</g></svg>`;
}

const addingMarker = new H.map.Icon(marker("yellow"));

/***
 *
 * @param locations
 * @param center
 * @param lookUp
 * @param setLatLong
 * @param onMarkerClick
 * @param isNew
 * @param latLong
 * @constructor
 */
const Map = ({locations, center = { lng: 13.4, lat: 52.51 }, lookUp, setLatLong, onMarkerClick, isNew, latLong}) => {
    const mapRef = useRef(null);

    useEffect(() => {
        // Get the default map types from the Platform object:
        var defaultLayers = platform.createDefaultLayers();

        // Instantiate the map:
        map = new H.Map(
            mapRef.current,
            defaultLayers.vector.normal.map,
            {
                zoom: 10,
                center: center,
                pixelRatio: window.devicePixelRatio || 1
            });

        // adding mouse behaviour to the map
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        // Add event listener:
        map.addEventListener('tap', function(evt) {
            // Log 'tap' and 'mouse' events:
            var coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
            // save the last click to global for update or add a new location
            setLatLong( Math.abs(coord.lat.toFixed(4)), Math.abs(coord.lng.toFixed(4)));
        });

        // Create a group that can hold map objects:
        group = new H.map.Group();
        addGroup =  new H.map.Group();
        // Add the group to the map object (created earlier):
        map.addObject(group);
        map.addObject(addGroup);
        // Create the default UI:
        var ui = H.ui.UI.createDefault(map, defaultLayers);

        // update map size on resize
        onResize(mapRef.current, () => {
            map.getViewPort().resize();
        });

        return () => {
            //clean up
            map.dispose();
        };
    },[mapRef]);

    /***
     * moves to the coordinates
     */
    useEffect(() => {
        if(lookUp) {
            map.getViewModel().setLookAtData({
                position: lookUp.position,
                zoom: 14
            }, true);
        }
    },[lookUp]);


    useEffect(() => {
        //remove all old
        group.removeAll();

        // adding new makers
        locations.forEach(item => {
            const marker = new H.map.Marker(item.position);
            // add listener to focus if a marker was clicked
            marker.addEventListener('tap', () => {
                map.getViewModel().setLookAtData({
                    position: item.position,
                    zoom: 14
                }, true);
                onMarkerClick(item);
            });
            group.addObject(marker);
        });
    },[locations, onMarkerClick]);


    // if we in the mode of adding a new location, we preview it
    useEffect(() => {
        addGroup.removeAll();
        if(isNew && latLong.Latitude) {

            const marker = new H.map.Marker(convertLatLong(latLong), {icon: addingMarker, zIndex: 3});

            addGroup.addObject(marker);
        }

    },[isNew, latLong]);


    return <MapContainer ref={mapRef} />

}

export default Map;
