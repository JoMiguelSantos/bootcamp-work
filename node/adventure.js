const readline = require("readline");
const chalk = require("chalk");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const houseStories = {
    q: `
You might belong in Gryffindor. 
Where dwell the brave at heart, 
Their daring, nerve and chivalry 
Set Gryffindors apart. 
Would you like to be part of this house?
`,
    answers: {
        yes: chalk.red("Harry Potter welcomes you to GRYFFINDOR!!"),
        no: {
            q: `
You might belong in Hufflepuff:
Where they are just and loyal
Those patient Hufflepuffs are true
And unafraid of toil.
Would you like to be part of this house?
`,
            answers: {
                yes: chalk.yellow(
                    "Newt Scamander welcomes you to HUFFLEPUFF!!"
                ),
                no: {
                    q: `
Or yet in wise old Ravenclaw
If you’ve a ready mind
Where those of wit and learning
Will always find their kind.
Would you like to be part of this house?
`,
                    answers: {
                        yes: chalk.green(
                            "Tom Riddle welcomes you to SLYTHERIN!!"
                        ),
                        no: {
                            q: `
Or perhaps in Slytherin
You’ll make your real friends
Those cunning folk use any means
To achieve their ends. 
Would you like to be part of this house?
`,
                            answers: {
                                yes: chalk.blue(
                                    "Luna Lovegood welcomes you to RAVENCLAW!!"
                                ),
                                no:
                                    "Thank you for playing and come back when you make up your mind about which house you'd like to belong to.",
                            },
                        },
                    },
                },
            },
        },
    },
};

const initStory = {
    q: `Welcome to The Hogwarts, School of Wizardry and Witchcraft! Would you like to sit down and put the Sorting hat on?
`,
    answers: {
        yes: houseStories,
        no: "Alright then. Enjoy your day!",
    },
};

function askQuestion(obj) {
    rl.question(obj.q, function (answer) {
        if (answer === "yes") {
            const newObj = obj.answers.yes;
            if (typeof newObj === "object") {
                askQuestion(newObj);
            } else {
                console.log(newObj);
                rl.close();
            }
        } else if (answer === "no") {
            const newObj = obj.answers.no;
            if (typeof newObj === "object") {
                askQuestion(newObj);
            } else {
                console.log(newObj);
                rl.close();
            }
        } else {
            console.log(
                "Say what?? can you answer my question instead of saying gibberish?"
            );
            askQuestion(obj);
        }
    });
}

askQuestion(initStory);
