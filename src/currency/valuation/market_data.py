import random
import time
import json
import requests
from datetime import datetime, timedelta

class MarketData:
    _cache = {}
    _cache_expiry = timedelta(minutes=5)  # Cache expiry time

    @staticmethod
    def get_current_price(asset_name):
        """Fetch the current market price of an asset, simulating an API call."""
        if asset_name in MarketData._cache:
            cached_data, timestamp = MarketData._cache[asset_name]
            if datetime.now() - timestamp < MarketData._cache_expiry:
                return cached_data  # Return cached data if it's still valid

        # Simulate an API call to fetch current price
        price = random.uniform(10, 100)  # Simulated price between 10 and 100
        MarketData._cache[asset_name] = (price, datetime.now())  # Cache the price
        return price

    @staticmethod
    def get_historical_prices(asset_name, days=30):
        """Fetch historical prices for the last 'days' days."""
        historical_prices = []
        for _ in range(days):
            historical_prices.append(random.uniform(10, 100))  # Simulated historical prices
        return historical_prices

    @staticmethod
    def fetch_data_from_api(asset_name):
        """Simulate fetching data from an external API."""
        # In a real implementation, you would use requests to fetch data from an API
        # For example:
        # response = requests.get(f"https://api.example.com/marketdata/{asset_name}")
        # if response.status_code == 200:
        #     return response.json()
        # else:
        #     raise Exception("Failed to fetch data from API")

        # Simulated response
        return {
            "current_price": random.uniform(10, 100),
            "historical_prices": [random.uniform(10, 100) for _ in range(30)]
        }

    @staticmethod
    def normalize_data(data):
        """Normalize data to ensure consistency."""
        min_value = min(data)
        max_value = max(data)
        return [(x - min_value) / (max_value - min_value) for x in data]

    @staticmethod
    def get_normalized_historical_prices(asset_name, days=30):
        """Fetch and normalize historical prices for the last 'days' days."""
        historical_prices = MarketData.get_historical_prices(asset_name, days)
        return MarketData.normalize_data(historical_prices)

    @staticmethod
    def clear_cache():
        """Clear the cached market data."""
        MarketData._cache.clear()

    @staticmethod
    def get_asset_data(asset_name):
        """Get both current and historical data for an asset."""
        try:
            current_price = MarketData.get_current_price(asset_name)
            historical_prices = MarketData.get_historical_prices(asset_name)
            return {
                "current_price": current_price,
                "historical_prices": historical_prices
            }
        except Exception as e:
            print(f"Error fetching data for {asset_name}: {e}")
            return None

# Example usage
if __name__ == "__main__":
    asset_name = "Asset A"
    print("Current Price:", MarketData.get_current_price(asset_name))
    print("Historical Prices:", MarketData.get_historical_prices(asset_name))
    print("Normalized Historical Prices:", MarketData.get_normalized_historical_prices(asset_name))
