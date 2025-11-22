# SimuBank Development Container
# Base image: Latest stable Ubuntu
FROM ubuntu:latest

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
RUN CHROME_DRIVER_VERSION=$(curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE_$(google-chrome --version | cut -d' ' -f3 | cut -d'.' -f1)) \
    && wget -O /tmp/chromedriver.zip https://chromedriver.storage.googleapis.com/$CHROME_DRIVER_VERSION/chromedriver_linux64.zip \
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

# 5. Application Setup
# Create a working directory
WORKDIR /app

# Clone the SimuBank repository
RUN git clone https://github.com/TrueAquarius/SimuBank.git .

# Install npm dependencies
RUN npm install

# Create environment files from examples
RUN cp .env.local.example .env.local \
    && cp .env.test.example .env.test

# 6. Container Configuration
# Expose the Next.js application port
EXPOSE 3000

# Create a startup script
RUN echo '#!/bin/bash\n\
# Start MongoDB service\n\
mongod --fork --logpath /var/log/mongodb.log\n\
# Start the Next.js development server\n\
npm run dev' > /app/start.sh \
    && chmod +x /app/start.sh

# Set the default command to run the startup script
CMD ["/app/start.sh"]