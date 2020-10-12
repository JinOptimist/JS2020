$(document).ready(function(){
	
	var goods = [
		{
			name: 'Blond',
			url: 'data:image/jpeg;base64,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'
		},
		{
			name: 'Red',
			url: 'data:image/jpeg;base64,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'
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
		refreshGoods();
	});
	
	$('.left-menu .filter').keyup(function (){
		refreshGoods();
	});
	
	//Обновить все товары
	function refreshGoods(){
		$('.content .goods:not(.first)').remove();
		
		//Отдавли все товары
		//Получили товары подходящие под запрос пользователя
		var filteredGoods = filterGoods(goods);
		
		//Отдали товары подходящие под запрос пользователя
		//Отдали товары подходящие под запрос пользователя в нужном порядке
		var filteredAndSortedGoods = sortGoods(filteredGoods);
		
		//Нарисует товары
		drawGoods(filteredAndSortedGoods);
	}
	
	function sortGoods(oldGoods){
		var copyGoods = oldGoods.sort(function(a,b){
			if (a.name > b.name){
				return 1;
			}
			if (a.name < b.name){
				return -1;
			}
			return 0;
		});
		
		return copyGoods;
	}

	//Получила какие-то товары
	function filterGoods(someGoods){
		var textFilter = $('.left-menu .filter').val();
		
		var filteredGoods = someGoods.filter(function (good){
			return good.name.indexOf(textFilter) > -1;
		});
		
		return filteredGoods;
	}

	function drawGoods(someGoods){
		for	(var i = 0; i< someGoods.length; i++){
			var good = someGoods[i];
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



















