/** @odoo-module **/

import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { Component, useState, onWillUpdateProps } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { DefectPicker } from "./defect_picker";

export class DefectPositionsField extends Component {
    static template = "attribute_grid_layout.DefectPositionsField";
    static components = { DefectPicker };
    static props = {
        ...standardFieldProps,
    };

    setup() {
        this.orm = useService("orm");
        this.state = useState({
            productImage: "",
            gridRows: 5,
            gridCols: 5,
            loading: true,
        });

        this.loadProductConfig();

        onWillUpdateProps((nextProps) => {
            if (nextProps.record.data.product_id !== this.props.record.data.product_id) {
                this.loadProductConfig(nextProps);
            }
        });
    }

    async loadProductConfig(props = this.props) {
        this.state.loading = true;
        const productId = props.record.data.product_id;

        if (productId) {
            try {
                const productData = await this.orm.read(
                    "product.product",
                    [productId[0]],
                    ["product_tmpl_id"]
                );

                if (productData.length > 0) {
                    const templateId = productData[0].product_tmpl_id[0];
                    const templateData = await this.orm.read(
                        "product.template",
                        [templateId],
                        ["defect_picker_image", "defect_grid_rows", "defect_grid_cols"]
                    );

                    if (templateData.length > 0) {
                        const template = templateData[0];
                        if (template.defect_picker_image) {
                            this.state.productImage = `data:image/png;base64,${template.defect_picker_image}`;
                        }
                        this.state.gridRows = template.defect_grid_rows || 5;
                        this.state.gridCols = template.defect_grid_cols || 5;
                    }
                }
            } catch (error) {
                console.error("Failed to load product defect picker config:", error);
            }
        }
        this.state.loading = false;
    }

    get positions() {
        const value = this.props.record.data[this.props.name];
        if (!value) {
            return [];
        }
        try {
            return JSON.parse(value);
        } catch {
            return [];
        }
    }

    get readonly() {
        return this.props.readonly;
    }

    onPositionsChange(positions) {
        const jsonValue = positions.length > 0 ? JSON.stringify(positions) : false;
        this.props.record.update({ [this.props.name]: jsonValue });
    }
}

export const defectPositionsField = {
    component: DefectPositionsField,
    supportedTypes: ["text", "char"],
};

registry.category("fields").add("defect_positions", defectPositionsField);
