# -*- coding: utf-8 -*-

from odoo import fields, models


class ProductAttributeValue(models.Model):
    _inherit = 'product.attribute.value'

    grid_position = fields.Selection([
        ('top_left', 'Top Left'),
        ('top_center', 'Top Center'),
        ('top_right', 'Top Right'),
        ('middle_left', 'Middle Left'),
        ('middle_center', 'Middle Center'),
        ('middle_right', 'Middle Right'),
        ('bottom_left', 'Bottom Left'),
        ('bottom_center', 'Bottom Center'),
        ('bottom_right', 'Bottom Right'),
    ], string='Grid Position')
