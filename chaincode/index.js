/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const escrow = require('./lib/escrow');

module.exports.Escrow = escrow;
module.exports.contracts = [escrow];
