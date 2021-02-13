import React, { useState, useEffect, useRef } from "react";
import { Box } from "@material-ui/core";

import Mapbox from "./Mapbox";
import Roadinfo from "./Roadinfo";
import useSource from "../hooks/useSource";
import useProperties from "../hooks/useProperties";

async function fetchNearbyImages(longlat, radius = 150) {
  //https://www.mapillary.com/developer/api-documentation/#the-image-object
  const MapillaryClientID = process.env.GATSBY_MAPILLARY_CLIENTID;
  const baseurl = "https://a.mapillary.com/v3/images?";
  const lng = longlat.lng;
  const lat = longlat.lat;
  const mapillaryurl = `${baseurl}client_id=${MapillaryClientID}&closeto=${lng},${lat}&radius=${radius}`;
  const collection = await fetch(mapillaryurl).then((res) => res.json());
  return collection.features;
}

export default function Layout(props) {
  const mbref = useRef();
  const source = useSource();
  const properties = useProperties();
  const [road, setRoad] = useState({ isopen: false });
  const [features, setFeatures] = useState([]);

  const onRoadclick = (lnglat, id) => {
    //console.log("clickedroad, id:", id);
    if (!properties.isLoading) {
      //console.log("lnglat: ", lnglat);
      setRoad({ lnglat, id, properties: properties.data[id], isopen: id >= 0 });
      fetchNearbyImages(lnglat)
        .then((x) => {
          setFeatures(x);
        })
        .catch((e) => {
          setFeatures([]);
        });
    }
  };

  useEffect(() => {
    if (!source.isLoading) {
      console.log("source is fetched and parsed");
      //console.log("source: ", source.data);
      mbref.current.addsource("allroads", source.data);
    }
  }, [source]);

  useEffect(() => {
    if (!properties.isLoading) {
      console.log("properties is fetched and parsed");
    }
  }, [properties]);

  return (
    <Box position="relative">
      <Roadinfo road={road} features={features} />
      <Mapbox ref={mbref} onRoadclick={onRoadclick} />
    </Box>
  );
}
