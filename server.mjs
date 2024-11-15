import sharp from "sharp";

export default function convertImage(img) {
    sharp(img)
    .resize(256, 256)
    .toFile("images/newImg.png");
};

sharp("./images/ameenfahmy-gcWd0ts4RCo-unsplash.jpg")
.resize(256,256)
.toFile("images/newImg2.png")