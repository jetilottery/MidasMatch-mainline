define(function (require) {
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    const playerNumbers = require('game/components/playerNumbers');
    const winUpTo = require('game/components/winUpTo');
    const bonusData = require('game/data/bonusData');
    const coinBonus = require('game/components/coinBonus');
    const wheelBonus = require('game/components/wheelBonus');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const numberState = require('game/components/state');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    function prepareOrReset() {
        resetAll();
        gameFlow.next();
    }
    function resetAll() {
        playerNumbers.reset();
        coinBonus.reset();
        wheelBonus.reset();
        bonusData.reset();
        numberState.reset();
        winUpTo.reset();


        // Make sure we hide the result
        msgBus.publish('UI.hideResult');

        // Fade out the win/lose terminator in case it is still playing
        if (audio.isPlaying('winTerminator')) {
            audio.fadeOut('winTerminator', 1);
        }
    }

    // Subscribe to Ticket Cost +/- as we will not be in GAME_RESET when these are called
    msgBus.subscribe('TicketSelect.CostUp', resetAll);
    msgBus.subscribe('TicketSelect.CostMax', resetAll);
    msgBus.subscribe('TicketSelect.CostDown', resetAll);

    gameFlow.handle(prepareOrReset, 'GAME_RESET');
    gameFlow.handle(prepareOrReset, 'GAME_PREPARE');
});
