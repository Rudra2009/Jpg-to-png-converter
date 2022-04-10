const JPG_to_PNG_converter = (() => {
  function converter(imageFileBlob, options) {
    options = options || {};


  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const imageElement = createImage();
  const downloadLink = document.createElement("a");

  function createImage(options) {
    options = options || {};
    const img = document.createElement("img");

    img.style.width = options.width ? `${options.width}px` : "auto";
    img.style.height = options.height ? `${options.height}px` : "auto";
    return img;
  }

  function updateDownloadLink(jpgFilename, pngblob) {
    const linkElement = downloadLink;
    const pngFileName = jpgFilename.replace(/jpe?g/i, "png");

    linkElement.setAttribute("download", pngFileName);
    linkElement.href = URL.createObjectURL(pngblob);

    downloadLink.click();
  }

  function process() {
    const imageURL = URL.createObjectURL(imageFileBlob);

    imageElement.addEventListener("load", (e) => {
      canvas.width = e.target.width;
      canvas.height = e.target.height;
      context.drawImage(e.target, 0, 0, e.target.width, e.target.height);
      canvas.toBlob(
        updateDownloadLink.bind(window, imageFileBlob.name),
        
      );
    });
    imageElement.src = imageURL;
  }
  return {
    process: process,
  };
  }
  return converter
})();

const imagefileElement = document.querySelector(".jpg-img-uploader");

imagefileElement.addEventListener("change", event => {
  const jpgImageFileBlob = event.currentTarget.files[0];

  if (jpgImageFileBlob.type.match(/image\/jpe?g/i) !== null) {
    JPG_to_PNG_converter(jpgImageFileBlob).process();
  } else {
    alert
    (`Not a jpg file choose a "jpg" file Noob. So that i can change it into a png`)
  }
});
