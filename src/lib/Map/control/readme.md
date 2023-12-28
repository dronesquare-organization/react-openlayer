# CompassWheel

- `CompassWheel` 자체엔 별다른 기능이 없습니다.
- `useMapRotation`이라는 지도 회전을 다루고 있는 훅을 UI에서 컨트롤 할 수 있도록 만든 훅입니다.

# FullScreenFeature

```javascript
  useEffectIfMounted(() => {
    if (!map) return;
    const targetMapId = map.getTargetElement().getAttribute("id") as string;

    onBtnRef.current = document.querySelector<HTMLButtonElement>(
      `#${CSS.escape(targetMapId)} .ol-full-screen-false`
    );

    offBtnRef.current = document.querySelector<HTMLButtonElement>(
      `#${CSS.escape(targetMapId)} .ol-full-screen-true`
    );
  }, [isFull, map]);
```

- `FullScreenFeature`은 지도의 전체화면을 위해 `ol`이 기본 제공하는 전체화면 버튼을 css를 통해 숨기고
- querySelector를 통해 버튼을 가져와 js를 통해 클릭해주는 방식으로 통제하고 있습니다.
- 컴포넌트에서 만든 전체화면 토글 버튼을 통해 직접 컨트롤 합니다.

# DrawingTools

- `ControlGroup`, `DrawButton`들이 협력하고 있는 공간입니다.
- `DrawingTools` 컴포넌트는 이들을 담고 있는 레이아웃을 책임지고 있습니다.
- 동시에 2개 이상의 버튼이 클릭되지 않도록 통제하고 있습니다.

```jsx
<ControlGroup>
    <Button></Button>
    <Button></Button>
    <Button></Button>
</ControlGroup>
<ControlGroup>
    <Button></Button>
    <Button></Button>
    <Button></Button>
</ControlGroup>
```

- 위처럼 사용하면 3개 버튼과 3개 버튼이 각각 그룹화되어 떨어져 있도록 화면에 표시됩니다.
