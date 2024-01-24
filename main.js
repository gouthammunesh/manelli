import productdb, { bulkcreate, getData, createEle } from "./Module.js";

let db = productdb("Productdb", {
    products: `++id,name,email,dob,gender,hobby,city,state,country`
});

//reset functio





//input tags
const userid = document.getElementById("userid");
const name = document.getElementById("name");
const email = document.getElementById("email");
const dob = document.getElementById("dob");
const gender = document.getElementById("gender");
const hobby = document.getElementById("hobby");
const city = document.getElementById("city");
const state = document.getElementById("state");
const country = document.getElementById("country");

//buttons
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

//reset function
function resetSelectElement(selectElement) {
  var options = selectElement.options;

  // Look for a default selected option
  for (var i = 0, iLen = options.length; i < iLen; i++) {
    if (options[i].defaultSelected) {
      selectElement.selectedIndex = i;
      return;
    }
  }

  // If no option is the default, select first or none as appropriate
  selectElement.selectedIndex = 0; // or -1 for no option selected
}

//notfound
const notfound = document.getElementById("notfound");

//insert value using create button
btncreate.onclick = (event) => {
    let flag = bulkcreate(db.products, {
      name: name.value,
      email: email.value,
      dob: dob.value,
      gender: gender.value,
      hobby: hobby.value,
      city: city.selectedOptions[0].value,
      state: state.selectedOptions[0].value,
      country: country.selectedOptions[0].value,
    });
    // console.log(flag) 
    // name.value = email.value = dob.value = gender.value = hobby.value = city.value = state.value = country.value = "";
    userid.value = 0;
    name.value = "";
    email.value = "";
    dob.value = "";
    gender.value = "";
    hobby.value = "";
    resetSelectElement(city);
    resetSelectElement(state);
    resetSelectElement(country);
    table(event);

    // getData(db.products, (data) => {
    //     userid.value = data.id + 1 || 1;
    // });
}


//create event on btn read button
btnread.onclick = (event) => { table(event) };

//update event
btnupdate.onclick = (event) => {
    event.preventDefault();
    const id = parseInt(userid.value || 0);
    if (id)
    {
        db.products
          .update(id, {
            name: name.value,
            email: email.value,
            dob: dob.value,
            gender: gender.value,
            hobby: hobby.value,
            city: city.selectedOptions[0].value,
            state: state.selectedOptions[0].value,
            country: country.selectedOptions[0].value,
          })
          .then((updated) => {
            let get = updated ? `Data Updated` : `Couldn't Update Data`;
            console.log({ get });
            userid.value = 0;
            name.value = "";
            email.value = "";
            dob.value = "";
            gender.value = "";
            hobby.value = "";
            resetSelectElement(city);
            resetSelectElement(state)
            resetSelectElement(country)
            table(event);
          });
        }
}

//delete records
btndelete.onclick = (event) => {
    db.delete();
    db = productdb("Productdb", {
      products: `++id,name,email,dob,gender,hobby,city,state,country`,
    });
    db.open();
    console.log({event})
    table(event);
}

function table(event) {
    if(event)
    event.preventDefault();
    const tbody = document.getElementById("tbody");
    
    while (tbody.hasChildNodes())
    {
        tbody.removeChild(tbody.firstChild);
        }

    getData(db.products, (data) => {
        console.log({ data })
         
        if(data)
        {
            createEle("tr", tbody, tr => {
            
                for (const value in data) {
                    createEle("td", tr, td => {
                        td.textContent = data[value];
                        td.id = value+data['id'];
                    
                    })
                }

                createEle("td", tr, (td) => {
                     createEle("i", td, (i) => {
                       i.className += "fas fa-edit btnedit";
                       i.setAttribute(`data-id`, data.id);
                       i.onclick = editbtn;
                     });
                })
                   
                

                createEle("td", tr, (td) => {
                    createEle("i", td, (i) => {
                        i.className += "fas fa-trash-alt btndelete";
                        i.setAttribute(`data-id`, data.id);
                        i.onclick = deletebtn;
                    })
                })
            })
        }
        else
        {
         while (tbody.hasChildNodes()) {
           tbody.removeChild(tbody.firstChild);
         }
          notfound.textContent = "No Record found in Database....!!";
        }
    })

}

function editbtn(event) {
  let id = parseInt(event.target.dataset.id);
  console.log({ id });
  //input tags
    const userid = document.getElementById("userid");
    // console.log(userid)
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const dob = document.getElementById("dob");
  const gender = document.getElementById("gender");
  const hobby = document.getElementById("hobby");
  const city = document.getElementById("city");
  const state = document.getElementById("state");
  const country = document.getElementById("country");
  db.products.get(id, (data) => {
    console.log({ userid });
    userid.value = data.id || 0;
    name.value = data.name || "";
    email.value = data.email || "";
    dob.value = data.dob || "";
    gender.value = data.gender || "";
    hobby.value = data.hobby || "";
    city.value = data.city || resetSelectElement(city);
    state.value = data.state || resetSelectElement(state);
      country.value = data.country || resetSelectElement(country);
  });
}

function deletebtn(event)
{
    let id = parseInt(event.target.dataset.id);
    db.products.delete(id);
    table();
}
const City = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Bhandara"],
  "Uttar Pradesh": ["Kanpur", "Varansi","Agra","Lucknow"],
  "San Fransico": ["Berkeley", "Alameda", "Fremont", "Livermore"],
  LA: ["Santa Monica", "Malibu", "Burbank", "Torrance"],
};
const UsStates = [
  "San Fransico",
  "LA"
];
const IndiaStates = ["Maharashtra", "Uttar Pradesh"];



//handling select options
country.addEventListener('change', (event) => {
    const selectedCountry = event.target.value;
    while (state.lastElementChild) {
      state.removeChild(state.lastElementChild);
    }
    if (selectedCountry == "India") {
        IndiaStates.map((_state) => {
            const option = document.createElement('option');
            option.value = _state;
            option.text = _state;
            state.appendChild(option);
        })
    } else if (selectedCountry == "US") {
        
        UsStates.map((_state) => {
          const option = document.createElement("option");
          option.value = _state;
          option.text = _state;
          state.appendChild(option);
        });
    }
})

state.addEventListener('change', (event) => {
    console.log("changed")
    const selectedState = event.target.value;
    console.log(selectedState)
     while (city.lastElementChild) {
       city.removeChild(city.lastElementChild);
     }
    City[selectedState].map((city_) => {
          const option = document.createElement("option");
          option.value = city_;
          option.text = city_;
          city.appendChild(option);
     })
})
