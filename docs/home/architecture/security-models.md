---
id: security-models
title: Security Models
description: "Learn about the PoS security model."
keywords:
  - docs
  - matic
  - polygon
  - security
  - implementation
image: https://wiki.polygon.technology/img/polygon-logo.png
---

# Security Models

Polygon provides three types of security models for a developer to build their dApps upon:

- [Security Models](#security-models)
  - [Proof of Stake Security](#proof-of-stake-security)

We have described each of these security models offered by Polygon and the developer workflow for each with an example dApp below.

## Proof of Stake Security

Proof of Stake (PoS) security is provided by the Heimdall & Bor layer which is built on top of Tendermint. A checkpoint is committed to the root chain only when ⅔ of the validators have signed on it.

To enable the PoS mechanism on our platform, we employ a set of staking management contracts on Ethereum, as well as a set of incentivized validators running Heimdall and Bor nodes. This implements the following features:

- The ability for anyone to stake MATIC tokens on the Ethereum smart contract and join the system as a Validator
- Earn staking rewards for validating state transitions on Polygon

We have a fast finality layer that finalizes the state periodically via checkpoints. The fast finality helps us cement state. The EVM compatible chain has few validators and faster block time with high throughput. It chooses scalability over high degrees of decentralization. Heimdall ensures that the final state commit is bulletproof and passes via a large validator set and hence high decentralization.

**For developers**

As a dApp developer building on PoS security, the procedure is as simple as taking your smart contract and deploying it on the Polygon PoS network. This is possible because of the account based architecture enabling an EVM-compatible blockchain.
