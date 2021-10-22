$(document).ready(function () {
    $("#proizvodiDiv").hide();
    zaposleni();




})
let listaZaposleni = [];
function zaposleni() {
    $.ajax({
        url: "https://services.odata.org/V3/Northwind/Northwind.svc/Employees?$format=json",
        dataType: "json",
        success: function (zaposleni) {
            document.getElementById('listaZaposlenih').innerHTML = "";
            listaZaposleni = zaposleni;
            for (const key in listaZaposleni.value) {
                const element = zaposleni.value[key];
                prikazZaposlenih(element, key);
            }
        }
    })
}

function prikazZaposlenih(element, i) {

    $("#proizvodiDiv").hide();
    $("#zaposleni").show();
    zaposleni = document.getElementById("listaZaposlenih");
    tr = document.createElement("tr");

    td1 = document.createElement("td");
    td1.innerHTML = element.FirstName;

    td2 = document.createElement("td");
    td2.innerHTML = element.LastName;

    td3 = document.createElement("td");
    td3.innerHTML = 'Nije dodeljena';


    td4 = document.createElement("td");
    if (element.nagrada == undefined) {
        td3.innerHTML = '';
    } else {
        td3.innerHTML = element.nagrada;
    }

    if (element.nagrada !== undefined) {
        dugme = document.createElement("button");
        dugme.setAttribute("class", "btn btn-danger");
        dugme.setAttribute("id", "oduzmi" + i);
        dugme.setAttribute("value", i);
        dugme.innerHTML = "Oduzmi nagradu"
    } else {
        dugme = document.createElement("button");
        dugme.setAttribute("class", "btn btn-success");
        dugme.setAttribute("id", "dodeli" + i);
        dugme.setAttribute("value", i);
        dugme.innerHTML = "Dodeli nagradu"
    }


    td4.appendChild(dugme);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    zaposleni.appendChild(tr);
    if (element.nagrada == undefined) {
        document.getElementById("dodeli" + i).
            addEventListener("click",
                // fji se prosledjuje event klika koji u sebi sadrzi informacije o objektu koji je kliknut
                // u uvom slucaju objekat je  <button value ='11.000' id='button0'>Kupi</button>
                // u target se nalazi taj objekat a nama treba njegova vrednsot value, sto prosledjujemo u fju saberi
                function (event) {
                    nagrade(event.target.value);
                });
    }
    if (element.nagrada !== undefined) {
        document.getElementById("oduzmi" + i).
            addEventListener("click",
                // fji se prosledjuje event klika koji u sebi sadrzi informacije o objektu koji je kliknut
                // u uvom slucaju objekat je  <button value ='11.000' id='button0'>Kupi</button>
                // u target se nalazi taj objekat a nama treba njegova vrednsot value, sto prosledjujemo u fju saberi
                function (event) {
                    oduzmi(event.target.value);
                });
    }
    i++;




}

function oduzmi(key) {
    listaZaposleni.value[key].nagrada = undefined;
    back()
}
listaKategorije = [];
selectedEmploye = -1;
function nagrade(key) {
    $("#proizvodiDiv").show();
    $("#zaposleni").hide();
    selectedEmploye = key;
    selectKategorije = document.getElementById("kategorije");
    $.ajax({
        url: "https://services.odata.org/V3/Northwind/Northwind.svc/Categories?$format=json",
        dataType: "json",
        success: function (categories) {
            listaKategorije = categories;
            for (const key in categories.value) {
                option = document.createElement("option");
                option.setAttribute("value", categories.value[key].CategoryID);
                option.innerHTML = categories.value[key].CategoryName;
                selectKategorije.appendChild(option);
            }
        }
    })
}
listaproducts = [];
function findProduct(value) {
    selectedKategorija = document.getElementById("kategorije").value;
    imeProizvoda = document.getElementById("imeProizvoda").value;
    $.ajax({
        url: "https://services.odata.org/V3/Northwind/Northwind.svc/Products?$format=json",
        dataType: "json",
        success: function (products) {
            j =0;
            listaproducts = products;
            for (const key in products.value) {
                if (products.value[key].CategoryID == selectedKategorija) {

                    prikaziProduct(products.value[key]);
                }
            }
        }
    })
}
j =0;
function prikaziProduct(proizvod) {
    j++;
    // pokupi div koji ima ide container
    container = document.getElementById('listaProizvoda')

    // kreiraj div
    div = document.createElement('div');
    // postavlajmo id bez razloga za sad
    div.setAttribute("id", "div" + proizvod.ProductID);
    // klasa col-sm-4 koja redja 4*3 u jedan red (grid ima 12)
    div.setAttribute("class", "col-sm-4");

    // kreiramo naslov koji ima ime proizvoda i ime kategorije
    h5 = document.createElement('h5');
    h5.setAttribute("class", "naslov");
    h5.innerHTML = proizvod.ProductName;

    // spakuj naslov u div
    div.appendChild(h5);





    button = document.createElement('button');

    button.setAttribute("id", "uKorpu" + j);
    button.setAttribute("class", "btn btn-info");
    button.setAttribute("value",  proizvod.ProductName);
    button.innerHTML = "Dodeli Nagradu"

  

    // spakuj dugme u div
    div.appendChild(button);


    // spakuj div u glavni container
    container.appendChild(div);

    // postavljamo listener na svaki klik dugmeta koji ima id uKupru1...uKorpu2...
    document.getElementById("uKorpu" + j).
        addEventListener("click",
            function (event) {

                listaZaposleni.value[selectedEmploye].nagrada = event.target.value;
                back()
            });

}
function back() {
    document.getElementById('listaZaposlenih').innerHTML = "";
    for (const key in listaZaposleni.value) {
                const element = listaZaposleni.value[key];
                prikazZaposlenih(element, key);
            }
}