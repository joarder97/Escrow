/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Escrow extends Contract {

    async depositBuyer(ctx, key, buyerId, sellerId, orderId, depositTransactionId, depositPaymentAmount, depositTime, orderCancelAvailableWithin, deliveryDate, isSellerDeposited, fundReleaseKey) {


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
            IsSellerDeposited: isSellerDeposited,
            FundReleaseKey : fundReleaseKey,
        };


        await ctx.stub.putState(key, Buffer.from(JSON.stringify(buyer)));
        return JSON.stringify(buyer);
    }

    async depositSeller(ctx, key, sellerId, buyerId, orderId, depositTransactionId, depositPaymentAmount, depositTime, isSellerDeposited){
        const seller = {
            Key : key,
            SellerId : sellerId, 
            BuyerId : buyerId,
            OrderId : orderId, 
            DepositTransactionId : depositTransactionId,
            DepositPaymentAmount : depositPaymentAmount,
            DepositTime : depositTime,
            IsSellerDeposited : isSellerDeposited,
        };

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(seller)));
        return JSON.stringify(seller);
    }



}

module.exports = Escrow;
