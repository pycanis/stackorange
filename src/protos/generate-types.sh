#!/bin/bash

npx proto-loader-gen-types --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=protos/generated/ protos/*.proto