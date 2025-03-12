define(require => {
    const PIXI = require('com/pixijs/pixi');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const utils = require('skbJet/componentManchester/standardIW/layout/utils');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const text = require('skbJet/componentManchester/standardIW/layout/text');
    const fittedText = require('skbJet/componentManchester/standardIW/components/fittedText');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');

    const Tween = window.TweenMax;

    const NumberCard = require('./NumberCard');

    class PlayerNumber extends NumberCard {
        constructor() {
            super();

            this.initSpine();

            const pillarFrames = utils.findFrameSequence('midPillar_Land');
            this.pillar.textures = pillarFrames.map(PIXI.Texture.from);


            // const revealFrames = utils.findFrameSequence('symbolCover');
            // this.revealAnim.textures = revealFrames.map(PIXI.Texture.from);
            const idleFrames = utils.findFrameSequence('yourNumbersSymbolIdle');
            if (idleFrames.length > 0) {
                this.idleAnim.textures = idleFrames.map(PIXI.Texture.from);
            }
            this.pillar.anchor.set(0.5);
            this.pillar.y = 278;

            this.winAmount = new fittedText("");
            this.winAmount.maxWidth = 185;
            this.winAmount.anchor.set(0.5);
            this.winAmount.y = 96;

            text.update(this.winAmount, textStyles.cardValue);

            this.resultContainer.addChild(this.winAmount);


            this.reset();
        }

        update(scenario) {
            super.update(scenario);
        }

        populate(symbol) {
            this.value = symbol.val;
            super.populate(symbol);
            this.symbolCode = symbol.sym;
        }

        addText() {
            if (this.symbolCode === 'Y' || this.symbolCode === 'X') {
                this.winAmount.text = resLib.i18n.game.Game.plateBonus;
            } else {
                this.winAmount.text = SKBeInstant.formatCurrency(this.value).formattedAmount;
            }
        }

        reset() {
            super.reset();
            this.matched = false;
            text.update(this.winAmount, textStyles.cardValue);
        }

        match() {
            super.match();
            this.matched = true;
            setTimeout(() => {
                let xOrigScale = this.winAmount.scale.x;
                let yOrigScale = this.winAmount.scale.y;
                text.update(this.winAmount, textStyles.cardValueWin);
                new Tween.to(this.winAmount.scale, 0.2, {
                    x: xOrigScale * 1.5,
                    y: yOrigScale * 1.5,
                    onComplete: () => {
                        new Tween.to(this.winAmount.scale, 0.2, {
                            x: xOrigScale,
                            y: yOrigScale,
                        });
                    }
                });
            }, 800);
        }

        static fromContainer(container) {
            const card = new PlayerNumber();
            container.addChild(card);
            return card;
        }
    }

    return PlayerNumber;
});
