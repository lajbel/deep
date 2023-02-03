import kaboom from "kaboom";
import loadAssets from "./loader";
import loadGameScene from "./scene_game";
import loadMenuScene from "./scene_menu";

const k = kaboom({
    width: 640,
    height: 360,
    scale: 2,
    crisp: false,
    font: "happy",
    background: [204, 66, 94],
    burp: true,
});

export default k;

export const BLACK = k.Color.fromHex("#1f102a");
export const GLOBAL_TEXT_STYLES = {
    wavy: (idx, ch) => ({
        pos: k.vec2(0, k.wave(-4, 4, k.time() * 6 + idx * 0.5)),
    }),
};

// Load assets and scenes
loadAssets();
loadGameScene();
loadMenuScene();

// Default scene
k.onLoad(() => {
    k.go("game");
});
