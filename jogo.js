var game;
        var garoto;
        var cursors;

        window.onload = function() {
            var config = {
                pixelArt: true,
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                scene: {
                    preload: preload,
                    create: create,
                    update: update
                }
            };

            game = new Phaser.Game(config);
        }

        function preload() {
            this.load.image('mapa', 'assets/mapa.png');
            this.load.spritesheet('garoto', 'assets/Persona-principal.png', { frameWidth: 32, frameHeight: 32 });
        }

        function create() {
            this.add.image(400, 300, 'mapa').setScale(1.2);
            garoto = this.add.sprite(100, 300, 'garoto').setScale(3);
            cursors = this.input.keyboard.addKeys({
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

        function update() {
            var horizontalMovement = 0;
            var verticalMovement = 0;

            if (cursors.left.isDown) {
                horizontalMovement = -1;
                garoto.setFlip(true, false);
                garoto.anims.play('andar', true);


            } else if (cursors.right.isDown) {
                horizontalMovement = 1;
                garoto.setFlip(false, false);
                garoto.anims.play('andar', true);
            }

            if (cursors.up.isDown) {
                verticalMovement = -1;
                garoto.anims.play('subir', true);
            } else if (cursors.down.isDown) {
                garoto.anims.play('descer', true);
                verticalMovement = 1;
            }

            if (horizontalMovement !== 0 || verticalMovement !== 0) {
                garoto.x += horizontalMovement * 5;
                garoto.y += verticalMovement * 5;
            
            } else {
                garoto.anims.stop('andar', true);
            }
        }