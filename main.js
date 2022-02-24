song = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
  song = loadSound("LLITN.mp3");
}

function setup() {
  canvas = createCanvas(550, 400);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log("Pose Net is initialized");
}

function draw() {
    image(video, 0, 0, 550, 400);

    fill("#29005e");
    stroke("#16a6ff");

    if (scoreRightWrist > 0.2) {

    circle(rightWristx, rightWristy, 20);
    if (rightWristy > 0 && rightWristy <= 100) {
      document.getElementById('btn_speed').innerHTML = "speed = 0.5x";
      song.rate(0.5);
    }
    
    else if (rightWristy > 100 && rightWristy <= 200) {
      document.getElementById('btn_speed').innerHTML = "speed = 1x";
      song.rate(1);
    }

    else if (rightWristy > 200 && rightWristy <= 300) {
      document.getElementById('btn_speed').innerHTML = "speed = 1.5x";
      song.rate(1.5);
    }

    else if (rightWristy > 300 && rightWristy <= 400) {
      document.getElementById('btn_speed').innerHTML = "speed = 2x";
      song.rate(2);
    }

    else if (rightWristy > 400 && rightWristy <= 500) {
      document.getElementById('btn_speed').innerHTML = "speed = 2.5x";
      song.rate(2.5);
    }
  }

    if (scoreLeftWrist > 0.2) {
    circle(leftWristx, leftWristy, 30);

    numberleftWristy = Number(leftWristy);
    removeDecimals = floor(numberleftWristy);
    volume = removeDecimals/400;
    document.getElementById("btn_vol").innerHTML="Volume = " + volume;
    song.setVolume(volume);
  }
    
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.stop();
}

function gotPoses(results) {
   if (results.length > 0) {
     console.log(results);
     leftWristx = results[0].pose.leftWrist.x;
     leftWristy = results[0].pose.leftWrist.y;
     scoreLeftWrist = results[0].pose.keypoints[9].score;

     console.log(scoreLeftWrist);
     console.log("Left Wrist x = " + leftWristx + "Left Wrist y = " + leftWristy);
     
     scoreRightWrist = results[0].pose.keypoints[10].score;
     console.log(scoreRightWrist);
     
     rightWristx = results[0].pose.rightWrist.x;
     rightWristy = results[0].pose.rightWrist.y;
     console.log("Right Wrist x = " + rightWristx + "Right Wrist y = " + rightWristy);
   }
}