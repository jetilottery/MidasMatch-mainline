define(require => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const PIXI = require('com/pixijs/pixi');

    function init() {
        msgBus.subscribe('game.applyLangFix', applyLangFix);
        msgBus.subscribe('GameSize.OrientationChange', applyLangFix);
    }

    function applyLangFix() {
        if (displayList.tryButton !== undefined) {
            displayList.tryButton.label.maxWidth = 230;
            displayList.tryButton.hitArea = new PIXI.Rectangle(-135, -55, 265, 95);
        }
        if (displayList.buyButton !== undefined) {
            displayList.buyButton.label.maxWidth = 230;
            displayList.buyButton.hitArea = new PIXI.Rectangle(-135, -55, 265, 95);
        }
        if (displayList.bonusRevealAll !== undefined) {
            displayList.bonusRevealAll.label.maxWidth = 230;
            displayList.bonusRevealAll.hitArea = new PIXI.Rectangle(-135, -55, 265, 95);
        }
        if (displayList.autoPlayButton !== undefined) {
            displayList.autoPlayButton.maxWidth = 230;
            displayList.autoPlayButton.hitArea = new PIXI.Rectangle(-135, -55, 265, 95);
        }
        if (displayList.bonusSpinButton !== undefined) {
            displayList.bonusSpinButton.label.maxWidth = 230;
            displayList.bonusSpinButton.hitArea = new PIXI.Rectangle(-135, -55, 265, 95);
        }
        if (displayList.moveToMoneyButton !== undefined) {
            displayList.moveToMoneyButton.label.maxWidth = 230;
            displayList.moveToMoneyButton.hitArea = new PIXI.Rectangle(-135, -55, 265, 95);
        }
        // if (displayList. !== undefined)
        //     displayList..label.maxWidth = 230;
        if (displayList.autoPlayStartButton.children[4] !== undefined) {
            displayList.autoPlayStartButton.children[4].maxWidth = 230;
            displayList.autoPlayStartButton.hitArea = new PIXI.Rectangle(-135, -55, 265, 95);
        }
        if (displayList.playAgainButton !== undefined) {
            displayList.playAgainButton.label.maxWidth = 230;
            displayList.playAgainButton.hitArea = new PIXI.Rectangle(-135, -55, 265, 95);
        }
        if (displayList.ticketSelectCostValue !== undefined) {
            displayList.ticketSelectCostValue.maxWidth = 185;
            displayList.ticketSelectCostValue.hitArea = new PIXI.Rectangle(-135, -55, 265, 95);
        }
        if (displayList.tryAgainButton !== undefined) {
            displayList.tryAgainButton.label.maxWidth = 230;
            displayList.tryAgainButton.hitArea = new PIXI.Rectangle(-135, -55, 265, 95);
        }
    }

    return {
        init,
        applyLangFix
    };
});