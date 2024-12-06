const renderButton = document.getElementById("renderButton");
const imageSource = document.getElementById("imageSource");

const imageWidth = imageSource.width;
const imageHeight = imageSource.height;

const mergeDimension = 16;

const targetWidth = imageSource.width / mergeDimension;
const targetHeight = imageSource.height / mergeDimension;

let arr = [];
let commonKeys = [];

// every pixel image is a collection of pixels; as in a 320x320 image has 1 color per pixel for 320x320 items
// make a fxn that gets the color of each pixel
function getImageData() {
  //make a canvas of the image and get the image data
  const canvasOriginal = document.getElementById("canvasOriginal");
  canvasOriginal.width = imageSource.width;
  canvasOriginal.height = imageSource.height;
  const contextOriginal = canvasOriginal.getContext("2d");
  contextOriginal.drawImage(imageSource, 0, 0);

  const imageData = contextOriginal.getImageData(
    0,
    0,
    canvasOriginal.width,
    canvasOriginal.height
  );

  console.log("Image is " + imageWidth + " x " + imageHeight);
  console.log("Target is " + targetWidth + " x " + targetHeight);
  console.log("Total data values " + imageData.data.length);

  return imageData;
}

function getRgbaValues(imageData) {
  // Make an empty array
  const rgbaValues = [];

  // Add to colours in groups of four
  for (let i = 0; i < imageData.length; i += 4) {
    const rgba = {
      r: imageData[i],
      g: imageData[i + 1],
      b: imageData[i + 2],
      a: imageData[i + 3],
    };
    rgbaValues.push(rgba);
  }

  console.log("There are " + rgbaValues.length + " colours");

  return rgbaValues;
}

function getPopularColours(imageData) {
  // make a map to house the different color codes
  // let map = new Map();

  // array to push the most common colour to
  let tracking = [];
  let popularColours = [];

  // array to house each most common colour in order
  let keys = [];

  // set a counter so every 16 pixels you push the most common element to an array and reset
  let count = 0;

  for (let i = 0; i < imageData.length; i++) {
    let row = Math.floor(i / imageWidth / mergeDimension);
    let column = Math.floor((i % imageWidth) / mergeDimension);

    let red = imageData[i].r;
    let green = imageData[i].g;
    let blue = imageData[i].b;
    let alpha = imageData[i].a;
    let colourLabel = `${red}-${green}-${blue}-${alpha}`;

    if (tracking[row] == undefined) {
      tracking[row] = new Array();
    }
    if (tracking[row][column] == undefined) {
      tracking[row][column] = new Array();
    }

    if (tracking[row][column][colourLabel] == undefined) {
      tracking[row][column][colourLabel] = 1;
    } else {
      tracking[row][column][colourLabel]++;
    }
  }

  for (let i = 0; i < tracking.length; i++) {
    for (let j = 0; j < tracking[i].length; j++) {
      if (popularColours[i] == undefined) {
        popularColours[i] = new Array();
      }
      if (popularColours[i][j] == undefined) {
        popularColours[i][j] = new Array();
      }

      let max = 0;
      let maxValue = "";

      // console.log(tracking[i][j].length);
      // console.log(tracking[i][j]);

      for (key in tracking[i][j]) {
        if (tracking[i][j][key] > max) {
          max = tracking[i][j][key];
          maxValue = key;
        }
      }

      popularColours[i][j] = key;
    }
  }

  return popularColours;
}

function paintCanvas() {
  const canva = document.getElementById("canvasNew");
  let context = canva.getContext("2d");
  canva.width = 64;
  canva.height = 64;
  let imageData = context.createImageData(canva.width, canva.height);
  console.log(imageData);
  let data = imageData.data;
  let split = [];
  commonKeys.forEach((entry) => {
    split.push(entry.split(","));
  });
  console.log(split);

  let count = 0;
  for (let i = 0; i < 64 * 64 * 4; i += 4) {
    data[i] = split[count][0];
    data[i + 1] = split[count][1];
    data[i + 2] = split[count][2];
    data[i + 3] = split[count][3];
    count++;
  }

  // console.log(imageData);

  context.putImageData(imageData, 0, 0);
}

renderButton.addEventListener("click", () => {
  // Get the image data
  let imageData = getImageData();

  // Convert image data to RGBA values
  let rgbaValues = getRgbaValues(imageData.data);
  // console.log(rgbaValues);

  // Get an array with the most common colour for each 16 pixels
  let popularColours = getPopularColours(rgbaValues);
  console.log(popularColours);

  // console.log(commonKeys); //array of 64x64
  // paintCanvas();
});

//to do:
// have an image upload feature #5
// use php or node to upload image #6
// use built in method to convert the image to 16x16 #1 scratch
// find the most popular colour in that square #2 done
// push that colour as square for (x,y) array #3 done
// colour the array images #4
