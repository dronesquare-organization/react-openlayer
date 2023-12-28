# Annotation

- 각각의 형태의 어노테이션을 지도위에 표기하기 위한 컴포넌트 입니다.
- props들이 조금씩 다르므로 사용에 유의하셔야 합니다.
- center, position을 입력할때 `ol` 은 별도의 좌표계를 사용하고 있으므로 `경위도` to `epsg3857`로 변환이 필요합니다. `fromLonLat` 함수를 사용해 좌표를 변환하고 있습니다.

```javascript
annotationRef.current.setProperties({
  ...properties,
  shape: "Polygon",
  isModifying: false,
  source: annotationLayerRef.current.getSource(),
  layer: annotationLayerRef.current,
  hasPopup: children ? children?.props.isPopup : false,
});
```

- 다른 이벤트 훅들을 위해 어노테이션은 자신이 담김 vector, layer를 properties에 담고 있습니다.
