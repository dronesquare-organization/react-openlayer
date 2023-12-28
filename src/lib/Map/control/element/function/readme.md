# MoveAnnotation & ModifyAnnotation & DeleteAnnotation

- `MoveAnnotation` 은 현재 선택된 어노테이션 상태를 다루는 `useSelectAnnotation` 훅을 핵심으로 사용합니다
- 어노테이션이 선택되면 변환 이벤트에 등록이 되고
- 어노테이션 변환이 완료되면 최종 형태를 반환합니다.
- 이 최종값을 통해 어노테이션을 수정할 수 있습니다.
