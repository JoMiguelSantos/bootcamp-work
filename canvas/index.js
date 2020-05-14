var context = document.getElementById("canvas").getContext("2d");

context.strokeStyle = "black";
context.lineWidth = 4;
context.beginPath();

// HEAD
context.arc(250, 100, 50, 0, 2 * Math.PI);

// TORSO
context.moveTo(250, 150);
context.lineTo(250, 300);

// ARMS
context.moveTo(250, 210);
context.lineTo(130, 150);
context.moveTo(250, 210);
context.lineTo(370, 150);

// LEGS
context.moveTo(250, 300);
context.lineTo(350, 380);
context.moveTo(250, 300);
context.lineTo(150, 380);

context.stroke();
