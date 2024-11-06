import sharp from "sharp";

export default function convertImage(img) {
    sharp(img)
    .resize(256, 256)
    .toFile("images/newImg.pg");
};

sharp("./images/Cyndaquil (1).webp")
.resize(256,256)
.toFile("images/newImg.png")