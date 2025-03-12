define(require => {
    const app = require('skbJet/componentManchester/standardIW/app');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const PIXI = require('com/pixijs/pixi');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    const transitionNames = {
        'baseGame': 'land_transition_Base',
        'wheelBonus': 'land_transition_Wheel',
        'coinBonus': 'land_transition_Finger',
    };

    let transitionSpine;

    let currentGame = 'baseGame';

    function init() {
        transitionSpine = new PIXI.spine.Spine(resLib.spine['transitions'].spineData);
        // displayList.transitions.addChild(transitionSpine);

        for (let i = 0; i < app.stage.children.length; i++) {
            if (app.stage.children[i].name === 'footerContainer') {
                app.stage.addChildAt(transitionSpine, i - 1);
                break;
            }
        }

        msgBus.subscribe('GameSize.OrientationChange', onOrientationChange);
        onOrientationChange();
    }

    function onOrientationChange() {
        transitionSpine.x = displayList.transitions.x;
        transitionSpine.y = displayList.transitions.y;
    }
    async function to(nextView, delay) {
        let bgMusic;
        displayList.bonusSpinButton.interactive = false;
        displayList.bonusRevealAll.interactive = false;

        msgBus.publish('UI.updateButtons', {
            help: { visible: false },
            autoPlay: { visible: false },
        });

        Tween.delayedCall(delay, () => {
            switch (nextView) {
                case 'baseGame':
                    audio.play('Bonus_End', false, 0.7);
                    bgMusic = 'BG_music';
                    transitionSpine.state.setAnimation(0, transitionNames[nextView], false);
                    Tween.delayedCall(1, () => {
                        fade(displayList[currentGame + 'BG'], displayList[nextView + 'BG']);
                        swap(displayList.coinBonus);
                        swap(displayList.wheelBonus);
                        swap(null, displayList.playerNumbers);
                        swap(null, displayList.infoArea);

                        // Play BaseGame Music and stop any FX
                        if (!audio.isPlaying(bgMusic)) {
                            audio.play(bgMusic, true);
                        }
                        if (audio.isPlaying('Wheel_Water')) {
                            audio.fadeOut('Wheel_Water', 0.4);
                        }

                        currentGame = nextView;
                    });
                    break;
                case 'coinBonus':
                    audio.play('Bonus_Transition', false, 0.7);
                    bgMusic = 'Bonus_music';
                    transitionSpine.state.setAnimation(0, transitionNames[nextView], false);
                    Tween.delayedCall(1, () => {
                        // Fade the backgrounds and game elements
                        fade(displayList[currentGame + 'BG'], displayList[nextView + 'BG']);
                        swap(displayList.playerNumbers);
                        swap(displayList.infoArea);
                        swap(displayList.wheelBonus);
                        swap(null, displayList.coinBonus);

                        // Play Bonus Music
                        if (!audio.isPlaying(bgMusic)) {
                            audio.play(bgMusic, true);
                        }

                        // Show the reveal all button 
                        displayList.bonusRevealAll.visible = true;

                        currentGame = nextView;
                    });
                    break;
                case 'wheelBonus':
                    audio.play('Bonus_Transition', false, 0.7);
                    bgMusic = 'Bonus_music';
                    transitionSpine.state.setAnimation(0, transitionNames[nextView], false);
                    Tween.delayedCall(1, () => {
                        // Fade the backgrounds and game elements
                        fade(displayList[currentGame + 'BG'], displayList[nextView + 'BG']);
                        swap(displayList.playerNumbers);
                        swap(displayList.infoArea);
                        swap(displayList.coinBonus);
                        swap(null, displayList.wheelBonus);

                        // Play Bonus music + fx
                        if (!audio.isPlaying(bgMusic)) {
                            audio.play(bgMusic, true);
                        }
                        audio.play('Wheel_Water', true, 0.2);

                        currentGame = nextView;
                    });
                    break;
            }
        });

        return new Promise(resolve => {
            setTimeout(() => {

                if (nextView === 'coinBonus') {
                    displayList.bonusRevealAll.interactive = true;
                    displayList.coinBonus.interactiveChildren = true;
                }

                if (nextView === 'wheelBonus') {
                    displayList.bonusSpinButton.interactive = true;
                }

                msgBus.publish('UI.updateButtons', {
                    help: { visible: true },
                });

                resolve();
            }, (delay + 2.5) * 1000);
        });
    }

    /**
     * We can use the 'from' (and leave 'to' as null) parameter alone to just fadeOut.
     * We can use the 'to' (and leave 'from' as null) parameter alone to just fadeIn.
     * staggerDelay is the delay between from and to, default is 0.5. 
     */
    function fade(from, to, staggerDelay, duration) {
        staggerDelay = staggerDelay ? staggerDelay : 0.5;
        duration = duration ? duration : 0.1;
        if (from) {
            from.visible = true;
            from.alpha = 1;

            Tween.to(from, duration, {
                alpha: 0,
                onComplete: () => {
                    from.visible = false;
                },
                delay: staggerDelay,
            });
        }

        if (to) {
            to.visible = true;
            to.alpha = 0;
            Tween.to(to, duration, {
                alpha: 1,
            });
        }
    }

    /**
     * Simplified 'to' but no tween
     */
    function swap(from, to) {
        if (from) {
            from.visible = false;
            from.alpha = 1;
        }
        if (to) {
            to.visible = true;
            to.alpha = 1;
        }
    }

    return {
        init,
        to,
    };
});