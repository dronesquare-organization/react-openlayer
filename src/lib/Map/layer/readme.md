# CaptureMap

- 지도 로딩이 완료되면 지도가 그려진 캔버스를 캡쳐하고 바이너리로 반환된 이미지 값을 `onCaptured` 핸들러를 통해 반환합니다.

# ImageOverlay

- 이미지 url과 왼쪽위, 오른쪽 아래 점을 설정하면 범위안에서 이미지가 표시됩니다.

```javascript
const imageRef = useRef(
  new ImageLayer({
    source: new ImageStatic({
      url: imageUrl,
      imageExtent: bounds.flat(),
      projection: "EPSG:4326",
    }),
  })
);
```

- projection이 경위도를 의미하는 `EPSG:4326`이 사용됩니다.

# LayerGroup

- `LayerGroup` 컴포넌트는 하위 다른 레이어들의 zIndex들을 통합 컨트롤합니다.
- 각자의 zIndex는 무시되고 `LayerGroup`에 넘겨준 zIndex 값으로 오버라이딩됩니다.

# SelectedFeature

- 어노테이션이 선택됐음을 알려주는 vertex나 숫자들을 표시하는 컴포넌트입니다.
