define((require) => {
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    const bonusData = require('game/data/bonusData');

    return function scenarioTransform(scenarioString) {
        // scenario example: "CKEAHJDIBGF|XAFIAEAHGYIHBJIK|TWUPWWZ|W2";
        const scenarioArr = scenarioString.split('|');

        let symbols = [];
        let symbolPrizes = [];
        let revealOrder = [];
        let coinBonus = [];
        let wheelBonus;
        let wheelBonusPrize;

        //basegame symbol order
        symbols = scenarioArr[0].split('');

        //basegame push prize data to *symbolPrizes*
        symbolPrizes = symbols.map(e => {
            return prizeData.prizeTable[e];
        });

        revealOrder = scenarioArr[1].split('');

        // If we have coinBonus string, get the prizedata 
        if (scenarioArr[2] !== '') {
            coinBonus = scenarioArr[2].split('').map(e => {
                return e === 'Z' ? 'Z' : prizeData.prizeTable[e];
            });
        } else {
            coinBonus = false;
        }

        wheelBonus = scenarioArr[3] !== '' ? scenarioArr[3] : false;

        if (wheelBonus) {
            wheelBonusPrize = prizeData.prizeTable[wheelBonus];
        }

        bonusData.coinBonus = coinBonus;
        bonusData.wheelBonus = wheelBonus;
        bonusData.symbolPrizes = symbolPrizes;

        return {
            symbols,
            symbolPrizes,
            revealOrder,
            coinBonus,
            wheelBonus,
            wheelBonusPrize,
            scenario: {
                'symbols': symbols,
                'prizes': symbolPrizes,
                'revealOrder': revealOrder,
                'coinBonus': coinBonus,
                'wheelBonus': wheelBonus,
                'wheelBonusPrize': wheelBonusPrize,
            }
        };
    };
});
