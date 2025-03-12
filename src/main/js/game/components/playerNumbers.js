define(require => {
    const PIXI = require('com/pixijs/pixi');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const PlayerNumber = require('game/components/PlayerNumber');
    const numberState = require('game/components/state');
    const bonusData = require('game/data/bonusData');

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    require('com/gsap/TimelineMax');
    const Timeline = window.TimelineMax;

    let cards;
    let cardsRevealArr;
    let scenario;
    let symbolsRevealed;
    let coin1Spine, coin2Spine;
    let coverAnimTimeline;
    let numCardsRevealed = 0;
    let winningSymbols = [];

    // let pick
    // let symbolLetters = { 'A': {}, 'B': {}, 'C': {}, 'D': {}, 'E': {}, 'F': {}, 'G': {}, 'H': {}, 'I': {}, 'J': {}, 'K': {}, 'X': {}, 'Y': {} };
    // let symbolPickorder = {};

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
        cards = [
            PlayerNumber.fromContainer(displayList.playerNumber1),
            PlayerNumber.fromContainer(displayList.playerNumber2),
            PlayerNumber.fromContainer(displayList.playerNumber3),
            PlayerNumber.fromContainer(displayList.playerNumber4),
            PlayerNumber.fromContainer(displayList.playerNumber5),
            PlayerNumber.fromContainer(displayList.playerNumber6),
            PlayerNumber.fromContainer(displayList.playerNumber7),
            PlayerNumber.fromContainer(displayList.playerNumber8),
            PlayerNumber.fromContainer(displayList.playerNumber9),
            PlayerNumber.fromContainer(displayList.playerNumber10),
            PlayerNumber.fromContainer(displayList.playerNumber11),
            PlayerNumber.fromContainer(displayList.playerNumber12),
            PlayerNumber.fromContainer(displayList.playerNumber13),
            PlayerNumber.fromContainer(displayList.playerNumber14),
            PlayerNumber.fromContainer(displayList.playerNumber15),
            PlayerNumber.fromContainer(displayList.playerNumber16),
        ];

        cardsRevealArr = {
            'landscape': {
                0: [
                    cards[0],
                    cards[1],
                    cards[2],
                    cards[3],
                    cards[4]
                ],
                1: [
                    cards[5],
                    cards[6],
                    cards[7],
                    cards[8],
                    cards[9]
                ],
                2: [
                    cards[10],
                    cards[11],
                    cards[12],
                    cards[13],
                    cards[14],
                    cards[15]
                ]
            },
            'portrait': {
                0: [
                    cards[0],
                    cards[1],
                    cards[2],
                    cards[3]
                ],
                1: [
                    cards[4],
                    cards[5],
                    cards[6],
                    cards[7]
                ],
                2: [
                    cards[8],
                    cards[9],
                    cards[10],
                    cards[11]
                ],
                3: [
                    cards[12],
                    cards[13],
                    cards[14],
                    cards[15]
                ]
            }
        };

        coverAnimTimeline = new Timeline({ repeat: -1 });

        coverAnimTimeline.to({}, 1.600000023841858, {
            onComplete: () => {
                cards.forEach(card => {
                    if (card.currentState === 'pending') {
                        card.setSpineState({ state: 'IDLE', loop: true });
                        card.currentState = 'idle';
                    }
                });
            }
        }, 0);

        // Create spine background 

        let bgSpineLand = new PIXI.spine.Spine(resLib.spine['backgroundAnims'].spineData);
        bgSpineLand.state.timeScale = 0.6;
        displayList.landscapeBG.addChild(bgSpineLand);
        bgSpineLand.state.setAnimation(0, 'land_backgroundAnim', true);

        let bgSpinePort = new PIXI.spine.Spine(resLib.spine['backgroundAnims'].spineData);
        displayList.portraitBG.addChild(bgSpinePort);
        bgSpinePort.state.setAnimation(0, 'port_backgroundAnim', true);

        let logoSparkle = new PIXI.spine.Spine(resLib.spine['LogoTwinkle'].spineData);
        // logoSparkle.anchor.x = 0.5;
        // logoSparkle.anchor.y = 0.5;
        displayList.logoSparkle.addChild(logoSparkle);
        logoSparkle.state.setAnimation(0, 'LogoTwinkle', true);

        const coin1 = displayList.coin1;
        const coin2 = displayList.coin2;
        coin1Spine = new PIXI.spine.Spine(resLib.spine['Symbols'].spineData); //721 390
        coin2Spine = new PIXI.spine.Spine(resLib.spine['Symbols'].spineData); //721 390
        coin1.addChild(coin1Spine); //infoFingerCoinIdle
        coin2.addChild(coin2Spine); //infoWheelCoinIdle

        coin1Spine.state.setAnimation(0, 'infoFingerCoinStatic', false);
        coin2Spine.state.setAnimation(0, 'infoWheelCoinStatic', false);

    }

    function promptIdle() {
        // Check if there are any remaining unrevealed cards
        coverAnimTimeline.gotoAndPlay(0);
        const unrevealed = cards.filter(number => !number.revealed);
        if (unrevealed.length === 0) {
            return;
        }

        for (let i = 0; i < unrevealed.length; i++) {
            unrevealed[i].prompt();
        }
    }

    function stopIdle() {
        Tween.killTweensOf(promptIdle);
        // Check if there are any remaining unrevealed cards
        const unrevealed = cards.filter(number => !number.revealed);
        if (unrevealed.length === 0) {
            return;
        }

        for (let i = 0; i < unrevealed.length; i++) {
            unrevealed[i].stopIdle();
        }
    }

    function populate(data) {
        scenario = data;
        cards.forEach(card => { card.update(scenario); });
    }

    function enable() {
        // Start idle animations
        msgBus.publish('Game.IdleAll');

        // Return an array of promises for each card's lifecycle
        return cards.map(async card => {
            // Enable the card and wait for it to be revealed (manually or automatically)
            await card.enable();
            numCardsRevealed++;
            // Start idle animations
            // msgBus.publish('Game.IdleAll');
            // Play the Player Number reveal audio
            if (!autoPlay.enabled) {
                audio.playSequential('playerNumber', false, 0.6);
            } else {
                let revealInterval = gameConfig.autoPlayPlayerNumberInterval;
                let rowInterval = gameConfig.autoPlayPlayerRowInterval;
                let modulus = revealInterval > 0.9 || rowInterval > 0.9 ? 1 : 2;
                if ((numCardsRevealed % modulus === 0)) { //} (modulus === 2 && numCardsRevealed % 3 === 0)) {
                    audio.playSequential('AutoplayNumber', false, 0.6);
                }
            }

            let revealTotal = cards.filter(i => i.revealed === true);
            if (revealTotal.length === cards.length - 1) {
                msgBus.publish('UI.updateButtons', {
                    autoPlay: { visible: false, enabled: false },
                    help: { enabled: false },
                });
                if (!bonusData.coinBonus && !bonusData.wheelBonus) {
                    msgBus.publish('UI.updateButtons', {
                        help: { enabled: false },
                    });
                }
            }
            // Get the next Winning Number
            const nextData = scenario.revealOrder.shift();
            const prizeVal = scenario.symbolPrizes[scenario.symbols.indexOf(nextData)];
            // Populate the card with the next Player Number, ready to be uncovered
            card.populate({ 'val': prizeVal, 'sym': nextData });
            // Wait for the uncover animation (if animated)
            await card.uncover();

            card.symbolLetter = nextData; // We populate this after the uncover animation finishes so that when we check for match, it only triggers the win once

            // Reset Idle
            // If the revealed number matches a revealed Winning Number then mark the match

            msgBus.publish('Game.PlayerNumber', nextData);
            await checkMatch(nextData, card);

            if (!card.matched) {
                if (numberState.winning.numbers.includes(nextData)) {
                    card.match();
                    audio.playSequential('match');
                    await card.presentWin();
                    meterData.win += card.value;
                }
            }

            let allRevealed = cards.filter(i => i.revealed === true);
            if (allRevealed.length === cards.length) {
                // processComplete();
                if (!bonusData.coinBonus && !bonusData.wheelBonus) {
                    msgBus.publish('UI.updateButtons', {
                        help: { enabled: false },
                    });
                }
            }
        });
    }

    function revealAll() {
        msgBus.publish('Game.StopIdle');

        // .map(number => Tween.delayedCall(0, number.reveal, null, number));
        let cardRows = cardsRevealArr[orientation.get()];

        // let c0 = cardRows[0].map(c => { if (!c.revealed) return Tween.delayedCall(0, c.reveal, null, c) });
        // let c1 = cardRows[1].map(c => { if (!c.revealed) return Tween.delayedCall(0, c.reveal, null, c) });
        // let c2 = cardRows[2].map(c => { if (!c.revealed) return Tween.delayedCall(0, c.reveal, null, c) });
        // let c3 = cardRows[3] ? cardRows[3].map(c => { if (!c.revealed) return Tween.delayedCall(0, c.reveal, null, c) }) : null;
        let c0 = [], c1 = [], c2 = [], c3 = [];
        cardRows[0].forEach(c => { if (!c.revealed) c0.push(Tween.delayedCall(0, c.reveal, null, c)); });
        cardRows[1].forEach(c => { if (!c.revealed) c1.push(Tween.delayedCall(0, c.reveal, null, c)); });
        cardRows[2].forEach(c => { if (!c.revealed) c2.push(Tween.delayedCall(0, c.reveal, null, c)); });
        cardRows[3] ? cardRows[3].forEach(c => { if (!c.revealed) c3.push(Tween.delayedCall(0, c.reveal, null, c)); }) : null;

        // Get all the cards yet to be revealed
        const unrevealed = {
            c0,
            c1,
            c2,
            c3
        };
        // Return an array of tweens that calls reveal on each card in turn
        return unrevealed;
    }

    function reset() {
        cards.forEach(card => card.reset());
        coin1Spine.state.setAnimation(0, 'infoFingerCoinStatic', false);
        coin2Spine.state.setAnimation(0, 'infoWheelCoinStatic', false);
        winningSymbols = [];
        numCardsRevealed = 0;
    }

    async function checkMatch(playerNumber, coinOpened) {
        await new Promise(resolve => {
            const matchedCards = cards.filter(card => card.symbolLetter === playerNumber);
            if (matchedCards.length === 3) {
                winningSymbols.push(matchedCards[0].symbolLetter);
                meterData.win += matchedCards[0].value;
                audio.playSequential('match', false, 0.8);
                matchedCards.forEach(matchedCard => {
                    matchedCard.match();
                    matchedCard.presentWin('S' + matchedCard.symbolName.substring(1) + '/' + matchedCard.symbolName + 'Match', 'S' + matchedCard.symbolName.substring(1) + '/' + matchedCard.symbolName + 'MatchIdle', resolve);
                });
            } else if (playerNumber === 'X') {
                //Coin Bonus
                coinOpened.match();
                coinOpened.presentBonusWin('fingerWin', 'fingerIdle', resolve);
                coin1Spine.state.setAnimation(0, 'infoFingerCoinIdle', true);
                bonusData.coinBonus = true;
            } else if (playerNumber === 'Y') {
                //Wheel Bonus
                coinOpened.match();
                coinOpened.presentBonusWin('WheelWin', 'WheelIdle', resolve);
                coin2Spine.state.setAnimation(0, 'infoWheelCoinIdle', true);
                bonusData.wheelBonus = true;
            } else {
                matchedCards.forEach(card => {
                    if (!card.opened) {
                        card.nonWin();
                    }
                    card.opened = true;
                });
                resolve();
            }
        });
    }

    async function processPending() {
        await new Promise(c => {
            symbolsRevealed = c;
        });
    }

    function processComplete() {
        if (symbolsRevealed) {
            symbolsRevealed();
        }
    }

    function killAnims() {
        coin1Spine.state.setAnimation(0, 'infoFingerCoinStatic', false);
        coin2Spine.state.setAnimation(0, 'infoWheelCoinStatic', false);
        cards.forEach((card) => {
            // Make all anims Static
            // if (winningSymbols.includes(card.symbolLetter)) {
            //     card.symbol.spine.state.setAnimation(0, 'S' + card.symbolName.substring(1) + '/' + card.symbolName + 'staticMatch', false);
            // } else if (card.symbolName === 'Wheel' || card.symbolName === 'finger') {
            //     card.symbol.spine.state.setAnimation(0, card.symbolName + 'static', false);
            // } else {
            //     card.symbol.spine.state.setAnimation(0, 'S' + card.symbolName.substring(1) + '/' + card.symbolName + 'static', false);
            // }

            // Show bonus Static only
            if (card.symbolName === 'Wheel' || card.symbolName === 'finger') {
                card.symbol.spine.state.setAnimation(0, card.symbolName + 'static', false);
            }
        });
    }

    msgBus.subscribe('Game.IdleAll', () => {
        idleManager({ state: 'IdleAll' });
        coverAnimTimeline.restart();
    });
    msgBus.subscribe('Game.StopIdle', () => idleManager({ state: 'StopIdle' }));

    return {
        init,
        populate,
        enable,
        revealAll,
        reset,
        processComplete,
        processPending,
        killAnims,
        _cards: () => { return cards; },

    };
});
