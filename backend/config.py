"""
Configuration constants for the Warka backend application.
"""

import os

FRONTEND_URL = "http://localhost:5173/"
OPENWEATHER_API_KEY = os.getenv('OPENWEATHER_API_KEY', 'b28b6c95f70add1adc3e76e459f86eaa')
