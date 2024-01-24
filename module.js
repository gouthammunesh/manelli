
const productdb = (dbname,table) => {
  //create Database
    const db = new Dexie(dbname)
    db.version(1).stores(table);
    db.open();
    return db;
}

//insert function
const bulkcreate = (dbtable, data) => {
    let flag = empty(data);
    if (flag) {
        dbtable.bulkAdd([data]);
        console.log("Data Inserted Successfully.....!!");
    }
    else {
        console.log("Please Provide Data.........");
    }
    return flag;
}


//check textbox validation
const empty = object => {
    let flag = false;
    for (const value in object) {
        if (object[value] != ""     && object.hasOwnProperty(value))
        {
            flag = true;
        }
        else
        {
            flag = false;
        }
    }
    return flag;
}

//Get Data from the Database

const getData = (dbtable,fn) => {
  let index = 0;
  let obj = {};

  dbtable.count((count) => {
    if (count) {
      dbtable.each((table) => {
          obj = Sortobj(table);
          fn(obj, index++);
      });
      }
      else
    {
        fn(0);
        }
  });
};

//Sort Obj

const Sortobj = (sortobj) => {
  let obj = {};
  obj = {
    id: sortobj.id,
    name: sortobj.name,
    email: sortobj.email,
    dob: sortobj.dob,
    gender: sortobj.gender,
    hobby: sortobj.hobby,
    city: sortobj.city,
    state: sortobj.state,
    country: sortobj.country,
  };
  return obj;
};

//create dynamic elements
const createEle = (tagname,appendTo,fn) => {
    const element = document.createElement(tagname);
    if (appendTo)
        appendTo.appendChild(element);
    if (fn)
        fn(element);
}

export default productdb;
export { bulkcreate, getData, createEle };
