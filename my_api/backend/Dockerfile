#dockerfile
FROM ruby:3.0
RUN apt-get update \
 && apt-get install -qq -y --no-install-recommends \
    build-essential \
    tzdata \
    libxml2-dev \
    libxslt-dev \
    curl \
    gnupg \
    unzip \
    fontconfig \
    libfontconfig1 \
    libxrender1 \
    libxext6 \
    libaio-dev \
    libpq-dev \
    libsqlite3-dev

WORKDIR /app
ADD Gemfile .
ADD Gemfile.lock .

RUN bundle install

ADD . .

EXPOSE 8080
CMD ["bash"]
