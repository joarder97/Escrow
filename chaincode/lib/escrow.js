/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Escrow extends Contract {

    async depositBuyer(ctx, key, buyerId, sellerId, orderId, depositTransactionId, depositPaymentAmount, depositTime, orderCancelAvailableWithin, deliveryDate, productStatus, fundReleaseKey) {


        const buyer = {
            Key: key,
            BuyerId: buyerId,
            SellerId: sellerId,
            orderId: orderId,
            DepositTransactionId: depositTransactionId,
            DepositPaymentAmount: depositPaymentAmount,
            DepositTime: depositTime,
            OrderCancelAvailableWithin: orderCancelAvailableWithin,
            DeliveryDate: deliveryDate,
            ProductStatus: productStatus,
            FundReleaseKey : fundReleaseKey,
        };


        await ctx.stub.putState(key, Buffer.from(JSON.stringify(buyer)));
        return JSON.stringify(buyer);
    }

    async depositSeller(ctx, key, sellerId, buyerId, orderId, depositTransactionId, depositPaymentAmount, depositTime, productStatus){
        const seller = {
            Key : key,
            SellerId : sellerId, 
            BuyerId : buyerId,
            OrderId : orderId, 
            DepositTransactionId : depositTransactionId,
            DepositPaymentAmount : depositPaymentAmount,
            DepositTime : depositTime,
            ProductStatus : productStatus,
        };

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(seller)));
        return JSON.stringify(seller);
    }

    async updateProductStatus(ctx, key, newProductStatus){

        const fileJSON = await ctx.stub.getState(key);

        if (!fileJSON || fileJSON.length === 0) {
            throw new Error('The order does not exist');
        }

        let status = JSON.parse(fileJSON.toString());
        status.ProductStatus = newProductStatus;


        await ctx.stub.putState(key, Buffer.from(JSON.stringify(status)));
        return JSON.stringify(status);


    }



}

// ./network.sh deployCC -c escrow -ccn escrow1 -ccp ../../escrow/chaincode/ -ccl javascript

module.exports = Escrow;
