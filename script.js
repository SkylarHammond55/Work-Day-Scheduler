$(document).ready(function() {
  var currentDayEl = $("#currentDay");
  var timeBlocksEl = $("#timeBlocks");
  var currentTime = dayjs().format("H");

  updateTimeBlocks();
  updateCurrentDay();

  function updateTimeBlocks() {
    for (var hour = 9; hour <= 17; hour++) {
      var timeBlockEl = $("<div>", { class: "time-block", "data-hour": hour });
      var hourEl = $("<div>", { class: "hour", text: formatHour(hour) });
      var eventEl = $("<textarea>", { class: "event", val: localStorage.getItem("event_" + hour) || "" });
      var saveBtnEl = $("<button>", { class: "save-btn", text: "Save" });

      timeBlockEl.append(hourEl, eventEl, saveBtnEl);
      timeBlocksEl.append(timeBlockEl);

      if (hour < currentTime) {
        timeBlockEl.addClass("past");
      } else if (hour === currentTime) {
        timeBlockEl.addClass("present");
      } else {
        timeBlockEl.addClass("future");
      }

      saveBtnEl.on("click", function() {
        var hour = $(this).parent().attr("data-hour");
        var event = $(this).prev(".event").val();
        localStorage.setItem("event_" + hour, event);
      });
    }
  }

  function formatHour(hour) {
    return (hour % 12 || 12) + (hour >= 12 ? "PM" : "AM");
  }

  function updateCurrentDay() {
    currentDayEl.text(dayjs().format("dddd, MMMM Do"));
  }
});







