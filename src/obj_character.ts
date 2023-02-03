import k, { BLACK, GLOBAL_TEXT_STYLES } from "./main";

export function paperCharacter() {
    const turnEffects = {
        calm: k.easings.easeInOutSine,
        surprised: k.easings.easeInOutBack,
    };

    return {
        id: "paperCharacter",
        require: [],

        isLastRotateLeft: false,
        inRotate: false,

        dialogueBox: undefined,

        appear() {
            k.tween(
                this.pos.y,
                k.height() + 34,
                0.5,
                (v) => (this.pos.y = v),
                k.easings.easeInOutBack
            );
        },

        turnAround(dir?: number, effect?: string) {
            k.tween(
                this.scale.x,
                dir ?? -1,
                0.5,
                (v) => (this.scale.x = v),
                turnEffects[effect ?? "calm"]
            );
        },

        turnLeft(effect?: string) {
            this.turnAround(-1, effect);
        },

        turnRight(effect?: string) {
            this.turnAround(1, effect);
        },

        turnDissapear(effect?: string) {
            this.turnAround(0, effect);
        },

        stepRight() {
            const rotateFactor = this.isLastRotateLeft ? 10 : -10;

            // Do the movement
            k.tween(
                this.pos.x,
                this.pos.x + 20,
                0.5,
                (v) => (this.pos.x = v),
                k.easings.easeOutCirc
            );

            // Then a jump
            k.tween(
                this.pos.y,
                this.pos.y - 10,
                0.3,
                (v) => (this.pos.y = v),
                k.easings.easeInCirc
            ).onEnd(() => {
                k.tween(
                    this.pos.y,
                    this.pos.y + 10,
                    0.2,
                    (v) => (this.pos.y = v),
                    k.easings.easeOutCirc
                );
            });

            // Then a little rotation
            k.tween(
                this.angle,
                this.angle + rotateFactor,
                0.3,
                (v) => (this.angle = v),
                k.easings.easeInExpo
            );

            this.isLastRotateLeft = !this.isLastRotateLeft;
        },

        say(text: string) {
            this.dialogueBox.text = text;
        },
    };
}

export default function addCharacter(sprite: string) {
    const character = k.add([
        k.pos(k.width() / 2, k.height() + 400),
        k.rotate(5),
        k.anchor("bot"),
        k.sprite(sprite),
        k.scale(1),
        paperCharacter(),
    ]);

    character.dialogueBox = k.add([
        k.pos(),
        k.follow(character, k.vec2(60, -200)),
        k.text("sample text", { size: 18, styles: GLOBAL_TEXT_STYLES }),
        k.color(BLACK),
    ]);

    return character;
}
