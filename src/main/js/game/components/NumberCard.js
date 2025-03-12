define(require => {
    const PIXI = require('com/pixijs/pixi');
    const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const utils = require('game/components/utils/utils');

    const symbolNames = { 0: 's1', 1: 's2', 2: 's3', 3: 's4', 4: 's5', 5: 's6', 6: 's7', 7: 's8', 8: 's9', 9: 's10', 10: 's11', 'X': 'finger', 'Y': 'Wheel' };
    let symbolReference = {};

    let idleQueue = [];
    let prePlay = true;
    let resetable = false;

    class NumberCard extends Pressable {
        constructor() {
            super();

            this.WIDTH = 154;
            this.HEIGHT = 154;

            this.spineAnim = undefined;
            // Create all the empty sprites
            this.pillar = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
            this.highlightFX = new PIXI.spine.Spine(resLib.spine['highlightFX'].spineData);
            this.highlightFX.y = 278;

            this.symbol = new PIXI.Container();
            this.symbol.name = 'symbol';
            this.symbol.spine = new PIXI.spine.Spine(resLib.spine['Symbols'].spineData);
            this.symbol.addChild(this.symbol.spine);

            // Add all the result elements to a container
            this.resultContainer = new PIXI.Container();
            this.resultContainer.visible = false;
            this.resultContainer.name = 'resultContainer';

            this.symbolContainer = new PIXI.Container();
            this.symbolContainer.addChild(this.symbol);

            this.addChild(this.symbolContainer, this.pillar, this.highlightFX, this.resultContainer);

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
                if (!autoPlay.enabled) {
                    this.reveal();
                }
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
            _this.defaultState = 'YourNumber_STATIC';
            _this.currentState = 'idle';
            _this.addChildAt(_this.spineAnim, _this.getChildIndex(_this.pillar));
        }

        enable() {
            return new Promise(resolve => {
                this.reveal = resolve;
                this.enabled = true;
            }).then(() => {
                this.enabled = false;
            });
        }

        update(scenario) {
            // scenario example: "CKEAHJDIBGF|XAFIAEAHGYIHBJIK|TWUPWWZ|W2";
            scenario.symbols.map((s, i) => {
                symbolReference[s] = symbolNames[i];
            });
            symbolReference.X = 'finger';
            symbolReference.Y = 'Wheel';
        }

        populate(symbol) {
            prePlay = false;
            this.symbolName = symbolReference[symbol.sym];
        }

        prompt() {
            this.currentState = 'idle';
            this.setSpineState({ state: 'IDLE', loop: true });
        }

        disable() {
            this.enabled = false;
            this.reveal = undefined;
        }

        rollover() {
            msgBus.publish('Game.StopIdle');
            const evt = (this.pickPointType === 'Your') ? 'Game.Player' : 'Game.Winning';
            msgBus.publish(evt + 'Over', this);
            this.setSpineState({ state: 'ROLLOVER', loop: false });
        }

        setSpineState(data) {
            let nextState;
            let doLoop = data.loop || false;
            let syncTime = data.sync || 0;
            switch (data.state) {
                case 'IDLE':
                    nextState = 'YourNumber_IDLE';
                    break;
                case 'ROLLOVER':
                    nextState = 'YourNumber_MOUSEOVER';
                    break;
                case 'REVEAL':
                    if (autoPlay.enabled) {
                        nextState = 'YourNumber_AutoREVEAL';
                    } else {
                        nextState = 'YourNumber_REVEAL';
                    }
                    this.setChildIndex(this.spineAnim, this.children.length - 1);
                    break;
                case 'ROLLOUT':
                    nextState = 'YourNumber_MOUSEOUT';
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
            this.spineAnim.state.setAnimation(syncTime, nextState, doLoop);
        }

        stopRollover() {
            idleQueue.push(this);
            const _this = this;
            const evt = (_this.pickPointType === 'Your') ? 'Game.Player' : 'Game.Winning';
            msgBus.publish(evt + 'Out', _this);
            if (_this.interactionState !== 'ROLLOVER') {
                return;
            } else {
                _this.setSpineState({ state: 'ROLLOUT', loop: false });
                // Add a listener, removing all first
                utils.removeSpineListeners(_this.spineAnim);
                _this.spineAnim.state.addListener({
                    complete: function (entry) {
                        if (entry.animation.name === 'YourNumber_MOUSEOUT') {
                            _this.currentState = 'pending';
                        }
                    }
                });


            }
        }

        stopIdle() {

        }

        reset() {
            if (this.symbolName !== '' && !prePlay) {
                let _this = this;
                _this.spineAnim.state.setAnimation(0, 'YourNumber_RESET', false);
                _this.spineAnim.state.addListener({
                    complete: function (entry) {
                        if (entry.animation.name === 'YourNumber_RESET') {
                            utils.removeSpineListeners(_this.spineAnim);
                        }
                    }
                });

                if (resetable) {
                    audio.play('Symbol_Reset');
                }
                resetable = false;
            }
            // utils.stopSpineAnim(this.spineAnim);

            this.spineAnim.renderable = true;
            this.symbolName = '';
            this.symbolCode = '';
            this.symbolLetter = '';
            this.winAmount.text = '';
            // if(this.symbol.spine){this.symbol.spine.destroy()};
            this.enabled = false;
            this.resultContainer.visible = false;
            this.revealed = false;
            this.revealing = false;
            this.matched = false;
            this.opened = false;
            this.number = undefined;
            this.alpha = 1;
            this.setChildIndex(this.spineAnim, 0);

            this.highlightFX.state.clearTrack(0);
            this.highlightFX.skeleton.setToSetupPose();
            this.symbol.spine.state.clearTrack(0);
            this.symbol.spine.skeleton.setToSetupPose();

            // this.setSpineState({ state: 'IDLE', loop: false });
            this.currentState = 'idle';
        }

        async uncover() {
            await new Promise(resolve => {
                this.interactive = false;
                this.revealing = true;
                resetable = true;

                var globalScope = this;
                let symbolRevealDelay;

                if (autoPlay.enabled) {
                    symbolRevealDelay = 500;
                } else {
                    symbolRevealDelay = 900;
                }

                globalScope.resultContainer.visible = true;
                globalScope.resultContainer.alpha = 1;
                utils.removeSpineListeners(globalScope.spineAnim);
                globalScope.spineAnim.state.addListener({
                    complete: function (entry) {
                        if (entry.animation.name === 'YourNumber_REVEAL' || entry.animation.name === 'YourNumber_AutoREVEAL') {
                            globalScope.setSpineState({ state: 'OFF', loop: false });
                            globalScope.revealing = true;
                            globalScope.revealed = true;
                            resolve();
                        }
                    }
                });

                // Disable interactivity to prevent re-reveal, then switch to the animation
                this.setSpineState({ state: 'REVEAL', loop: false });
                this.currentState = 'idle';

                setTimeout(() => {
                    if (this.symbolName !== 'finger' && this.symbolName !== 'Wheel') {
                        this.symbol.spine.state.setAnimation(0, 'S' + this.symbolName.substring(1) + '/' + this.symbolName + 'Reveal', false);
                    } else {
                        this.symbol.spine.state.setAnimation(0, this.symbolName + 'Reveal', false);
                        // On Complete play the symbol Match/idle
                    }
                    this.highlightFX.state.setAnimation(0, 'PillarSweepDown', false);
                    this.addText();
                }, symbolRevealDelay);
                // Otherwise just a swap from the cover to the resultsContainer
                this.resultContainer.visible = true;
                this.revealing = false;
                this.revealed = true;
                this.interactive = false;
            });
        }

        match() {
            this.matched = true;
        }

        async presentWin(winAnim, idleAnim, animComplete) {
            let _this = this;
            _this.highlightFX.state.setAnimation(0, 'PillarGoldUp', false);
            _this.symbol.spine.state.setAnimation(0, winAnim, false);
            await new Promise(resolve => {
                _this.symbol.spine.state.addListener({
                    complete: function (entry) {
                        if (entry.animation.name === winAnim) {
                            // Play Match Idle
                            _this.symbol.spine.state.listeners.forEach((sp, i) => {
                                _this.symbol.spine.state.removeListener(_this.symbol.spine.state.listeners[i]);
                            });
                            _this.symbol.spine.state.setAnimation(0, idleAnim, true);
                            resolve();
                        }
                    }
                });
            });
            animComplete();
        }

        async presentBonusWin(winAnim, idleAnim, animComplete) {
            let _this = this;
            _this.highlightFX.state.setAnimation(0, 'PillarGoldUp', false);
            await new Promise(resolve => {
                _this.highlightFX.state.addListener({
                    complete: function (entry) {
                        if (entry.animation.name === 'PillarGoldUp') {
                            winAnim === 'fingerWin' ? audio.play('match_coinBonus') : audio.play('match_wheelBonus');
                            _this.symbol.spine.state.setAnimation(0, winAnim, false);
                            _this.symbol.spine.state.addListener({
                                complete: function (entry) {
                                    if (entry.animation.name === winAnim) {
                                        _this.symbol.spine.state.setAnimation(0, idleAnim, true);
                                        _this.symbol.spine.state.listeners.forEach((sp, i) => {
                                            _this.symbol.spine.state.removeListener(_this.symbol.spine.state.listeners[i]);
                                        });
                                        resolve();
                                    }
                                }
                            });

                            _this.highlightFX.state.listeners.forEach((sp, i) => {
                                _this.highlightFX.state.removeListener(_this.highlightFX.state.listeners[i]);
                            });
                        }
                    }
                });
            });
            animComplete();
        }

        nonWin() {
            let _this = this;
            _this.symbol.spine.state.setAnimation(0, 'S' + this.symbolName.substring(1) + '/' + _this.symbolName + 'Idle', true);
        }
    }

    return NumberCard;
});
