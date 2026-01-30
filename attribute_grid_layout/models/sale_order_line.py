# -*- coding: utf-8 -*-

import json
from odoo import api, fields, models


class SaleOrderLine(models.Model):
    _inherit = 'sale.order.line'

    defect_ids = fields.One2many(
        'sale.order.line.defect',
        'sale_order_line_id',
        string='Defects',
    )
    defect_positions_json = fields.Text(
        string='Defect Positions JSON',
        help='JSON representation of defect positions for frontend use',
    )
    has_defects = fields.Boolean(
        string='Has Defects',
        compute='_compute_has_defects',
        store=True,
    )

    @api.depends('defect_ids')
    def _compute_has_defects(self):
        for record in self:
            record.has_defects = bool(record.defect_ids)

    def _sync_defects_from_json(self):
        """Synchronize defect records from JSON data."""
        for record in self:
            if not record.defect_positions_json:
                record.defect_ids.unlink()
                continue

            try:
                positions = json.loads(record.defect_positions_json)
            except (json.JSONDecodeError, TypeError):
                continue

            # Build dict of existing defects by position
            existing = {
                (d.position_x, d.position_y): d
                for d in record.defect_ids
            }

            # Build set of new positions
            new_positions = set()
            commands = []

            for pos in positions:
                x = pos.get('x', 0)
                y = pos.get('y', 0)
                notes = pos.get('notes', '')
                new_positions.add((x, y))

                if (x, y) in existing:
                    # Update existing if notes changed
                    defect = existing[(x, y)]
                    if defect.notes != notes:
                        commands.append((1, defect.id, {'notes': notes}))
                else:
                    # Create new defect
                    commands.append((0, 0, {
                        'position_x': x,
                        'position_y': y,
                        'notes': notes,
                    }))

            # Delete removed defects
            for pos, defect in existing.items():
                if pos not in new_positions:
                    commands.append((2, defect.id, 0))

            if commands:
                record.defect_ids = commands

    def _sync_json_from_defects(self):
        """Synchronize JSON data from defect records."""
        for record in self:
            positions = []
            for defect in record.defect_ids:
                pos = {
                    'x': defect.position_x,
                    'y': defect.position_y,
                }
                if defect.notes:
                    pos['notes'] = defect.notes
                positions.append(pos)
            record.defect_positions_json = json.dumps(positions) if positions else False

    @api.model_create_multi
    def create(self, vals_list):
        records = super().create(vals_list)
        for record in records:
            if record.defect_positions_json:
                record._sync_defects_from_json()
        return records

    def write(self, vals):
        result = super().write(vals)
        if 'defect_positions_json' in vals:
            self._sync_defects_from_json()
        elif 'defect_ids' in vals:
            self._sync_json_from_defects()
        return result

    def action_view_defects(self):
        """Open form view to see/edit defects for this order line."""
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': f'Defects - {self.name}',
            'res_model': 'sale.order.line',
            'res_id': self.id,
            'view_mode': 'form',
            'target': 'new',
            'context': {'form_view_ref': 'attribute_grid_layout.view_sale_order_line_form_defect'},
        }
