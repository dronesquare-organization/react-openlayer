import React, { useId } from "react";
import { useEffect, useRef, useState } from "react";
import { Draw } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import { DrawEvent } from "ol/interaction/Draw";
import { Feature } from "ol";
import { Geometry, Point } from "ol/geom";
import { Text, Fill, Stroke, Circle } from "ol/style";
import { ANNOTATION_COLOR } from "../../../constants/color";
import { useMap } from "../../../hooks";
import { Button, ButtonProps } from "../Button";
import { MultiPointIcon } from "../../../constants/icons/MultiPointIcon";
import { useControlSection } from "../../layout";
import { InnerButton } from "../InnerButton";
import useDrawSource from "src/lib/Map/hooks/incontext/useDrawSource";

export interface MultiPointDrawButtonProps extends ButtonProps {
  /**
   * @description You can get Multipoint feature what was made by callback function.
   */
  onEnd?: (features: Feature<Geometry>[]) => void;

  /**
   * @description You can set callback Fn on 'start' event.
   */
  onStart?: () => void;

  /**
   * @default false
   * @description Well... Sometimes you need this drawing tool with using server waht containes DB. if 'onCanvas' set false, react-openlayer will not draw feature on canvas.
   */
  onCanvas?: boolean;
}

export function MultiPointDrawButton({
  onEnd,
  onClick,
  onCanvas = false,
  onStart,
  ...props
}: MultiPointDrawButtonProps) {
  const map = useMap();

  const id = useId();
  const buttonId = `controlbutton-${id}`;
  const { selectButton, selectedButtonId } = useControlSection();
  const isActive = buttonId === selectedButtonId;
  const drawVectorSource = useRef(new VectorSource({}));
  const vectorLayerRef = useRef(
    new VectorLayer({
      zIndex: 10,
      source: drawVectorSource.current,
    })
  );
  const drawRef = useRef(
    new Draw({
      source: drawVectorSource.current,
      type: "MultiPoint",
    })
  );

  const [features, setFeatures] = useState<Feature<Geometry>[]>([]);
  // const [isDrawing, setIsDrawing] = useState(false);

  // drawRef에 위치한 MultiPoint 타입의 Draw 객체를 map addInteraction 추가한 순간부터 draw가 시작됩니다.
  // 현재 그리는 상태인지를 표시하기 위해 map 객체에 properties를 두고 있으며 isDrawing이 그 상태를 나타냅니다.
  const startDrawing = () => {
    if (onClick) {
      onClick();
    }

    if (onStart) {
      onStart();
    }
    map.setProperties({ isDrawing: true });
    map.addInteraction(drawRef.current);
  };

  // 멀티포인트는 드로잉이 두단계로 나뉘어 진행됩니다.
  // 군집되는 멀티포인트가 추가되는 단계와 최종으로 그리기가 마무리 되는 단계입니다.
  // drawing 함수는 군집한 멀티포인트가 추가되는 단계에서 사용되는 함수입니다.
  // 추가되는 각 포인트의 프로퍼티들에 정보가 추가됩니다.
  const drawing = (event: DrawEvent) => {
    const feature = event.feature;
    const geometry = feature.getGeometry() as Point;
    // 여기서 추가된 정보는 마우스로 피처를 클릭하고 어떤 동작을 하기 위해 추가했습니다.
    feature.setProperties({
      shape: "MultiPoint",
      isModifying: false,
      source: drawVectorSource.current,
      layer: vectorLayerRef.current,
      positions: geometry.getCoordinates(),
    });

    // 군집한 포인트들을 모아 한번에 마무리하기 위해 상태에 올려둡니다.
    setFeatures([...features, feature]);
  };

  // 멀티포인트 드로잉이 최종 마무리되면 onEnd에 모은 포인트들이 반환되고
  // removeInteraction을 통해 드로우 모드가 해체됨과 동시에 맵의 properties 안에 isDrawing이 false로 변경됩니다.
  // setTimeout이 걸려있는 이유는 isDrawing을 바라보는 다른 기능에서, isDrawing이 false가 되자마자 특정 동작을 시작하는데 드로잉이 완료될때까지 시간이 걸려 큐를 달리하기 위해 들어가 있습니다.
  const completeDrawing = () => {
    if (onEnd && features.length > 0) {
      onEnd(features);
    }
    if (!onCanvas) {
      drawVectorSource.current.clear();
    }
    setFeatures([]);
    map.removeInteraction(drawRef.current);
    setTimeout(() => map.setProperties({ isDrawing: false }), 100);
  };

  useEffect(() => {
    const drawingInstance = drawRef.current;

    drawingInstance.on("drawend", drawing);

    return () => {
      drawingInstance.un("drawend", drawing);
    };
  }, [features]);

  useEffect(() => {
    if (!isActive) {
      map.removeInteraction(drawRef.current);
    }
  }, [isActive, map]);

  useEffect(() => {
    map.addLayer(vectorLayerRef.current);
  }, [map]);

  useEffect(() => {
    features.forEach((feature, index) => {
      const style = new Style({
        image: new Circle({
          radius: 10,
          fill: new Fill({
            color: ANNOTATION_COLOR.BLUE.fill(1), // 원의 색상
          }),
          stroke: new Stroke({
            color: ANNOTATION_COLOR.BLUE.stroke(1), // 테두리 선의 색상
            width: 2,
          }),
        }),
        text: new Text({
          text: String(1 + index), // 포인트의 순번 값을 텍스트로 표시
          font: "bold 15px sans-serif",
          textAlign: "center",

          fill: new Fill({
            color: "#000",
          }),
          stroke: new Stroke({
            color: "#fff",
            width: 3,
          }),
        }),
      });
      feature.setStyle(style);
    });
  }, [features]);

  return (
    <Button
      id={buttonId}
      hasPopup
      popupText="Multi Point"
      onClick={() => {
        if (!isActive) {
          startDrawing();
          selectButton(buttonId);
        } else {
          completeDrawing();
          selectButton("");
        }
      }}
      // isActive={isActive}
      isActive={selectedButtonId === buttonId}
      {...props}
    >
      <InnerButton isActive={isActive}>
        <MultiPointIcon size={26} color={isActive ? "white" : "black"} />
      </InnerButton>
    </Button>
  );
}
