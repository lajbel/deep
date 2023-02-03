// Loads all assets
import k from "./main";

export default function loadAssets() {
    k.loadSprite("bean", "sprites/bean.png");
    k.loadSprite("timmy", "sprites/timmy.png");
    k.loadSprite("father", "sprites/father.png");

    k.loadBitmapFont("happy", "fonts/happy_28x36.png", 28, 36);

    k.onLoading((progress) => {
        // Black background
        k.drawRect({
            width: k.width(),
            height: k.height(),
            color: k.rgb(0, 0, 0),
        });

        // A pie representing current load progress
        k.drawCircle({
            pos: k.center(),
            radius: 32,
            end: k.map(progress, 0, 1, 0, 360),
        });

        k.drawText({
            text: "loading" + ".".repeat(k.wave(1, 4, k.time() * 12)),
            font: "monospace",
            size: 24,
            anchor: "center",
            pos: k.center().add(0, 70),
        });
    });
}
