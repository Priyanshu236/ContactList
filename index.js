let contactList = [
    ["1234567899","Aryan",0],
    ["88888888","Dhruv",1],
    ["000000000","Yash",2]
]
let indentifier = 3;
let searchList = []
let items = document.getElementById("items")

function onDelete(ind){
    let newContactList=[]
    contactList.forEach(element => {
        if(element[2]!=ind)
        newContactList.push(element)
    });
    contactList=newContactList
    listOfContacts()
}


function popUpClose(){
    document.getElementById('name').value=""
    document.getElementById('contactNum').value=""
    document.getElementById("popUp").classList.add("hidden")
}

function popUpShow(){
    document.getElementById("saveButton").removeEventListener("onclick",editTextSave)
    document.getElementById("saveButton").onclick=saveContact
    document.getElementById("popUp").classList.remove("hidden")
}
let functionCall;
function editTextOpen(ind){
    
    document.getElementById("saveButton").removeEventListener("onclick",saveContact)
    document.getElementById("saveButton").onclick=function(){editTextSave(ind)}
    document.getElementById("popUp").classList.remove("hidden")
    contactList.forEach(element => {
        if(element[2]==ind)
        {
           
            document.getElementById('name').value=element[1]
            document.getElementById('contactNum').value=element[0]
        }
    });
}

function editTextSave(ind){
 
    let Name=document.getElementById('name').value
    let contactNum=document.getElementById('contactNum').value
    if(Name=="" || contactNum=="")
    {
        alert("Both fields should be non-empty")
        return;
    }
    for(let i = 0; i < contactList.length; i++){
        if(contactList[i][0]==contactNum && ind!=contactList[i][2])
        {
            alert("Number Already Exists "+contactList[i][2])
            return;
        }
    }
    for(let i = 0; i < contactList.length; i++){
        if(contactList[i][2]==ind)
        {
            console.log(i+" "+ind)
            contactList[i][1]=document.getElementById('name').value
            contactList[i][0]=document.getElementById('contactNum').value
            break;
        }
    }
    popUpClose()
    listOfContacts()
}


function saveContact(){
    let Name=document.getElementById('name').value
    let contactNum=document.getElementById('contactNum').value
    if(Name=="" || contactNum=="")
    {
        alert("Both fields should be non-empty")
        return;
    }
    for(let i = 0; i < contactList.length; i++){
        if(contactList[i][0]==contactNum)
        {
            alert("Number Already Exists")
            return;
        }
    }
    contactList.push([contactNum,Name,indentifier++])
    alert("Number Saved")
    Name=""
    contactNum=""
    popUpClose()
    listOfContacts()
}

function listOfContacts(){
    let searchVal = document.getElementById("searchVal").value
    if(searchVal!="")
    {
        filterList()
        return
    }
    contactList.sort((a, b) => a[1].localeCompare(b[1]));
    items.innerHTML = ""
    contactList.forEach((item,index)=>{
        let listItem = ("<div class=\"relative m-3 p-2 w-96 rounded-2xl flex flex-row bg-slate-100 drop-shadow-xl\"><p>"+item[1] +" ("+item[0]+")" +"</p><i onclick=editTextOpen("+item[2]+") class=\"fa-solid fa-pen-to-square absolute hover:cursor-pointer right-4 top-3\"></i><i class=\"fa-solid fa-phone absolute hover:cursor-pointer right-12 top-3\"></i><i onclick=\"onDelete("+item[2]+")\" class=\"fa-solid fa-trash absolute -right-6 hover:cursor-pointer top-3\"></i></div>");
        
        items.innerHTML += listItem
    })
}
function listOfSearchedContacts(){
    items.innerHTML = ""
    searchList.forEach((item)=>{
        let listItem = ("<div class=\"relative m-3 p-2 w-96 rounded-2xl flex flex-row bg-slate-100 drop-shadow-xl\"><p>"+item[1] +" ("+ item[0]+")" +"</p><i onclick=editTextOpen("+item[2]+") class=\"fa-solid fa-pen-to-square absolute hover:cursor-pointer right-4 top-3\"></i><i class=\"fa-solid fa-phone absolute hover:cursor-pointer right-12 top-3\"></i><i onclick=\"onDelete("+item[2]+")\" class=\"fa-solid fa-trash absolute -right-6 hover:cursor-pointer top-3\"></i></div>");
        
        items.innerHTML += listItem
    })
}

function filterList(){
    let searchVal = document.getElementById("searchVal").value
    if(searchVal=="")
    {
        listOfContacts()
        return
    }
    searchList = []
    contactList.forEach(element => {
        if(element[0].match(new RegExp(searchVal, "i")) || element[1].match( new RegExp(searchVal, "i")))
        {
            searchList.push(element)
        }
    });
    listOfSearchedContacts()
}
function sortbyCond(a,b)
{
    a[1].localeCompare(b[1])
    
}
listOfContacts()