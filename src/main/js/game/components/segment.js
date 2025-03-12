define(require => {
    const PIXI = require('com/pixijs/pixi');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    class Segment extends PIXI.Container {
        constructor(data) {
            super();

            this.winHighlight = new PIXI.spine.Spine(resLib.spine['WinAnims'].spineData);
            this.winHighlight.visible = false;
            this.winHighlight.x = -80;
            this.winHighlight.y = -2.5;

            this.text = new PIXI.Text("");
            this.sprite = new PIXI.Sprite(PIXI.Texture.EMPTY);
            this.sprite.rotation = Math.PI / 2;
            this.prize = 0;

            this.index = data.index;

            this.textStyle = this.index % 2 === 0 ? textStyles.parse('segmentLight') : textStyles.parse('segmentDark');
            this.textStyleWin = textStyles.parse('segmentWin');

            this.text.style = this.textStyle;

            this.rotation = data.rotation;
            this.pivot.x = data.pivot - data.offset;

            this.data = data.assignedData;

            this.sprite.anchor.set(0.5);
            this.text.anchor.set(1, 0.5);

            this.playedLayer = new PIXI.Sprite(PIXI.Texture.EMPTY);

            this.colorMatrix = new PIXI.filters.ColorMatrixFilter();

            this.playedLayer.visible = false;

            this.addChild(
                this.winHighlight,
                this.text,
                this.sprite,
            );

        }

        update() {
            if (typeof this.data === 'string') {
                this.prize = prizeData.prizeTable[this.data];
                this.text.text = SKBeInstant.formatCurrency(this.prize).formattedAmount;
            }
        }

        land() {
            meterData.win += this.prize;
            audio.play('Segment_Win');
            let winHighlight = this.winHighlight;
            winHighlight.visible = true;
            winHighlight.state.setAnimation(0, 'SegmentIntro', false);
            winHighlight.state.addListener({
                complete: function (entry) {
                    if (entry.animation.name === 'SegmentIntro') {
                        winHighlight.state.setAnimation(0, 'SegmentLoop', true);
                    }
                }
            });

            this.text.style = this.textStyleWin;
        }

        reset() {
            let _this = this;
            _this.playedLayer.visible = false;
            _this.winHighlight.visible = false;
            _this.winHighlight.state.clearTrack(0);
            _this.winHighlight.skeleton.setToSetupPose();
            _this.winHighlight.state.listeners.forEach((sp, i) => {
                _this.winHighlight.state.removeListener(_this.winHighlight.state.listeners[i]);
            });
            _this.text.style = _this.textStyle;
        }
    }

    return Segment;

});