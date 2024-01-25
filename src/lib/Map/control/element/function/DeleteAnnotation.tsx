import React, { useCallback, useId } from "react";
import { Button, ButtonProps } from "../Button";
import { useEffect, useRef } from "react";
import { Select } from "ol/interaction";
import { SelectEvent } from "ol/interaction/Select";
import VectorSource from "ol/source/Vector";
import { BiSolidEraser } from "react-icons/bi";
import { useMap, useSelectAnnotation } from "../../../hooks";
import { useFeatureStore } from "src/lib/Map/hooks/incontext/useFeatureStore";
import { useControlSection } from "../../layout";
import { InnerButton } from "../InnerButton";
import useDrawSource from "src/lib/Map/hooks/incontext/useDrawSource";

export interface DeleteAnnotationProps extends ButtonProps {
  onDeleteChange?: (e: SelectEvent) => void;
}

export function DeleteAnnotation({
  onDeleteChange,
  ...props
}: DeleteAnnotationProps) {
  const clickedAnnotation = useSelectAnnotation();
  const { selectFeature } = useFeatureStore();
  const map = useMap();
  const id = useId();
  const buttonId = `controlbutton-${id}`;
  const { selectButton, selectedButtonId } = useControlSection();
  const { drawVectorSource } = useDrawSource();
  const isActive = buttonId === selectedButtonId;
  const selectInteractionRef = useRef<Select | null>(null);

  // 선택한 곳에 geometry를 가지고 있는 피처가 있으면
  // 피처의 properties를 참고해 그 안에 있는 벡터에서 해당 피처를 제거
  // 제거됨과 동시에 선택해제
  const removeSelectedFeatures = useCallback(
    (event: SelectEvent) => {
      const selectedFeatures = event.selected;
      selectFeature(null);

      const target = selectedFeatures.find((selectedFeature) =>
        selectedFeature.getGeometry()
      );

      if (target) {
        const vectorSource = target.getProperties().source as VectorSource;
        vectorSource.removeFeature(target);
        if (onDeleteChange) {
          onDeleteChange(event);
        }
        drawVectorSource.removeFeature(target);
        selectButton("");
      }
    },
    [onDeleteChange, selectFeature]
  );

  // select 이벤트를 통해 removeSelectedFeatures 동작 실행되도록 이벤트 설정
  useEffect(() => {
    if (isActive) {
      if (!selectInteractionRef.current) {
        selectInteractionRef.current = new Select();
        selectInteractionRef.current.on("select", removeSelectedFeatures);
        selectButton(buttonId);
        map.addInteraction(selectInteractionRef.current);
      }
    } else {
      if (selectInteractionRef.current) {
        selectInteractionRef.current.un("select", removeSelectedFeatures);
        map.removeInteraction(selectInteractionRef.current);
        selectInteractionRef.current = null;
      }
    }
  }, [map, isActive, removeSelectedFeatures]);

  useEffect(() => {
    if (selectInteractionRef.current && clickedAnnotation) {
      selectInteractionRef.current.getFeatures().clear();
      selectInteractionRef.current.getFeatures().push(clickedAnnotation);
    }
  }, [clickedAnnotation]);

  return (
    <Button
      id={buttonId}
      hasPopup
      popupText="Delete"
      onClick={() => {
        if (!isActive) {
          selectButton(buttonId);
        } else {
          selectButton("");
        }
      }}
      isActive={isActive}
      {...props}
    >
      <InnerButton isActive={isActive}>
        <BiSolidEraser size={26} color={isActive ? "white" : "black"} />
      </InnerButton>
    </Button>
  );
}
