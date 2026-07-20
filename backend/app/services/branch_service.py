from app.models.branch import Branch


def get_branch_by_id(branch_id):
    branch = Branch.query.get(branch_id)

    if not branch:
        return {
            "success": False,
            "message": "Branch not found"
        }, 404

    return {
        "success": True,
        "branch": {
            "id": branch.id,
            "branch_name": branch.branch_name,
            "address": branch.address,
            "city": branch.city,
            "contact_number": branch.contact_number,
            "latitude": branch.latitude,
            "longitude": branch.longitude,
            "total_slots": branch.total_slots,
            "available_slots": branch.available_slots
        }
    }, 200