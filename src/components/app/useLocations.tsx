import {useState} from "react";
import {ID} from "../tools/DataTools";
import platform, {H} from "../map/Here";
// Get an instance of the search service:
const service = platform.getSearchService();

export interface Location {
    Name: string;
    Latitude: number;
    Longitude: number;
    position: any;
    title: any;
    uid: string;
};

/**
 * @return {array} returns the location and modifier
 */
// TODO maybe using Redux would helpful
const useLocations = () => {
    const [locations, setLocations] = useState<Location[]>([]);

    const addList = (values) => {
        values.forEach((i) => {
            service.reverseGeocode({at: i.Latitude + ',' + i.Longitude}, (result : any) => {
                result.items.forEach((item:any) => {
                    const newItem = {
                        title: item.title,
                        position: item.position
                    };

                    setLocations((items: Location[]) => ([...items, {...newItem, ...i, uid: ID()}]));
                });
            })
        })
    };

    const removeItem = (value: Location) => {
        setLocations((items) => {
            return items.filter(function(item: Location){
                return item.uid !== value.uid;
            });
        });
    };

    const updateItem = (value) => {
        service.reverseGeocode({at: value.Latitude + ',' + value.Longitude}, (result : any) => {
            result.items.forEach((itemNew: any) => {
                const pickedItem = {
                    title: itemNew.title,
                    position: itemNew.position
                };

                setLocations((items: Location[]) => {
                    return items.map(function(item: Location){
                        if( item.uid === value.uid) {
                            return {...pickedItem, ...value};
                        }
                        return item;
                    });
                });
            });

        })
    };

    const clearList = () => {
        setLocations(() => []);
    };


    return [locations, addList, updateItem, removeItem, clearList];

};

export default useLocations;
