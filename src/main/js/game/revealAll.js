define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const Timeline = require('com/gsap/TimelineLite');

    const playerNumbers = require('game/components/playerNumbers');
    const coinBonus = require('game/components/coinBonus');

    let revealAllTimelines;
    let revealAllTimeline, revealAllTimeline2, revealAllTimeline3, revealAllTimeline4;
    let revealAllTimelineCB;
    let autoPlayActive = false;

    function startBG() {
        const revealPlayer = playerNumbers.revealAll();

        displayList.playerNumbers.interactiveChildren = false;

        let count = 0;
        let delayFirstRow, delaySecondRow, delayThirdRow;
        Object.keys(revealPlayer).forEach((tw, i) => {
            switch (i) {
                case 1:
                    delayFirstRow = count * gameConfig.autoPlayPlayerRowInterval;
                    break;
                case 2:
                    delaySecondRow = count * gameConfig.autoPlayPlayerRowInterval;
                    break;
                case 3:
                    delayThirdRow = count * gameConfig.autoPlayPlayerRowInterval;
                    break;
            }
            revealPlayer[tw].length ? count++ : null;
        });
        //Then the player numbers
        revealAllTimeline = new Timeline({
            tweens: [
                new Timeline({ tweens: revealPlayer.c0, stagger: gameConfig.autoPlayPlayerNumberInterval }),
            ],
            align: 'sequence'
        });
        revealAllTimeline2 = new Timeline({
            tweens: [
                new Timeline({ tweens: revealPlayer.c1, stagger: gameConfig.autoPlayPlayerNumberInterval }),
            ],
            align: 'sequence',
            delay: delayFirstRow
        });
        revealAllTimeline3 = new Timeline({
            tweens: [
                new Timeline({ tweens: revealPlayer.c2, stagger: gameConfig.autoPlayPlayerNumberInterval }),
            ],
            align: 'sequence',
            delay: delaySecondRow
        });
        revealAllTimeline4 = new Timeline({
            tweens: [
                new Timeline({ tweens: revealPlayer.c3, stagger: gameConfig.autoPlayPlayerNumberInterval }),
            ],
            align: 'sequence',
            delay: delayThirdRow
        });

        revealAllTimelines = [revealAllTimeline, revealAllTimeline2, revealAllTimeline3, revealAllTimeline4];

        return revealAllTimelines;
    }

    function stopBG() {
        // re-enable all interaction at the parent container level
        displayList.playerNumbers.interactiveChildren = true;
        // kill the revealAll timeline if active
        if (revealAllTimelines) {
            revealAllTimelines.forEach(r => {
                r.kill();
                r = undefined;
            });
        }
        else if (revealAllTimeline) {
            revealAllTimeline.kill();
            revealAllTimeline = undefined;
        }
    }

    /**
     * COIN BONUS REVEAL FUNCTIONALITY
     */
    function startCB() {
        const revealPlayer = coinBonus.revealAll();

        revealAllTimelineCB = new Timeline();
        displayList.coinBonus.interactiveChildren = false;

        //Then the player numbers
        revealAllTimelineCB = new Timeline({
            tweens: [
                new Timeline({ tweens: revealPlayer, stagger: gameConfig.autoPlayCoinBonusInterval }),
            ],
            align: 'sequence'
        });
        return revealAllTimelineCB;
    }

    function stopCB() {
        // re-enable all interaction at the parent container level
        displayList.coinBonus.interactiveChildren = true;
        // kill the revealAll timeline if active
        if (revealAllTimelineCB) {
            revealAllTimelineCB.kill();
            revealAllTimelineCB = undefined;
        }
    }

    function start(gameType) {
        gameType === 'baseGame' ? startBG() : startCB();
        autoPlayActive = true;
        msgBus.publish('UI.updateButtons', {
            autoPlay: { visible: false },
        });
    }

    function stop(gameType) {
        gameType === 'baseGame' ? stopBG() : stopCB();
        autoPlayActive = false;
    }

    function reset() {
        autoPlayActive = false;
    }

    return {
        start,
        stop,
        reset,
        autoPlayActive,
    };
});
