# SyncMapGroup

- `SyncMapGroup`의 자식들로 오는 `SyncMap`
  들의 상태값을 서로 공유하게 만들기 위한 컨텍스트 프로바이더를 가진 컴포넌트입니다.
- state, setter를 내려주고 있으며 컨텍스트에서 조정된 값들로 `SyncMap`의 프로퍼티들이 전부 교체되어 값이 조정됩니다.

# SyncMap

- `SyncMap`은 `MapContainer` 컴포넌트와 90% 같습니다.
- 다만 `SyncMapGroup` 에서 내려주는 컨텍스트를 활용해 자신의 값을 다른 `SyncMap` 컴포넌트들과 공유한다는 점에서 차이가 있습니다.
