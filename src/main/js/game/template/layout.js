define({
  _BASE_APP: {
    children: ['backgrounds', 'logoContainer', 'infoArea', 'playerNumbers', 'coinBonus', 'wheelBonus', 'transitions'],
  },

  /*
   * BACKGROUND
   */
  backgrounds: {
    type: 'container',
    children: ['baseGameBG', 'coinBonusBG', 'wheelBonusBG']
  },

  baseGameBG: {
    type: 'container',
    children: ['landscapeBG', 'portraitBG'],
  },

  landscapeBG: {
    type: 'container',
    x: 720,
    y: 390,
    portrait: {
      visible: false,
    },
    landscape: {
      visible: true,
    }
  },

  portraitBG: {
    type: 'container',
    x: 405,
    y: 690,
    portrait: {
      visible: true,
    },
    landscape: {
      visible: false,
    }
  },

  coinBonusBG: {
    type: 'container',
    children: ['coinLandscapeBG', 'coinPortraitBG'],
  },

  coinLandscapeBG: {
    type: 'container',
    x: 720,
    y: 390,
    portrait: {
      visible: false,
    },
    landscape: {
      visible: true,
    }
  },

  coinPortraitBG: {
    type: 'container',
    x: 405,
    y: 688,
    portrait: {
      visible: true,
    },
    landscape: {
      visible: false,
    }
  },

  wheelBonusBG: {
    type: 'sprite',
    landscape: {
      texture: 'WheelBonusBGLand',
    },
    portrait: {
      texture: 'wheelBonusPortrait',
    },
  },

  logoContainer: {
    type: 'container',
    children: ['logo', 'logoSparkle']
  },

  /*
   * LOGO
   */
  logo: {
    type: 'sprite',
    anchor: 0.5,
    landscape: {
      texture: 'landscape_gameLogo',
      x: 180,
      y: 125,

    },
    portrait: {
      texture: 'portrait_gameLogo',
      x: 405,
      y: 123,
    },
  },

  /*
   * LOGO
   */
  logoSparkle: {
    type: 'container',
    landscape: {
      x: 720,
      y: 415,

    },
    portrait: {
      x: 922,
      y: 410,
    },
  },

  infoArea: {
    type: 'container',
    children: ['infoPillar', 'winUpTo', 'coinDesc'],
    portrait: {
      y: 18
    }
  },

  infoPillar: {
    type: 'sprite',
    landscape: {
      texture: 'infoAreaLand',
      x: 0,
      y: 210,
    },
    portrait: {
      texture: 'infoAreaPort',
      x: 13,
      y: 180,
    },
  },

  /*
   * WIN UP TO
   */
  winUpTo: {
    type: 'container',
    children: ['winUpToIn', 'winUpToOut', 'winUpToIn2', 'winUpToOut2'],
    landscape: {
      x: 174,
      y: 232
    },
    portrait: {
      x: 402,
      y: 198
    },
  },
  winUpToIn: {
    type: 'container',
    children: ['winUpToInText'],
  },
  winUpToInText: {
    type: 'text',
    style: 'winUpTo',
    string: 'winUpTo',
    anchor: 0.5,
    maxWidth: 330,
  },
  winUpToOut: {
    type: 'container',
    children: ['winUpToOutText'],
  },
  winUpToOutText: {
    type: 'text',
    style: 'winUpTo',
    string: 'winUpTo',
    anchor: 0.5,
    maxWidth: 330,
  },
  winUpToIn2: {
    type: 'container',
    children: ['winUpToInText2'],
  },
  winUpToInText2: {
    type: 'text',
    style: 'winUpTo2',
    string: 'winUpTo',
    anchor: 0.5,
    maxWidth: 330,
    y: 40
  },
  winUpToOut2: {
    type: 'container',
    children: ['winUpToOutText2'],
  },
  winUpToOutText2: {
    type: 'text',
    style: 'winUpTo2',
    string: 'winUpTo',
    anchor: 0.5,
    maxWidth: 330,
    y: 40
  },

  coinDesc: {
    type: 'container',
    children: ['revealTo'],
    landscape: {
      x: 174,
      y: 377
    },
    portrait: {
      x: 405,
      y: 315
    },
  },
  revealTo: {
    type: 'container',
    children: ['revealToText', 'coin1', 'coin2'],
  },
  revealToText: {
    type: 'text',
    style: 'winUpTo',
    string: 'revealForBonus',
    align: 'center',
    anchor: 0.5,
    maxWidth: 330,
  },

  coin1: {
    // texture: 'infoBonusCoin',
    // scale: 0.85,
    type: 'container',
    landscape: {
      x: -55,
      y: 99,
      scale: 1,
    },
    portrait: {
      x: -330,
      y: -1,
      scale: 0.9,
    },
  },

  coin2: {
    // texture: 'infoBonusWheel',
    // scale: 0.85,
    type: 'container',
    landscape: {
      x: 55,
      y: 99,
      scale: 1,
    },
    portrait: {
      x: 330,
      y: -1,
      scale: 0.9,
    },
  },

  /*
   * PLAYER NUMBERS
   */
  playerNumbers: {
    type: 'container',
    children: [
      'backBushesPort',
      'playerNumber1',
      'playerNumber2',
      'playerNumber3',
      'playerNumber4',
      'playerNumber5',
      'midBushes',
      'playerNumber6',
      'playerNumber7',
      'playerNumber8',
      'playerNumber9',
      'playerNumber10',
      'frontBushes',
      'playerNumber11',
      'playerNumber12',
      'midBushesPort',
      'playerNumber13',
      'playerNumber14',
      'playerNumber15',
      'playerNumber16',
      'frontBushesPort',
    ],
    landscape: {
      x: 360,
      y: 115
    },
    portrait: {
      x: 100,
      y: 470
    },
  }, /////////////////////////////
  backBushesPort: {
    type: 'sprite',
    portrait: {
      visible: true,
      x: -100,
      y: 355,
      texture: 'backBushes_Port',
    },
    landscape: {
      visible: false,
    }
  },
  playerNumber1: {
    type: 'container',
    landscape: {
      x: 100,
      y: 10
    },
    portrait: {
      x: 0,
      y: 0
    },
  },
  playerNumber2: {
    type: 'container',
    landscape: {
      x: 305,
      y: 5
    },
    portrait: {
      x: 205,
      y: 0
    },
  },
  playerNumber3: {
    type: 'container',
    landscape: {
      x: 510,
      y: -3
    },
    portrait: {
      x: 410,
      y: 0
    },
  },
  playerNumber4: {
    type: 'container',
    landscape: {
      x: 715,
      y: 9
    },
    portrait: {
      x: 610,
      y: 0
    },
  },
  playerNumber5: {
    type: 'container',
    landscape: {
      x: 920,
      y: 14
    },
    portrait: {
      x: 0,
      y: 185
    },
  }, /////////////////////////////
  midBushes: {
    type: 'sprite',
    landscape: {
      texture: 'backBushes',
      x: -11,
      y: 245
    }
  },
  playerNumber6: {
    type: 'container',
    landscape: {
      x: 120,
      y: 210
    },
    portrait: {
      x: 205,
      y: 185
    },
  },
  playerNumber7: {
    type: 'container',
    landscape: {
      x: 335,
      y: 209
    },
    portrait: {
      x: 410,
      y: 185
    },
  },
  playerNumber8: {
    type: 'container',
    landscape: {
      x: 540,
      y: 214
    },
    portrait: {
      x: 610,
      y: 185
    },
  },
  playerNumber9: {
    type: 'container',
    landscape: {
      x: 745,
      y: 210
    },
    portrait: {
      x: 0,
      y: 370
    },
  },
  playerNumber10: {
    type: 'container',
    landscape: {
      x: 950,
      y: 218
    },
    portrait: {
      x: 205,
      y: 370
    },
  }, //////////////////////////////////////
  frontBushes: {
    type: 'sprite',
    landscape: {
      visible: true,
      texture: 'frontBushes',
      x: -255,
      y: 440
    },
    portrait: {
      visible: false,
    }
  },
  playerNumber11: {
    type: 'container',
    landscape: {
      x: 0,
      y: 403
    },
    portrait: {
      x: 410,
      y: 370
    },
  },
  playerNumber12: {
    type: 'container',
    landscape: {
      x: 195,
      y: 410
    },
    portrait: {
      x: 610,
      y: 370
    },
  }, //////////////////////////////////////
  midBushesPort: {
    type: 'sprite',
    portrait: {
      x: -100,
      y: 505,
      texture: 'backMidBushes_Port',
    },
  },
  playerNumber13: {
    type: 'container',
    landscape: {
      x: 390,
      y: 410
    },
    portrait: {
      x: 0,
      y: 555
    },
  },
  playerNumber14: {
    type: 'container',
    landscape: {
      x: 585,
      y: 415
    },
    portrait: {
      x: 205,
      y: 555
    },
  },
  playerNumber15: {
    type: 'container',
    landscape: {
      x: 780,
      y: 410
    },
    portrait: {
      x: 410,
      y: 555
    },
  },
  playerNumber16: {
    type: 'container',
    landscape: {
      x: 975,
      y: 414
    },
    portrait: {
      x: 610,
      y: 555
    },
  }, //////////////////////////////////////
  frontBushesPort: {
    type: 'sprite',
    portrait: {
      x: -100,
      y: 695,
      texture: 'frontBushes_Port',
    },
  },

  coinBonus: {
    type: 'container',
    children: [
      'coinBonusInfo',
      'coinBonusP1',
      'coinBonusP2',
      'coinBonusP3',
      'coinBonusP4',
      'coinBonusP5',
      'coinBonusP6',
      'coinBonusP7',
      'coinBonusP8',
      'coinBonusP9',
      'coinBonusP10',
      'bonusRevealAllContainer',
    ],
  },

  coinBonusInfo: {
    type: 'container',
    children: [
      'cbInfoBG',
      'cbInfoDesc',
      'cbInfoTotalFade',
      'cbInfoTotal',
    ],
    portrait: {
      y: 190,
    },
    landscape: {
      y: 0,
    },
  },

  cbInfoBG: {
    type: 'sprite',
    anchor: 0.5,
    landscape: {
      texture: 'coinBonusMessage',
      x: 730,
      y: 105,
      scale: {
        x: 0.95,
        y: 0.95,
      },
    },
    portrait: {
      texture: 'coinBonusMessage',
      x: 403,
      y: 105,
      scale: {
        x: 1,
        y: 1,
      },
    },
  },

  cbInfoDesc: {
    type: 'text',
    string: 'coinDesc',
    style: 'coinDesc',
    anchor: 0.5,
    wordWrap: false,
    maxWidth: 600,
    align: 'center',
    landscape: {
      x: 720,
      y: 105
    },
    portrait: {
      x: 405,
      y: 105
    },
  },

  cbInfoTotal: {
    type: 'text',
    style: 'coinTotal',
    anchor: 0.5,
    wordWrap: true,
    wordWrapWidth: 600,
    align: 'center',
    landscape: {
      x: 720,
      y: 113
    },
    portrait: {
      x: 405,
      y: 113
    },
  },

  cbInfoTotalFade: {
    type: 'text',
    style: 'coinTotal',
    anchor: 0.5,
    wordWrap: true,
    wordWrapWidth: 600,
    align: 'center',
    landscape: {
      x: 720,
      y: 113
    },
    portrait: {
      x: 405,
      y: 113
    },
  },

  coinBonusP1: {
    type: 'container',
    landscape: {
      x: 170,
      y: 355
    },
    portrait: {
      x: 120,
      y: 610
    },
  },

  coinBonusP2: {
    type: 'container',
    landscape: {
      x: 460,
      y: 390
    },
    portrait: {
      x: 380,
      y: 680
    },
  },

  coinBonusP3: {
    type: 'container',
    landscape: {
      x: 755,
      y: 345
    },
    portrait: {
      x: 650,
      y: 555
    },
  },

  coinBonusP4: {
    type: 'container',
    landscape: {
      x: 1040,
      y: 380
    },
    portrait: {
      x: 110,
      y: 825
    },
  },

  coinBonusP5: {
    type: 'container',
    landscape: {
      x: 1330,
      y: 355
    },
    portrait: {
      x: 300,
      y: 960
    },
  },

  coinBonusP6: {
    type: 'container',
    landscape: {
      x: 125,
      y: 555
    },
    portrait: {
      x: 540,
      y: 915
    },
  },

  coinBonusP7: {
    type: 'container',
    landscape: {
      x: 425,
      y: 605
    },
    portrait: {
      x: 705,
      y: 765
    },
  },

  coinBonusP8: {
    type: 'container',
    landscape: {
      x: 745,
      y: 560
    },
    portrait: {
      x: 130,
      y: 1120
    },
  },

  coinBonusP9: {
    type: 'container',
    landscape: {
      x: 1025,
      y: 595
    },
    portrait: {
      x: 455,
      y: 1125
    },
  },

  coinBonusP10: {
    type: 'container',
    landscape: {
      x: 1295,
      y: 570
    },
    portrait: {
      x: 695,
      y: 1075
    },
  },

  bonusRevealAllContainer: {
    type: 'container',
    children: ['bonusRevealAll'],
    anchor: 0.5,
    landscape: {
      x: 720,
      y: 701
    },
    portrait: {
      x: 405,
      y: 1300
    }
  },

  bonusRevealAll: {
    type: 'button',
    string: 'button_autoPlay',
    textures: {
      enabled: 'mainButtonEnabled',
      over: 'mainButtonOver',
      pressed: 'mainButtonPressed',
      disabled: 'mainButtonDisabled'
    },
    style: {
      enabled: 'tutorialOKButtonEnabled',
      over: 'tutorialOKButtonOver',
      pressed: 'tutorialOKButtonPressed',
      disabled: 'standardButtonPressed',
    },
  },

  wheelBonus: {
    type: 'container',
    children: ['wheelBonusInfo', 'leftPillar', 'rightPillar', 'wbSpine', 'wbWheel', 'wbWheelFG', 'wbArrow', 'wbTextLand', 'wbInfoTextLand', 'wbInfoTextLandFade', 'bonusSpinButtonContainer'],
  },

  wheelBonusInfo: {
    type: 'container',
    children: [
      'wbInfoBG',
      'wbInfoTextFade',
      'wbInfoText',
    ],
    landscape: {
      visible: false,
    },
    portrait: {
      y: 190,
      visible: true,
    },
  },

  wbInfoBG: {
    type: 'sprite',
    anchor: 0.5,
    landscape: {
      texture: 'coinBonusMessage',
      x: 730,
      y: 105,
    },
    portrait: {
      texture: 'coinBonusMessage',
      x: 403,
      y: 105,
    },
  },

  wbInfoText: {
    type: 'text',
    style: 'wheelInfoText',
    anchor: 0.5,
    wordWrap: true,
    wordWrapWidth: 600,
    align: 'center',
    portrait: {
      x: 405,
      y: 107
    },
  },

  wbInfoTextFade: {
    type: 'text',
    style: 'wheelInfoText',
    anchor: 0.5,
    wordWrap: true,
    wordWrapWidth: 600,
    align: 'center',
    portrait: {
      x: 405,
      y: 107
    },
  },


  leftPillar: {
    type: 'sprite',
    texture: 'wheelBonusForegroundLand',
    landscape: {
      x: -7,
      y: 210
    },
    portrait: {
      x: -307,
      y: 604
    },
  },

  rightPillar: {
    type: 'sprite',
    texture: 'wheelBonusForegroundLandArrow',
    landscape: {
      x: 1023,
      y: 367
    },
    portrait: {
      x: 690,
      y: 752
    },
  },

  wbSpine: {
    type: 'container',
    landscape: {
      x: 720,
      y: 405
    },
    portrait: {
      x: 405,
      y: 720
    },
  },

  wbWheel: {
    type: 'container',
    landscape: {
      x: 720,
      y: 422,
    },
    portrait: {
      x: 400,
      y: 800,
    },
  },

  wbWheelFG: {
    type: 'container',
    landscape: {
      x: 718,
      y: 419,
    },
    portrait: {
      x: 400,
      y: 800,
    },
  },

  wbArrow: {
    type: 'sprite',
    texture: 'goldarrow',
    landscape: {
      x: 1023,
      y: 367
    },
    portrait: {
      x: 690,
      y: 749
    },
  },

  wbTextLand: {
    type: 'text',
    style: 'wheelDesc',
    string: 'wheelDesc',
    anchor: 0.5,
    wordWrap: false,
    maxWidth: 600,
    align: 'center',
    landscape: {
      x: 720,
      y: 50,
      visible: true,
    },
    portrait: {
      visible: false,
    },
  },

  wbInfoTextLand: {
    type: 'text',
    style: 'wheelInfoText',
    anchor: 0.5,
    wordWrap: false,
    maxWidth: 320,
    align: 'center',
    landscape: {
      x: 1252,
      y: 424,
      visible: true
    },
    portrait: {
      visible: false
    },
  },

  wbInfoTextLandFade: {
    type: 'text',
    style: 'wheelInfoText',
    anchor: 0.5,
    wordWrap: false,
    maxWidth: 320,
    align: 'center',
    landscape: {
      x: 1252,
      y: 424,
      visible: true
    },
    portrait: {
      visible: false
    },
  },


  bonusSpinButtonContainer: {
    type: 'container',
    children: ['bonusSpinButton'],
    anchor: 0.5,
    landscape: {
      x: 720,
      y: 701
    },
    portrait: {
      x: 405,
      y: 1300
    }
  },

  bonusSpinButton: {
    type: 'button',
    string: 'wb_button_start',
    textures: {
      enabled: 'mainButtonEnabled',
      over: 'mainButtonOver',
      pressed: 'mainButtonPressed',
      disabled: 'mainButtonDisabled'
    },
    style: {
      enabled: 'tutorialOKButtonEnabled',
      over: 'tutorialOKButtonOver',
      pressed: 'tutorialOKButtonPressed',
      disabled: 'standardButtonPressed',
    },
  },

  transitions: {
    type: 'container',
    landscape: {
      x: 720,
      y: 405,
    },
    portrait: {
      x: 405,
      y: 720,
    },
  },

  /*
   * How To Play
   */

  howToPlayOverlay: {
    type: 'sprite',
    landscape: {
      texture: 'landscape_tutorialOverlay',
      y: 0
    },
    portrait: {
      texture: 'portrait_tutorialOverlay',
      y: -100
    },
  },
  howToPlayContainer: {
    type: 'container',
    children: [
      'howToPlayOverlay',
      'howToPlayBackground',
      'howToPlayPages',
      'versionText',
      'audioButtonContainer',
      'howToPlayPrevious',
      'howToPlayNext',
      'howToPlayClose',
      'howToPlayIndicators',
    ],
    portrait: {
      y: 100,
    },
    landscape: {
      y: 0,
    },
  },
  howToPlayBackground: {
    type: 'sprite',
    anchor: {
      x: 0.5
    },
    y: 98,
    landscape: {
      x: 720,
      texture: 'landscape_tutorialBackground',
    },
    portrait: {
      x: 405,
      texture: 'portrait_tutorialBackground',
    },
  },
  versionText: {
    type: 'text',
    style: 'versionText',
    x: 46,
    y: 133,
    alpha: 0.5,
  },
  howToPlayClose: {
    type: 'button',
    string: 'button_ok',
    landscape: {
      x: 720,
      y: 671
    },
    portrait: {
      x: 405,
      y: 951
    },
    textures: {
      enabled: 'tutorialOKButtonEnabled',
      over: 'tutorialOKButtonOver',
      pressed: 'tutorialOKButtonPressed',
    },
    style: {
      enabled: 'tutorialOKButtonEnabled',
      over: 'tutorialOKButtonOver',
      pressed: 'tutorialOKButtonPressed',
    },
  },
  howToPlayPrevious: {
    type: 'button',
    landscape: {
      x: 72,
      y: 418
    },
    portrait: {
      x: 70,
      y: 568
    },
    textures: {
      enabled: 'tutorialLeftButtonEnabled',
      disabled: 'tutorialLeftButtonDisabled',
      over: 'tutorialLeftButtonOver',
      pressed: 'tutorialLeftButtonPressed',
    },
  },
  howToPlayNext: {
    type: 'button',
    landscape: {
      x: 1368,
      y: 418
    },
    portrait: {
      x: 740,
      y: 568
    },
    textures: {
      enabled: 'tutorialRightButtonEnabled',
      disabled: 'tutorialRightButtonDisabled',
      over: 'tutorialRightButtonOver',
      pressed: 'tutorialRightButtonPressed',
    },
  },

  howToPlayIndicators: {
    type: 'container',
    children: ['howToPlayIndicatorActive', 'howToPlayIndicatorInactive'],
    landscape: {
      x: 720,
      y: 600
    },
    portrait: {
      x: 405,
      y: 870
    },
  },
  audioButtonContainer: {
    type: 'container',
    landscape: {
      x: 79,
      y: 671
    },
    portrait: {
      x: 78,
      y: 951
    },
  },

  howToPlayPages: {
    type: 'container',
    children: ['howToPlayPage1', 'howToPlayPage2', 'howToPlayPage3'],
  },

  howToPlayPage1: {
    type: 'container',
    children: ['howToPlayTitle1', 'howToPlayPageText1', 'howToPlayBonusCoins1'],
  },
  howToPlayTitle1: {
    type: 'text',
    string: 'howToPlay',
    style: 'howToPlayTitle',
    anchor: 0.5,
    y: 178,
    landscape: {
      x: 720
    },
    portrait: {
      x: 405
    },
  },
  howToPlayPageText1: {
    type: 'text',
    string: 'page1',
    style: 'howToPlayText',
    fontSize: 30,
    wordWrap: true,
    anchor: 0.5,
    align: 'center',
    landscape: {
      x: 720,
      y: 350,
      wordWrapWidth: 1100
    },
    portrait: {
      x: 405,
      y: 520,
      wordWrapWidth: 560
    },
  },
  howToPlayBonusCoins1: {
    type: 'container',
    landscape: {
      x: 720,
      y: 530
    },
    portrait: {
      x: 405,
      y: 670
    },
  },

  howToPlayPage2: {
    type: 'container',
    children: ['howToPlayTitle2', 'howToPlayCoin2', 'howToPlayPageText2'],
  },
  howToPlayTitle2: {
    type: 'text',
    string: 'coinBonus',
    style: 'howToPlayTitle',
    anchor: 0.5,
    y: 178,
    landscape: {
      x: 720
    },
    portrait: {
      x: 405
    },
  },
  howToPlayCoin2: {
    type: 'container',
    landscape: {
      x: 720,
      y: 310,
      scale: {
        x: 0.7,
        y: 0.7,
      }
    },
    portrait: {
      x: 405,
      y: 375
    },
  },
  howToPlayPageText2: {
    type: 'text',
    string: 'page2',
    style: 'howToPlayText',
    fontSize: 30,
    wordWrap: true,
    anchor: 0.5,
    align: 'center',
    landscape: {
      x: 720,
      y: 485,
      wordWrapWidth: 1100
    },
    portrait: {
      x: 405,
      y: 650,
      wordWrapWidth: 560
    },
  },

  howToPlayPage3: {
    type: 'container',
    children: ['howToPlayTitle3', 'howToPlayCoin3', 'howToPlayPageText3'],
  },
  howToPlayTitle3: {
    type: 'text',
    string: 'wheelBonus',
    style: 'howToPlayTitle',
    anchor: 0.5,
    y: 178,
    landscape: {
      x: 720
    },
    portrait: {
      x: 405
    },
  },
  howToPlayCoin3: {
    type: 'container',
    landscape: {
      x: 720,
      y: 310,
      scale: {
        x: 0.7,
        y: 0.7,
      }
    },
    portrait: {
      x: 405,
      y: 375
    },
  },
  howToPlayPageText3: {
    type: 'text',
    string: 'page3',
    style: 'howToPlayText',
    fontSize: 30,
    wordWrap: true,
    anchor: 0.5,
    align: 'center',
    landscape: {
      x: 720,
      y: 485,
      wordWrapWidth: 1100
    },
    portrait: {
      x: 405,
      y: 650,
      wordWrapWidth: 560
    },
  },


  resultPlaquesContainer: {
    type: 'container',
    children: [
      'resultPlaqueOverlay',
      'winPlaqueBacking',
      'bigWinCoins',
      'winPlaqueBG',
      'winPlaqueMessage',
      'winPlaqueValue',
      'winPlaqueCloseButton',
      'losePlaqueBG',
      'losePlaqueMessage',
      'losePlaqueCloseButton',
    ],
    landscape: {
      x: 720,
      y: 377
    },
    portrait: {
      x: 405,
      y: 725
    },
  },

  resultPlaqueOverlay: {
    type: 'sprite',
    anchor: 0.5,
  },

  winPlaqueBacking: {
    type: 'container',
    anchor: 0.5,
  },

  bigWinCoins: {
    type: 'container',
    landscape: {
      x: -720,
      y: -377
    },
    portrait: {
      x: -405,
      y: -725
    },
  },

  winPlaqueBG: {
    type: 'sprite',
    anchor: 0.5,
    texture: 'winPlaque',
  },

  winPlaqueMessage: {
    type: 'text',
    string: 'message_win',
    style: 'winPlaqueBody',
    y: -60,
    anchor: 0.5,
    maxWidth: 400
  },
  winPlaqueValue: {
    type: 'text',
    style: 'winPlaqueValue',
    y: 35,
    anchor: 0.5,
    maxWidth: 400

  },
  winPlaqueCloseButton: {
    type: 'button',
    alpha: 0,
    textures: {
      enabled: 'winPlaque',
      over: 'winPlaque',
      pressed: 'winPlaque',
    },
  },

  losePlaqueBG: {
    type: 'sprite',
    anchor: 0.5,
    texture: 'losePlaque',
  },
  losePlaqueMessage: {
    type: 'text',
    string: 'message_nonWin',
    style: 'losePlaqueBody',
    anchor: 0.5,
    portrait: {
      maxWidth: 400
    },
    landscape: {
      maxWidth: 400
    },
  },
  losePlaqueCloseButton: {
    type: 'button',
    alpha: 0,
    textures: {
      enabled: 'losePlaque',
      over: 'losePlaque',
      pressed: 'losePlaque',
    },
  },

  timeoutExit: {
    type: 'button',
    landscape: {
      x: 585,
      y: 560
    },
    portrait: {
      x: 270,
      y: 775
    },
    style: {
      enabled: 'errorButtonEnabled',
      over: 'errorButtonOver',
      pressed: 'errorButtonPressed',
    },
    textures: {
      enabled: 'timeOutButtonEnabled',
      over: 'timeOutButtonOver',
      pressed: 'timeOutButtonPressed',
    },
  },
  timeoutContinue: {
    type: 'button',
    landscape: {
      x: 855,
      y: 560
    },
    portrait: {
      x: 540,
      y: 775
    },
    style: {
      enabled: 'errorButtonEnabled',
      over: 'errorButtonOver',
      pressed: 'errorButtonPressed',
    },
    textures: {
      enabled: 'timeOutButtonEnabled',
      over: 'timeOutButtonOver',
      pressed: 'timeOutButtonPressed',
    },
  },

  buyButtonAnim: {
    type: 'sprite',
    anchor: 0.5,
    x: -10,
    y: -5,
  },
  tryButtonAnim: {
    type: 'sprite',
    anchor: 0.5,
    x: -10,
    y: -5,
  },
  buyButton: {
    type: 'button',
    string: 'button_buy',
    textures: {
      enabled: 'buyButtonEnabled',
      over: 'buyButtonOver',
      pressed: 'buyButtonPressed',
      disabled: 'buyButtonDisabled',
    },
    style: {
      enabled: 'buyButtonEnabled',
      over: 'buyButtonOver',
      pressed: 'buyButtonPressed',
      disabled: 'buyButtonDisabled',
    },
  },
  tryButton: {
    type: 'button',
    string: 'button_try',
    textures: {
      enabled: 'buyButtonEnabled',
      over: 'buyButtonOver',
      pressed: 'buyButtonPressed',
      disabled: 'buyButtonDisabled',
    },
    style: {
      enabled: 'buyButtonEnabled',
      over: 'buyButtonOver',
      pressed: 'buyButtonPressed',
      disabled: 'buyButtonDisabled',
    },
  },

  // buttonBar:{
  //     type: 'container',
  //     portrait: {
  //         y: 1245,
  //     }
  // },

  autoPlayButton_default: {
    type: 'point',
    landscape: {
      x: 720,
      y: 700
    },
    portrait: {
      x: 405,
      y: 1300
    },
  },
  autoPlayButton_multi: {
    type: 'point',
    landscape: {
      x: 918,
      y: 700
    },
    portrait: {
      x: 405,
      y: 1300
    },
  },

  ticketSelectBarSmall: {
    type: 'container',
    landscape: {
      x: 580,
      y: 699
    },
    portrait: {
      x: 405,
      y: 1205
    },
    children: [
      'ticketSelectBarBG',
      'ticketSelectCostValue',
      'ticketCostDownButtonStatic',
      'ticketCostUpButtonStatic',
      'ticketCostDownButton',
      'ticketCostUpButton',
      'ticketCostIndicators',
    ],
  },
  ticketCostDownButton: {
    type: 'button',
    portrait: {
      x: -208
    },
    landscape: {
      x: -143
    },
    textures: {
      enabled: 'minusButtonEnabled',
      disabled: 'minusButtonDisabled',
      over: 'minusButtonOver',
      pressed: 'minusButtonPressed',
    },
  },
  ticketCostUpButton: {
    type: 'button',
    portrait: {
      x: 208
    },
    landscape: {
      x: 143
    },
    textures: {
      enabled: 'plusButtonEnabled',
      disabled: 'plusButtonDisabled',
      over: 'plusButtonOver',
      pressed: 'plusButtonPressed',
    },
  },
  ticketCostDownButtonStatic: {
    type: 'sprite',
    anchor: 0.5,
    portrait: {
      x: -208
    },
    landscape: {
      x: -143
    },
    texture: 'minusButtonDisabled'
  },
  ticketCostUpButtonStatic: {
    type: 'sprite',
    anchor: 0.5,
    portrait: {
      x: 208
    },
    landscape: {
      x: 143
    },
    texture: 'plusButtonDisabled'
  },
  buttonBar: {
    type: 'container',
    landscape: {
      x: 0,
      y: 649
    },
    portrait: {
      x: 0,
      y: 1250
    },
    children: [
      'helpButtonStatic',
      'helpButton',
      'homeButtonStatic',
      'homeButton',
      'exitButton',
      'playAgainButton',
      'tryAgainButton',
      'buyButton',
      'buyButtonAnim',
      'tryButton',
      'tryButtonAnim',
      'moveToMoneyButton',
      'retryButton',
    ],
  },
  footerContainer: {
    type: 'container',
    children: ['footerBG', 'balanceMeter', 'ticketCostMeter', 'winMeter', 'divider_1_3', 'divider_2_3', 'divider_1_2'],
    landscape: {
      y: 761
    },
    portrait: {
      y: 1349
    },
  },
  footerBG: {
    type: 'sprite',
    landscape: {
      texture: 'landscape_footerBar',
      y: 5
    },
    portrait: {
      texture: 'portrait_footerBar',
      y: 5
    },
  },
});