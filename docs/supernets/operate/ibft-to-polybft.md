---
id: supernets-ibft-to-polybft
title: State Trie Migration and Regenesis to PolyBFT
sidebar_label: Migrate from Edge PoA
description: "Transition to a New Blockchain with PolyBFT Consensus from a Blockchain using IBFT Consensus with Edge PoA."
keywords:
  - docs
  - Polygon
  - edge
  - supernets
  - childchain
  - network
  - modular
---

## Transitioning to a New Blockchain with PolyBFT Consensus from a Blockchain using IBFT Consensus with Edge PoA

In this guide, you'll discover how to migrate from an existing IBFT consensus chain on the former Edge client to a new PolyBFT consensus-based chain.

:::warning Breaking changes
Supernets are rapidly evolving towards a production-ready state, and, as a result, instructions and concepts in these guides are subject to change.

Test releases include breaking changes and are not backward compatibility. Use the current test releases for testing and familiarization only.

It is highly recommended that reach out to the Supernets team for support.
:::

:::caution This is not an upgrade

The regenesis process is not intended as an upgrade to another version of the consensus client but rather as a transformation to a distinct product suite designed for next-generation, application-specific chains (appchains) with cross-chain compatibility and staking requirements. If you are unfamiliar or uncertain about this, please refer to the [<ins>introductory material</ins>](/docs/supernets/get-started/what-are-supernets.md) and [<ins>system design documentation</ins>](/docs/supernets/design/overview.md). For further assistance, please reach out to the Supernets team.
:::

:::info Compatibility
The regenesis process has ONLY been tested for version(s) 0.6.x and not with earlier versions of the former Edge client. The team is actively working on testing compatibility with older versions. For assistance, please reach out to the Supernets team.

In general, it is recommended that you operate on the latest version of the old client. The latest version of the former Edge consensus client is [<ins>v0.6.3</ins>](https://github.com/0xPolygon/polygon-edge/releases/tag/v0.6.3).
To upgrade Edge, please refer to the archived Edge documentation, available **[<ins>here</ins>](https://github.com/maticnetwork/matic-docs/tree/master/archive/edge/main-edge)**.

:::

## Overview

The regenesis process focuses on the migration of the state trie, also known as the state tree, from an existing chain to a new chain. The state trie is a Merkle Patricia trie that maintains the entire state of the blockchain, including account balances, contract storage, and other relevant data. Regenesis also involves processing block headers and validating state roots to ensure the correctness and consistency of the migrated state trie. However, regenesis does not involve the migration of transaction history, as it is specifically concerned with state trie migration and block header validation.

## What you'll learn

In this guide, you'll gain an understanding of the following concepts:

- Migrating from an existing IBFT consensus chain to a new chain using the PolyBFT consensus algorithm.
- Generating a trie snapshot, setting up new validators, and creating the chain configuration for the new chain.
- Launching a new PolyBFT chain and ensuring the successful transfer of the snapshot trie to each validator node.

## What you'll do

- **State Trie Migration**: The process starts with obtaining the trie root of the existing chain. A snapshot of the trie is created using this root, which will be utilized in the new chain.

- **Chain Setup**: The old chain data is removed, and new validators are created for the new chain. Manifest and genesis files are generated for the new chain, using the trie root from the snapshot.

- **Starting the New Chain**: The new PolyBFT chain is started, and the snapshot trie is copied to each validator node's data directory. This process ensures that the new chain's state is consistent with the old chain's state.

- **Resuming the Chain**: The new chain is restarted, and the validator nodes continue to seal new blocks. The state trie from the previous chain has been successfully migrated, allowing the new chain to maintain the same account balances, contract storage, and other state data.

- **Verification**: After the regenesis process is complete, you can verify the success of the migration by checking the account balances on the new chain. If the account balance is non-zero and matches the previous chain's state, the snapshot import was successful.

Before beginning the regenesis process, there are some prerequisites that must be fulfilled.

## Prerequisites

- Set up a local IBFT consensus cluster for development purposes.

  A dedicated script is provided as part of the client to facilitate the cluster setup, encompassing key generation, network configuration, data directory creation, and genesis block generation. To create an IBFT cluster, execute the following command:

  ```bash
  scripts/cluster ibft
  ```

- Ensure that the accounts have sufficient funds.

  Before performing the regenesis, it's essential to ensure that the accounts have sufficient funds. You can check the balance using the following command:

  ```bash
  curl -s -X POST --data '{"jsonrpc":"2.0", "method":"eth_getBalance", "params":["0x85da99c8a7c2c95964c8efd687e95e632fc533d6", "latest"], "id":1}' http://localhost:10002
  ```

  :::caution Don't use the develop branch for deployments

  Please ensure that you are not running on the `develop` branch, which is the active development branch and include changes that are still being tested and not compatible with the current process.

  Instead, use the [<ins>latest release</ins>](/docs/supernets/operate/install.md) for deployments.

  :::

## Regenesis

The regenesis process involves several steps, which are outlined below:

1. **Get trie root**: Obtain the trie root of the existing chain, which is required to create a snapshot of the state trie.

  ```bash
  ./polygon-edge regenesis getroot --rpc "http://localhost:10002"
  ```

   > `10002` is the port number that is specified for the HTTP-RPC server in the configuration file for the polygon-edge node. It is the default port number used by the polygon-edge client for the HTTP-RPC server.

1. **Create trie snapshot**: Create a snapshot of the state trie using the trie root. This snapshot contains the state data, including account balances and contract storage. The `stateRoot` is the root hash of the Merkle trie data structure that represents the current state of the blockchain at a given block height. It can be obtained by querying the blockchain node through its JSON-RPC API.

  ```bash
  ./polygon-edge regenesis \
  --target-path ./trie_new \
  --stateRoot 0xf5ef1a28c82226effb90f4465180ec3469226747818579673f4be929f1cd8663 \
  --source-path ./test-chain-1/trie
  ```

1. **Remove old chain data**: Delete the data of the old chain in preparation for setting up the new chain.

  ```bash
  rm -rf test-chain-*
  ```

1. **Create new validators**: Generate new validators for the new chain, ensuring that the chain operates with a fresh set of validator nodes.

   > Please note that the `--insecure` flag used in the command is for testing purposes only and should not be used in production environments. Instead, secure methods should be used to store and pass secrets.

  ```bash
  ./polygon-edge polybft-secrets --insecure --data-dir test-chain- --num 4
  ```

1. **Generate the manifest file**: Produce the manifest file for the new chain, which is used to configure and manage the new chain's settings and components. You can also pass additional parameters to customize the configuration (use `--help` to view options).

   <details>
   <summary>Flags ↓</summary>

   | Flag                          | Description                                                                                              |
   |-------------------------------|----------------------------------------------------------------------------------------------------------|
   | `--chain-id int`              | The ID of the chain (default 100)                                                                        |
   | `-h, --help`                  | Help for manifest                                                                                        |
   | `--path string`               | The file path where the manifest file is going to be stored (default "./manifest.json")                 |
   | `--premine-validators stringArray` | The premined validators and balances (format: `<address>[:<balance>]`). Default premined balance: 1000000000000000000000000 |
   | `--stake stringArray`         | Validators staked amount (format: `<address>[:<amount>]`). Default stake amount: 1000000000000000000000000 |
   | `--validators stringArray`    | Validators defined by user (format: `<P2P multi address>:<ECDSA address>:<public BLS key>:<BLS signature>`) |
   | `--validators-path string`    | Root path containing PolyBFT validator keys (default "./")                                              |
   | `--validators-prefix string`  | Folder prefix names for PolyBFT validator keys (default "test-chain-")                                  |

   **Global Flags:**

   | Flag                          | Description                                                                                              |
   |-------------------------------|----------------------------------------------------------------------------------------------------------|
   | `--json`                      | Get all outputs in JSON format (default false)                                                           |

   </details>

   > It's also important to ensure that secrets are passed correctly when generating the app-chain configuration, especially when running validators across different systems.

  <details>
  <summary>Assemble bootnodes if validator information is scaffolded on multiple hosts</summary>

   To ensure successful connectivity, each node must know which bootnode server to connect to obtain information about all the remaining nodes on the network. In this example, we'll designate the first and second nodes as bootnodes for all other nodes.

   To specify the bootnode, you need to conform to the multiaddr format: /ip4/[ip_address]/tcp[port]/p2p/[node_id]. For the IP address, we'll use 127.0.0.1 since we're running on localhost. If you're not running on localhost, please update the IP address accordingly. We'll use `30301` for the first node and `30302` for the second node as the ports, which we'll configure the libp2p server to listen on later.

   We'll use the Node ID of the first node for the first bootnode and the Node ID of the second node for the second bootnode. After the assembly, the multiaddr connection string for node 1, which we'll use as the bootnode, will look like this: `/ip4/127.0.0.1/tcp/30301/p2p/16Uiu2HAmJxxH1tScDX2rLGSU9exnuvZKNM9SoK3v315azp68DLPW`. For node 2, the multiaddr connection string will look like this: `/ip4/127.0.0.1/tcp/30302/p2p/16Uiu2HAmS9Nq4QAaEiogE4ieJFUYsoH28magT7wSvJPpfUGBj3Hq`.

   Example of manifest generation:
   ```bash
    ./polygon-edge manifest \
      --validators /ip4/127.0.0.1/tcp/30301/p2p/16Uiu2HAmJxxH1tScDX2rLGSU9exnuvZKNM9SoK3v315azp68DLPW:0xDcBe0024206ec42b0Ef4214Ac7B71aeae1A11af0:1cf134e02c6b2afb2ceda50bf2c9a01da367ac48f7783ee6c55444e1cab418ec0f52837b90a4d8cf944814073fc6f2bd96f35366a3846a8393e3cb0b19197cde23e2b40c6401fa27ff7d0c36779d9d097d1393cab6fc1d332f92fb3df850b78703b2989d567d1344e219f0667a1863f52f7663092276770cf513f9704b5351c4:11b18bde524f4b02258a8d196b687f8d8e9490d536718666dc7babca14eccb631c238fb79aa2b44a5a4dceccad2dd797f537008dda185d952226a814c1acf7c2 \
      --validators /ip4/127.0.0.1/tcp/30302/p2p/16Uiu2HAmS9Nq4QAaEiogE4ieJFUYsoH28magT7wSvJPpfUGBj3Hq:0x2da750eD4AE1D5A7F7c996Faec592F3d44060e90:088d92c25b5f278750534e8a902da604a1aa39b524b4511f5f47c3a386374ca3031b667beb424faef068a01cee3428a1bc8c1c8bab826f30a1ee03fbe90cb5f01abcf4abd7af3bbe83eaed6f82179b9cbdc417aad65d919b802d91c2e1aaefec27ba747158bc18a0556e39bfc9175c099dd77517a85731894bbea3d191a622bc:08dc3006352fdc01b331907fd3a68d4d68ed40329032598c1c0faa260421d66720965ace3ba29c6d6608ec1facdbf4624bca72df36c34afd4bdd753c4dfe049c \
      --path ./manifest.json \
  ```
   </details>

  ```bash
  ./polygon-edge manifest
  ```

1. **Generate the genesis file**: Generate the genesis file for the new chain, using the trie root from the snapshot. This file is essential for starting the new chain with the migrated state data. The values provided are default and placeholders; you can view other available options with the `--help` flag.

  <details>
   <summary>Flags ↓</summary>

   | Flag                                              | Description                                                                                              |
   |---------------------------------------------------|----------------------------------------------------------------------------------------------------------|
   | `--block-gas-limit uint`                          | The maximum amount of gas used by all transactions in a block (default 5242880)                          |
   | `--block-time duration`                           | The predefined period which determines block creation frequency (default 2s)                             |
   | `--bootnode stringArray`                          | MultiAddr URL for P2P discovery bootstrap. This flag can be used multiple times                          |
   | `--bridge-json-rpc string`                        | The rootchain JSON RPC endpoint                                                                          |
   | `--chain-id uint`                                 | The ID of the chain (default 100)                                                                        |
   | `--consensus string`                              | The consensus protocol to be used (default "polybft")                                                    |
   | `--contract-deployer-allow-list-admin stringArray` | List of addresses to use as admin accounts in the contract deployer allow list                          |
   | `--contract-deployer-allow-list-enabled stringArray` | List of addresses to enable by default in the contract deployer allow list                            |
   | `--dir string`                                    | The directory for the Polygon Edge genesis data (default "./genesis.json")                               |
   | `--epoch-reward uint`                             | Reward size for block sealing (default 1)                                                                |
   | `--epoch-size uint`                               | The epoch size for the chain (default 100000)                                                            |
   | `--grpc-address string`                           | The GRPC interface (default "127.0.0.1:9632")                                                            |
   | `-h, --help`                                      | Help for genesis                                                                                         |
   | `--ibft-validator stringArray`                    | Addresses to be used as IBFT validators, can be used multiple times. Needs to be present if ibft-validators-prefix-path is omitted |
   | `--ibft-validator-type string`                    | The type of validators in IBFT (default "bls")                                                           |
   | `--ibft-validators-prefix-path string`            | Prefix path for validator folder directory. Needs to be present if ibft-validator is omitted             |
   | `--manifest string`                               | The manifest file path, which contains genesis metadata (default "./manifest.json")                      |
   | `--max-validator-count uint`                      | The maximum number of validators in the validator set for PoS (default 9007199254740990)                 |
   | `--min-validator-count uint`                      | The minimum number of validators in the validator set for PoS (default 1)                                |
   | `--mintable-native-token`                         | Flag indicating whether mintable or non-mintable native ERC20 token is deployed                          |
   | `--name string`                                   | The name for the chain (default "polygon-edge")                                                          |
   | `--pos`                                           | The flag indicating that the client should use Proof of Stake IBFT. Defaults to Proof of Authority if flag is not provided or false |
   | `--premine stringArray`                           | The premined accounts and balances (format: [address]:[balance]). Default premined balance: 1000000000000000000000000 |
   | `--sprint-size uint`                              | The number of block included into a sprint (default 5)                                                   |
   | `--tracker-start-blocks stringArray`              | Event tracker starting block configuration, which is specified per contract address (format: [contract address]:[start block]) |
   | `--trieroot string`                               | Trie root from the corresponding triedb                                                                  |
   | `--validator-set-size int`                        | The total number of validators (default 100)                                                             |

   **Global Flags:**

   | Flag                          | Description                                                                                              |
   |-------------------------------|----------------------------------------------------------------------------------------------------------|
   | `--json`                      | Get all outputs in JSON format (default false)                                                           |

   </details>

  ```bash
  ./polygon-edge genesis --consensus polybft --bridge-json-rpc http://127.0.0.1:8545 \
  --block-gas-limit 10000000 \
  --epoch-size 10 --trieroot 0xf5ef1a28c82226effb90f4465180ec3469226747818579673f4be929f1cd8663
  ```

1. **Start a new PolyBFT chain**: Launch the new PolyBFT chain with the copied snapshot trie, ensuring that the new chain's state is consistent with the old chain's state.

  ```bash
  ./polygon-edge server --data-dir ./test-chain-1 --chain genesis.json --grpc-address :10000 --libp2p :30301 --jsonrpc :10002 --seal --log-level DEBUG &
  ./polygon-edge server --data-dir ./test-chain-2 --chain genesis.json --grpc-address :20000 --libp2p :30302 --jsonrpc :20002 --seal --log-level DEBUG &
  ./polygon-edge server --data-dir ./test-chain-3 --chain genesis.json --grpc-address :30000 --libp2p :30303 --jsonrpc :30002 --seal --log-level DEBUG &
  ./polygon-edge server --data-dir ./test-chain-4 --chain genesis.json --grpc-address :40000 --libp2p :30304 --jsonrpc :40002 --seal --log-level DEBUG &
  ```

1. **Copy the snapshot trie to the data directory**: Copy the snapshot trie to the data directories of each validator node, allowing the new chain to maintain the same account balances, contract storage, and other state data.

  ```bash
  rm -rf ./test-chain-1/trie
  rm -rf ./test-chain-2/trie
  rm -rf ./test-chain-3/trie
  rm -rf ./test-chain-4/trie
  cp -fR ./trie_new/ ./test-chain-1/trie/
  cp -fR ./trie_new/ ./test-chain-2/trie/
  cp -fR ./trie_new/ ./test-chain-3/trie/
  cp -fR ./trie_new/ ./test-chain-4/trie/
  ```

1.  **Re-run the chain**: Restart the new chain, and the validator nodes will continue to seal new blocks. The state trie from the previous chain has been successfully migrated.

  ```bash
  ./polygon-edge server --data-dir ./test-chain-1 --chain genesis.json --grpc-address :10000 --libp2p :30301 --jsonrpc :10002 --seal --log-level DEBUG &
  ./polygon-edge server --data-dir ./test-chain-2 --chain genesis.json --grpc-address :20000 --libp2p :30302 --jsonrpc :20002 --seal --log-level DEBUG &
  ./polygon-edge server --data-dir ./test-chain-3 --chain genesis.json --grpc-address :30000 --libp2p :30303 --jsonrpc :30002 --seal --log-level DEBUG &
  ./polygon-edge server --data-dir ./test-chain-4 --chain genesis.json --grpc-address :40000 --libp2p :30304 --jsonrpc :40002 --seal --log-level DEBUG &
  ```

1. **Check account balance on the new PolyBFT chain**: Verify the success of the migration by checking the account balances on the new chain. If the account balance is non-zero and matches the previous chain's state, the snapshot import was successful.

  ```bash
   curl -s -X POST --data '{"jsonrpc":"2.0", "method":"eth_getBalance", "params":["0x85da99c8a7c2c95964c8efd687e95e632fc533d6", "latest"], "id":1}' http://localhost:10002

  {"jsonrpc":"2.0","id":1,"result":"0x3635c9adc5dea00000"}%
  ```
