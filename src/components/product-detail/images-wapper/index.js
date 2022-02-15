import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function ImagesWapper({ images = [] }) {
  
  const listImages = images.map((image, index) => (
    <div key={index}>
      <img src={image.large_url} alt={image.label} />
    </div>
  ));

  return <Carousel showArrows={true}>{listImages}</Carousel>;
}
