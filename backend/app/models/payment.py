from datetime import datetime

from app.extensions import db
from app.models.base_model import BaseModel
from app.models.enums import PaymentStatus


class Payment(BaseModel):
    __tablename__ = "payments"

    booking_id = db.Column(
        db.Integer,
        db.ForeignKey("bookings.id"),
        nullable=False,
        unique=True
    )

    transaction_id = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    payment_method = db.Column(
        db.String(30),
        nullable=False
    )

    amount = db.Column(
        db.Float,
        nullable=False
    )

    payment_status = db.Column(
        db.Enum(PaymentStatus, name="payment_status"),
        default=PaymentStatus.PENDING,
        nullable=False
    )

    paid_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    booking = db.relationship(
        "Booking",
        back_populates="payment"
    )

    def __repr__(self):
        return f"<Payment {self.transaction_id}>"