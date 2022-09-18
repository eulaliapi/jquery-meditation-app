$(document).ready(function () {

    let rain = document.getElementById("rain");
    let beach = document.getElementById("beach");
    let paused = false;
    let initialBarWidth = $(".fake-width").width();
    let initialTiming;

    //toggles minutes
    $(".minute").click(function () {
        $(this).addClass("active")
        $(".minute").not(this).removeClass("active")

    });

    //toggles background
    $(".bg").click(function () {
        $(this).addClass("active")
        $(".bg").not(this).removeClass("active");

        if ($(".bg.active").children().hasClass("fa-sun")) {
            $("body").css("background-image", "var(--gradient-hot)")
        } else if ($(".bg.active").children().hasClass("fa-leaf")) {
            $("body").css("background-image", "var(--gradient-cold)")
        } else {
            $("body").css("background-image", "var(--gradient-pink)")
        }

    });

    //toggles sound
    $(".sound").click(function () {
        $(this).addClass("active")
        $(".sound").not(this).removeClass("active");

        if ($(".sound.active").children().hasClass("fa-cloud-rain")) {
            beach.pause();
            rain.play();

        } else if ($(".sound.active").children().hasClass("fa-water")) {
            rain.pause();
            beach.play();

        } else {
            rain.pause();
            beach.pause();
        }
    });

    //play-pause
    $("img").click(function () {
        $(this).attr("src", $(this).attr("src") === "./svg/pause.svg" ? pauseApp() : playApp());

    });

    //pauses app
    pauseApp = () => {
        $("img").attr("src", "./svg/play.svg");
        paused = true;
        rain.pause();
        beach.pause();
    };

    //plays app
    playApp = () => {
        $("img").attr("src", "./svg/pause.svg");
        paused = false;
        startCounter();
        if ($(".sound.active").children().hasClass("fa-cloud-rain")) rain.play();
        if ($(".sound.active").children().hasClass("fa-water")) beach.play();
    };

    //sets seconds in playCounter() according to the minutes button that has been selected
    startCounter = () => {
        if ($(".minute.active").text() === "5 minutes") {
            playCounter(300);
            initialTiming = $(".minute.active").text();
        } else if ($(".minute.active").text() === "2 minutes") {
            playCounter(120);
            initialTiming = $(".minute.active").text();
        } else if ($(".minute.active").text() === "10 minutes") {
            playCounter(600);
            initialTiming = $(".minute.active").text();
        }
    };

    //plays the counter
    playCounter = (val) => {
        let currentBarWidth = $(".progress").width();
        let partOfBar = Number((initialBarWidth / val).toFixed(2));

        let countDown = setInterval(() => {

            //restarts app if while playing a different time is selected
            if($(".minute.active").text()!== initialTiming) restart();
            
            if (!paused) {
                if (currentBarWidth > 0) {
                    currentBarWidth = Number((currentBarWidth - partOfBar).toFixed(3));
                    $(".progress").width(currentBarWidth);
                } else {
                    $(".fake-width").addClass("finish");
                    restart();
                    clearInterval(countDown);
                }
            } else {
                clearInterval(countDown);
            }
        }, 1000)

    }

    //resets the app counter, play-pause button, 
    let restart = () => {
        setTimeout(() => {
            $(".fake-width").removeClass("finish");
            pauseApp();
            $(".progress").width(initialBarWidth);
        }, 3000)

    }

});
