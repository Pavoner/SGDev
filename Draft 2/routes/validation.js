module.exports = {
    addPitValidation(str) {
        let propArray = ['user', 'privateRecord', 'pitName', 'date', 'time', 'location', 'lat', 'lng', 'elevation', 'aspect', 'temp', 'result1', 'result2', 'result3', 'result4', 'result5']
        let maxLen=20000
        var parsedObj, safeObj = {};
        try {
            if (maxLen && str.length > maxLen) {
                console.log('Validate Post Max Length Failure')
                return null;
            } else {
                parsedObj = JSON.parse(str);
                if (typeof parsedObj !== "object" || Array.isArray(parsedObj)) {
                    safeObj = parsedObj;
                    console.log('Validate Post Not an Object or Array')
                } else {
                    // copy only expected properties to the safeObj
                    propArray.forEach(function(prop) {
                        if (parsedObj.hasOwnProperty(prop)) {
                            safeObj[prop] = parsedObj[prop];
                
                        }
                    });
                }
                return safeObj;
            }
        } catch(e) {
            console.log(e)
            return null;
        }
    },

    addResultValidation(str) {
        let propArray=['resultNumber', 'testType', 'loadingStage', 'fracQual', 'depth', 'weakLayer', 'notes']
        let maxLen=5000
        var parsedObj, safeObj = {};
        try {
            if (maxLen && str.length > maxLen) {
                console.log('Validate Comment Max Length Failure')
                return null;
            } else {
                parsedObj = JSON.parse(str);
                if (typeof parsedObj !== "object" || Array.isArray(parsedObj)) {
                    safeObj = parsedObj;
                    console.log('Validate Comment Not an Object')
                } else {
                    // copy only expected properties to the safeObj
                    propArray.forEach(function(prop) {
                        if (parsedObj.hasOwnProperty(prop)) {
                            safeObj[prop] = parsedObj[prop];
                        }
                    });
                }
                return safeObj;
            }
        } catch(e) {
            console.log(e)
            return null;
        }
    }
}