// const { decode, encode } = require("node-base64-image");
const { converBase64ToImage } = require("convert-base64-to-image");
const fs = require("fs");

const imageSaveFunc = (
  imageBase64Url,
  uniqueId,
  userName,
  folderName,
  next
) => {
  try {
    if (imageBase64Url) {   //If imageBase64Url
      const freshName = userName?.toLowerCase().replaceAll(" ", "");
      const imagePath = `${folderName}/${freshName +"_"+ uniqueId}.jpg`;
      const imagePathAddPublic = "./public/" + imagePath;

      converBase64ToImage(imageBase64Url, imagePathAddPublic); //Convert Base64 to Image File
      
      return imagePath;   //Return New Image Path
    }
  } catch (error) {
    next(error);
  }
};



//Image delete
const imageDeleteFunc = (imagePath,next) => {

  try {
    fs.unlinkSync(`public/${imagePath}`); //Image delete
    return true;
  } catch (error) {
    next(error);
  }
  
};

module.exports = { imageSaveFunc, imageDeleteFunc };
