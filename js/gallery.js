$(document).ready(function(){	
	var goods = [
		{
			id: 1,
			name: 'A-Blond',
			url: 'img/Girl1.jpg'
		},
		{
			id: 2,
			name: 'z-blond',
			url: 'img/girl3.jpg'
		},
		{
			id: 3,
			name: 'A-Red',
			url: 'img/Girl2.jpg'
		},
		{
			id: 4,
			name: 'Z-blond',
			url: 'img/girl6.png'
		},
		{
			id: 5,
			name: 'Z-blond',
			url: 'img/mei.png'
		},
		{
			id: 6,
			name: 'Z-blond',
			url: 'img/tracer.png'
		},
		{
			id: 7,
			name: 'Z-blond',
			url: 'img/girl7.png'
		},
	];
	
	var curentId = 0;
	
	refreshGoods();
	updateCarousel();
	
	$('.login-popup').hide();
	
	$('.step-forward').click(function(){
		curentId--;
		curentId = calcIndex(curentId);
		updateCarousel();
	});
	
	$('.step-back').click(function(){
		curentId++;
		curentId = calcIndex(curentId);
		
		var rightGood = sortGoods(goods)[calcIndex(curentId + 1)];
		$('.fake-right .right-image').attr('src', rightGood.url);
		
		$('.carousel .small.back').animate(
			{ 
				width: "-=250px",
			}, 2000);
		$('.carousel .image.center').animate(
			{ 
				width: "-=250px",
				height: "-=250px",
				opacity: "-=0.5",
			}, 2000);
			
		$('.carousel .fake-right').animate(
			{ 
				width: "+=250px",
			}, 2000);
		$('.carousel .forward.small').animate(
			{ 
				opacity: "+=0.5",
				height: "+=250px",
				width: "+=250px",
			}, 2000,
			"swing",
			updateCarousel);
	});
	
	function defaultCss(){
		$('.carousel .small.back').css('width', '250px');
		
		$('.carousel .image.center').css('width', '500px');
		$('.carousel .image.center').css('height', '500px');
		$('.carousel .image.center').css('opacity', '1');
		
		$('.carousel .fake-right').css('width', '0');
	
		$('.carousel .forward.small').css('height', '250px');
		$('.carousel .forward.small').css('width', '250px');
		$('.carousel .forward.small').css('opacity', '0.5');
	}
	
	function updateCarousel(){
		defaultCss();
		
		var updateGoods = sortGoods(goods);
		
		var leftIndex = calcIndex(curentId - 1);
		var rightIndex = calcIndex(curentId + 1);
		
		var good = updateGoods[curentId];
		var leftGood = updateGoods[leftIndex];
		var rightGood = updateGoods[rightIndex];
		
		$('.center-image').attr('src', good.url);		
		$('.left-image').attr('src', leftGood.url);
		$('.right-image').attr('src', rightGood.url);
	}
	
	function calcIndex(index){
		index %= goods.length;
		if (index < 0){
			index += goods.length;
		}
		// 0 <= index < 5
		return index;
	}
	
	$('.login-popup .close').click(function (){
		$('.login-popup').hide();
	});
	
	$('.goods.first .add').click(function(){
		var newName = $('.goods.first .new-image-name').val();
		var newUrl = $('.goods.first .new-image-url').val();
		
		//good => good.Id
		//Тоже самое по старому
		// function (good)
		// {
			// return good.Id;
		// }
		
		var good = {
			id: goods.sort((a,b) => b.id - a.id)[0].id + 1, 
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
		var field = $('[name=sortField]:checked').val();
		
		var aBiggerThenB = function(a,b){
			var first = a[field];//a.name;
			var second = b[field];
			
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
		
			goodsDiv.click(fullScreen);
			goodsDiv.attr('data-id', good.id);
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
	
	function fullScreen(){
		$('.login-popup').show();
		$('.login-content-center').empty();
		
		var goodId = $(this).attr('data-id');
		var good = goods.filter(x => x.id == goodId)[0];
		
		var img = $('<img>');
		img.attr('src', good.url);
		
		$('.login-content-center').append(img);
	}
});



















