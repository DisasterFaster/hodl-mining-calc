var netHashRate = roiData.netHashRate;
var reward = roiData.reward;
var currentBlock = roiData.lastBlock;
var exchangeHODLBTC = roiData.exchangeHODLBTC;
var exchangeBTCUSD = roiData.exchangeBTCUSD;
var exchangeHODLUSD =  exchangeROIBTC * exchangeBTCUSD ;

function updateReward() {
		var dailyValue = ($("#userHash").val() * reward) / netHashRate;
		var weeklyValue = dailyValue * 7;
		var monthlyValue = dailyValue * 30;
		$("#dailyEarnings").text("Earnings per day: " + dailyValue.toFixed(2) + " ROI ($" + (dailyValue * exchangeHODLUSD).toFixed(2) +")");
		$("#weeklyEarnings").text("Earnings per week: " + weeklyValue.toFixed(2) + " ROI ($" + (weeklyValue * exchangeROIUSD).toFixed(2) +")");
		$("#monthlyEarnings").text("Earnings per month: " + monthlyValue.toFixed(2) + " ROI ($" + (monthlyValue * exchangeROIUSD).toFixed(2) +")");
}

function updateScenario() {

	// get term deposits formula for interest and scenario section. 
	// https://bitcointalk.org/index.php?topic=2361848.0
    var blockTime = 120; // in seconds
    var blocksPerDay = (24*60*60) / 120; // 720.00

	var principal = $("#principal").val(); // initial investment, get from form
	var term = $("#term").val(); // in days, get from form
	var futureExchangeScenario = $("#futureExchangeScenario").val(); // get from form
	var blocksDuringTerm = blocksPerDay * term;

	// compound interest forumla: A = P ( 1+r ) ^ t
	var standardInterestRate = Math.pow(0.5,18); // (1/2^18) compounded every block	
	var standardInterestDuringTerm = (principal * Math.pow(1 + standardInterestRate, blocksDuringTerm)) - principal;


	// bonus interest
	// Principal + (Standard Interest + (Bonus Interest * Bonus Multiplier))
	var maxBonusRate = Math.pow(0.5,16);
	var bonusInterestDuringTerm = (principal * Math.pow(1 + maxBonusRate, blocksDuringTerm)) - principal; 

	// Full bonus on term is Principal + ((Standard Interest + (Bonus Interest))
	var effectiveBonus = (standardInterestDuringTerm + bonusInterestDuringTerm)
	var depositInterestDuringTerm = effectiveBonus - standardInterestDuringTerm - bonusInterestDuringTerm;

	var totalCoins = principal + effectiveBonus;
	var futureValue = totalCoins * futureExchangeScenario;
	var scenarioString = "Under this scenario you will have " + totalCoins + " ROI with a total USD value of $" + futureValue;

	$("#scenario").html(scenarioString);

}

// attach events
$("#userHash").keyup(updateReward);
$("#miningHardware").change(function () {
	$("#userHash").val($("#miningHardware").val());
	updateReward();
});

$("#term").keyup(updateScenario);
$("#principal").keyup(updateScenario);
$("#futureExchangeScenario").keyup(updateScenario);

var netInfoString = "<b>Exchange Rate:</b> $" + exchangeHODLUSD.toFixed(5);
netInfoString = netInfoString + "<br /><b>HODL to BTC:</b> " + exchangeHODLBTC.toFixed(8);
netInfoString = netInfoString + "<br /><b>BTC to USD:</b> $" + exchangeBTCUSD.toFixed(2);
netInfoString = netInfoString + "<br /><br /><b>Current Block:</b> " + currentBlock;
netInfoString = netInfoString + "<br /><b>Network Hashrate:</b> " + netHashRate;

$("#networkInfo").html(netInfoString);
$("#exchangeRate").html("Exchange Rate: $" + exchangeHODLUSD.toFixed(5) + "<br /> (HODL to BTC: " + exchangeHODLBTC.toFixed(8) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; BTC to USD:" + exchangeBTCUSD.toFixed(2) +")");
$("#term").val(exchangeHODLUSD); // set default predicted exchange rate




