/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Escrow extends Contract {

    async createOrder(ctx,key, sellerId, buyerId, orderStatus, orderCancelAvailableWithin){

        const order = {
            Key : key,
            SellerId : sellerId,
            BuyerId : buyerId,
            OrderStatus : orderStatus,
            OrderCancelAvailableWithin: orderCancelAvailableWithin,
        };

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(order)));
        return JSON.stringify(order);
    }

    async depositBuyer(ctx, key, buyerId, sellerId, orderId, depositTransactionId, depositPaymentAmount, depositTime, deliveryDate, fundReleaseKey) {


        const buyer = {
            Key: key,
            BuyerId: buyerId,
            SellerId: sellerId,
            orderId: orderId,
            DepositTransactionId: depositTransactionId,
            DepositPaymentAmount: depositPaymentAmount,
            DepositTime: depositTime,
            DeliveryDate: deliveryDate,
            FundReleaseKey : fundReleaseKey,
        };


        await ctx.stub.putState(key, Buffer.from(JSON.stringify(buyer)));
        return JSON.stringify(buyer);
    }

    async depositSeller(ctx, key, sellerId, buyerId, orderId, depositTransactionId, depositPaymentAmount, depositTime){
        const seller = {
            Key : key,
            SellerId : sellerId, 
            BuyerId : buyerId,
            OrderId : orderId, 
            DepositTransactionId : depositTransactionId,
            DepositPaymentAmount : depositPaymentAmount,
            DepositTime : depositTime,
        };

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(seller)));
        return JSON.stringify(seller);
    }

    async updateOrderStatus(ctx, key, newOrderStatus){

        const fileJSON = await ctx.stub.getState(key);

        if (!fileJSON || fileJSON.length === 0) {
            throw new Error('The order does not exist');
        }

        let status = JSON.parse(fileJSON.toString());
        status.OrderStatus = newOrderStatus;

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(status)));
        return JSON.stringify(status);
    }

    async createDeliveryAgent(ctx, key){
        const agent = {
            Key : key,
            IsAgentSelected : 'false',
        };

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(agent)));
        return JSON.stringify(agent);
    }
    /////////////////////////
    async assignDeliveryAgent(ctx, key, orderId){
        const assignAgent = {
            Key : key,
            OrderId : orderId,
        };


        const fileJSON = await ctx.stub.getState(key);
        

        if (!fileJSON || fileJSON.length === 0) {
            throw new Error('The agent does not exist');
        }

        let status = JSON.parse(fileJSON.toString());
        let isAgentSelected = 'true';
        status.IsAgentSelected = isAgentSelected;

        const fileJSON2 = await ctx.stub.getState(orderId);
        let orderStatus = `Product handed to delivery ageny ${key}`;
        status.OrderStatus = orderStatus;

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(assignAgent)));
        return JSON.stringify(assignAgent);
    }


}

// ./network.sh deployCC -c escrow -ccn escrow1 -ccp ../../escrow/chaincode/ -ccl javascript

module.exports = Escrow;
