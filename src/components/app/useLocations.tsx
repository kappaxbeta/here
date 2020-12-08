import {useState} from "react";
import {ID} from "../tools/DataTools";
import platform, {H} from "../map/Here";
// Get an instance of the search service:
const service = platform.getSearchService();

const useLocation = () => {
    const [locations, setLocations] = useState([]);

    const addList = (values) => {
        values.forEach((i) => {
            service.reverseGeocode({at: i.Latitude + ',' + i.Longitude}, (result : any) => {
                result.items.forEach((item:any) => {
                    // @ts-ignore
                    setLocations((items: any[]) => ([...items, {...item, ...i, uid: ID()}]));
                });
            })
        })
    };

    const removeItem = (value) => {
        setLocations((items) => {
            return items.filter(function(item){
                // @ts-ignore
                return item.uid !== value.uid;
            });
        });
    };

    const updateItem = (value) => {
        service.reverseGeocode({at: value.Latitude + ',' + value.Longitude}, (result : any) => {
            result.items.forEach((itemNew: any) => {
                // @ts-ignore
                setLocations((items) => {
                    return items.map(function(item){
                        // @ts-ignore
                        if( item.uid === value.uid) {
                            return {...itemNew, ...value};
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

}

export default useLocation;
