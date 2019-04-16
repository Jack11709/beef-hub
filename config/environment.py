import os

db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/beef-hub-test')
secret = os.getenv('SECRET', 'shh, it\'s a secret')
