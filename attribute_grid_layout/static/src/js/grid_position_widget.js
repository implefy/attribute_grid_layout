/** @odoo-module **/

import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { Component } from "@odoo/owl";

const GRID_POSITIONS = [
    { value: 'top_left', label: 'Top Left', row: 0, col: 0 },
    { value: 'top_center', label: 'Top Center', row: 0, col: 1 },
    { value: 'top_right', label: 'Top Right', row: 0, col: 2 },
    { value: 'middle_left', label: 'Middle Left', row: 1, col: 0 },
    { value: 'middle_center', label: 'Middle Center', row: 1, col: 1 },
    { value: 'middle_right', label: 'Middle Right', row: 1, col: 2 },
    { value: 'bottom_left', label: 'Bottom Left', row: 2, col: 0 },
    { value: 'bottom_center', label: 'Bottom Center', row: 2, col: 1 },
    { value: 'bottom_right', label: 'Bottom Right', row: 2, col: 2 },
];

export class GridPositionField extends Component {
    static template = "attribute_grid_layout.GridPositionField";
    static props = {
        ...standardFieldProps,
    };

    get gridPositions() {
        return GRID_POSITIONS;
    }

    get currentValue() {
        return this.props.record.data[this.props.name];
    }

    isSelected(position) {
        return this.currentValue === position.value;
    }

    onCellClick(position) {
        if (this.props.readonly) {
            return;
        }
        const newValue = this.currentValue === position.value ? false : position.value;
        this.props.record.update({ [this.props.name]: newValue });
    }

    getPositionLabel(value) {
        const position = GRID_POSITIONS.find(p => p.value === value);
        return position ? position.label : '';
    }
}

export const gridPositionField = {
    component: GridPositionField,
    supportedTypes: ["selection"],
};

registry.category("fields").add("grid_position", gridPositionField);
