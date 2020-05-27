---
title: Build your first Harberger Tax App - Part 1
date: "2020-05-27T14:12:03.284Z"
featuredImage: "./red-balloon-sale.jpg"
author: Jason Smythe
description: A tutorial that shows you all the parts that come together to create https://wildcards.world. It acts as a good starting point if you want to create your own app that uses harberger tax.
---

# Build your first Harberger Tax App - Part 1

Wildcards has been running in production for many months, and all the code is opensource. However, we are yet to see a flourishing of applications built with harberger tax. This article aims to make the code that is used to build wildcards easily accessible to the public. There are quite a few manual steps in this tutorial, but if you follow everything step by step you will be able to have a default working harberger tax application on Ethereum with a UI in under 15 minutes.

There are more links and explanations marked with the heading **_Extra_**. We highly encourage you to go through these, but if you just want to get started they are not necessary (and they will cause you to take longer than 15 minutes). If something goes wrong check if there are any **_NOTE_** sections. Otherwise please create an issue on github

Once you have completed the basic tutorial we will explore how to customize your application by modifying the contracts and extending the UI. This toolkit is designed to be easy to get started with, yet, (or so we hope) infinitely customizable.

## Contents:

This tutorial has 3 parts:

- First part is to deploy the smart contracts.
- Second part is to create a subgraph that allows you to easily query data from the blockchain.
- The final step is to run a sample UI

> **_Aside_**: While we truly love thegraph and the power it gives, it also adds quite a lot of config and complexity to an application. I wouldn't recommend using the graph for very small and quick projects, for that it is simpler to just query blockchain data directly from the blockchain via a provider such as [infura.io](https://infura.io).

## Get the contracts and deploy them.

> **_Extra_**: These contracts use [Zeppelin-SDK](https://github.com/OpenZeppelin/openzeppelin-sdk) to allow them to be up-gradable. Please go through their [docs](https://openzeppelin.com/sdk/) carefully to understand what this means and the requirements if you wish to upgrade.

Clone the repository and install the dependencies:

```bash
git clone https://github.com/wildcards-world/harberger-base-contracts.git
cd harberger-base-contracts
yarn # You can also use `npm install` but yarn is recommended.
```

Then deploy the contracts to the goerli test network:

```bash
yarn migrate --network goerli
```

> **_NOTE_**: This command will take a few minutes

> **_NOTE_**: If there is an issue with this command it is likely that someone has used/stolen all the goerli testnet eth that is stored by the private key hardcoded in this repo. Another possibility is that the infura keys are exhausted (since they are on free tier). Generate new keys [here](https://iancoleman.io/bip39/) and paste them into `./secrectsManager.example.js` to replace the old private key. If you want to use your own infura keys, generate them [here](https://infura.io/) and paste your keys into `./secrectsManager.example.js`.

It should output something similar to this on completion.
![Expected Output](https://i.imgur.com/InsmRtH.png)

> **_Extra_**: these contracts currently use [truffle](https://www.trufflesuite.com/docs/truffle/reference/configuration) + [ganache](https://www.trufflesuite.com/ganache), but over time the goal is to move it completely to [buidler](https://buidler.dev/). At the moment you will find traces of configuration for both in the repo.

Now that the contract is deployed to the goerli testnet we need to get the contract addresses. It is found in the `./openzeppelin/goerli.json` file near the bottom under `proxies > "the contract name" > address` as shown below:

![where-to-find-contract-addresses](https://i.imgur.com/GrASHKv.png)
In our case the address for the _HarbergerSteward_ is `0x4bE0Eab8f41c8109AA134509086Cbcb18b10C0fB` and for the _ERC721Patronage_ it is `0x48C12e1c5aBC5239FD6e2642C929E8FA8bE29999` - we will use these in the next steps, so keep them somewhere for reference.

## Create a subgraph

This repo allows us to read data from the ethereum blockchain.

> **_Extra_**: the subgraph is provided by thegraph.com . It uses graphQL which is a specification for how to structure data requests and it is a powerful tool because it allows you to fetch exactly the data you want from the graph. The UI library uses a library called [apollo](https://www.apollographql.com/) to fetch the data from the subgraph.

Get the code and install the dependencies by running the following in a new terminal and folder:

```bash
git clone https://github.com/wildcards-world/harberger-base-subgraph.git
cd harberger-base-subgraph
yarn # Once again, you can use `npm install` if you prefer.
```

Next you will need to create an account with [the Graph](https://thegraph.com). Once you have an account go to your dashboard and click the button that says "Add Subgraph" in the top right corner:

![create-graph-button](https://i.imgur.com/PsaZYQa.png)

Fill in your preferred details for your new subgraph:
![create-graph](https://i.imgur.com/DEnfDNu.png)
Once created it will present you with some default instructions. I have summarised them below.

Install thegraph cli tool:

```bash
npm install --global @graphprotocol/graph-cli
```

> **_NOTE_**: this command will take some time, so feel free to continue in the meantime. You do need this command to run the `graph auth` command below.

Authenticate with thegraph. Copy the code in the top bar and run it in the following command:
![secret-graph-code](https://i.imgur.com/WlMCvdP.png)

```bash
graph auth https://api.thegraph.com/deploy/ <ACCESS_TOKEN> # find this access token as circled in the image above.
```

![success example](https://i.imgur.com/9v6fsfP.png)

You are ready to test deploying this graph. First change the _package.json_ to point to the correct subgraph:
![set-upstream-graph-endpoint](https://i.imgur.com/ptkktvU.png)

For example if you github name is "jasoons" and your new subgraph is called "harberger-app" you should set this line to say `"deploy": "graph deploy --node https://api.thegraph.com/deploy/ --ipfs https://api.thegraph.com/ipfs/ jasoons/harberger-app",`

Next you need to auto-generate some setup code:

```bash
yarn codegen
```

> **_Extra_**: you will need to run this anytime you change the abi (which you will need to change anytime you change the interface of your contract) or your `subgraph.yaml` file. It generates helper code based on the interface (abi) of your contracts.

You are now ready to deploy this version of the subgraph, but will it deploy the correct subgraph for your contracts? The answer is no, you need to tell the graph to watch the contracts you deployed in the previous step. To do that edit the `subgraph.yaml` file with the addresses that you deployed earlier:
![set-contracts-in-graph](https://i.imgur.com/57uJWiN.png)

Now run the deploy script with the correct contract addresses

```bash
yarn deploy
```

![](https://i.imgur.com/yyIGV4S.png)

Go to back your graph, reload the page and check that everything is working. It should look something like this:

![thegraph-playground](https://i.imgur.com/XUk7WyD.png)

> **_Extra_**: The docs for thegraph.com are excelent. Do yourself a favour and read through them thoroughly, thegraph will likely help you build on Ethereum for many future projects.

## Setup the basic UI

```bash
git clone https://github.com/wildcards-world/harberger-ui.git
cd harberger-ui
yarn
yarn re:build
```

The UI is configured to run with a single simple command:

```bash
yarn start
```

> **_EXTRA_**: You can do all your coding in Javascript or Typescript, however you can also use ReasonMl which is a new typesafe language which is being pioneered by facebook.

Now you will need to set the contract address of the steward and the graph endpoint of your subgraph.

![](https://i.imgur.com/1sseS1J.png)

You should be able to now buy token #0 (the starter code has this value hardcoded) via the UI and set its price. To use the UI you will need to have the [metamask](https://metamask.io/).

To hit the ground running with your own custom UI code you will need to start with the `app.js` file. The code should be easy to follow.

For doing more advanced enhancements to this code, check out tutorial #2 of this series!

---

Visit our website [Wildcards](https://wildcards.world) where you can buy some wildcards and start contributing toward endangered animal conservation today! Follow our socials to learn more about our project and the conservation causes we are working towards.

Follow us on twitter: [@wildcards_world](https://twitter.com/wildcards_world)

Follow us on Facebook: [@wildcardscrypto](https://www.facebook.com/wildcardscrypto)

Follow us on Telegram: [Telegram](https://t.me/wildcardsworld)

As always, stay cool, stay safe and stay tuned

Team Wildcards
