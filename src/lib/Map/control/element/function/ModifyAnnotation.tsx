import React, { useId } from "react";
import { Button, ButtonProps } from "../Button";
import { useCallback, useEffect, useRef } from "react";
import { Modify } from "ol/interaction";
import { doubleClick } from "ol/events/condition";
import { Collection } from "ol";
import { ModifyEvent } from "ol/interaction/Modify";
import { ModifyIcon } from "../../../constants/icons/ModifyIcon";
import { useMap, useSelectAnnotation } from "../../../hooks";
import { useControlSection } from "../../layout";

export interface ModifyAnnotationProps extends ButtonProps {
  onModifyChange?: (e: ModifyEvent) => void;
}

export function ModifyAnnotation(props: ModifyAnnotationProps) {
  const clickedAnnotation = useSelectAnnotation();

  const modifyInteractionRef = useRef<Modify | null>(null);

  const map = useMap();
  const id = useId();
  const buttonId = `controlbutton-${id}`;
  const { selectButton, selectedButtonId } = useControlSection();
  const isActive = buttonId === selectedButtonId;
  const onModifyStart = useCallback(() => {
    if (clickedAnnotation) {
      const existProperties = clickedAnnotation.getProperties();
      const existMapProperties = map.getProperties();
      clickedAnnotation.setProperties({
        ...existProperties,
        isModifying: true,
      });

      map.setProperties({ ...existMapProperties, isModifying: true });
    }
  }, [clickedAnnotation]);

  const onModifyEnd = useCallback(
    (event: ModifyEvent) => {
      if (props.onModifyChange) {
        props.onModifyChange(event);
      }
      const existProperties = clickedAnnotation.getProperties();
      clickedAnnotation.setProperties({
        ...existProperties,
        isModifying: true,
      });
    },
    [clickedAnnotation, props.onModifyChange]
  );

  // 수정중임을 map 에 명시
  useEffect(() => {
    const existMapProperties = map.getProperties();
    map.setProperties({ ...existMapProperties, isModifying: isActive });
  }, [isActive]);

  useEffect(() => {
    if (clickedAnnotation && isActive) {
      if (!modifyInteractionRef.current) {
        modifyInteractionRef.current = new Modify({
          features: new Collection([clickedAnnotation]),
          deleteCondition: doubleClick,
        });
        modifyInteractionRef.current.on("modifystart", onModifyStart);
        modifyInteractionRef.current.on("modifyend", onModifyEnd);

        map.addInteraction(modifyInteractionRef.current);
      }
    } else {
      if (modifyInteractionRef.current) {
        modifyInteractionRef.current.un("modifystart", onModifyStart);
        modifyInteractionRef.current.un("modifyend", onModifyEnd);
        map.removeInteraction(modifyInteractionRef.current);
        modifyInteractionRef.current = null;
      }
    }

    return () => {
      if (modifyInteractionRef.current) {
        modifyInteractionRef.current.un("modifystart", onModifyStart);
        modifyInteractionRef.current.un("modifyend", onModifyEnd);
        map.removeInteraction(modifyInteractionRef.current);
        modifyInteractionRef.current = null;
      }
    };
  }, [clickedAnnotation, map, onModifyEnd, onModifyStart, isActive]);

  return (
    <Button
      id={buttonId}
      onClick={() => {
        if (isActive) {
          selectButton("");
        } else {
          selectButton(buttonId);
        }
      }}
      isActive={isActive}
      {...props}
    >
      <ModifyIcon />
    </Button>
  );
}
