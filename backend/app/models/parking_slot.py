from app.extensions import db
from app.models.base_model import BaseModel
from app.models.enums import SlotStatus


class ParkingSlot(BaseModel):
    __tablename__ = "parking_slots"

    slot_number = db.Column(db.String(20), nullable=False)

    vehicle_type = db.Column(db.String(30), nullable=False)

    hourly_price = db.Column(db.Float, nullable=False)

    status = db.Column(
        db.Enum(SlotStatus, name="slot_status"),
        default=SlotStatus.AVAILABLE,
        nullable=False
    )

    branch_id = db.Column(
        db.Integer,
        db.ForeignKey("branches.id"),
        nullable=False
    )

    branch = db.relationship(
        "Branch",
        back_populates="parking_slots"
    )

    bookings = db.relationship(
        "Booking",
        back_populates="parking_slot",
        cascade="all, delete-orphan",
        lazy=True
    )

    def __repr__(self):
        return f"<ParkingSlot {self.slot_number}>"