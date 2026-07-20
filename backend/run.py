print("Starting ParkEase Backend...")

from app import create_app


app = create_app()

from app.utils.create_admin import create_default_admin

with app.app_context():
    create_default_admin()
    
print("Flask app created successfully.")

if __name__ == "__main__":
    print("Running server...")
    app.run(host="0.0.0.0", port=5000, debug=True)

    