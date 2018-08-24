window.onload = init;

function init() {
    console.log('DOM is Loaded');

    pm = new PitRecordManager();

    //pm.addTestData();
    pm.displayPitRecordsInTable('tableDiv');
}

function formSubmit(){
    let pitName = document.querySelector("#pitName");
    let date = document.querySelector("#date");
    let time = document.querySelector('#time');
    let location = document.querySelector('#location');
    let elevation = document.querySelector('#elevation');
    let aspect = document.querySelector('#aspect');
    let temp = document.querySelector('#temp');
    let resultNumber1 = document.querySelector('#result1');
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
        let resultNumber2 = document.querySelector('#result2');
        let testType2 = document.querySelector('#testType2');
        let loadingStage2=document.querySelector('#loadingStage2');
        let fracQual2 = document.querySelector('#fracQual2');
        let depth2 = document.querySelector('#depth2');
        let weakLayer2 = document.querySelector('#weakLayer2');
        let notes2 = document.querySelector('#notes2');
        result2 = new TestResult(resultNumber2.value, testType2.value, loadingStage2.value, fracQual2.value, depth2.value, weakLayer2.value, notes2.value);
        console.log(result2);
    } else ;


    let newRecord = new PitRecord(pitName.value, new Date(date.value), time.value, location.value, elevation.value, aspect.value, temp.value, new TestResult(resultNumber1.value, testType1.value, loadingStage1.value, fracQual1.value, depth1.value, weakLayer1.value, notes1.value), result2, result3, result4, result5);
    console.log(newRecord);
    pm.add(newRecord);

   /* pitName.value = "";
    date.value = "";
    location.value = "";
    elevation.value = "";
    aspect.value = "";
    temp.value = "";
    result1.value = "";
    fracQual1.value = "";
    notes1.value = "";*/

    //pm.displayPitRecordsInTable("tableDiv");

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
    constructor(pitName, date, time, location, elevation, aspect, temp, result1, result2, result3, result4, result5){
        this.pitName = pitName;
        this.date = date;
        this.time = time;
        this.location = location;
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

    saveToFile(){
        if(this.pitList.length !== 0){
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:3000", true);
            xhr.send(JSON.stringify(this.pitList));
            xhr.onload = function() {
            console.log("HELLO")
            console.log(this.responseText);
            var data = JSON.parse(this.responseText);
            console.log(data);}}
         else {
            alert('Whoops no pit records to store...');
        }
    }

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
        this.pitList.forEach(function (currentPit){
            let row = table.insertRow();
            //pitName, date, time, location, elevation, aspect, result1, fracQual1, notes1)

            row.innerHTML = "<td>" + currentPit.pitName + "</td> <td>" + currentPit.date + "</td><td>" + currentPit.time + "</td><td>" + currentPit.location + "</td><td>" + 
            currentPit.elevation + "</td><td>" + currentPit.aspect + "</td> <td>" + currentPit.temp + "</td><td>"+ currentPit.result1.resultNumber + "</td> <td>" +
            currentPit.result1.testType + "</td><td>"+ currentPit.result1.loadingStage + "</td><td>" + currentPit.result1.fracQual + "</td> <td>" + 
            currentPit.result1.depth + "</td><td>" + currentPit.result1.weakLayer + "</td><td>" + currentPit.result1.notes + "</td>";
        });
        container.appendChild(table);
    }

    addTestData() {
        let c1 = new PitRecord ("Test Pit 1", new Date("Janurary 06, 2018"), "11:30", "Crowfoot Glades", 2000, "South", -8, "CTM12", "SC", "Down 100CM on Dec 18th SH");
        let c2 = new PitRecord ("Test Pit 2", new Date("January 08, 2018"), "13:15", "Conaught Creek", 2200, "North West", 3, "CTM18", "SP", "Down 80CM on Jan 4th SH");
  		let c3 = new PitRecord ("Chris Pit 3", new Date("January 12, 2018"), "10:45", "Paget Glades", 1905, "South West", -11, "Nil", "Nil", "Bottom 30CM DH 1-4mm");
        /*let c4 = new Contact("Arnold Schwarzenneger", "T2@terminator.com");
        let c5 = new Contact("Chris Pavone", "pavoner@gmail.com");*/
          
		
		this.add(c1);
		this.add(c2);
		this.add(c3);
        /*this.add(c4);
        this.add(c5);*/
		

		this.sort();
	}
}