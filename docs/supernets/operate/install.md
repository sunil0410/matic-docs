---
id: supernets-install
title: Installation
sidebar_label: Install Binaries
description: "Steps on how to install the Supernet binaries."
keywords:
  - docs
  - polygon
  - edge
  - install
  - installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DownloadButton from '@site/src/data/DownloadButton';

:::tip

We recommend using the pre-built releases and verifying the provided checksums for security.

The Docker image is also a convenient option for containerized deployment. Building from source provides greater flexibility, but requires a [suitable development environment](/docs/supernets/operate/system.md).

:::

:::info Latest release: 1.0.0-rc1

**The latest stable test release is [v1.0.0-rc1](https://github.com/0xPolygon/polygon-edge/releases/tag/v1.0.0-rc1)**

:::

<!-- ===================================================================================================================== -->
<!-- ===================================================================================================================== -->
<!-- ===================================================== GUIDE TABS ==================================================== -->
<!-- ===================================================================================================================== -->
<!-- ===================================================================================================================== -->

<Tabs
defaultValue="pre-built"
values={[
{ label: 'Pre-built releases', value: 'pre-built', },
{ label: 'Docker image', value: 'docker', },
{ label: 'Build from source', value: 'source', },
]
}>

<!-- ===================================================================================================================== -->
<!-- ================================================ PRE-BUILT RELEASE ================================================== -->
<!-- ===================================================================================================================== -->

<TabItem value="pre-built">

<!--
<div class="download-container">
  <div class="download-text">
    <p>To access the pre-built releases, visit the <a href="https://github.com/0xPolygon/polygon-edge/releases" target="_blank">GitHub Releases</a> page. Polygon Edge provides cross-compiled AMD64/ARM64 binaries for Darwin and Linux. <b>The download button will automatically provide the appropriate download link according your operating system.</b></p>
  </div>
  <div class="download-button">
    <DownloadButton
      macDownloadUrl="https://github.com/0xPolygon/polygon-edge/releases/download/v0.8.1/polygon-edge_0.8.1_darwin_amd64.tar.gz"
      macArmDownloadUrl="https://github.com/0xPolygon/polygon-edge/releases/download/v0.8.1/polygon-edge_0.8.1_darwin_arm64.tar.gz"
      linuxDownloadUrl="https://github.com/0xPolygon/polygon-edge/releases/download/v0.8.1/polygon-edge_0.8.1_linux_amd64.tar.gz"
      linuxArmDownloadUrl="https://github.com/0xPolygon/polygon-edge/releases/download/v0.8.1/polygon-edge_0.8.1_linux_arm64.tar.gz"
      buttonText="Download Polygon Supernets"
    />
  </div>
</div>

-->

To access the pre-built releases, visit the [GitHub releases page](https://github.com/0xPolygon/polygon-edge/releases). The client provides cross-compiled AMD64/ARM64 binaries for Darwin and Linux.

### [For reference] Extract pre-release package

Extract the downloaded package using your file system's extraction tool or the provided commands below, and navigate to the pre-built release in your preferred interface or text editor.

<Tabs
defaultValue="linux-mac"
values={[
{ label: 'Linux/Mac', value: 'linux-mac', },
{ label: 'Windows', value: 'windows', },
]
}>

<TabItem value="linux-mac">

```bash
# replace <downloaded_package> with the actual package filename

tar -xzf <downloaded_package>
cd <downloaded_package>
```

</TabItem>

<TabItem value="windows">

The tar command is available in PowerShell on Windows 10 (build 17063 or newer).

```bash
# replace <downloaded_package> with the actual package filename

tar -xzf <downloaded_package>
cd <downloaded_package>
```

For older Windows systems or Command Prompt, use third-party tools like 7-Zip or WinRAR, or the PowerShell cmdlet Expand-Archive.

```bash
# replace <downloaded_package> with the actual package filename
# replace <destination_folder> with the desired folder path for extracted files

Expand-Archive -Path <downloaded_package> -DestinationPath <destination_folder>
cd <destination_folder>
```

</TabItem>
</Tabs>

</TabItem>

<!-- ===================================================================================================================== -->
<!-- ================================================ PRE-BUILT RELEASE ================================================== -->
<!-- ===================================================================================================================== -->

<TabItem value="docker">

To use Docker, you will need to have it installed on your system. If you haven't already installed Docker, you can follow the instructions on the
[official Docker website](https://www.docker.com/) for your operating system.

You can access the official Polygon Edge Docker images hosted under the [0xpolygon registry](https://hub.docker.com/r/0xpolygon/polygon-edge) using the following command:

  ```bash
  docker pull 0xpolygon/polygon-edge:latest
  ```

</TabItem>

<!-- ===================================================================================================================== -->
<!-- ====================================================== SOURCE ======================================================= -->
<!-- ===================================================================================================================== -->

<TabItem value="source">

> Before getting started, ensure you have [Go](https://go.dev/) installed on your system (version >= 1.15 and <= 1.19).
> Compatibility is being worked on for other versions and will be available in the near future.

> To install Go, run the following command in your CLI (we are using 1.18 in this example): `sudo apt-get install golang-1.18`.
> Or, use a package manager like [Snapcraft](https://snapcraft.io/go) for Linux, [Homebrew](https://formulae.brew.sh/formula/go) for Mac, and [Chocolatey](https://community.chocolatey.org/packages/golang) for Windows.

Use the following commands to clone the Polygon Edge repository and build from source:

  ```bash
  git clone https://github.com/0xPolygon/polygon-edge.git
  cd polygon-edge/
  go build -o polygon-edge .
  ```
</TabItem>
</Tabs>
