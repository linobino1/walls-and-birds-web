import getOptimizedImageUrl from "~/util/getOptimizedImageUrl";
import Image from "../Image";
import classes from "./index.module.css";
import type { PressPhoto as PressPhotoType } from "payload/generated-types";

const sizes = [480, 640, 960, 1280, 1920, 2560];

export interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  image: PressPhotoType;
}

const formatFileName = (photo: PressPhotoType, size: number) => {
  let name = photo?.caption || photo?.rights || "photo";
  name = name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  name = `walls_and_birds_${name}_${size}p.jpg`;
  return name;
};

export const PressPhoto: React.FC<Props> = ({ image }) => {
  return (
    <div className={classes.container}>
      <Image
        media={image}
        srcSet={sizes.map((size) => ({
          size: `${size}w`,
          options: {
            width: size,
          },
        }))}
        sizes={"(min-width: 800px) 800px, 100vw"}
      />
      <div className={classes.bar}>
        <div>
          {image.caption}, © {image.rights}
        </div>
        {sizes.map((size) => {
          if (size > (image.width ?? Infinity)) return null;
          return (
            <a
              key={size}
              href={getOptimizedImageUrl(image.url ?? "test", { width: size })}
              download={formatFileName(image, size)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {size}p
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default PressPhoto;
