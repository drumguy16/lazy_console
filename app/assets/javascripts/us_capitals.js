
$(document).ready(function(){
	var correctAnswers = 0;
	var incorrectAnswers = 0;
	var $correctCount = $('#correct');
	var $incorrectCount = $('#incorrect')
	var $gameStatus = $('#game-status');
	const $capitalPile = $('#capital-pile');
	const $statePile = $('#state-pile');
	const $reset = $('#reset');
	const $quit = $('#quit');
	const imagePath = '/assets/images';
	const states = [
			{
				state: 'Alabama',
				capital: 'Montgomery'
			},
			{
				state: 'Alaska',
				capital: 'Juneau'
			},
			{
				state: 'Arizona',
				capital: 'Phoenix'
			},
			{
				state: 'Arkansas',
				capital: 'Little Rock'
			},
			{
				state: 'California',
				capital: 'Sacramento'
			},
			{
				state: 'Colorado',
				capital: 'Denver'
			},
			{
				state: 'Connecticut',
				capital: 'Hartford'
			},
			{
				state: 'Delaware',
				capital: 'Dover'
			},
			{
				state: 'Florida',
				capital: 'Tallahassee'
			},
			{
				state: 'Georgia',
				capital: 'Atlanta'
			},
			{
				state: 'Hawaii',
				capital: 'Honolulu'
			},
			{
				state: 'Idaho',
				capital: 'Boise'
			},
			{
				state: 'Illinoise',
				capital: 'Springfield'
			},
			{
				state: 'Indiana',
				capital: 'Indianapolis'
			},
			{
				state: 'Iowa',
				capital: 'Des Moines'
			},
			{
				state: 'Kansas',
				capital: 'Topeka'
			},
			{
				state: 'Kentucky',
				capital: 'Frankfort'
			},
			{
				state: 'Louisiana',
				capital: 'Baton Rouge'
			},
			{
				state: 'Maine',
				capital: 'Augusta'
			},
			{
				state: 'Maryland',
				capital: 'Annapolis'
			},
			{
				state: 'Massachusetts',
				capital: 'Boston'
			},
			{
				state: 'Michigan',
				capital: 'Lansing'
			},
			{
				state: 'Minnesota',
				capital: 'St. Paul'
			},
			{
				state: 'Mississippi',
				capital: 'Jackson'
			},	
			{
				state: 'Missouri',
				capital: 'Jefferson City'
			},
			{
				state: 'Montana',
				capital: 'Helena'
			},
			{
				state: 'Nebraska',
				capital: 'Lincoln'
			},
			{
				state: 'Nevada',
				capital: 'Carson City'
			},
			{
				state: 'New Hampshire',
				capital: 'Concord'
			},
			{
				state: 'New Jersey',
				capital: 'Trenton'
			},
			{
				state: 'New Mexico',
				capital: 'Santa Fe'
			},
			{
				state: 'New York',
				capital: 'Albany'
			},
			{
				state: 'North Carolina',
				capital: 'Raleigh'
			},
			{
				state: 'North Dakota',
				capital: 'Bismarck'
			},
			{
				state: 'Ohio',
				capital: 'Columbus'
			},
			{
				state: 'Oklahoma',
				capital: 'Oklahoma City'
			},
			{
				state: 'Oregon',
				capital: 'Salem'
			},
			{
				state: 'Pennsylvania',
				capital: 'Harrisburg'
			},
			{
				state: 'Rhode Island',
				capital: 'Providence'
			},
			{
				state: 'South Carolina',
				capital: 'Columbia'
			},
			{
				state: 'South Dakota',
				capital: 'Pierre'
			},
			{
				state: 'Tennessee',
				capital: 'Nashville'
			},
			{
				state: 'Texas',
				capital: 'Austin'
			},
			{
				state: 'Utah',
				capital: 'Salt Lake City'
			},
			{
				state: 'Vermont',
				capital: 'Montpelier'
			},
			{
				state: 'Virginia',
				capital: 'Richmond'
			},
			{
				state: 'Washington',
				capital: 'Olympia'
			},
			{
				state: 'West Virginia',
				capital: 'Charleston'
			},
			{
				state: 'Wisconsin',
				capital: 'Madison'
			},
			{
				state: 'Wyoming',
				capital: 'Cheyenne'
			},

		];

	$(init);

	function init() {
		//reset game
		correctAnswers = 0;
		incorrectAnswers = 0;

		$capitalPile.html('');
		$statePile.html('');
		$gameStatus.hide(400)
		$reset.hide(400);
		$quit.hide(400);

		states.sort(function(){return Math.random() - .5});

		for(var i = 0; i < states.length; i++) {
			var $stateDiv = $(`
					<div class="col-sm-2 state text-sm-center">
						<p class="lead state-name">${states[i].state}</p>
					</div>
				`);
			$stateDiv.data('capital', states[i].capital);
			$stateDiv.appendTo($statePile);
			$stateDiv.droppable({
				accept: '#capital-pile div',
				hoverClass: 'hovered',
				drop: handleCardDrop
			});
		}//End for loop

		//sort states randomly
		states.sort(function(){return Math.random() - .5});

		for(var i = 0; i < states.length; i++) {
			var $capitalDiv = $(`
					<div class="capital col-sm-2 text-sm-center">
						<p class="lead capital-name">${states[i].capital}</p>
					</div>
				`);
			$capitalDiv.data('capital', states[i].capital);
			$capitalDiv.appendTo($capitalPile);
			$capitalDiv.draggable({
				containment: '#content',
				stack: 'capital-pile div',
				cursor: 'move',
				revert: true
			});
		}//end for loop

		$correctCount.text(correctAnswers);
		$incorrectCount.text(incorrectAnswers);

	}//end init

	function handleCardDrop(event, ui) {
		var stateCard = $(this).data('capital');
		var capitalCard = ui.draggable.data('capital');

		if( stateCard === capitalCard) {
			var $capitalCard = $(ui.draggable);
			var $stateCard = $(this);

			$capitalCard.draggable('disable');
			$capitalCard.hide(400);

			$stateCard.droppable('disable');
			$stateCard.hide(400);

			correctAnswers += 1;
			$correctCount.text(correctAnswers)
		} else {
			incorrectAnswers += 1;
			$incorrectCount.text(incorrectAnswers);
		}

		if (correctAnswers === states.length) {
			$gameStatus.html('<h1>Noice!</h1>');
			$gameStatus.css('color', 'green');
			$gameStatus.show(600);
			$quit.show(600);
			$reset.show(600);
		}

		if (incorrectAnswers > (states.length * .3)) {
			$capitalPile.hide(400);
			$statePile.hide(400);
			$gameStatus.html('<h1>Maybe check out a map before playing again</h1>');
			$gameStatus.css('color', 'red');
			$gameStatus.show(600);
			$quit.show(600);
			$reset.show(600);
		}
	}
	init();
	
	$reset.click(function() {
		init();
		$capitalPile.show(800);
		$statePile.show(800);
	});

	$quit.click(function() {
		init();
		$capitalPile.show();
		$statePile.show();
		$('#us-capitals-widget').hide(400);
	});

});