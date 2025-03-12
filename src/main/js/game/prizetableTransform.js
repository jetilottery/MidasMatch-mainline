define(require => {
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    let tileDesc, coinDesc, wheelDesc, descriptionNames;



    return data => {

        tileDesc = resLib.i18n.game.Paytable.tilePrizeDescription;
        coinDesc = resLib.i18n.game.Paytable.coinPrizeDescription;
        wheelDesc = resLib.i18n.game.Paytable.wheelPrizeDescription;

        descriptionNames = {
            "A": tileDesc, "B": tileDesc, "C": tileDesc, "D": tileDesc, "E": tileDesc, "F": tileDesc, "G": tileDesc, "H": tileDesc, "I": tileDesc, "J": tileDesc, "K": tileDesc,
            "L": coinDesc, "M": coinDesc, "N": coinDesc, "O": coinDesc, "P": coinDesc, "Q": coinDesc, "R": coinDesc, "S": coinDesc, "T": coinDesc, "U": coinDesc, "V": coinDesc, "W": coinDesc,
            "W1": wheelDesc, "W2": wheelDesc, "W3": wheelDesc, "W4": wheelDesc, "W5": wheelDesc, "W6": wheelDesc, "W7": wheelDesc, "W8": wheelDesc, "W9": wheelDesc, "W10": wheelDesc, "W11": wheelDesc,
        };

        return ({
            cells: {
                prizeLevel: data.division,
                description: descriptionNames[data.description] ? descriptionNames[data.description] : resLib.i18n.game.Paytable.description,
                prizeValue: SKBeInstant.formatCurrency(data.prize).formattedAmount
            },
        });
    };
});
