import numpy as np
from datetime import datetime, timedelta
from .market_data import MarketData  # Assuming MarketData is in the same directory

class Asset:
    def __init__(self, name, dimensions, historical_data=None):
        self.name = name
        self.dimensions = dimensions  # A dictionary of dimensions (e.g., {'risk': 0.5, 'liquidity': 0.8, 'return': 0.9})
        self.historical_data = historical_data if historical_data is not None else []
        self.current_value = self.calculate_value()
        self.performance_history = []

    def calculate_value(self):
        """Calculate the value of the asset based on its dimensions and market data."""
        market_price = MarketData.get_current_price(self.name)
        # Example: Weighted sum of dimensions adjusted by market price
        weights = {'risk': 0.3, 'liquidity': 0.3, 'return': 0.4}
        dimension_value = sum(weights[dim] * self.dimensions.get(dim, 0) for dim in weights)
        return market_price * dimension_value

    def assess_risk(self):
        """Assess the risk of the asset based on its dimensions."""
        risk_factor = self.dimensions.get('risk', 0)
        # Example: Risk assessment logic
        if risk_factor < 0.3:
            return "Low Risk"
        elif risk_factor < 0.7:
            return "Moderate Risk"
        else:
            return "High Risk"

    def update_historical_data(self, new_price):
        """Update historical data with the latest market price."""
        self.historical_data.append((datetime.now(), new_price))
        self.performance_history.append(new_price)

    def calculate_performance(self):
        """Calculate performance metrics over time."""
        if len(self.performance_history) < 2:
            return None  # Not enough data to calculate performance
        returns = np.diff(self.performance_history) / self.performance_history[:-1]
        return {
            'average_return': np.mean(returns),
            'volatility': np.std(returns),
            'max_drawdown': self.calculate_max_drawdown()
        }

    def calculate_max_drawdown(self):
        """Calculate the maximum drawdown from historical performance."""
        if not self.performance_history:
            return 0
        peak = self.performance_history[0]
        max_drawdown = 0
        for price in self.performance_history:
            if price > peak:
                peak = price
            drawdown = (peak - price) / peak
            max_drawdown = max(max_drawdown, drawdown)
        return max_drawdown

    def __repr__(self):
        return (f"Asset(name={self.name}, dimensions={self.dimensions}, "
                f"current_value={self.current_value}, risk_assessment={self.assess_risk()})")
