---
id: getting-started
title: PoS Bridge
sidebar_label: Introduction
description: More flexibility and faster withdrawals with Polygon POS.
keywords:
  - docs
  - matic
  - pos bridge
  - deposit
  - withdraw
  - mapping
  - state sync
image: https://matic.network/banners/matic-network-16x9.png
---

Please check the latest [Matic.js documentation on PoS](../matic-js/get-started.md) to get started.

## Steps to use the PoS Bridge

Before we enter into this section of the docs, it may help to have a thorough understanding of some terms as you'll interact with them while trying to use the bridge: [Mapping](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/) and the [State Sync Mechanism](https://docs.polygon.technology/docs/pos/state-sync/state-sync/).

Then, the first step to using the PoS bridge is mapping the **Root Token** and **Child Token**. It means that the token contract on the root chain and the token contract on the child chain have to maintain a connection (called mapping) to transfer assets between themselves. If you're interested in submitting a mapping request, please do that using [this guide](/docs/develop/ethereum-polygon/submit-mapping-request/).

At a lower level and with more detail, this is what happens:

### Deposit

  1. Owner of the asset **(ERC20/ERC721/ERC1155)** token has to approve a specific contract on the PoS bridge to spend the amount of tokens to be transferred. This specific contract is called the **Predicate Contract** (deployed on the Ethereum network) which actually **locks the amount of tokens to be deposited**.
  2. Once the approval is given, the next step is to **deposit the asset**. A function call has to be made on the `RootChainManager` contract which in turn triggers the `ChildChainManager` contract on the Polygon chain.
  3. This happens through a state sync mechanism which can be understood in detail from [here](/docs/pos/state-sync/state-sync/).
  4. The `ChildChainManager` internally calls the `deposit` function of the child token contract and the corresponding amount of asset tokens are **minted to the user's account**. It is important to note that only the `ChildChainManager` can access the `deposit` function on the child token contract.
  5. Once the user gets the tokens, they can be **transfered almost instantly with negligible fees on the Polygon chain**.

### Withdrawals

  1. Withdrawing assets back to Ethereum is a 2-step process in which the asset token has to be **first burnt on the Polygon chain** and then the **proof of this burn transaction has to be submitted** on the Ethereum chain.
  2. It takes about 20 mins to 3 hours for the burn transaction to be checkpointed into the Ethereum chain. This is done by the Proof of Stake validators.
  3. Once the transaction has been added to the checkpoint, proof of the burn transaction can be submitted on the `RootChainManager` contract on Ethereum by calling the `exit` function.
  4. This function call **verifies the checkpoint inclusion** and then triggers the Predicate contract which had locked the asset tokens when the assets were deposited initially.
  5. As the final step, the **predicate contract releases the locked tokens** and refunds them to the users account on Ethereum.

:::tip

Once mapping is done, you can either use the **matic.js SDK** to interact with the contracts or you can do the same without the SDK. However, the matic.js SDK is designed in a very user friendly way to make the asset transfer mechanism very easy to integrate with any application.

:::
