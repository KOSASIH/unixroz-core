import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score
from .market_data import MarketData

class AIValuation:
    def __init__(self):
        self.model = LinearRegression()
        self.is_trained = False

    def feature_engineering(self, historical_prices):
        """Create features for the model from historical prices."""
        df = pd.DataFrame(historical_prices, columns=['Price'])
        df['Price_Change'] = df['Price'].diff().fillna(0)
        df['Price_Change_Percent'] = df['Price_Change'] / df['Price'].shift(1).fillna(1)
        df['Lag_1'] = df['Price'].shift(1).fillna(0)
        df['Lag_2'] = df['Price'].shift(2).fillna(0)
        df.dropna(inplace=True)  # Drop rows with NaN values
        return df

    def train_model(self, asset_name, days=30):
        """Train the AI model using historical price data for a specific asset."""
        historical_prices = MarketData.get_historical_prices(asset_name, days)
        df = self.feature_engineering(historical_prices)

        X = df[['Lag_1', 'Lag_2', 'Price_Change_Percent']]
        y = df['Price']

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.model.fit(X_train, y_train)
        self.is_trained = True

        # Evaluate the model
        predictions = self.model.predict(X_test)
        self.evaluate_model(y_test, predictions)

    def evaluate_model(self, y_true, y_pred):
        """Evaluate the model's performance."""
        mae = mean_absolute_error(y_true, y_pred)
        r2 = r2_score(y_true, y_pred)
        print(f"Model Evaluation:\nMean Absolute Error: {mae}\nR-squared: {r2}")

    def predict_value(self, asset_name):
        """Predict the future value of an asset using the trained model."""
        if not self.is_trained:
            raise Exception("Model has not been trained yet. Please train the model first.")

        historical_prices = MarketData.get_historical_prices(asset_name, days=30)
        df = self.feature_engineering(historical_prices)

        # Prepare the last two lags for prediction
        last_row = df.iloc[-1]
        input_data = np.array([[last_row['Lag_1'], last_row['Lag_2'], last_row['Price_Change_Percent']]])
        predicted_value = self.model.predict(input_data)
        return predicted_value[0]

# Example usage
if __name__ == "__main__":
    ai_valuation = AIValuation()
    asset_name = "Asset A"
    ai_valuation.train_model(asset_name)
    predicted_value = ai_valuation.predict_value(asset_name)
    print(f"Predicted Value for {asset_name}: {predicted_value}")
