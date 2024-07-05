import assemble from "./assemble/assembler.js";

/**
 * Pass the data to send as event.data, and the request options as
 * event.options. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */


export const handler = (event, context, callback) => {
    const options = {
        ...event.options,
        method: 'GET',
        // Include other options like headers if needed
    };
    assemble('portal', options)
};


//const options = {};
//assemble('portal', options)
//assemble('homepage', options)