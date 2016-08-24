// Yacht Rock: Death Match

// Author: Michael Constanza

$(document).ready(function(){
// Variables/////////////////////////////////////////////////////////////////
	console.log("javascript loaded")
	// Music ///////////////
	var dangerZone;
	var iCantGoForThat;
	var iKeepForgettin;
	var richGirl;
	var rideLikeTheWind;
	var rosanna;
	var saraSmile;
	var whatAFoolBelieves;
	var yaMoBeThere;
	var youMakeMyDreams;

	var ccGo;
	var hoAah;
	var hoNoCanDo;
	var hoOoh;
	var klDzRiff;
	var mmI;
	var mmOoh;
	var mmYaMo;
	var richBitch;
	var totoWhoa;

	var attackSound;

	// Images ///////////////

	var michaelMcDonaldImg = "assets/images/michaelmcdonald.jpg";

	var hallAndOatesImg = "assets/images/hallandoates.jpg";

	var totoImg = "assets/images/toto.jpg";

	var chrisCrossImg = "assets/images/chrisCross.jpg";

	var kennyLogginsImg = "assets/images/kennyloggins.jpg";

// Game variables ///////////////////////////////////////////////////////////
	
	var gameStarted = false;
	var characterSelected;
	var challengerSelected; 
	var currentSong;
	var attackClicked = false
	var turn = 1;
	var challengerPosition;

// Define regions of game display ////////////////////////////////////////

	var charSelect = $("#character-select");
	var charRowOne = $("#character-row-1");
	var charRowTwo = $("#character-row-2");
	var challengers = $("#challengers");
	var deck = $("#deck");
	var attack = $("#attack-button");
	var playerSide = $("#playerSide");
	var challengerSide = $("#challengerSide");
	

// Character Variables ///////////////////////////////////////////////////

	var characters = $('.character');
	var player = $('.player');
	
	var michaelMcDonald;
	var hallAndOates;
	var toto; 
	var chrisCross;
	var kennyLoggins;


// SOUND ////////////////////////////////////////////////////////////////////

// Function for creating sound files using Howl library


	var soundInit = function() {

	// Music ////////////////////////////////////////////////
		dangerZone = new Howl({
			src: ["assets/sounds/dangerzone.mp3"]
		});
		holdTheLine = new Howl({
			src: ["assets/sounds/holdtheline.mp3"]
		});
		iCantGoForThat = new Howl({
			src: ["assets/sounds/icantgoforthat.mp3"]
		});
		iKeepForgettin = new Howl({
			src: ["assets/sounds/ikeepforgettin.mp3"]
		});
		richGirl = new Howl({
			src: ["assets/sounds/richgirl.mp3"]
		});
		rideLikeTheWind = new Howl({
			src: ["assets/sounds/ridelikethewind.mp3"]
		});
		rosanna = new Howl({
			src: ["assets/sounds/rosanna.mp3"]
		});
		saraSmile = new Howl({
			src: ["assets/sounds/sarasmile.mp3"]
		});
	 	whatAFoolBelieves = new Howl({
	 		src: ["assets/sounds/whatafoolbelieves.mp3"]
	 	});
		yaMoBeThere = new Howl({
			src: ["assets/sounds/yamobethere.mp3"]
		});
		youMakeMyDreams = new Howl({
			src: ["assets/sounds/youmakemydreams.mp3"]
		});


	// Battle Sounds ////////////////////////////////////

		 ccGo= new Howl({
			src: ["assets/sounds/ccGo.mp3"],
			volume: 0.5
		});
		 hoAah= new Howl({
			src: ["assets/sounds/hoAah.mp3"],
			volume: 0.5

		});
		 hoNoCanDo= new Howl({
			src: ["assets/sounds/hoNoCanDo.mp3"],
			volume: 0.5
		});
		 hoOoh= new Howl({
			src: ["assets/sounds/hoOoh.mp3"],
			volume: 0.5
		});
		 klDzRiff= new Howl({
			src: ["assets/sounds/klDzRiff.mp3"],
			volume: 0.5
		});
		 mmI= new Howl({
			src: ["assets/sounds/mmI.mp3"],
			volume: 0.5
		});
		 mmOoh= new Howl({
			src: ["assets/sounds/ymmOoh.mp3"],
			volume: 0.5
		});
		 mmYaMo= new Howl({
			src: ["assets/sounds/mmYaMo.mp3"],
			volume: 0.5
		});
		 richBitch= new Howl({
			src: ["assets/sounds/richBitch.mp3"],
			volume: 0.5
		});
		 totoWhoa= new Howl({
			src: ["assets/sounds/totoWhoa.mp3"],
			volume: 0.5
		});

		// Song arrays //////////////////////////////////////////////////////
		mcDonaldSongArray = [ whatAFoolBelieves, yaMoBeThere, iKeepForgettin ];
		hallAndOatesSongArray = [ iCantGoForThat, richGirl, saraSmile, youMakeMyDreams];
		totoSongArray = [ rosanna, holdTheLine ];
		chrisCrossSongArray = [ rideLikeTheWind ];
		kennyLogginsSongArray = [ dangerZone ];
	

		// Battle Sound Arrays ////////////////////////////////////
		mcDonaldSoundArray = [ mmI, mmOoh, mmYaMo];
		hallAndOatesSoundArray = [ hoAah, hoNoCanDo, hoOoh, richBitch];
		totoSoundArray = [ totoWhoa];
		ccSoundArray = [ ccGo ];
		kennyLogginsSoundArray = [klDzRiff];
	};	

// Classes/Objects /////////////////////////////////////////////////////////////
	function character(name, image, songArray, soundArray, hp, ap, cp) {

		this.name = name;
		this.image = image;
		this.songArray = songArray;
		this.soundArray = soundArray;
		this.hp = hp; // health points
		this.ap = ap; // attack power
		this.cp = cp; // counter-attack power

		this.randomSong = function() {
			var song = Math.floor((Math.random() * this.songArray.length));
			return songArray[song];
		}

		this.randomSound = function() {
			var sound = Math.floor((Math.random() * this.soundArray.length));
			return soundArray[sound];
		}
	}

// Logic Functions ///////////////////////////////////////////////////////////

	var startGame = function() {

		if (gameStarted == false){

			$("#text-area").empty();
			$("#text-area").prepend("<p>Choose your 'Rock' star!</p>")

			
			gameStarted = true;

			$('#playerSide').empty();
			// create character objects
			michaelMcDonald = new character("Michael McDonald", michaelMcDonaldImg, mcDonaldSongArray, mcDonaldSoundArray, 1000, 20, 50);
			hallAndOates = new character("Hall and Oates", hallAndOatesImg, hallAndOatesSongArray, hallAndOatesSoundArray, 800, 25, 30);
			toto = new character("Toto", totoImg, totoSongArray, totoSoundArray, 900, 35, 25);
			chrisCross = new character("Christopher Cross", chrisCrossImg, chrisCrossSongArray, ccSoundArray, 850, 25, 35);
			kennyLoggins = new character("Kenny Loggins", kennyLogginsImg, kennyLogginsSongArray, kennyLogginsSoundArray, 500, 40, 25);

			
			// clear old displays
			$(".character").find('.name').empty()
			$(".character").find('.hp').empty()

			createCharacterDiv('michaelMcDonald', michaelMcDonaldImg)
			createCharacterDiv('hallAndOates', hallAndOatesImg)
			createCharacterDiv('toto', totoImg)
			createCharacterDiv('chrisCross', chrisCrossImg)
			createCharacterDiv('kennyLoggins', kennyLogginsImg)

			// reset turn #
			console.log("starting new game")
			turn = 1;

			characterSelected = false;
			challengerSelected = false; // reset to true once an enemy is defeated 



			// Append characters to character select div /////////////////////////////

			$("#michaelMcDonald").data("character", michaelMcDonald)
			$("#michaelMcDonald").find('.hp').append($("#michaelMcDonald").data("character").hp)
			$("#michaelMcDonald").find('.name').append($("#michaelMcDonald").data("character").name)
		
			
			$("#hallAndOates").data("character", hallAndOates)
			$("#hallAndOates").find('.hp').append($("#hallAndOates").data("character").hp)
			$("#hallAndOates").find('.name').append($("#hallAndOates").data("character").name)
			

			$("#toto").data("character", toto)
			$("#toto").find('.hp').append($("#toto").data("character").hp)
			$("#toto").find('.name').append($("#toto").data("character").name)

		
			$("#chrisCross").data("character", chrisCross)
			$("#chrisCross").find('.hp').append($("#chrisCross").data("character").hp)
			$("#chrisCross").find('.name').append($("#chrisCross").data("character").name)
		

			$("#kennyLoggins").data("character", kennyLoggins)
			$("#kennyLoggins").find('.hp').append($("#kennyLoggins").data("character").hp)
			$("#kennyLoggins").find('.name').append($("#kennyLoggins").data("character").name)
			
		}
	}

	var winCheck = function(player, challenger) {
		// if player dies
		if (player.data('character').hp <= 0) {

			// clear the text area
			$("#text-area").empty();
			
			$("#text-area").prepend("<p>You died!</p>");
			
			// logic to end game

		// if challenger dies	
		}else if (challenger.data('character').hp <= 0) {
			challenger.remove()
			// clear the text area
			$("#text-area").empty();
			
			$("#text-area").prepend("<p>Challenger defeated!</p>");

			// stop the currently playing song
			currentSong.fade(1, 0, 800)
			//currentSong.stop();
			currentSong = currentSong = $(".player").data('character').randomSong();
			currentSong.play();
			//currentSong.fade(0, 1,800)



			// check if there are any other characters left to become challengers
			if ($("#challengers").children().length == 0) {

				// logic to end game
				window.setTimeout(function(){$("#text-area").empty(); 
					$("#text-area").prepend("<p>You win!</p>")}, 1500)
				winAnimation(player)

				// play victor song from player's song list
				currentSong.stop();
				currentSong = $(".player").data('character').randomSong()

				currentSong.play();
				gameStarted = false;
				

			}else{
				challengerSelected = false;

				// ask player to choose another challenger after 1.5 seconds
				window.setTimeout(function(){$("#text-area").empty();
					$("#text-area").prepend("<p>Choose your opponent!</p>")}, 1500)
			}

		};
	};

	// prevents overflow in text area
	var textAreaCheck = function(){
		if ($('#text-area').children().length >= 18){
			console.log($('#text-area').children().length)
			$('#text-area').empty();

		}
	}


	var updateHP = function() {

		// clear the current HP
		$('.player').find('.hp').empty()
		$('.chosen-challenger').find('.hp').empty()

		// display the new HP
		$('.player').find('.hp').append("\xa0 HP: "+ $('.player').data("character").hp)
		$('.chosen-challenger').find('.hp').append("\xa0 HP: "+ $('.chosen-challenger').data("character").hp)
	}

	var createCharacterDiv = function(id, imgsrc) {
		$('#character-select').append("<div class ='character' id = '" + id + "'><h1 class='name'>&nbsp </h1><h1 class ='hp'>&nbsp HP: </h1></div>")
		$('#character-select #'+ id).append("<img class='img responsive' src ='" + imgsrc + "'/>")
		console.log($('#character-select #'+ id))
	}



// Animations ////////////////////////////////////////////////////////////
	var winAnimation = function(player, playerImg) {
		console.log("win animation playing")
		player.velocity({left: '200px'});
		player.velocity(
			{
				translateY: 85,
				rotateZ: "360",
				scale: 1.5
				
			},
			{
				duration: 2000,
				easing: 'linear',
				loop: true
			});

	}

// Scene Changes /////////////////////////////////////////////////////////

	var chooseCharacterScene = function(){


	}

	var fightScene = function(){
		$('#main-container').empty();
		$('#main-container').append('<div class="row" id="character-row-1">' + 
			'<div class="col-md-3" id="playerSide"></div>' +
			'<!-- Empty space between characters --><div class="col-md-6"' +
			'id="centerSpace"></div><div class="col-md-3" id="challengerSide"></div></div>')

	}




// On Click Functions //////////////////////////////////////////////////

	$('#new-game').on("click", startGame)
		


	// when a character's image is clicked
	$('#characterRow div').on("click", '.character', function(){

		console.log("character clicked")
		if(characterSelected == false){ // if the player has not yet chosen a character
			characterSelected = true;



			// Fade out the current music
			if (currentSong ){
				currentSong.fade(1, 0, 2000)
				
			}


			// assign this DOM element the status of player
			$(this).data("status", 'player')

			// assign the other elements the status of challenger if they aren't the player
			for (var i = 0; i < $('.character').length; i++){
				if ($('.character').data("status") != 'player'){
					$('.character').data("status", 'challenger')
				}
			}

			challengers.append($('.character')) // send all characters to the challenger section

			$('#character-select').empty(); // clear all characters from character select
			$("#playerSide").prepend(this); // send the chosen character to the deck to fight!
			$(this).addClass("player") // add player class to chosen character



			// clear the text area and tell player to choose opponent
			$("#text-area").empty();
			$("#text-area").prepend("<p>Choose your opponent!</p>")

			// if the player has chosen a character but not a challenger
		}else if (challengerSelected == false && characterSelected == true && $(this).data('status') != 'player'){ 
			challengerSelected = true;

			$(this).addClass("chosen-challenger") // add challenger class to chosen opponent
			$("#challengerSide").append(this); // send the challenger to the deck to fight!

			// play a random song from the chosen challenger's song list
			currentSong.fade(1, 0, 800)
			currentSong = $(".chosen-challenger").data('character').randomSong()
			currentSong.play()
			//currentSong.fade(0,1, 800)

			// clear the text area
			$("#text-area").empty();



		}else if (characterSelected == true && $(this).data('status') != 'player' == 'player'){
			console.log("display tooltip")
			// display tooltip
		}

	});


	attack.on("click", function(){

		// check if player has selected both player and challenger characters
		if(characterSelected == true && challengerSelected == true && attackClicked == false){
			
			attackClicked = true;

		// Player's Attack ////////////////////////////////////////////////////////
			

			// player attack increases each turn 
			var playerAttack = $('.player').data('character').ap * turn;

			// play attack sound
			console.log($('.player').data('character').soundArray)
			console.log($('.player').data('character').randomSound());
			attackSound = $('.player').data('character').randomSound();
			attackSound.volume = 0.1;
			//attackSound.play()

			// animate the player and challenger
			$('.player').velocity({left: '100px'})
			$('.chosen-challenger').velocity({opacity: .7}, 'fast');

			$('.chosen-challenger img')
					.velocity({borderColor: '#F50C0C'})
					.velocity('reverse');

			$('.chosen-challenger').velocity({opacity: 1}, 'fast');

			$('.player').velocity({left: '0px'}, 'fast');
			
				
			

			// subtract player attack from challenger hp
			$('.chosen-challenger').data('character').hp -= playerAttack;
			console.log("challenger hp: " + $('.chosen-challenger').data('character').hp);

			// update the HP display
			updateHP()


			// display attack text in text area
			textAreaCheck()
			$("#text-area").prepend("<p>You attacked " + $(".chosen-challenger").data('character').name +
			" for " + playerAttack + " damage!<hr></p>")


			// check if player should win before counter-attack
			winCheck($('.player'), $('.chosen-challenger'));

			// challenger counter-attack
			window.setTimeout(function(){
				var challengerAttack = $('.chosen-challenger').data('character').cp;

				// play attack sound
				attackSound = $('.chosen-challenger').data('character').randomSound();
				attackSound.volume = 0.1;
				//attackSound.play()

				// animate counter-attack

				$('.chosen-challenger').velocity({left: '-100px'});

				$('.player').velocity({opacity: .7}, 'fast');

				$('.player img')

					.velocity({borderColor: '#F50C0C'})
					.velocity('reverse');

				$('.player').velocity({opacity: 1}, 'fast')

				// get challengers original position to set animation back to

				challengerPosition = $('#challengerSide .chosen-challenger').css('left' );

				$('.chosen-challenger').velocity({left: challengerPosition}, 'fast');

				// subtract counter-attack from player hp
				$('.player').data('character').hp -= challengerAttack;
				console.log("player hp: " + $('.player').data('character').hp);

				// update the HP display
				updateHP()

				// display counter-attack text in text area
				textAreaCheck()
				$("#text-area").prepend('<p>' + $(".chosen-challenger").data('character').name + " attacked you for " +
				" for " + challengerAttack + " damage!<hr></p>")



				// end of turn -- advance turn and check if game should end
				turn += 1;
				winCheck($('.player'), $('.chosen-challenger'));
			}, 800) // delay before counter attack animation is played


				// let the player click attack again after attack routine is completed
				window.setTimeout(function(){
					attackClicked = false;
				}, 1200)

			}

		else {
			return false
		}
	});


// Initialize Sounds /////////////////////////////////////////////////////
	console.log('starting')
	soundInit()
	$('#introModal').modal({backdrop: true});
	currentSong = whatAFoolBelieves;
	currentSong.play();




}); // end of jQuery function. 	