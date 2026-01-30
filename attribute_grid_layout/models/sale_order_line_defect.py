# -*- coding: utf-8 -*-

from odoo import api, fields, models


class SaleOrderLineDefect(models.Model):
    _name = 'sale.order.line.defect'
    _description = 'Sale Order Line Defect'
    _order = 'position_y, position_x'

    sale_order_line_id = fields.Many2one(
        'sale.order.line',
        string='Sale Order Line',
        required=True,
        ondelete='cascade',
        index=True,
    )
    position_x = fields.Integer(
        string='Column Position',
        required=True,
        help='Zero-based column index of the defect position',
    )
    position_y = fields.Integer(
        string='Row Position',
        required=True,
        help='Zero-based row index of the defect position',
    )
    position_label = fields.Char(
        string='Position Label',
        compute='_compute_position_label',
        store=True,
    )
    notes = fields.Text(
        string='Notes',
        help='Additional notes about this defect',
    )

    @api.depends('position_x', 'position_y')
    def _compute_position_label(self):
        for record in self:
            col_letter = chr(ord('A') + record.position_x)
            row_number = record.position_y + 1
            record.position_label = f'{col_letter}{row_number}'
