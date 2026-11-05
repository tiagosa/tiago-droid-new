(function () {
  var input = document.getElementById("ask-input");
  var btn = document.getElementById("ask-btn");
  var answer = document.getElementById("ask-answer");

  function setAnswer(text) {
    answer.textContent = text;
  }

  async function ask() {
    var question = input.value.trim();
    if (!question) return;

    btn.disabled = true;
    setAnswer("…");

    try {
      var res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ round: "intro", question: question }),
      });
      var data = await res.json();
      setAnswer(data.answer || data.error || "No answer.");
    } catch (err) {
      setAnswer("Could not reach the droid. Try again.");
    } finally {
      btn.disabled = false;
    }
  }

  btn.addEventListener("click", ask);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") ask();
  });
})();
