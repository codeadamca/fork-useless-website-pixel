const test = document.getElementById("test");
const img1 = document.getElementById("img_split");
let arr = [];
// every pixel image is a collection of pixels; as in a 320x320 image has 1 color per pixel for 320x320 items
// make a fxn that gets the color of each pixel
function main() {
    //make a canvas of the image and get the image data
    const canvas = document.getElementById("canvas");
    canvas.width = img1.width;
    canvas.height = img1.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img1, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return imageData;
};

function buildRGB(imageData) {
    // make an empty array
    const rgbValues = [];
    // loop through imagedata and get the rgb values for each 
    for(let i = 0; i < imageData.length; i += 4) {
        const rgb = {
            r: imageData[i],
            g: imageData[i + 1],
            b: imageData[i + 2],
        };
        rgbValues.push(rgb);
    }
    return rgbValues;
}

test.addEventListener("click", () => {
    //get the image data
    let imageD = main();
    console.log(imageD);
    // get an array with all the rgb values of the image
    arr = buildRGB(imageD.data);
    console.log(arr);
});