# SimuBank Development Container
# Base image: Latest stable Ubuntu
FROM ubuntu:20.04

# Set environment variables to prevent interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# 1. Install System Dependencies
# Update package lists and install essential tools
RUN apt-get update && apt-get install -y \
    apt-utils \
    wget \
    gnupg \
    curl \
    unzip \
    git \
    jq \
    gnome-keyring \
    gosu \
    && rm -rf /var/lib/apt/lists/*

# 2. Install Google Chrome and WebDriver
# Add Google Chrome repository and key
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list

# Install Google Chrome
RUN apt-get update && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Install ChromeDriver
# Find the latest version of ChromeDriver
RUN CHROME_MAJOR_VERSION=$(google-chrome --version | cut -d' ' -f3 | cut -d'.' -f1) \
    && CHROMEDRIVER_URL=$(curl -sS "https://googlechromelabs.github.io/chrome-for-testing/known-good-versions-with-downloads.json" | jq -r --arg MAJOR_VERSION "$CHROME_MAJOR_VERSION" '.versions[] | select(.version | startswith($MAJOR_VERSION + ".")) | .downloads.chromedriver[] | select(.platform == "linux64") | .url' | tail -n 1) \
    && wget -O /tmp/chromedriver.zip $CHROMEDRIVER_URL \
    && unzip /tmp/chromedriver.zip -d /usr/local/bin/ \
    && rm /tmp/chromedriver.zip

# 3. Install Node.js Environment
# Add Node.js repository (LTS version)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Install Node.js and npm
RUN apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# 4. Install MongoDB
# Add MongoDB repository and key
RUN wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add - \
    && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB Server and Database Tools
RUN apt-get update && apt-get install -y \
    mongodb-org \
    mongodb-org-tools \
    && rm -rf /var/lib/apt/lists/*

# 5. Create and configure a non-root user
RUN groupadd --gid 1000 node \
    && useradd --uid 1000 --gid node --shell /bin/bash --create-home node

# 6. Create and configure workspace
RUN mkdir -p /workspace && chown -R node:node /workspace
WORKDIR /workspace

# 7. Configure entrypoint
COPY .devcontainer/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# Set the default command to run when nothing is specified
CMD ["npm", "install"]