'use strict';

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../fabric-samples/test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../fabric-samples/test-application/javascript/AppUtil.js');
const { raw } = require('body-parser');

const channelName = 'escrow';
const chaincodeName = 'escrow12';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'Appuser';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

// sudo lsof -i :3000

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
			
			//create server
			const express=require('express');
			// var bodyParser = require('body-parser');
			// const cookieParser = require('cookie-parser');
			// const fileUpload = require('express-fileupload');
			const path = require('path');
			const crypto = require('crypto');
            const fs = require('fs');
			const util = require('util');
			var cors = require('cors')


			let app=express();
			const PORT=3000;

			app.use(cors(
				{
					origin:"http://localhost:3001",
					// credentials:true
				}
			))

			app.use(express.urlencoded({ extended: false }));
			app.use(express.json());
			app.use(express.static('public'));



			app.get('/',function(req,res)
			{
				res.send('Welcome To Escrow!');
			});

			app.post('/createOrder',async function(req,res)
			{
				const {key, sellerId, buyerId, orderDeliveryDate} = req.body;
				
				try {
					let result = await contract.evaluateTransaction(
						'createOrder',
						key,
						sellerId,
						buyerId,
						orderDeliveryDate
					);

					await contract.submitTransaction(	
						'createOrder',
						key,
						sellerId,
						buyerId,
						orderDeliveryDate
					);
					
					res.send(result.toString());
	
				} catch (error) {
					res.status(400).send(error.toString());
				}
			});

			async function generateOTP() {
          
				var digits = '0123456789';
				let OTP = '';
				for (let i = 0; i < 4; i++ ) {
					OTP += digits[Math.floor(Math.random() * 10)];
				}
				return OTP;
			}
			
			async function getCurrentTime() {
				let today = new Date();
				let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
				let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
				let currentTime = date+' '+time;
				return currentTime;
			}

			app.post('/depositBuyer',async function(req,res)
			{
				const {key, buyerId, sellerId, orderId, depositTransactionId, depositPaymentAmount} = req.body;

				let fundReleaseKey = await generateOTP();
				let depositTime = await getCurrentTime();

				try {
					let result = await contract.evaluateTransaction(
						'depositBuyer',
						key,
						buyerId,
						sellerId,
						orderId,
						depositTransactionId,
						depositPaymentAmount,
						depositTime,
						fundReleaseKey
						);

					await contract.submitTransaction(	
						'depositBuyer',
						key,
						buyerId,
						sellerId,
						orderId,
						depositTransactionId,
						depositPaymentAmount,
						depositTime,
						fundReleaseKey
					);
					
					res.send(result.toString());
	
				} catch (error) {
					res.status(400).send(error.toString());
				}
			});

			app.post('/depositSeller',async function(req,res){
				const {key, sellerId, buyerId, orderId, depositTransactionId, depositPaymentAmount} = req.body;

				let depositTime = await getCurrentTime();

				try {
					let result = await contract.evaluateTransaction(
						'depositSeller',
						key,
						sellerId,
						buyerId,
						orderId,
						depositTransactionId,
						depositPaymentAmount,
						depositTime
						);

					await contract.submitTransaction(	
						'depositSeller',
						key,
						sellerId,
						buyerId,
						orderId,
						depositTransactionId,
						depositPaymentAmount,
						depositTime
					);
					
					res.send(result.toString());
	
				} catch (error) {
					res.status(400).send(error.toString());
				}
			});
			
			app.post('/updateOrderStatus',async function(req,res){
				const {key, newOrderStatus} = req.body;

				try {
					let result = await contract.evaluateTransaction(
						'updateOrderStatus',
						key,
						newOrderStatus
						);

					await contract.submitTransaction(	
						'updateOrderStatus',
						key,
						newOrderStatus
					);
					
					res.send(result.toString());

				} catch (error) {
					res.status(400).send(error.toString());
				}
			});

			app.post('/createDeliveryAgent',async function(req,res){
				const {key} = req.body;

				try {
					let result = await contract.evaluateTransaction(
						'createDeliveryAgent',
						key
						);

					await contract.submitTransaction(	
						'createDeliveryAgent',
						key
					);
					
					res.send(result.toString());

				} catch (error) {
					res.status(400).send(error.toString());
				}
			});

			app.post('/assignDeliveryAgent',async function(req,res){
				const {key, orderId} = req.body;

				try {
					let result = await contract.evaluateTransaction(
						'assignDeliveryAgent',
						key,
						orderId
						);

					await contract.submitTransaction(	
						'assignDeliveryAgent',
						key,
						orderId
					);
					
					res.send(result.toString());

				} catch (error) {
					res.status(400).send(error.toString());
				}
			});

			app.post('/cancelOrder',async function(req,res){
				const {key, orderId} = req.body;

				try {
					let result = await contract.evaluateTransaction(
						'cancelOrder',
						key
						);

					await contract.submitTransaction(	
						'cancelOrder',
						key
					);
					
					res.send(result.toString());

				} catch (error) {
					res.status(400).send(error.toString());
				}
			});

			app.post('/releaseFund',async function(req,res){
				const {key, depositTransactionId, fundReleaseKey} = req.body;

				console.log(key,depositTransactionId,fundReleaseKey);

				try {
					let result = await contract.evaluateTransaction(
						'releaseFund',
						key,
						depositTransactionId,
						fundReleaseKey
						);

					await contract.submitTransaction(	
						'releaseFund',
						key,
						depositTransactionId,
						fundReleaseKey
					);
					

					res.send(result.toString());

				} catch (error) {
					res.status(400).send(error.toString());
				}
			});

			app.post('/getOrderStatus',async function(req,res){
				const {key} = req.body;

				try {
					let result = await contract.evaluateTransaction(
						'getOrderStatus',
						key
						);

					await contract.submitTransaction(	
						'getOrderStatus',
						key
					);
					
					res.send(result.toString());

				} catch (error) {
					res.status(400).send(error.toString());
				}
			});

			app.post('/getBuyersReleaseFundKey',async function(req,res){
				const {buyerDepositId} = req.body;

				try {
					let result = await contract.evaluateTransaction(
						'getBuyersReleaseFundKey',
						buyerDepositId
						);

					await contract.submitTransaction(	
						'getBuyersReleaseFundKey',
						buyerDepositId
					);
					
					res.send(result.toString());

				} catch (error) {
					res.status(400).send(error.toString());
				}
			});

			var server=app.listen(3000,function() {
			console.log(`server listening on Port: ${PORT}`);
		});


	} finally {

	}
			
		// gateway.disconnect();
		
 	}catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}
}

main();
