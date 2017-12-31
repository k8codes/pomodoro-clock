$(document).ready(function() {
  let now;
  let workAmount = 1500000;
  let breakAmount = 300000;
  let minutes, seconds, future, distance, x;
  let running = false;
  let disabled = [];
  let isWork = false;
  let isBreak = false;

  $('#pause').attr('disabled', 'disabled');

  function displayNums() {
    minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    seconds = Math.floor((distance % (1000*60)) / 1000);

    if (minutes < 10 && seconds < 10) {
     $('#timer').html('0' + minutes + ":0" + seconds);
   } else if (minutes < 10) {
      $('#timer').html('0' + minutes + ":" + seconds);
    } else if (seconds < 10) {
      $('#timer').html(minutes + ":0" + seconds);
    } else {
      $('#timer').html(minutes + ":" + seconds);
    }
  }

  function setTimer() {
    running = true;
    isWork = true;
    isBreak = false;
    now = new Date().getTime();
    future = now + workAmount;
    $('#workOrBreak').html('WORK');
    x = setInterval(function() {
      now = new Date().getTime();
      distance = future - now;

      displayNums();

      if (distance <= 1000) {
        clearInterval(x);
        setBreak();
      }
    }, 1000);
  }

  function setBreak() {
    running = true;
    isBreak = true;
    isWork = false;
    now = new Date().getTime();
    future = now + breakAmount;
    $('#workOrBreak').html('BREAK');
    k = setInterval(function() {
      now = new Date().getTime();
      distance = future - now;

      displayNums();

      if (distance <= 1000) {
        clearInterval(k);
        setTimer();
      }
    })
  }


  function clearTimer() {
      $('#timer').empty();
      running = false;

      for (let i = 0; i < disabled.length; i++) {
        removeDisable(disabled[i]);
      }

      $('#workOrBreak').empty();
      disabled = [];
      workAmount = 1500000;
      breakAmount = 300000;
      if (isWork == true) {
        clearInterval(x);
      } else if (isBreak == true) {
        clearInterval(k);
      };
  }

  function disableAll() {
    $('#workPlus').attr('disabled', 'disabled');
    $('#workMinus').attr('disabled', 'disabled');
    $('#breakPlus').attr('disabled', 'disabled');
    $('#breakMinus').attr('disabled', 'disabled');
    $('#startWork').attr('disabled', 'disabled');
    $('#startBreak').attr('disabled', 'disabled');
    $('#defaultTimer').attr('disabled', 'disabled')
  }

  function removeAll() {
    $('#workPlus').removeAttr('disabled', 'disabled');
    $('#workMinus').removeAttr('disabled', 'disabled');
    $('#breakPlus').removeAttr('disabled', 'disabled');
    $('#breakMinus').removeAttr('disabled', 'disabled');
    $('#startWork').removeAttr('disabled', 'disabled');
    $('#startBreak').removeAttr('disabled', 'disabled');
    $('#defaultTimer').removeAttr('disabled', 'disabled');
  }

  $('#workPlus').click(function() {
    workAmount = workAmount + 60000;
    if (workAmount == 3600000) {
      alert('Number too high. Timer is set at 60 minutes.');
      workAmount = 3600000;
    }
  })

  $('#workMinus').click(function() {
    workAmount = workAmount - 60000;
    if (workAmount == 60000) {
      alert('Number too low. Timer is set at one minute.');
      workAmount = 60000;
    }
    console.log(workAmount, breakAmount);
  })

  $('#breakPlus').click(function() {
    breakAmount = breakAmount + 60000;
    if (breakAmount == 3600000) {
      alert('Number too high. Timer is set at 60 minutes.');
      breakAmount = 3600000;
    }
  })

  $('#breakMinus').click(function() {
    breakAmount = breakAmount - 60000;
    if (breakAmount == 60000) {
      alert('Number too low. Timer is set at one minute.');
      breakAmount = 60000;
    }
    console.log(workAmount, breakAmount);
  })

  $('#defaultTimer').click(function() {
    workAmount = 1500000;
    breakAmount = 300000;
    setTimer();
    disableAll();
  })

  $('#startWork').click(function() {
    setTimer();
    disableAll();
    $('#pause').removeAttr('disabled', 'disabled');
    console.log(workAmount, breakAmount);
  })

  $('#startBreak').click(function() {
    setBreak();
    disableAll();
    $('#pause').removeAttr('disabled', 'disabled');
    console.log(workAmount, breakAmount);
  })

  $('#stop').click(function() {
    clearTimer();
    removeAll();
  })

  $('#pause').click(function() {
    if (isWork == true) {
      clearInterval(x);
      now = new Date().getTime();
      workAmount = future - now;
    } else if (isBreak == true) {
      clearInterval(k);
      now = new Date().getTime();
      breakAmount = future - now;
    }
    $('#workOrBreak').html('TIMER PAUSED');
    $(this).addClass('hide');
    $('#resume').removeClass('hide');
  })

  $('#resume').click(function() {
    if (isWork == true) {
      setTimer();
    } else if (isBreak == true) {
      setBreak();
    }
    $(this).addClass('hide');
    $('#pause').removeClass('hide');
  })

})
