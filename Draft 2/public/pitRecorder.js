let user;
window.addEventListener('load', init);

function init() {
    console.log('pitRecorder init');

    pm = new PitRecordManager();
    //pm.loadFromServer();
    //pm.displayPitRecordsInTable('tableDiv');
    user = 'Dev';
}

function formSubmit(){
    let pitName = document.querySelector("#pitName");
    let privateRecord = document.querySelector("#privateRecord");
    let date = document.querySelector("#date");
    let time = document.querySelector('#time');
    let location = document.querySelector('#location');
    let lat = document.querySelector('#lat');
    let lng = document.querySelector('#lng');
    let elevation = document.querySelector('#elevation');
    let aspect = document.querySelector('#aspect');
    let temp = document.querySelector('#temp');
    let resultNumber1 = 'Result 1';
    let testType1 = document.querySelector('#testType1');
    let loadingStage1=document.querySelector('#loadingStage1');
    let fracQual1 = document.querySelector('#fracQual1');
    let depth1 = document.querySelector('#depth1');
    let weakLayer1 = document.querySelector('#weakLayer1');
    let notes1 = document.querySelector('#notes1');
    let result2 = null;
    let result3 = null;
    let result4 = null;
    let result5 = null;
    let includeResult2 = document.querySelector('#includeResult2');

    if (includeResult2.checked === true){
        let resultNumber2 = 'Result 2';
        let testType2 = document.querySelector('#testType2');
        let loadingStage2=document.querySelector('#loadingStage2');
        let fracQual2 = document.querySelector('#fracQual2');
        let depth2 = document.querySelector('#depth2');
        let weakLayer2 = document.querySelector('#weakLayer2');
        let notes2 = document.querySelector('#notes2');
        result2 = new TestResult(resultNumber2, testType2.value, loadingStage2.value, fracQual2.value, depth2.value, weakLayer2.value, notes2.value);
        console.log(result2);
    }

    let newRecord = new PitRecord(user, privateRecord.checked, pitName.value, date.value, time.value, location.value, lat.valueAsNumber, lng.valueAsNumber, elevation.value, aspect.value, temp.value, new TestResult(resultNumber1, testType1.value, loadingStage1.value, fracQual1.value, depth1.value, weakLayer1.value, notes1.value), result2, result3, result4, result5);
    console.log(newRecord);
    pm.add(newRecord);

    pm.displayPitRecordsInTable("tableDiv");
    //document.getElementById('pitForm').reset();
    return false;
}

function emptyList() {
	pm.clear();
  	pm.displayPitRecordsInTable("tableDiv");
}

function loadList() {
	pm.load();
  	pm.displayPitRecordsInTable("tableDiv");
}

class TestResult {
    constructor (resultNumber, testType, loadingStage, fracQual, depth, weakLayer, notes){
        this.resultNumber = resultNumber;
        this.testType = testType;
        this.loadingStage = loadingStage;
        this.fracQual = fracQual;
        this.depth = depth;
        this.weakLayer = weakLayer;
        this.notes = notes;
    }
}

class PitRecord {
    constructor(user, privateRecord, pitName, date, time, location, lat, lng, elevation, aspect, temp, result1, result2, result3, result4, result5){
        this.user = user;
        this.privateRecord = privateRecord;
        this.pitName = pitName;
        this.date = date;
        this.time = time;
        this.location = location;
        this.lat = lat;
        this.lng = lng;
        this.elevation = elevation;
        this.aspect = aspect;
        this.temp = temp;
        this.result1 = result1;
        this.result2 = result2;
        this.result3 = result3;
        this.result4 = result4;
        this.result5 = result5;
    }   
}

class PitRecordManager {
    constructor (){
        this.pitList = [];
    }

    clear(){
        this.pitList = [];
    }

    load () {
        if(localStorage.pitList !== undefined) {
            this.pitList = JSON.parse(localStorage.pitList);
        }
    }

    add(pitRecord){
        this.pitList.push(pitRecord);
        this.saveSingleRecordToServer(pitRecord)
    }
    
    remove(pitRecord){
        for (let i=0; i < this.pitList.length; i++){
            var p  =this.pitList[i];
            if (p.name === pitRecord.name){
                this.pitList.splice(i,i);
                break;
            }
        };
    }

    sort(){
        this.pitList.sort(PitRecordManager.sortByName);
        console.log(this.pitList);
        this.displayPitRecordsInTable('tableDiv');
    }

    static sortByName(p1, p2) {

        if(p1.pitName < p2.pitName)
        return -1;

        if (p1.pitName > p2.pitName)
        return 1;

        else return 0;
    }

    save(){
        if(this.pitList.length !== 0){
        localStorage.pitList = JSON.stringify(this.pitList);
        alert('List of Snow Pits has been updated!');
        } else {
            alert('Whoops no pit records to store...');
        }
    }

    saveToServer(){
        if(this.pitList.length !== 0){
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:3000", true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(this.pitList));
            xhr.onload = function() {
            console.log("XHR OnLoad Init")
            console.log(this.responseText);}
        }
         else {
            alert('Whoops no pit records to store...');
        }
    }

    saveSingleRecordToServer(pitRecord){
        if(pitRecord){
            console.log(JSON.stringify(pitRecord))
            var xhr = new XMLHttpRequest();

            xhr.open("POST", "http://localhost:3000/pitList", true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(pitRecord));

            xhr.onload = function() {
            console.log(this.responseText);}
        }
         else {
            alert('Whoops no pit record to store...');
        }
    }

    loadFromServer(){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/pitList", true);
        xhr.send();
        xhr.onloadend = function(){
        var resp = xhr.response;
        if (resp !== undefined){
            console.log(JSON.parse(resp))
        var formattedResponse = JSON.parse(resp);
            if (formattedResponse !== undefined) {
                pm.pitList = formattedResponse;
            }
        
        pm.displayPitRecordsInTable('tableDiv');
        pm.displayPitRecordsInMap();
        } else console.log('resp = undefined')
    }}

    printPitRecordsToConsole () {
        this.pitList.forEach(function (pit){
            console.log(pit.name);
        });
    }

    displayPitRecordsInTable(idOfContainer){
        let container = document.querySelector("#" + idOfContainer);
        container.innerHTML="";

        if (this.pitList.length === 0) {
            container.innerHTML="<p>WHOOPS!!!  No Snow Pits In Record. Please add pit records then try again.</p>";
            return;
        }

        let table = document.createElement("table");
        let i=0
        this.pitList.forEach(function (currentPit){
            
            let row = table.insertRow();
            
            row.innerHTML = "<td>" + currentPit.pitName + "</td> <td>" + currentPit.date + "</td><td>" + currentPit.time + "</td><td>" + currentPit.location + "</td><td>" + 
            currentPit.elevation + "</td><td>" + currentPit.aspect + "</td> <td>" + currentPit.temp + "</td><td>"+ currentPit.result1.resultNumber + "</td> <td>" +
            currentPit.result1.testType + "</td><td>"+ currentPit.result1.loadingStage + "</td><td>" + currentPit.result1.fracQual + "</td> <td>" + 
            currentPit.result1.depth + "</td><td>" + currentPit.result1.weakLayer + "</td><td>" + currentPit.result1.notes + "</td>";
            
            if (currentPit.result2 !== null) {row.innerHTML += "<td>" + currentPit.result2.resultNumber + "</td> <td>" +
            currentPit.result2.testType + "</td><td>"+ currentPit.result2.loadingStage + "</td><td>" + currentPit.result2.fracQual + "</td> <td>" + 
            currentPit.result2.depth + "</td><td>" + currentPit.result2.weakLayer + "</td><td>" + currentPit.result2.notes + "</td>";} 
            
            else {row.innerHTML += "<td>" + "No Data" + "</td> <td>" + "No Data" + "</td><td>"+ "No Data" + "</td><td>" + "No Data" + "</td> <td>" + 
            "No Data" + "</td><td>" + "No Data" + "</td><td>" + "No Data" + "</td>";}
            console.log(i)
            i++
            
        });
        container.appendChild(table);
    }

    displayPitRecordsInMap(){
        var contentArray = ['Test Content'];
        if (this.pitList.length === 0) {
            container.innerHTML="<p>WHOOPS!!!  No Snow Pits In Record. Please add pit records then try again.</p>";
            return;
        }

        let pitPositions = [];
        for (let i = 0; i < this.pitList.length; i++) {
            if ((this.pitList[i].lat) && (this.pitList[i].lng)) {
                pitPositions.push(this.pitList[i]);
            } else {console.log('no lat long for pit at index: ' + i)}
        }

        let markers = [];
        for (let i = 0; i < pitPositions.length; i++) { 
            markers[i] = new google.maps.Marker({
                position: {lat: pitPositions[i].lat, lng: pitPositions[i].lng},
                map: map,
                title: pitPositions.name,
            });
            markers[i].pitName = pitPositions[i].pitName;
            markers[i]._id = pitPositions[i]._id;
            markers[i].date = pitPositions[i].date;
            markers[i].location = pitPositions[i].location;
            markers[i].index = i;            
        }

        var infoWindow = new google.maps.InfoWindow({
            content: contentArray[0]
          });
        
        let avgLat, avgLng;
        let totLat = 0;
        let totLng = 0;

        for (let i=0; i<markers.length; i++){
            totLat = (totLat + (markers[i].position.lat()));
            totLng = (totLng + (markers[i].position.lng()));            
        }

        avgLat = (totLat/markers.length);
        avgLng = (totLng/markers.length);

        map.setCenter({lat: avgLat, lng: avgLng});
        map.setZoom(8);

        markers.forEach(function (currentMarker){
            currentMarker.addListener('click', function(){
                contentArray.push('<div id=infoWindow><p> Pit ID: ' + currentMarker._id + '<br> Pit Name: ' + currentMarker.pitName + '<br> Pit Date: ' + currentMarker.date + ' <br> Pit Location: ' + currentMarker.location + ' <p></div>');
                infoWindow.open(map, currentMarker);
                infoWindow.setContent(contentArray[currentMarker.index + 1]);
            })
        })

    }
}