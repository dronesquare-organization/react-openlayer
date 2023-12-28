# context hook

- `incontext` 내부에 위치한 훅들은 모두 각각에 속해있는 컨텍스트 프로바이더 아래에서 사용 가능한 훅들입니다.
- 사용법은 매뉴얼 홈페이지를 참고 바랍니다.

## useDrawSource

- DrawButton 으로 그려진 어노테이션들이 모여있는 `VectorSource` 입니다.
- `VectorSource` 를 통해 안에 들어있는 피처들에 대한 조작이 가능합니다.

## useFeatureStore

- 선택된 피처들을 담고 있는 컨텍스트 훅입니다.
- 피처들을 선택하는 콜백함수와 선택된 피처 상태를 반환합니다.

## useFullScreen

- 전체화면을 통제할 수 있는 훅입니다.

## useHoverCursor

- 인자로 지도 객체를 받으며 지도 객체 안에 있는 어노테이션에 반응해 마우스 모양이 `pointer` 로 변경됩니다.

## useInteractionEvent

- 기본적으로 `onClick`, `onHover` 두가지 동작을 제공합니다.
- `annotation` 키 값으로 받는 `VectorLayer<VectorSource<Geometry>>` 안에서의 피처들에 반응합니다.

## useMap

- 사용하고 있는 지도 객체를 반환합니다

## useMapEventHandler

- `Drag`, `Click`, `DoubleClick`, `Hover`, `MapLoaded`, `LoadStart`, `TileLoadEnd` 이벤트를 다룹니다.
- `Click`, `DoubleClick`, `Hover` 는 이벤트와 이벤트가 발생한 지도의 좌표값을 반환합니다.

## useMapRotation

- 현재 지도의 회전 상태 값을 반환하고
- 지도를 회전시킬 수 있는 함수를 제공합니다.

## useSelectAnnotation

- `useSelectAnnotation` 훅을 통해 어노테이션을 선택해 `FeatureStore`에 선택한 어노테이션 정보를 저장합니다.

## useSyncContext

- `SyncMap` 들을 그룹으로 묶은 `SyncMapGroup` 컴포넌트 아래에서 사용가능합니다.
- 다수의 `SyncMap`들을 한번에 같은 값으로 통제하기 위해 사용됩니다.
- `center`, `zoom`, `wheel`, `rotate`를 조정 가능합니다.
