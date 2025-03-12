define(function (require) {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');

    //const winningNumbers = require('game/components/winningNumbers');
    const playerNumbers = require('game/components/playerNumbers');
    const coinBonus = require('game/components/coinBonus');
    const wheelBonus = require('game/components/wheelBonus');
    const transition = require('game/components/transition');
    const revealAll = require('game/revealAll');
    const bonusData = require('game/data/bonusData');
    // const meterData = require('skbJet/componentManchester/standardIW/meterData');

    const gameTypes = ['baseGame', 'coinBonus', 'wheelBonus'];
    let activeGame = 'baseGame';

    async function startReveal() {
        activeGame = gameTypes[0];

        // Enable all of the winning numbers and player numbers, wait until they are all revealed

        await Promise.all([
            ...playerNumbers.enable()
        ]);

        revealAll.stop(activeGame);

        if (bonusData.coinBonus) {
            activeGame = gameTypes[1];
            autoPlay._enabled = false; //turn off autoplay 

            msgBus.publish('UI.updateButtons', {
                autoPlay: false,
                ticketSelect: false,
                help: false
            });

            await transition.to('coinBonus', gameConfig.delayBeforeTransitionToBonus);
            playerNumbers.killAnims();

            msgBus.publish('UI.updateButtons', {
                help: { enabled: true }
            });

            await Promise.all([
                ...coinBonus.enable()
            ]);
        }

        revealAll.stop(activeGame);

        if (bonusData.wheelBonus) {
            activeGame = gameTypes[2];
            autoPlay._enabled = false; //turn off autoplay 

            msgBus.publish('UI.updateButtons', {
                autoPlay: false,
                ticketSelect: false,
                help: false
            });

            await transition.to('wheelBonus', gameConfig.delayBeforeTransitionToBonus);
            playerNumbers.killAnims();

            msgBus.publish('UI.updateButtons', {
                help: { enabled: true }
            });

            await wheelBonus.complete();
        }

        await coinBonus.complete();

        if (bonusData.coinBonus || bonusData.wheelBonus) {
            await transition.to('baseGame', gameConfig.bonusHoldOnCompleteWin);
        }

        gameFlow.next('REVEAL_COMPLETE');

        // continue to the next state
    }

    // Listen for autoplay activation which triggers the remaining cards to reveal automatically
    msgBus.subscribe('Game.AutoPlayStart', () => {
        revealAll.start(activeGame);
    });

    // Listen for autoplay deactivation which cancels the revealAll timeline
    msgBus.subscribe('Game.AutoPlayStop', () => {
        revealAll.stop(activeGame);
    });

    gameFlow.handle(startReveal, 'START_REVEAL');
});
