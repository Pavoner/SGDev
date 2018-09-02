module.exports = {
    postValidation(str, propArray, nestedObjPropArray) {
//propArray and nestedPropArray need to be defined in the module that is calling the validator.  Then passed in 
//the call to postValidation

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
                    //whitelist only expected properties to the safeObj
                    propArray.forEach(function(prop) {
                        if (parsedObj.hasOwnProperty(prop)) {
                            safeObj[prop] = parsedObj[prop];  
                        }
                    }); 
                    //regex to replace HTML and MongoDB special characters with HTML character entities
                    //needs work still... want to  get ; working again...
                    propArray.forEach(function(prop){
                        if (typeof safeObj[prop] === "string") {
                                safeObj[prop] = safeObj[prop]
                                     //.replace(/;/g, "&#059;")    
                                     .replace(/&/g, "&amp;")
                                     .replace(/</g, "&lt;")
                                     .replace(/>/g, "&gt;")
                                     .replace(/"/g, "&quot;")
                                     .replace(/'/g, "&#039;")
                                     .replace(/{/g, "&#123;")
                                     .replace(/}/g, "&#125;")             
                                     .replace(/\//g, "&#x2F");
                        }                      
                    }); 
                    //this block applies the prop whitelist and regex to each nested result object
                    for (let i=1; i<6; i++) {
                        if (safeObj['result'+i] !== null){
                            nestedObjPropArray.forEach(function(nestedProp) {
                                if (safeObj['result'+i].hasOwnProperty(nestedProp)) {
                                    safeObj['result'+i][nestedProp] = safeObj['result'+i][nestedProp];                            
                                } else {safeObj['result'+i][nestedProp] = null};
                            });
                            nestedObjPropArray.forEach(function(nestedProp){
                                if (typeof safeObj['result'+i][nestedProp] === "string"){
                                safeObj['result'+i][nestedProp] = safeObj['result'+i][nestedProp]
                                                            //.replace(/;/g, "&#059;")    
                                                            .replace(/&/g, "&amp;")
                                                            .replace(/</g, "&lt;")
                                                            .replace(/>/g, "&gt;")
                                                            .replace(/"/g, "&quot;")
                                                            .replace(/'/g, "&#039;")
                                                            .replace(/{/g, "&#123;")
                                                            .replace(/}/g, "&#125;")             
                                                            .replace(/\//g, "&#x2F");
                                }
                            });
                        }
                    }
                }
                return safeObj;
            }
        } catch(e) {
            console.log(e)
            return null;
        }
    },
}
