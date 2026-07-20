from app.extensions import db, bcrypt
from app.models.base_model import BaseModel
from app.models.enums import UserRole


class User(BaseModel):
    __tablename__ = "users"

    full_name = db.Column(db.String(100), nullable=False)

    email = db.Column(db.String(120), unique=True, nullable=False, index=True)

    phone = db.Column(db.String(15), unique=True, nullable=False)

    password = db.Column(db.String(255), nullable=False)

    role = db.Column(
        db.Enum(UserRole, name="user_role"),
        nullable=False,
        default=UserRole.USER
    )

    is_active = db.Column(db.Boolean, default=True)

    branch_id = db.Column(
        db.Integer,
        db.ForeignKey("branches.id"),
        nullable=True
    )

    branch = db.relationship(
        "Branch",
        back_populates="managers"
    )

    bookings = db.relationship(
        "Booking",
        back_populates="user",
        lazy=True,
        cascade="all, delete-orphan"
    )

    notifications = db.relationship(
        "Notification",
        back_populates="user",
        lazy=True,
        cascade="all, delete-orphan"
    )

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def __repr__(self):
        return f"<User {self.email}>"