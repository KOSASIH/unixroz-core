from datetime import datetime
from .asset import Asset

class Portfolio:
    def __init__(self):
        self.assets = []
        self.performance_history = []

    def add_asset(self, asset):
        """Add an asset to the portfolio."""
        self.assets.append(asset)

    def remove_asset(self, asset_name):
        """Remove an asset from the portfolio by name."""
        self.assets = [asset for asset in self.assets if asset.name != asset_name]

    def update_asset(self, asset_name, new_dimensions):
        """Update the dimensions of an existing asset."""
        for asset in self.assets:
            if asset.name == asset_name:
                asset.dimensions.update(new_dimensions)
                asset.current_value = asset.calculate_value()  # Recalculate value
                return True
        return False

    def total_value(self):
        """Calculate the total value of the portfolio."""
        return sum(asset.current_value for asset in self.assets)

    def assess_risk(self):
        """Assess the overall risk of the portfolio based on individual asset risks."""
        risks = [asset.assess_risk() for asset in self.assets]
        risk_levels = {'Low Risk': 0, 'Moderate Risk': 0, 'High Risk': 0}
        for risk in risks:
            risk_levels[risk] += 1
        return risk_levels

    def calculate_performance(self):
        """Calculate performance metrics for the portfolio."""
        total_returns = []
        for asset in self.assets:
            performance = asset.calculate_performance()
            if performance:
                total_returns.append(performance['average_return'])
        return {
            'portfolio_average_return': np.mean(total_returns) if total_returns else 0,
            'portfolio_volatility': np.std(total_returns) if total_returns else 0,
            'portfolio_max_drawdown': self.calculate_max_drawdown()
        }

    def calculate_max_drawdown(self):
        """Calculate the maximum drawdown for the portfolio."""
        if not self.performance_history:
            return 0
        peak = self.performance_history[0]
        max_drawdown = 0
        for value in self.performance_history:
            if value > peak:
                peak = value
            drawdown = (peak - value) / peak
            max_drawdown = max(max_drawdown, drawdown)
        return max_drawdown

    def update_performance_history(self):
        """Update the performance history of the portfolio."""
        current_value = self.total_value()
        self.performance_history.append((datetime.now(), current_value))

    def diversification_metrics(self):
        """Calculate diversification metrics for the portfolio."""
        asset_count = len(self.assets)
        if asset_count == 0:
            return {'diversification_ratio': 0}
        risk_contributions = [asset.dimensions.get('risk', 0) for asset in self.assets]
        diversification_ratio = np.std(risk_contributions) / np.mean(risk_contributions) if np.mean(risk_contributions) > 0 else 0
        return {'diversification_ratio': diversification_ratio}

    def __repr__(self):
        return (f"Portfolio(assets={self.assets}, total_value={self.total_value()}, "
                f"risk_assessment={self.assess_risk()})")
