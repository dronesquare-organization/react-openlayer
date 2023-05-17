import {
  ReactNode,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import MapContext from "./MapContext";
import "ol/ol.css";
import { Map as OlMap, View } from "ol";
import { defaults as defaultControls } from "ol/control";
import { fromLonLat } from "ol/proj";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import concat from "lodash/concat";

export type Lng = number;
export type Lat = number;

export type Location = [Lat, Lng];

export interface MapProps {
  scrollWheelZoom?: boolean;

  /**
   * default is 24
   */
  maxZoom?: number;

  /**
   * default is 3
   */
  minZoom?: number;
  fullscreenControl?: boolean;

  /**
   * default is true.
   */
  isZoomAbled?: boolean;

  /**
   * default is true.
   */
  isRotateAbled?: boolean;

  /**
   * default is [127.9745613, 37.3236563]
   */
  center?: Location;

  /**
   * default is 15
   */
  defaultZoomLevel?: number;

  /**
   * default is null
   */
  bounds?: [Location, Location];

  height?: string;
  width?: string;
  children?: ReactNode;
}

const Map = forwardRef(
  (
    {
      children,
      isZoomAbled = true,
      isRotateAbled = false,
      center = [127.9745613, 37.3236563],
      defaultZoomLevel = 15,
      bounds,
      maxZoom = 24,
      minZoom = 3,
      height = "1000px",
      width = "1000px",
    }: MapProps,
    ref
  ) => {
    const mapObj = useRef<OlMap>(
      new OlMap({
        controls: defaultControls({
          zoom: isZoomAbled,
          rotate: isRotateAbled,
        }).extend([]),
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        // 하위 요소 중 id 가 map 인 element가 있어야함.
        view: new View({
          extent: bounds
            ? fromLonLat(concat<number>([...[...bounds[0], ...bounds[1]]]))
            : undefined,
          center: fromLonLat(center),
          zoom: defaultZoomLevel,
          maxZoom: !isZoomAbled ? defaultZoomLevel : maxZoom,
          minZoom: !isZoomAbled ? defaultZoomLevel : minZoom,
        }),
      })
    );
    useImperativeHandle(ref, () => mapObj);

    useLayoutEffect(() => {
      const mapRef = mapObj.current;
      mapRef.setTarget("map");
      return () => {
        mapRef.setTarget(undefined);
      };
    }, []);

    // MapContext.Provider 에 객체 저장
    return (
      <MapContext.Provider value={mapObj.current}>
        <div id="map" style={{ width, height }}></div>
        {children}
      </MapContext.Provider>
    );
  }
);

export default Map;
