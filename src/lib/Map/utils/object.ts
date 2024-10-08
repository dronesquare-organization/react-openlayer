import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Text from "ol/style/Text";

type makeTextArgs = {
  text: string;
  size?: number;
  color?: string;
  outline?: boolean;
  isMarker?: boolean;
};

export const icon = {
  marker: "",
  selected: "",
  imageMarker: { selected: "", zero: "", one: "", two: "", three: "" },
  imageCircleMarker: {
    BLUE: "",
    BROWN: "",
    GREEN: "",
    RED: "",
    ROYAL_BLUE: "",
    SELECT: "",
    SKYBLUE: "",
    YELLOW: "",
  },
};

export const makeText = ({
  text = "",
  size = 15,
  color = "black",
  outline = true,
  isMarker = false,
}: makeTextArgs) => {
  const textInstance = new Text({
    text,
    textAlign: "center",
    font: `${size}px roboto, sans-serif`,
    fill: new Fill({
      color,
    }),
    offsetY: isMarker ? -50 : 0,
    overflow: true,
    stroke: outline
      ? new Stroke({
          color: "white",
          width: 3,
        })
      : undefined,
  });
  return textInstance;
};
