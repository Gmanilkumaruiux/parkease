from app.extensions import db
from app.models.base_model import BaseModel


class Branch(BaseModel):
    __tablename__ = "branches"

    branch_name = db.Column(db.String(100), nullable=False)

    address = db.Column(db.Text, nullable=False)

    city = db.Column(db.String(100), nullable=False)

    latitude = db.Column(db.Float, nullable=False)

    longitude = db.Column(db.Float, nullable=False)

    contact_number = db.Column(db.String(15), nullable=False)

    total_slots = db.Column(db.Integer, default=0)

    available_slots = db.Column(db.Integer, default=0)

    managers = db.relationship(
        "User",
        back_populates="branch",
        lazy=True
    )

    parking_slots = db.relationship(
        "ParkingSlot",
        back_populates="branch",
        lazy=True,
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Branch {self.branch_name}>"