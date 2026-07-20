from flask import Blueprint, request
from marshmallow import ValidationError
from flask_jwt_extended import jwt_required
from app.services.branch_service import (
    create_branch,
    get_all_branches,
    get_branch_by_id,
)
from app.middleware.role_required import role_required
from app.schemas.branch_schema import BranchSchema
from app.services.branch_service import (
    create_branch,
    get_all_branches,
)

branch_bp = Blueprint(
    "branch",
    __name__,
    url_prefix="/api/branches"
)

branch_schema = BranchSchema()
# Get Branch By ID
@branch_bp.route("/<int:branch_id>", methods=["GET"])
@jwt_required()
@role_required("ADMIN")
def get_branch(branch_id):
    return get_branch_by_id(branch_id)

# Create Branch
@branch_bp.route("", methods=["POST"])
@jwt_required()
@role_required("ADMIN")
def add_branch():
    try:
        data = branch_schema.load(request.get_json())
    except ValidationError as err:
        return {
            "success": False,
            "errors": err.messages
        }, 400

    return create_branch(data)


# Get All Branches
@branch_bp.route("", methods=["GET"])
@jwt_required()
@role_required("ADMIN")
def list_branches():
    return get_all_branches()