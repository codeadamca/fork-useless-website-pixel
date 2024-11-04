import sharp from "sharp";

sharp("./images/Cyndaquil (1).webp")
.resize(256,256)
.toFile("images/newImg.png")