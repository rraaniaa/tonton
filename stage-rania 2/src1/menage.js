if (!window.openDatabase) {
  alert("ERROR");
} else {
  var db = openDatabase("store.db", "1.0", "table-echant", 1024 * 1024 * 5);
}

const insertData = event => {
  event.preventDefault();

  // get value of radio input
  // const s1 =
  //   document.queryselector('input[name="s1"]:checked').value ||
  //   document.queryselector('input[name="s1"]:checked').innerhtml;
  // const s2 =
  //   document.queryselector('input[name="s2"]:checked').value ||
  //   document.queryselector('input[name="s2"]:checked').innerhtml;
  // const s3 =
  //   document.queryselector('input[name="s3"]:checked').value ||
  //   document.queryselector('input[name="s3"]:checked').innerhtml;
  // const s4 =
  //   document.queryselector('input[name="s4"]:checked').value ||
  //   document.queryselector('input[name="s4"]:checked').innerhtml;
  // const s5 =
  //   document.queryselector('input[name="s5"]:checked').value ||
  //   document.queryselector('input[name="s5"]:checked').innerhtml;
  // const s6 =
  //   document.queryselector('input[name="s6"]:checked').value ||
  //   document.queryselector('input[name="s6"]:checked').innerhtml;
  // const s7 =
  //   document.queryselector('input[name="s7"]:checked').value ||
  //   document.queryselector('input[name="s7"]:checked').innerhtml;
  // const s8 =
  //   document.queryselector('input[name="s8"]:checked').value ||
  //   document.queryselector('input[name="s8"]:checked').innerhtml;
  // const s9 =
  //   document.queryselector('input[name="s9"]:checked').value ||
  //   document.queryselector('input[name="s9"]:checked').innerhtml;
  // const s10 =
  //   document.queryselector('input[name="s10"]:checked').value ||
  //   document.queryselector('input[name="s10"]:checked').innerhtml;

  // validate input
  // if (!s1 || !s2 || !s3 || !s4 || !s5 || !s6 || !s7 || !s8 || !s9 || !s10) {
  //   alert("Please fill all fields");
  //   return;
  // }

  // get echatillon data from websql
  db.transaction(function (tx) {
    // 1 - get echantillon data by discrict name

    tx.executeSql(
      "select * from echantillon where code_district = ? ;",
      [getDisctrictName()],
      function (tx, result) {
        if (!result.rows.length) {
          alert("echantillon not found");
          return;
        }
        const echantillon = result.rows.item(0);
        console.log(echantillon);

        // 2 - insert data into database
        db.transaction(function (tx) {
          tx.executeSql(
            "insert into menage (code_district,gouvernorat,num_m,nom_chef_f,adresse,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
              echantillon.code_district,
              echantillon.gouvernorat,
              echantillon.num_m,
              echantillon.nom_chef_f,
              echantillon.adresse,
              "hello",
              "hello",
              "hello",
              "hello",
              "hello",
              "hello",
              "hello",
              "hello",
              "hello",
              "hello",
            ],
            result => console.log("insertion éffectuée"),
            error => console.log("error 2")
          );
        });
      },
      error => console.log("error 1", error)
    );
  });
};

// redirect if not logged in
const checkLogin = () => {
  if (!getDisctrictName()) {
    window.location.href = "index.html";
  }
};

// get user query param
const getDisctrictName = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("code_district");

  if (!username) return null;

  return username;
};

checkLogin();
