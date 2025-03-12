define(require => {
    const PIXI = require('com/pixijs/pixi');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');

    require('com/gsap/TimelineMax');
    const Timeline = window.TimelineMax;

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    // let winPlaqueAnimBG;
    let winPlaqueAnimFG;

    function init() {
        // let graphicWinPlaque = new PIXI.Graphics();
        // graphicWinPlaque.beginFill('0X000000');
        // graphicWinPlaque.drawRect(0, 0, 1440, 1440);
        // graphicWinPlaque.alpha = 0.15;
        // graphicWinPlaque.pivot.x = 720;
        // graphicWinPlaque.pivot.y = 720;
        // displayList.winPlaqueBacking.addChild(graphicWinPlaque);

        // winPlaqueAnimBG = new PIXI.spine.Spine(resLib.spine['WinAnims'].spineData);
        // winPlaqueAnimBG.state.setAnimation(0, 'WinPlaquePopBG', true);
        // displayList.winPlaqueAnimBG = winPlaqueAnimBG;
        // displayList.winPlaqueBG.parent.addChildAt(winPlaqueAnimBG, 1);

        // Light rays

        let texture = PIXI.Texture.fromFrame('lightRay');
        let sprite = new PIXI.Sprite(texture);
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.x = 3;
        sprite.scale.y = 3;
        sprite.alpha = 0.9;
        sprite.x = 10;
        sprite.y = -150;
        displayList.winPlaqueBacking.addChild(sprite);

        displayList.winPlaqueBacking.visible = false;

        let lightRayAnim = new Timeline({ repeat: -1 });
        let lightRayAlpha = new Timeline({ repeat: -1, yoyo: true });

        // lightRayAnim.add(Tween.to(sprite, 3, { rotation: 0.3, ease: 'Linear.easeNone' }, 0));
        // lightRayAnim.add(Tween.to(sprite, 3, { rotation: 0, ease: 'Linear.easeNone' }, 0));

        // lightRayAlpha.add(Tween.to(sprite, 1, { alpha: 0.4, ease: 'Linear.easeNone' }, 0));

        lightRayAnim.add(Tween.to(sprite, 4, { rotation: 0.2, ease: 'Power1.easeInOut' }, 0));
        lightRayAnim.add(Tween.to(sprite, 4, { rotation: 0, ease: 'Power1.easeInOut' }, 0));

        lightRayAlpha.add(Tween.to(sprite, 1, { alpha: 0.5, ease: 'Power1.easeInOut' }, 0));


        // // Light rays

        // let texture_2 = PIXI.Texture.fromFrame('lightRay');
        // let sprite_2 = new PIXI.Sprite(texture_2);
        // sprite_2.anchor.set(0.5, 0.5);
        // sprite_2.scale.x = 1.5;
        // sprite_2.scale.y = 1.5;
        // sprite_2.x = 10;
        // sprite_2.y = -150;
        // // sprite_2.alpha = 0.1;
        // displayList.winPlaqueBacking.addChildAt(sprite_2, 1);

        // let lightRayAnim_2 = new Timeline({ delay: 3, repeat: -1 });
        // let lightRayAlpha_2 = new Timeline({ delay: 0.5, repeat: -1, yoyo: true });

        // lightRayAnim_2.add(Tween.to(sprite_2, 3, { rotation: 0.3, ease: window.Power2.easeInOut }, 0));
        // lightRayAnim_2.add(Tween.to(sprite_2, 3, { rotation: 0, ease: window.Power2.easeInOut }, 0));

        // lightRayAlpha_2.add(Tween.to(sprite_2, 1, { alpha: 0.4, ease: window.Power2.easeInOut }, 0));

        // Win Plaque Foreground Spine 

        winPlaqueAnimFG = new PIXI.spine.Spine(resLib.spine['WinAnims'].spineData);
        winPlaqueAnimFG.state.setAnimation(0, 'WinPlaquePop', true);
        winPlaqueAnimFG.scale.x = 0.84;
        winPlaqueAnimFG.scale.y = 0.84;
        displayList.winPlaqueAnimFG = winPlaqueAnimFG;
        displayList.winPlaqueBG.parent.addChildAt(winPlaqueAnimFG, displayList.winPlaqueBG.parent.children.length - 1);

        displayList.winPlaqueCloseButton.on('press', hide);
    }

    function show() {
        if (gameConfig.showResultScreen && !gameConfig.suppressNonWinResultPlaque) {
            displayList.winPlaqueBacking.visible = true;
        }
        if (meterData.totalWin > 0) {
            // winPlaqueAnimBG.state.setAnimation(0, 'WinPlaquePopBG', true);
            winPlaqueAnimFG.state.setAnimation(0, 'WinPlaquePop', true);

            Tween.delayedCall(3, () => {
                winPlaqueAnimFG.state.clearTrack(0);
                winPlaqueAnimFG.skeleton.setToSetupPose();
            });

            if (gameConfig.showResultScreen) {
                displayList.winPlaqueBacking.visible = true;
            }
        }
    }

    function hide() {
        displayList.winPlaqueBacking.visible = false;
    }

    msgBus.subscribe('UI.showResult', show);
    msgBus.subscribe('UI.hideResult', hide);

    return {
        init,
    };
});