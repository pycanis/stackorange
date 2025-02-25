FROM debian:bookworm-slim

ARG UID=1000
ARG GID=1000
ARG TARGETPLATFORM
ARG BITCOIN_VERSION=28.1
ENV PATH=/opt/bitcoin-${BITCOIN_VERSION}/bin:$PATH

RUN groupadd --gid ${GID} bitcoin && useradd --create-home --no-log-init -u ${UID} -g ${GID} bitcoin

RUN apt-get update -y \
    && apt-get install -y curl gnupg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN set -ex \
  && if [ "${TARGETPLATFORM}" = "linux/amd64" ]; then export TARGETPLATFORM="x86_64-linux-gnu"; fi \
  && if [ "${TARGETPLATFORM}" = "linux/arm64" ]; then export TARGETPLATFORM="aarch64-linux-gnu"; fi \
  && if [ "${TARGETPLATFORM}" = "linux/arm/v7" ]; then export TARGETPLATFORM="arm-linux-gnueabihf"; fi \
  && gpg --keyserver keyserver.ubuntu.com --recv-keys \
    101598DC823C1B5F9A6624ABA5E0907A0380E6C3 \
    152812300785C96444D3334D17565732E08E5E41 \
    E61773CD6E01040E2F1BD78CE7E2984B6289C93A \
    9DEAE0DC7063249FB05474681E4AED62986CD25D \
    C388F6961FB972A95678E327F62711DBDCA8AE56 \
    9D3CC86A72F8494342EA5FD10A41BDC3F4FAFF1C \
    637DB1E23370F84AFF88CCE03152347D07DA627C \
    F2CFC4ABD0B99D837EEBB7D09B79B45691DB4173 \
    E86AE73439625BBEE306AAE6B66D427F873CB1A3 \
    F19F5FF2B0589EC341220045BA03F4DBE0C63FB4 \
    F4FC70F07310028424EFC20A8E4256593F177720 \
    A0083660F235A27000CD3C81CE6EC49945C17EA6 \
    0CCBAAFD76A2ECE2CCD3141DE2FFD5B1D88CA97D \
  && curl -SLO https://bitcoincore.org/bin/bitcoin-core-${BITCOIN_VERSION}/bitcoin-${BITCOIN_VERSION}-${TARGETPLATFORM}.tar.gz \
  && curl -SLO https://bitcoincore.org/bin/bitcoin-core-${BITCOIN_VERSION}/SHA256SUMS \
  && curl -SLO https://bitcoincore.org/bin/bitcoin-core-${BITCOIN_VERSION}/SHA256SUMS.asc \
  && gpg --verify SHA256SUMS.asc SHA256SUMS \
  && grep " bitcoin-${BITCOIN_VERSION}-${TARGETPLATFORM}.tar.gz" SHA256SUMS | sha256sum -c -

RUN tar -xzf *.tar.gz -C /opt \
    && rm *.tar.gz *.asc \
    && rm -rf /opt/bitcoin-${BITCOIN_VERSION}/bin/bitcoin-qt

RUN mkdir -p /home/bitcoin/.bitcoin && chown -R bitcoin:bitcoin /home/bitcoin

USER bitcoin

CMD ["bitcoind"]