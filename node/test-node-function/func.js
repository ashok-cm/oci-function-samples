const fdk=require('@fnproject/fdk');
const common = require("oci-common");
const identity = require("oci-identity");
const devops = require("oci-devops");

fdk.handle(async function(inputA, inputB){
  console.log("ENV", process.env);
  const provider = common.ResourcePrincipalAuthenticationDetailsProvider.builder();

  const devopsClient = new devops.DevopsClient({
    authenticationDetailsProvider: provider
  })
  const runs = await devopsClient.listProjects({compartmentId: "ocid1.compartment.oc1..aaaaaaaai5kbn7vkcpxadias6cbwr2abzq5dkdye5ewpylsjxzo2ajcayb4q"});
  console.log("BUILD RUN", JSON.stringify(runs));


  var data = inputA[0];
  if(data.source === "node-express-getting-starter-5d35" && data.data.eventName === "uploaddockerimage") {
    console.log("Going to process", data.data.request.path)
    var imageURL = "hyd.ocir.io/" + data.data.additionalDetails.path + "@sha256:" + data.data.additionalDetails.digest;
    console.log("Image URL: ", imageURL);

    const deploymentResponse = await devopsClient.createDeployment({
      createDeploymentDetails: {
        deploymentType: "PIPELINE_DEPLOYMENT",
        deployPipelineId: "ocid1.devopsdeploypipeline.oc1.ap-hyderabad-1.amaaaaaak56z2vqarzvgdlpq2ii7cie2vjdtunf3xfudrg6es3ohos76s4uq",
        displayName: "AutoDeploy_" + new Date().toISOString(),
        deploymentArguments: {
          items: [
            {
              name: "IMAGE_URL",
              value: imageURL
            }
          ]
        }
      }
    })
    console.log("Deployment Response", JSON.stringify(deploymentResponse));

  } else {
    console.log("Not interested in this source and event", data.source, data.data.eventName);
  }
  
  // // for (var i = 0; i < input.length; i++)
  //   console.log("INPUTA", JSON.stringify(inputA));
  //   console.log("INPUTB", JSON.stringify(inputB));

  return {'message': 'Hello'}
})

