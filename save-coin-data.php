#!/usr/local/bin/php

<?php

	$ch1 = curl_init();
	curl_setopt_array($ch1, array(
    	CURLOPT_RETURNTRANSFER => 1,
    	CURLOPT_URL => 'http://yobit.net/api/3/ticker/roi_btc',
    	CURLOPT_USERAGENT => 'ROICoin Miner'
	));

	$resp1 = json_decode(curl_exec($ch1));
	
	curl_close($ch1);

	$ch2 = curl_init();
	curl_setopt_array($ch2, array(
    	CURLOPT_RETURNTRANSFER => 1,
    	CURLOPT_URL => 'http://yobit.net/api/3/ticker/btc_usd',
    	CURLOPT_USERAGENT => 'ROICoin Miner'
	));
	
	$resp2 = json_decode(curl_exec($ch2));

	curl_close($ch2);

	$ch3 = curl_init();
	curl_setopt_array($ch3, array(
    	CURLOPT_RETURNTRANSFER => 1,
    	CURLOPT_URL => 'http://http://45.76.246.101:3001/api/getnetworkhashps',
    	CURLOPT_USERAGENT => 'ROICoin Miner'
	));
	
	$resp3 = json_decode(curl_exec($ch3));

	curl_close($ch3);

	$exchangeHODLBTC = $resp1->roi_btc->last;
	$exchangeBTCUSD = $resp2->btc_usd->last;

	$netHashRate = $resp3->data;
	
	// last block api is broken, fix when avaialable
	$lastBlock = 54484;

	//$exchangeRate = $exchangeROIBTC * $exchangeBTCUSD;



	$file = dirname(__FILE__) . '/roidata.js';
	$data = 'var hodlData = {"netHashRate":'. $netHashRate . ',"exchangeROIBTC":' . number_format($exchangeROIBTC, 8) . ',"exchangeBTCUSD":'. $exchangeBTCUSD . ',"lastBlock":'. $lastBlock . ',"reward":28050,"updated":' . time() .'};';
	
	file_put_contents($file, $data, LOCK_EX);
?>
