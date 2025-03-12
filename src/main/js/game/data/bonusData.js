define(() => {
    let bonusData; 
    return bonusData = {
        coinBonus: false, 
        wheelBonus: false, 
        
        reset() {
            bonusData.coinBonus = false;
            bonusData.wheelBonus = false;
        }
    };
});