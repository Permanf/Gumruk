function blobToFile(theBlob, fileName){
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }
  
const ConvertToFile = async (image, format) =>{
    let blobBin = atob(image.split(',')[1]);
    let array = [];
    for(let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
    }
    let file =new Blob([new Uint8Array(array)], {type: format});
    return blobToFile(file, "IMAGE-" + Date.now())
}
export default ConvertToFile;