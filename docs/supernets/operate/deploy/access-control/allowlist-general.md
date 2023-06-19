---
id: supernets-allowlist-add-remove
title: How to Add & Remove Accounts from an ACL
sidebar_label: How to Add & Remove Accounts
description: "Learn how to allowlist addresses on a Supernet."
keywords:
  - docs
  - polygon
  - allowlist
  - allow
  - access
  - access control
  - block
  - blocklist
---

## Understanding ACL and Address Roles

ACLs or Access Control Lists are a way of managing permissions in your Supernet. In this context, an ACL is essentially a list of addresses and their corresponding roles.

### Roles can be one of three types:

- `NoRole`: The address has no permissions.
- `EnabledRole`: The address has some permissions.
- `AdminRole`: The address has all permissions and can change the roles of other addresses.

**For more information about how ACLs work in Supernets, check out the overview guide [<ins>here</ins>](/docs/supernets/design/runtime/allowlist.md).**

:::info Keep in mind

- **Enabling Lists**: Allowlists and blocklists are enabled or disabled exclusively during network initialization through the genesis command. Changes to the configuration cannot be made dynamically.
- **Admin Role**: To enable a list, an admin role must be set in the genesis command. The admin manages the list and can only be specified during the network's initial setup.
- **Exclusive Enablement**: It is not valid to enable both allowlists and blocklists for a given list type. If both lists are set, the allowlist takes precedence, and the blocklist is ignored.
- **System Transaction Address**: The system transaction address (0xffffFFFfFFffffffffffffffFfFFFfffFFFfFFfE) is excluded from allowlist and blocklist validation. It is always allowed to perform actions and is not subject to list checks.
- **Impact on Validators and System Transactions**: The impact of allowlists and blocklists on validators and system transactions can vary depending on network implementation.

:::

## Interacting with an ACL

Supernets' ACLs are implemented as precompiles, which are built-in contracts within the Edge client. You can interact with these ACL precompiles using libraries like ether.js and web3.js.

To interact with the ACL precompiles using an external library or client, follow these steps:

1. Obtain the ABI (Application Binary Interface) for the specific ACL precompile you want to interact with. The ABI contains the definitions of the precompile's functions, including their parameters and return types.

2. Create a contract instance for the ACL precompile using the ABI and the provider connected to the Supernet.

3. Use the contract instance to call the functions defined in the precompile's ABI. These functions allow you to manage the ACL by adding or removing accounts, modifying roles, or performing other ACL-related operations.

## Example Interaction with ethers.js

### Prerequisites

- Install ethers.js in your project using npm or yarn: `npm i --save ethers`.
- Ensure you have a wallet and some gas for transaction fees.
- Obtain the address and ABI of the ACL smart contract you want to interact with.

:::note

- These operations should be performed by an account with the `AdminRole`.
- Make sure to replace the placeholders with your actual values.
- The await keyword must be used in an async function.
- Be mindful of transaction fees (gas costs) when interacting with the network.

:::

### Sample workflow

Create a contract instance for the ACL precompile using the ABI and the provider connected to the network.
Please note that these examples are provided as guidance and assume the usage of ether.js, with Alice and Bob used as placeholders for specific agents.

```javascript
const ethers = require('ethers');

// Connect to the provider (e.g., local node, Infura, Alchemy, etc.)
const provider = new ethers.providers.JsonRpcProvider('https://rpc-endpoint.io');

// Contract Deployer ACL
const contractDeployerAddress = '0xContractDeployerAddress';
const contractDeployerABI = [{...}]; // Replace with the ABI of the Contract Deployer precompile
const contractDeployer = new ethers.Contract(contractDeployerAddress, contractDeployerABI, provider);

// Transactions ACL
const transactionsACLAddress = '0xTransactionsACLAddress';
const transactionsACLABI = [{...}]; // Replace with the ABI of the Transactions precompile
const transactionsACL = new ethers.Contract(transactionsACLAddress, transactionsACLABI, provider);

// Bridge ACL
const bridgeACLAddress = '0xBridgeACLAddress';
const bridgeACLABI = [{...}]; // Replace with the ABI of the Bridge precompile
const bridgeACL = new ethers.Contract(bridgeACLAddress, bridgeACLABI, provider);
```

#### Interact with the ContractDeployer ACL

```javascript
// Example interaction with the Contract Deployer ACL

const addrAlice = '0xAliceAddress'; // Replace with Alice's address
const addrBob = '0xBobAddress'; // Replace with Bob's address

// Add Alice's address to the contract deployer allowlist
const allowlistContractDeployerTx1 = contractDeployer.AllowlistContractDeployer(addrAlice, true);
allowlistContractDeployerTx1.wait();

// Remove Alice's address from the contract deployer allowlist
const allowlistContractDeployerTx2 = contractDeployer.AllowlistContractDeployer(addrAlice, false);
allowlistContractDeployerTx2.wait();

// Add Bob's address to the contract deployer allowlist
const allowlistContractDeployerTx3 = contractDeployer.AllowlistContractDeployer(addrBob, true);
allowlistContractDeployerTx3.wait();

// Remove Bob's address from the contract deployer allowlist
const allowlistContractDeployerTx4 = contractDeployer.AllowlistContractDeployer(addrBob, false);
allowlistContractDeployerTx4.wait();
```

#### Interact with Transactions ACL

```javascript
// Add Bob's address to the transaction allowlist
const allowlistTxTx1 = transactionsACL.AllowlistTx(addrBob, true);
allowlistTxTx1.wait();

// Remove Bob's address from the transaction allowlist
const allowlistTxTx2 = transactionsACL.AllowlistTx(addrBob, false);
allowlistTxTx2.wait();

// Add Alice's address to the transaction blocklist
const blocklistTxTx1 = transactionsACL.BlocklistTx(addrAlice, true);
blocklistTxTx1.wait();

// Remove Alice's address from the transaction blocklist
const blocklistTxTx2 = transactionsACL.BlocklistTx(addrAlice, false);
blocklistTxTx2.wait();
```

#### Interact with the Bridge ACL

```javascript
// Add Alice's address to the bridge allowlist
const allowlistBridgeTx1 = bridgeACL.AllowlistBridge(addrAlice, true);
allowlistBridgeTx1.wait();

// Remove Alice's address from the bridge allowlist
const allowlistBridgeTx2 = bridgeACL.AllowlistBridge(addrAlice, false);
allowlistBridgeTx2.wait();

// Add Alice's address to the bridge blocklist
const blocklistBridgeTx1 = bridgeACL.BlocklistBridge(addrAlice, true);
blocklistBridgeTx1.wait();

// Remove Alice's address from the bridge blocklist
const blocklistBridgeTx2 = bridgeACL.BlocklistBridge(addrAlice, false);
blocklistBridgeTx2.wait();
```
