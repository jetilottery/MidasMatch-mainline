define(require => {
    const PIXI = require('com/pixijs/pixi');
    const atlasPage = '_atlas_page_';
    const hF = 'highlightFX';
    const wB = 'WheelBonus';
    const wA = 'WinAnims';
    const png = '.png';
    const jpg = '.jpg';
    const assets = [
        hF + atlasPage + hF + jpg,
        hF + atlasPage + hF + png,
        wB + atlasPage + wB + jpg,
        wB + atlasPage + wB + png,
        wB + atlasPage + wB + '2' + jpg,
        wB + atlasPage + wB + '2' + png,
        wB + atlasPage + wB + '3' + jpg,
        wB + atlasPage + wB + '3' + png,
        wB + atlasPage + wB + '4' + jpg,
        wB + atlasPage + wB + '4' + png,
        wB + atlasPage + wB + '5' + jpg,
        wB + atlasPage + wB + '6' + jpg,
        wB + atlasPage + wB + '7' + jpg,
        wB + atlasPage + wB + '8' + jpg,
        wA + atlasPage + wA + jpg,
        wA + atlasPage + wA + png,
        wA + atlasPage + wA + '2' + jpg,
        wA + atlasPage + wA + '3' + jpg,
        wA + atlasPage + wA + '4' + jpg,
    ];

    function preload(app, callback) {
        assets.forEach(asset => {
            app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache[asset]);
        });

        app.renderer.plugins.prepare.upload(callback);
    }

    return {
        preload
    };
});