import pytest
from app import app as flask_app # Import your Flask app

@pytest.fixture
def app():
    yield flask_app

@pytest.fixture
def client(app):
    return app.test_client()

def test_home_page(client):
    """ Test that the home page loads successfully. """
    response = client.get('/')
    assert response.status_code == 200