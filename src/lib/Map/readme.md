# Map

```javascript
new Map({});
```

- Map 인스턴스 선언으로 맵을 만들 수 있습니다.

```javascript
const map = new Map({});
const divId = "map-container"; // 맵을 위치시기고 싶은 div의 아이디 값
map.setTarget(divId); // 만들어진 map을, 위치시키고자 하는 div의 id 값을 활용해 등록 가능합니다.
```

- DOM 정보를 활용해 HTML에 지도를 표현할 수 있습니다.

# View

```javascript
const mapView = new View({});
map.setView(mapView);
```

- `View`는 'zoom', 'center', 'fit' 등 보이는 요소의 변경 사항을 통제할 수 있는 요소입니다.
- 위 코드처럼 `map` 에 넣어 설정 가능합니다.

```javascript
const mapView = new View({});
map.setView(mapView);

mapView.setZoom(5); // map의 줌이 5로 설정됩니다.

mapView.setCenter([x좌표, y좌표]); // 입력한 좌표가 맵의 중앙에 오도록 이동시킵니다.

// openlayer에서 사용하는 좌표계는 `EPSG:3857`입니다.
// 드론스퀘어에서 주로 사용하고 있는 경위도를 openlayer에 활용하려면 fromLonLat 함수를 사용해야 합니다.
mapView.setCenter(fromLonLat(center));
```

# TileLayer

```javascript
const basicTile = new TileLayer({
    zIndex: -1,
    source: new OSM({
        crossOrigin: "anonymous",
        ...
    })
})

map.addLayer(basicTile); // 타일 레이어를 만들고 맵에 추가합니다.
```

- `MapContainer`에 설정된 타일레이어는 OSM(Open Street Map)을 사용하고 있는 레이어입니다.

# 외부 동작

- `MapContainer`엔 지도를 컨트롤할 수 있는 `Map` 객체가 있습니다.
- 이 객체를 통해 여러가지 기능들을 다룰 수 있습니다.
- react-openlayers7 라이브러리는 openlayers(이하 `ol`)의 모든 기능을 커버하고 있지 못하므로 바닐라 `ol`과 협력해 기능들을 구현해 나가야 합니다.
- 따라서 `MapContainer`가 가지고 있는 `Map`객체를 `ContextAPI`를 통해서 자식 요소에 내려주고, `useImperativeHandle`를 통해 위쪽에 올려주고 있습니다.

```javascript
const mapRef = useRef < Map > null;

return <MapContainer ref={mapRef}>자식 요소들...</MapContainer>;
```

- 상위 요소에서 mapRef를 사용해 하위 map 기능에 대해 통제 가능합니다.

# drawVectorSource

- `MapContainer` 안에 있는 drawVectorSource는 드로잉 툴로 그려지는 도형들을 담기 위해 만들어진 객체 입니다.
- `VectorSource` 인스턴스를 사용했습니다.
- 만들어진 drawVectorSource는 ControlContext 를 통해 하위로 내려집니다.

# FeatureStore 컴포넌트

- `FeatureStore` 컴포넌트는 `선택된` 어노테이션을 담고 있는 컨텍스트 입니다.
- 어노테이션이 선택되면 해당되는 `Feature` 가 스토어에 저장되고 `MapContainer` 아래로 내려집니다.
