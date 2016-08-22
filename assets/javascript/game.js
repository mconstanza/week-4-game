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



// SOUND ////////////////////////////////////////////////////////////////////

// Function for creating sound files
	function sound(src) {
	    this.sound = document.createElement("audio");
	    this.sound.src = src;
	    this.sound.setAttribute("preload", "auto");
	    this.sound.setAttribute("controls", "none");
	    this.sound.style.display = "none";
	    document.body.appendChild(this.sound);
	    this.play = function(){
	        this.sound.play();
	    }
	    this.stop = function(){
	        this.sound.pause();
	    }
	}

	var soundInit = function() {

		dangerZone = new sound("assets/sounds/dangerzone.mp3")
		holdTheLine = new sound("assets/sounds/holdtheline.mp3")
		iCantGoForThat = new sound("assets/sounds/icantgoforthat.mp3");
		iKeepForgettin = new sound("assets/sounds/ikeepforgettin.mp3");
		richGirl = new sound("assets/sounds/richgirl.mp3");
		rideLikeTheWind = new sound("assets/sounds/ridelikethewind.mp3");
		rosanna = new sound("assets/sounds/rosanna.mp3");
		saraSmile = new sound("assets/sounds/sarasmile.mp3");
	 	whatAFoolBelieves = new sound("assets/sounds/whatafoolbelieves.mp3");
		yaMoBeThere = new sound("assets/sounds/yamobethere.mp3");
		youMakeMyDreams = new sound("assets/sounds/youmakemydreams.mp3");

		// Song arrays //////////////////////////////////////////////////////
		mcDonaldSongArray = [ whatAFoolBelieves, yaMoBeThere ];
		hallAndOatesSongArray = [ iCantGoForThat, richGirl, saraSmile];
		totoSongArray = [ rosanna, holdTheLine ];
		chrisCrossSongArray = [ rideLikeTheWind ];
		kennyLogginsSongArray = [ dangerZone ];


	}
// Classes/Objects /////////////////////////////////////////////////////////////
	function character(name, image, songArray, hp, ap, cp) {

		this.name = name;
		this.image = image;
		this.songArray = songArray;
		this.hp = hp; // health points
		this.ap = ap; // attack power
		this.cp = cp; // counter-attack power

		this.randomSong = function() {
			var song = Math.floor((Math.random() * this.songArray.length));
			return songArray[song];
		}
	}

// Logic Functions ///////////////////////////////////////////////////////////

	var startGame = function() {

		if (gameStarted == false){

			if (currentSong ){currentSong.stop();}
			gameStarted = true;
			// create character objects
			michaelMcDonald = new character("Michael McDonald", michaelMcDonaldImg, mcDonaldSongArray, 1000, 10, 10);
			hallAndOates = new character("Hall and Oates", hallAndOatesImg, hallAndOatesSongArray, 800, 10, 10);
			toto = new character("Toto", totoImg, totoSongArray, 900, 10, 10);
			chrisCross = new character("Christopher Cross", chrisCrossImg, chrisCrossSongArray, 750, 10, 10);
			kennyLoggins = new character("Kenny Loggins", kennyLogginsImg, kennyLogginsSongArray, 700, 10, 10);

			
			// clear old displays
			$(".character").find('.name').empty()
			$(".character").find('.hp').empty()

			createCharacterDiv('michaelMcDonald', michaelMcDonaldImg)
			createCharacterDiv('hallAndOates', hallAndOatesImg)
			createCharacterDiv('toto', totoImg)
			createCharacterDiv('chrisCross', chrisCrossImg)
			createCharacterDiv('kennyLoggins', kennyLogginsImg)

			// $("#hallAndOates").find('.name').empty()
			// $("#hallAndOates").find('.hp').empty()

			// $("#toto").find('.name').empty()


			// reset turn #
			console.log("starting new game")
			turn = 1;

			characterSelected = false;
			challengerSelected = false; // reset to true once an enemy is defeated 



			// Append characters to character select div /////////////////////////////

			$("#michaelMcDonald").data("character", michaelMcDonald)
			$("#michaelMcDonald").find('.hp').append($("#michaelMcDonald").data("character").hp)
			$("#michaelMcDonald").find('.name').append($("#michaelMcDonald").data("character").name)
			charSelect.append($('#michaelMcDonald'))
			
			$("#hallAndOates").data("character", hallAndOates)
			$("#hallAndOates").find('.hp').append($("#hallAndOates").data("character").hp)
			$("#hallAndOates").find('.name').append($("#hallAndOates").data("character").name)
			charSelect.append($('#hallAndOates'))

			$("#toto").data("character", toto)
			$("#toto").find('.hp').append($("#toto").data("character").hp)
			$("#toto").find('.name').append($("#toto").data("character").name)
			charSelect.append($('#toto'))
		
			$("#chrisCross").data("character", chrisCross)
			$("#chrisCross").find('.hp').append($("#chrisCross").data("character").hp)
			$("#chrisCross").find('.name').append($("#chrisCross").data("character").name)
			charSelect.append($('#chrisCross'))

			$("#kennyLoggins").data("character", kennyLoggins)
			$("#kennyLoggins").find('.hp').append($("#kennyLoggins").data("character").hp)
			$("#kennyLoggins").find('.name').append($("#kennyLoggins").data("character").name)
			charSelect.append($('#kennyLoggins'))
		}
	}



	var winCheck = function(player, challenger) {
		// if player dies
		if (player.data('character').hp <= 0) {

			// clear the text area
			$("#text-area").empty();
			
			$("#text-area").prepend("You died!");
			
			// logic to end game

		// if challenger dies	
		}else if (challenger.data('character').hp <= 0) {
			challenger.remove()
			// clear the text area
			$("#text-area").empty();
			
			$("#text-area").prepend("Challenger defeated!");

			// stop the currently playing song
			console.log("current song: " + currentSong)
			currentSong.stop();


			// check if there are any other characters left to become challengers
			if ($("#challengers").children().length == 0) {

				// logic to end game
				window.setTimeout(function(){$("#text-area").empty(); 
					$("#text-area").prepend("You win!")}, 1500)

				// play victor song from player's song list
				currentSong = $(".player").data('character').randomSong()
				currentSong.play()
				gameStarted = false;
				

			}else{
				challengerSelected = false;

				// ask player to choose another challenger after 1.5 seconds
				window.setTimeout(function(){$("#text-area").empty();
					$("#text-area").prepend("Choose your opponent!")}, 1500)
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

// Initialize Sounds /////////////////////////////////////////////////////
	soundInit()

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
	//var challenger = $(".challenger");
	var player = $('.player');
	var turn = 1;


// Create characters /////////////////////////////////////////////////////
	var michaelMcDonald;
	var hallAndOates;
	var toto; 
	var chrisCross;
	var kennyLoggins;


// On Click Functions //////////////////////////////////////////////////

	$('#new-game').on("click", startGame)
		


	// when a character's image is clicked
	$('#characterRow div').on("click", '.character', function(){

		console.log("character clicked")
		if(characterSelected == false){ // if the player has not yet chosen a character
			characterSelected = true;

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
			$("#text-area").prepend("Choose your opponent!")

			// if the player has chosen a character but not a challenger
		}else if (challengerSelected == false && characterSelected == true && $(this).data('status') != 'player'){ 
			challengerSelected = true;

			$(this).addClass("chosen-challenger") // add challenger class to chosen opponent
			$("#challengerSide").append(this); // send the challenger to the deck to fight!

			// play a random song from the chosen challenger's song list
			currentSong = $(".chosen-challenger").data('character').randomSong()
			currentSong.play()

			// clear the text area
			$("#text-area").empty();
		}else if (characterSelected == true && $(this).data('status') != 'player' == 'player'){
			console.log("display tooltip")
			// display tooltip
		}

	});


	attack.on("click", function(){

		// check if player has selected both player and challenger characters
		if(characterSelected == true && challengerSelected == true){
			console.log("attack!")

			// player's attack
			console.log($('.player').data('character').ap)

			// player attack increases each turn 
			var playerAttack = $('.player').data('character').ap * turn;

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
			var challengerAttack = $('.chosen-challenger').data('character').cp;

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

			}

		else {
			return false
		}
	});

	




}); // end of jQuery function. 	