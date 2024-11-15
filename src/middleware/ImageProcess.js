
export async function ImageProcess(imageFile) {
  
  return new Promise((resolve,reject)=>{

    const reader = new FileReader();

    reader.readAsDataURL(imageFile);

    reader.onload = (event) => {
      const imageUrl = event?.target?.result;
  
      const createImage = document?.createElement("img");
      createImage.src = imageUrl;
  
      createImage.onload = () => {
        let canvas = document?.createElement("canvas");
        // let ratio = WIDTH / e.target.width;
        canvas.width = 150;
        // canvas.height = e.target.height * ratio;
        canvas.height = 150;
  
  
        const contex = canvas.getContext("2d");
        contex.drawImage(createImage, 0, 0, canvas.width, canvas.height);
  
        resolve(contex.canvas.toDataURL("image/jpg", 90));
      };
    };

    reader.onerror = reject;

  })

}