/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../fabric-samples/test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../fabric-samples/test-application/javascript/AppUtil.js');

const channelName = 'escrow';
const chaincodeName = 'escrow';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

// pre-requisites:
// - fabric-sample two organization test-network setup with two peers, ordering service,
//   and 2 certificate authorities
//         ===> from directory /fabric-samples/test-network
//         ./network.sh up createChannel -ca
// - Use any of the asset-transfer-basic chaincodes deployed on the channel "mychannel"
//   with the chaincode name of "basic". The following deploy command will package,
//   install, approve, and commit the javascript chaincode, all the actions it takes
//   to deploy a chaincode to a channel.
//         ===> from directory /fabric-samples/test-network
//         ./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript/ -ccl javascript
// - Be sure that node.js is installed
//         ===> from directory /fabric-samples/asset-transfer-basic/application-javascript
//         node -v
// - npm installed code dependencies
//         ===> from directory /fabric-samples/asset-transfer-basic/application-javascript
//         npm install
// - to run this test application
//         ===> from directory /fabric-samples/asset-transfer-basic/application-javascript
//         node app.js

// NOTE: If you see  kind an error like these:
/*
    2020-08-07T20:23:17.590Z - error: [DiscoveryService]: send[mychannel] - Channel:mychannel received discovery error:access denied
    ******** FAILED to run the application: Error: DiscoveryService: mychannel error: access denied

   OR

   Failed to register user : Error: fabric-ca request register failed with errors [[ { code: 20, message: 'Authentication failure' } ]]
   ******** FAILED to run the application: Error: Identity not found in wallet: appUser
*/
// Delete the /fabric-samples/asset-transfer-basic/application-javascript/wallet directory
// and retry this application.
//
// The certificate authority must have been restarted and the saved certificates for the
// admin and application user are not valid. Deleting the wallet store will force these to be reset
// with the new certificate authority.
//

/**
 *  A test application to show basic queries operations with any of the asset-transfer-basic chaincodes
 *   -- How to submit a transaction
 *   -- How to query and check the results
 *
 * To see the SDK workings, try setting the logging to show on the console before running
 *        export HFC_LOGGING='{"debug":"console"}'
 */

 async function generateOTP() {
          
	var digits = '0123456789';
	let OTP = '';
	for (let i = 0; i < 4; i++ ) {
		OTP += digits[Math.floor(Math.random() * 10)];
	}
	return OTP;
}

 async function main() {
	try {
		
		const ccp = buildCCPOrg1();

	
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

		
		const wallet = await buildWallet(Wallets, walletPath);

		
		await enrollAdmin(caClient, wallet, mspOrg1);

	
		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

		
		const gateway = new Gateway();

		try {
		
			await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true } 
			});

			
			const network = await gateway.getNetwork(channelName);

			
			const contract = network.getContract(chaincodeName);


			try {
				let today = new Date();
				let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
				let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
				let dateTime = date+' '+time;

				let fundReleaseKey = await generateOTP();

				let result = await contract.evaluateTransaction(
					'depositBuyer',
					'b1_o1_tx1',
					'b1',
					's1',
					'o1',
					'tx1',
					'50',
					dateTime,
					'1',
					'7/09/2021',
					'false',
					fundReleaseKey,
				);

				// await contract.submitTransaction(
				// 	'depositBuyer',
				// 	'buyer_tx1',
				// 	'b1',
				// 	's1',
				// 	'o1',
				// 	'tx1',
				// 	'50',
				// 	dateTime,
				// 	true,
				// 	'7/09/2021',
				// 	false
				// );
				console.log(`Buyers deposit succesful:   Result  ${result} \n\n`);

			} catch (error) {
				console.log(`*** error: \n    ${error}`);
			}

			// try {
			// 	let today = new Date();
			// 	let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			// 	let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			// 	let dateTime = date+' '+time;

			// 	let result = await contract.evaluateTransaction('depositSeller','seller_tx1', 's1', 'b1', 'o1', 'tx2', '50', dateTime);
			// 	await contract.submitTransaction('depositSeller','seller_tx1', 's1', 'b1', 'o1', 'tx2', '50', dateTime);
			// 	console.log(`Sellers deposit succesful:   Result  ${result} \n\n`);

			// } catch (error) {
			// 	console.log(`*** error: \n    ${error}`);
			// }

		} finally {
			
			gateway.disconnect();
		}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}
}



main();
