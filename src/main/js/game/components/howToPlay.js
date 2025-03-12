define(require => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const PIXI = require('com/pixijs/pixi');

    let spineScale = 1.6;
    let coinSize = 155 * spineScale;
    let smlCoinSize = 80;

    function init() {
        // Page 1
        let bonusCoin1 = PIXI.Texture.fromFrame('infoBonusCoin');
        bonusCoin1 = new PIXI.Sprite(bonusCoin1);
        bonusCoin1.width = smlCoinSize;
        bonusCoin1.height = smlCoinSize;
        bonusCoin1.anchor.x = 0.5;
        bonusCoin1.anchor.y = 0.5;
        bonusCoin1.x = - smlCoinSize * 0.8;
        let bonusCoin2 = PIXI.Texture.fromFrame('infoBonusWheel');
        bonusCoin2 = new PIXI.Sprite(bonusCoin2);
        bonusCoin2.width = smlCoinSize;
        bonusCoin2.height = smlCoinSize;
        bonusCoin2.anchor.x = 0.5;
        bonusCoin2.anchor.y = 0.5;
        bonusCoin2.x = smlCoinSize * 0.8;
        displayList.howToPlayBonusCoins1.addChild(bonusCoin1, bonusCoin2);

        // Page 2
        let fingerCoin = PIXI.Texture.fromFrame('bonusCoinLarge');
        fingerCoin = new PIXI.Sprite(fingerCoin);
        fingerCoin.width = coinSize;
        fingerCoin.height = coinSize;
        fingerCoin.anchor.x = 0.5;
        fingerCoin.anchor.y = 0.5;
        let fingerCoinSpinner = new PIXI.spine.Spine(resLib.spine['transitions'].spineData);
        fingerCoinSpinner.state.setAnimation(0, 'CoinParticles', true);
        fingerCoinSpinner.scale.x = spineScale;
        fingerCoinSpinner.scale.y = spineScale;
        displayList.howToPlayCoin2.addChild(fingerCoin, fingerCoinSpinner);

        // Page 3
        let wheelCoin = PIXI.Texture.fromFrame('bonusWheelCoinLarge');
        wheelCoin = new PIXI.Sprite(wheelCoin);
        wheelCoin.width = coinSize;
        wheelCoin.height = coinSize;
        wheelCoin.anchor.x = 0.5;
        wheelCoin.anchor.y = 0.5;
        let wheelCoinSpinner = new PIXI.spine.Spine(resLib.spine['transitions'].spineData);
        wheelCoinSpinner.state.setAnimation(0, 'CoinParticles', true);
        wheelCoinSpinner.scale.x = spineScale;
        wheelCoinSpinner.scale.y = spineScale;
        displayList.howToPlayCoin3.addChild(wheelCoin, wheelCoinSpinner);
    }

    return {
        init,
    };
});