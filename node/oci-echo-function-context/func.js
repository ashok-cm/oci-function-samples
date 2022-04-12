const fdk=require('@fnproject/fdk');

fdk.handle(function(input){
  for (var key in process.env){
    console.log("ENV '" + key + "' = " + process.env[key]);
  }

  var total = input.length;
  input.forEach((data, index) => {
    console.log("INPUT [" + (index+1) + "/" + total + "]", JSON.stringify(data));
  });
  return {'message': 'Hello '}
})
