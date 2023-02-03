import k, { BLACK } from "./main";

export default () =>
    k.scene("menu", () => {
        k.add([
            k.pos(k.center().x, k.height() - 100),
            k.anchor("center"),
            k.text("Start the SHOW", { align: "center", size: 22 }),
            k.color(BLACK),
            k.area(),
            "button",
            {
                toScene: "game",
            },
        ]);

        k.onClick("button", (btn) => {
            k.go(btn.toScene);
        });
    });
