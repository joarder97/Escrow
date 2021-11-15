/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Escrow extends Contract {

    async createOrder(ctx, key, sellerId, buyerId, OrderDeliveryDate){

        const order = {
            Key : key,
            SellerId : sellerId,
            BuyerId : buyerId,
            OrderStatus : 'order created',
            OrderDeliveryDate : OrderDeliveryDate,
            IsOrderDeliveried : 'false',
            IsOrderCancelled : 'false',
            AgentId : 'not Selected Yet',
        };

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(order)));
        return JSON.stringify(order);
    }

    async depositBuyer(ctx, key, buyerId, sellerId, orderId, depositTransactionId, depositPaymentAmount, depositTime, fundReleaseKey) {

        const buyerDeposit = {
            Key: key,
            BuyerId: buyerId,
            SellerId: sellerId,
            OrderId: orderId,
            DepositTransactionId: depositTransactionId,
            DepositPaymentAmount: depositPaymentAmount,
            DepositTime: depositTime,
            FundReleaseKey : fundReleaseKey,
        };

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(buyerDeposit)));
        return JSON.stringify(buyerDeposit);
    }

    async depositSeller(ctx, key, sellerId, buyerId, orderId, depositTransactionId, depositPaymentAmount, depositTime){
        const sellerDeposit = {
            Key : key,
            SellerId : sellerId, 
            BuyerId : buyerId,
            OrderId : orderId, 
            DepositTransactionId : depositTransactionId,
            DepositPaymentAmount : depositPaymentAmount,
            DepositTime : depositTime,
        };

        let sellerDepositStatus = await ctx.stub.putState(key, Buffer.from(JSON.stringify(sellerDeposit)));
        
        if(sellerDepositStatus){
            await this.updateOrderStatus(ctx, orderId, "Seller Deposited, Order Confirmed");
        }
        return JSON.stringify(sellerDeposit);
    }

    async updateOrderStatus(ctx, key, newOrderStatus){

        const fileJSON = await ctx.stub.getState(key);

        if (!fileJSON || fileJSON.length === 0) {
            throw new Error(`The order ${key} does not exist`);
        }

        let status = JSON.parse(fileJSON.toString());
        status.OrderStatus = newOrderStatus;

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(status)));
        return JSON.stringify(status);
    }

    async updateOrderAgentId(ctx, key, assignedAgentId){

        const fileJSON = await ctx.stub.getState(key);

        if (!fileJSON || fileJSON.length === 0) {
            throw new Error(`The order ${key} does not exist`);
        }

        let agentId = JSON.parse(fileJSON.toString());
        agentId.AgentId = assignedAgentId;

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(agentId)));
        return JSON.stringify(agentId);
    }

    async createDeliveryAgent(ctx, key){
        const agent = {
            Key : key,
            IsAgentSelected : 'false',
        };

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(agent)));
        return JSON.stringify(agent);
    }

    async assignDeliveryAgent(ctx, key, orderId){

        let updatedAgentStatus = await this.updateOrderAgentId(ctx, orderId, key);

        if(updatedAgentStatus){
            const fileJSON = await ctx.stub.getState(key);
            if (!fileJSON || fileJSON.length === 0) {
                throw new Error('The agent does not exist');
            }
            
            let agentStatus = JSON.parse(fileJSON.toString());
            agentStatus.IsAgentSelected = 'true';

            await ctx.stub.putState(key, Buffer.from(JSON.stringify(agentStatus)));
            return JSON.stringify(agentStatus);
        }
    }

    // cancel order

    async cancelOrder(ctx, key){

        // await this.updateOrderStatus(ctx, key, "Order Cancelled");
        
        const fileJSON = await ctx.stub.getState(key);

        if (!fileJSON || fileJSON.length === 0) {
            throw new Error(`The order ${key} does not exist`);
        }

        let orderCancelStatus = JSON.parse(fileJSON.toString());
        orderCancelStatus.IsOrderCancelled = 'true';

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(orderCancelStatus)));

        return JSON.stringify(orderCancelStatus);
    }

    async getBuyersReleaseFundKey(ctx, key){
        const fileJSON = await ctx.stub.getState(key);
        if (!fileJSON || fileJSON.length === 0) {
            throw new Error(`The order ${key} does not exist`);
        }

        let releaseFund = JSON.parse(fileJSON.toString());
        let releaseFundKey = releaseFund.FundReleaseKey;

        return releaseFundKey;
    }

    async releaseFund(ctx, key, depositTransactionId, fundReleaseKey){

        let releaseKey = await this.getBuyersReleaseFundKey(ctx, depositTransactionId);

        if(releaseKey){
            if(releaseKey === fundReleaseKey){
                const fileJSON = await ctx.stub.getState(key);
    
                if (!fileJSON || fileJSON.length === 0) {
                    throw new Error('The order does not exist');
                }
                
                let currentOrderStatus = JSON.parse(fileJSON.toString());
                //call payment processing api here
                currentOrderStatus.IsOrderDeliveried = 'true';
                
                await ctx.stub.putState(key, Buffer.from(JSON.stringify(currentOrderStatus)));
                return JSON.stringify(currentOrderStatus);
            }
        }

    }

    async getOrderStatus(ctx, key){

        const fileJSON = await ctx.stub.getState(key);
        if (!fileJSON || fileJSON.length === 0) {
            throw new Error(`The order ${key} does not exist`);
        }

        let order = JSON.parse(fileJSON.toString());
        let orderStatus = order.OrderStatus;

        return JSON.stringify(orderStatus);

    }


}

// ./network.sh deployCC -c escrow -ccn escrow1 -ccp ../../escrow/chaincode/ -ccl javascript

module.exports = Escrow;