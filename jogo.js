class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        this.load.image('mapa', 'assets/map1.png');
        this.load.spritesheet('garoto', 'assets/Persona-principal.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        this.add.image(400, 300, 'mapa').setScale(1.2);
        garoto = this.add.sprite(100, 300, 'garoto').setScale(3);
        cursor = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });

        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('garoto', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'subir',
            frames: this.anims.generateFrameNumbers('garoto', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'descer',
            frames: this.anims.generateFrameNumbers('garoto', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        garoto.anims.play('andar', true);
    }

    update() {
        // Se o personagem chegar à coordenada (700, 0), mude para a outra cena
        if (garoto.x >= 650 && garoto.y === 0) {
            this.scene.start('OutraCena');
        }

        if (cursor.left.isDown) {
            garoto.setFlip(true, false);
            garoto.anims.play('andar', true);
            garoto.x -= 4;

        } else if (cursor.right.isDown) {
            garoto.anims.play('andar', true);
            garoto.x += 4;
        }

        else if (cursor.up.isDown) {
            garoto.anims.play('subir', true);
            garoto.y -= 4;
        } else if (cursor.down.isDown) {
            garoto.anims.play('descer', true);
            garoto.y += 4;
        }
        else {
            garoto.anims.stop('andar', true);
        }
    }
}

class OutraCena extends Phaser.Scene {
    constructor() {
        super({ key: 'OutraCena' });
    }

    preload() {
        // Preload dos recursos necessários para esta cena
        this.load.image('npc', 'assets/NPC.png')
        this.load.image('novoMapa', 'assets/outroMapa.png');
        this.load.spritesheet('garoto', 'assets/Persona-principal.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        // Adiciona uma nova imagem de fundo
        this.add.image(400, 300, 'novoMapa').setScale(1.2);
        this.add.image(350, 550, 'npc').setScale(3);

        // Adiciona o personagem na nova cena
        garoto = this.add.sprite(700, 700, 'garoto').setScale(3);

        // Define as teclas do cursor para controle do personagem
        cursor = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });

        // Cria as animações para o personagem
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('garoto', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'subir',
            frames: this.anims.generateFrameNumbers('garoto', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'descer',
            frames: this.anims.generateFrameNumbers('garoto', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Inicia a animação do personagem
        garoto.anims.play('andar', true);
    }

    update() {
        // Controle do personagem na nova cena
        if (garoto.x >= 300 && garoto.x <=400 && garoto.y > 500 && garoto.y < 600) {
            alert('Olá, seja bem vindo a nossa empresa');
            garoto.x += 50
        }
        if (cursor.left.isDown) {
            garoto.setFlip(true, false);
            garoto.anims.play('andar', true);
            garoto.x -= 4;
        } else if (cursor.right.isDown) {
            garoto.anims.play('andar', true);
            garoto.x += 4;
        } else if (cursor.up.isDown) {
            garoto.anims.play('subir', true);
            garoto.y -= 4;
        } else if (cursor.down.isDown) {
            garoto.anims.play('descer', true);
            garoto.y += 4;
        } else {
            garoto.anims.stop('andar', true);
        }
    }
}

var game;
var garoto;
var cursor;

var config = {
    pixelArt: true,
    type: Phaser.AUTO,
    width: 800,
    height: 700,
    scene: [MainScene, OutraCena]
};

game = new Phaser.Game(config);
