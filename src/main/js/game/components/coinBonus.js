define(require => {
    const PIXI = require('com/pixijs/pixi');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const coinBonusCoins = require('./coinBonusCoins');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    let scenario;
    // let bonusComplete;
    let plaqueAnim;
    let coins, dlCoins;

    function idleManager(data) {
        switch (data.state) {
            case 'IdleAll':
                Tween.killTweensOf(promptIdle);
                //set the idle animations going on all unrevealed
                Tween.delayedCall(gameConfig.delayBeforeStartIdleInSeconds, promptIdle);
                break;
            case 'StopIdle':
                //stop the idle animations on all
                stopIdle();
                break;
        }
    }

    function init() {
        displayList.coinBonusBG.visible = false;
        displayList.coinBonus.visible = false;
        displayList.cbInfoDesc.visible = true;
        displayList.cbInfoTotal.visible = false;
        displayList.cbInfoTotal.value = 0;
        displayList.cbInfoTotal.text = '';
        displayList.cbInfoTotalFade.visible = false;
        displayList.cbInfoTotalFade.value = 0;
        displayList.cbInfoTotalFade.text = '';
        coins = [
            coinBonusCoins.fromContainer(displayList.coinBonusP1),
            coinBonusCoins.fromContainer(displayList.coinBonusP2),
            coinBonusCoins.fromContainer(displayList.coinBonusP3),
            coinBonusCoins.fromContainer(displayList.coinBonusP4),
            coinBonusCoins.fromContainer(displayList.coinBonusP5),
            coinBonusCoins.fromContainer(displayList.coinBonusP6),
            coinBonusCoins.fromContainer(displayList.coinBonusP7),
            coinBonusCoins.fromContainer(displayList.coinBonusP8),
            coinBonusCoins.fromContainer(displayList.coinBonusP9),
            coinBonusCoins.fromContainer(displayList.coinBonusP10)
        ];

        dlCoins = [
            displayList.coinBonusP1,
            displayList.coinBonusP2,
            displayList.coinBonusP3,
            displayList.coinBonusP4,
            displayList.coinBonusP5,
            displayList.coinBonusP6,
            displayList.coinBonusP7,
            displayList.coinBonusP8,
            displayList.coinBonusP9,
            displayList.coinBonusP10
        ];

        let bgSpineLand = new PIXI.spine.Spine(resLib.spine['backgroundAnims'].spineData);
        displayList.coinLandscapeBG.addChild(bgSpineLand);
        bgSpineLand.state.setAnimationByName(0, 'land_CoinBG', true);

        let bgSpinePort = new PIXI.spine.Spine(resLib.spine['backgroundAnims'].spineData);
        displayList.coinPortraitBG.addChild(bgSpinePort);
        bgSpinePort.state.setAnimationByName(0, 'port_CoinBG', true);

        plaqueAnim = new PIXI.spine.Spine(resLib.spine['WinAnims'].spineData);
        displayList.cbInfoBG.addChild(plaqueAnim);

        displayList.bonusRevealAll.on('press', () => {
            msgBus.publish('Game.AutoPlayStart');
            audio.play('click');

            msgBus.publish('UI.updateButtons', {
                help: false
            });

            displayList.bonusRevealAll.enabled = false;
            displayList.bonusRevealAll.visible = false;
        });

        msgBus.subscribe('UI.showHelp', () => { displayList.bonusRevealAll.enabled = false; });
        msgBus.subscribe('UI.hideHelp', () => { displayList.bonusRevealAll.enabled = true; });
        msgBus.subscribe('Game.AutoPlayStart', () => { displayList.bonusRevealAll.visible = false; });
        msgBus.subscribe('Game.AutoPlayStop', () => { displayList.bonusRevealAll.visible = true; });

        // Make coins inactive for GIP
        reset();
    }

    function promptIdle() {
        // Check if there are any remaining unrevealed coins
        const unrevealed = coins.filter(number => !number.revealed);
        if (unrevealed.length === 0) {
            return;
        }

        for (let i = 0; i < unrevealed.length; i++) {
            if (unrevealed[i].interactionState !== "IDLE") {
                unrevealed[i].prompt();
            }
        }
    }

    function stopIdle() {
        Tween.killTweensOf(promptIdle);
        // Check if there are any remaining unrevealed coins
        const unrevealed = coins.filter(number => !number.revealed);
        if (unrevealed.length === 0) {
            return;
        }

        for (let i = 0; i < unrevealed.length; i++) {
            unrevealed[i].stopIdle();
        }
    }

    function populate(data) {
        scenario = data.scenario;
    }

    function reset() {
        scenario = undefined;

        displayList.bonusRevealAll.enabled = true;
        displayList.bonusRevealAll.visible = true;

        displayList.cbInfoTotal.value = 0;
        displayList.cbInfoTotal.text = '';
        displayList.cbInfoTotal.visible = false;
        displayList.cbInfoTotalFade.value = 0;
        displayList.cbInfoTotalFade.text = '';
        displayList.cbInfoTotalFade.visible = false;
        displayList.cbInfoDesc.visible = true;
        // bonusComplete = undefined;
        coins.forEach(coin => { coin.reset(); coin.alpha = 1; });
        dlCoins.forEach(coin => { coin.interactiveChildren = true; });
        displayList.coinBonus.interactiveChildren = false;
    }

    function complete() {
        return true;
    }


    function enable() {
        // Return an array of promises for each coin's lifecycle
        msgBus.publish('Bonus.IdleAll');
        return coins.map(async coin => {
            // Enable the coin and wait for it to be revealed (manually or automatically)
            await coin.enable();
            // Get the next Winning Number
            let prizeVal = scenario.coinBonus.shift();
            if (prizeVal !== 'Z' && prizeVal) {
                // Populate the coin with the next Player Number, ready to be uncovered
                coin.populate(prizeVal);
                sumOfCoins(prizeVal);
                meterData.win += prizeVal;
                await coin.uncover();

                // Reset Idle
            }
            else if (prizeVal) {
                displayList.bonusRevealAll.enabled = false;
                displayList.bonusRevealAll.visible = false;
                msgBus.publish('UI.updateButtons', {
                    help: false
                });

                coin.populate(null, resLib.i18n.game.Game.coinCollect);
                msgBus.publish('Bonus.StopIdle');
                let finalReveal = coins.indexOf(coin);

                // Fulfill the promises for the unopened coins as we have finished the bonus 
                coins.forEach(c => {
                    if (!c.revealed && coins.indexOf(c) !== finalReveal) {
                        c.reveal();
                        c.revealed = true;
                        Tween.delayedCall(0.5, () => {
                            Tween.to(c, 0.5, { alpha: 0.4 });
                        });
                    }
                });

                dlCoins.forEach(coin => { coin.interactiveChildren = false; });
                displayList.coinBonus.interactiveChildren = false;

                await coin.uncover();
                bonusEnd();
                // stop idles
            }
        });
    }

    function bonusEnd() {
        plaqueAnim.state.setAnimationByName(0, 'CoinPlaquePop', false);
        Tween.delayedCall(0.5, () => {
            plaqueAnim.state.setAnimationByName(0, 'CoinPlaquePop', false);
        });
        Tween.delayedCall(1, () => {
            plaqueAnim.state.setAnimationByName(0, 'CoinPlaquePop', false);
        });

    }

    function sumOfCoins(val) {
        plaqueAnim.state.setAnimationByName(0, 'CoinPlaquePop', false);
        displayList.cbInfoDesc.visible = false;
        displayList.cbInfoTotal.visible = true;
        displayList.cbInfoTotal.value += val;
        displayList.cbInfoTotalFade.visible = true;
        displayList.cbInfoTotalFade.alpha = 1;
        displayList.cbInfoTotalFade.text = displayList.cbInfoTotal.text;

        displayList.cbInfoTotal.text = resLib.i18n.game.Game.coinTotal.replace("{0}", SKBeInstant.formatCurrency(displayList.cbInfoTotal.value).formattedAmount);

        let moveSpeed = 0.25;

        displayList.cbInfoTotal.scale.x = 0;
        displayList.cbInfoTotal.scale.y = 0;
        displayList.cbInfoTotalFade.scale.x = 1;
        displayList.cbInfoTotalFade.scale.y = 1;

        Tween.to(displayList.cbInfoTotal.scale, moveSpeed, { x: 1, y: 1 });
        Tween.to(displayList.cbInfoTotalFade.scale, moveSpeed, { x: 2, y: 2 });
        Tween.to(displayList.cbInfoTotalFade, moveSpeed, { alpha: 0 });

    }

    function revealAll() {
        // Get all the cards yet to be revealed
        const unrevealed = coins.filter(coin => !coin.revealed);
        shuffleArray(unrevealed);
        // Return an array of tweens that calls reveal on each card in turn
        return unrevealed.map(coin => Tween.delayedCall(0, coin.reveal, null, coin));
    }

    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    msgBus.subscribe('Bonus.IdleAll', () => idleManager({ state: 'IdleAll' }));
    msgBus.subscribe('Bonus.StopIdle', () => idleManager({ state: 'StopIdle' }));


    return {
        init,
        populate,
        enable,
        complete,
        reset,
        revealAll,
    };
});