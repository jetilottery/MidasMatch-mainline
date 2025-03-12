define(require => {
    const fittedText = require('skbJet/componentManchester/standardIW/components/fittedText');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const text = require('skbJet/componentManchester/standardIW/layout/text');
    const utils = require('game/components/utils/utils');
    const CoinPicker = require('./CoinPicker');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    class coinBonusCoins extends CoinPicker {
        constructor() {
            super();

            this.initSpine();

            this.collectBG = new utils.spriteFromTexture('bonusCollect');
            this.collectBG.scale.set(0.75);
            this.collectBG.visible = false;

            this.winAmount = new fittedText("");
            this.winAmount.maxWidth = 150;
            this.winAmount.anchor.set(0.5);

            text.update(this.winAmount, textStyles.coinValue);

            this.resultContainer.addChild(this.collectBG, this.winAmount);


        }

        populate(val, text) {
            if (val) {
                this.value = val;
                this.winAmount.text = SKBeInstant.formatCurrency(val).formattedAmount;
            }
            if (text) {
                this.value = text;
                this.winAmount.text = text;
                this.collectBG.visible = true;
                this.collectBG.scale.set(0);
                Tween.to(this.collectBG.scale, 0.35, { ease: "Back.easeOut", x: 0.75, y: 0.75 });
            }
            let prevScaleX = this.winAmount.scale.x;
            let prevScaleY = this.winAmount.scale.y;
            this.winAmount.scale.set(0);
            Tween.to(this.winAmount.scale, 0.35, { ease: "Back.easeOut", x: prevScaleX, y: prevScaleY });
        }

        reset() {
            super.reset();
            this.matched = false;
            this.collectBG.visible = false;
            text.update(this.winAmount, textStyles.coinValue);
        }

        static fromContainer(container) {
            const card = new coinBonusCoins();
            container.addChild(card);
            return card;
        }
    }

    return coinBonusCoins;
});