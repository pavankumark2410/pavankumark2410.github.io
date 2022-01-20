/*--JS for DOM Parser--*/

var xmlDoc
var xmlFile = 'ignitestore.xml'

//function to load xml doc
function loadXML()
{
    var xmlReq = new XMLHttpRequest;
    xmlReq.onreadystatechange = function()
    {
        console.log(xmlReq.readyState)
        if((xmlReq.readyState == 4) && (xmlReq.status == 200))
        {
            //xml doc successfully retrieved
            xmlDoc = xmlReq.responseXML
            displayTable();
            myFunction();
        }
    }
    xmlReq.open('GET', xmlFile, true)
    xmlReq.send()
}

function myFunction(xml) {
   
    document.getElementById("modulename").innerHTML =
    xmlDoc.getElementsByTagName("modulename")[0].childNodes[0].nodeValue;
    document.getElementById("caption").innerHTML =
    xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;

    document.getElementById("abt").innerHTML =
    xmlDoc.getElementsByTagName("c")[0].childNodes[1].childNodes[1].childNodes[0].nodeValue;

 document.getElementById("abb").innerHTML =
    xmlDoc.getElementsByTagName("c")[0].childNodes[3].childNodes[1].childNodes[0].nodeValue;
    document.getElementById("abt2").innerHTML =
    xmlDoc.getElementsByTagName("c")[0].childNodes[3].childNodes[3].childNodes[0].nodeValue;
    document.getElementById("abt3").innerHTML =
    xmlDoc.getElementsByTagName("c")[0].childNodes[5].childNodes[1].childNodes[0].nodeValue;
    document.getElementById("abt4").innerHTML =
    xmlDoc.getElementsByTagName("c")[0].childNodes[5].childNodes[3].childNodes[0].nodeValue;




var btn = document.querySelector('button');

btn.addEventListener('click', function(){
  var hint = document.getElementById('dis');
  if(hint.style.display == 'none'){
    hint.style.display = 'block';
  }
  else{
    hint.style.display = 'none';
  }

});
   
    }

//function to display html table from xml data
function displayTable()
{
    var i;
    var table = "<tr><th>ID</th><th>NAME</th><th>ADDRESS</th><th>PHONE</th><th>TYPE</th><th>USE-TYPE</th></tr>"

    var x = xmlDoc.getElementsByTagName("mechanic")
    for (i = 0; i < x.length; i++)
    {
        table += "<tr><td>" +
            x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("address")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("phone")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("type")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("usetype")[0].childNodes[0].nodeValue + "</td>" +
            "<td><span class='material-icons' onclick='deleteRecord(" +i+ ")'>delete</span></td></tr>"
    }
    document.getElementById("table").innerHTML = table
}

//function to delete record from XML
function deleteRecord(i)
{  
    y = xmlDoc.getElementsByTagName("mechanic")[i];
    var name = y.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    var reply = confirm("Do you want to delete record? \nName: " + name);
    if(reply == true)
    {
        xmlDoc.documentElement.removeChild(y)
        console.log("Record deleted: " + name)
        displayTable()
    }
}



//function to add new record to xml
function addNewRecord()
{
    var i
    var emp = []
    var x = document.getElementById("addRecordForm")
    mechanic = xmlDoc.createElement("mechanic")
    emp[0] = xmlDoc.createElement("name")
    emp[1] = xmlDoc.createElement("id")
    emp[2] = xmlDoc.createElement("address")
    emp[3] = xmlDoc.createElement("phone")
    emp[4] = xmlDoc.createElement("type")
    emp[5] = xmlDoc.createElement("usetype")
    for(i = 0; i < 6; i++)
    {
        

        emp[i].appendChild(xmlDoc.createTextNode(x.elements[i].value))
        mechanic.appendChild(emp[i])
    }
    xmlDoc.documentElement.appendChild(mechanic);
    console.log("Record added: " + x.elements[0].value)
    displayTable()
}