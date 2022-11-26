export const modifyImageIds = (existingImages, imageItem) => {
  // console.log(existingImages, "-duranlar");
  // console.log(imageItem, "---tazegelenler");
  existingImages.push(imageItem);
  existingImages = existingImages.filter((item) => item !== null);
  // console.log(existingImages, "--return");
  if (imageItem == null) {
    return [];
  } else {
    return existingImages;
  }
};
