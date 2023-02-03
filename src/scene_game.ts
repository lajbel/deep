import k, { GLOBAL_TEXT_STYLES, BLACK } from "./main";
import addCharacter from "./obj_character";

function captionsC() {
    return {
        id: "captionsC",
        require: [],

        setCaption(text: string) {
            this.text = text;
        },
    };
}

export default () =>
    k.scene("game", async () => {
        k.setBackground(k.Color.fromHex("#6d80fa"));

        // Caption
        const caption = k.add([
            k.pos(k.width() / 2, 10),
            k.anchor("top"),
            k.text("Welcome to the my deep secret", {
                size: 14,
                letterSpacing: -1,
                align: "center",
                styles: GLOBAL_TEXT_STYLES,
            }),
            k.color(BLACK),
            k.scale(2),
            captionsC(),
        ]);

        // The gay boy
        const p1 = addCharacter("timmy");

        p1.appear();
        await k.wait(1);
        p1.stepRight();
        await k.wait(0.5);
        p1.stepRight();
        await k.wait(0.5);
        p1.stepRight();
        await k.wait(0.5);
        p1.stepRight();
    });
