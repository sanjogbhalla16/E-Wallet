//learn difference between axios vs fetch
const axios = require("axios");
// function main() {
//   fetch("https://sum-server.100xdevs.com/todos").then(async (response) => {
//     const json = await response.json();
//     console.log(json);
//   });
// }
//both function do the same things
async function main() {
  const response = await fetch("https://sum-server.100xdevs.com/todos");
  const json = await response.json();
  console.log(json);
}

async function main() {
  const response = await axios.get("https://sum-server.100xdevs.com/todos");
  //   const json = await response.json();
  //response.data mai hi sara data hai
  console.log(response.data.todos.json);
}

//POST
async function main() {
  const response = await fetch("https://sum-server.100xdevs.com/todos", {
    method: "POST",
    body: {
      username: "bhalla Ji",
      password: "1234567",
    },
    headers: {
      Authorization: "Bearer 123",
    },
  });
  const json = await response.json();
  console.log(json);
}
main();

//you cannot send a body in a get call , only post,put and delete request require the body and then headers
async function main() {
  const response = await axios.post(
    "https://sum-server.100xdevs.com/todos",
    {
      username: "bhalla Ji",
      password: "1234567",
    },
    {
      headers: {
        Authorization: "Bearer 123",
      },
    }
  );
  //   const json = await response.json();
  //response.data mai hi sara data hai

  //   const response = await axios("https://sum-server.100xdevs.com/todos", {
  //     method: "POST",
  //     headers: {
  //       Authorization: "Bearer 123",
  //     },
  //   });

  console.log(response.data);
  //   const response = await axios({
  //     url: "https://sum-server.100xdevs.com/todos",
  //     method: "POST",
  //     headers: {
  //       Authorization: "Bearer 123",
  //     },
  //     data: {
  //       username: "bhalla Ji",
  //     },
  //   });
}
