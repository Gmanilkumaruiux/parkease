from app.extensions import db
from app.models.base_model import BaseModel
from app.models.enums import BookingStatus, PaymentStatus


class Booking(BaseModel):
    __tablename__ = "bookings"

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    slot_id = db.Column(
        db.Integer,
        db.ForeignKey("parking_slots.id"),
        nullable=False
    )

    vehicle_number = db.Column(
        db.String(20),
        nullable=False
    )

    vehicle_type = db.Column(
        db.String(30),
        nullable=False
    )

    booking_date = db.Column(
        db.Date,
        nullable=False
    )

    start_time = db.Column(
        db.DateTime,
        nullable=False
    )

    end_time = db.Column(
        db.DateTime,
        nullable=False
    )

    amount = db.Column(
        db.Float,
        nullable=False
    )

    booking_status = db.Column(
        db.Enum(BookingStatus, name="booking_status"),
        default=BookingStatus.PENDING,
        nullable=False
    )

    payment_status = db.Column(
        db.Enum(PaymentStatus, name="payment_status"),
        default=PaymentStatus.PENDING,
        nullable=False
    )

    user = db.relationship(
        "User",
        back_populates="bookings"
    )

    parking_slot = db.relationship(
        "ParkingSlot",
        back_populates="bookings"
    )

    payment = db.relationship(
        "Payment",
        back_populates="booking",
        uselist=False,
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Booking {self.id}>"