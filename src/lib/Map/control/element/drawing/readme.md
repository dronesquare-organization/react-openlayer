# DrawButton

- `DrawButton` 컴포넌트는 기본적으로 버튼을 담당하고 있는 컴포넌트입니다.
- 하지만 버튼 클릭 상태에 따라, 각각의 버튼이 가진 드로잉 역할을 수행합니다.

## Draw

```javascript
new Draw({
  source: onCanvas ? drawVectorSource : undefined,
  type: "Point",
  style: new Style({
    text: makeText({
      text: "unknown",
      size: 15,
      color: "black",
      outline: true,
      isMarker: true,
    }),
    image: new Icon({
      scale: 0.07,
      src: icon.marker, // 마커 이미지 경로
      anchor: [0.5, 1], // 마커 이미지의 앵커 위치
    }),
  }),
});
```

- `Draw` 객체를 통해 어떤 형태를 그릴지 결정됩니다.
- `style` 프로퍼티를 통해 마커 텍스트나 아이콘을 설정할 수 있습니다.
- `onCanvas` 가 `true`로 설정되어 있다면 draw가 마무리됐을때 지도위에 남도록 할 수 있습니다.(드론스퀘어에선 남기지 않고 어노테이션 등록 후 어노테이션 리스트를 api를 통해 다시 받아와 그려지도록 하고 있음)
