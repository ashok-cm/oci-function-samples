import io
import json
import logging
import io
import json
import oci

from fdk import response


def handler(ctx, data: io.BytesIO = None):
    signer = oci.auth.signers.get_resource_principals_signer()
    compute_client = oci.core.ComputeClient(config={}, signer=signer)
    resp = instance_stop(compute_client, "ocid1.instance.oc1.ap-hyderabad-1.anuhsljrk56z2vqcr3p5yvo7xmudr5zbvifganlc2zuoz5khrcbg3ru7leaa")
    return response.Response(
        ctx, 
        response_data=json.dumps({"status": "{0}".format(resp)}),
        headers={"Content-Type": "application/json"}
    )

def instance_stop(compute_client, instance_id):
    print('Stopping Instance: {}'.format(instance_id))
    try:
        if instance_status(compute_client, instance_id) in 'RUNNING':
            try:
                resp = compute_client.instance_action(instance_id, 'SOFTSTOP')
                print('Stop response code: {0}'.format(resp.status))
            except oci.exceptions.ServiceError as e:
                print('Stopping instance failed. {0}' .format(e))
                raise
        else:
            print('The instance is not in RUNNING state.' .format(instance_id))
    except oci.exceptions.ServiceError as e:
        print('Stopping instance failed. {0}'.format(e))
        raise
    return instance_status(compute_client, instance_id)

def instance_status(compute_client, instance_id):
    return compute_client.get_instance(instance_id).data.lifecycle_state
