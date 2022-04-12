const fdk=require('@fnproject/fdk');
const common = require("oci-common");
const devops = require("oci-devops");

fdk.handle(async function(input){
  for (var key in process.env){
    console.log("ENV '" + key + "' = " + process.env[key]);
  }

  var total = input.length;
  input.forEach((data, index) => {
    console.log("INPUT [" + (index+1) + "/" + total + "]", JSON.stringify(data));
  });

  const provider = common.ResourcePrincipalAuthenticationDetailsProvider.builder();

  const devopsClient = new devops.DevopsClient({
    authenticationDetailsProvider: provider
  })
  const run = await devopsClient.getBuildRun({buildRunId: input[0].data.buildRunId});
  console.log("BUILD RUN", JSON.stringify(run));

  const buildRunResponse = await devopsClient.createBuildRun({
    createBuildRunDetails: {
      buildPipelineId: "ocid1.devopsbuildpipeline.oc1.ap-hyderabad-1.amaaaaaak56z2vqazjgskjqjjdjqowrdn3d6eatvhsixvhzb2ozoje2qxh7q",
      displayName: "AutoTriggeredCascade2_" + new Date().toISOString(),
      buildRunArguments: {
        items: run.buildRun.buildOutputs.exportedVariables.items
      }
    }
  })
  console.log("BUILD RUN RESPONSE", JSON.stringify(buildRunResponse));

  return {'message': 'Hello'}
})

