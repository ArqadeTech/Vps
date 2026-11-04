FROM kalilinux/kali-rolling

# Choose how much Kali to install:
#   kali-linux-headless (CLI tools, ~several GB), kali-tools-top10 (small), kali-linux-large (huge)
ARG KALI_META=kali-linux-headless
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      ${KALI_META} ttyd tmux zsh sudo curl wget git vim nano iputils-ping net-tools dnsutils ca-certificates tini \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN useradd -m -s /bin/zsh kali \
 && echo 'kali ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/kali \
 && chmod 0440 /etc/sudoers.d/kali

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

USER kali
WORKDIR /home/kali
EXPOSE 7681
ENTRYPOINT ["/usr/bin/tini", "--", "/entrypoint.sh"]
