const test = document.getElementById("test");
const img1 = document.getElementById("img_split");
// every pixel image is a collection of pixels; as in a 320x320 image has 1 color per pixel for 320x320 items
// make a fxn that gets the color of each pixel
function draw(img) {
    var canvas = document.createElement("canvas");
    //create canvas
    var c = canvas.getContext('2d');
    //get height and width
    c.width = canvas.width = img.width;
    c.height = canvas.height = img.height;
    //supplant the img onto the canvas
    c.drawImage(img1, 0, 0);
    // get each pixel
    var x = 100;
    var y = 100;
    var imageData = c.getImageData(0, 0, 10, 10);
    console.log(imageData.data);
    var index = (x + y * imageData.width) * 4;
    var r = imageData.data[index];
    var g = imageData.data[index + 1];
    var b = imageData.data[index + 2];
    var a = imageData.data[index + 3];
    console.log(`RGBA:(${r},${g},${b},${a})`)

    var rowStart = y * imageData.width * 4;
    var pixelIndex = rowStart + x * 4;
    console.log(pixelIndex);
    return c;
};

test.addEventListener("click", () => {
    draw(img1);
});