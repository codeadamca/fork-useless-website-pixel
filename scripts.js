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

function commonCol(imgdata) {
    // make an array to house the different color codes
    let map = new Map();
    // set a counter so every 16 pixels you push the most common element to an array and reset
    let count = 0;
    for (let i = 0; i < imgdata.length; i ++) {
        if (count < 17) {
            let red = imgdata[i].r;
            let green = imgdata[i].g;
            let blue = imgdata[i].b;
            let col = `${red},${green},${blue}`;
            if (!map.has(col)) {
                map.set(col,1);
            } else {
                map.set(col, map.get(col)+1);
            }
            console.log(map);
        }
    }
        
    // console.log(map);
}

test.addEventListener("click", () => {
    //get the image data
    let imageD = main();
    console.log(imageD);
    // get an array with all the rgb values of the image
    arr = buildRGB(imageD.data);
    console.log(arr);
    commonCol(arr);
});

//to do: 
// have an image upload feature #5
// use php or node to upload image #6
// use built in method to convert the image to 16x16 #1 scratch
// find the most popular colour in that square #2
// push that colour as square for (x,y) array #3
// colour the array images #4