# Trend Finder 🔦

**Stay on top of trending topics on social media — all in one place.**

Trend Finder collects and analyzes posts from key influencers, then sends a Slack notification when it detects new trends or product launches. This has been a complete game-changer for the Firecrawl marketing team by:

- **Saving time** normally spent manually searching social channels
- **Keeping you informed** of relevant, real-time conversations
- **Enabling rapid response** to new opportunities or emerging industry shifts

_Spend less time hunting for trends and more time creating impactful campaigns._

## How it Works

1. **Data Collection** 📥
   - Monitors selected influencers' posts on Twitter/X using the X API (Warning: the X API free plan is rate limited to only monitor 1 X account every 15 min)
   - Monitors websites for new releases and news with Firecrawl's /extract
   - Runs on a scheduled basis using cron jobs

2. **AI Analysis** 🧠
   - Processes collected content through Together AI
   - Identifies emerging trends, releases, and news.
   - Analyzes sentiment and relevance

3. **Notification System** 📢
   - When significant trends are detected, sends Slack notifications based on cron job setup
   - Provides context about the trend and its sources
   - Enables quick response to emerging opportunities

## Features

- 🤖 AI-powered trend analysis using Together AI
- 📱 Social media monitoring (Twitter/X integration)
- 🔍 Website monitoring with Firecrawl
- 💬 Instant Slack notifications
- ⏱️ Scheduled monitoring using cron jobs

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **AI/ML**: Together AI
- **Data Sources**:
  - Twitter/X API
  - Firecrawl
- **Notifications**: Slack Webhooks
- **Scheduling**: node-cron
- **Development**:
  - nodemon for hot reloading
  - TypeScript for type safety
  - Express async handler for error management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker
- Docker Compose
- Slack workspace with webhook permissions
- API keys for required services

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

```
# Required: API key from Together AI for trend analysis (https://www.together.ai/)
TOGETHER_API_KEY=your_together_api_key_here

# Required if monitoring web pages (https://www.firecrawl.dev/)
FIRECRAWL_API_KEY=your_firecrawl_api_key_here

# Required if monitoring Twitter/X trends (https://developer.x.com/)
X_API_BEARER_TOKEN=your_twitter_api_bearer_token_here

# Required: Incoming Webhook URL from Slack for notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd trend-finder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run the application:**
   ```bash
   # Development mode with hot reloading
   npm run start

   # Build for production
   npm run build
   ```

## Using Docker

1. **Build the Docker image:**
   ```bash
   docker build -t trend-finder .
   ```

2. **Run the Docker container:**
   ```bash
   docker run -d -p 3000:3000 --env-file .env trend-finder
   ```

## Using Docker Compose

1. **Start the application with Docker Compose:**
   ```bash
   docker-compose up --build -d
   ```

2. **Stop the application with Docker Compose:**
   ```bash
   docker-compose down
   ```

## Project Structure

```
trend-finder/
├── src/
│   ├── controllers/    # Request handlers
│   ├── services/       # Business logic
│   └── index.ts        # Application entry point
├── .env.example        # Environment variables template
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
