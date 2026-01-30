/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { ProductConfiguratorDialog } from "@sale_product_configurator/js/product_configurator_dialog/product_configurator_dialog";
import { useState, onMounted } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { DefectPicker } from "./defect_picker";

// Add DefectPicker to the components
ProductConfiguratorDialog.components = {
    ...ProductConfiguratorDialog.components,
    DefectPicker,
};

patch(ProductConfiguratorDialog.prototype, {
    setup() {
        super.setup(...arguments);
        this.orm = useService("orm");
        this.defectState = useState({
            showDefectPicker: false,
            defectPositions: [],
            productImage: "",
            gridRows: 5,
            gridCols: 5,
            hasDefectPicker: false,
            loading: false,
        });

        onMounted(() => {
            this._loadDefectPickerConfig();
        });
    },

    async _loadDefectPickerConfig() {
        const productTemplateId = this.props.productTemplateId;
        if (!productTemplateId) {
            return;
        }

        this.defectState.loading = true;
        try {
            const templateData = await this.orm.read(
                "product.template",
                [productTemplateId],
                ["defect_picker_image", "defect_grid_rows", "defect_grid_cols"]
            );

            if (templateData.length > 0) {
                const template = templateData[0];
                this.defectState.hasDefectPicker = !!template.defect_picker_image;
                if (template.defect_picker_image) {
                    this.defectState.productImage = `data:image/png;base64,${template.defect_picker_image}`;
                }
                this.defectState.gridRows = template.defect_grid_rows || 5;
                this.defectState.gridCols = template.defect_grid_cols || 5;
            }
        } catch (error) {
            console.error("Failed to load defect picker config:", error);
        }
        this.defectState.loading = false;
    },

    toggleDefectPicker() {
        this.defectState.showDefectPicker = !this.defectState.showDefectPicker;
    },

    onDefectPositionsChange(positions) {
        this.defectState.defectPositions = positions;
    },

    async _onConfirm() {
        // Add defect positions to the result before confirming
        if (this.defectState.defectPositions.length > 0) {
            // Store defect positions to be passed to the sale order line
            this._defectPositionsJson = JSON.stringify(this.defectState.defectPositions);
        } else {
            this._defectPositionsJson = null;
        }
        return super._onConfirm(...arguments);
    },

    _getAdditionalLineValues() {
        const values = super._getAdditionalLineValues ? super._getAdditionalLineValues(...arguments) : {};
        if (this._defectPositionsJson) {
            values.defect_positions_json = this._defectPositionsJson;
        }
        return values;
    },
});
