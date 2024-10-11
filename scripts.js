window.onload = myCanvas;

let can1;
let can2;
let can3;
let can4;

function myCanvas() {
    var canvas = document.getElementById("canvas_1");
    var canvas_context = canvas.getContext("2d");
    var canvas2 = document.getElementById("canvas_2");
    var canvas_context2 = canvas2.getContext("2d");

    var img = document.getElementById("img_split");
    // img, start_x, start_y, start_width, start_height, (clip to) x, y, width, height
    can1 = canvas_context.drawImage(img, 0, 0, 160, 320, 0, 0, 160, 320);
    can2 = canvas_context.drawImage(img, 160, 0, 160, 320, 170, 0, 160, 320);
    can3 = canvas_context2.drawImage(img, 0, 0, 320, 160, 0, 0, 320, 160);
    can4 = canvas_context2.drawImage(img, 0, 160, 320, 160, 0, 170, 320, 160);
};

console.log(can1, can2, can3, can4);