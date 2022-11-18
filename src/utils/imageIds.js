// import axios from 'axios'
import { size } from "lodash";

export const modifyImageIds = (existingImages, imageItem) => {
  console.log(existingImages, "-duranlar");
  console.log(imageItem, "---tazegelenler");
  existingImages.push(imageItem);
  //   let images = [];
  //   //   old array
  //   for (let i = 0; i < existingImages.length; i++) {
  //     images[i] = existingImages[i];
  //   }
  //   // new array
  //   for (let i = 0; i < imagesArray.length; i++) {
  //     const id = size(existingImages) + i;

  //     images[id] = imagesArray[i];
  //     // images = [...images, ([id] = imagesArray[i])];
  //   }
  console.log(existingImages, "--return");

  return existingImages;
};
