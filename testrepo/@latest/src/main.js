const app = document.getElementById("app");

async function fetchJokes() {
  const res = await fetch(`http://localhost:4141/jokes`);
  const jokes = await res.json();
  return jokes;
}

async function displayJokes() {
  const jokes = await fetchJokes();

  jokes.forEach((singleJoke) => {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const pTag = document.createElement("p");

    div.append(h3, pTag);

    h3.innerText = singleJoke.joke;
    pTag.innerText = singleJoke.punchline;

    app.appendChild(div);
  });
}

displayJokes();

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const jokeData = Object.fromEntries(formData);

  console.log(jokeData);

  fetch("http://localhost:4141/jokes", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(jokeData),
  });
});
