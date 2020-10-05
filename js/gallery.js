$(document).ready(function(){
	$('.login-popup').hide();
	
	$('.login-popup .close').click(function(){
		$('.login-popup').hide();
	});
	
	$('.goods.first .add').click(function(){
		var name = $('.goods.first .new-image-name').val();
		var url = $('.goods.first .new-image-url').val();
		
		var goodsDiv = $('<div>');
		goodsDiv.addClass('goods');
		
		var divName = $('<div>');
		divName.text(name);
		
		var divImg = $('<div>');
		divImg.addClass('image');
		var img = $('<img>');
		img.attr('src', url);
		divImg.append(img);
		
		goodsDiv.append(divName);
		goodsDiv.append(divImg);
		
		$('.content').append(goodsDiv);
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


















