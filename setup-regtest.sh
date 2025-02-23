#!/bin/bash

BITCOIND_CONTAINER_NAME="stackorange-bitcoind-1"
LND_NODE_1="stackorange-lnd-1"
LND_NODE_2="stackorange-lnd-test-1"

echo "Creating default wallet..."
docker exec -it stackorange-bitcoind-1 bitcoin-cli createwallet main
echo "Wallet created."

echo "Creating initial blocks..."
docker exec -it $BITCOIND_CONTAINER_NAME sh -c "bitcoin-cli generatetoaddress 101 \$(bitcoin-cli getnewaddress)"
echo "Blocks created."

echo "Creating wallet for $LND_NODE_1.."
docker exec -it $LND_NODE_1 lncli create
echo "Wallet created."

echo "Creating wallet for $LND_NODE_2.."
docker exec -it $LND_NODE_2 lncli create
echo "Wallet created."

echo "Generating on-chain address for $LND_NODE_1.."
LND_NODE_1_FUND_ADDRESS=$(docker exec -it $LND_NODE_1 lncli --network=regtest newaddress p2tr | jq -r '.address')
echo "$LND_NODE_1 on-chain address: $LND_NODE_1_FUND_ADDRESS"

echo "Sending bitcoin to LND wallet..."
docker exec -it $BITCOIND_CONTAINER_NAME bitcoin-cli -named sendtoaddress address=$LND_NODE_1_FUND_ADDRESS amount=0.5 fee_rate=25
echo "Sent bitcoin to LND wallet."

echo "Waiting for Bitcoin transaction to confirm..."
docker exec -it $BITCOIND_CONTAINER_NAME sh -c "bitcoin-cli generatetoaddress 1 \$(bitcoin-cli getnewaddress)"
echo "Transaction confirmed."

echo "Looking up the $LND_NODE_2 pub key"
LND_NODE_2_PUB_KEY=$(docker exec -it $LND_NODE_2 lncli --network=regtest getinfo | jq -r '.identity_pubkey')
echo "$LND_NODE_2 pub key: $LND_NODE_2_PUB_KEY"

echo "Connecting to $LND_NODE_2 from $LND_NODE_1..."
docker exec -it $LND_NODE_1 lncli --network=regtest connect $LND_NODE_2_PUB_KEY@$LND_NODE_2:9735
echo "Lightning nodes connected."

echo "Opening lightning channel..."
docker exec -it $LND_NODE_1 lncli --network=regtest openchannel $LND_NODE_2_PUB_KEY 2000000 0
echo "Lightning channel opened."

echo "Confirming channel open..."
docker exec -it $BITCOIND_CONTAINER_NAME sh -c "bitcoin-cli generatetoaddress 3 \$(bitcoin-cli getnewaddress)"
echo "Channel open confirmed."

echo "Done!"
