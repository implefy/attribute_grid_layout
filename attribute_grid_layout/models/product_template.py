# -*- coding: utf-8 -*-

from odoo import fields, models


class ProductTemplate(models.Model):
    _inherit = 'product.template'

    defect_picker_image = fields.Image(
        string='Defect Picker Image',
        help='Image used as background for the defect picker grid overlay',
    )
    defect_grid_rows = fields.Integer(
        string='Defect Grid Rows',
        default=5,
        help='Number of rows in the defect picker grid',
    )
    defect_grid_cols = fields.Integer(
        string='Defect Grid Columns',
        default=5,
        help='Number of columns in the defect picker grid',
    )
