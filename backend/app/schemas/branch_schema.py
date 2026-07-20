from marshmallow import Schema, fields


class BranchSchema(Schema):
    branch_name = fields.String(required=True)
    address = fields.String(required=True)
    city = fields.String(required=True)
    latitude = fields.Float(required=True)
    longitude = fields.Float(required=True)
    contact_number = fields.String(required=True)