$(document).ready(function(){
	var numbers0To10 = ['ноль', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять'];
	var numbers11To19 = ['одинадцать', 'дведадцать', 'тридацать', 'четырнадцать', 'пятнадцать', 'шестьнадцать', 'семьдацать', 'восемьнадцать', 'девятьнадцать'];
	var tens = ['двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесять', 'семьдесят', 'восемьдесят', 'девяносто'];

	
	$('.ana .process').click(function(){
		var data1 = $('.ana .data1').val();
		var data2 = $('.ana .data2').val();
		
		var answer = checkAnn(data1, data2);
		
		$('.ana .result').text(answer);
	});
	
	function checkAnn(word1, word2){
		if (word1.length != word2.length){
			return false;
		}
		
		var arr1 = word1.split('');
		var arr2 = word2.split('');
		
		arr1.sort();
		arr2.sort();
		
		for(var i = 0; i < arr1.length; i++){
			if (arr1[i] != arr2[i]){
				return false;
			}
		}
		
		return true;
	}
	
	$('.Uniq .process').click(function(){
		var symbols = $('.Uniq .data').val().split('');
		
		var uniqSymbols = [];
		
		for(var i = 0; i < symbols.length; i++){
			var symbol = symbols[i];
			
			if (uniqSymbols.indexOf(symbol) < 0){
				uniqSymbols.push(symbol);
			}
		}
		
		
		$('.Uniq .result').text(uniqSymbols);
	});
	
	$('.min .process').click(function(){
		var numbers = $('.min .data').val().split(' ');
		
		var answer = minNumb(numbers);
		
		$('.min .result').text(answer);
	});
	
	function minNumb(numbers){
		var min = [undefined, undefined, undefined];
		// min[0] = numbers[0];
		// min[1] = numbers[1];
		// min[2] = numbers[2];
		// min.sort();
		
		for(var i = 0; i < numbers.length; i++){
			var number = numbers[i] - 0;
			
			for(var minIndex = 0; minIndex < min.length; minIndex++){
				if (min[minIndex] == undefined || number < min[minIndex]){
					minHelper(min, number, minIndex);
					break;
				}
			}
			
			// if (!min[0] || number < min[0]){
				// minHelper(min, number, 0);
			// }else if (!min[1] || number < min[1]){
				// minHelper(min, number, 1);
			// }else if (!min[2] || number < min[2]){
				// minHelper(min, number, 2);
			// }
		}
		
		return min;
	}
	
	function minHelper(min, number, index){
		for(var i = min.length - 1; i > index; i--){
			min[i] = min[i-1];
		}
		
		min[index] = number;
	}
	
	$('.pol .process').click(function(){
		var userInput = $('.pol .data').val();
		
		var answer = capitalLetter(userInput);
		
		$('.pol .result').text(answer);
	});
	
	function capitalLetter(line){
		var newLine = [];
		newLine[0] = line[0].toUpperCase();
		newLine[1] = line[1];
		
		for(var i = 2; i < line.length; i++){
			if (line[i - 2] == '.'){
				newLine[i] = line[i].toUpperCase();
			}else{
				newLine[i] = line[i];
			}
			
			// newLine[i] = line[i - 2] == '.' ///условие
							// ? line[i].toUpperCase() // true
							// : line[i];	// false
		}
		
		return newLine.join('');
	}
	
	$('.textarearCool .process').click(function(){
		var data = $('.textarearCool .data').val();
		
		var answer = data.replaceAll('\n', '<br>');
		
		$('.textarearCool .result')[0].innerHTML = answer;
	});
	
	$('.num .process').click(function(){
		var data = $('.num .data').val();
		var numberCount = calcNumberCount(data);
		$('.num .result').text(numberCount);
	});
	
	function calcNumberCount(line){
		var answer = 0;
		//Идём ли мы уже по начатому числу
		var numberWasStarted = false;
		//Встречали ли точки
		var flagDot = false;
		
		for(var i = 0; i < line.length /2 ; i++){
			var symbol = line[i];
			if ( !isNaN(symbol) ){
				if (!numberWasStarted)
				{
					//Начали число
					answer++;
					numberWasStarted = true;
				}
			}else{
				if (symbol == '.' && !flagDot) {
					//Встретили первую точку
					flagDot = true;
				} else {
					//Законичили число
					numberWasStarted = false;
					flagDot = false;
				}
			}
		}
		
		return answer;
	}
	
	$('.bra .process').click(function(){
		var data = $('.bra .data').val();
		var isGood = checkBra(data);
		$('.bra .result').text(isGood);
	});
	
	function checkBra(line){
		var braPairs = [
			['(', ')'],
			['<', '>'],
			['[', ']'],
		];
		
		var expected = [];
		
		for(var iText = 0; iText < line.length ; iText++){
			// '('
			var symbol = line[iText];
			
			for(var iBra = 0; iBra < braPairs.length ; iBra++){
				//['(', ')']
				var onePairOfBra  = braPairs[iBra];
				
				//open
				if (onePairOfBra[0] == symbol){
					expected.push(onePairOfBra[1]);
				}
				
				//close
				if (onePairOfBra[1] == symbol){
					var indexLastEpected = expected.length - 1;
					var lastEpected = expected[indexLastEpected];
					if (lastEpected == symbol){
						//Удаляем последний элемент из списка ожидаемых скобок
						expected.splice(indexLastEpected, 1);
					}else{
						return false;
					}
				}
			}
			
		}
		
		return expected.length == 0;
	}

	
	$('.coin .process').click(function(){
		var data = $('.coin .data').val() - 0;
		
		var coinText = calcCoinText(data);
		
		$('.coin .result').text(coinText);
	});
	
	function calcCoinText(number){
		if (number > 99){
			number = number % 100;
		}
		
		//например 73
		if (number < 11)
			return numbers0To10[number];
		if (number < 20){
			return numbers11To19[number - 11];
		}
		
		//[3,7] Сначала храним единицы. Например 3. Потому десятки 7
		var array = numberToArray(number);
		//Десятков 7
		var ten = array[1];
		//Среди массива десятков берём 5 элементы
		var result = tens[ten - 2];
		//Единицы. Их 3
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

// for(var i = 0; i < someArray.length ; i++){
	// someArray[i];
// }


















