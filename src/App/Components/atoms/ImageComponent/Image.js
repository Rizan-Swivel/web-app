import React, { Suspense } from "react";
import { useImage } from "react-image";
import { Spinner } from "../Spinner";

function ImageComp({ image, customClasses }) {
  const { src } = useImage({
    srcList: image,
  });
  return (
    <img
      alt=""
      src={src}
      loader={<Spinner type={"CircleLoader"} loading={true} color="green"/>}
      className={customClasses}
    />
  );
}

export default function ImageComponent({ image, customClasses }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ImageComp image={image} customClasses={customClasses}/>
    </Suspense>
  );
}
