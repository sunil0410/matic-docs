---
id: snapshot-instructions-heimdall-bor
title: Heimdall and Bor Snapshots
sidebar_label: Heimdall & Bor Snapshots
description: Heimdall and Bor snapshot Instructions for faster syncing.
keywords:
  - docs
  - matic
  - polygon
  - binary
  - node
  - validator
  - sentry
  - heimdall
  - bor
  - snapshots
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

When setting up a new sentry, validator, or full node server, it is recommended that you use snapshots for faster syncing without having to sync over the network. Using snapshots will save you several days for both Heimdall and Bor.

:::tip

For the latest snapshot, please visit [<ins>Polygon Chains Snapshots</ins>](https://snapshot.polygon.technology/).

:::

## Heimdall/Bor Snapshots

First, set up your node with the **prerequisites** from our [PoSV1 node setup guide](https://wiki.polygon.technology/docs/operate/full-node-binaries/). Before you start any services, run the shell script below to download and extract your snapshot data for faster bootstrapping. In our example, we're using an Ubuntu Linux m5d.4xlarge machine with an 8TB Block device attached. User simply needs specify 
the proper network (mainnet/mumbai) and client type (heimdall/bor) and all the correct chaindata will start transferring to your disk. Note, this script combines download/extract phases so downloaded files that have already been extracted are deleted to minimize disk space requirements. We recommend using a Screen session to prevent any accidental interruption of chaindata download/extract script:

```
#!/bin/bash

# ask user for network and client type
read -p "PoSV1 Network (mainnet/mumbai): " network_input
read -p "Client Type (heimdall/bor): " client_input
read -p "Directory to Download/Extract: " extract_dir_input

# set default values if user input is blank
network=${network_input:-mumbai}
client=${client_input:-heimdall}
extract_dir=${extract_dir_input:-"${client}_extract"}

# install dependencies and cursor to extract directory
sudo apt-get update -y
sudo apt-get install -y zstd pv aria2
mkdir -p "$extract_dir"
cd "$extract_dir"

# download compiled incremental snapshot files list
aria2c -x6 -s6 "https://snapshot-download.polygon.technology/$client-$network-incremental-compiled-files.txt"

# download all incremental files, includes automatic checksum verification per increment
aria2c -x6 -s6 -i $client-$network-incremental-compiled-files.txt

# helper method to extract all files and delete already-extracted download data to minimize disk use
function extract_files() {
    compiled_files=$1
    while read -r line; do
        if [[ "$line" == checksum* ]]; then
            continue
        fi
        filename=`echo $line | awk -F/ '{print $NF}'`
        if echo "$filename" | grep -q "bulk"; then
            pv $filename | tar -I zstd -xf - -C . && rm $filename
        else
            pv $filename | tar -I zstd -xf - -C . --strip-components=3 && rm $filename
        fi
    done < $compiled_files
}

# execute final data extraction step
extract_files $client-$network-incremental-compiled-files.txt
```

**Note:** If experiencing intermittent aria2c download errors, try reducing concurrency as exampled here:
```
aria2c -c -m 0 -x6 -s6 -i heimdall-$network-incremental-compiled-files.txt --max-concurrent-downloads=1
```

After extraction, be sure to point your heimdall/bor datadir config to the path of your extracted data. 
This ensures the systemd services can properly register the snapshot data on client start. 
Symlinks can also be used if needing to keep default client config settings.

**For example:** Say you've mounted your block device at ~/snapshots and downloaded/extracted chaindata to
'heimdall_extract' and 'bor_extract' respectively. Using the below sample commands you can properly register
your extracted data on heimdall/bor systemd service start:
```
# remove any existing datadirs for heimdall and bor
rm -rf /var/lib/heimdall/data
rm -rf /var/lib/bor/chaindata

# rename and setup symlinks to match default client datadir configs
mv ~/snapshots/heimdall_extract ~/snapshots/data
mv ~/snapshots/bor_extract ~/snapshots/chaindata
sudo ln -s ~/snapshots/data /var/lib/heimdall
sudo ln -s ~/snapshots/chaindata /var/lib/bor

# bring up clients with all snapshot data properly registered
sudo service heimdalld start
# wait for heimdall to fully sync then start bor
sudo service bor start
```
