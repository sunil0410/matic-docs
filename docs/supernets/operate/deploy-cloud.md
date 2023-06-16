---
id: supernets-setup-dev-env
title: Deploy a Polygon Supernet Devnet to the Cloud
sidebar_label: Deploy a Supernet to the Cloud
description: "Learn how to deploy a test Supernet instance to the cloud."
keywords:
  - docs
  - Polygon
  - edge
  - supernets
  - childchain
  - network
  - modular
---

## Prerequisites

Before diving into any of the tutorials, make sure your environment meets the necessary prerequisites. They can be found **[<ins>here</ins>](/docs/supernets/operate/system.md)**.

:::caution Don't use the develop branch for deployments

Please ensure that you are not running on the `develop` branch, which is the active development branch and include changes that are still being tested and not compatible with the current process.

Instead, use the [<ins>latest release</ins>](/docs/supernets/operate/install.md) for deployments.

:::

| Platform | Guide |
| --- | --- |
| Amazon Web Services | To set up a devnet on AWS, you can refer to the AWS deployment guide available [<ins>here</ins>](https://github.com/maticnetwork/terraform-polygon-supernets). The guide provides comprehensive instructions on how to use Terraform to set up a Virtual Private Cloud (VPC), subnets, security groups, and EC2 instances, followed by instructions on configuring nodes using Ansible. |
| Microsoft Azure | To set up a devnet on Azure, you can refer to the Azure deployment guide available [<ins>here</ins>](https://github.com/caleteeter/polygon-azure). This repository offers an Azure template that can be deployed through the Azure and Bicep CLI, or directly through the "Deploy to Azure" button. Additionally, the deployment can be viewed via the "Visualize" button available in the repository. |
| Google Cloud Platform | Coming soon. |
