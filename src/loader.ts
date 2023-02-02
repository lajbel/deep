// Loads all assets
import k from "./main";

export default function loadAssets() {
    k.loadSprite("bean", "sprites/bean.png");
    k.loadSprite("timmy", "sprites/timmy.png");

    k.loadBitmapFont("happy", "fonts/happy_28x36.png", 28, 36);
}
