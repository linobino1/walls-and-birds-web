import classes from "./index.module.css";
import type { PressPhoto as PressPhotoType } from "payload/generated-types";

type ImageSize = keyof Required<PressPhotoType>["sizes"];

export interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  image: PressPhotoType;
}

const formatFileName = (photo: PressPhotoType, size: ImageSize) => {
  let name = photo?.caption || photo?.rights || "photo";
  name = name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  name = `walls_and_birds_${name}.jpg`;
  if (size && photo?.sizes && photo?.sizes[size]) {
    name = name.replace(
      ".jpg",
      `_${photo?.sizes[size]?.width}x${photo?.sizes[size]?.height}.jpg`
    );
  }
  return name;
};

export const PressPhoto: React.FC<Props> = ({ image }) => {
  return (
    <div className={classes.container}>
      <img
        src={image.url as string}
        alt={image.caption || ""}
        width={image.width || undefined}
        height={image.height || undefined}
        srcSet={
          image.sizes &&
          Object.values(image.sizes)
            .map((item) => `${item.url} ${item.width}w`)
            .join(", ")
        }
      />
      <div className={classes.bar}>
        <div>
          {image.caption}, © {image.rights}
        </div>
        {image.sizes &&
          Object.entries(image.sizes).map(([key, value]) => {
            return (
              <a
                key={key}
                href={value.url as string}
                download={formatFileName(image, key as ImageSize)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {value.width}p
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default PressPhoto;
