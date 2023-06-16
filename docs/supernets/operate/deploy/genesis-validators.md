---
id: supernets-genesis-validators
title: How to Configure the Initial Validator Set
sidebar_label: How to Configure the Initial Validator Set
description: "Learn how to configure the initial validator set of a new Supernet with allowlists and staking."
keywords:
  - docs
  - polygon
  - supernets
  - validators
  - validator set
  - allowlist
  - stake
---

In this section, we'll look at how to configure the initial rootchain validator set through allowlisting and by staking.

## i. Allowlist validators on the rootchain

The `CustomSupernetManager` contract on the rootchain is responsible for managing the PolyBFT network.

Before validators can be registered on the `CustomSupernetManager` contract on the rootchain, they need to be allowlisted by the deployer of the `CustomSupernetManager` contract. Validators can register themselves, or a registrator can register them on their behalf. Once registered, validators can stake and start validating transactions.

This can be done using the `polygon-edge polybft whitelist-validators` command. The deployer can specify the hex-encoded private key of the `CustomSupernetManager` contract deployer or use the `--data-dir` flag if they have initialized their secrets.

<details>
<summary>Flags ↓</summary>

| Flag              | Description                                                                                      | Example                                     |
| -----------------| ------------------------------------------------------------------------------------------------| ------------------------------------------- |
| `--private-key`     | Hex-encoded private key of the account that deploys the SupernetManager contract                | `--private-key <hex_encoded_rootchain_account_private_key_of_CustomSupernetManager_deployer>`             |
| `--addresses`       | Comma-separated list of hex-encoded addresses of validators to be whitelisted                   | `--addresses 0x8a98f47a9820e3f3a6C16f44194F1d7eCCe3A110,0x8a98f47a9820e3f3a6C16f44194F1d7eCCe3A110` |
| --supernet-manager| Address of the SupernetManager contract on the rootchain                                        | `--supernet-manager 0x3c6f8c6Fd90b2Bee1E78E2B2D1e7aB6cFf9Dc113` |
| `--data-dir`        | Directory for the Polygon Edge data if the local FS is used                                     | `--data-dir ./polygon-edge/data`             |
| `--jsonrpc`         | JSON-RPC interface                                                                              | `--jsonrpc 0.0.0.0:8545`                    |
| `--config`          | Path to the SecretsManager config file. If omitted, the local FS secrets manager is used        | `--config /path/to/config/file.yaml`        |

</details>

In the following example command, we are using a placeholder private key for the `CustomSupernetManager` contract deployer. 

> If running the demo geth instance, the test account private key has been hardcoded: `aa75e9a7d427efc732f8e4f1a5b7646adcc61fd5bae40f80d13c8419c9f43d6d`.

The `--addresses` flag is a comma-separated list of the first two validators generated earlier. The `--supernet-manager` flag specifies the actual `CustomSupernetManager` contract address that was deployed.

```bash
./polygon-edge polybft whitelist-validators \
  --private-key 0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef \
  --addresses 0x61324166B0202DB1E7502924326262274Fa4358F,0xFE5E166BA5EA50c04fCa00b07b59966E6C2E9570 \
  --supernet-manager 0x75aA024A2292A3FD3C17d67b54B3d00435437246
```

## ii. Register validators on the rootchain

Each validator needs to register themselves on the `CustomSupernetManager` contract. This is done using the `polygon-edge polybft register-validator` command. **Note that this command is for testing purposes only.**

<details>
<summary>Flags ↓</summary>

| Flag                          | Description                                                                                                       | Example                                                |
| -----------------------------| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `--config`                      | Path to the SecretsManager config file. If omitted, the local FS secrets manager is used.                          | `--config /path/to/config/file.yaml`                   |
| `--data-dir`                    | The directory path where the new validator key is stored.                                                         | `--data-dir /path/to/validator1`                       |                                                      |
| `--jsonrpc`                     | The JSON-RPC interface. Default is `0.0.0.0:8545`.                                                                 | `--jsonrpc 0.0.0.0:8545`                              |
| `--supernet-manager`            | Address of the SupernetManager contract on the rootchain.                                                          | `--supernet-manager 0x75aA024A2292A3FD3C17d67b54B3d00435437246`      |

</details>

```bash
./polygon-edge polybft register-validator --data-dir ./test-chain-1 \
--supernet-manager --supernet-manager 0x75aA024A2292A3FD3C17d67b54B3d00435437246
```

## iii. Initial staking on the rootchain

Each validator needs to perform initial staking on the rootchain `StakeManager` contract. This is done using the `polygon-edge polybft stake` command. **Note that this command is for testing purposes only.**

<details>
<summary>Flags ↓</summary>

| Flag                          | Description                                        | Example                                  |
| -----------------------------| -------------------------------------------------- | ---------------------------------------- |
| `--amount `                     | The amount to stake                                | `--amount 5000000000000000000`           |
| `--chain-id`                    | The ID of the child chain                          | `--chain-id 100`                         |
| `--config `                     | The path to the SecretsManager config file         | `--config /path/to/config/file.yaml`     |
| `--data-dir`                    | The directory for the Polygon Edge data            | `--data-dir ./polygon-edge/data`         |
| `--jsonrpc`                     | The JSON-RPC interface                             | `--jsonrpc 0.0.0.0:8545`                |
| `--native-root-token `          | The address of the native root token               | `--native-root-token 0x<token_address>`  |
| `--stake-manager`               | The address of the stake manager contract          | `--stake-manager 0x<manager_address>`   |

</details>

In the following example command, we use the validator key and the rootchain `StakeManager` contract address that were generated earlier. We also set the staking amount to `1000000000000000000` which is equivalent to 1 token. The `--native-root-token` flag is used to specify the address of the native token of the root chain. In the case of Polygon, this is the MATIC token. You can obtain the address of the MATIC token by checking the network explorer or by querying the network using a tool like curl or web3.js.

<details>
<summary>Obtaining native root token address</summary>

For example, if you are using the Mumbai test network, you can obtain the address of the MATIC testnet token by sending a GET request to the Mumbai network's JSON-RPC endpoint:

```bash
curl <mumbai-rpc-endpoint> \
-X POST \
-H "Content-Type: application/json" \
--data '{"jsonrpc":"2.0","method":"eth_contractAddress","params":["MaticToken"],"id":1}'
```

</details>

```bash
./polygon-edge polybft stake --data-dir ./test-chain-1 --chain-id 100 --amount 1000000000000000000 \
--stake-manager 0x6ceCFe1Db48Ab97fA89b06Df6Bd0bBdE6E64e6F7 --native-root-token 0x559Dd13d8A3CAb3Ff127c408f2A08A8a2AEfC56c
```

## iv. Finalize validator set on the rootchain

After all validators from the genesis block have performed initial staking on the rootchain, the final step required before starting the chain is to finalize the genesis validator set on the `SupernetManager` contract on the rootchain. This can be done using the `polygon-edge polybft supernet` command.

The deployer of the `SupernetManager` contract can specify their hex-encoded private key or use the `--data-dir` flag if they have initialized their secrets. If the `--enable-staking` flag is provided, validators will be able to continue staking on the rootchain. If not, genesis validators will not be able to update their stake or unstake, nor will newly registered validators after genesis be able to stake tokens on the rootchain. The enabling of staking can be done through this command or later after the Supernet starts.

In the following example command, we use a placeholder hex-encoded private key of the `SupernetManager` contract deployer. The addresses of the `SupernetManager` and `StakeManager` contracts are the addresses that were generated earlier. We also use the `--finalize-genesis` and `--enable-staking` flags to enable staking and finalize the genesis state.

```bash
   ./polygon-edge polybft supernet --private-key 0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef \
   --genesis /path/to/genesis/file \
   --supernet-manager 0x75aA024A2292A3FD3C17d67b54B3d00435437246 \
   --stake-manager 0x811068e4106f7A70D443684FF4927eC3940439Ec \
   --finalize-genesis --enable-staking
```
