$(document).ready(function(){
	var numbers0To10 = ['ноль', 'один', 'два', 'три', 'четыре', 
		'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять'];
	var numbers11To19 = ['одинадцать', 'дведадцать', 'тридацать', 'четырнадцать', 
		'пятнадцать', 'шестьнадцать', 'семьдацать', 'восемьнадцать', 'девятьнадцать'];
	var tens = ['двадцать', 'тридцать', 'сорок', 'пятьдесят', 
		'шестьдесять', 'семьдесят', 'восемьдесят', 'девяносто'];
		
	
	$('.coin .process').click(function(){
		var data = $('.coin .data').val() - 0;
		
		var coinText = calcCoinText(data);
		
		$('.coin .result').text(coinText);
	});
	
	function calcCoinText(number){
		if (number < 11)
			return numbers0To10[number];
		if (number < 20){
			return numbers11To19[number - 11];
		}
		
		var array = numberToArray(number);
		var ten = array[1];
		var result = tens[ten - 2];
		var numberOne = array[0];
		if (numberOne > 0){
			result += ' ' + numbers0To10[numberOne];
		}
		
		return result;
	}
	
	function numberToArray(fullNumber){
		var array = [];
		
		while(fullNumber > 0){
			var number = fullNumber % 10;
			array.push(number);
			fullNumber = (fullNumber - number) / 10;
		}
		
		return array;
	}
	
	$('.encrypt .process').click(function(){
		var data = $('.encrypt .data').val() - 0;
		
		var encryptData = encryptNumber(data);
		
		$('.encrypt .result').text(encryptData);
	});
	
	function encryptNumber(data){
		var numbersText = ['ноль', 'один', 'два', 'три'];
		var encryptData = numbersText[data].length;
		return encryptData;
	}

	$('.login-popup').hide();
	$('.login-popup .close').click(function(){
		$('.login-popup').hide();
	});
	
});


// var condition0 = true;
// var condition1 = condition0 && false;

// var condition2 = condition0 || condition1;

// var condition3 = condition2 || (condition1 && condition0);

// var condition3 = !(condition1 && condition0);


// var num1 = 2;
// var num2 = 15;

// //7
// var answer = sum(num1, num2);

// //75
// var answer2 = sum(60, num2);

// var answer3 = sum(50, 100);

// //167 - 1050
// var answer4 = sum(answer, answer3) - sum(5, 7);

// var answer4 = sum(sum(60, 80), sum(1, 1)) - sum(5, 7);

// function sum(anyNumber1, anyNumber2){
	// return anyNumber1 + anyNumber2;
// }


















