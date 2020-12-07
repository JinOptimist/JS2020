var firstActiveCard = undefined;
var secondActiveCard = undefined;
	
$(document).ready(function(){	
	var goods = [
		{
			id: 1,
			name: 'Sweet school girl',
			url: 'img/Girl1.png'
		},
		{
			id: 2,
			name: 'yang Diva',
			url: 'img/girl3.jpg'
		},
		{
			id: 3,
			name: 'White bich',
			url: 'img/Girl2.jpg'
		},
		{
			id: 4,
			name: 'Hinata',
			url: 'img/girl6.png'
		},
		{
			id: 5,
			name: 'Mei classic',
			url: 'img/mei.png'
		},
		{
			id: 6,
			name: 'Sound relax',
			url: 'img/Girl8.png'
		},
		{
			id: 7,
			name: 'Z-blond',
			url: 'img/girl7.png'
		},
		{
			id: 8,
			name: 'Snipe girl',
			url: 'img/Girl9.png'
		},
		{
			id: 9,
			name: 'MachineGun girl',
			url: 'img/Girl10.png'
		},
		{
			id: 10,
			name: 'Killer',
			url: 'img/Girl11.png'
		},
		{
			id: 11,
			name: 'Almost visible BOOBS',
			url: 'img/Girl12.png'
		},
		{
			id: 12,
			name: 'Vamp',
			url: 'img/Girl13.png'
		},
		{
			id: 13,
			name: 'Sico bloody boobs',
			url: 'img/Girl14.png'
		},
		{
			id: 14,
			name: 'Goodness white nude',
			url: 'img/Girl4.png'
		},
		
	];
	
	var deck = [];
	var deckSize = 9;
	var coverUrl = 'img/cover.png';
	
	var timeToSeeCard = 1 * 1000;
	
	var curentId = 2;
	var animationInAction = false;
	var mouseOnImage = false;
	var animationSpeed = 2 * 1000;
	var flipSpeed = 0.3 * 1000;	
	var flipSpeedMin = 0.4 * 1000;	
	var flipSpeedMax = 1.5 * 1000;	
	
	var minSize = 1;
	var maxSize = 5;
	
	var chanceRandomFlip = 0.02;
	
	var actionQueue = [];
	
	init();
	refreshGoods();
	updateCarousel();
	
	function addTimer(){
		var current = $('.timer').data('second') - 0;
		current++;
		$('.timer').data('second', current);
		$('.timer').text(current);
	}
	
	setInterval(addTimer, 1000);
	//setInterval(stepBack, 3 * 1000);	
	setInterval(checkAnimation, 100);
	
	setInterval(randomFlip, 1000);
	
	
	function init(){
		$('.login-popup').hide();
		
		for	(var i = 0; i < goods.length; i++){
			goods[i].size = randomInteger(minSize, maxSize);
			goods[i].buity = randomInteger(1, 10);
		}
		
		drawCharts();
		
		initTab();
		
		buildDeck();
		drawDeck();
	}
	
	function buildDeck(){
		for(var i = 0; i < deckSize; i++){
			deck.push(i);
			deck.push(i);
		}
		
		for(var i = 0; i < 100; i++){
			shuffle();
		}
		
		for(var i = 0; i < deck.length; i++){
			deck[i] = goods[deck[i]];
		}
	}
	
	function drawDeck(){
		for(var i = 0; i < deck.length; i++){
			var card = deck[i];
			
			var cardDiv = $('<div>');
			cardDiv.click(onCardClick);
			cardDiv.attr('data-card-id', card.id);
			cardDiv.addClass('card');
			
			var img = $('<img>');
			img.attr('src', card.url);		
			var divHeadSide = $('<div>');
			divHeadSide.addClass('head-side');
			divHeadSide.addClass('side');
			
			divHeadSide.append(img);
			
			var imgCover = $('<img>');
			imgCover.attr('src', coverUrl);		
			var divTailSide = $('<div>');
			divTailSide.addClass('tail-side');
			divTailSide.addClass('side');
			divTailSide.addClass('displayed');			
			divTailSide.append(imgCover);
			
			cardDiv.append(divHeadSide);			
			cardDiv.append(divTailSide);
			
			$('.twoCardField').append(cardDiv);
		}
	}
	
	function shuffle(){
		var firstCard = randomInteger(0, deck.length - 1);
		var secondCard = randomInteger(0, deck.length - 1);
		
		var temp = deck[firstCard];
		deck[firstCard] = deck[secondCard];
		deck[secondCard] = temp;
	}
	
	function initTab(){
		var tabNames = [];
		$('.tab').each(function(i, elem){
			var tabName = $(elem).data('tab-name');
			tabNames.push(tabName);
		});
		
		for(var i = 0;i < tabNames.length; i++){
			var name = tabNames[i];
			
			var nameDiv = $('<div>');
			nameDiv.addClass('tab-title');
			nameDiv.text(name);
			nameDiv.attr('tab-id', name);
			nameDiv.click(showTab);
			
			$('.tab-header').append(nameDiv);
		}
		var lastTab = $('.tab-title:last-child');
		lastTab.trigger( "click" );
	}
	
	function showTab(){
		$('.tab').hide();
		var tabId = $(this).attr('tab-id');
		$('.tab[data-tab-name=' + tabId + ']').show();
	}
	
	function drawCharts(){
		drawOneChart('chartSize', 'line');
		drawAvarageChart('chartDuplicate', 'bar');
	}
	
	function drawOneChart(canvasId, type){
		var names = goods.map(x => x.name);
		var sizes = goods.map(x => x.size);
		var buitys = goods.map(x => x.buity);
		var namesLength = goods.map(x => x.name.length);
		
		var ctx = document.getElementById(canvasId).getContext('2d');
		var chart = new Chart(ctx, {
			type: type,

			// The data for our dataset
			data: {
				labels: names,
				datasets: [
				{
					label: 'Girl sizes',
					backgroundColor: 'rgb(125, 0, 0)',
					borderColor: 'rgb(250, 0, 0)',
					data: sizes
				},
				{
					label: 'Girl buitys',
					borderColor: 'rgb(0, 250, 0)',
					data: buitys
				},
				/*{
					label: 'Girl name length',
					borderColor: 'rgb(0, 0, 250)',
					data: namesLength
				}*/]
			},

			// Configuration options go here
			options: {}
		});
	}
	
	function drawAvarageChart(canvasId, type){
		var sizesGoods = [];
		
		for	(var i = minSize; i <= maxSize; i++){
			sizesGoods[i] = [];
		}
		
		for	(var i = 0; i < goods.length; i++){
			var good = goods[i];
			sizesGoods[good.size].push(good);
		}
		
		var resultDataSet = [];
		for	(var i = 1; i < sizesGoods.length; i++){
			var sizesGood = sizesGoods[i];
			
			var summ = sizesGood.length > 0 
				? sizesGood
					.map(x => x.buity)
					.reduce((a, b) => a + b)
				: 0;
			resultDataSet.push({
				size: i,
				avarage: summ / sizesGood.length
			});
		}
		
		var ctx = document.getElementById(canvasId).getContext('2d');
		var chart = new Chart(ctx, {
			type: type,

			// The data for our dataset
			data: {
				labels: resultDataSet.map(x => 's - ' + x.size),
				datasets: [
				{
					label: 'Girl sizes',
					backgroundColor: 'rgb(125, 0, 0)',
					borderColor: 'rgb(250, 0, 0)',
					data: resultDataSet.map(x => x.avarage)
				}]
			},

			// Configuration options go here
			options: {
				scales: {
					yAxes: [{
						ticks: {
							min: 0,
							max: 10
						}
					}]
				}
			}
		});
	}
	
	function checkAnimation(){
		drawQueue();
		if (!mouseOnImage && !animationInAction && actionQueue.length > 0){
			var someFunText = actionQueue.shift();
			someFunText();
		}
	}
	
	function drawQueue(){
		$('.queue').empty();
		var actions = actionQueue.map(x => x.name);
		for	(var i = 0; i < actions.length ; i++){
			var span = $('<span>');
			span.text(`${i}) ${actions[i]}`);
			$('.queue').append(span);
		}
	}
	
	function randomFlip(){
		var girlCards = $('.goods');
		girlCards.each((i, elem) => {
			if (Math.random() <= chanceRandomFlip){
				$(elem).data('speed', random(flipSpeedMin, flipSpeedMax));
				var axe = Math.random() <= 0.5 ? 'Y' : 'X';
				$(elem).data('axe', axe);
				elem.click();
			}
		});
	}
	
	function random(min, max){
		return min + Math.random() * (max - min);
	}
	
	function randomInteger(min, max) {
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		return Math.round(rand);
	}
	
	//setInterval(stepForward, 4000);
	
	$('.buttons').hover(
		() => { mouseOnImage = true; },//Когда навели мышку
		() => { mouseOnImage = false; }//Когда убрали мышку
	);
	
	$('.step-forward').click(stepForward);
	function stepForward(){		
		var right = () => {
			niceMove(false);
		};
		actionQueue.push(right);
	}
	
	$('.step-back').click(stepBack);	
	function stepBack(){
		var left = () => {
			niceMove(true);
		};
		actionQueue.push(left);
	}
	
	function niceMove(dir){
		animationInAction = true;
		curentId =  dir 
			? calcIndex(++curentId)
			: calcIndex(--curentId);
		
		updateFakeCarousel();
		
		var dirPlus = dir ? '+' : '-';
		var dirMinus = dir ? '-' : '+';
		
		var smallBlockDisappeared = dir ? 'back' : 'forward';
		$(`.carousel .small.${smallBlockDisappeared}`).animate(
			{ 
				width: `0px`,
			}, animationSpeed);
			
		var smallGonaBigger = dir ? 'right' : 'left';
		$(`.carousel .fake.${smallGonaBigger}`).animate(
			{ 
				width: `+=250px`,
			}, animationSpeed);
		
		var smallBlockAppeared = dir ? 'forward': 'back';
		$(`.carousel .${smallBlockAppeared}.small`).animate(
			{ 
				opacity: `+=0.5`,
				height: `+=250px`,
				width: `+=250px`,
			}, animationSpeed);
		
		$('.carousel .image.center').animate(
			{ 
				width: `-=250px`,
				height: `-=250px`,
				opacity: `-=0.5`,
			}, animationSpeed,
			"swing",
			updateCarousel);
	}
	
	function updateFakeCarousel(){
		var updateGoods = sortGoods(goods);
		
		var leftIndex = calcIndex(curentId - 1);
		var rightIndex = calcIndex(curentId + 1);
		
		var good = updateGoods[curentId];
		var leftGood = updateGoods[leftIndex];
		var rightGood = updateGoods[rightIndex];
		
		$('.fake.left .left-image').attr('src', leftGood.url);
		$('.fake.right .right-image').attr('src', rightGood.url);
	}
	
	function defaultCss(){
		$('.carousel .small.back').css('width', '250px');
		$('.carousel .small.back').css('height', '250px');
		$('.carousel .small.back').css('opacity', '0.5');
		
		$('.carousel .image.center').css('width', '500px');
		$('.carousel .image.center').css('height', '500px');
		$('.carousel .image.center').css('opacity', '1');
		
		$('.carousel .fake.right').css('width', '0');
		$('.carousel .fake.left').css('width', '0');
	
		$('.carousel .small.forward').css('height', '250px');
		$('.carousel .small.forward').css('width', '250px');
		$('.carousel .small.forward').css('opacity', '0.5');
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
		
		animationInAction = false;
	}
	
	function calcIndex(index){
		index = index % goods.length;
		if (index < 0){
			index = index + goods.length;
		}
		// 0 <= index < 5
		return index;
	}
	
	$('.login-popup .close').click(closePopup);
	function closePopup(){
		$('.login-popup').hide();
	}
	
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
		updateCarousel();
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
		
			//goodsDiv.click(fullScreen);
			goodsDiv.click(onGoodClick);
			goodsDiv.attr('data-id', good.id);
			goodsDiv.addClass('goods');
			
			var divName = $('<div>');
			divName.text(good.name + ' s = ' + good.size);
			
			var divUrl = $('<div>');
			divUrl.text(good.url);
			
			var divImg = $('<div>');
			divImg.addClass('image');
			var img = $('<img>');
			img.attr('src', good.url);
			divImg.append(img);
			
			var divInfoBlock = $('<div>');
			divInfoBlock.addClass('info-block');
			divInfoBlock.text(good.name);
			
			var divHeadSide = $('<div>');
			divHeadSide.addClass('head-side');
			divHeadSide.addClass('side');
			divHeadSide.addClass('displayed');
			
			divHeadSide.append(divName);
			divHeadSide.append(divUrl);
			divHeadSide.append(divImg);
			
			var divTailSide = $('<div>');
			divTailSide.addClass('tail-side');
			divTailSide.addClass('side');
			divTailSide.append(divInfoBlock);
			
			goodsDiv.append(divHeadSide);			
			goodsDiv.append(divTailSide);
			
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
	
	function onGoodClick(){
		var good = $(this);
		flip(good);
	}
	
	function flip(jElem){
		//$(this).animateRotate(90);
		var girlCard = jElem;
		var isAnimatedActive = girlCard.data('is-animated-active');
		if (isAnimatedActive){
			return false;
		}
		girlCard.data('is-animated-active', true);
		var axe = girlCard.data('axe');
		
		flipBlock(girlCard, 0 ,90 , () => {
			girlCard.find('.side').toggleClass('displayed');
			flipBlock(girlCard, -90, 0, () => {
				girlCard.data('is-animated-active', false);
			}, axe);
		}, axe);
	}
	
	function flipBlock(elem, fromAngel, toAngel, complete, axe){
		if (!axe){
			axe = 'Y';
		}
		var speed = elem.data('speed');
		if (!speed){
			speed = flipSpeed;
		}
		$({deg: fromAngel}).animate({deg: toAngel}, {
			duration: speed - 0,
			easing: 'linear',
			step: function(now) {
				elem.css({
					transform: `rotate${axe}(${now}deg)`
				});
			},
			complete: complete
		});
	}
	
	function onCardClick(){
		var clickedCard = $(this);
		if (!!secondActiveCard || clickedCard.attr('data-is-done') == 1){
			return;
		}
		
		flip(clickedCard);
		if (!firstActiveCard){
			firstActiveCard = clickedCard;			
			return;
		}
		if (firstActiveCard[0] == clickedCard[0]){
			firstActiveCard = undefined;
			return;
		}
		
		secondActiveCard = clickedCard;
		var id1 = firstActiveCard.attr('data-card-id');		
		var id2 = secondActiveCard.attr('data-card-id');
		if (id1 != id2){
			setTimeout(function() {
				flip(firstActiveCard);
				flip(secondActiveCard);
				firstActiveCard = undefined;
				secondActiveCard = undefined;
			}, timeToSeeCard);
			return;
		}
		
		setTimeout(function() {
				doneCard(firstActiveCard);
				doneCard(secondActiveCard);
				firstActiveCard = undefined;
				secondActiveCard = undefined;
			}, timeToSeeCard);
	}
	
	function doneCard(card){
		card.fadeTo(timeToSeeCard, 0.3);
		card.addClass('done');
		card.attr('data-is-done', 1);
	}
});



















