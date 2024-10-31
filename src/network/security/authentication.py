import jwt
import datetime

class Authentication:
    def __init__(self, secret_key):
        self.secret_key = secret_key

    def generate_token(self, username):
        """Generate a JWT token for the user."""
        expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        token = jwt.encode({'username': username, 'exp': expiration}, self.secret_key, algorithm='HS256')
        return token

    def verify_token(self, token):
        """Verify the JWT token and return the username if valid."""
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=['HS256'])
            return payload['username']
        except jwt.ExpiredSignatureError:
            print("Token has expired.")
            return None
        except jwt.InvalidTokenError:
            print("Invalid token.")
            return None

if __name__ == "__main__":
    secret_key = "your_secret_key"
    auth = Authentication(secret_key)

    username = "user1"
    token = auth.generate_token(username)
    print(f"Generated Token: {token}")

    verified_username = auth.verify_token(token)
    print(f"Verified Username: {verified_username}")
