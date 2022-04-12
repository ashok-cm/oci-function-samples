Install Fn project referring to https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsinstallfncli.htm

Configure Fn Client as https://docs.oracle.com/en-us/iaas/developer-tutorials/tutorials/functions/func-setup-cli/01-summary.htm#

Deploy the function
fn -v deploy --app helloworld-app

Invoke the function
fn invoke helloworld-app test-java-function

