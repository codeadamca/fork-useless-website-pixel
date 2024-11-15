import sharp from "sharp";

export default function convertImage(img) {
    sharp(img)
    .resize(256, 256)
    .toFile("images/newImg.png");
};

sharp("./images/14551232231_118ce0759e.jpg")
.resize(256,256)
.toFile("images/newImg1.png")