define(require => {
    const PIXI = require('com/pixijs/pixi');
    const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const utils = require('game/components/utils/utils');

    class CoinPicker extends Pressable {
        constructor() {
            super();

            this.WIDTH = 154;
            this.HEIGHT = 154;

            this.spineAnim = undefined;

            // Add all the result elements to a container
            this.resultContainer = new PIXI.Container();
            this.resultContainer.visible = false;
            this.resultContainer.name = 'resultContainer';

            this.addChild(this.resultContainer);

            // State
            this.revealed = false;
            this.revealing = false;

            // Interactivity
            this.hitArea = new PIXI.Rectangle(
                this.WIDTH / -2,
                this.HEIGHT / -2,
                this.WIDTH,
                this.HEIGHT
            );
            this.on('press', () => {
                this.reveal();
            });
            //add the pointerover event
            this.off('pointerover');
            this.on('pointerover', () => {
                this.rollover();
            });
            this.off('pointerout');
            this.on('pointerout', () => {
                this.stopRollover();
            });
        }

        initSpine() {
            const _this = this;
            // Set up spine project
            _this.spineAnim = new PIXI.spine.Spine(resLib.spine['coverAnims'].spineData);
            _this.defaultState = 'BonusNumber_STATIC';
            _this.setSpineState({ state: 'DEFAULT', loop: false });
            _this.addChildAt(_this.spineAnim, 0);
        }

        enable() {
            return new Promise(resolve => {
                this.reveal = resolve;
                this.enabled = true;
            });
        }

        populate(val) {
            this.value = val;
        }

        prompt() {
            this.setSpineState({ state: 'IDLE', loop: true });
        }

        stopIdle() {
            this.setSpineState({ state: 'DEFAULT', loop: false });
        }

        disable() {
            this.enabled = false;
            this.reveal = undefined;
        }

        rollover() {
            msgBus.publish('Game.StopIdle');
            const evt = (this.pickPointType === 'Your') ? 'Game.Player' : 'Game.Winning';
            msgBus.publish(evt + 'Over', this);
            if (!this.revealed) {
                this.setSpineState({ state: 'ROLLOVER', loop: false });
            }
        }

        stopRollover() {
            const _this = this;
            const evt = (_this.pickPointType === 'Your') ? 'Game.Player' : 'Game.Winning';
            msgBus.publish(evt + 'Out', _this);
            if (_this.interactionState !== 'ROLLOVER' || _this.revealed) {
                return;
            } else {
                _this.setSpineState({ state: 'ROLLOUT', loop: false });
                // Add a listener, removing all first
                utils.removeSpineListeners(_this.spineAnim);
                _this.spineAnim.state.addListener({
                    complete: function (entry) {
                        if (entry.animation.name === 'BonusNumber_MOUSEOUT') {
                            _this.setSpineState({ state: 'IDLE', loop: true });
                        }
                    }
                });
            }
        }

        setSpineState(data) {
            let nextState;
            let doLoop = data.loop || false;
            let syncTime = data.sync || 0;
            switch (data.state) {
                case 'DEFAULT':
                    nextState = this.defaultState;
                    break;
                case 'IDLE':
                    nextState = 'BonusNumber_IDLE';
                    break;
                case 'ROLLOVER':
                    nextState = 'BonusNumber_MOUSEOVER';
                    break;
                case 'REVEAL':
                    nextState = 'BonusNumber_REVEAL';
                    break;
                case 'ROLLOUT':
                    nextState = 'BonusNumber_MOUSEOUT';
                    break;
                case 'OFF':
                    nextState = this.defaultState;
                    break;
                default:
                    nextState = this.defaultState;
                    break;
            }
            // If we're already in a rollout state, we don't want to be forcing the state back to default
            // as this would interrupt the rollout animation, so if we're going back to default, don't do anything
            if (this.interactionState === 'ROLLOUT' && nextState === this.defaultState) {
                return;
            }

            // Store the interaction state
            this.interactionState = data.state;

            utils.log('Changing spine state to: ' + nextState);
            this.spineAnim.renderable = data.state !== 'OFF';
            this.spineAnim.state.setAnimationByName(syncTime, nextState, doLoop);
        }

        reset() {
            this.enabled = false;
            this.resultContainer.visible = false;
            this.revealed = false;
            this.revealing = false;
            this.number = undefined;
            this.alpha = 1;

            if (this.spineAnim) {
                utils.removeSpineListeners(this.spineAnim);
                utils.stopSpineAnim(this.spineAnim);
                this.setSpineState({ state: 'DEFAULT', loop: false });
            }
        }

        async uncover() {
            await new Promise(resolve => {
                this.interactive = false;
                this.revealing = true;

                // Play the Player Number reveal audio
                audio.play('coinReveal', false);

                var globalScope = this;

                globalScope.resultContainer.visible = true;
                globalScope.resultContainer.alpha = 1;
                utils.removeSpineListeners(globalScope.spineAnim);
                globalScope.spineAnim.state.addListener({
                    complete: function (entry) {
                        if (entry.animation.name === 'BonusNumber_REVEAL') {
                            // globalScope.setSpineState({ state: 'OFF', loop: false });
                            globalScope.revealing = true;
                            globalScope.revealed = true;
                            resolve();
                        }
                    }
                });

                // Disable interactivity to prevent re-reveal, then switch to the animation
                this.setSpineState({ state: 'REVEAL', loop: false });

                // Otherwise just a swap from the cover to the resultsContainer
                this.resultContainer.visible = true;
                this.revealing = false;
                this.revealed = true;
                this.interactive = false;
            });
        }

    }

    return CoinPicker;
});
