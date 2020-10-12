$(document).ready(function(){
	
	var goods = [
		{
			name: 'Blond',
			url: 'http...'
		},
		{
			name: 'Red',
			url: 'http..2'
		},
	];
	
	$('.login-popup').hide();
	
	$('.login-popup .close').click(function(){
		$('.login-popup').hide();
	});
	
	$('.goods.first .add').click(function(){
		var newName = $('.goods.first .new-image-name').val();
		var newUrl = $('.goods.first .new-image-url').val();
		
		var good = {
			name: newName,
			url: newUrl
		};
		goods.push(good);
		drawGoods();
	});
	
	function drawGoods(){
		$('.content .goods:not(.first)').remove();
		
		//sort goods
		
		for	(var i = 0; i< goods.length; i++){
			var good = goods[i];
			var goodsDiv = $('<div>');
		
			goodsDiv.addClass('goods');
			
			var divName = $('<div>');
			divName.text(good.name);
			
			var divImg = $('<div>');
			divImg.addClass('image');
			var img = $('<img>');
			img.attr('src', good.url);
			divImg.append(img);
			
			goodsDiv.append(divName);
			goodsDiv.append(divImg);
			
			$('.content').append(goodsDiv);
		}
		
		
	}
});

