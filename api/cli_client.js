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
const org1UserId = 'app';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

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

			//create order

			// try {

			// 	let result = await contract.evaluateTransaction('createOrder', 'o1', 's1', 'b1', '7/10/2121');
			// 	await contract.submitTransaction('createOrder', 'o1', 's1', 'b1', '7/10/2121');
			// 	console.log(`\n \n Order Created:  Result  ${result} \n\n`);

			// } catch (error) {
			// 	console.log(`*** error: \n    ${error}`);
			// }

			// // Buyer deposit

			try {
				let today = new Date();
				let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
				let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
				let dateTime = date+' '+time;

				let fundReleaseKey = await generateOTP();

				let result = await contract.evaluateTransaction('depositBuyer', 'b1_o1_tx1', 'b1', 's1', 'o1', 'tx1', 50, dateTime, fundReleaseKey,);
				await contract.submitTransaction( 'depositBuyer', 'b1_o1_tx1', 'b1', 's1', 'o1', 'tx1', 50, dateTime, fundReleaseKey,);

				console.log(`Buyers deposit succesful:   Result  ${result} \n\n`);

			} catch (error) {
				console.log(`*** error: \n    ${error}`);
			}

			// seller deposit
			
			// try {
			// 	let today = new Date();
			// 	let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			// 	let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			// 	let dateTime = date+' '+time;

			// 	let result = await contract.evaluateTransaction('depositSeller','s1_o1_tx2', 's1', 'b1', 'o1', 'tx2', 50, dateTime);
			// 	await contract.submitTransaction('depositSeller','s1_o1_tx2', 's1', 'b1', 'o1', 'tx2', 50, dateTime);
				
			// 	console.log(`Sellers deposit succesful:   Result  ${result} \n\n`);

			// } catch (error) {
			// 	console.log(`*** error: \n    ${error}`);
			// }

			//update order
		
			// try {

			// 	let result = await contract.evaluateTransaction('updateOrderStatus', 'o1', 'order_shipped.');
			// 	await contract.submitTransaction('updateOrderStatus', 'o1', 'order_shipped.');

			// 	console.log(`Order Status updated:  Result  ${result} \n\n`);

			// } catch (error) {
			// 	console.log(`*** error: \n    ${error}`);
			// }

			//create delivery agent

			// try {

			// 	let result = await contract.evaluateTransaction('createDeliveryAgent', 'a1');
			// 	await contract.submitTransaction('createDeliveryAgent', 'a1');

			// 	console.log(`Agent Created:  Result  ${result} \n\n`);

			// } catch (error) {
			// 	console.log(`*** error: \n    ${error}`);
			// }

			//Assign delivery agent

			// try {

			// 	let result = await contract.evaluateTransaction('assignDeliveryAgent', 'a1', 'o1');
			// 	await contract.submitTransaction('assignDeliveryAgent', 'a1', 'o1');

			// 	console.log(`Agent Assigned:  Result  ${result} \n\n`);

			// } catch (error) {
			// 	console.log(`*** error: \n    ${error}`);
			// }

			// update order status

			// try {

			// 	let result = await contract.evaluateTransaction('updateOrderStatus', 'o1', 'order_shipped.');
			// 	await contract.submitTransaction('updateOrderStatus', 'o1', 'order_shipped.');

			// 	console.log(`Order Status updated:  Result  ${result} \n\n`);

			// } catch (error) {
			// 	console.log(`*** error: \n    ${error}`);
			// }

			// cancel order

			// try {

			// 	let result = await contract.evaluateTransaction('cancelOrder', 'o1');
			// 	await contract.submitTransaction('cancelOrder', 'o1');

			// 	console.log(`Order Status updated:  Result  ${result} \n\n`);

			// } catch (error) {
			// 	console.log(`*** error: \n    ${error}`);
			// }

			//release fund

			// try {

			// 	let result = await contract.evaluateTransaction('releaseFund', 'b1_o1_tx1', 'o1', '6886');
			// 	// await contract.submitTransaction('releaseFund', 'b1_o1_tx1', 'o1', '6886');

			// 	console.log(`Order Status updated:  Result  ${result} \n\n`);

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
