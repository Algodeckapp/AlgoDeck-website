# AlgoDeck Design Specification: Key Application Screens

## 1. Dashboard Screen
- **Purpose:** Central hub for real-time monitoring of bot performance and account status.
- **Key Data:**
  - Active Bots Count (e.g., "4 Active Bots").
  - Real-time P&L (Profit/Loss) with advanced drawdown metrics.
  - Quick-view of connected MT4/MT5 accounts.
- **UI Components:**
  - **Summary Cards:** Grid layout showing high-level stats (Total Balance, Daily P&L, Active Bots).
  - **Live Feed:** Real-time log of recent trades (symbol, action, pips, p&l).
  - **Visualizer:** Chart component (`TradingViz` style) showing equity curves across accounts.
- **User Actions:** Quick access to bot controls, account management.

## 2. Bots Screen
- **Purpose:** Bot management hub (create, backtest, deploy, pause).
- **Key Data:**
  - List of bots with status (Active/Paused/Backtesting).
  - Performance data per bot (Win rate, ROI, Drawdown).
  - Bot configurations (Stop-loss, Take-profit, Strategy settings).
- **UI Components:**
  - **Bot List/Grid:** Cards displaying bot name, strategy type, and current status indicator.
  - **Bot Management:** Toggle switches for "Active/Paused".
  - **Creation Modal:** Interface for the visual strategy builder.
- **User Actions:** Create new bot, edit strategy, view detailed performance, pause/restart.

## 3. Analytics Screen
- **Purpose:** Deep-dive performance insights into strategies and accounts.
- **Key Data:**
  - Equity curves over time (daily/weekly/monthly).
  - Detailed trade history (Win/Loss, Avg Trade Duration, Max Drawdown).
  - Asset allocation/correlation map.
- **UI Components:**
  - **Charts:** Line and Bar charts for performance metrics.
  - **Stats Grid:** Win Rate, Profit Factor, Sharpe Ratio, Max Drawdown.
  - **Timeframe Selector:** Dropdown to switch between periods.
- **User Actions:** Filter by date, export reports, switch between bot/account views.

## 4. Account Screen
- **Purpose:** Management of broker accounts, subscriptions, and security.
- **Key Data:**
  - Connected MT4/MT5 accounts (status, ID, broker name).
  - Subscription tier (Free, Pro, Elite).
  - Profile details, security settings.
- **UI Components:**
  - **Account List:** Cards for each connected account with "Verify" or "Reconnect" status.
  - **Subscription Panel:** Current plan card with "Upgrade" button.
  - **Security Section:** Password change form, 2FA toggle, session management.
- **User Actions:** Add new account, remove account, change subscription, change password.
