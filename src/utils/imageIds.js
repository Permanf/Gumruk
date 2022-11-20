export const modifyImageIds = (existingImages, imageItem) => {
  // console.log(existingImages, "-duranlar");
  // console.log(imageItem, "---tazegelenler");
  existingImages.push(imageItem);
  // console.log(existingImages, "--return");

  return existingImages;
};
