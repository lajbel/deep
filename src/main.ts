import kaboom from "kaboom";

const k = kaboom({
	width: 640,
	height: 360,
	scale: 2,
	crisp: false,
	font: "happy",
	background: [204, 66, 94]
});

k.loadSprite("bean", "sprites/bean.png");
k.loadSprite("timmy", "sprites/timmy.png");

k.loadBitmapFont("happy", "fonts/happy_28x36.png", 28, 36);

const BLACK = k.Color.fromHex("#1f102a");

// Formated global text
const globalTextStyles = {
	"wavy": (idx, ch) => ({
		pos: k.vec2(0, k.wave(-4, 4, k.time() * 6 + idx * 0.5)),
	}),
}

// Components
function paperCharacter() {
	const turnEffects = {
		"calm": k.easings.easeInOutSine,
		"surprised": k.easings.easeInOutBack,
	}

	return {
		id: "paperCharacter",
		require: [],

		isLastRotateLeft: false,
		inRotate: false,

		dialogueBox: undefined,

		appear() {
			k.tween(this.pos.y, k.height() + 34, 0.5, (v) => this.pos.y = v, k.easings.easeInOutBack);
		},

		turnAround(dir?: number, effect?: string) {
			k.tween(this.scale.x, dir ?? -1, 0.5, (v) => this.scale.x = v, turnEffects[effect ?? "calm"]);
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

		pMove() {
			this.onUpdate(() => {
				this.moveTo(k.vec2(100, this.pos.y), 100);

				this.pos.y = k.height() - k.wave(0, -3, k.time() * 10);
			});
		},

		stepRight() {
			const rotateFactor = this.isLastRotateLeft ? 10 : -10;

			// Do the movement
			k.tween(this.pos.x, this.pos.x + 20, 0.5, (v) => this.pos.x = v, k.easings.easeOutCirc);
			
			// Then a jump
			k.tween(this.pos.y, this.pos.y - 10, 0.3, (v) => this.pos.y = v, k.easings.easeInCirc)
			.onEnd(() => {
				k.tween(this.pos.y, this.pos.y + 10, 0.2, (v) => this.pos.y = v, k.easings.easeOutCirc);
			})

			// Then a little rotation
			k.tween(this.angle, this.angle + rotateFactor, 0.3, (v) => this.angle = v, k.easings.easeInExpo);

			this.isLastRotateLeft = !this.isLastRotateLeft;
		},

		say() {

		}
	};
}

function captionsC() {
	return {
		id: "captionsC",
		require: [],

		setCaption(text: string) {
			this.text = text;
		}
	}
}

// Functions
function addCharacter(sprite: string) {
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
		k.text("sample text", { size: 18, styles: globalTextStyles }),
		k.color(BLACK),
	]);

	return character;
}

// Scenes
k.scene("game", async () => {
	k.setBackground(k.Color.fromHex("#6d80fa"))

	// Caption
	const caption = k.add([
		k.pos(k.width() / 2, 10),
		k.anchor("top"),
		k.text("Welcome to the my deep secret", { size: 14, letterSpacing: -1, align: "center", styles: globalTextStyles }),
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

k.scene("menu", () => {
	k.add([
		k.pos(k.center().x, k.height() - 240),
		k.anchor("center"),
		k.text("Start the SHOW", { align: "center", size: 16 }),
		k.color(BLACK),
		{
			toScene: "game"
		}
	]);
});

// Default scene
k.onLoad(() => {
	k.go("menu");
});