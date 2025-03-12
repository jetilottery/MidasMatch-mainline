define((require) => {
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    //const winningNumbers = require('game/components/winningNumbers');
    const playerNumbers = require('game/components/playerNumbers');
    const coinBonus = require('game/components/coinBonus');
    const wheelBonus = require('game/components/wheelBonus');

    //const bonusCard = require('game/components/bonusCard');

    function ticketAcquired() {
        playerNumbers.populate(scenarioData.scenario);
        coinBonus.populate(scenarioData.scenario);
        wheelBonus.populate(scenarioData.scenario);

            audio.play('BG_music', true);

        gameFlow.next('START_REVEAL');
    }

    gameFlow.handle(ticketAcquired, 'TICKET_ACQUIRED');
});
