// Future improvements to add insult API
// Currently, just use a random number to pick from an array of insults

// Insult array to choose from
var insultArray = ["If I throw a stick, will you leave?", "You’re a gray sprinkle on a rainbow cupcake.", "If your brain was dynamite, there wouldn’t be enough to blow your hat off.", 
"Light travels faster than sound, which is why you seemed bright until you spoke.", "I’ll never forget the first time we met. But I’ll keep trying.", "It’s impossible to underestimate you.", 
"You bring everyone so much joy… when you leave the room.", "You are like a cloud. When you disappear, it’s a beautiful day.", "You just might be why the middle finger was invented in the first place.",
"You’re the reason this country has to put directions on shampoo.", "I’d give you a nasty look, but you’ve already got one."]

// gets a random number and returns the insult at that index of the array
var getInsult = function() {
    var randomNum = randNum(insultArray.length);
    return insultArray[randomNum];
}
