define(require => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const PIXI = require('com/pixijs/pixi');
    const Segment = require('game/components/segment');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    // const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    // const meterData = require('skbJet/componentManchester/standardIW/meterData');
    // const audio = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');

    require('com/gsap/easing/CustomEase');
    const CustomEase = window.CustomEase;

    require('com/gsap/TimelineMax');
    const TimelineMax = window.TimelineMax;

    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    let wheel;

    let wheelResolved;

    let target;

    let wheelMap = ['W11', 'W9', 'W1', 'W10', 'W5', 'W8', 'W11', 'W7', 'W4', 'W10', 'W9', 'W6', 'W11', 'W8', 'W2', 'W10', 'W5', 'W9', 'W11', 'W7', 'W3', 'W10', 'W8', 'W6'];

    // let easeSpeed = CustomEase.create("custom", "M0,0,C0.272,0,0.472,0.455,0.496,0.496,0.574,0.63,0.76,1.02,1,1");
    let easeSpeed = CustomEase.create("custom", "M0,0,C0.272,0,0.371,0.508,0.43,0.692,0.546,1.058,0.866,1,1,1");
    let segmentMap = [];

    // let totalWinAmount = 0;

    function init() {
        wheel = displayList.wbWheel;

        let wheelContainer = new PIXI.Container();
        wheel.addChild(wheelContainer);

        wheelMap.forEach((e, i, a) => {
            let radius = 0;
            let rotation = (((2 * Math.PI) / a.length) * i);
            let offset = 281;

            let segment = new Segment({
                rotation: rotation,
                pivot: radius,
                assignedData: wheelMap[i],
                offset: offset,
                index: i
            });
            segmentMap.push(segment);

            wheelContainer.addChild(segment);
        });
        segmentMap.forEach(e => e.update());
    }

    async function spinWheel(data, callback) {
        // audio.play('spinLoop');
        target = findLandPosition(data.endpoint);

        let timeLine = new TimelineMax({});

        wheel.rotation = wheel.rotation % (Math.PI * 2);
        msgBus.publish('game.bonus.checkData');

        Tween.delayedCall(0.5, () => {
            sustainSpin(wheel, target, timeLine);
        });


        let resolvePromise = new Promise(c => {
            wheelResolved = c;
        });

        resolvePromise.then(() => {
            callback();
        });

    }

    function sustainSpin(wheel, target, timeLine) {
        let rot = - target.rotation - (3 * (Math.PI * 2));

        return timeLine.to(wheel, 4, {
            // ease: window.Power2.easeInOut,
            ease: easeSpeed,
            rotation: rot,
            onComplete: () => {
                target.land();
                wheelResolved();
            }
        }, 0);
    }

    function findLandPosition(endpoint) {
        let map = segmentMap.filter(e => {
            return e.data === endpoint;
        });
        let index = Math.floor(Math.random() * map.length);

        return map[index];
    }

    function updatePrizeAmounts() {
        segmentMap.forEach(e => e.update());
    }

    function addToBonusWin() {

        // totalWinAmount += data.amount;

        // let winCountup = new TimelineMax();

        // winCountup.to(displayList.totalWinValue.scale, 0.3, {
        //     ease: window.Back.easeOut.config(1.7),
        //     x: 2,
        //     y: 2
        // },0);

        // winCountup.to({value: displayList.totalWinValue.text}, 0.25, {
        //     onUpdate: function () {
        //         displayList.totalWinValue.text = SKBeInstant.formatCurrency(this.target.value).formattedAmount;
        //         displayList.totalWinValue.scale.set(2);
        //     },
        //     onComplete:()=>{
        //         meterData.win += data.amount;
        //     },
        //     value: totalWinAmount
        // },0.3);

        // winCountup.to(displayList.totalWinValue.scale, 0.3, {
        //     ease: window.Back.easeOut.config(1.7),
        //     x: 1,
        //     y: 1
        // },1.2);
    }

    function reset() {
        // totalWinAmount = 0;
        segmentMap.forEach(e => e.reset());
        // displayList.totalWinValue.text = SKBeInstant.formatCurrency(0).formattedAmount;
    }

    msgBus.subscribe('MeterData.TicketCost', updatePrizeAmounts);
    msgBus.subscribe('game.wheel.addToBonusWin', addToBonusWin);

    return {
        init,
        spinWheel,
        reset,
    };
});