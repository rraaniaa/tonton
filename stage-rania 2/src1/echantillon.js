if (!window.openDatabase) {
  alert("ERROR");
} else {
  var db = openDatabase("store.db", "1.0", "table-echant", 1024 * 1024 * 5);
}

// redirect if not logged in
const checkLogin = () => {
  if (!getUserName()) {
    window.location.href = "index.html";
  }
};

// get user 
const getUserName = () => {
  
  const username = sessionStorage.getItem('username');

  if(!username) return null;

  
  return username;
};

const insertData = event => {
  event.preventDefault();
  const nom_chef_f = document.getElementById("nom-chef-f").value;
  const code_district = document.getElementById("dis").value;
  const gouvernorat = document.getElementById("gouv").value;
  const adresse = document.getElementById("adresse").value;
  const num_m = document.getElementById("num-m").value;
  const user = getUserName();

  // validate data 
  if(!nom_chef_f || !code_district || !gouvernorat || !adresse || !num_m || !user) { 
    alert("Please fill all fields");
    return;
  }

  db.transaction(function (tx) {
    tx.executeSql(
      "insert into echantillon (code_district,gouvernorat,num_m,nom_chef_f,adresse,user) values (?,?,?,?,?,?)",
      [code_district, gouvernorat, num_m, nom_chef_f, adresse, user],
      result => {
        console.log("iserted");
        window.location.href = `./page3.html`;
      },
      error => console.log("error", error)
    );
  });
};
function updateproduct(product) {
  db.transaction(function (tx) {
      tx.executeSql('UPDATE products SET name=? WHERE id=?', [product.title]);
  });
}



function recuperation(){
  
  document.getElementById("dis").value= sessionStorage.getItem('code_district');
  document.getElementById("num-m").value= sessionStorage.getItem('num_m');
  document.getElementById("nom-p").value= sessionStorage.getItem('username');
}

