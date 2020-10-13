$(document).ready(function(){
	
	var goods = [
		{
			name: 'A-Blond',
			url: 'img/Girl1.jpg'
		},
		{
			name: 'Z-Blond',
			url: 'img/Girl1.jpg'
		},
		// {
			// name: 'Blond',
			// url: 'img/Girl1.jpg'
		// },
		// {
			// name: 'Red',
			// url: 'img/Girl2.jpg'
		// },
		{
			name: 'Z-Red',
			url: 'img/Girl2.jpg'
		},
		{
			name: 'A-Red',
			url: 'img/Girl2.jpg'
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
	
	$('.refresh').click(function(){
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
	
	//Сортируем товары
	function sortGoods(oldGoods){
		
		var userCheckSortDir = $('[name=sortOrder]:checked').val();
		var sortDir = 
			userCheckSortDir == 'Up'
				? 1
				: -1;
				
		var register = $('[name=registerSort]:checked').val();
		//filed = 'name' || field == 'url'
		var filed = $('[name=sortField]:checked').val();
		
		var aBiggerThenB = function(a,b){
			var first = a[filed];//a.name;
			var second = b[filed];
			
			if (register == '2'){
				first = first.toLowerCase();
				second = second.toLowerCase();
			}
			
			if (first > second){
				return 1 * sortDir;
			}
			if (first < second){
				return -1 * sortDir;
			}
			return 0;
		};
		
		var copyGoods = oldGoods.sort(aBiggerThenB);
		
		
		
		return copyGoods;
	}

	//Функция получила какие-то товары
	function filterGoods(someGoods){
		//Нашли строку, которую использовал пользователь
		var textFilter = $('.left-menu .filter').val();
		
		var filed = $('[name=sortField]:checked').val();
		
		//Взяли старый массив, забрали из него только не товары, 
		//в имени которых была строка набранная Пользователем.
		// Получился новый массив.
		var filteredGoods = someGoods.filter(function (good){			
			return good[filed].indexOf(textFilter) > -1;
		});
		
		//Вернули новый массив
		return filteredGoods;
	}

	function drawGoods(someGoods){
		for	(var i = 0; i< someGoods.length; i++){
			var good = someGoods[i];
			var goodsDiv = $('<div>');
		
			goodsDiv.addClass('goods');
			
			var divName = $('<div>');
			divName.text(good.name);
			
			var divUrl = $('<div>');
			divUrl.text(good.url);
			
			var divImg = $('<div>');
			divImg.addClass('image');
			var img = $('<img>');
			img.attr('src', good.url);
			divImg.append(img);
			
			goodsDiv.append(divName);
			goodsDiv.append(divUrl);
			goodsDiv.append(divImg);
			
			$('.content').append(goodsDiv);
		}
	}	
});



















