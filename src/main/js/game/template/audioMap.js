define({
    // IMPLEMENT: Map SFX to channels

    click: ['UI_Click', 7],
    buy: ['UI_BuyButton', 7],
    costMax: ['UI_BetMaxBtn', 6],
    costDown: ['UI_BetDownBtn', 6],
    costUp: ['UI_BetUpBtn', 8],

    BG_music: ['BackgroundMusicLoop', 9],

    Bonus_Transition: ['BonusTransition', 5],
    Bonus_music: ['BonusMusicLoop', 9],
    Bonus_End: ['BonusEnd', 9],
    Wheel_Water: ['WheelWaterIdleLoop', 1],
    Wheel_Gold: ['WheelGoldWater', 2],
    Wheel_Start: ['WheelStartButton', 6],
    Segment_Win: ['WheelWinSegment', 6],

    winTerminator: ['TotalWin', 1],
    loseTerminator: ['GameEnd_NoWin', 1],

    Symbol_Reset: ['SymbolReset', 4],

    match_coinBonus: ['CoinBonusReveal', 8],
    match_wheelBonus: ['WheelBonusReveal', 8],

    coinReveal: ['CoinReveal', 5],

    /*
     * Audio groups
     * A game can include multiple variations of each of these sounds. Ensure each variation starts
     * with the same name plus some kind of ordered suffix. Each time a sound group plays the next 
     * item in the group will be used.
     */

    playerNumber: ['CoinSelect_1', 1],
    playerNumber_2: ['CoinSelect_2', 2],
    playerNumber_3: ['CoinSelect_3', 3],
    playerNumber_4: ['CoinSelect_4', 4],

    AutoplayNumber: ['AllSymbolReveal_1', 1],
    AutoplayNumber_2: ['AllSymbolReveal_2', 2],
    AutoplayNumber_3: ['AllSymbolReveal_3', 3],
    AutoplayNumber_4: ['AllSymbolReveal_4', 4],

    match: ['MatchReveal_1', 5],
    match_2: ['MatchReveal_2', 6],
});
