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
	
	var characterSelected;
	var challengerSelected; 



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
		mcDonaldSongArray = [ iKeepForgettin, whatAFoolBelieves, yaMoBeThere ];
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
		
		// reset turn #
		turn = 1;

		characterSelected = false;
		challengerSelected = false; // reset to true once an enemy is defeated 

		// create character objects
		michaelMcDonald = new character("Michael McDonald", michaelMcDonaldImg, mcDonaldSongArray, 100, 10, 10);
		hallAndOates = new character("Hall and Oates", hallAndOatesImg, hallAndOatesSongArray, 100, 10, 10);
		toto = new character("Toto", totoImg, totoSongArray, 100, 10, 10);
		chrisCross = new character("Christopher Cross", chrisCrossImg, chrisCrossSongArray, 100, 10, 10);
		kennyLoggins = new character("Kenny Loggins", kennyLogginsImg, kennyLogginsSongArray, 100, 10, 10);


		// Append characters to character select div /////////////////////////////

		charSelect.append("<img id = 'michaelMcDonald' class ='character img-responsive' src='" + michaelMcDonald.image + "'>")
		$("#michaelMcDonald").data("character", michaelMcDonald)

		charSelect.append("<img id = 'hallAndOates' class ='character img-responsive' src='" + hallAndOates.image + "'>")
		$("#hallAndOates").data("character", hallAndOates)

		charSelect.append("<img id = 'toto' class ='character img-responsive' src='" + toto.image + "'>")
		$("#toto").data("character", toto)

		charSelect.append("<img id = 'chrisCross' class ='character img-responsive' src='" + chrisCross.image + "'>")
		$("#chrisCross").data("character", chrisCross)

		charSelect.append("<img id = 'kennyLoggins' class ='character img-responsive' src='" + kennyLoggins.image + "'>")
		$("#kennyLoggins").data("character", kennyLoggins)
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

			// check if there are any other characters left to become challengers
			if ($("#challengers").children().length == 0) {

				// logic to end game
				window.setTimeout(function(){$("#text-area").empty(); 
					$("#text-area").prepend("You win!")}, 1500)
				

			}else{
				challengerSelected = false;

				// ask player to choose another challenger after 1.5 seconds
				window.setTimeout(function(){$("#text-area").empty();
					$("#text-area").prepend("Choose your opponent!")}, 1500)
			}

		};
	};

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

	//$('#new-game').on("click", function(){
		// reset turn #
		turn = 1;

		characterSelected = false;
		challengerSelected = false; // reset to true once an enemy is defeated 

		// create character objects
		michaelMcDonald = new character("Michael McDonald", michaelMcDonaldImg, mcDonaldSongArray, 100, 10, 10);
		hallAndOates = new character("Hall and Oates", hallAndOatesImg, hallAndOatesSongArray, 100, 10, 10);
		toto = new character("Toto", totoImg, totoSongArray, 100, 10, 10);
		chrisCross = new character("Christopher Cross", chrisCrossImg, chrisCrossSongArray, 100, 10, 10);
		kennyLoggins = new character("Kenny Loggins", kennyLogginsImg, kennyLogginsSongArray, 100, 10, 10);


		// Append characters to character select div /////////////////////////////

		charSelect.append("<img id = 'michaelMcDonald' class ='character img-responsive' src='" + michaelMcDonald.image + "'>")
		$("#michaelMcDonald").data("character", michaelMcDonald)

		charSelect.append("<img id = 'hallAndOates' class ='character img-responsive' src='" + hallAndOates.image + "'>")
		$("#hallAndOates").data("character", hallAndOates)

		charSelect.append("<img id = 'toto' class ='character img-responsive' src='" + toto.image + "'>")
		$("#toto").data("character", toto)

		charSelect.append("<img id = 'chrisCross' class ='character img-responsive' src='" + chrisCross.image + "'>")
		$("#chrisCross").data("character", chrisCross)

		charSelect.append("<img id = 'kennyLoggins' class ='character img-responsive' src='" + kennyLoggins.image + "'>")
		$("#kennyLoggins").data("character", kennyLoggins)
	//})


	// when a character's image is clicked
	$('.character').on("click", function(){

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


			// display attack text in text area
			$("#text-area").prepend("You attacked " + $(".chosen-challenger").data('character').name +
			" for " + playerAttack + " damage!" + '<hr>')


			// check if player should win before counter-attack
			winCheck($('.player'), $('.chosen-challenger'));

			// challenger counter-attack
			var challengerAttack = $('.chosen-challenger').data('character').cp;

			// subtract counter-attack from player hp
			$('.player').data('character').hp -= challengerAttack;
			console.log("player hp: " + $('.player').data('character').hp);

			// display counter-attack text in text area
			$("#text-area").prepend($(".chosen-challenger").data('character').name + " attacked you for " +
			" for " + challengerAttack + " damage!" + '<hr>')



			// end of turn -- advance turn and check if game should end
			turn += 1;
			winCheck($('.player'), $('.chosen-challenger'));

			}

		else {
			return false
		}
	});

	




}); // end of jQuery function. 	